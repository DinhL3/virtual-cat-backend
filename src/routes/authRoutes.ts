import express, { RequestHandler } from 'express';
import { register, login } from '../controllers/authController';
import rateLimit from 'express-rate-limit';

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
}) as RequestHandler;

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);

export default router;
