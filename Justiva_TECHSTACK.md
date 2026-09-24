# Justiva --- Technical Stack & Architecture

## 1. Technology Decision

### Frontend

-   React.js
-   Vite
-   JavaScript (not TypeScript for the initial build)
-   Tailwind CSS
-   Framer Motion
-   React Router
-   Axios
-   Lucide React

### Backend

-   Node.js
-   Express.js
-   JavaScript
-   REST API

### Database

-   MongoDB Atlas
-   MongoDB Atlas Vector Search

### AI

-   OpenAI API
-   OpenAI embeddings
-   LLM-based answer generation
-   LLM-based claim extraction
-   LLM-assisted verification with deterministic checks around it

### File Processing

-   PDF parser
-   DOCX parser in later phase
-   OCR in later phase for scanned PDFs

### Authentication

-   JWT or secure session-based authentication
-   bcrypt/Argon2 for password hashing

### Deployment

Frontend: - Vercel or equivalent

Backend: - Render / Railway / AWS / equivalent

Database: - MongoDB Atlas

Object storage: - S3-compatible storage or cloud object storage

------------------------------------------------------------------------

# 2. Frontend Architecture

``` text
React
│
├── Pages
│   ├── Home
│   ├── Login
│   ├── Register
│   ├── Dashboard
│   ├── Documents
│   ├── DocumentWorkspace
│   ├── Comparison
│   └── Settings
│
├── Components
│   ├── Navbar
│   ├── Button
│   ├── Modal
│   ├── DocumentCard
│   ├── EvidenceCard
│   ├── VerificationBadge
│   ├── SourceCard
│   └── EvidenceGraph
│
├── Services
│   ├── authService
│   ├── documentService
│   ├── questionService
│   └── verificationService
│
└── Utils
```

------------------------------------------------------------------------

# 3. React Folder Structure

``` text
client/
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── common/
│   │   ├── document/
│   │   ├── evidence/
│   │   ├── verification/
│   │   └── layout/
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Documents.jsx
│   │   ├── DocumentWorkspace.jsx
│   │   ├── Comparison.jsx
│   │   └── Settings.jsx
│   │
│   ├── services/
│   │   ├── api.js
│   │   ├── auth.js
│   │   ├── documents.js
│   │   ├── questions.js
│   │   └── verification.js
│   │
│   ├── hooks/
│   ├── utils/
│   ├── layouts/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
└── package.json
```

------------------------------------------------------------------------

# 4. Backend Architecture

``` text
server/
└── src/
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── services/
    │   ├── ai/
    │   ├── documents/
    │   ├── retrieval/
    │   ├── verification/
    │   └── legal/
    ├── utils/
    ├── app.js
    └── server.js
```

------------------------------------------------------------------------

# 5. Backend Responsibilities

### Controllers

Handle HTTP requests and responses.

### Routes

Define API endpoints.

### Services

Contain business logic.

### Models

Define MongoDB schemas.

### Middleware

Handle:

-   authentication
-   authorization
-   validation
-   rate limiting
-   error handling

------------------------------------------------------------------------

# 6. API Structure

## Authentication

