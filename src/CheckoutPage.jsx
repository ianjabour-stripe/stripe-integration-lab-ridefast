import React from "react";
import {Link, useParams} from 'react-router-dom';
import ProductImage from "./ProductImage";
import { PRODUCTS } from "./products";

// TODO: fill in checkout form
const CheckoutPage = () => {
  const { productId } = useParams();

  const product = React.useMemo(
    () => PRODUCTS.find(({ id }) => id === productId),
    [productId],
  );

  const [email, setEmail] = React.useState("");
  const [days, setDays] = React.useState(null);

  return (
    <div className="CheckoutPage">
      <form>
        <h2>Checkout * {product.name}</h2>
        <div className="pricing">
          <span>Total: ${(product.price * days).toFixed(2)}</span>
          <span>
            ${product.price} / day
          </span>
        </div>
        <ProductImage src={product.image} alt={product.name} />
        <input type="text" placeholder="Email..." value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="number" placeholder="How many days will you have the vehicle?" min={1} step={1} value={days} onChange={(e) => setDays(e.target.value)} />
        <div className="placeholder">PAYMENT DETAILS</div>
        <button type="submit">Confirm Payment</button>
        <Link to="/" className="back">
          <small>{'Cancel'}</small>
        </Link>
      </form>
    </div>
  );
};

export default CheckoutPage;
