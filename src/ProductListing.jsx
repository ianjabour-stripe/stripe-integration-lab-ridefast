import { Link } from "react-router-dom";
import ProductImage from "./ProductImage";

const ProductListing = ({ product, onPreview, isPreviewOpen }) => {
  return (
    <div className="ProductListing">
      <ProductImage
        src={product.image}
        alt={product.name}
        onClick={() => onPreview(product)}
        style={
          isPreviewOpen
            ? undefined
            : { viewTransitionName: `product-${product.id}` }
        }
      />
      <div className="info">
        <div>{product.name}</div>
        <div>${product.price} / day</div>
      </div>
      <Link to={`/checkout/${product.id}`}>
        <button>Pick this ride</button>
      </Link>
    </div>
  );
};

export default ProductListing;
