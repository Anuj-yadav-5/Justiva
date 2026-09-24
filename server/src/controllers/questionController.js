import { store } from '../services/storage/store.js';
import { JustivaAiEngine } from '../services/ai/aiEngine.js';

export const questionController = {
  // Ask a question or submit a doubt with optional document text / Gemini API key
  askQuestion: async (req, res) => {
    try {
      const { documentId, question, customDocumentText, geminiApiKey } = req.body;
      if (!question) {
        return res.status(400).json({ success: false, error: { message: 'Question or doubt string is required' } });
      }

      let doc = documentId ? store.getDocumentById(documentId, 'user-demo-1') : null;
      
      // If user uploaded/pasted temporary document text directly in the chatbot
      if (!doc && customDocumentText) {
        doc = {
          id: `temp-doc-${Date.now()}`,
          title: 'Attached Contract / Document Text',
          fileName: 'user_attached_contract.txt',
          fullText: customDocumentText,
          clauses: [
            {
              section: 'Attached Clause',
              title: 'User Document Text',
              pageNumber: 1,
              text: customDocumentText
            }
          ]
        };
      }

      const verificationResult = await JustivaAiEngine.processQuestionWithVerification(question, doc, geminiApiKey);

      const savedQuestion = store.saveQuestion({
        userId: 'user-demo-1',
        documentId: documentId || doc?.id || null,
        question: question,
        category: verificationResult.evidencePack.category,
        directAnswer: verificationResult.directAnswer,
        documentSummary: verificationResult.documentSummary,
        legalContext: verificationResult.legalContext,
        evidencePack: verificationResult.evidencePack,
        claims: verificationResult.claims,
        overallStatus: verificationResult.overallStatus,
        limitations: verificationResult.limitations,
        nextSteps: verificationResult.nextSteps,
        engine: verificationResult.engine
      });

      res.status(201).json({
        success: true,
        data: savedQuestion
      });
    } catch (error) {
      console.error('Error processing question:', error);
      res.status(500).json({ success: false, error: { message: error.message } });
    }
  },

  getHistory: async (req, res) => {
    try {
      const { documentId } = req.query;
      const history = store.getQuestionsByDocument(documentId, 'user-demo-1');
      res.json({
        success: true,
        count: history.length,
        questions: history
      });
    } catch (error) {
      res.status(500).json({ success: false, error: { message: error.message } });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const item = store.getQuestionById(id);
      if (!item) {
        return res.status(404).json({ success: false, error: { message: 'Question record not found' } });
      }
      res.json({ success: true, data: item });
    } catch (error) {
      res.status(500).json({ success: false, error: { message: error.message } });
    }
  }
};
