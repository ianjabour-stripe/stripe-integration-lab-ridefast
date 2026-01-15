import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductListings from "./ProductListings";
import CheckoutPage from "./CheckoutPage";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="App">
        <header>RideFast • Rentals</header>
        <Routes>
          <Route path="/" element={<ProductListings />} />
          <Route path="/checkout/:productId" element={<CheckoutPage />} />
          <Route path="*" element={<div className="NotFound">404 Not found</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
