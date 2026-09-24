# Justiva --- Product Requirements Document (PRD)

## 1. Product Overview

**Product:** Justiva\
**Category:** AI Legal Assistance & Document Intelligence\
**Initial Market:** India\
**Primary Platform:** Web application

### Core statement

> **Legal answers, backed by evidence.**

### Product philosophy

> **AI explains. Evidence supports. Verification checks. You decide.**

Justiva helps people understand legal documents and legal information in
plain language. It combines document intelligence, retrieval from
authoritative legal sources, AI-generated explanations, and claim-level
verification.

Justiva is an information and document-assistance product. It must not
present itself as a lawyer, law firm, legal representative, or
substitute for qualified professional legal advice.

------------------------------------------------------------------------

## 2. Problem Statement

Legal documents are often difficult for non-lawyers to understand.
Important clauses can be buried inside long documents, while deadlines,
obligations, penalties, termination conditions, and jurisdiction clauses
may be easy to miss.

General-purpose AI can explain legal concepts, but a fluent answer is
not necessarily a supported answer.

Users need a workflow that can:

1.  Understand their document.
2.  Find relevant evidence.
3.  Explain the evidence in plain language.
4.  Separate document facts from general legal information.
5.  Verify important AI claims.
6.  Clearly say when evidence is insufficient.
7.  Prepare useful information for discussion with a qualified
    professional.

------------------------------------------------------------------------

## 3. Goals

### Primary goals

-   Make legal documents easier to understand.
-   Allow natural-language questions over uploaded documents.
-   Retrieve relevant authoritative legal sources.
-   Provide citations/evidence for important claims.
-   Verify generated claims against retrieved evidence.
-   Detect contradictions between relevant sources or documents.
-   Abstain when evidence is insufficient.
-   Generate structured summaries and lawyer-ready question briefs.
-   Maintain strong privacy and document isolation.

### Secondary goals

-   Compare two legal documents.
-   Extract dates and create timelines.
-   Track obligations and deadlines.
-   Support multiple Indian legal source types.
-   Add multilingual support later.

------------------------------------------------------------------------

## 4. Non-Goals

The MVP must not:

-   Act as a lawyer.
-   Create an attorney-client relationship.
-   Guarantee legal outcomes.
-   Guarantee that a document is enforceable.
-   Tell users what legal decision they must make.
-   Replace professional legal judgment.
-   Invent legal authorities or citations.
-   Present unsupported AI-generated legal claims as facts.
-   Automatically file legal cases or official applications.

------------------------------------------------------------------------

## 5. Target Users

### Individual users

People who need help understanding:

-   rental agreements
-   employment contracts
-   service agreements
-   NDAs
-   loan agreements
-   notices
-   terms and conditions
-   other personal legal documents

### Students

Students learning:

-   legal concepts
-   document analysis
-   legal research
-   AI-assisted research workflows

### Legal professionals

Potential future users who want:

-   document summaries
-   preliminary research assistance
-   comparison
-   evidence collection
-   client question preparation
-   structured briefs

------------------------------------------------------------------------

## 6. Core Use Cases

### UC-01 --- Upload and understand a document

User uploads a PDF or supported document.

Justiva:

-   extracts text
-   detects pages/sections
-   identifies important clauses
-   extracts dates
-   extracts obligations
-   extracts penalties
-   identifies termination clauses
-   generates a document overview

### UC-02 --- Ask questions about a document

Example:

> "Can I terminate this agreement early?"

The answer should identify:

-   relevant document clause
-   relevant facts
-   applicable retrieved legal information where appropriate
-   evidence
-   limitations
-   verification state

### UC-03 --- Legal information question

Example:

> "What does Indian law generally say about this type of notice?"

The system must distinguish general legal information from facts
contained in the user's document.

### UC-04 --- Claim verification

For important claims, Justiva extracts the claim and checks it against
retrieved evidence.

Possible states:

-   `SUPPORTED`
-   `PARTIALLY_SUPPORTED`
-   `CONTRADICTED`
-   `UNSUPPORTED`
-   `INSUFFICIENT_INFORMATION`
-   `REVIEW_REQUIRED`

### UC-05 --- Document comparison

Compare two documents and identify meaningful differences in:

-   payment
-   dates
-   notice period
-   termination
-   liability
-   confidentiality
-   jurisdiction
-   dispute resolution
-   newly added/deleted clauses

### UC-06 --- Lawyer brief

Generate a concise brief containing:

-   document overview
-   important clauses
-   user's questions
-   relevant evidence
-   unresolved issues
-   information still needed
-   questions to discuss with a qualified professional

------------------------------------------------------------------------

## 7. Product Differentiator

Justiva is **evidence-first**, not merely answer-first.

A normal AI chatbot may produce:

> "You can terminate the agreement with 30 days' notice."

Justiva should produce a structured result:

**Claim**\
The agreement allows termination with 30 days' notice.

**Evidence**\
Rental Agreement --- Section 8.2.

**Verification**\
SUPPORTED.

**Legal context**\
Relevant retrieved source, if applicable.

