import { Router } from 'express';
import { legalController } from '../controllers/legalController.js';

const router = Router();

router.get('/search', legalController.searchSources);
router.get('/sources/:id', legalController.getSourceById);

export default router;
