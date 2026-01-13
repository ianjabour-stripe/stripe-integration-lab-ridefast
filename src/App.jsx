import "./App.css";
import {PRODUCTS} from './products';

const ProductListing = ({product, onClick}) => {
  return (
    <div className="ProductListing">
      <div className="image">
        <figure style={{backgroundImage: `url(${product.image}`}} alt={product.name} />
      </div>
      <div className="description">
        <div>{product.name}</div>
        <div>${product.price} / day</div>
      </div>
      <button onClick={() => onClick(product)}>Pick this ride</button>
    </div>
  )
}

const App = () => {
  const handleClick = (product) => {
    alert(product)
  }

  return (
    <div className="App">
      <header>RideFast • Car Rentals</header>
      <main className="ProductListings">
        {PRODUCTS.map((product) => (
          <ProductListing key={product.id} product={product} onClick={handleClick} />
        ))}
      </main>
    </div>
  )
}

export default App;
