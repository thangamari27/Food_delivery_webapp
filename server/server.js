// module import
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require("cookie-parser");
const morgan = require('morgan');

const authRoutes = require('./src/routes/authRoutes');
const errorHandler = require('./src/middleware/errorHandler');
const { apiLimiter } = require('./src/middleware/rateLimiter');
const ApiError = require('./src/utils/ApiError');

// config and db import
const { PORT, NODE_ENV } = require('./src/config/env');
const { connectDB } = require('./src/config/db');

// initial app setup
const app = express();

// use app
app.use(express.json());

app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cors());
app.use(helmet());

// Cookie parser
app.use(cookieParser());

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

// Global error handler
app.use(errorHandler);

// app start
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} in ${NODE_ENV} mode`);
      console.log(`API URL: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();