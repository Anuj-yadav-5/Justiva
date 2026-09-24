import React, { useState, useEffect } from 'react';
import { GitCompare, Sparkles } from 'lucide-react';
import { apiService } from '../services/api';

export const ComparisonPage = () => {
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    runComparison();
  }, []);

  const runComparison = async () => {
    try {
      setLoading(true);
      const res = await apiService.compareDocuments('doc-rental-blr-01', 'doc-employment-tech-02');
      if (res.data?.comparison) {
        setComparison(res.data.comparison);
      }
      setLoading(false);
    } catch (err) {
      console.error('Comparison error:', err);
      setLoading(false);
    }
  };

  const getRiskBadge = (level) => {
    switch (level) {
      case 'critical':
        return <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold">CRITICAL DEVIATION</span>;
      case 'high':
        return <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 font-bold">HIGH RISK</span>;
      case 'medium':
        return <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold">MODERATE DIFFERENCE</span>;
      default:
        return <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold">STANDARD</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5ED] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-[#12332F] text-white rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl space-y-2">
          <span className="text-xs font-mono text-[#D9FF4A] tracking-wider uppercase font-semibold">
            Compare 2 Agreements
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Contract Comparison Tool
          </h1>
          <p className="text-xs sm:text-sm text-white/70 max-w-xl leading-relaxed">
            Spot differences between two contracts in simple words. Check changes in notice periods, penalty rules, and lock-in requirements.
          </p>
        </div>

        {/* Selected Documents Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-black/5 shadow-sm space-y-1">
            <span className="text-[10px] font-mono uppercase text-emerald-800 font-bold">Agreement 1</span>
            <h3 className="font-bold text-sm text-[#17201E]">Residential Rental Agreement (Bangalore)</h3>
            <p className="text-xs text-slate-500">11-month house tenancy agreement</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-black/5 shadow-sm space-y-1">
            <span className="text-[10px] font-mono uppercase text-[#12332F] font-bold">Agreement 2</span>
            <h3 className="font-bold text-sm text-[#17201E]">IT Employment Contract</h3>
            <p className="text-xs text-slate-500">Company employment agreement with non-compete rules</p>
          </div>
        </div>

        {/* Comparison List */}
        {loading ? (
          <div className="bg-white rounded-2xl p-8 text-center text-slate-400 font-mono text-xs">
            Comparing agreements...
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-[#17201E] flex items-center gap-2">
              <GitCompare size={16} className="text-[#12332F]" />
              <span>Differences Found ({comparison?.differences?.length || 0})</span>
            </h2>

            <div className="space-y-3">
              {comparison?.differences?.map((diff, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-5 border border-black/5 shadow-sm space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-black/5">
                    <span className="text-xs sm:text-sm font-bold text-[#17201E]">{diff.category}</span>
                    {getRiskBadge(diff.riskLevel)}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-[#FAF9F4] p-3 rounded-xl border border-black/5 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-slate-500 block">Agreement 1 Rule</span>
                      <p className="text-xs font-semibold text-[#17201E]">{diff.docAValue}</p>
                    </div>

                    <div className="bg-[#FAF9F4] p-3 rounded-xl border border-black/5 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-slate-500 block">Agreement 2 Rule</span>
                      <p className="text-xs font-semibold text-[#17201E]">{diff.docBValue}</p>
                    </div>
                  </div>

                  <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100 text-xs text-emerald-950 flex items-start gap-2">
                    <Sparkles size={13} className="text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <strong>What this means:</strong> {diff.analysis}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonPage;
