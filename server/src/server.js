import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import app from './app.js';
import { connectDB } from './config/db.js';

// Resolve .env from server root or project root
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../.env') });
dotenv.config({ path: resolve(__dirname, '../../.env') });


const PORT = process.env.PORT || 5000;

// Initialize Database & Start Server
async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`⚖️  JUSTIVA AI Backend running on http://localhost:${PORT}`);
    console.log(`🛡️  AI Safety Boundary & Verification Engine: ACTIVE`);
    const keyStatus = process.env.GEMINI_API_KEY
      ? `✅ Gemini API Key loaded (${process.env.GEMINI_API_KEY.slice(0, 6)}...)`
      : `⚠️  No GEMINI_API_KEY found — using built-in engine`;
    console.log(keyStatus);
    console.log(`=======================================================`);
  });
}

startServer();
