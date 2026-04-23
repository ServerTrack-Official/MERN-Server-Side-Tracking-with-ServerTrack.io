import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// POST create order
router.post('/', async (req, res) => {
  try {
    const { items, total, customer } = req.body;
    
    const order = new Order({
      transactionId: 'ORD-' + Date.now(),
      items,
      total,
      customer
    });
    
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
