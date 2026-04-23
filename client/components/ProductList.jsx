import { useState, useEffect } from 'react'

export default function ProductList({ onProductClick, onAddToCart }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => { setProducts(data); setLoading(false) })
      .catch(err => { setError(err.message); setLoading(false) })
  }, [])

  if (loading) return <div className="loading">Loading products from MongoDB...</div>
  if (error) return <div className="error">Error: {error} — Is the server running?</div>

  return (
    <div className="product-grid">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <div className="product-image" onClick={() => onProductClick(product)}>
            {product.name}
          </div>
          <div className="product-category">{product.category}</div>
          <div className="product-name">{product.name}</div>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <span className="product-price">${product.price}</span>
            {product.originalPrice && (
              <>
                <span className="product-original-price">${product.originalPrice}</span>
                <span className="product-discount">
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                </span>
              </>
            )}
          </div>
          <button className="btn btn-primary" onClick={() => onAddToCart(product)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  )
}
