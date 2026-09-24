import { Router } from 'express';
import { comparisonController } from '../controllers/comparisonController.js';

const router = Router();

router.post('/', comparisonController.compareDocuments);

export default router;
