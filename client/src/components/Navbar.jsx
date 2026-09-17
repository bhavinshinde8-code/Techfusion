import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Sun, Globe, ChevronDown, LogOut, User, ArrowRight } from 'lucide-react';

export default function Navbar({
  currentView,
  setCurrentView,
  openAuthModal
}) {
  const { user, logout, quickDemoLogin } = useAuth();
  const [langDropdown, setLangDropdown] = useState(false);
  const [currentLang, setCurrentLang] = useState('English');

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/90 shadow-sm px-4 sm:px-6 lg:px-8 py-2.5 transition">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">

        {/* Brand Logo & Name (With user's uploaded Phoenix logo) */}
        <div
          onClick={() => { setCurrentView('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-3 cursor-pointer select-none shrink-0 group"
        >
          {/* Exact Phoenix Flaming Bird Logo */}
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md bg-black flex items-center justify-center border border-amber-500/40 group-hover:scale-105 transition-transform">
            <img
              src="/phoenix-logo.png"
              alt="Team Pheonix Logo"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <div className="font-sans font-bold text-lg tracking-tight text-gray-900 leading-tight">
              Team <span className="text-amber-600 font-extrabold">Pheonix</span>
            </div>
            <div className="text-[8px] tracking-[0.2em] text-gray-500 font-semibold uppercase -mt-0.5">
              Discover Nashik
            </div>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">

          {/* Language Selector Pill */}
          <div className="relative">
            <button
              onClick={() => setLangDropdown(!langDropdown)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 hover:bg-gray-200 text-xs text-gray-700 font-medium transition"
            >
              <Globe className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-[11px]">{currentLang}</span>
              <ChevronDown className="w-3 h-3 text-gray-500" />
            </button>

            {langDropdown && (
              <div className="absolute right-0 mt-1.5 w-32 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-50 text-xs">
                {['English', 'हिन्दी (Hindi)', 'मराठी (Marathi)'].map((l) => (
                  <button
                    key={l}
                    onClick={() => { setCurrentLang(l); setLangDropdown(false); }}
                    className="w-full text-left px-3 py-1.5 text-gray-700 hover:bg-amber-50 hover:text-amber-700 text-xs transition"
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Indicator */}
          <div
            className="w-7 h-7 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600"
            title="Light Mode Active"
          >
            <Sun className="w-3.5 h-3.5" />
          </div>

          {/* Sign Up / Log In Button (replaces Admin Dashboard button) */}
          {user ? (
            <div className="flex items-center gap-2">
              {user.role === 'admin' && (
                <button
                  onClick={() => setCurrentView('admin-dashboard')}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-500 text-amber-700 text-[11px] font-bold tracking-wide uppercase transition hover:bg-amber-100"
                >
                  <Shield className="w-3 h-3" />
                  <span>Admin</span>
                </button>
              )}
              <button
                onClick={() => { logout(); setCurrentView('landing'); }}
                className="px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-200 text-xs text-gray-700 font-medium transition flex items-center gap-1 shadow-sm"
              >
                <LogOut className="w-3 h-3 text-red-500" />
                <span className="text-[11px]">Log Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#ff8c00] hover:bg-[#e07b00] text-black text-[11px] sm:text-xs font-black tracking-wide uppercase transition-all duration-200 shadow-[0_4px_14px_rgba(255,140,0,0.35)] hover:shadow-[0_6px_18px_rgba(255,140,0,0.45)] hover:scale-105 cursor-pointer"
            >
              <span>LOG IN</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          )}

        </div>

      </div>
    </header>
  );
}
