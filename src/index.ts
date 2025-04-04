import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import path from 'path';

import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import gameRoutes from './routes/gameRoutes';
import { globalRateLimit } from './middleware/rateLimit';

dotenv.config();

const app = express();
const isDevelopment = process.env.NODE_ENV === 'development';

// Apply a global rate limit as the first middleware
app.use(globalRateLimit);

// Middleware
app.use(express.json());
app.use(cors());

// Configure Morgan based on environment
if (isDevelopment) {
  app.use(morgan('dev')); // Concise output colored by response status for development
} else {
  app.use(morgan('combined')); // Standard Apache combined log format for production
}

// Connect to DB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/game', gameRoutes);

// Root api route
app.get('/api', (req, res) => {
  res.send('Welcome to the Virtual Cat Backend API');
});

// Serve static Angular files
const angularPath = path.join(
  __dirname,
  '../frontend/dist/virtual-cat/browser',
);
app.use(express.static(angularPath));

// Catch all other routes and return Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(angularPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
