import express, { RequestHandler } from 'express';
import { auth } from '../middleware/auth';
import {
  newGame,
  checkGameSave,
  loadGame,
} from '../controllers/gameController';
import {
  resourceIntensiveRateLimit,
  standardRateLimit,
} from '../middleware/rateLimit';

const router = express.Router();

// Apply stricter rate limits to resource-intensive operations
router.post('/new', auth, resourceIntensiveRateLimit, newGame);
router.get('/load', auth, resourceIntensiveRateLimit, loadGame);

// Apply standard rate limits to lightweight operations
router.get('/check', auth, standardRateLimit, checkGameSave);

export default router;
