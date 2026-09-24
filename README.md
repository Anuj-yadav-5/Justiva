# Justiva — Evidence-First Legal Intelligence & Verification ⚖️

> **"Understand your contracts in plain English. Verified by Indian law."**

Justiva is an evidence-first AI legal assistant tailored for Indian tenancy agreements, employment contracts, NDAs, and business terms. It translates dense legalese into everyday language while verifying every claim against actual contract clauses and Indian statutory law.

---

## ✨ Key Features

### 1. 🤖 Interactive Home Legal Chatbot (Powered by Google Gemini)
- **Plain-Language Answers**: Ask any doubt in simple, everyday English (e.g. *"Can I vacate early without 30 days notice?"* or *"Is a 1-year non-compete clause valid in India?"*).
- **File Upload & Attachment**: Attach your rental agreement, job contract, or legal notice (`.txt`, `.pdf`, `.docx`) directly inside the chat.
- **Dual AI Engine**:
  - **Google Gemini Engine**: Direct generative answers powered by Gemini 2.5 / 2.0 / 1.5 Flash models.
  - **Indian Legal Grounding**: Built-in deterministic statutory legal rules ensuring accurate fallbacks even without an API key.
- **In-Chat Key Manager**: Easily paste and save your Gemini API key right from the home page chatbot or the Dashboard settings.

### 2. 📄 Document Studio (`/workspace`)
- Dual-pane layout: Inspect agreement clauses and section breakdown on the left, ask questions on the right.
- Real-time factual claim verification with visual badges (`SUPPORTED`, `CONTRADICTED`, `INSUFFICIENT_INFORMATION`).

### 3. 🔍 Contract Comparison (`/comparison`)
- Place two agreements side-by-side to immediately detect changes in notice periods, lock-in duration, and penalty clauses.

### 4. 📚 Indian Legal Research Repository (`/research`)
- Search authoritative Indian statutes and landmark Supreme Court cases:
  - *Transfer of Property Act, 1882* (Sections 106, 108, 111)
  - *The Indian Contract Act, 1872* (Sections 27, 73, 74)
  - *Model Tenancy Act, 2021*
  - *Kailash Nath Associates v. DDA (2015)* & *Niranjan Shankar Golikari (1967)*

### 5. 📑 Lawyer Consultation Brief (`/lawyer-brief`)
- Automatically compile client doubts, critical clauses, and evidentiary checklists into a clean 1-page summary to bring when consulting an advocate.

---

## 🚀 Live Deployment on Vercel

Justiva is pre-configured for fullstack deployment on [Vercel](https://vercel.com) using Serverless Functions and Vite SPA routing.

### Deploying via Vercel Dashboard (Recommended)

1. Go to [vercel.com/new](https://vercel.com/new) and log in with your GitHub account.
2. Select your repository: **`Anuj-yadav-5/Justiva`**.
3. **Project Settings**:
   - **Framework Preset**: `Vite` (or `Other`)
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `cd client && npm install && npm run build` (or leave default defined in `vercel.json`)
   - **Output Directory**: `client/dist`
4. **Environment Variables** (Optional in Vercel Settings):
   - `GEMINI_API_KEY`: Your Google Gemini API Key (starts with `AIza...`)
   - `JWT_SECRET`: Any random secure string (e.g. `justiva_production_jwt_secret_2026`)
5. Click **Deploy**. Vercel will build both the frontend and API serverless functions automatically!

---

## 🛠️ Local Development Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/Anuj-yadav-5/Justiva.git
cd Justiva
```

### 2. Configure Environment Variables
Copy the example `.env` file in the server folder:
```bash
cp server/.env.example server/.env
```
Add your Gemini API Key in `server/.env`:
```env
PORT=5000
GEMINI_API_KEY=AIzaSyYourActualKeyHere
JWT_SECRET=justiva_super_secret_jwt_key_2026
```
*(Note: If no API key is provided in `.env`, users can still paste their key in the UI or use the built-in Indian Legal Grounding engine).*

### 3. Install & Start Backend
```bash
cd server
npm install
npm run dev
```
Backend will start on **`http://localhost:5000`**.

### 4. Install & Start Frontend (in a new terminal)
```bash
cd client
npm install
npm run dev
```
Frontend will start on **`http://localhost:3000`**.

---

## 🏗️ Project Architecture

```
Justiva/
├── api/
│   └── index.js              # Vercel Serverless Function entrypoint
├── client/                   # React 19 + Vite + Tailwind CSS Frontend
│   ├── src/
│   │   ├── components/       # Chatbot, Evidence Graph, Layout, Verification Badges
│   │   ├── context/          # Auth & State Context
│   │   ├── pages/            # Home, Dashboard, Workspace, Comparison, Research, Brief
│   │   └── services/         # Axios API Client with Gemini Key auto-injection
│   ├── public/assets/        # High-res judiciary & justice assets
│   └── vite.config.js        # Vite config with API proxy
├── server/                   # Express.js Backend
│   ├── src/
│   │   ├── controllers/      # Question, Document, Comparison, Legal Controllers
│   │   ├── routes/           # REST API Route definitions
│   │   ├── services/ai/      # Gemini AI Service & Claim Verification Engine
│   │   └── services/retrieval/# Indian Legal Code Knowledge Base
│   └── server.js             # Standalone Express Server
├── vercel.json               # Vercel deployment routing & build config
└── README.md
```

---

## 🔒 Security & Privacy

- **Safe Defaults**: Secret keys in `.env` are strictly excluded from version control via `.gitignore`.
- **Client-side Storage**: When users enter their API key in the browser, it is stored in the browser's local storage and encrypted in transit.
- **Safety Boundaries**: The AI verification engine flags ungrounded claims with abstention notices (*"This provision is missing from your agreement"*).

---

## ⚖️ Disclaimer

Justiva is designed as an educational and document comprehension tool to help individuals understand their agreements in plain English and reference statutory frameworks. It is **not a law firm** and does not constitute formal legal counsel. For court litigation, always consult a qualified advocate.
