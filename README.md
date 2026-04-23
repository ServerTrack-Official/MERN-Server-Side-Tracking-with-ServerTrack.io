# MERN Stack Server-Side Tracking with ServerTrack.io

A complete e-commerce demo application built with MongoDB, Express, React, and Node.js, showcasing server-side tracking integration with ServerTrack.io.

## Features

- 🛍️ Product listing and detail pages
- 🛒 Shopping cart functionality
- 💳 Checkout flow
- 📊 Complete e-commerce event tracking:
  - `PageView` - Fires automatically on every page
  - `ViewContent` - Product view tracking
  - `AddToCart` - Add to cart events
  - `InitiateCheckout` - Checkout initiation
  - `Purchase` - Transaction completion

## Tech Stack

- **MongoDB** - Database (optional, demo uses in-memory)
- **Express.js** - Backend REST API
- **React 18** - Frontend UI
- **Node.js** - JavaScript runtime
- **Vite** - Frontend build tool
- **ServerTrack.io** - Server-side tracking

## Installation

1. Clone this repository
2. Install dependencies:
```bash
npm install
```

3. Configure ServerTrack in `client/utils/servertrack.js`:
```javascript
const AUTH_KEY = 'YOUR_AUTH_KEY'
const SERVER_DOMAIN = 'sdk.core-relay.org'
```

## Usage

### Development (runs both server and client)
```bash
npm run dev
```

### Server only
```bash
npm run server
```

### Client only
```bash
npm run client
```

## Project Structure

```
MERN-ServerTrack-Demo/
├── server/
│   └── index.js             # Express API server
├── client/
│   ├── components/
│   │   ├── ProductList.jsx  # Product grid display
│   │   ├── ProductView.jsx  # Single product detail
│   │   ├── Checkout.jsx     # Checkout page
│   │   └── Success.jsx      # Order confirmation
│   ├── utils/
│   │   └── servertrack.js   # ServerTrack integration
│   ├── App.jsx              # Main app with page tracking
│   ├── main.jsx             # App entry point
│   └── index.css            # Global styles
├── index.html
├── vite.config.js
└── package.json
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | Get all products |
| GET | /api/products/:id | Get single product |
| POST | /api/orders | Create order |
| GET | /api/orders | Get all orders |

## ServerTrack Integration

The demo uses the ServerTrack.io SDK and tracks the following e-commerce events:

### SDK Initialization
The SDK is initialized on app load in `client/main.jsx`:
```javascript
import { initServerTrack } from './utils/servertrack.js'

initServerTrack()
```

### PageView
Fires automatically on every page change using React's `useEffect`:
```javascript
useEffect(() => {
  trackEvent('PageView', {
    page_title: 'Home',
    page_url: window.location.href
  })
}, [page])
```

### ViewContent
Triggered when a user clicks on a product:
```javascript
trackEvent('ViewContent', {
  content_ids: [product.id],
  content_type: 'product',
  content_name: product.name,
  value: product.price,
  currency: 'USD',
  content_category: product.category
})
```

### AddToCart
Triggered when a user adds a product to cart:
```javascript
trackEvent('AddToCart', {
  content_ids: [product.id],
  content_type: 'product',
  content_name: product.name,
  value: product.price,
  currency: 'USD'
})
```

### InitiateCheckout
Triggered automatically when the checkout page loads:
```javascript
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
```

### Purchase (with Advanced Matching)
Triggered on form submit with user data for advanced matching:
```javascript
const userData = {
  em: email,      // Email
  ph: phone,      // Phone
  fn: firstName,  // First Name
  ln: lastName,   // Last Name
  ct: city,       // City
  st: state,      // State
  zp: zip,        // ZIP Code
  country: 'US'   // Country
}

trackEvent('Purchase', {
  transaction_id: order.transactionId,
  value: total,
  currency: 'USD',
  shipping: 10,
  content_type: 'product',
  content_ids: cart.map(item => item.id),
  contents: cart.map(item => ({
    id: item.id,
    quantity: 1,
    item_price: item.price
  }))
}, userData)
```

## URLs

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

## Customization

- Modify products in `server/index.js` products array
- Adjust styling in `client/index.css`
- Add more tracking events in `client/utils/servertrack.js`

## License

MIT
