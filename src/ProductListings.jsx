import * as React from 'react';
import { PRODUCTS } from "./products";
import ProductListing from "./ProductListing";
import ProductPreview from './ProductPreview';

const ProductListings = () => {
  const [previewProduct, setPreviewProduct] = React.useState(null);

  const handleOpenPreview = (product) => {
    setPreviewProduct(product.id);
    document.body.classList.add("bodyLock");
  };

  const handleClosePreview = React.useCallback(() => {
    setPreviewProduct(null);
    document.body.classList.remove("bodyLock");
  }, []);

  return (
    <main className="ProductListings">
      {PRODUCTS.map((product) => (
        <ProductListing
          key={product.id}
          product={product}
          onPreview={handleOpenPreview}
        />
      ))}
      {previewProduct ? (
        <ProductPreview
          productId={previewProduct}
          onClosePreview={handleClosePreview}
        />
      ) : null}
    </main>
  );
};

export default ProductListings;