``` http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

## Documents

``` http
POST   /api/documents/upload
GET    /api/documents
GET    /api/documents/:id
DELETE /api/documents/:id
POST   /api/documents/:id/analyze
```

## Questions

``` http
POST /api/documents/:id/questions
GET  /api/documents/:id/questions
GET  /api/questions/:id
```

## Verification

``` http
POST /api/questions/:id/verify
GET  /api/questions/:id/verification
```

## Comparison

``` http
POST /api/comparison
GET  /api/comparison/:id
```

## Lawyer Brief

``` http
POST /api/documents/:id/lawyer-brief
```

------------------------------------------------------------------------

# 7. Database Collections

Suggested MongoDB collections:

``` text
users
documents
document_chunks
questions
claims
evidence
verifications
comparisons
audit_logs
legal_sources
```

------------------------------------------------------------------------

# 8. User Schema

Example:

``` json
{
  "_id": "...",
  "name": "Anuj",
  "email": "...",
  "passwordHash": "...",
  "role": "user",
  "createdAt": "...",
  "updatedAt": "..."
}
```

------------------------------------------------------------------------

# 9. Document Schema

``` json
{
  "_id": "...",
  "userId": "...",
  "fileName": "rental-agreement.pdf",
  "documentType": "rental_agreement",
  "storageKey": "...",
  "status": "processed",
  "pageCount": 8,
  "summary": "...",
  "createdAt": "...",
  "updatedAt": "..."
}
```

------------------------------------------------------------------------

# 10. Document Chunk Schema

``` json
{
  "_id": "...",
  "documentId": "...",
  "userId": "...",
  "pageNumber": 7,
  "section": "8.2",
  "chunkIndex": 12,
  "text": "...",
  "embedding": [],
  "createdAt": "..."
}
```

The `userId` must be included so retrieval can enforce document
isolation.

------------------------------------------------------------------------

# 11. Legal Source Schema

``` json
{
  "_id": "...",
  "sourceName": "Official Source",
  "title": "...",
  "section": "...",
  "text": "...",
  "jurisdiction": "India",
  "sourceType": "legislation",
  "authorityLevel": "primary",
  "effectiveFrom": "...",
  "effectiveTo": null,
  "version": "...",
  "sourceUrl": "...",
  "lastVerifiedAt": "...",
  "embedding": []
}
```

------------------------------------------------------------------------

# 12. Question Schema

``` json
{
  "_id": "...",
  "userId": "...",
  "documentId": "...",
  "question": "Can I terminate early?",
  "category": "TERMINATION",
  "answer": "...",
  "status": "completed",
  "createdAt": "..."
}
```

------------------------------------------------------------------------

# 13. Claim Schema

``` json
{
  "_id": "...",
  "questionId": "...",
  "text": "The agreement requires 30 days notice.",
  "claimType": "document_fact",
  "verificationStatus": "SUPPORTED"
}
```

------------------------------------------------------------------------

# 14. Verification Schema

``` json
{
  "_id": "...",
  "claimId": "...",
  "status": "SUPPORTED",
  "evidenceIds": [],
  "reason": "...",
  "createdAt": "..."
}
```

------------------------------------------------------------------------

# 15. Retrieval Architecture

Use hybrid retrieval:

``` text
Question
   ↓
Question Classifier
   ↓
┌─────────────────────┐
│ Keyword Retrieval   │
│ Vector Retrieval    │
│ Metadata Filtering  │
└─────────────────────┘
   ↓
Candidate Evidence
   ↓
Reranking
   ↓
Evidence Pack
```

For user-document questions, retrieve only chunks belonging to the
authorized user's document.

------------------------------------------------------------------------

# 16. Embeddings

Store embeddings for:

-   document chunks
-   legal-source chunks

Use vector search to find semantically relevant evidence.

Do not use embeddings as the only retrieval mechanism.

Legal questions often depend on exact terms, section numbers, dates, and
names. Therefore combine:

-   semantic retrieval
-   lexical/keyword retrieval
-   metadata filtering

------------------------------------------------------------------------

# 17. AI Pipeline

``` text
Question
 ↓
Classify
 ↓
Retrieve
 ↓
Build Evidence Pack
 ↓
Generate Draft
 ↓
Extract Claims
 ↓
Verify Claims
 ↓
Validate Citations
 ↓
Generate Final Answer
```

The final answer should not be produced directly from the user's
question without retrieval/evidence when the question requires external
legal information.

------------------------------------------------------------------------

# 18. AI Model Responsibilities

The LLM can:

-   summarize
-   classify
-   explain
-   extract
-   transform
-   identify candidate claims
-   synthesize retrieved evidence

The LLM must NOT independently invent:

-   laws
-   sections
-   case names
-   citations
-   dates
-   legal requirements

If the evidence is insufficient, the system should abstain.

------------------------------------------------------------------------

# 19. Verification Responsibilities

Verification should combine:

### Deterministic checks

-   source exists
-   citation exists
-   citation points to retrieved text
-   document ID matches
-   user authorization is valid
-   source version is known

### Semantic checks

-   claim is supported by evidence
-   claim is only partially supported
-   evidence contradicts claim
-   evidence is insufficient

------------------------------------------------------------------------

# 20. File Upload Flow

``` text
Browser
 ↓
