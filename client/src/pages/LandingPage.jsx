import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, FileText, CheckCircle2, ArrowRight, Sparkles, Scale, 
  Search, GitCompare, BookOpen, ChevronDown, Layers, FileCheck2, ArrowUpRight
} from 'lucide-react';
import EvidenceGraph from '../components/evidence/EvidenceGraph';
import HomeLegalChatbot from '../components/chat/HomeLegalChatbot';

export const LandingPage = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const pagesGuide = [
    {
      title: "Document Studio",
      path: "/workspace",
      tag: "Interactive Workspace",
      desc: "View your rental agreement or employment contract on the left, ask questions on the right, and see verified answers.",
      icon: FileText
    },
    {
      title: "Contract Comparison",
      path: "/comparison",
      tag: "Compare 2 Agreements",
      desc: "Place two agreements side by side to quickly spot changes in notice periods, lock-in rules, or hidden penalties.",
      icon: GitCompare
    },
    {
      title: "Indian Laws & Cases",
      path: "/research",
      tag: "Legal Reference",
      desc: "Search actual Indian laws like the Transfer of Property Act, Contract Act 1872, and landmark Supreme Court judgments.",
      icon: BookOpen
    },
    {
      title: "Lawyer Consultation Brief",
      path: "/lawyer-brief",
      tag: "Print / PDF Export",
      desc: "Generate a clean 1-page summary of your contract issues and questions to take with you when meeting an advocate.",
      icon: FileCheck2
    }
  ];

  // FAQs strictly related to the Justiva project (no Gemini mentions)
  const faqs = [
    {
      q: "What is Justiva and how does it help me?",
      a: "Justiva helps regular people understand legal agreements (like house rent agreements, job contracts, or service terms) in simple, everyday English. Instead of guessing what complicated legal words mean, you get clear answers backed by exact clauses and Indian law."
    },
    {
      q: "How does Justiva verify if an answer is true?",
      a: "Unlike typical AI that might make up facts, Justiva checks every sentence against the actual text of your agreement and verified Indian legal statutes. It shows you exactly which page and section the answer comes from."
    },
    {
      q: "Is Justiva a lawyer or a replacement for legal advice?",
      a: "No. Justiva provides legal information and document assistance to help you understand what you are signing. It is not a law firm and does not provide formal legal representation. For serious court matters, always consult a qualified lawyer."
    },
    {
      q: "Can I upload my house rental agreement or employment offer letter?",
      a: "Yes. You can upload or paste any rental agreement, employment contract, non-disclosure agreement (NDA), or legal notice to understand notice periods, security deposit rules, and penalties."
    },
    {
      q: "Is my personal document safe and private?",
      a: "Yes. Your uploaded agreements are private to your session. We do not sell your personal contracts or share them with other users."
    },
    {
      q: "What happens if my contract does not mention a specific rule?",
      a: "If a term is missing from your agreement, Justiva clearly tells you: 'This information is not found in your document' instead of making up a fake rule. It then tells you what default Indian statutory law says."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F5ED]">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION & JUDICIAL SCENE */}
      {/* ========================================================================= */}
      <section className="bg-[#12332F] text-white pt-28 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden rounded-b-[40px] shadow-xl">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Main Title */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-[#D9FF4A]">
              <ShieldCheck size={14} />
              <span>Evidence-First Legal Helper</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Understand your contracts <br />
              <span className="text-[#D9FF4A] italic font-serif font-normal">in simple English.</span>
            </h1>

            <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto leading-relaxed">
              Ask doubts about your rent agreement, job offer letter, or deposit refund. Get clear answers backed by Indian law.
            </p>
          </div>

          {/* Judicial Banner */}
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg relative h-40 sm:h-56">
            <img 
              src="/assets/judiciary_banner.jpg" 
              alt="Supreme Court and Judicial Pillar Architecture" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#12332F] via-[#12332F]/50 to-transparent flex items-end p-5">
              <p className="text-white font-semibold text-xs sm:text-sm">
                Grounding in Indian Contract Act 1872 • Transfer of Property Act 1882 • Supreme Court Precedents
              </p>
            </div>
          </div>

          {/* Home Legal Chatbot */}
          <div className="pt-2">
            <HomeLegalChatbot />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SIMPLE HOW-IT-WORKS SECTION */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs font-mono tracking-widest text-[#12332F] uppercase font-bold bg-[#12332F]/10 px-3 py-1 rounded-full">
            Simple 3 Steps
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#17201E]">
            How Justiva Helps You
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm space-y-2">
            <span className="text-2xl font-bold font-mono text-emerald-800">01</span>
            <h3 className="font-bold text-sm text-[#17201E]">Share Your Agreement or Doubt</h3>
            <p className="text-xs text-[#5C6662] leading-relaxed">
              Attach your rent agreement, employment contract, or simply type your question in the chat.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm space-y-2">
            <span className="text-2xl font-bold font-mono text-emerald-800">02</span>
            <h3 className="font-bold text-sm text-[#17201E]">Automatic Clause Finding</h3>
            <p className="text-xs text-[#5C6662] leading-relaxed">
              Justiva scans the document to find notice periods, deposit refund clauses, and penalties.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm space-y-2">
            <span className="text-2xl font-bold font-mono text-emerald-800">03</span>
            <h3 className="font-bold text-sm text-[#17201E]">Get Clear Verified Answers</h3>
            <p className="text-xs text-[#5C6662] leading-relaxed">
              Receive a plain-English explanation showing the exact clause and relevant Indian laws.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CLEAR APP FEATURES ROADMAP */}
      {/* ========================================================================= */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-8 space-y-2">
          <span className="text-xs font-mono tracking-widest text-[#12332F] uppercase font-bold bg-[#12332F]/10 px-3 py-1 rounded-full">
            Explore Features
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#17201E]">
            All Tools Built for You
          </h2>
          <p className="text-xs sm:text-sm text-[#5C6662]">
            Click any feature below to try it out:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pagesGuide.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                to={item.path}
                className="bg-white rounded-2xl p-5 border border-black/5 hover:border-[#12332F] transition-all shadow-sm hover:shadow-md flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#12332F] flex items-center justify-center font-bold">
                      <Icon size={16} />
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-[#17201E] group-hover:text-[#12332F] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#5C6662] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between text-xs font-semibold text-[#12332F]">
                  <span>Open Tool</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. EVIDENCE GRAPH VISUAL */}
      {/* ========================================================================= */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-8 space-y-2">
          <span className="text-xs font-mono tracking-widest text-[#12332F] uppercase font-bold bg-[#12332F]/10 px-3 py-1 rounded-full">
            No Guesswork
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#17201E]">
            How We Check Every Answer
          </h2>
          <p className="text-xs sm:text-sm text-[#5C6662]">
            Every answer is checked against the contract clause and the law:
          </p>
        </div>

        <EvidenceGraph />
      </section>

      {/* ========================================================================= */}
      {/* 5. PROJECT FAQ (Strictly Project Questions Only) */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-8 space-y-2">
          <span className="text-xs font-mono tracking-widest text-[#12332F] uppercase font-bold bg-[#12332F]/10 px-3 py-1 rounded-full">
            Common Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#17201E]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl border border-black/5 overflow-hidden transition-all"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between font-semibold text-xs sm:text-sm text-[#17201E] hover:text-[#12332F]"
              >
                <span>{faq.q}</span>
                <ChevronDown 
                  size={16} 
                  className={`text-[#12332F] transition-transform shrink-0 ml-2 ${activeFaq === idx ? 'rotate-180' : ''}`} 
                />
              </button>
              {activeFaq === idx && (
                <div className="px-4 pb-4 text-xs text-[#5C6662] leading-relaxed border-t border-black/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
