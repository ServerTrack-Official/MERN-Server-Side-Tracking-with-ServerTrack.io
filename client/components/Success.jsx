export default function Success({ order, onContinue }) {
  return (
    <div className="page-box success-box">
      <div className="success-icon">✓</div>
      <h1 style={{ fontSize: 36, marginBottom: 12 }}>Purchase Complete!</h1>
      {order && (
        <p style={{ fontSize: 16, color: '#666', marginBottom: 8 }}>
          Order ID: <strong style={{ color: '#2563eb' }}>{order.transactionId}</strong>
        </p>
      )}
      {order && (
        <p style={{ fontSize: 16, color: '#666', marginBottom: 8 }}>
          Total: <strong>${order.total?.toFixed(2)}</strong>
        </p>
      )}
      <p style={{ fontSize: 14, color: '#888', marginBottom: 30 }}>
        Order saved to MongoDB ✓ &nbsp;|&nbsp; Tracking event fired ✓
      </p>
      <button className="btn btn-primary" onClick={onContinue} style={{ maxWidth: 280, margin: '0 auto' }}>
        Continue Shopping
      </button>
    </div>
  )
}
