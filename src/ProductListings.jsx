import * as React from "react";
import { PRODUCTS } from "./products";
import ProductListing from "./ProductListing";
import ProductPreview from "./ProductPreview";

const ProductListings = () => {
  const [previewProduct, setPreviewProduct] = React.useState(null);

  const handleOpenPreview = (product) => {
    document.body.classList.add("bodyLock");
    document.startViewTransition(() => {
      setPreviewProduct(product.id);
    });
  };

  const handleClosePreview = React.useCallback(() => {
    document.body.classList.remove("bodyLock");
    document.startViewTransition(() => {
      setPreviewProduct(null);
    });
  }, []);

  return (
    <div className="ProductListings">
      {PRODUCTS.map((product) => (
        <ProductListing
          key={product.id}
          product={product}
          onPreview={handleOpenPreview}
          isPreviewOpen={previewProduct !== null}
        />
      ))}
      {previewProduct ? (
        <ProductPreview
          productId={previewProduct}
          onClosePreview={handleClosePreview}
          setPreviewProduct={setPreviewProduct}
        />
      ) : null}
    </div>
  );
};

export default ProductListings;
