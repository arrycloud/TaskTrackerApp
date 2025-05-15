const express = require('express');
const cors = require('cors');
const path=require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const examRoutes = require('./routes/examRoutes');
require('dotenv').config();

const app = express();
app.use('/public', express.static(path.join(__dirname, 'public')));
// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

app.get('/', (req, res) => {
    res.send('Welcome to the Exam App API');
  });
  
//  all Routes here
app.use('/api/auth', authRoutes);
// admin routes here
app.use('/api/auth', adminRoutes);
// exam routes here
app.use('/api/auth', examRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
