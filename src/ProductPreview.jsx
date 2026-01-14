import * as React from "react";
import { PRODUCTS } from "./products";
import ProductImage from "./ProductImage";


const ProductPreview = ({ productId, onClosePreview }) => {
  React.useEffect(() => {
    function handleKeydown(e) {
      if (e.key === "Escape") {
        onClosePreview();
      }
    }
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [onClosePreview]);

  const product = React.useMemo(
    () => PRODUCTS.find(({ id }) => id === productId),
    [productId],
  );

  return product ? (
    <div className="ProductPreview" onClick={onClosePreview}>
      <div className="content">
        <ProductImage src={product.image} alt={product.name} />
        <p className="description">
          <h4>{product.name}</h4>
          {product.description}
        </p>
      </div>
    </div>
  ) : null;
};

export default ProductPreview;
