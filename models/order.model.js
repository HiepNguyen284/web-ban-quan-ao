const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: String,
  userInfo: {
    fullName: String,
    address: String,
    phone: String,
    note: String
  },
  products: [
    {
      product_id: String,
      size: String,
      quantity: String
    }
  ],
  status: {
    type: String,
    default: 'pending'
  },
  deleted: {
    type: Boolean,
    default: false
  },
  payment: Boolean,
  deliveryMethod: String,
  totalAmount: Number,
  createAt: {
    type: Date,
    default: Date.now
  },
  received: {
    type: Boolean,
    default: false
  }
})

const Order = mongoose.model('Order', orderSchema, 'orders');

module.exports = Order;