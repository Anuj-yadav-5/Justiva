import { store } from '../services/storage/store.js';

export const legalController = {
  // Search authoritative Indian legal statutes and Supreme Court cases
  searchSources: async (req, res) => {
    try {
      const { query } = req.query;
      const results = store.searchLegal(query);
      res.json({
        success: true,
        count: results.length,
        sources: results
      });
    } catch (error) {
      res.status(500).json({ success: false, error: { message: error.message } });
    }
  },

  // Get specific legal authority details
  getSourceById: async (req, res) => {
    try {
      const { id } = req.params;
      const source = store.legalSources.find(s => s.id === id);
      if (!source) {
        return res.status(404).json({ success: false, error: { message: 'Legal authority not found' } });
      }
      res.json({ success: true, source });
    } catch (error) {
      res.status(500).json({ success: false, error: { message: error.message } });
    }
  }
};
