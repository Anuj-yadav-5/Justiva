import React, { useState, useEffect } from 'react';
import { BookOpen, Search, ExternalLink, ShieldCheck } from 'lucide-react';
import { apiService } from '../services/api';

export const LegalResearchPage = () => {
  const [sources, setSources] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedSource, setSelectedSource] = useState(null);

  useEffect(() => {
    fetchSources();
  }, []);

  const fetchSources = async (searchQuery = '') => {
    try {
      setLoading(true);
      const res = await apiService.searchLegalSources(searchQuery);
      if (res.data?.sources) {
        setSources(res.data.sources);
        if (!selectedSource && res.data.sources.length > 0) {
          setSelectedSource(res.data.sources[0]);
        }
      }
      setLoading(false);
    } catch (err) {
      console.error('Legal source error:', err);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchSources(query);
  };

  return (
    <div className="min-h-screen bg-[#F7F5ED] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-[#12332F] text-white rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl space-y-3">
          <span className="text-xs font-mono text-[#D9FF4A] tracking-wider uppercase font-semibold">
            Indian Legal Reference
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Search Indian Laws & Court Rulings
          </h1>
          <p className="text-xs sm:text-sm text-white/70 max-w-xl leading-relaxed">
            Read verified Indian laws in simple terms. Check rules from the Transfer of Property Act, Contract Act 1872, and Supreme Court rulings.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="pt-2 flex items-center gap-2 max-w-xl">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search by topic (e.g. deposit, notice period, non-compete)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-full bg-[#0F2D29] text-white text-xs border border-white/10 focus:outline-none focus:border-[#D9FF4A]"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full bg-[#D9FF4A] text-[#12332F] text-xs font-bold hover:bg-[#c6ee3b]"
            >
              Search
            </button>
          </form>
        </div>

        {/* Dual pane explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left list */}
          <div className="lg:col-span-5 space-y-2.5">
            <span className="text-[11px] font-mono uppercase text-slate-400 font-semibold block">
              Laws & Precedents ({sources.length})
            </span>

            {loading ? (
              <div className="bg-white rounded-2xl p-6 text-center text-slate-400 font-mono text-xs">
                Loading laws...
              </div>
            ) : (
              <div className="space-y-2.5">
                {sources.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setSelectedSource(s)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      selectedSource?.id === s.id
                        ? 'bg-white border-[#12332F] shadow-sm'
                        : 'bg-white border-black/5 hover:border-black/15'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#12332F]/10 text-[#12332F] font-bold">
                        {s.section}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">{s.jurisdiction}</span>
                    </div>
                    <h4 className="text-xs font-bold text-[#17201E] line-clamp-1">{s.sourceName}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{s.title}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right detail view */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-black/5 shadow-sm space-y-4">
            {selectedSource ? (
              <>
                <div className="space-y-1 pb-3 border-b border-black/5">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded font-bold">
                    {selectedSource.authorityLevel}
                  </span>
                  <h2 className="text-base font-bold text-[#17201E] pt-1">{selectedSource.sourceName}</h2>
                  <h3 className="text-xs text-slate-600 font-medium">{selectedSource.title}</h3>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono uppercase text-slate-400 font-semibold block">
                    Actual Legal Rule Text:
                  </span>
                  <div className="bg-[#FAF9F4] p-4 rounded-xl border border-black/5 text-xs text-[#17201E] font-serif leading-relaxed">
                    "{selectedSource.text}"
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={selectedSource.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#12332F] hover:underline"
                  >
                    <span>View Official Government Record</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalResearchPage;
