const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Route Imports
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes'); // ADD THIS
const userRoutes = require('./routes/userRoutes');       // ADD THIS

dotenv.config();
connectDB();

const app = express();
app.use(cors());

app.use(express.json());

// Add this near your other route imports at the top
const orderRoutes = require('./routes/orderRoutes');

// Add this near your other app.use statements
app.use('/api/orders', orderRoutes);
// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes); // ADD THIS
app.use('/api/users', userRoutes);       // ADD THIS

app.get('/', (req, res) => {
  res.send('Weavora API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});