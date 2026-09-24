import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import documentRoutes from './routes/documentRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import verificationRoutes from './routes/verificationRoutes.js';
import comparisonRoutes from './routes/comparisonRoutes.js';
import legalRoutes from './routes/legalRoutes.js';

const app = express();

// Middlewares
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    product: 'Justiva Legal Intelligence Engine',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/verification', verificationRoutes);
app.use('/api/comparison', comparisonRoutes);
app.use('/api/legal', legalRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('API Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      message: err.message || 'An unexpected error occurred.'
    }
  });
});

export default app;