POST /documents/upload
 ↓
Authentication
 ↓
File validation
 ↓
File scanning
 ↓
Object storage
 ↓
Text extraction
 ↓
Chunking
 ↓
Embedding
 ↓
MongoDB
```

Do not trust the file extension alone.

Validate:

-   MIME type
-   file size
-   parser compatibility

------------------------------------------------------------------------

# 21. Authentication

Use secure authentication.

Requirements:

-   hash passwords
-   never store plain passwords
-   protect protected routes
-   validate tokens/sessions
-   enforce ownership
-   invalidate sessions where required
-   use HTTPS in production

------------------------------------------------------------------------

# 22. Authorization

Every document-related endpoint must verify:

``` text
request.user.id === document.userId
```

Never rely only on frontend checks.

The backend must enforce ownership.

------------------------------------------------------------------------

# 23. Error Handling

Use a consistent format:

``` json
{
  "success": false,
  "error": {
    "code": "DOCUMENT_NOT_FOUND",
    "message": "Document was not found."
  }
}
```

Common errors:

``` text
UNAUTHORIZED
FORBIDDEN
DOCUMENT_NOT_FOUND
INVALID_FILE
FILE_TOO_LARGE
PARSING_FAILED
RETRIEVAL_FAILED
AI_SERVICE_ERROR
INSUFFICIENT_EVIDENCE
INTERNAL_SERVER_ERROR
```

------------------------------------------------------------------------

# 24. Environment Variables

Example:

``` env
PORT=5000
MONGODB_URI=
JWT_SECRET=
OPENAI_API_KEY=
STORAGE_BUCKET=
STORAGE_ACCESS_KEY=
STORAGE_SECRET_KEY=
CLIENT_URL=
```

Never commit `.env`.

Include `.env.example`.

------------------------------------------------------------------------

# 25. Testing

Frontend:

-   component testing
-   interaction testing

Backend:

-   API tests
-   authentication tests
-   authorization tests
-   document isolation tests
-   retrieval tests
-   verification tests

AI:

-   benchmark questions
-   expected evidence
-   expected verification state
-   citation correctness

------------------------------------------------------------------------

# 26. Recommended Development Order

### Phase 1

React frontend shell

### Phase 2

Node + Express backend

### Phase 3

MongoDB connection

### Phase 4

Authentication

### Phase 5

Document upload

### Phase 6

PDF extraction

### Phase 7

Document chunking

### Phase 8

Embeddings + vector search

### Phase 9

Question answering

### Phase 10

Evidence UI

### Phase 11

Claim extraction

### Phase 12

Verification

### Phase 13

Comparison

### Phase 14

Polish + animations

### Phase 15

Testing + deployment

------------------------------------------------------------------------

# 27. Important Architecture Rule

Keep the AI logic separate from normal backend logic.

Use:

``` text
services/
├── ai/
│   ├── classifyQuestion.js
│   ├── generateAnswer.js
│   ├── extractClaims.js
│   └── verifyClaims.js
│
├── retrieval/
│   ├── vectorSearch.js
│   ├── keywordSearch.js
│   ├── rerank.js
│   └── buildEvidencePack.js
│
└── documents/
    ├── extractText.js
    ├── chunkText.js
    └── processDocument.js
```

This makes the project easier to test and replace components later.

------------------------------------------------------------------------

# 28. Deployment Architecture

``` text
User
 ↓
Vercel
React Frontend
 ↓ HTTPS
Express Backend
 ↓
MongoDB Atlas
 ↓
Object Storage

Express Backend
 ↓
AI API

Express Backend
 ↓
Legal Knowledge Base
```

------------------------------------------------------------------------

# 29. MVP Technical Definition

The MVP should be considered technically complete when:

-   React UI works
-   authentication works
-   PDF upload works
-   document processing works
-   MongoDB stores documents/chunks
-   vector search works
-   question answering works
-   evidence is returned
-   claims can be verified
-   unsupported claims can trigger abstention
-   user isolation is tested
-   deployment works
-   secrets are protected
