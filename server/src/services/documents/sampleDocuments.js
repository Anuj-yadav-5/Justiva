export const SAMPLE_DOCUMENTS = [
  {
    id: 'doc-rental-blr-01',
    userId: 'user-demo-1',
    fileName: 'Residential_Rental_Agreement_Indiranagar_Bangalore.pdf',
    title: 'Residential Tenancy Agreement — Indiranagar, Bengaluru',
    documentType: 'rental_agreement',
    pageCount: 6,
    summary: 'Residential lease agreement between Rajesh Kumar (Lessor) and Ananya Sharma (Lessee) for Flat 402, Green Glen Heights, Indiranagar, Bengaluru. Tenancy period is 11 months with monthly rent of ₹32,000 and refundable security deposit of ₹1,50,000.',
    status: 'processed',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    clauses: [
      {
        section: 'Section 1.1',
        title: 'Premises & Term',
        pageNumber: 1,
        text: 'The Lessor hereby grants and the Lessee hereby accepts tenancy of Residential Flat No. 402, Green Glen Heights, 12th Main, Indiranagar, Bengaluru for an initial fixed term of 11 (eleven) months commencing from 1st March 2026.'
      },
      {
        section: 'Section 3.1',
        title: 'Monthly Rent & Maintenance',
        pageNumber: 2,
        text: 'The Lessee shall pay a monthly rental of ₹32,000 (Rupees Thirty Two Thousand only), payable on or before the 5th day of each English calendar month directly into the Lessor’s nominated bank account. Building maintenance charges of ₹3,500 shall be paid separately.'
      },
      {
        section: 'Section 4.2',
        title: 'Security Deposit & Deductions',
        pageNumber: 2,
        text: 'The Lessee has deposited an interest-free refundable Security Deposit of ₹1,50,000 (Rupees One Lakh Fifty Thousand only). The Lessor shall refund the said deposit within 7 banking days of peaceful physical handover, subject to standard deductions for actual utility dues or painting charges fixed at one month rent.'
      },
      {
        section: 'Section 8.2',
        title: 'Early Termination & Notice Period',
        pageNumber: 4,
        text: 'Either party may terminate this agreement prior to the expiry of the 11-month term by serving 30 (thirty) days prior written notice to the other party or by paying one month’s rent in lieu of such notice. No early termination penalty beyond the 30-day notice period shall be levied after completion of the 3-month lock-in period.'
      },
      {
        section: 'Section 8.4',
        title: 'Lock-in Period',
        pageNumber: 4,
        text: 'Both parties agree to an initial lock-in period of 3 (three) months from the commencement date. If the Lessee vacates during the lock-in period, the security deposit to the extent of 2 months rent shall be forfeited as agreed liquidated damages.'
      },
      {
        section: 'Section 12.1',
        title: 'Governing Law and Jurisdiction',
        pageNumber: 5,
        text: 'This agreement shall be governed by and construed in accordance with the laws of India and Karnataka State tenancy regulations. The competent Civil Courts at Bengaluru shall have exclusive jurisdiction over all disputes arising out of this agreement.'
      }
    ],
    fullText: `RESIDENTIAL TENANCY AGREEMENT
This Tenancy Agreement is entered into on 24th February 2026 at Bengaluru, Karnataka.

BETWEEN:
Mr. Rajesh Kumar, residing at Indiranagar, Bengaluru (hereinafter called the "LESSOR")
AND
Ms. Ananya Sharma, employed at Koramangala, Bengaluru (hereinafter called the "LESSEE").

1. PREMISES & TERM
Section 1.1: The Lessor hereby grants and the Lessee hereby accepts tenancy of Residential Flat No. 402, Green Glen Heights, 12th Main, Indiranagar, Bengaluru for an initial fixed term of 11 (eleven) months commencing from 1st March 2026.

2. USE OF PREMISES
Section 2.1: The premises shall be used strictly for private residential purposes by the Lessee and immediate family only.

3. RENT & MAINTENANCE
Section 3.1: The Lessee shall pay a monthly rental of ₹32,000 (Rupees Thirty Two Thousand only), payable on or before the 5th day of each English calendar month directly into the Lessor’s nominated bank account. Building maintenance charges of ₹3,500 shall be paid separately.

4. SECURITY DEPOSIT
Section 4.2: The Lessee has deposited an interest-free refundable Security Deposit of ₹1,50,000 (Rupees One Lakh Fifty Thousand only). The Lessor shall refund the said deposit within 7 banking days of peaceful physical handover, subject to standard deductions for actual utility dues or painting charges fixed at one month rent.

8. TERMINATION AND NOTICE
Section 8.2: Either party may terminate this agreement prior to the expiry of the 11-month term by serving 30 (thirty) days prior written notice to the other party or by paying one month’s rent in lieu of such notice. No early termination penalty beyond the 30-day notice period shall be levied after completion of the 3-month lock-in period.
Section 8.4: Both parties agree to an initial lock-in period of 3 (three) months from the commencement date. If the Lessee vacates during the lock-in period, the security deposit to the extent of 2 months rent shall be forfeited as agreed liquidated damages.

12. GOVERNING LAW & JURISDICTION
Section 12.1: This agreement shall be governed by and construed in accordance with the laws of India and Karnataka State tenancy regulations. The competent Civil Courts at Bengaluru shall have exclusive jurisdiction over all disputes arising out of this agreement.`
  },
  {
    id: 'doc-employment-tech-02',
    userId: 'user-demo-1',
    fileName: 'Senior_Software_Engineer_Employment_Agreement.pdf',
    title: 'Employment Agreement — Senior Full Stack Engineer',
    documentType: 'employment_contract',
    pageCount: 8,
    summary: 'Employment agreement between Nexus Technologies India Pvt. Ltd. and Employee Vikram Sen. Contains 60-day notice period, 12-month post-termination non-compete clause, intellectual property assignment, and Bangalore dispute jurisdiction.',
    status: 'processed',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    clauses: [
      {
        section: 'Clause 4.1',
        title: 'Probation & Notice Period',
        pageNumber: 2,
        text: 'Following successful completion of the 3-month probationary period, either party may terminate employment by giving 60 (sixty) days prior written notice or base salary in lieu thereof, subject to mutual agreement by the management.'
      },
      {
        section: 'Clause 7.2',
        title: 'Non-Compete Covenant',
        pageNumber: 4,
        text: 'For a period of 12 (twelve) months immediately following the termination or cessation of employment with the Company for any reason, the Employee covenants not to engage, directly or indirectly, with any competing legal tech or AI SaaS firm in the territory of India.'
      },
      {
        section: 'Clause 8.1',
        title: 'Confidentiality and Proprietary Information',
        pageNumber: 5,
        text: 'The Employee shall maintain strict confidentiality regarding all proprietary algorithms, source code, customer data, and commercial trade secrets, during and indefinitely after the term of employment.'
      },
      {
        section: 'Clause 14.3',
        title: 'Governing Law and Arbitration',
        pageNumber: 7,
        text: 'This agreement shall be governed by the laws of India. Any unresolved dispute shall be referred to sole arbitration in Bengaluru in accordance with the Arbitration and Conciliation Act, 1996.'
      }
    ],
    fullText: `EMPLOYMENT AGREEMENT
Nexus Technologies India Pvt. Ltd. and Vikram Sen

4. PROBATION AND TERMINATION
Clause 4.1: Following successful completion of the 3-month probationary period, either party may terminate employment by giving 60 (sixty) days prior written notice or base salary in lieu thereof, subject to mutual agreement by the management.

7. RESTRICTIVE COVENANTS
Clause 7.2: For a period of 12 (twelve) months immediately following the termination or cessation of employment with the Company for any reason, the Employee covenants not to engage, directly or indirectly, with any competing legal tech or AI SaaS firm in the territory of India.

8. CONFIDENTIALITY
Clause 8.1: The Employee shall maintain strict confidentiality regarding all proprietary algorithms, source code, customer data, and commercial trade secrets, during and indefinitely after the term of employment.`
  }
];
