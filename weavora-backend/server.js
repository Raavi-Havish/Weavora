const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const dns = require('dns');
const connectDB = require('./config/db');

// 1. Setup Environment and DNS
dotenv.config();
dns.setServers(["8.8.8.8", "8.8.4.4"]); 

// 2. Connect to Database
connectDB();

const app = express();

// 3. MANUAL CORS & PREFLIGHT HANDLER (The "Fix")
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Immediately respond to the browser's "Permission Request" (Preflight)
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// 4. Standard Middleware
app.use(express.json());

// 5. Route Imports
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes'); 
const userRoutes = require('./routes/userRoutes');       
const orderRoutes = require('./routes/orderRoutes');

// 6. Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes); 
app.use('/api/users', userRoutes);       
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('Weavora API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});