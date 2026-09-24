# Justiva — Legal Answers, Backed by Evidence ⚖️

> **"AI explains. Evidence supports. Verification checks. You decide."**

Justiva is an AI-powered legal document intelligence and claim-level verification platform built for India. It bridges complex contract terms with plain language explanations, backed by document evidence retrieval and Indian statutory cross-referencing.

---

## 🚀 What Has Been Built

### 1. Frontend (`client/`)
* **Technology:** React.js (Vite), Tailwind CSS, Framer Motion, Lucide React, React Router.
* **Design System:** Forest Green (`#12332F`), Warm Ivory (`#F7F5ED`), Pure White (`#FFFFFF`), Lime (`#D9FF4A`), and Cyan (`#57E5E0`).
* **Pages & Views:**
  * **Landing Page (`/`):** Full 16-section SaaS showcase featuring the Hero with floating AI Verification card, The Problem, 4-step process flow, Asymmetric Feature Grid, Trust & Abstention showcase, Pricing, and FAQ accordion.
  * **Document Workspace (`/workspace`):** Dual-pane interface with interactive clause tree, search bar, raw text inspector, and real-time AI Q&A panel with claim extraction, verification badges, and evidence citations.
  * **Signature Evidence Graph:** Dynamic visualization mapping *Atomic Claim → Document Clause & Indian Statute → Verification State*.
  * **Contract Comparison (`/comparison`):** Side-by-side clause diffing with risk level tags (Critical / High / Moderate / Standard).
  * **Indian Legal Authorities (`/research`):** Searchable repository of Indian legislation (Transfer of Property Act, Indian Contract Act 1872, Model Tenancy Act) and Supreme Court precedents (Kailash Nath, Niranjan Shankar Golikari).
  * **Lawyer Brief Generator (`/lawyer-brief`):** Formats client questions, critical provisions, evidentiary checklists, and legal ambiguities into a printable consultation brief.
  * **Dashboard (`/dashboard`):** Repository management, KPI tracking, and new agreement uploader.

### 2. Backend (`server/`)
* **Technology:** Node.js, Express.js REST API.
* **AI & Verification Engine:**
  * Intent classification (Termination, Penalties, Restrictive Covenants, Dispute Resolution).
  * Claim decomposition (breaks generated drafts into atomic factual propositions).
  * Claim-level verification supporting 6 states: `SUPPORTED`, `PARTIALLY_SUPPORTED`, `CONTRADICTED`, `UNSUPPORTED`, `INSUFFICIENT_INFORMATION`, and `REVIEW_REQUIRED`.
  * Deterministic citation validator ensuring exact section and quote match.
  * Strict abstention rule: *"No evidence → No strong claim."*
* **Storage & Seeding:** High-performance hybrid store with pre-indexed realistic Bangalore tenancy agreements and IT employment contracts with restrictive covenants.

---

## 🛠️ How to Run Locally

### Step 1: Start Backend Server
```bash
cd server
npm run dev
```
*Backend runs on `http://localhost:5000`*

### Step 2: Start Frontend Client
```bash
cd client
npm run dev
```
*Frontend runs on `http://localhost:3000`*

---

## 📋 Anything You Need to Do Manually?

The system is configured to **work out-of-the-box** without any mandatory manual setup:
* **Database:** Runs immediately in hybrid in-memory store mode pre-seeded with sample contracts and Indian statutory data.
* **AI Engine:** Includes an intelligent built-in legal parsing, claim extraction, and verification simulation engine.

### Optional Manual Configurations (For Production Use):
1. **Connect Real MongoDB Atlas (Optional):**
   * If you wish to persist data to a live MongoDB Atlas cluster, create a `server/.env` file from `server/.env.example` and set `MONGODB_URI=mongodb+srv://...`.
2. **Connect Live OpenAI API (Optional):**
   * If you want to use OpenAI's API directly for custom arbitrary text, set `OPENAI_API_KEY=sk-...` in `server/.env`.
3. **Custom Documents:**
   * You can upload any contract PDF or paste text directly via the **Dashboard** or **Workspace** upload buttons.
