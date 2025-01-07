import express from 'express';
import { auth } from '../middleware/auth';
import { adoptCat } from '../controllers/catController';

const router = express.Router();

router.post('/adopt', auth, adoptCat);

export default router;
