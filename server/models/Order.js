import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  transactionId: { type: String, required: true, unique: true },
  items: [{
    productId: String,
    name: String,
    price: Number,
    quantity: Number
  }],
  total: { type: Number, required: true },
  shipping: { type: Number, default: 10 },
  customer: {
    email: String,
    firstName: String,
    lastName: String,
    phone: String,
    city: String,
    state: String,
    zip: String,
    country: String
  },
  status: { type: String, default: 'completed' }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
