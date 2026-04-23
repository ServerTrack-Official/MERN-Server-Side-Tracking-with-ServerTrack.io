import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Hardcoded products - no database needed
const products = [
  { id: 'P001', name: 'Wireless Headphones', price: 99.99, originalPrice: 129.99, category: 'Electronics', description: 'Premium wireless headphones with noise cancellation.' },
  { id: 'P002', name: 'Smart Watch', price: 249.99, originalPrice: 299.99, category: 'Electronics', description: 'Feature-packed smartwatch with health tracking.' },
  { id: 'P003', name: 'Laptop Stand', price: 49.99, originalPrice: 59.99, category: 'Accessories', description: 'Ergonomic aluminum laptop stand.' },
  { id: 'P004', name: 'USB-C Hub', price: 79.99, originalPrice: 99.99, category: 'Accessories', description: '7-in-1 USB-C hub with 4K HDMI.' },
  { id: 'P005', name: 'Mechanical Keyboard', price: 149.99, originalPrice: 179.99, category: 'Electronics', description: 'Compact mechanical keyboard with RGB.' },
  { id: 'P006', name: 'Wireless Mouse', price: 59.99, originalPrice: 79.99, category: 'Electronics', description: 'Ergonomic wireless mouse with long battery life.' }
];

// In-memory orders - resets on server restart
const orders = [];

// Routes
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

app.post('/api/orders', (req, res) => {
  const { items, total, customer } = req.body;
  const order = {
    transactionId: 'ORD-' + Date.now(),
    items,
    total,
    customer,
    status: 'completed',
    createdAt: new Date()
  };
  orders.push(order);
  console.log('✅ New order:', order.transactionId, '- Total: $' + total);
  res.status(201).json(order);
});

app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
