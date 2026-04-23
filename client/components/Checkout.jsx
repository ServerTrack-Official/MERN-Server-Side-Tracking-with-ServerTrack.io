import { useState, useEffect } from 'react'
import { trackEvent } from '../utils/servertrack.js'

export default function Checkout({ cart, onPurchase, onBack }) {
  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '', phone: '',
    city: '', state: '', zip: '', country: 'US'
  })
  const [loading, setLoading] = useState(false)

  const total = cart.reduce((sum, item) => sum + item.price, 0)
  const shipping = 10

  // Fire InitiateCheckout when checkout page mounts
  useEffect(() => {
    trackEvent('InitiateCheckout', {
      value: total,
      currency: 'USD',
      content_type: 'product',
      num_items: cart.length,
      content_ids: cart.map(item => item.id),
      contents: cart.map(item => ({
        id: item.id,
        quantity: 1,
        item_price: item.price
      }))
    })
  }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map(item => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: 1
          })),
          total: total + shipping,
          customer: form
        })
      })

      const order = await response.json()

      const userData = {
        em: form.email, ph: form.phone,
        fn: form.firstName, ln: form.lastName,
        ct: form.city, st: form.state,
        zp: form.zip, country: form.country
      }

      trackEvent('Purchase', {
        transaction_id: order.transactionId,
        value: total + shipping,
        currency: 'USD',
        shipping: shipping,
        content_type: 'product',
        content_ids: cart.map(item => item.id),
        contents: cart.map(item => ({ id: item.id, quantity: 1, item_price: item.price }))
      }, userData)

      onPurchase(order)
    } catch (err) {
      alert('Order failed: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button className="btn btn-outline btn-back" onClick={onBack}>← Back</button>
      <div className="page-box">
        <h2 style={{ marginBottom: 24 }}>Checkout</h2>

        <form onSubmit={handleSubmit}>
          <h3 style={{ marginBottom: 12, color: '#444' }}>Customer Information</h3>
          <div className="form-row">
            <input name="firstName" placeholder="First Name" required onChange={handleChange} />
            <input name="lastName" placeholder="Last Name" required onChange={handleChange} />
          </div>
          <input name="email" type="email" placeholder="Email" required onChange={handleChange} />
          <input name="phone" type="tel" placeholder="Phone" required onChange={handleChange} />
          <div className="form-row">
            <input name="city" placeholder="City" required onChange={handleChange} />
            <input name="state" placeholder="State" required onChange={handleChange} />
          </div>
          <div className="form-row">
            <input name="zip" placeholder="ZIP Code" required onChange={handleChange} />
            <input name="country" placeholder="Country" defaultValue="US" onChange={handleChange} />
          </div>

          <h3 style={{ margin: '24px 0 12px', color: '#444' }}>Order Summary</h3>
          {cart.map((item, i) => (
            <div key={i} className="order-item">
              <span>{item.name}</span>
              <span style={{ fontWeight: 600 }}>${item.price}</span>
            </div>
          ))}
          <div className="order-item">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="order-total">Total: ${(total + shipping).toFixed(2)}</div>

          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? 'Processing...' : 'Complete Purchase'}
          </button>
        </form>
      </div>
    </div>
  )
}
