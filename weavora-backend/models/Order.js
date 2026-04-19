const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
 
orderItems: [
  {
    // product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // OLD
    product: { type: String, required: true }, // NEW: Accepts "w1", "m1", etc.
    qty: { type: Number, required: true },
    size: { type: String, required: true }
  }
],
  // Taking the location directly as requested
  deliveryLocation: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    // Optional: exact GPS coordinates for precise delivery mapping
    lat: { type: Number },
    lng: { type: Number } 
  },
  totalPrice: { type: Number, required: true },
  isPaid: { type: Boolean, default: false },
  isDelivered: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);