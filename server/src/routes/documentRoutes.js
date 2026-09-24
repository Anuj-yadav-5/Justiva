import { Router } from 'express';
import multer from 'multer';
import { documentController } from '../controllers/documentController.js';
import { lawyerBriefController } from '../controllers/lawyerBriefController.js';

// Store in memory buffer so pdf-parse and text extractors can process directly
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 30 * 1024 * 1024 } // 30 MB
});

const router = Router();

router.get('/', documentController.getDocuments);
router.post('/upload', upload.single('file'), documentController.uploadDocument);
router.get('/:id', documentController.getDocumentById);
router.delete('/:id', documentController.deleteDocument);
router.post('/:id/analyze', documentController.analyzeDocument);
router.post('/:id/lawyer-brief', lawyerBriefController.generateBrief);

export default router;
