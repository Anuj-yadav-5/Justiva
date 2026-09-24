import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, ShieldCheck, Lock, ExternalLink, ArrowUpRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#0F2D29] text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#D9FF4A] flex items-center justify-center text-[#12332F] font-bold">
                <Scale size={18} />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">JUSTIVA</span>
            </div>
            
            <p className="text-sm text-white/70 max-w-sm leading-relaxed">
              AI explains. Evidence supports. Verification checks. You decide. 
              The evidence-first document intelligence platform engineered for calibrated legal clarity.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#D9FF4A]">
                <ShieldCheck size={13} />
                <span>Deterministic Verification Active</span>
              </span>
            </div>
          </div>

          {/* Links 1: Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono tracking-widest text-[#D9FF4A] uppercase font-bold">Product</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link to="/workspace" className="hover:text-white transition-colors">Document Workspace</Link></li>
              <li><Link to="/comparison" className="hover:text-white transition-colors">Contract Comparison</Link></li>
              <li><Link to="/research" className="hover:text-white transition-colors">Indian Legal Knowledge</Link></li>
              <li><Link to="/lawyer-brief" className="hover:text-white transition-colors">Lawyer Brief Generator</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Document Repository</Link></li>
            </ul>
          </div>

          {/* Links 2: Safety & Architecture */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono tracking-widest text-[#57E5E0] uppercase font-bold">Architecture</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><span className="hover:text-white cursor-pointer transition-colors">AI Boundary Spec</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Claim Extraction Model</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Citation Validator</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Document Isolation</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Statutory Hierarchy</span></li>
            </ul>
          </div>

          {/* Links 3: Trust & Disclaimers */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono tracking-widest text-white/90 uppercase font-bold">Compliance</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><span className="hover:text-white cursor-pointer transition-colors">Privacy & Data Isolation</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Terms of Use</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Safety Guardrails</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Security Controls</span></li>
            </ul>
          </div>
        </div>

        {/* Mandatory Legal Notice & Disclaimer Banner */}
        <div className="mt-8 bg-[#12332F] rounded-2xl p-6 border border-white/10 text-xs text-white/70 leading-relaxed space-y-2">
          <div className="flex items-center gap-2 font-bold text-white text-xs uppercase tracking-wider">
            <Lock size={14} className="text-[#D9FF4A]" />
            <span>MANDATORY STATUTORY & REGULATORY DISCLAIMER</span>
          </div>
          <p>
            Justiva is an artificial intelligence-driven legal information and document-assistance system. Justiva is not a law firm, does not act as an advocate, and does not provide legal representation or formal legal advice. Use of Justiva does not create an attorney-client relationship. All generated summaries, extracted claims, and statutory cross-references are provided for informational clarity only and must be reviewed with a qualified legal professional before making individualized legal decisions.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Justiva Technologies. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-emerald-400 flex items-center gap-1.5 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              All Systems Operational
            </span>
            <span className="text-white/40">|</span>
            <span>Indian Jurisdiction (Central & State Frameworks)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
