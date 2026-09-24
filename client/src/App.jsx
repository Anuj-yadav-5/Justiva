import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LandingPage from './pages/LandingPage';
import DocumentWorkspace from './pages/DocumentWorkspace';
import Dashboard from './pages/Dashboard';
import ComparisonPage from './pages/ComparisonPage';
import LegalResearchPage from './pages/LegalResearchPage';
import LawyerBriefPage from './pages/LawyerBriefPage';
import { LoginPage } from './pages/AuthPages';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/workspace" element={<DocumentWorkspace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/comparison" element={<ComparisonPage />} />
              <Route path="/research" element={<LegalResearchPage />} />
              <Route path="/lawyer-brief" element={<LawyerBriefPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
