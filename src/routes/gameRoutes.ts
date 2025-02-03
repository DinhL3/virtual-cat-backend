import express, { RequestHandler } from 'express';
import { auth } from '../middleware/auth';
import { register, login } from '../controllers/authController';
import { newGame } from '../controllers/gameController';
// import rateLimit from 'express-rate-limit';

const router = express.Router();

router.post('new', auth, newGame);

export default router;
