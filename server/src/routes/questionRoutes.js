import { Router } from 'express';
import { questionController } from '../controllers/questionController.js';

const router = Router();

router.post('/', questionController.askQuestion);
router.get('/', questionController.getHistory);
router.get('/:id', questionController.getById);

export default router;
