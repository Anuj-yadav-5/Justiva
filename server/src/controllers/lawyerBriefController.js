import { store } from '../services/storage/store.js';

export const lawyerBriefController = {
  generateBrief: async (req, res) => {
    try {
      const { documentId, specificQuestions } = req.body;
      const doc = store.getDocumentById(documentId || 'doc-rental-blr-01', 'user-demo-1') || store.documents[0];

      const brief = {
        generatedAt: new Date().toISOString(),
        clientReference: 'Anuj Yadav (User Demo)',
        documentTitle: doc.title,
        documentType: doc.documentType,
        executiveSummary: doc.summary,
        criticalClauses: (doc.clauses || []).map(c => ({
          section: c.section,
          title: c.title,
          summary: c.text,
          page: c.pageNumber
        })),
        highlightedLegalQuestions: specificQuestions && specificQuestions.length > 0 ? specificQuestions : [
          'Whether the 3-month lock-in liquidated damages clause in Section 8.4 satisfies Section 74 proof of damage test.',
          'Whether 30 days written notice served via electronic communication (WhatsApp / Email) constitutes valid service under Karnataka tenancy norms.'
        ],
        evidentiaryChecklist: [
          { item: 'Signed copy of Agreement', status: 'Available in Justiva' },
          { item: 'Proof of Security Deposit transfer (₹1,50,000)', status: 'Pending Client Submission' },
          { item: 'Written copy of Handover / Notice acknowledgement', status: 'Required prior to filing' }
        ],
        unresolvedAmbiguities: [
          'Document does not specify bank account details for deposit refund.',
          'Painting deduction clause does not mandate itemized receipt inspection.'
        ],
        recommendedLawyerQuestions: [
          'Can the landlord deduct painting charges if the tenancy duration is less than 6 months?',
          'What is the immediate legal recourse under the Model Tenancy framework if deposit is delayed past 7 banking days?'
        ]
      };

      res.json({
        success: true,
        brief
      });
    } catch (error) {
      res.status(500).json({ success: false, error: { message: error.message } });
    }
  }
};
