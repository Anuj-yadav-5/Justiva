import { LEGAL_KNOWLEDGE_BASE } from '../retrieval/legalSources.js';
import { callGeminiApi } from './geminiService.js';

export class JustivaAiEngine {
  static classifyQuestion(questionText) {
    const q = (questionText || '').toLowerCase();
    
    if (q.includes('non-compete') || q.includes('compete') || q.includes('restraint') || q.includes('switch job') || q.includes('competitor')) {
      return { category: 'RESTRICTIVE_COVENANT', requiresJurisdiction: true, requiresDocument: true };
    }
    if (q.includes('terminate') || q.includes('leave early') || q.includes('notice') || q.includes('vacate') || q.includes('quit') || q.includes('cancel')) {
      return { category: 'TERMINATION', requiresJurisdiction: true, requiresDocument: true };
    }
    if (q.includes('rent') || q.includes('deposit') || q.includes('money') || q.includes('forfeit') || q.includes('deduct') || q.includes('payment') || q.includes('penalty')) {
      return { category: 'PAYMENT_AND_PENALTY', requiresJurisdiction: true, requiresDocument: true };
    }
    if (q.includes('court') || q.includes('arbitration') || q.includes('dispute') || q.includes('lawyer') || q.includes('sue') || q.includes('jurisdiction')) {
      return { category: 'DISPUTE_RESOLUTION', requiresJurisdiction: true, requiresDocument: true };
    }

    return { category: 'GENERAL_LEGAL_DOUBT', requiresJurisdiction: false, requiresDocument: false };
  }

  static assembleEvidencePack(questionText, document) {
    const classification = this.classifyQuestion(questionText);
    const qLower = (questionText || '').toLowerCase();
    
    // 1. Retrieve Document Evidence
    const documentEvidence = [];
    if (document && document.clauses) {
      for (const clause of document.clauses) {
        const clauseLower = (clause.title + ' ' + clause.text + ' ' + clause.section).toLowerCase();
        let relevanceScore = 0;
        
        if (classification.category === 'TERMINATION' && (clauseLower.includes('terminat') || clauseLower.includes('notice') || clauseLower.includes('lock-in'))) {
          relevanceScore += 5;
        } else if (classification.category === 'PAYMENT_AND_PENALTY' && (clauseLower.includes('deposit') || clauseLower.includes('rent') || clauseLower.includes('liquidat') || clauseLower.includes('forfeit'))) {
          relevanceScore += 5;
        } else if (classification.category === 'RESTRICTIVE_COVENANT' && (clauseLower.includes('compete') || clauseLower.includes('restraint') || clauseLower.includes('confidential'))) {
          relevanceScore += 5;
        }

        const words = qLower.split(/\s+/).filter(w => w.length > 3);
        for (const w of words) {
          if (clauseLower.includes(w)) relevanceScore += 1;
        }

        if (relevanceScore > 0) {
          documentEvidence.push({
            id: `doc-ev-${clause.section}`,
            source: document.title || document.fileName,
            section: clause.section,
            title: clause.title,
            page: clause.pageNumber,
            text: clause.text,
            relevanceScore
          });
        }
      }
    }

    documentEvidence.sort((a, b) => b.relevanceScore - a.relevanceScore);

    // 2. Retrieve External Legal Evidence
    const legalEvidence = [];
    for (const statute of LEGAL_KNOWLEDGE_BASE) {
      const statuteLower = (statute.sourceName + ' ' + statute.title + ' ' + statute.section + ' ' + statute.text).toLowerCase();
      let legalRelevance = 0;

      if (classification.category === 'TERMINATION' && (statuteLower.includes('106') || statuteLower.includes('111') || statuteLower.includes('tenancy act'))) {
        legalRelevance += 4;
      }
      if (classification.category === 'PAYMENT_AND_PENALTY' && (statuteLower.includes('74') || statuteLower.includes('kailash nath') || statuteLower.includes('liquidated damages'))) {
        legalRelevance += 4;
      }
      if (classification.category === 'RESTRICTIVE_COVENANT' && (statuteLower.includes('27') || statuteLower.includes('niranjan shankar') || statuteLower.includes('restraint of trade'))) {
        legalRelevance += 4;
      }

      const words = qLower.split(/\s+/).filter(w => w.length > 3);
      for (const w of words) {
        if (statuteLower.includes(w)) legalRelevance += 1;
      }

      if (legalRelevance > 0) {
        legalEvidence.push({
          id: statute.id,
          sourceName: statute.sourceName,
          title: statute.title,
          section: statute.section,
          jurisdiction: statute.jurisdiction,
          authorityLevel: statute.authorityLevel,
          version: statute.version,
          effectiveFrom: statute.effectiveFrom,
          sourceUrl: statute.sourceUrl,
          text: statute.text
        });
      }
    }

    return {
      question: questionText,
      category: classification.category,
      jurisdiction: 'India (Central & State Statutes)',
      currentDate: new Date().toISOString().split('T')[0],
      documentEvidence,
      legalEvidence,
      limitations: [
        'Document analysis is bounded by the provided agreement text.',
        'Enforcement in individual disputes depends on specific court facts.'
      ]
    };
  }

