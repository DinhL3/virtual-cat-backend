import express, { RequestHandler } from 'express';
import { auth } from '../middleware/auth';
import {
  newGame,
  checkGameSave,
  loadGame,
} from '../controllers/gameController';
// import rateLimit from 'express-rate-limit';

const router = express.Router();

router.post('/new', auth, newGame);
router.get('/check', auth, checkGameSave);
router.get('/load', auth, loadGame);

export default router;