**Limitation**\
The result is based on the provided document and retrieved sources;
professional advice may be appropriate for an individualized decision.

------------------------------------------------------------------------

## 8. Main Product Flow

``` text
User
  ↓
Upload Document
  ↓
Document Processing
  ↓
Text + Structure Extraction
  ↓
Chunking + Metadata
  ↓
Embeddings / Indexing
  ↓
User Question
  ↓
Question Classification
  ↓
Hybrid Retrieval
  ↓
Evidence Pack
  ↓
LLM Answer Generation
  ↓
Claim Extraction
  ↓
Claim Verification
  ↓
Citation Validation
  ↓
Final Response
  ↓
Answer + Evidence + Verification + Limitations + Next Steps
```

------------------------------------------------------------------------

## 9. MVP Features

### Authentication

-   Register
-   Login
-   Logout
-   Session/token handling
-   User-level authorization

### Documents

-   PDF upload
-   Document list
-   Document details
-   Text extraction
-   Document summary
-   Clause extraction
-   Important dates
-   Delete document

### Questions

-   Ask questions about documents
-   Store question history
-   Display cited evidence
-   Show source type
-   Show verification state

### Legal retrieval

-   Search normalized legal data
-   Hybrid keyword + vector retrieval
-   Metadata filtering
-   Source authority metadata
-   Version/date awareness

### Verification

-   Claim extraction
-   Evidence matching
-   Support detection
-   Contradiction detection
-   Abstention
-   Citation validation

### UI

-   Landing page
-   Dashboard
-   Document workspace
-   AI Q&A
-   Evidence panel
-   Verification result
-   Basic comparison
-   Disclaimer

------------------------------------------------------------------------

## 10. Document Processing

``` text
Upload
  ↓
File validation
  ↓
Security checks
  ↓
Text extraction
  ↓
Page/section detection
  ↓
Cleaning
  ↓
Chunking
  ↓
Metadata assignment
  ↓
Embedding
  ↓
Storage
```

Example chunk:

``` json
{
  "documentId": "doc_123",
  "pageNumber": 7,
  "section": "8.2",
  "text": "Either party may terminate...",
  "chunkIndex": 12,
  "sourceType": "user_document"
}
```

------------------------------------------------------------------------

## 11. Legal Data Strategy

The initial legal-source strategy should prioritize authoritative Indian
sources.

Potential source classes:

1.  Current applicable legislation.
2.  Rules and regulations.
3.  Official government/regulator notifications.
4.  Relevant judicial decisions.
5.  Other official legal material.
6.  Secondary sources only where appropriate and clearly labeled.

The ingestion system must retain:

-   source name
-   title
-   authority
-   jurisdiction
-   section
-   source URL
-   effective dates
-   version
-   last verified date
-   source type

Never treat generated AI text as legal authority.

------------------------------------------------------------------------

## 12. Retrieval Architecture

Use hybrid retrieval:

``` text
Keyword Search
      +
Vector Search
      +
Metadata Filters
      ↓
Candidate Evidence
      ↓
Reranking
      ↓
Evidence Pack
```

For user documents, metadata may include:

-   document ID
-   page
-   section
-   clause
-   document type
-   upload date

For legal sources:

-   jurisdiction
-   authority
-   source type
-   effective date
-   version
-   section

------------------------------------------------------------------------

## 13. Evidence Pack

Before the LLM generates a substantive answer, create a structured
evidence pack.

Example:

``` json
{
  "question": "Can I terminate early?",
  "documentEvidence": [
    {
      "source": "Rental Agreement",
      "section": "8.2",
      "page": 7,
      "text": "..."
    }
  ],
  "legalEvidence": [
    {
      "source": "Official Legal Source",
      "section": "...",
      "effectiveDate": "...",
      "text": "..."
    }
  ],
  "limitations": [
    "The document does not specify..."
  ]
}
```

------------------------------------------------------------------------

## 14. Verification Engine

The verifier should evaluate individual claims.

Example:

``` text
Claim:
"30 days notice is required."

Evidence:
Contract Section 8.2:
"Either party may terminate by giving 30 days written notice."

Result:
SUPPORTED
```

Contradiction example:

``` text
Document:
30 days

Retrieved current source:
Different requirement may apply in the relevant context

Result:
REVIEW_REQUIRED / POTENTIAL_CONFLICT
```

The system must not silently choose one conflicting source.

------------------------------------------------------------------------

## 15. AI Answer Structure

Every substantive answer should be organized where applicable as:

1.  Direct answer.
2.  What the document says.
3.  Relevant legal context.
4.  Evidence.
5.  Verification.
6.  Limitations.
7.  Suggested next questions/actions.

Avoid unnecessary legal jargon.

------------------------------------------------------------------------

## 16. Dashboard

Main dashboard:

-   Welcome
-   Upload document
-   Recent documents
-   Recent questions
-   Important deadlines
-   Verification alerts
-   Quick actions

------------------------------------------------------------------------

## 17. Document Workspace

Layout:

