import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  Shield, Sun, Globe, ChevronDown, LogOut, User, 
  ArrowRight, Compass, Search, Heart, MapPin, X 
} from 'lucide-react';

export default function Navbar({
  currentView,
  setCurrentView,
  openAuthModal,
  openWishlistModal,
  destinations = [],
  onSelectPlace
}) {
  const { user, logout, favorites = [] } = useAuth();
  const { language, setLanguage, t, languages, translateDestination } = useLanguage();
  const [langDropdown, setLangDropdown] = useState(false);
  const [navSearch, setNavSearch] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Filter saved locations from favorites
  const savedLocations = destinations.filter(d => favorites.includes(d._id));
  
  const filteredSaved = savedLocations.filter(d => {
    if (!navSearch.trim()) return true;
    const q = navSearch.toLowerCase();
    return d.title?.toLowerCase().includes(q) || d.state?.toLowerCase().includes(q) || d.category?.toLowerCase().includes(q);
  });

  const otherMatches = destinations.filter(d => {
    if (!navSearch.trim()) return false;
    if (favorites.includes(d._id)) return false;
    const q = navSearch.toLowerCase();
    return d.title?.toLowerCase().includes(q) || d.state?.toLowerCase().includes(q) || d.category?.toLowerCase().includes(q);
  });

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/90 shadow-sm px-4 sm:px-6 lg:px-8 py-2.5 transition">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-4">

        {/* Brand Logo & Name (With user's uploaded Phoenix logo) */}
        <div
          onClick={() => { setCurrentView('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2.5 cursor-pointer select-none shrink-0 group"
        >
          {/* Exact Phoenix Flaming Bird Logo */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden shadow-md bg-black flex items-center justify-center border border-amber-500/40 group-hover:scale-105 transition-transform">
            <img
              src="/phoenix-logo.png"
              alt="Team Pheonix Logo"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <div className="font-sans font-bold text-base sm:text-lg tracking-tight text-gray-900 leading-tight">
              Team <span className="text-amber-600 font-extrabold">Pheonix</span>
            </div>
            <div className="text-[7px] sm:text-[8px] tracking-[0.2em] text-gray-500 font-semibold uppercase -mt-0.5">
              {t('brandTagline')}
            </div>
          </div>
        </div>

        {/* Center Search Bar with Live Saved Locations Dropdown */}
        <div className="relative flex-1 max-w-[200px] xs:max-w-xs sm:max-w-sm md:max-w-md mx-1 sm:mx-2">
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 pointer-events-none" />
            <input 
              type="text"
              placeholder={t('searchPlaceholder')}
              value={navSearch}
              onFocus={() => setIsSearchOpen(true)}
              onChange={(e) => { setNavSearch(e.target.value); setIsSearchOpen(true); }}
              className="w-full pl-8 pr-7 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200/70 focus:bg-white border border-gray-200 focus:border-amber-500 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition shadow-inner"
            />
            {navSearch ? (
              <button 
                onClick={() => setNavSearch('')}
                className="absolute right-2.5 text-gray-400 hover:text-gray-600 p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            ) : (
              favorites.length > 0 && (
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="absolute right-2 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200 text-[9px] font-bold cursor-pointer hover:bg-red-100 transition"
                  title="Saved Wishlist Locations"
                >
                  <Heart className="w-2.5 h-2.5 fill-current" />
                  <span>{favorites.length}</span>
                </button>
              )
            )}
          </div>

          {/* Search & Saved Locations Dropdown Menu */}
          {isSearchOpen && (
            <>
              {/* Invisible Backdrop to close on outside click */}
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsSearchOpen(false)} 
              />

              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl shadow-2xl border border-gray-200 p-3 z-50 max-h-[380px] overflow-y-auto animate-in fade-in">
                
                {/* Header: Saved Locations */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
                    <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
                    <span>{t('searchSavedHeading')} ({savedLocations.length})</span>
                  </div>
                  {openWishlistModal && (
                    <button
                      onClick={() => { setIsSearchOpen(false); openWishlistModal(); }}
                      className="text-[10px] font-bold text-amber-600 hover:underline cursor-pointer"
                    >
                      {t('viewWishlist')} →
                    </button>
                  )}
                </div>

                {/* Saved Locations List */}
                {filteredSaved.length > 0 ? (
                  <div className="space-y-1.5 mb-2">
                    {filteredSaved.map((place) => (
                      <div
                        key={place._id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          if (onSelectPlace) onSelectPlace(place);
                        }}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-amber-50/70 border border-transparent hover:border-amber-200 cursor-pointer transition group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img 
                            src={place.image} 
                            alt={place.title}
                            className="w-8 h-8 rounded-lg object-cover border border-gray-200 shrink-0 shadow-sm" 
                          />
                          <div className="min-w-0">
                            <div className="font-bold text-gray-900 truncate text-[11px] group-hover:text-amber-700">
                              {place.title}
                            </div>
                            <div className="text-[10px] text-gray-500 flex items-center gap-1 truncate">
                              <MapPin className="w-2.5 h-2.5 text-amber-500" />
                              {place.state}
                            </div>
                          </div>
                        </div>

                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-red-50 text-red-600 border border-red-200 shrink-0">
                          Saved
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 text-center rounded-xl bg-slate-50 border border-slate-100 text-gray-500 text-[11px] mb-2">
                    {savedLocations.length === 0 
                      ? t('noSavedLocations')
                      : "No saved locations match your search query."}
                  </div>
                )}

                {/* Other Matching Destinations if searching */}
                {otherMatches.length > 0 && (
                  <div className="pt-2 border-t border-gray-100">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                      {t('otherDestinations')} ({otherMatches.length})
                    </div>
                    <div className="space-y-1">
                      {otherMatches.slice(0, 3).map((place) => (
                        <div
                          key={place._id}
                          onClick={() => {
                            setIsSearchOpen(false);
                            if (onSelectPlace) onSelectPlace(place);
                          }}
                          className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer transition text-xs"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <img src={place.image} alt={place.title} className="w-6 h-6 rounded object-cover" />
                            <span className="font-medium text-gray-800 truncate text-[11px]">{place.title}</span>
                          </div>
                          <span className="text-[9px] text-gray-400 shrink-0">{place.category}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </>
          )}
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">

          {/* Language Selector Pill */}
          <div className="relative">
            <button
              onClick={() => setLangDropdown(!langDropdown)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 hover:bg-gray-200 text-xs text-gray-700 font-medium transition cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-[11px] font-bold">
                {languages.find(l => l.code === language)?.nativeName || 'English'}
              </span>
              <ChevronDown className="w-3 h-3 text-gray-500" />
            </button>

            {langDropdown && (
              <div className="absolute right-0 mt-1.5 w-36 bg-white border border-gray-200 rounded-2xl shadow-xl py-1.5 z-50 text-xs animate-in fade-in">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLanguage(l.code); setLangDropdown(false); }}
                    className={`w-full text-left px-3.5 py-2 hover:bg-amber-50 hover:text-amber-800 text-xs transition flex items-center justify-between cursor-pointer ${
                      language === l.code ? 'bg-amber-50 font-bold text-amber-700' : 'text-gray-700'
                    }`}
                  >
                    <span>{l.label}</span>
                    {language === l.code && <span className="text-amber-600 font-black">✔</span>}
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

          {/* Sign Up / Log In Button (or User/Admin dashboard buttons) */}
          {user ? (
            <div className="flex items-center gap-1.5 sm:gap-2">
              {user.role === 'admin' ? (
                <>
                  {/* View Website Button */}
                  <button
                    onClick={() => {
                      setCurrentView('landing');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wide uppercase transition cursor-pointer border ${
                      currentView === 'landing'
                        ? 'bg-amber-500 text-black border-amber-500 shadow-sm'
                        : 'bg-amber-50/70 hover:bg-amber-100 text-amber-900 border-amber-300'
                    }`}
                    title="View Main Tourism Website"
                  >
                    <Globe className="w-3.5 h-3.5 text-amber-700" />
                    <span>{t('viewWebsite')}</span>
                  </button>

                  {/* Admin Suite Button (if on other views) */}
                  {currentView !== 'admin-dashboard' && (
                    <button
                      onClick={() => setCurrentView('admin-dashboard')}
                      className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-500 text-amber-700 text-[11px] font-bold tracking-wide uppercase transition hover:bg-amber-100 cursor-pointer"
                    >
                      <Shield className="w-3 h-3 text-amber-600" />
                      <span>{t('adminSuite')}</span>
                    </button>
                  )}
                </>
              ) : (
                <>
                  {/* Explore Web - Click to show main webpage */}
                  <button
                    onClick={() => {
                      setCurrentView('landing');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] font-extrabold tracking-wide uppercase transition shadow-sm cursor-pointer ${
                      currentView === 'landing'
                        ? 'bg-amber-500 text-black border border-amber-500 shadow-md ring-2 ring-amber-500/20'
                        : 'bg-amber-50 hover:bg-amber-100 border border-amber-500 text-amber-800'
                    }`}
                    title="Explore Main Webpage"
                  >
                    <Globe className="w-3.5 h-3.5 text-amber-700" />
                    <span>{t('exploreWeb')}</span>
                  </button>

                  {/* Dashboard link to return to user dashboard */}
                  {currentView !== 'user-dashboard' && (
                    <button
                      onClick={() => setCurrentView('user-dashboard')}
                      className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 text-[11px] font-bold tracking-wide uppercase transition cursor-pointer"
                      title="Return to User Dashboard"
                    >
                      <User className="w-3.5 h-3.5 text-amber-600" />
                      <span>{t('userDashboard')}</span>
                    </button>
                  )}
                </>
              )}
              <button
                onClick={() => { logout(); setCurrentView('landing'); }}
                className="px-2.5 sm:px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-200 text-xs text-gray-700 font-medium transition flex items-center gap-1 shadow-sm cursor-pointer"
              >
                <LogOut className="w-3 h-3 text-red-500" />
                <span className="text-[10px] sm:text-[11px]">{t('logOut')}</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#ff8c00] hover:bg-[#e07b00] text-black text-[11px] sm:text-xs font-black tracking-wide uppercase transition-all duration-200 shadow-[0_4px_14px_rgba(255,140,0,0.35)] hover:shadow-[0_6px_18px_rgba(255,140,0,0.45)] hover:scale-105 cursor-pointer"
            >
              <span>{t('logIn')}</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          )}

        </div>

      </div>
    </header>
  );
}
