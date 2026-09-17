import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Mail, Lock, User, Shield, Sparkles } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, initialMode = 'login', onSuccessView }) {
  const { login, register, quickDemoLogin } = useAuth();
  const [mode, setMode] = useState(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('traveler@phoenix.in');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const u = await login(email, password, role);
        onClose();
        if (onSuccessView) onSuccessView(u.role === 'admin' ? 'admin-dashboard' : 'user-dashboard');
      } else {
        const u = await register(name || 'Traveler', email, password, role);
        onClose();
        if (onSuccessView) onSuccessView(u.role === 'admin' ? 'admin-dashboard' : 'user-dashboard');
      }
    } catch (err) {
      setError(err.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = (demoRole) => {
    const u = quickDemoLogin(demoRole);
    onClose();
    if (onSuccessView) onSuccessView(u.role === 'admin' ? 'admin-dashboard' : 'user-dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-2xl text-gray-900">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tabs */}
        <div className="grid grid-cols-2 bg-slate-100 p-1 rounded-xl mb-6 border border-gray-200">
          <button 
            type="button"
            onClick={() => setMode('login')}
            className={`py-2 text-xs sm:text-sm font-bold rounded-lg transition ${
              mode === 'login' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Log In
          </button>
          <button 
            type="button"
            onClick={() => setMode('signup')}
            className={`py-2 text-xs sm:text-sm font-bold rounded-lg transition ${
              mode === 'signup' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Instant Demo Pills */}
        <div className="mb-6 p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
          <div className="text-[11px] font-bold text-amber-800 mb-2 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            1-Click Instant Preview Access:
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button 
              type="button"
              onClick={() => handleDemo('user')}
              className="py-1.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-black text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition"
            >
              <User className="w-3.5 h-3.5" />
              Demo User
            </button>
            <button 
              type="button"
              onClick={() => handleDemo('admin')}
              className="py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition"
            >
              <Shield className="w-3.5 h-3.5" />
              Demo Admin
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Aarav Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-amber-500 transition"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input 
                type="email" 
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-amber-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input 
                type="password" 
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-amber-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Role Type</label>
            <select 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-amber-500 transition"
            >
              <option value="user">Standard Traveler</option>
              <option value="admin">Platform Admin (Management Suite)</option>
            </select>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold text-sm shadow-sm transition disabled:opacity-50"
          >
            {loading ? 'Processing...' : (mode === 'login' ? 'Log In to Phoenix' : 'Create Account')}
          </button>
        </form>

      </div>
    </div>
  );
}