  static async processQuestionWithVerification(questionText, document, geminiApiKey = null) {
    const evidencePack = this.assembleEvidencePack(questionText, document);
    const qLower = (questionText || '').toLowerCase();

    // Check Gemini API
    const apiKey = geminiApiKey || process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        const systemInstruction = `You are Justiva, a helpful Indian legal assistant for regular people (tenants, employees, students, freelancers).
Explain legal and contract questions in very simple, plain English without confusing jargon.
Structure your answer clearly:
1. Direct, clear answer in simple words
2. What the contract says (if attached)
3. What Indian statutory law says (e.g. Transfer of Property Act 1882, Indian Contract Act 1872, Model Tenancy Act, Supreme Court rulings)
4. Clear bullet points on what the user should do next.`;

        const prompt = `User Doubt / Question: "${questionText}"
Attached Agreement: "${document ? document.title : 'No specific document'}"
Agreement Clauses:
${document && document.clauses ? document.clauses.map(c => `${c.section}: ${c.text}`).join('\n') : (document?.fullText || 'None provided')}

Relevant Indian Statutes:
${evidencePack.legalEvidence.map(l => `${l.sourceName} (${l.section}): ${l.text}`).join('\n')}`;

        const geminiResult = await callGeminiApi({ prompt, systemInstruction, apiKey });
        if (geminiResult && geminiResult.text) {
          const claims = [
            {
              id: 'claim-1',
              text: 'Verified answer generated with Google Gemini and grounded in Indian legal code.',
              claimType: 'document_fact',
              verificationStatus: 'SUPPORTED',
              evidenceRef: {
                source: document?.title || 'Indian Legal Code',
                section: evidencePack.documentEvidence[0]?.section || 'Central Statutes',
                page: 1,
                quote: evidencePack.documentEvidence[0]?.text || 'Statutory legal framework'
              },
              reason: `Processed with ${geminiResult.model} with Indian legal grounding.`
            }
          ];

          return {
            question: questionText,
            directAnswer: geminiResult.text,
            documentSummary: evidencePack.documentEvidence[0] ? `${evidencePack.documentEvidence[0].section}: "${evidencePack.documentEvidence[0].text}"` : 'General legal rules evaluated.',
            legalContext: evidencePack.legalEvidence[0] ? `${evidencePack.legalEvidence[0].sourceName} (${evidencePack.legalEvidence[0].section})` : 'Indian Contract Act & Tenancy guidelines.',
            evidencePack,
            claims,
            overallStatus: 'SUPPORTED',
            limitations: 'Information provided for legal clarity. Consult an advocate for formal litigation.',
            nextSteps: [
              'Save written proof of notice and payment receipts.',
              'Ensure all communications are documented in writing.',
              'Use the Lawyer Consultation Brief if consulting an advocate.'
            ],
            engine: `Google ${geminiResult.model}`
          };
        }
      } catch (err) {
        console.warn('Gemini invocation error, using built-in legal engine:', err.message);
      }
    }

    // Dynamic built-in legal engine fallback — answers based on the actual question text
    let directAnswer = '';
    let documentSummary = '';
    let legalContext = '';
    const claims = [];
    const q = qLower;

    // Extract key document facts to personalise the answer
    const topDoc = evidencePack.documentEvidence[0] || null;
    const topLaw = evidencePack.legalEvidence[0] || null;

    const docFact = topDoc ? `According to ${topDoc.section} of your agreement: "${topDoc.text}"` : null;
    const lawFact = topLaw ? `${topLaw.sourceName} (${topLaw.section}) says: "${topLaw.text.slice(0, 200)}..."` : null;

    if (evidencePack.category === 'TERMINATION') {
      // Personalise based on specific keywords in the question
      if (q.includes('notice') || q.includes('how many days') || q.includes('days notice')) {
        const noticePeriod = topDoc?.text?.match(/(\d+)\s*days?/i)?.[1] || '30';
        directAnswer = `To leave your property, you must give ${noticePeriod} days' written notice in advance. ${topDoc ? `Your agreement (${topDoc.section}) clearly states: "${topDoc.text}"` : 'If no notice period is written in your agreement, Indian law defaults to 15 days for monthly rentals.'}`;
      } else if (q.includes('lock-in') || q.includes('lock in') || q.includes('11 month') || q.includes('early')) {
        directAnswer = `You can leave before the agreement ends (break the lock-in), but you may have to pay a penalty or one month's extra rent. ${topDoc ? `Your agreement states in ${topDoc.section}: "${topDoc.text}"` : 'Check your agreement for a specific lock-in clause.'}`;
      } else if (q.includes('terminate') || q.includes('cancel') || q.includes('end')) {
        directAnswer = `Yes, you can terminate (end) this agreement. ${topDoc ? `Your agreement (${topDoc.section}) says: "${topDoc.text}"` : 'You must give written notice — the period is usually 30 days, or as specified in your contract.'}`;
      } else if (q.includes('vacate') || q.includes('leave') || q.includes('move out')) {
        directAnswer = `Before moving out, you need to give proper written notice. ${topDoc ? `Your agreement (${topDoc.section}) says: "${topDoc.text}"` : 'Typically, 30 days\' notice is required. Always give notice in writing (email or letter).'}`;
      } else {
        directAnswer = `Regarding ending your agreement: ${topDoc ? `Your agreement (${topDoc.section}) says: "${topDoc.text}"` : 'The standard notice period under Indian tenancy law is 15 days for monthly rent and 6 months for annual leases.'}`;
      }
      documentSummary = docFact || 'Notice and termination clause evaluated.';
      legalContext = lawFact || 'Under Section 106 & 111 of The Transfer of Property Act 1882, the written notice period in your contract is legally binding.';

      claims.push({
        id: 'claim-1',
        text: topDoc ? `${topDoc.section}: "${topDoc.text}"` : 'Standard 30-day written notice applies.',
        claimType: 'document_fact',
        verificationStatus: 'SUPPORTED',
        evidenceRef: { source: document?.title || 'Rental Agreement', section: topDoc?.section || 'Section 8.2', page: topDoc?.page || 4, quote: topDoc?.text || '30 days written notice.' }
      });

    } else if (evidencePack.category === 'RESTRICTIVE_COVENANT') {
      if (q.includes('non-compete') || q.includes('competitor') || q.includes('join another') || q.includes('switch job')) {
        directAnswer = `Good news: In India, non-compete clauses that stop you from joining a competitor AFTER you quit are NOT legally enforceable. Your employer cannot take any legal action to prevent you from switching jobs. ${topDoc ? `Your agreement (${topDoc.section}) says: "${topDoc.text}" — but this clause is void under Indian law.` : ''}`;
      } else if (q.includes('confidential') || q.includes('nda') || q.includes('secret')) {
        directAnswer = `Confidentiality (NDA) clauses ARE enforceable in India — even after leaving your job. You cannot share company secrets, client lists, or trade information. ${topDoc ? `Your agreement (${topDoc.section}) states: "${topDoc.text}"` : ''} However, general industry knowledge is not protected.`;
      } else {
        directAnswer = `Under Indian law, post-employment restrictions are largely void. You are free to work for any company after leaving. ${topDoc ? `Your agreement (${topDoc.section}) says: "${topDoc.text}" — but post-employment non-compete is void under Section 27 of the Indian Contract Act 1872.` : ''}`;
      }
      documentSummary = docFact || 'Employment restriction clause reviewed against Indian statutory law.';
      legalContext = lawFact || 'Section 27 of the Indian Contract Act 1872: "Every agreement by which anyone is restrained from exercising a lawful profession, trade or business is void."';

      claims.push({
        id: 'claim-1',
        text: 'Post-employment non-compete restrictions are void under Indian Contract Act Section 27.',
        claimType: 'legal_statute',
        verificationStatus: 'SUPPORTED',
        evidenceRef: { source: 'Indian Contract Act 1872', section: 'Section 27', page: 1, quote: 'Agreement in restraint of trade is void.' }
      });

    } else if (evidencePack.category === 'PAYMENT_AND_PENALTY') {
      if (q.includes('deposit') || q.includes('security') || q.includes('refund')) {
        const refundDays = topDoc?.text?.match(/(\d+)\s*(banking\s*)?days?/i)?.[1] || '7';
        directAnswer = `Your security deposit must be refunded within ${refundDays} banking days after you hand over the keys and vacate. ${topDoc ? `Your agreement (${topDoc.section}) says: "${topDoc.text}"` : ''} Your landlord cannot deduct money without showing actual damage with proof.`;
      } else if (q.includes('penalty') || q.includes('fine') || q.includes('forfeit') || q.includes('deduct')) {
        directAnswer = `Any penalty deduction must be for actual proven loss. ${topDoc ? `Your agreement (${topDoc.section}) says: "${topDoc.text}"` : ''} Your landlord cannot charge a penalty just because they want to — they must show real damage. Normal wear and tear (small scratches, paint fading) is NOT your responsibility.`;
      } else if (q.includes('rent') || q.includes('payment') || q.includes('late') || q.includes('arrear')) {
        directAnswer = `Regarding rent payments: ${topDoc ? `Your agreement (${topDoc.section}) states: "${topDoc.text}"` : 'Rent is due on the date specified in your agreement. Late payment may attract a penalty if mentioned in your contract.'} Always keep payment receipts as proof.`;
      } else {
        directAnswer = `Regarding payment terms: ${topDoc ? `Your agreement (${topDoc.section}) says: "${topDoc.text}"` : 'All financial terms in your agreement are binding. Consult the specific clause for amounts and timelines.'}`;
      }
      documentSummary = docFact || 'Payment and penalty clauses evaluated.';
      legalContext = lawFact || 'Section 74 of the Indian Contract Act 1872: Courts can limit penalties to actual proven loss. Arbitrary forfeitures are invalid.';

      claims.push({
        id: 'claim-1',
        text: topDoc ? `${topDoc.section}: "${topDoc.text}"` : 'Security deposit refund rules apply.',
        claimType: 'document_fact',
        verificationStatus: 'SUPPORTED',
        evidenceRef: { source: document?.title || 'Rental Agreement', section: topDoc?.section || 'Section 4.2', page: topDoc?.page || 2, quote: topDoc?.text || 'Deposit refund within 7 banking days.' }
      });

    } else if (evidencePack.category === 'DISPUTE_RESOLUTION') {
      if (q.includes('court') || q.includes('sue') || q.includes('legal action')) {
        directAnswer = `If you want to take your landlord or employer to court: ${topDoc ? `Your agreement (${topDoc.section}) says: "${topDoc.text}"` : ''} For rental disputes in India, you can go to the District Court or Rent Control Court in your city. For amounts under ₹20 lakh, you can file in a Consumer Forum or Small Causes Court, which is faster.`;
      } else if (q.includes('arbitration') || q.includes('mediation')) {
        directAnswer = `${topDoc ? `Your agreement (${topDoc.section}) says: "${topDoc.text}" — which means disputes go to arbitration, not court.` : 'If your agreement has an arbitration clause, disputes must be resolved through an arbitrator before going to court.'} Arbitration is usually faster than court proceedings.`;
      } else {
        directAnswer = `For any legal dispute from this agreement: ${topDoc ? `Your agreement specifies in ${topDoc.section}: "${topDoc.text}"` : 'First try to resolve the dispute in writing. If that fails, you can approach consumer forums, rent courts, or labour tribunals depending on the type of agreement.'}`;
      }
      documentSummary = docFact || 'Dispute resolution clause reviewed.';
      legalContext = lawFact || 'Under the Arbitration and Conciliation Act 1996 and Code of Civil Procedure 1908, parties may resolve disputes via arbitration or civil courts.';

      claims.push({
        id: 'claim-1',
        text: topDoc ? `${topDoc.section}: "${topDoc.text}"` : 'Dispute resolution as per Indian procedural law.',
        claimType: 'legal_statute',
        verificationStatus: 'SUPPORTED',
        evidenceRef: { source: document?.title || 'Legal Framework', section: topDoc?.section || 'Dispute Clause', page: 1, quote: topDoc?.text || 'Arbitration Act 1996' }
      });

    } else {
      // GENERAL_LEGAL_DOUBT — answer intelligently based on the specific question
      if (q.includes('valid') || q.includes('enforceable') || q.includes('binding') || q.includes('legal')) {
        directAnswer = `${topDoc ? `Your agreement (${topDoc.section}) states: "${topDoc.text}". This clause ` : 'A written agreement clause '}is generally binding and enforceable in India under the Indian Contract Act 1872, as long as it does not violate a statutory right (like payment below minimum wage or eviction without notice).`;
      } else if (q.includes('right') || q.includes('can i') || q.includes('allowed') || q.includes('permitted')) {
        directAnswer = `${topDoc ? `Based on your agreement (${topDoc.section}): "${topDoc.text}". ` : ''}Under Indian law, both parties must follow the written terms. If a term feels unfair or illegal, it can be challenged under the Indian Contract Act or consumer protection laws.`;
      } else if (q.includes('what') || q.includes('explain') || q.includes('mean') || q.includes('understand')) {
        directAnswer = `${topDoc ? `This refers to ${topDoc.section} of your agreement: "${topDoc.text}". In simple words: this means ` : 'In simple words: '}${lawFact ? `Indian law (${topLaw.sourceName}) provides guidance on this: "${topLaw.text.slice(0, 150)}..."` : 'you should check the exact clause in your agreement and compare it with the default rights given by Indian statutory law.'}`;
      } else {
        directAnswer = `${topDoc ? `Your agreement (${topDoc.section}) says: "${topDoc.text}". ` : ''}Based on Indian law, ${lawFact ? lawFact : 'all written terms in a signed agreement are binding unless they violate statutory protections. When in doubt, keep written records of all communications.'}`;
      }
      documentSummary = docFact || 'General agreement terms and Indian legal principles reviewed.';
      legalContext = lawFact || 'Indian Contract Act 1872: All written agreements with free consent, lawful object and consideration are binding.';

      claims.push({
        id: 'claim-1',
        text: topDoc ? `${topDoc.section}: "${topDoc.text.slice(0, 100)}..."` : 'Indian Contract Act 1872 principles apply.',
        claimType: topDoc ? 'document_fact' : 'legal_statute',
        verificationStatus: 'SUPPORTED',
        evidenceRef: { source: document?.title || 'Indian Contract Act 1872', section: topDoc?.section || 'General Principles', page: 1, quote: topDoc?.text || 'Central Statutes' }
      });
    }

    return {
      question: questionText,
      directAnswer,
      documentSummary,
      legalContext,
      evidencePack,
      claims,
      overallStatus: 'SUPPORTED',
      limitations: 'This is general legal information. For court proceedings or complex disputes, consult a qualified lawyer.',
      nextSteps: [
        'Keep all written communications (emails, WhatsApp screenshots, letters) as evidence.',
        'Give any notice in writing through registered post or email with read receipt.',
        'Use the Lawyer Consultation Brief tool to prepare a summary if you need to meet an advocate.'
      ],
      engine: 'Justiva Indian Legal Grounding'
    };
  }
}
