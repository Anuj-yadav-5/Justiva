import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, BookOpen, ShieldCheck, ArrowRight, CheckCircle2, ChevronDown, Layers, Sparkles } from 'lucide-react';
import VerificationBadge from '../verification/VerificationBadge';

export const EvidenceGraph = ({ 
  claim = "30 days prior written notice is required for early termination.",
  docSource = "Residential Tenancy Agreement — Section 8.2 (Page 4)",
  docQuote = "Either party may terminate this agreement prior to the expiry of the 11-month term by serving 30 (thirty) days prior written notice...",
  legalSource = "Transfer of Property Act, 1882 — Section 106 & Model Tenancy Act",
  legalQuote = "Tenancy may be terminated before expiry by giving notice as specified in the tenancy agreement...",
  status = "SUPPORTED",
  isInteractive = true
}) => {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedNode, setExpandedNode] = useState(null);

  return (
    <div className="bg-[#12332F] text-white rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#D9FF4A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#57E5E0]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#D9FF4A]/15 border border-[#D9FF4A]/30 flex items-center justify-center text-[#D9FF4A]">
            <Layers size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#D9FF4A] tracking-wider uppercase font-semibold">Evidence Graph Engine</span>
              <span className="text-[10px] bg-white/10 text-white/70 px-2 py-0.5 rounded-full font-mono">Traceability v1.0</span>
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">Claim-Level Verification Flow</h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <VerificationBadge status={status} size="md" />
        </div>
      </div>

      {/* Main visual pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 relative">
        {/* Step 1: Atomic Claim */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#153B36] border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-[#D9FF4A]/40 transition-colors shadow-lg"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono tracking-widest text-[#D9FF4A] uppercase font-bold flex items-center gap-1.5">
                <Sparkles size={12} />
                01. Atomic Claim
              </span>
              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/70 font-mono">AI Output</span>
            </div>
            <p className="text-white text-sm sm:text-base font-medium leading-relaxed bg-[#0F2D29] p-3.5 rounded-xl border border-white/5">
              "{claim}"
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
            <span>Claim Type: Document Fact</span>
            <span className="text-[#D9FF4A] text-xs font-mono">Extracted</span>
          </div>
        </motion.div>

        {/* Step 2: Retrieved Evidence (Document & Statute) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-[#153B36] border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-[#57E5E0]/40 transition-colors shadow-lg relative"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono tracking-widest text-[#57E5E0] uppercase font-bold flex items-center gap-1.5">
                <FileText size={12} />
                02. Retrieved Evidence
              </span>
              <span className="text-[10px] bg-[#57E5E0]/15 text-[#57E5E0] px-2 py-0.5 rounded font-mono">2 Sources</span>
            </div>

            {/* Document excerpt */}
            <div className="space-y-3">
              <div className="bg-[#0F2D29] p-3 rounded-xl border border-white/5 text-xs">
                <div className="font-semibold text-white/90 flex items-center gap-1.5 mb-1 text-[11px] text-[#57E5E0]">
                  <FileText size={12} />
                  {docSource}
                </div>
                <p className="text-white/80 italic text-[11px] line-clamp-3">
                  "{docQuote}"
                </p>
              </div>

              {/* Statutory law excerpt */}
              <div className="bg-[#0F2D29] p-3 rounded-xl border border-white/5 text-xs">
                <div className="font-semibold text-white/90 flex items-center gap-1.5 mb-1 text-[11px] text-[#D9FF4A]">
                  <BookOpen size={12} />
                  {legalSource}
                </div>
                <p className="text-white/80 italic text-[11px] line-clamp-2">
                  "{legalQuote}"
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
            <span>Hierarchy: Primary Law + Agreement</span>
            <span className="text-[#57E5E0] text-xs font-mono">Indexed</span>
          </div>
        </motion.div>

        {/* Step 3: Verification Check */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-[#153B36] border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-emerald-400/40 transition-colors shadow-lg"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono tracking-widest text-emerald-400 uppercase font-bold flex items-center gap-1.5">
                <ShieldCheck size={12} />
                03. Verification State
              </span>
              <span className="text-[10px] bg-emerald-500/15 text-emerald-300 px-2 py-0.5 rounded font-mono">Verified</span>
            </div>

            <div className="bg-[#0F2D29] p-4 rounded-xl border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 size={14} />
                </div>
                <span className="font-bold text-sm text-white">Direct Textual Support</span>
              </div>
              <p className="text-white/70 text-xs leading-relaxed">
                The extracted claim matches Section 8.2 with zero semantic deviations. Cross-checked with Section 106 TPA requirements.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-white/60">Outcome:</span>
            <VerificationBadge status={status} size="sm" />
          </div>
        </motion.div>
      </div>

      {/* Footer Info / Safety banner */}
      <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-white/50">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D9FF4A] animate-pulse" />
          <span>Deterministic Citation Check: Passed (100% citation address match)</span>
        </div>
        <span className="font-mono text-[11px] text-white/40">Boundary Specification § 11 & § 23 Compliant</span>
      </div>
    </div>
  );
};

export default EvidenceGraph;
