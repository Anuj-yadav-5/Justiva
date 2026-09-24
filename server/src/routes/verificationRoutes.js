import { Router } from 'express';
import { verificationController } from '../controllers/verificationController.js';

const router = Router();

router.get('/graph/:questionId', verificationController.getGraph);

export default router;
