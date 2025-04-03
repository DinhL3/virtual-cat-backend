import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import gameRoutes from './routes/gameRoutes';
import { globalRateLimit } from './middleware/rateLimit';

dotenv.config();

const app = express();

// Apply a global rate limit as the first middleware
app.use(globalRateLimit);

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev')); // Add Morgan middleware

// Connect to DB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/game', gameRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Virtual Cat Backend API');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
