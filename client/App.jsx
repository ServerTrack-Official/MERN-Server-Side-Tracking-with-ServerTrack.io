import { useState, useEffect } from 'react'
import ProductList from './components/ProductList.jsx'
import ProductView from './components/ProductView.jsx'
import Checkout from './components/Checkout.jsx'
import Success from './components/Success.jsx'
import { trackEvent } from './utils/servertrack.js'

export default function App() {
  const [page, setPage] = useState('home')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cart, setCart] = useState([])
  const [lastOrder, setLastOrder] = useState(null)

  // Track PageView on every page change
  useEffect(() => {
    const pageTitles = {
      home: 'Home',
      product: selectedProduct?.name || 'Product',
      checkout: 'Checkout',
      success: 'Order Success'
    }
    trackEvent('PageView', {
      page_title: pageTitles[page],
      page_url: window.location.href
    })
  }, [page])

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    setPage('product')
    trackEvent('ViewContent', {
      content_ids: [product.id],
      content_type: 'product',
      content_name: product.name,
      value: product.price,
      currency: 'USD',
      content_category: product.category
    })
  }

  const handleAddToCart = (product) => {
    setCart(prev => [...prev, product])
    trackEvent('AddToCart', {
      content_ids: [product.id],
      content_type: 'product',
      content_name: product.name,
      value: product.price,
      currency: 'USD',
      discount: product.originalPrice ? product.originalPrice - product.price : 0
    })
  }

  const handlePurchase = (order) => {
    setLastOrder(order)
    setPage('success')
  }

  return (
    <div className="container">
      <div className="header">
        <div>
          <h1>MERN ServerTrack Demo <span className="db-badge">MongoDB</span></h1>
          <p>Full-stack e-commerce tracking with ServerTrack.io</p>
        </div>
        {cart.length > 0 && page !== 'checkout' && page !== 'success' && (
          <button className="btn btn-success" style={{ width: 'auto', padding: '10px 20px', marginTop: 0 }}
            onClick={() => setPage('checkout')}>
            Cart ({cart.length})
          </button>
        )}
      </div>

      {page === 'home' && (
        <ProductList
          onProductClick={handleProductClick}
          onAddToCart={handleAddToCart}
        />
      )}

      {page === 'product' && selectedProduct && (
        <ProductView
          product={selectedProduct}
          onAddToCart={handleAddToCart}
          onBack={() => setPage('home')}
        />
      )}

      {page === 'checkout' && (
        <Checkout
          cart={cart}
          onPurchase={handlePurchase}
          onBack={() => setPage('home')}
        />
      )}

      {page === 'success' && (
        <Success
          order={lastOrder}
          onContinue={() => { setCart([]); setPage('home') }}
        />
      )}
    </div>
  )
}
