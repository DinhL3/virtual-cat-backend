import express, { RequestHandler } from 'express';
import { register, login } from '../controllers/authController';
import { authRateLimit } from '../middleware/rateLimit';

const router = express.Router();

router.use(authRateLimit);
router.post('/register', register);
router.post('/login', login);

export default router;
