import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach auth token + Gemini API key to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('justiva_token') || 'justiva-jwt-demo-token-user-demo-1';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // For JSON requests, attach the stored Gemini API key so the server can use it
  if (config.data && typeof config.data === 'object' && !(config.data instanceof FormData)) {
    const geminiApiKey = localStorage.getItem('justiva_gemini_key');
    if (geminiApiKey) {
      config.data = { ...config.data, geminiApiKey };
    }
  }

  return config;
});

export const apiService = {
  // Auth
  login: (data) => API.post('/auth/login', data),
  register: (data) => API.post('/auth/register', data),
  getMe: () => API.get('/auth/me'),

  // Documents
  getDocuments: () => API.get('/documents'),
  getDocumentById: (id) => API.get(`/documents/${id}`),
  uploadDocument: (formData) => API.post('/documents/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteDocument: (id) => API.delete(`/documents/${id}`),
  analyzeDocument: (id) => API.post(`/documents/${id}/analyze`),
  generateLawyerBrief: (id, questions) => API.post(`/documents/${id}/lawyer-brief`, { specificQuestions: questions }),

  // Questions & Verification
  askQuestion: (data) => API.post('/questions', data),
  getQuestionHistory: (documentId) => API.get(`/questions?documentId=${documentId || ''}`),
  getQuestionById: (id) => API.get(`/questions/${id}`),
  getVerificationGraph: (questionId) => API.get(`/verification/graph/${questionId}`),

  // Comparison
  compareDocuments: (docAId, docBId) => API.post('/comparison', { docAId, docBId }),

  // Legal Research
  searchLegalSources: (query) => API.get(`/legal/search?query=${encodeURIComponent(query || '')}`),
  getLegalSourceById: (id) => API.get(`/legal/sources/${id}`)
};

export default API;
