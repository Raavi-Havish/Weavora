const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true }, // URL to the image
  // Restricting categories to the ones you specified
  category: { 
    type: String, 
    required: true,
    enum: ['Women', 'Men', 'Kids', 'GenZ', 'Custom'] 
  },
  sizes: [{ type: String }], // e.g., ['S', 'M', 'L', 'XL']
  inStock: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);