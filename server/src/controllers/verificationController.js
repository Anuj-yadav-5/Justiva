import { store } from '../services/storage/store.js';

export const verificationController = {
  // Get verification graph for a question
  getGraph: async (req, res) => {
    try {
      const { questionId } = req.params;
      const q = store.getQuestionById(questionId);
      if (!q) {
        return res.status(404).json({ success: false, error: { message: 'Question not found' } });
      }

      // Build structured graph nodes & links
      const nodes = [
        { id: 'node-q', type: 'question', label: q.question },
        ...(q.claims || []).map((c, i) => ({ id: `node-c-${i}`, type: 'claim', label: c.text, status: c.verificationStatus })),
        ...(q.evidencePack?.documentEvidence || []).map((d, i) => ({ id: `node-d-${i}`, type: 'document', label: `${d.source} (${d.section})` })),
        ...(q.evidencePack?.legalEvidence || []).map((l, i) => ({ id: `node-l-${i}`, type: 'legal_source', label: `${l.sourceName} (${l.section})` }))
      ];

      res.json({
        success: true,
        graph: {
          questionId,
          nodes,
          status: q.overallStatus
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, error: { message: error.message } });
    }
  }
};
