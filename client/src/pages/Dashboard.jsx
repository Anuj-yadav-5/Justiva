import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Plus, Trash2, ArrowRight, Upload, CheckCircle2, FileUp, X, Key, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { apiService } from '../services/api';

export const Dashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadText, setUploadText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Gemini API Key state
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKeySaved, setApiKeySaved] = useState(false);
  const savedKey = localStorage.getItem('justiva_gemini_key') || '';

  const handleSaveApiKey = (e) => {
    e.preventDefault();
    if (!apiKeyInput.trim()) return;
    localStorage.setItem('justiva_gemini_key', apiKeyInput.trim());
    setApiKeySaved(true);
    setTimeout(() => setApiKeySaved(false), 2500);
  };

  const handleRemoveApiKey = () => {
    localStorage.removeItem('justiva_gemini_key');
    setApiKeyInput('');
    setApiKeySaved(false);
  };

  useEffect(() => {
    loadDocs();
  }, []);

  const loadDocs = async () => {
    try {
      setLoading(true);
      const res = await apiService.getDocuments();
      if (res.data?.documents) {
        setDocuments(res.data.documents);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error loading documents:', err);
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    if (!uploadTitle) {
      setUploadTitle(file.name.replace(/\.[^/.]+$/, "").replace(/_/g, ' '));
    }
  };

  const handleCreateDocument = async (e) => {
    e.preventDefault();
    if (!uploadTitle.trim() && !selectedFile) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append('file', selectedFile);
      }
      formData.append('title', uploadTitle || selectedFile?.name || 'My Agreement');
      formData.append('customText', uploadText);
      formData.append('documentType', 'agreement');

      const res = await apiService.uploadDocument(formData);
      if (res.data?.document) {
        setDocuments([res.data.document, ...documents]);
        setUploadSuccess(true);
        setTimeout(() => {
          setShowUploadModal(false);
          setUploadTitle('');
          setUploadText('');
          setSelectedFile(null);
          setUploadSuccess(false);
        }, 1200);
      }
      setIsUploading(false);
    } catch (err) {
      console.error('Upload error:', err);
      setIsUploading(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to remove this agreement?')) return;
    try {
      await apiService.deleteDocument(id);
      setDocuments(documents.filter(d => d.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5ED] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Clean Header Bar */}
        <div className="bg-[#12332F] text-white rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono text-[#D9FF4A] tracking-wider uppercase font-semibold">
              My Documents
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Your Saved Agreements
            </h1>
            <p className="text-xs text-white/70 max-w-lg leading-relaxed">
              Upload rent agreements, job contracts, or notices (.pdf, .txt) to extract clauses and check your rights.
            </p>
          </div>

          <button
            onClick={() => setShowUploadModal(true)}
            className="px-5 py-2.5 rounded-full bg-[#D9FF4A] text-[#12332F] font-bold text-xs hover:bg-[#c6ee3b] flex items-center gap-1.5 shadow-md transition-all"
          >
            <Upload size={14} />
            <span>Upload Agreement File</span>
          </button>
        </div>

        {/* Documents Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#17201E] flex items-center gap-2">
              <FileText size={16} className="text-[#12332F]" />
              <span>Contracts in Your Account ({documents.length})</span>
            </h2>
          </div>

          {loading ? (
            <div className="bg-white rounded-2xl p-8 text-center text-slate-400 font-mono text-xs">
              Loading agreements...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => navigate('/workspace')}
                  className="bg-white rounded-2xl p-5 border border-black/5 hover:border-[#12332F] transition-all shadow-sm cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#12332F] flex items-center justify-center font-bold">
                          <FileText size={16} />
                        </div>
                        <div>
                          <h3 className="font-bold text-xs sm:text-sm text-[#17201E]">{doc.title}</h3>
                          <span className="text-[10px] font-mono text-slate-400 block">{doc.fileName}</span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => handleDelete(doc.id, e)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <p className="text-xs text-[#5C6662] leading-relaxed line-clamp-2">
                      {doc.summary}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[10px]">
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </span>
                    <span className="text-xs font-bold text-[#12332F] flex items-center gap-1 hover:underline">
                      Open in Studio <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* Gemini AI Settings Card */}
        {/* ========================================================= */}
        <div className="bg-white rounded-3xl p-6 border border-black/5 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#12332F] flex items-center justify-center">
              <Key size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#17201E]">Gemini AI Settings</h2>
              <p className="text-xs text-[#5C6662]">
                Add your Google Gemini API key to power the AI chatbot with real answers.
              </p>
            </div>
          </div>

          {savedKey && !apiKeyInput ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-emerald-800">
                <ShieldCheck size={16} />
                <span className="text-xs font-semibold">API Key saved and active</span>
                <span className="text-[10px] text-emerald-600 font-mono bg-emerald-100 px-2 py-0.5 rounded-full">
                  {savedKey.slice(0, 6)}...{savedKey.slice(-4)}
                </span>
              </div>
              <button
                onClick={handleRemoveApiKey}
                className="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center gap-1"
              >
                <X size={13} /> Remove Key
              </button>
            </div>
          ) : (
            <form onSubmit={handleSaveApiKey} className="space-y-3">
              <div className="relative">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  placeholder="Paste your Gemini API key here (starts with AIza...)"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  className="w-full text-xs p-3 pr-10 rounded-xl border border-black/10 focus:outline-none focus:border-[#12332F] font-mono bg-slate-50"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-700"
                >
                  {showApiKey ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>

              <div className="flex items-center justify-between gap-3">
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Get your free key at{' '}
                  <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-[#12332F] underline font-semibold">
                    aistudio.google.com
                  </a>. Your key is stored only in your browser and never sent to any server other than Google.
                </p>
                <button
                  type="submit"
                  disabled={!apiKeyInput.trim()}
                  className="shrink-0 px-5 py-2 rounded-full bg-[#12332F] text-[#D9FF4A] text-xs font-bold hover:bg-[#1A443E] disabled:opacity-40 transition-all"
                >
                  {apiKeySaved ? '✓ Saved!' : 'Save Key'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* File Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-black/10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#17201E]">Upload Agreement File</h3>
                <p className="text-xs text-[#5C6662]">Choose a .PDF or .TXT contract file</p>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            {uploadSuccess ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 size={32} className="text-emerald-600 mx-auto" />
                <p className="text-sm font-bold text-slate-800">Agreement Uploaded Successfully!</p>
                <p className="text-xs text-slate-500">Extracting clauses and adding to your repository...</p>
              </div>
            ) : (
              <form onSubmit={handleCreateDocument} className="space-y-3">
                {/* File Drop / Select Area */}
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 hover:border-[#12332F] bg-slate-50 hover:bg-emerald-50/40 rounded-2xl p-5 text-center cursor-pointer transition-colors space-y-1.5"
                >
                  <FileUp size={24} className="mx-auto text-emerald-800" />
                  <p className="text-xs font-semibold text-slate-800">
                    {selectedFile ? selectedFile.name : 'Click to select PDF or Text File'}
                  </p>
                  <p className="text-[10px] text-slate-500">Supports .PDF, .TXT, .DOC (Max 25MB)</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.txt,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-600 mb-1">
                    Agreement Title (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Indiranagar Rent Agreement"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-black/10 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-600 mb-1">
                    Or Paste Contract Text Directly:
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Paste agreement clauses here..."
                    value={uploadText}
                    onChange={(e) => setUploadText(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-black/10 focus:outline-none font-mono"
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
                    disabled={isUploading || (!selectedFile && !uploadTitle.trim() && !uploadText.trim())}
                    className="px-5 py-2 rounded-full bg-[#12332F] text-[#D9FF4A] text-xs font-bold hover:bg-[#1A443E] disabled:opacity-40"
                  >
                    {isUploading ? 'Uploading & Parsing...' : 'Upload Agreement'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
