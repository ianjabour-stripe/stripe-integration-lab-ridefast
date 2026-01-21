import * as React from "react";
import ProductImage from "./ProductImage";
import { Link } from "react-router-dom";
import productsJson from "./products.json";

const PRODUCTS = productsJson.products;

const previousProductId = (productId) => {
  const productIdx = PRODUCTS.findIndex(({ id }) => id === productId);
  return PRODUCTS[productIdx === 0 ? PRODUCTS.length - 1 : productIdx - 1].id;
};

const nextProductId = (productId) => {
  const productIdx = PRODUCTS.findIndex(({ id }) => id === productId);
  return PRODUCTS[productIdx === PRODUCTS.length - 1 ? 0 : productIdx + 1].id;
};

const ProductPreview = ({ productId, onClosePreview, setPreviewProduct }) => {
  React.useEffect(() => {
    function handleKeydown(e) {
      if (e.key === "Escape") {
        onClosePreview();
      }

      if (e.key === "ArrowLeft") {
        setPreviewProduct(previousProductId(productId));
      } else if (e.key === "ArrowRight") {
        setPreviewProduct(nextProductId(productId));
      }
    }
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [onClosePreview, productId, setPreviewProduct]);

  const product = React.useMemo(
    () => PRODUCTS.find(({ id }) => id === productId),
    [productId],
  );

  return product ? (
    <div className="ProductPreview" onClick={onClosePreview}>
      <div
        className="content"
        style={{ viewTransitionName: `product-${product.id}` }}
      >
        <ProductImage src={product.image} alt={product.name} />
        <div className="description">
          <h4>{product.name}</h4>
          {product.description}
        </div>
        <Link to={`/checkout/${productId}`}>
          <button>PICK THIS RIDE • {`$${product.price} / day`}</button>
        </Link>
      </div>
    </div>
  ) : null;
};

export default ProductPreview;
