// Core modules
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression')

// Logging and utilities
const morgan = require('morgan');
const passport = require('passport');

// Application modules
const authRoutes = require('./src/routes/authRoutes');
const testimonialRoute = require('./src/routes/testimonialRoute');
const foodRoute = require('./src/routes/foodRoute');
const restaurantRoute = require('./src/routes/restaurantRoute');
const errorHandler = require('./src/middleware/errorHandler');
const { apiLimiter } = require('./src/middleware/rateLimiter');

// Configuration
const { PORT, NODE_ENV, FRONTEND_URL, GOOGLE_CLIENT_ID } = require('./src/config/env');
const { connectDB } = require('./src/config/db');

// Load passport strategies early
require('./src/config/passport');

// initial app
const app = express();

// 1. Security middleware (FIRST - protect everything)
app.use(helmet({
  contentSecurityPolicy: false,
}));

// 2. CORS (SECOND - before parsing)
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 3. Request parsing (THIRD)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// 4. Authentication (FOURTH)
app.use(passport.initialize());

// compression
app.use(compression())

// 5. Logging (FIFTH - after parsing, before routes)
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else if (NODE_ENV === 'production') {
  // Production logging - minimal
  app.use(morgan('combined', {
    skip: (req, res) => req.path === '/health' && res.statusCode < 400
  }));
}

// Routes 

// Health check (no rate limiting for monitoring)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: NODE_ENV
  });
});

// Apply rate limiting to API routes only
app.use('/api/', apiLimiter);

// API Routes (grouped logically)
app.use('/api/auth', authRoutes);
app.use('/api/testimonials', testimonialRoute);
app.use('/api/foods', foodRoute);
app.use('/api/restaurants', restaurantRoute);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Global error handler
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
  
    // Start server
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (${NODE_ENV})`);
      console.log(`API: http://localhost:${PORT}/api`);
      console.log(`Health: http://localhost:${PORT}/health`);
      
      // Only show OAuth status if configured
      if (GOOGLE_CLIENT_ID) {
        console.log(`Google OAuth: Ready`);
      }
    });

    const gracefulShutdown = () => {
      console.log('\nShutting down Server...');
      
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });

      // Force shutdown after 10 seconds
      setTimeout(() => {
        console.error('Forcing shutdown');
        process.exit(1);
      }, 10000);
    };

    // Handle shutdown signals
    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);

    // Handle unhandled errors
    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    });

  } catch (error) {
    console.error('Failed to start server:', error.message);
    
    // Helpful error messages
    if (error.name === 'MongoNetworkError') {
      console.error('Tip: Check your MongoDB connection string and network');
    }
    
    process.exit(1);
  }
};

// Start the server
startServer();