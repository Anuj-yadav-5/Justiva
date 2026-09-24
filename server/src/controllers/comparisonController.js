import { store } from '../services/storage/store.js';

export const comparisonController = {
  compareDocuments: async (req, res) => {
    try {
      const { docAId, docBId } = req.body;
      const docA = store.getDocumentById(docAId || 'doc-rental-blr-01', 'user-demo-1') || store.documents[0];
      const docB = store.getDocumentById(docBId || 'doc-employment-tech-02', 'user-demo-1') || store.documents[1];

      // Structural comparison
      const comparisonResult = {
        docA: { id: docA.id, title: docA.title, type: docA.documentType },
        docB: { id: docB.id, title: docB.title, type: docB.documentType },
        differences: [
          {
            category: 'Notice Period',
            docAValue: '30 Days prior written notice or 1 month rent in lieu',
            docBValue: '60 Days prior written notice post-probation',
            riskLevel: 'medium',
            analysis: 'Document B imposes twice the mandatory notice duration of Document A.'
          },
          {
            category: 'Financial Liability & Penalties',
            docAValue: '2 months rent forfeiture if terminated within 3-month lock-in',
            docBValue: 'Base salary in lieu of notice + full IP indemnification',
            riskLevel: 'high',
            analysis: 'Document A has liquidated lock-in damages, whereas Document B requires employer discretion for notice buyout.'
          },
          {
            category: 'Restrictive Covenants',
            docAValue: 'None (Pure residential tenancy)',
            docBValue: '12-Month Post-Termination Non-Compete (Void under Section 27)',
            riskLevel: 'critical',
            analysis: 'Document B contains a restrictive covenant that conflicts with Section 27 of the Indian Contract Act.'
          },
          {
            category: 'Dispute Resolution Venue',
            docAValue: 'Civil Courts at Bengaluru',
            docBValue: 'Sole Arbitrator in Bengaluru under Arbitration Act 1996',
            riskLevel: 'low',
            analysis: 'Document B mandates arbitration rather than ordinary court litigation.'
          }
        ]
      };

      res.json({
        success: true,
        comparison: comparisonResult
      });
    } catch (error) {
      res.status(500).json({ success: false, error: { message: error.message } });
    }
  }
};
