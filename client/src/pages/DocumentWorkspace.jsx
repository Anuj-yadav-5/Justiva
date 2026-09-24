import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, Send, Sparkles, ShieldCheck, CheckCircle2, 
  ArrowRight, BookOpen, Layers, X, Search, RefreshCw, Upload, FileUp
} from 'lucide-react';
import { apiService } from '../services/api';
import VerificationBadge from '../components/verification/VerificationBadge';
import EvidenceGraph from '../components/evidence/EvidenceGraph';

export const DocumentWorkspace = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [loadingDocs, setLoadingDocs] = useState(true);
  
  // Q&A state
  const [questionInput, setQuestionInput] = useState('');
  const [isAnswering, setIsAnswering] = useState(false);
  const [currentResponse, setCurrentResponse] = useState(null);
  const [selectedClause, setSelectedClause] = useState(null);
  const [showEvidenceGraph, setShowEvidenceGraph] = useState(false);
  const [searchDocTerm, setSearchDocTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const quickQuestions = [
    "How many days notice to leave early?",
    "When will my security deposit be returned?",
    "Can company enforce non-compete after I quit?",
    "What is the penalty if I leave during lock-in?"
  ];

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoadingDocs(true);
      const res = await apiService.getDocuments();
      if (res.data?.documents?.length > 0) {
        setDocuments(res.data.documents);
        setSelectedDoc(res.data.documents[0]);
        handlePresetQuestion(res.data.documents[0], "How many days notice to leave early?");
      }
      setLoadingDocs(false);
    } catch (err) {
      console.error('Error fetching documents:', err);
      setLoadingDocs(false);
    }
  };

  const handleAsk = async (e) => {
    if (e) e.preventDefault();
    if (!questionInput.trim() || !selectedDoc) return;

    setIsAnswering(true);
    try {
      const res = await apiService.askQuestion({
        documentId: selectedDoc.id,
        question: questionInput
      });
      if (res.data?.data) {
        setCurrentResponse(res.data.data);
      }
      setIsAnswering(false);
    } catch (err) {
      console.error('Error asking question:', err);
      setIsAnswering(false);
    }
  };

  const handlePresetQuestion = async (doc, qText) => {
    setQuestionInput(qText);
    setIsAnswering(true);
    try {
      const res = await apiService.askQuestion({
        documentId: doc.id,
        question: qText
      });
      if (res.data?.data) {
        setCurrentResponse(res.data.data);
      }
      setIsAnswering(false);
    } catch (err) {
      console.error('Error asking preset question:', err);
      setIsAnswering(false);
    }
  };

  const handleQuickUpload = async (e) => {
    e.preventDefault();
    if (!uploadFile) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', uploadFile);
      formData.append('title', uploadFile.name.replace(/\.[^/.]+$/, "").replace(/_/g, ' '));
      formData.append('documentType', 'agreement');

      const res = await apiService.uploadDocument(formData);
      if (res.data?.document) {
        const newDoc = res.data.document;
        setDocuments([newDoc, ...documents]);
        setSelectedDoc(newDoc);
        setShowUploadModal(false);
        setUploadFile(null);
        handlePresetQuestion(newDoc, "How many days notice to leave early?");
      }
      setIsUploading(false);
    } catch (err) {
      console.error('Upload error in workspace:', err);
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5ED] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Clean Header & Document Switcher */}
        <div className="bg-white rounded-2xl p-5 border border-black/5 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#12332F] flex items-center justify-center font-bold">
              <FileText size={20} />
            </div>
            <div>
              <span className="text-[11px] font-mono text-emerald-800 uppercase font-semibold block">
                Active Agreement
              </span>
              <h1 className="text-base sm:text-lg font-bold text-[#17201E]">
                {selectedDoc ? selectedDoc.title : 'Loading Agreement...'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-[#5C6662]">Select:</span>
              <select
                value={selectedDoc?.id || ''}
                onChange={(e) => {
                  const doc = documents.find(d => d.id === e.target.value);
                  if (doc) {
                    setSelectedDoc(doc);
                    handlePresetQuestion(doc, "How many days notice to leave early?");
                  }
                }}
                className="bg-[#F7F5ED] text-[#17201E] text-xs font-semibold px-3 py-2 rounded-xl border border-black/10 focus:outline-none"
              >
                {documents.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.title}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setShowUploadModal(true)}
              className="px-3.5 py-2 rounded-xl bg-[#12332F] text-[#D9FF4A] text-xs font-bold hover:bg-[#1A443E] flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Upload size={13} />
              <span>Upload File</span>
            </button>
          </div>
        </div>

        {/* Dual Pane Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT PANE: Document Clauses (6 Cols) */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden flex flex-col h-[650px]">
            <div className="p-4 border-b border-black/5 bg-[#FAF9F4] flex items-center justify-between">
              <span className="text-xs font-bold text-[#17201E] flex items-center gap-1.5">
                <FileText size={15} className="text-[#12332F]" />
                Agreement Text & Rules
              </span>

              <div className="relative">
                <Search size={13} className="absolute left-2.5 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search clause or text..."
                  value={searchDocTerm}
                  onChange={(e) => setSearchDocTerm(e.target.value)}
                  className="pl-7 pr-3 py-1 text-xs bg-white rounded-lg border border-black/10 focus:outline-none w-36 sm:w-44"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <div className="bg-[#FAF9F4] p-3.5 rounded-xl border border-black/5 text-xs text-[#5C6662] leading-relaxed">
                <strong>Overview:</strong> {selectedDoc?.summary}
              </div>

              <div className="space-y-3">
                <span className="text-[11px] font-mono uppercase text-slate-400 font-semibold block">
                  Key Clauses in Document
                </span>

                {selectedDoc?.clauses
                  ?.filter(c => 
                    !searchDocTerm || 
                    c.section.toLowerCase().includes(searchDocTerm.toLowerCase()) || 
                    c.text.toLowerCase().includes(searchDocTerm.toLowerCase()) ||
                    c.title.toLowerCase().includes(searchDocTerm.toLowerCase())
                  )
                  .map((clause, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedClause(clause)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                        selectedClause?.section === clause.section
                          ? 'border-[#12332F] bg-emerald-50/50'
                          : 'border-black/5 bg-[#FAF9F4] hover:border-black/15'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[#12332F]">
                          {clause.section}: {clause.title}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">Page {clause.pageNumber}</span>
                      </div>
                      <p className="text-xs text-[#5C6662] leading-relaxed font-serif">
                        "{clause.text}"
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* RIGHT PANE: AI Answers & Facts (6 Cols) */}
          <div className="lg:col-span-6 bg-[#12332F] text-white rounded-3xl border border-white/10 shadow-xl overflow-hidden flex flex-col h-[650px]">
            <div className="p-4 border-b border-white/10 bg-[#153B36] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#D9FF4A] text-[#12332F] flex items-center justify-center font-bold text-xs">
                  <Sparkles size={13} />
                </div>
                <h3 className="text-xs font-bold text-white">Verified Explanations</h3>
              </div>

              {currentResponse && (
                <button
                  onClick={() => setShowEvidenceGraph(true)}
                  className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[#D9FF4A] text-[11px] font-mono flex items-center gap-1 transition-colors"
                >
                  <Layers size={11} />
                  <span>Evidence Graph</span>
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {/* Quick Preset Buttons */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#D9FF4A] font-semibold block">
                  Quick Questions:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {quickQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handlePresetQuestion(selectedDoc, q)}
                      className="text-[11px] bg-white/5 hover:bg-white/10 border border-white/10 text-white/90 px-2.5 py-1 rounded-full transition-colors text-left"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Answer Content */}
              {isAnswering ? (
                <div className="bg-[#153B36] p-6 rounded-2xl border border-white/10 text-center space-y-2 animate-pulse">
                  <RefreshCw size={20} className="text-[#D9FF4A] animate-spin mx-auto" />
                  <p className="text-xs text-white/80">Checking agreement clauses and Indian law...</p>
                </div>
              ) : currentResponse ? (
                <div className="space-y-3">
                  {/* Direct Answer */}
                  <div className="bg-[#153B36] p-4 rounded-2xl border border-white/10 space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-[#D9FF4A] font-bold block">
                      Direct Answer
                    </span>
                    <p className="text-xs sm:text-sm text-white/95 leading-relaxed">
                      {currentResponse.directAnswer}
                    </p>
                  </div>

                  {/* Verified Facts Breakdown */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#D9FF4A] font-bold block">
                      Verified Facts from Agreement
                    </span>
                    <div className="space-y-1.5">
                      {currentResponse.claims?.map((claim, idx) => (
                        <div key={idx} className="bg-[#0F2D29] p-2.5 rounded-xl border border-white/5 space-y-1">
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs text-white/90">{claim.text}</span>
                            <VerificationBadge status={claim.verificationStatus} size="sm" showLabel={false} />
                          </div>
                          {claim.evidenceRef && (
                            <span className="text-[10px] text-[#57E5E0] font-mono block">
                              Source: {claim.evidenceRef.section || claim.evidenceRef.source}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Statutory Reference */}
                  {currentResponse.legalContext && (
                    <div className="bg-[#0F2D29] p-3 rounded-xl border border-white/5 text-xs text-white/80 space-y-1">
                      <span className="text-[10px] font-mono text-[#D9FF4A] uppercase font-bold flex items-center gap-1">
                        <BookOpen size={11} /> What Indian Law Says
                      </span>
                      <p className="text-[11px] leading-relaxed">{currentResponse.legalContext}</p>
                    </div>
                  )}
                </div>
              ) : null}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleAsk} className="p-3 border-t border-white/10 bg-[#153B36] flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask any question about this agreement..."
                value={questionInput}
                onChange={(e) => setQuestionInput(e.target.value)}
                className="flex-1 bg-[#0F2D29] text-white text-xs px-3.5 py-2.5 rounded-full border border-white/10 focus:outline-none focus:border-[#D9FF4A] placeholder-white/40"
              />
              <button
                type="submit"
                disabled={isAnswering || !questionInput.trim()}
                className="px-4 py-2.5 rounded-full bg-[#D9FF4A] text-[#12332F] font-bold text-xs hover:bg-[#c6ee3b] transition-all disabled:opacity-40"
              >
                Ask
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Upload Modal in Studio */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-black/10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#17201E]">Upload Contract File</h3>
                <p className="text-xs text-[#5C6662]">Choose a .PDF or .TXT agreement file</p>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleQuickUpload} className="space-y-3">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-[#12332F] bg-slate-50 hover:bg-emerald-50/40 rounded-2xl p-5 text-center cursor-pointer transition-colors space-y-1.5"
              >
                <FileUp size={24} className="mx-auto text-emerald-800" />
                <p className="text-xs font-semibold text-slate-800">
                  {uploadFile ? uploadFile.name : 'Click to choose PDF or Text file'}
                </p>
                <p className="text-[10px] text-slate-500">Supports .PDF, .TXT, .DOC</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.txt,.doc,.docx"
                  onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-black/5">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading || !uploadFile}
                  className="px-5 py-2 rounded-full bg-[#12332F] text-[#D9FF4A] text-xs font-bold hover:bg-[#1A443E] disabled:opacity-40"
                >
                  {isUploading ? 'Parsing...' : 'Upload & Open in Studio'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Evidence Graph Modal */}
      {showEvidenceGraph && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-3xl w-full relative">
            <button
              onClick={() => setShowEvidenceGraph(false)}
              className="absolute -top-10 right-0 p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X size={18} />
            </button>
            <EvidenceGraph 
              claim={currentResponse?.claims?.[0]?.text || "30 days prior written notice is required."}
              docSource={`${selectedDoc?.title} — ${currentResponse?.claims?.[0]?.evidenceRef?.section || 'Section 8.2'}`}
              docQuote={currentResponse?.documentSummary || "Either party may terminate with 30 days written notice..."}
              legalSource={currentResponse?.legalContext || "The Transfer of Property Act, 1882 — Section 106"}
              status={currentResponse?.overallStatus || "SUPPORTED"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentWorkspace;
