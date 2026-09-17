import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Mail, Lock, User, Shield, ArrowRight, Phone, Sparkles } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, initialMode = 'login', onSuccessView }) {
  const { login, register, quickDemoLogin } = useAuth();
  const [portal, setPortal] = useState('user'); // 'user' or 'admin'
  const [tab, setTab] = useState(initialMode); // 'login' or 'signup'
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'otp'
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
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

  const handleDemo = async (demoRole) => {
    setError('');
    setLoading(true);
    try {
      const u = await quickDemoLogin(demoRole);
      onClose();
      if (onSuccessView) onSuccessView(u.role === 'admin' ? 'admin-dashboard' : 'user-dashboard');
    } catch (err) {
      setError(err.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-[370px] sm:max-w-[390px] max-h-[92vh] overflow-y-auto bg-white border border-gray-100 rounded-3xl p-5 sm:p-6 shadow-2xl text-gray-900">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Title & Subtitle */}
        <div className="text-center mb-3.5">
          <h2 className="text-xl sm:text-2xl font-black text-gray-950 tracking-tight mb-0.5">
            {portal === 'admin' ? 'Admin Portal Log In' : 'Traveler Log In'}
          </h2>
          <p className="text-[11px] sm:text-xs text-gray-500 font-medium">
            Log in to explore Nashik & manage your itinerary
          </p>
        </div>

        {/* Top Portal Switcher Pills (Traveler Portal vs Admin Portal) */}
        <div className="p-1 rounded-xl bg-gray-50 border border-gray-200/80 grid grid-cols-2 gap-1 mb-3">
          <button
            type="button"
            onClick={() => { setPortal('user'); setError(''); }}
            className={`py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              portal === 'user'
                ? 'bg-amber-500 text-black shadow-sm'
                : 'bg-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Traveler Portal</span>
          </button>

          <button
            type="button"
            onClick={() => { setPortal('admin'); setTab('login'); setLoginMethod('email'); setError(''); }}
            className={`py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              portal === 'admin'
                ? 'bg-amber-500 text-black shadow-sm'
                : 'bg-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin Portal</span>
          </button>
        </div>

        {/* Tabs: Traveler gets Log In / Sign Up, Admin only gets Log In */}
        {portal === 'admin' ? (
          <div className="border-b-2 border-amber-500 mb-2.5 pb-2 text-center">
            <span className="text-xs sm:text-sm font-black text-amber-600 tracking-wider uppercase flex items-center justify-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-amber-600" />
              Admin Portal Log In
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-2 border-b border-gray-200 mb-2.5">
            <button
              type="button"
              onClick={() => setTab('login')}
              className={`pb-1.5 text-xs sm:text-sm font-bold text-center transition relative ${
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
              className={`pb-1.5 text-xs sm:text-sm font-bold text-center transition relative ${
                tab === 'signup'
                  ? 'text-amber-600 border-b-2 border-amber-500'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Sign Up (SMS OTP)
            </button>
          </div>
        )}

        {/* Method Indicator: Email vs SMS OTP (only for travelers) */}
        {portal === 'user' && (
          <div className="flex items-center justify-center gap-3 text-[11px] font-semibold mb-3">
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
        )}

        {error && (
          <div className="mb-3 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs">
            {error}
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-2.5">
          {tab === 'signup' && (
            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-xs focus:outline-none focus:border-amber-500 focus:bg-white transition"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-gray-800 mb-1">
              {portal === 'admin' ? 'Administrator Email Address' : 'Email Address or Phone Number'}
            </label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                placeholder={portal === 'admin' ? "Enter administrator email" : "traveler@example.com or phone"}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-xs placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:bg-white transition"
              />
            </div>
          </div>

          {loginMethod === 'email' ? (
            <div>
              <label className="block text-[11px] font-bold text-gray-800 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-xs placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:bg-white transition"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-[11px] font-bold text-gray-800 mb-1">
                6-Digit SMS OTP Code
              </label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Enter SMS OTP (e.g. 543210)"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-xs placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:bg-white transition tracking-widest font-mono"
                />
              </div>
            </div>
          )}

          {/* Compact Button from Screenshot: LOG IN TO ACCOUNT -> */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 px-4 rounded-xl bg-[#ff8c00] hover:bg-[#e07b00] text-black font-black text-xs tracking-wider uppercase transition-all duration-200 shadow-[0_4px_14px_rgba(255,140,0,0.35)] hover:shadow-[0_6px_18px_rgba(255,140,0,0.45)] hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <span>{loading ? 'PROCESSING...' : (tab === 'login' ? 'LOG IN TO ACCOUNT' : 'CREATE ACCOUNT & VERIFY')}</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </form>

        {/* 1-Click Demo Shortcut Pills */}
        <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-center gap-1.5 text-[10px]">
          <span className="text-gray-400 font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> Instant Demo:
          </span>
          <button
            type="button"
            onClick={() => handleDemo('user')}
            className="px-2 py-0.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition"
          >
            Traveler
          </button>
          <button
            type="button"
            onClick={() => handleDemo('admin')}
            className="px-2 py-0.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition"
          >
            Admin
          </button>
        </div>

        {/* Footer Link: Only provide sign up switch for travelers */}
        {portal === 'admin' ? (
          <div className="text-center mt-3 text-[11px] text-gray-500 font-medium bg-gray-50 border border-gray-200 rounded-xl p-2.5">
            🔒 Public registration is disabled for Admin Portal. Only authorized administrators with assigned credentials can log in.
          </div>
        ) : (
          <div className="text-center mt-3 text-[11px] text-gray-600 font-medium">
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
        )}

      </div>
    </div>
  );
}
