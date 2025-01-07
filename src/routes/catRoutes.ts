import express from 'express';
import { auth } from '../middleware/auth';
import { actionRateLimit } from '../middleware/rateLimit';
import { adoptCat } from '../controllers/catController';

const router = express.Router();

router.post('/adopt', auth, adoptCat);
// router.post('/feed/:id', auth, actionRateLimit, feedCat);
// router.post('/play/:id', auth, actionRateLimit, playCat);

export default router;
