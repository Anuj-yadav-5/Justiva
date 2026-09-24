import React, { useState, useEffect } from 'react';
import { Printer, ShieldCheck } from 'lucide-react';
import { apiService } from '../services/api';

export const LawyerBriefPage = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocId, setSelectedDocId] = useState('');
  const [brief, setBrief] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDocs();
  }, []);

  const loadDocs = async () => {
    try {
      const res = await apiService.getDocuments();
      if (res.data?.documents?.length > 0) {
        setDocuments(res.data.documents);
        setSelectedDocId(res.data.documents[0].id);
        generateBrief(res.data.documents[0].id);
      }
    } catch (err) {
      console.error('Error loading documents:', err);
      setLoading(false);
    }
  };

  const generateBrief = async (docId) => {
    try {
      setLoading(true);
      const res = await apiService.generateLawyerBrief(docId);
      if (res.data?.brief) {
        setBrief(res.data.brief);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error generating brief:', err);
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F7F5ED] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header bar */}
        <div className="bg-[#12332F] text-white rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl flex flex-wrap items-center justify-between gap-4 print:hidden">
          <div className="space-y-1">
            <span className="text-xs font-mono text-[#D9FF4A] tracking-wider uppercase font-semibold">
              Advocate Consultation
            </span>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Lawyer Consultation Brief
            </h1>
            <p className="text-xs text-white/70 max-w-lg leading-relaxed">
              Export a clean 1-page summary of your contract issues and questions to take with you when meeting a lawyer.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedDocId}
              onChange={(e) => {
                setSelectedDocId(e.target.value);
                generateBrief(e.target.value);
              }}
              className="bg-[#0F2D29] text-white text-xs px-3 py-2 rounded-xl border border-white/15 focus:outline-none"
            >
              {documents.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.title}
                </option>
              ))}
            </select>

            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-full bg-[#D9FF4A] text-[#12332F] font-bold text-xs flex items-center gap-1.5 hover:bg-[#c6ee3b]"
            >
              <Printer size={13} />
              <span>Print Brief</span>
            </button>
          </div>
        </div>

        {/* The Formal Brief Document (Printable) */}
        {loading ? (
          <div className="bg-white rounded-2xl p-8 text-center text-slate-400 font-mono text-xs">
            Preparing consultation brief...
          </div>
        ) : brief ? (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-black/5 shadow-sm space-y-6 font-sans">
            {/* Brief Header */}
            <div className="border-b border-slate-300 pb-4 flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block mb-1">
                  LEGAL CONSULTATION SUMMARY
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-slate-950">
                  {brief.documentTitle}
                </h2>
                <span className="text-xs text-slate-500 block mt-0.5">
                  Prepared for: {brief.clientReference} • Date: {new Date(brief.generatedAt).toLocaleDateString()}
                </span>
              </div>

              <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full font-bold">
                <ShieldCheck size={13} />
                Justiva Summary
              </span>
            </div>

            {/* Section 1: Summary */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-mono uppercase text-slate-900 font-bold">
                1. Contract Summary
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed font-serif">
                {brief.executiveSummary}
              </p>
            </div>

            {/* Section 2: Key Clauses */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono uppercase text-slate-900 font-bold">
                2. Key Contract Clauses
              </h3>
              <div className="space-y-1.5">
                {brief.criticalClauses?.map((c, i) => (
                  <div key={i} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs space-y-0.5">
                    <span className="font-bold text-slate-800">{c.section}: {c.title}</span>
                    <p className="text-slate-600 italic font-serif">"{c.summary}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Questions to Ask the Lawyer */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono uppercase text-slate-900 font-bold">
                3. Priority Questions to Ask Your Lawyer
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-800">
                {brief.recommendedLawyerQuestions?.map((q, i) => (
                  <li key={i} className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-100 font-medium">
                    <span className="font-bold text-emerald-800 font-mono mr-1.5">Q{i + 1}.</span>
                    {q}
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 4: Document Checklist */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono uppercase text-slate-900 font-bold">
                4. Documents to Bring with You
              </h3>
              <div className="space-y-1 text-xs">
                {brief.evidentiaryChecklist?.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-slate-800">{item.item}</span>
                    <span className="font-mono text-[10px] text-slate-500">{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default LawyerBriefPage;
