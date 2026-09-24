import { SAMPLE_DOCUMENTS } from '../documents/sampleDocuments.js';
import { LEGAL_KNOWLEDGE_BASE } from '../retrieval/legalSources.js';

// Hybrid in-memory store for high speed and zero-setup offline execution
class InMemoryStore {
  constructor() {
    this.users = [
      {
        id: 'user-demo-1',
        name: 'Anuj Yadav',
        email: 'anuj@lawvanta.ai',
        role: 'user',
        createdAt: new Date().toISOString()
      }
    ];

    this.documents = [...SAMPLE_DOCUMENTS];
    this.questions = [];
    this.verifications = [];
    this.comparisons = [];
    this.legalSources = [...LEGAL_KNOWLEDGE_BASE];
  }

  // Users
  getUserByEmail(email) {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  getUserById(id) {
    return this.users.find(u => u.id === id);
  }

  createUser(userData) {
    const newUser = {
      id: `user-${Date.now()}`,
      ...userData,
      createdAt: new Date().toISOString()
    };
    this.users.push(newUser);
    return newUser;
  }

  // Documents
  getDocuments(userId) {
    return this.documents.filter(d => !userId || d.userId === userId);
  }

  getDocumentById(id, userId) {
    return this.documents.find(d => d.id === id && (!userId || d.userId === userId));
  }

  createDocument(docData) {
    const newDoc = {
      id: `doc-${Date.now()}`,
      ...docData,
      status: 'processed',
      createdAt: new Date().toISOString()
    };
    this.documents.unshift(newDoc);
    return newDoc;
  }

  deleteDocument(id, userId) {
    const idx = this.documents.findIndex(d => d.id === id && (!userId || d.userId === userId));
    if (idx !== -1) {
      this.documents.splice(idx, 1);
      return true;
    }
    return false;
  }

  // Questions & Answers
  saveQuestion(qData) {
    const newQ = {
      id: `q-${Date.now()}`,
      ...qData,
      createdAt: new Date().toISOString()
    };
    this.questions.unshift(newQ);
    return newQ;
  }

  getQuestionsByDocument(docId, userId) {
    return this.questions.filter(q => q.documentId === docId && (!userId || q.userId === userId));
  }

  getQuestionById(id) {
    return this.questions.find(q => q.id === id);
  }

  // Legal Knowledge
  searchLegal(query) {
    if (!query) return this.legalSources;
    const q = query.toLowerCase();
    return this.legalSources.filter(s => 
      s.sourceName.toLowerCase().includes(q) ||
      s.title.toLowerCase().includes(q) ||
      s.text.toLowerCase().includes(q) ||
      s.section.toLowerCase().includes(q)
    );
  }
}

export const store = new InMemoryStore();
