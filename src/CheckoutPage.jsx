import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ProductImage from "./ProductImage";
import productsJson from "./products.json";

const PRODUCTS = productsJson.products;

// TODO: add Elements to this page

const CheckoutForm = ({product}) => {
  const [days, setDays] = React.useState(1);
  const navigate = useNavigate();

  const handlePaymentComplete = () => {
    navigate('/payment-complete');
  }

  const handlePaymentFailed = () => {
    navigate('/payment-failed');
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    alert('Form submitted');

    handlePaymentComplete();
  }

  const total = Number((product.price * days).toFixed(2)).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return (
    <form onSubmit={handleSubmit}>
      <h2>Checkout * {product.name}</h2>
      <div className="pricing">
        <span>Total: ${total}</span>
        <span>${product.price} / day</span>
      </div>
      <ProductImage src={product.image} alt={product.name} />
      <div>
        <span>I will need the car for </span>
        <input
          type="number"
          placeholder="#"
          min={1}
          step={1}
          value={days}
          onChange={(e) => setDays(e.target.value)}
          style={{width: '8ch', margin: '0 1ch'}}
        />
        <span>day{days === 1 ? '' : 's'}</span>
      </div>
      <div className="placeholder">PAYMENT DETAILS GO HERE</div>
      <button type="submit">Confirm Payment • ${total}</button>
      <Link to="/" className="back">
        <small>{"Cancel"}</small>
      </Link>
    </form>
  );
};

const CheckoutPage = () => {
  const { productId } = useParams();

  const product = React.useMemo(
    () => PRODUCTS.find(({ id }) => id === productId),
    [productId],
  );

  return (
    <div className="CheckoutPage">
      <CheckoutForm product={product} />
    </div>
  )
}

export default CheckoutPage;
