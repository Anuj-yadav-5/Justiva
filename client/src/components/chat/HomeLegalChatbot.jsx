import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Paperclip, Sparkles, Scale, ShieldCheck, FileText, CheckCircle2, 
  ArrowRight, RefreshCw, X, HelpCircle, BookOpen
} from 'lucide-react';
import { apiService } from '../../services/api';
import VerificationBadge from '../verification/VerificationBadge';

export const HomeLegalChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 'msg-welcome',
      sender: 'justiva',
      text: "Hello! I am Justiva, your contract helper. You can ask me any question about your rent agreement, job contract, or notice in simple words.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'SUPPORTED'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [attachedDocText, setAttachedDocText] = useState('');
  const [attachedDocName, setAttachedDocName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatScrollContainerRef = useRef(null);

  const quickQuestions = [
    {
      title: "Landlord won't return my deposit",
      query: "My landlord is refusing to refund my security deposit. What are my rights under Indian law?",
      sampleDocName: "Rent Agreement (Bangalore)",
      sampleDocText: "Section 4.2: The Lessor shall refund the interest-free refundable Security Deposit of ₹1,50,000 within 7 banking days of physical handover. Section 8.4: Lock-in period of 3 months applies."
    },
    {
      title: "Can I leave my rental flat early?",
      query: "Can I leave my rented flat before the 11-month agreement ends? How many days notice do I need to give?",
      sampleDocName: "Rent Agreement (Bangalore)",
      sampleDocText: "Section 8.2: Either party may terminate by serving 30 days prior written notice or paying one month rent in lieu of notice."
    },
    {
      title: "Is 1-year non-compete valid?",
      query: "My company says I cannot join a competitor for 1 year after quitting. Is this enforceable in India?",
      sampleDocName: "IT Job Contract",
      sampleDocText: "Clause 7.2: For a period of 12 months immediately following termination of employment, Employee covenants not to engage directly or indirectly with any competing AI or tech firm in India."
    }
  ];

  // Scroll ONLY inside the chat container without moving the page
  useEffect(() => {
    if (chatScrollContainerRef.current) {
      chatScrollContainerRef.current.scrollTop = chatScrollContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (customQuery, customDocText, customDocName) => {
    const qText = customQuery || inputText;
    if (!qText.trim() || isLoading) return;

    const docContent = customDocText !== undefined ? customDocText : attachedDocText;
    const docTitle = customDocName !== undefined ? customDocName : attachedDocName;

    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: qText,
      attachedDoc: docTitle || null,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await apiService.askQuestion({
        question: qText,
        customDocumentText: docContent || null
      });

      if (res.data?.data) {
        const d = res.data.data;
        const aiMsg = {
          id: `ai-${Date.now()}`,
          sender: 'justiva',
          text: d.directAnswer,
          documentSummary: d.documentSummary,
          legalContext: d.legalContext,
          claims: d.claims,
          overallStatus: d.overallStatus,
          limitations: d.limitations,
          nextSteps: d.nextSteps,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiMsg]);
      }
      setIsLoading(false);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg = {
        id: `err-${Date.now()}`,
        sender: 'justiva',
        text: "I couldn't retrieve the information right now. Please try asking again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        overallStatus: 'INSUFFICIENT_INFORMATION'
      };
      setMessages(prev => [...prev, errorMsg]);
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAttachedDocName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      setAttachedDocText(event.target?.result || '');
    };
    reader.readAsText(file);
  };

  const [showKeyModal, setShowKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [hasSavedKey, setHasSavedKey] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('justiva_gemini_key');
    if (saved) {
      setHasSavedKey(true);
      setApiKeyInput(saved);
    }
  }, []);

  const handleSaveKey = (e) => {
    e.preventDefault();
    if (apiKeyInput.trim()) {
      localStorage.setItem('justiva_gemini_key', apiKeyInput.trim());
      setHasSavedKey(true);
    } else {
      localStorage.removeItem('justiva_gemini_key');
      setHasSavedKey(false);
    }
    setShowKeyModal(false);
  };

  return (
    <div className="bg-[#12332F] text-white rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col h-[580px] w-full max-w-4xl mx-auto relative">
      {/* Header bar with Status and optional Key Manager */}
      <div className="px-5 py-3.5 bg-[#153B36] border-b border-white/10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#D9FF4A] text-[#12332F] flex items-center justify-center font-bold">
            <Scale size={18} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Justiva Legal Assistant
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-mono font-normal">
                Online
              </span>
            </h3>
            <p className="text-[11px] text-white/60">Plain-language answers backed by Indian law</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowKeyModal(!showKeyModal)}
            className={`text-[11px] font-mono px-2.5 py-1 rounded-full border transition-all flex items-center gap-1.5 ${
              hasSavedKey 
                ? 'bg-emerald-500/20 text-[#D9FF4A] border-[#D9FF4A]/40 hover:bg-emerald-500/30' 
                : 'bg-white/5 text-white/70 border-white/15 hover:text-white hover:bg-white/10'
            }`}
            title="Configure Gemini API Key"
          >
            <Sparkles size={12} className={hasSavedKey ? 'text-[#D9FF4A]' : 'text-white/60'} />
            <span>{hasSavedKey ? 'Gemini AI: Active' : 'Gemini Key'}</span>
          </button>

          <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-emerald-300 font-mono">
            <ShieldCheck size={14} className="text-[#D9FF4A]" />
            <span>Verified</span>
          </div>
        </div>
      </div>

      {/* Popover / Modal for Gemini API Key */}
      {showKeyModal && (
        <div className="absolute top-16 right-4 z-50 bg-[#0F2D29] border border-white/20 p-4 rounded-2xl shadow-2xl w-80 sm:w-96 text-xs space-y-3 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Sparkles size={14} className="text-[#D9FF4A]" />
              Gemini AI Settings
            </span>
            <button onClick={() => setShowKeyModal(false)} className="text-white/60 hover:text-white">
              <X size={14} />
            </button>
          </div>
          <p className="text-white/70 text-[11px]">
            Paste your Google Gemini API key to enable instant custom answers for your contracts.
          </p>
          <form onSubmit={handleSaveKey} className="space-y-2.5">
            <input
              type="password"
              placeholder="AIzaSy..."
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              className="w-full bg-[#153B36] text-white px-3 py-2 rounded-xl border border-white/20 font-mono text-xs focus:outline-none focus:border-[#D9FF4A]"
            />
            <div className="flex items-center justify-between pt-1">
              {hasSavedKey ? (
                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem('justiva_gemini_key');
                    setApiKeyInput('');
                    setHasSavedKey(false);
                    setShowKeyModal(false);
                  }}
                  className="text-red-400 hover:text-red-300 text-[11px]"
                >
                  Remove Key
                </button>
              ) : <span />}
              <button
                type="submit"
                className="bg-[#D9FF4A] text-[#12332F] font-bold px-3 py-1.5 rounded-xl hover:bg-[#c6ee3b] transition-all"
              >
                Save Key
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Internal scrollable message container */}
      <div 
        ref={chatScrollContainerRef}
        className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4"
      >
        {/* Quick Suggestion Chips */}
        <div className="bg-[#0F2D29] p-3 rounded-2xl border border-white/5 space-y-2">
          <span className="text-[11px] font-mono text-[#D9FF4A] uppercase font-semibold block">
            Common questions to try:
          </span>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q.query, q.sampleDocText, q.sampleDocName)}
                className="text-left bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D9FF4A]/50 px-3 py-1.5 rounded-xl text-xs text-white/90 transition-colors"
              >
                {q.title}
              </button>
            ))}
          </div>
        </div>

        {/* Message stream */}
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1`}
          >
            <div className={`max-w-[85%] rounded-2xl p-4 space-y-2.5 ${
              msg.sender === 'user'
                ? 'bg-[#D9FF4A] text-[#12332F] font-medium shadow-md'
                : 'bg-[#153B36] text-white border border-white/10 shadow-md'
            }`}>
              {/* Header */}
              <div className="flex items-center justify-between gap-4 text-[10px] font-mono opacity-70">
                <span className="font-bold">{msg.sender === 'user' ? 'You' : 'Justiva'}</span>
                <span>{msg.timestamp}</span>
              </div>

              {/* Attached contract badge if any */}
              {msg.attachedDoc && (
                <div className="bg-black/10 text-[11px] px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-mono">
                  <FileText size={12} />
                  <span>Document: {msg.attachedDoc}</span>
                </div>
              )}

              {/* Main text response in simple English */}
              <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                {msg.text}
              </p>

              {/* Simple Verification Checklist */}
              {msg.claims && msg.claims.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-white/10 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase text-[#D9FF4A] font-bold">
                      Verified Facts
                    </span>
                    <VerificationBadge status={msg.overallStatus} size="sm" />
                  </div>

                  <div className="space-y-1">
                    {msg.claims.map((c, i) => (
                      <div key={i} className="bg-[#0F2D29] p-2 rounded-xl text-[11px] flex items-start gap-2">
                        <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <span className="text-white/90">{c.text}</span>
                          {c.evidenceRef && (
                            <span className="text-[10px] text-[#57E5E0] font-mono block">
                              Source: {c.evidenceRef.source} ({c.evidenceRef.section})
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Next Steps in simple words */}
              {msg.nextSteps && msg.nextSteps.length > 0 && (
                <div className="bg-[#0F2D29] p-2.5 rounded-xl border border-white/5 text-[11px] space-y-1">
                  <span className="text-[10px] font-mono text-[#D9FF4A] uppercase font-bold">
                    What to do next:
                  </span>
                  <ul className="list-disc list-inside space-y-0.5 text-white/80">
                    {msg.nextSteps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center gap-2 bg-[#153B36] p-3 rounded-2xl border border-white/10 max-w-xs text-xs text-white/80 animate-pulse">
            <RefreshCw size={14} className="animate-spin text-[#D9FF4A]" />
            <span>Finding verified answer...</span>
          </div>
        )}
      </div>

      {/* Attached file strip */}
      {attachedDocName && (
        <div className="px-4 py-2 bg-[#0F2D29] border-t border-white/10 flex items-center justify-between text-xs text-white/80 shrink-0">
          <div className="flex items-center gap-2 text-[11px]">
            <FileText size={13} className="text-[#D9FF4A]" />
            <span>Attached: <strong className="text-white">{attachedDocName}</strong></span>
          </div>
          <button
            onClick={() => { setAttachedDocName(''); setAttachedDocText(''); }}
            className="text-white/50 hover:text-white p-1"
          >
            <X size={13} />
          </button>
        </div>
      )}

      {/* Input bar (Fixed strictly at bottom) */}
      <div className="p-3 bg-[#153B36] border-t border-white/10 shrink-0">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }} 
          className="flex items-center gap-2"
        >
          {/* File Attachment */}
          <label 
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors shrink-0"
            title="Attach a contract (.txt, .pdf)"
          >
            <Paperclip size={15} className="text-[#D9FF4A]" />
            <input 
              type="file" 
              accept=".txt,.pdf,.doc,.docx" 
              onChange={handleFileUpload} 
              className="hidden" 
            />
          </label>

          <input
            type="text"
            placeholder="Ask a question about your agreement or rent/job rights..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-[#0F2D29] text-white text-xs sm:text-sm px-4 py-2.5 rounded-full border border-white/10 focus:outline-none focus:border-[#D9FF4A] placeholder-white/40"
          />

          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="px-4 py-2.5 rounded-full bg-[#D9FF4A] text-[#12332F] font-bold text-xs hover:bg-[#c6ee3b] transition-all flex items-center gap-1.5 disabled:opacity-40 shrink-0 shadow-md"
          >
            <span>Ask</span>
            <Send size={13} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomeLegalChatbot;
