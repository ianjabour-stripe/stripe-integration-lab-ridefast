# Stripe Integration Lab

This repository provides the boilerplate UI for a car rental service company without any payment integration code added.

![Image of sample UI](./demo-image.png)

In practice, you should only need to update the `CheckoutPage.jsx` and `server.js` files to get a working Stripe integration.

## Getting started

1. Create a `.env` file based on the `.env.example` and fill in your API key.

2. Install dependencies

~~~
npm install
~~~

3. Run the application (both client and server)

~~~
npm start
~~~

4. Go to [http://localhost:3000/stripe-integration-lab-ridefast](http://localhost:3000/stripe-integration-lab-ridefast)

(server will run on http://localhost:4242)

5. Create the products and prices in Stripe

~~~
npm run create-products
~~~