``` text
┌─────────────────────────────────────────────┐
│ Document title                              │
├───────────────────┬─────────────────────────┤
│ Document Preview  │ Justiva AI              │
│                   │                         │
│ Page / Clause     │ Question                │
│                   │ Answer                  │
│ Highlight         │ Evidence                │
│                   │ Verification             │
└───────────────────┴─────────────────────────┘
```

------------------------------------------------------------------------

## 18. Trust and Safety UX

The interface must make evidence visible.

Important labels:

-   SOURCE
-   EVIDENCE
-   VERIFIED
-   SUPPORTED
-   CONFLICT
-   INSUFFICIENT EVIDENCE
-   NEEDS REVIEW

Do not use misleading certainty scores such as:

> 97% legally correct

unless a future validated methodology explicitly supports such a metric.

------------------------------------------------------------------------

## 19. Security

Minimum requirements:

-   HTTPS
-   secure authentication
-   password hashing
-   authorization on every document operation
-   user-level document isolation
-   input validation
-   upload size/type restrictions
-   malware/security scanning where appropriate
-   rate limiting
-   secure environment variables
-   protected object storage
-   minimal logging of sensitive content
-   clear data retention policy

------------------------------------------------------------------------

## 20. Privacy

Users must be informed:

-   where documents are stored
-   how long they are retained
-   whether documents are sent to external AI providers
-   how deletion works
-   whether data is used for model improvement
-   who can access the documents

Never expose one user's document to another user.

------------------------------------------------------------------------

## 21. Legal Disclaimer

Use a clear disclaimer:

> Justiva provides legal information and document-assistance features
> and is not a substitute for advice from a qualified legal
> professional. Information may be incomplete or dependent on facts and
> jurisdiction.

The disclaimer should be visible in relevant product flows, not hidden
only in the footer.

------------------------------------------------------------------------

## 22. Evaluation

Build a benchmark containing 50--100 manually reviewed questions.

Categories:

-   termination
-   payment
-   notice
-   penalties
-   renewal
-   obligations
-   liability
-   jurisdiction
-   confidentiality
-   dispute resolution
-   missing information

Metrics:

-   Evidence Retrieval Recall
-   Citation Accuracy
-   Claim Support Rate
-   Unsupported Claim Rate
-   Contradiction Detection Accuracy
-   Abstention Accuracy

Every AI/prompt/retrieval change should be regression-tested.

------------------------------------------------------------------------

## 23. Audit Trail

For each substantive answer, store an auditable chain:

``` text
Question
↓
Retrieved Sources
↓
Evidence
↓
Claims
↓
Verification
↓
Final Answer
```

This is important for debugging, quality review, and trust.

------------------------------------------------------------------------

## 24. Initial Document Types

MVP:

-   Rental agreements
-   Employment contracts
-   NDAs
-   Service agreements
-   Loan agreements
-   Terms and conditions
-   Legal notices

------------------------------------------------------------------------

## 25. Future Features

Phase 2:

-   OCR
-   DOCX
-   document comparison
-   timelines
-   obligation tracking
-   multilingual support
-   saved lawyer briefs

Phase 3:

-   professional workspaces
-   advanced legal research
-   regulatory change alerts
-   compliance monitoring
-   organization-level contract intelligence
-   additional jurisdictions

------------------------------------------------------------------------

## 26. Out of Scope

For MVP:

-   automatic legal filing
-   automatic representation
-   guaranteed legal advice
-   court outcome prediction
-   autonomous legal decisions
-   unsupervised communication with opposing parties
-   automatic execution of legal agreements

------------------------------------------------------------------------

## 27. Hackathon Demo Flow

Use one realistic rental agreement.

Demo:

1.  Upload agreement.
2.  Justiva extracts important clauses.
3.  Show termination clause.
4.  Ask: "Can I terminate early?"
5.  Retrieve document evidence.
6.  Retrieve relevant legal evidence.
7.  Generate answer.
8.  Extract claim.
9.  Verify claim.
10. Show `SUPPORTED`.
11. Click "Why should I trust this?"
12. Open Evidence Graph.
13. Show claim → clause → source → verification.
14. Ask a question where evidence is insufficient.
15. Show `INSUFFICIENT EVIDENCE`.

The final demo moment should communicate:

> **Justiva doesn't simply answer. It shows why the answer should or
> should not be trusted.**

------------------------------------------------------------------------

## 28. Success Criteria

MVP is complete when:

-   users can securely upload supported PDFs
-   documents are parsed successfully
-   users can ask questions
-   retrieval returns relevant evidence
-   answers cite evidence
-   claims are verified
-   unsupported claims can be rejected/abstained
-   document isolation works
-   UI is responsive
-   disclaimer is visible
-   benchmark evaluation is passing agreed quality thresholds
-   no critical security issue remains

------------------------------------------------------------------------

## 29. Product Principle

``` text
No evidence
    ↓
No strong claim.

No sufficient evidence
    ↓
Say so.

Conflicting evidence
    ↓
Show the conflict.

Relevant evidence
    ↓
Cite it.

Human/legal judgment required
    ↓
Surface the limitation.
```

Justiva should optimize for **traceability and calibrated answers**, not
maximum answer volume.
