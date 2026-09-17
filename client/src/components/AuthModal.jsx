import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Mail, Lock, User, Shield, ArrowRight, Phone, Sparkles } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, initialMode = 'login', onSuccessView }) {
  const { login, register, quickDemoLogin } = useAuth();
  const [portal, setPortal] = useState('user'); // 'user' or 'admin'
  const [tab, setTab] = useState(initialMode); // 'login' or 'signup'
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'otp'
  const [identifier, setIdentifier] = useState('traveler@example.com');
  const [password, setPassword] = useState('password123');
  const [otpCode, setOtpCode] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (tab === 'login') {
        const u = await login(identifier, password, portal);
        onClose();
        if (onSuccessView) onSuccessView(u.role === 'admin' ? 'admin-dashboard' : 'user-dashboard');
      } else {
        const u = await register(name || 'Traveler', identifier, password, portal);
        onClose();
        if (onSuccessView) onSuccessView(u.role === 'admin' ? 'admin-dashboard' : 'user-dashboard');
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check details.');
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
      <div className="relative w-full max-w-md bg-white border border-gray-100 rounded-[28px] p-6 sm:p-8 shadow-2xl text-gray-900 overflow-hidden">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Title & Subtitle */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight mb-1.5">
            {portal === 'admin' ? 'Admin Portal Log In' : 'Traveler Log In'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Log in to explore Nashik & manage your travel itinerary
          </p>
        </div>

        {/* Top Portal Switcher Pills (Traveler Portal vs Admin Portal) */}
        <div className="p-1.5 rounded-2xl bg-gray-50 border border-gray-200/80 grid grid-cols-2 gap-1.5 mb-5">
          <button
            type="button"
            onClick={() => setPortal('user')}
            className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              portal === 'user'
                ? 'bg-amber-500 text-black shadow-md'
                : 'bg-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Traveler Portal</span>
          </button>

          <button
            type="button"
            onClick={() => setPortal('admin')}
            className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              portal === 'admin'
                ? 'bg-amber-500 text-black shadow-md'
                : 'bg-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Admin Portal</span>
          </button>
        </div>

        {/* Tabs: Log In vs Sign Up (SMS OTP) */}
        <div className="grid grid-cols-2 border-b border-gray-200 mb-4">
          <button
            type="button"
            onClick={() => setTab('login')}
            className={`pb-2.5 text-sm font-bold text-center transition relative ${
              tab === 'login'
                ? 'text-amber-600 border-b-2 border-amber-500'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => setTab('signup')}
            className={`pb-2.5 text-sm font-bold text-center transition relative ${
              tab === 'signup'
                ? 'text-amber-600 border-b-2 border-amber-500'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Sign Up (SMS OTP)
          </button>
        </div>

        {/* Method Indicator: • Email & Password | • SMS OTP Login */}
        <div className="flex items-center justify-center gap-4 text-xs font-semibold mb-5">
          <button
            type="button"
            onClick={() => setLoginMethod('email')}
            className={`transition flex items-center gap-1 ${
              loginMethod === 'email'
                ? 'text-amber-600 font-bold'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <span>•</span> Email & Password
          </button>
          <button
            type="button"
            onClick={() => setLoginMethod('otp')}
            className={`transition flex items-center gap-1 ${
              loginMethod === 'otp'
                ? 'text-amber-600 font-bold'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <span>•</span> SMS OTP Login
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs">
            {error}
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-50/70 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1.5">
              Email Address or Phone Number
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
              <input
                type="text"
                required
                placeholder="traveler@example.com or 9876543210"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-50/70 border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:bg-white transition"
              />
            </div>
          </div>

          {loginMethod === 'email' ? (
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-50/70 border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:bg-white transition"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">
                6-Digit SMS OTP Code
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
                <input
                  type="text"
                  placeholder="Enter SMS OTP (e.g. 543210)"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-50/70 border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:bg-white transition tracking-widest font-mono"
                />
              </div>
            </div>
          )}

          {/* EXACT Button from Screenshot: LOG IN TO ACCOUNT -> */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 py-3.5 px-6 rounded-2xl bg-[#ff8c00] hover:bg-[#e07b00] text-black font-extrabold text-sm tracking-wider uppercase transition-all duration-200 shadow-[0_8px_20px_rgba(255,140,0,0.35)] hover:shadow-[0_10px_24px_rgba(255,140,0,0.45)] hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{loading ? 'PROCESSING...' : (tab === 'login' ? 'LOG IN TO ACCOUNT' : 'CREATE ACCOUNT & VERIFY')}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </form>

        {/* 1-Click Demo Shortcut Pills */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-center gap-2 text-xs">
          <span className="text-gray-400 text-[11px] font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> Instant Demo:
          </span>
          <button
            type="button"
            onClick={() => handleDemo('user')}
            className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-[11px] transition"
          >
            Traveler Demo
          </button>
          <button
            type="button"
            onClick={() => handleDemo('admin')}
            className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-[11px] transition"
          >
            Admin Demo
          </button>
        </div>

        {/* Footer Link matching screenshot */}
        <div className="text-center mt-4 text-xs text-gray-600 font-medium">
          {tab === 'login' ? (
            <span>
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => setTab('signup')}
                className="text-[#ff8c00] font-bold hover:underline cursor-pointer"
              >
                Sign Up with SMS OTP
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setTab('login')}
                className="text-[#ff8c00] font-bold hover:underline cursor-pointer"
              >
                Log In
              </button>
            </span>
          )}
        </div>

      </div>
    </div>
  );
}
