const ProductImage = ({ src, alt, onClick, style }) => {
  return (
    <div className="ProductImage" onClick={onClick} style={style}>
      <figure style={{ backgroundImage: `url(${src}` }} alt={alt} />
    </div>
  );
};

export default ProductImage;
