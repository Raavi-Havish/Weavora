const Product = require('../models/Product');

// @desc    Fetch all products (with optional Category filter & Search)
// @route   GET /api/products
exports.getProducts = async (req, res) => {
  try {
    const { category, keyword } = req.query;
    let query = {};

    // 1. Handle Search (matches name or description using regex)
    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: 'i' } }, // 'i' makes it case-insensitive
        { description: { $regex: keyword, $options: 'i' } }
      ];
    }

    // 2. Handle Category Sorting (Men, Women, Kids, GenZ, Custom)
    if (category) {
      query.category = category;
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};