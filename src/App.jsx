import * as React from 'react';
import "./App.css";
import {PRODUCTS} from './products';

const ProductImage = ({src, alt, onClick}) => {
  return (
    <div className="ProductImage" onClick={onClick}>
      <figure style={{backgroundImage: `url(${src}`}} alt={alt} />
    </div>
  )
}

const ProductDetail = ({productId, onClosePreview}) => {
  React.useEffect(() => {
    document.body.classList.add('bodyLock');

    return () => {
      document.body.classList.remove('bodyLock');
    } 
  }, []);

  React.useEffect(() => {
    function handleKeydown(e) {
      if (e.key === 'Escape') {
        onClosePreview();
      }
    }
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    } 
  }, [onClosePreview]);

  const product = React.useMemo(() => PRODUCTS.find(({id}) => id === productId), [productId])

  return product ? (
    <div className="ProductDetail" onClick={onClosePreview}>
      <div className="content">
        <ProductImage src={product.image} alt={product.name} />
        <p className="description">
          <h4>{product.name}</h4>
          {product.description}
        </p>
      </div>
    </div>
  ) : null
}

const ProductListing = ({product, onSelect, onPreview}) => {
  return (
    <div className="ProductListing">
      <ProductImage src={product.image} alt={product.name} onClick={() => onPreview(product)} />
      <div className="info">
        <div>{product.name}</div>
        <div>${product.price} / day</div>
      </div>
      <button onClick={() => onSelect(product)}>Pick this ride</button>
    </div>
  )
}

const App = () => {
  const [previewProduct, setPreviewProduct] = React.useState(null);

  const handleOpenPreview = (product) => {
    setPreviewProduct(product.id)
  }

  const handleSelect = (product) => {
    alert(`${product.name} was selected`);
  }

  const handleClosePreview = React.useCallback(() => {
    setPreviewProduct(null);
  }, [])

  return (
    <div className="App">
      <header>RideFast • Car Rentals</header>
      <main className="ProductListings">
        {PRODUCTS.map((product) => (
          <ProductListing key={product.id} product={product} onSelect={handleSelect} onPreview={handleOpenPreview} />
        ))}
        {previewProduct ? (
          <ProductDetail productId={previewProduct} onClosePreview={handleClosePreview} />
        ) : null}
      </main>
    </div>
  )
}

export default App;
