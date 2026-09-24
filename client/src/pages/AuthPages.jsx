import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Scale, Lock, Mail, User, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginPage = () => {
  const [email, setEmail] = useState('anuj@lawvanta.ai');
  const [password, setPassword] = useState('password123');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res.success) {
      navigate('/workspace');
    }
  };

  return (
    <div className="min-h-screen bg-[#12332F] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#D9FF4A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#57E5E0]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-[#153B36] rounded-3xl p-8 border border-white/10 shadow-2xl space-y-6 relative">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#D9FF4A] text-[#12332F] flex items-center justify-center mx-auto font-bold shadow-lg">
            <Scale size={24} />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Sign in to Justiva</h2>
          <p className="text-xs text-white/70">Access your isolated legal document workspace</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-white/80 mb-1">Work or Personal Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-3 text-white/40" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0F2D29] text-white text-xs border border-white/10 focus:outline-none focus:border-[#D9FF4A]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-white/80 mb-1">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-3 text-white/40" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0F2D29] text-white text-xs border border-white/10 focus:outline-none focus:border-[#D9FF4A]"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-[#D9FF4A] text-[#12332F] font-bold text-xs hover:bg-[#c6ee3b] transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Workspace'}</span>
            <ArrowRight size={14} />
          </button>
        </form>

        <div className="bg-[#0F2D29] p-3 rounded-xl border border-white/5 text-[11px] text-white/60 space-y-1 text-center">
          <p className="text-[#D9FF4A] font-semibold">Demo Credentials Pre-filled</p>
          <p>Instant access to Bangalore lease & IT contracts demo.</p>
        </div>
      </div>
    </div>
  );
};
