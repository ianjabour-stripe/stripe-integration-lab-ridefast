const ProductImage = ({ src, alt, onClick }) => {
  return (
    <div className="ProductImage" onClick={onClick}>
      <figure style={{ backgroundImage: `url(${src}` }} alt={alt} />
    </div>
  );
};

export default ProductImage;
