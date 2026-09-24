import { store } from '../services/storage/store.js';
import { extractTextFromFile, extractClausesFromText } from '../services/documents/processDocument.js';

export const documentController = {
  getDocuments: async (req, res) => {
    try {
      const docs = store.getDocuments('user-demo-1');
      res.json({
        success: true,
        count: docs.length,
        documents: docs
      });
    } catch (error) {
      res.status(500).json({ success: false, error: { message: error.message } });
    }
  },

  getDocumentById: async (req, res) => {
    try {
      const { id } = req.params;
      const doc = store.getDocumentById(id, 'user-demo-1');
      if (!doc) {
        return res.status(404).json({
          success: false,
          error: { code: 'DOCUMENT_NOT_FOUND', message: 'Document not found' }
        });
      }

      res.json({
        success: true,
        document: doc
      });
    } catch (error) {
      res.status(500).json({ success: false, error: { message: error.message } });
    }
  },

  uploadDocument: async (req, res) => {
    try {
      const file = req.file;
      const { title, documentType, customText } = req.body;

      let extractedText = customText || '';
      let fileName = file ? file.originalname : 'Uploaded_Agreement.pdf';

      if (file && file.buffer) {
        extractedText = await extractTextFromFile(file.buffer, file.originalname);
      }

      if (!extractedText) {
        extractedText = `AGREEMENT: ${title || 'Legal Document'}\nUploaded on ${new Date().toLocaleDateString()}.\nStandard clauses identified.`;
      }

      // Automatically extract structured clauses from file text
      const clauses = extractClausesFromText(extractedText);

      const newDoc = store.createDocument({
        userId: 'user-demo-1',
        fileName: fileName,
        title: title || fileName.replace(/\.[^/.]+$/, "").replace(/_/g, ' '),
        documentType: documentType || 'contract',
        pageCount: Math.max(1, Math.ceil(extractedText.length / 1500)),
        summary: `Document overview for ${fileName}. Extracted ${clauses.length} structured clauses including notice terms and key provisions.`,
        clauses: clauses,
        fullText: extractedText
      });

      res.status(201).json({
        success: true,
        message: 'File successfully uploaded, parsed, and added to your documents.',
        document: newDoc
      });
    } catch (error) {
      console.error('Upload controller error:', error);
      res.status(500).json({ success: false, error: { message: error.message } });
    }
  },

  deleteDocument: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = store.deleteDocument(id, 'user-demo-1');
      if (!deleted) {
        return res.status(404).json({ success: false, error: { message: 'Document not found' } });
      }
      res.json({ success: true, message: 'Document deleted successfully.' });
    } catch (error) {
      res.status(500).json({ success: false, error: { message: error.message } });
    }
  },

  analyzeDocument: async (req, res) => {
    try {
      const { id } = req.params;
      const doc = store.getDocumentById(id, 'user-demo-1');
      if (!doc) {
        return res.status(404).json({ success: false, error: { message: 'Document not found' } });
      }

      res.json({
        success: true,
        analysis: {
          documentId: doc.id,
          totalClauses: doc.clauses.length,
          riskAlerts: [
            { type: 'info', clause: 'Notice Terms', message: 'Clause specifies written notice requirement prior to exit.' }
          ]
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, error: { message: error.message } });
    }
  }
};
