import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import catRoutes from './routes/catRoutes';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev')); // Add Morgan middleware

// Connect to DB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cats', catRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Virtual Cat Backend API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
