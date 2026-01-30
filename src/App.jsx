import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import ProductListings from "./ProductListings";
import CheckoutPage from "./CheckoutPage";
import "./App.css";

const StatusPage = ({status}) => (
  <div className="statusPage">
    {status}
    <Link to="/" className="back">
      <small>{"← Back to homepage"}</small>
    </Link>
  </div>
)

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="App">
        <header>
          <Link to="/" style={{textDecoration: 'none'}}>
            RideFast • Rentals
          </Link>
        </header>
        <Routes>
          <Route path="/" element={<ProductListings />} />
          <Route path="/checkout/:productId" element={<CheckoutPage />} />
          <Route
            path="/payment-complete"
            element={<StatusPage status="✅ Payment complete" />}
          />
          <Route
            path="/payment-failed"
            element={<StatusPage status="❌ Payment failed" />}
          />
          <Route
            path="*"
            element={<StatusPage status="404 Not found" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
