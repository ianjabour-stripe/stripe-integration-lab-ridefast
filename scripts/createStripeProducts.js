require('dotenv/config');
const Stripe = require('stripe');
const fs = require('fs');
const path = require('path');

const productsJson = require('../src/products.json');
const PRODUCTS = productsJson.products;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function createOrReactivateProducts() {
  console.log('🚀 Starting Stripe product creation/reactivation...\n');

  const results = {
    created: [],
    reactivated: [],
    updated: [],
    errors: []
  };

  for (const product of PRODUCTS) {
    try {
      console.log(`Processing: ${product.name}...`);

      let stripeProduct;
      let productAction = 'created';

      // Try to create the product with the custom ID
      try {
        stripeProduct = await stripe.products.create({
          id: product.id,
          name: product.name,
          description: product.description.replace(/\s+/g, ' ').trim(),
          images: [product.image],
          active: true,
          metadata: {
            original_id: product.id
          }
        });
        console.log(`  ✅ Product created: ${stripeProduct.id}`);
      } catch (error) {
        // If product already exists, retrieve and potentially reactivate it
        if (error.code === 'resource_already_exists') {
          stripeProduct = await stripe.products.retrieve(product.id);

          if (!stripeProduct.active) {
            // Reactivate archived product
            stripeProduct = await stripe.products.update(product.id, {
              active: true,
              name: product.name,
              description: product.description.replace(/\s+/g, ' ').trim(),
              images: [product.image],
            });
            productAction = 'reactivated';
            console.log(`  🔄 Product reactivated: ${stripeProduct.id}`);
          } else {
            // Product already exists and is active
            productAction = 'updated';
            console.log(`  ℹ️  Product already exists: ${stripeProduct.id}`);
          }
        } else {
          throw error; // Re-throw if it's a different error
        }
      }

      // Now handle the price
      // Check if a price already exists for this product
      const existingPrices = await stripe.prices.list({
        product: product.id,
        limit: 10
      });

      let stripePrice;
      let priceAction = 'created';
      const targetAmount = Math.round(product.price * 100);

      // Look for an existing recurring daily price with the same amount
      const matchingPrice = existingPrices.data.find(p =>
        p.unit_amount === targetAmount &&
        p.recurring?.interval === 'day'
      );

      if (matchingPrice) {
        if (!matchingPrice.active) {
          // Reactivate the price
          stripePrice = await stripe.prices.update(matchingPrice.id, { active: true });
          priceAction = 'reactivated';
          console.log(`  🔄 Price reactivated: ${stripePrice.id} ($${product.price}/day)`);
        } else {
          // Price already exists and is active
          stripePrice = matchingPrice;
          priceAction = 'exists';
          console.log(`  ℹ️  Price already active: ${stripePrice.id} ($${product.price}/day)`);
        }
      } else {
        // Create a new recurring daily price
        stripePrice = await stripe.prices.create({
          product: stripeProduct.id,
          unit_amount: targetAmount,
          currency: 'usd',
          recurring: {
            interval: 'day',
            interval_count: 1
          },
          metadata: {
            original_product_id: product.id
          }
        });
        priceAction = 'created';
        console.log(`  ✅ Price created: ${stripePrice.id} ($${product.price}/day)`);
      }

      console.log(''); // Empty line for readability

      // Categorize the result
      const resultItem = {
        originalId: product.id,
        name: product.name,
        productId: stripeProduct.id,
        priceId: stripePrice.id,
        amount: product.price,
        billingInterval: 'daily',
        productAction,
        priceAction
      };

      if (productAction === 'created') {
        results.created.push(resultItem);
      } else if (productAction === 'reactivated') {
        results.reactivated.push(resultItem);
      } else {
        results.updated.push(resultItem);
      }

    } catch (error) {
      console.error(`  ❌ Error processing ${product.name}:`, error.message, '\n');
      results.errors.push({
        originalId: product.id,
        name: product.name,
        error: error.message
      });
    }
  }

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Newly created: ${results.created.length}`);
  console.log(`🔄 Reactivated: ${results.reactivated.length}`);
  console.log(`ℹ️  Already active: ${results.updated.length}`);
  console.log(`❌ Errors: ${results.errors.length}`);
  console.log(`\n💰 All prices are recurring (billed daily)`);

  if (results.created.length > 0) {
    console.log('\n✅ Newly Created Products:');
    results.created.forEach(item => {
      console.log(`  • ${item.name}`);
      console.log(`    Product: ${item.productId} | Price: ${item.priceId} | $${item.amount}/day`);
    });
  }

  if (results.reactivated.length > 0) {
    console.log('\n🔄 Reactivated Products:');
    results.reactivated.forEach(item => {
      console.log(`  • ${item.name}`);
      console.log(`    Product: ${item.productId} | Price: ${item.priceId} | $${item.amount}/day`);
    });
  }

  if (results.updated.length > 0) {
    console.log('\nℹ️  Already Active Products (no changes):');
    results.updated.forEach(item => {
      console.log(`  • ${item.name} - $${item.amount}/day`);
    });
  }

  if (results.errors.length > 0) {
    console.log('\n❌ Errors:');
    results.errors.forEach(item => {
      console.log(`  • ${item.name}: ${item.error}`);
    });
  }

  // Save results to file
  const fs = await import('fs');
  fs.default.writeFileSync(
    'stripe-products-mapping.json',
    JSON.stringify(results, null, 2)
  );
  console.log('\n💾 Results saved to stripe-products-mapping.json');
}

createOrReactivateProducts()
  .then(() => {
    console.log('\n✨ Script completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Script failed:', error);
    process.exit(1);
  });
