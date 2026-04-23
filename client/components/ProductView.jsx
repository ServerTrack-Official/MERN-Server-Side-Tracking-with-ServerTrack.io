export default function ProductView({ product, onAddToCart, onBack }) {
  return (
    <div>
      <button className="btn btn-outline btn-back" onClick={onBack}>← Back</button>
      <div className="page-box">
        <div className="product-image" style={{ height: 300, marginBottom: 30 }}>
          {product.name}
        </div>
        <div className="product-category">{product.category}</div>
        <h2 style={{ fontSize: 32, margin: '10px 0' }}>{product.name}</h2>
        <p style={{ color: '#666', marginBottom: 20, lineHeight: 1.6 }}>{product.description}</p>
        <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 30 }}>
          <span className="product-price" style={{ fontSize: 36 }}>${product.price}</span>
          {product.originalPrice && (
            <>
              <span className="product-original-price" style={{ fontSize: 18 }}>${product.originalPrice}</span>
              <span className="product-discount" style={{ fontSize: 14 }}>
                Save ${(product.originalPrice - product.price).toFixed(2)}
              </span>
            </>
          )}
        </div>
        <button className="btn btn-primary" style={{ maxWidth: 300 }} onClick={() => onAddToCart(product)}>
          Add to Cart — ${product.price}
        </button>
      </div>
    </div>
  )
}
