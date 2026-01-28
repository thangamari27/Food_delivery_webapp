// module import
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require("cookie-parser");
const morgan = require('morgan');
const passport = require('passport');

const authRoutes = require('./src/routes/authRoutes');
const testimonialRoute = require('./src/routes/testimonialRoute');
const errorHandler = require('./src/middleware/errorHandler');
const { apiLimiter } = require('./src/middleware/rateLimiter');

// config and db import
const { PORT, NODE_ENV } = require('./src/config/env');
const { connectDB } = require('./src/config/db');

// Load passport strategies
require('./src/config/passport');

// initial app setup
const app = express();

// use app
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(helmet());
app.use(cookieParser());

// Initialize passport WITHOUT sessions (for JWT)
app.use(passport.initialize());

if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting
app.use('/api/', apiLimiter);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/testimonials', testimonialRoute)

// Global error handler
app.use(errorHandler);

// app start
const startServer = async () => {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} in ${NODE_ENV} mode`);
      console.log(`API URL: http://localhost:${PORT}/api`);
      console.log(`Google OAuth: ${process.env.GOOGLE_CLIENT_ID ? 'Configured' : 'Not configured'}`);
      console.log(`Authentication: JWT (Stateless)`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();