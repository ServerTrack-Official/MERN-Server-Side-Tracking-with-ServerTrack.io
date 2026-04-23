import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const products = [
  { id: 'P001', name: 'Wireless Headphones', price: 99.99, originalPrice: 129.99, category: 'Electronics', description: 'Premium wireless headphones with noise cancellation.' },
  { id: 'P002', name: 'Smart Watch', price: 249.99, originalPrice: 299.99, category: 'Electronics', description: 'Feature-packed smartwatch with health tracking.' },
  { id: 'P003', name: 'Laptop Stand', price: 49.99, originalPrice: 59.99, category: 'Accessories', description: 'Ergonomic aluminum laptop stand.' },
  { id: 'P004', name: 'USB-C Hub', price: 79.99, originalPrice: 99.99, category: 'Accessories', description: '7-in-1 USB-C hub with 4K HDMI.' },
  { id: 'P005', name: 'Mechanical Keyboard', price: 149.99, originalPrice: 179.99, category: 'Electronics', description: 'Compact mechanical keyboard with RGB.' },
  { id: 'P006', name: 'Wireless Mouse', price: 59.99, originalPrice: 79.99, category: 'Electronics', description: 'Ergonomic wireless mouse with long battery life.' }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/servertrack_demo');
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('✅ Database seeded with', products.length, 'products');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
}

seed();
