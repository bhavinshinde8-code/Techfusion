import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Search, X, MapPin, Clock, Trash2, ArrowRight, 
  QrCode, BookOpen, Award, PhoneCall, CheckCircle, 
  Sparkles, Compass, Check, LogOut, ChevronRight, ChevronUp,
  Camera, Shield, Heart
} from 'lucide-react';

export default function UserDashboard({ 
  destinations = [], 
  onSelectPlace, 
  setCurrentView, 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory 
}) {
  const { user, logout } = useAuth();
  const [activeMenu, setActiveMenu] = useState('history'); // 'scan' | 'history' | 'guide' | 'rewards' | 'contact'
  const [menuOpen, setMenuOpen] = useState(true);
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [rewardPoints, setRewardPoints] = useState(100);
  const [isScanning, setIsScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);

  // Initial history items matching user's screenshot
  const [historyItems, setHistoryItems] = useState([
    {
      id: 'h-1',
      title: 'Leh Ladakh',
      tag: 'High-Altitude Cold Desert',
      location: 'Leh District, Ladakh',
      timestamp: '12:11:38 PM, 9/9/2026',
      points: '+25 pts',
      image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=400&q=80',
      status: 'Searched & Explored',
      placeMatch: 'trimbakeshwar-temple'
    },
    {
      id: 'h-2',
      title: 'Gondeshwar Mahadev Temple',
      tag: '11th Century Hemadpanthi Marvel',
      location: 'Sinnar, Nashik District, Maharashtra',
      timestamp: '12:00:00 PM, 9/9/2026',
      points: '+25 pts',
      image: '/places/trimbakeshwar.jpg',
      status: 'Searched & Explored',
      placeMatch: 'trimbakeshwar-temple'
    },
    {
      id: 'h-3',
      title: 'Shaniwar Wada',
      tag: '18th Century Maratha Fortress',
      location: 'Pune, Maharashtra',
      timestamp: '08:27:29 AM, 8/31/2026',
      points: '+25 pts',
      image: '/places/pandavleni.jpg',
      status: 'Searched & Explored',
      placeMatch: 'pandavleni-caves'
    }
  ]);

  const clearAllHistory = () => {
    setHistoryItems([]);
  };

  const removeHistoryItem = (id, e) => {
    e.stopPropagation();
    setHistoryItems(prev => prev.filter(item => item.id !== id));
  };

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanSuccess(true);
      setRewardPoints(prev => prev + 25);
      const newPlace = {
        id: 'h-' + Date.now(),
        title: 'Trimbakeshwar Shiva Temple',
        tag: 'Sacred Jyotirlinga Monument',
        location: 'Nashik, Maharashtra',
        timestamp: new Date().toLocaleTimeString() + ', ' + new Date().toLocaleDateString(),
        points: '+25 pts',
        image: '/places/trimbakeshwar.jpg',
        status: 'Scanned at Monument QR',
        placeMatch: 'trimbakeshwar-temple'
      };
      setHistoryItems(prev => [newPlace, ...prev]);
      setTimeout(() => setScanSuccess(false), 3000);
    }, 1500);
  };

  // Filter history based on search
  const displayedHistory = historyItems.filter(item => {
    if (!userSearchTerm) return true;
    const q = userSearchTerm.toLowerCase();
    return item.title.toLowerCase().includes(q) || item.location.toLowerCase().includes(q) || item.tag.toLowerCase().includes(q);
  });

  // Display name & info
  const displayName = user?.name || 'swami warude';
  const displayEmail = user?.email || 'swamiwarude6675@gmail.com';
  const displayPhone = user?.phone || '+91 7559302356';
  const initialChar = displayName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-[#fafbfc] text-gray-900 pb-16 pt-3 sm:pt-5 px-3 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-5">

        {/* 1. DARK HERO BANNER (Pixel-perfect matching screenshot) */}
        <div className="relative rounded-3xl bg-[#0e1322] text-white p-6 sm:p-8 overflow-hidden shadow-xl border border-slate-800">
          
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Left Column: Greeting & Info */}
            <div className="space-y-2 max-w-xl">
              
              {/* Traveler Dashboard Pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-semibold tracking-wide shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Traveler Dashboard</span>
              </div>

              {/* Headline with @Username highlighted in vibrant orange */}
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                <span className="text-[#ff8c00] font-black">@{displayName}</span> ready to explore?
              </h1>

              {/* Subtitle */}
              <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed max-w-lg">
                Welcome to your smart Maharashtra tourism hub. Scan monument QRs, collect reward points, explore offline guides, and plan visits.
              </p>
            </div>

            {/* Right Column: Search Destinations Box */}
            <div className="w-full md:w-80 lg:w-96 space-y-1.5 shrink-0">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                SEARCH DESTINATIONS
              </label>
              
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input 
                  type="text"
                  placeholder="Search temples, forts, caves, vineyards..."
                  value={userSearchTerm}
                  onChange={(e) => setUserSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-8 py-2.5 rounded-full bg-white text-gray-900 placeholder-gray-400 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-md transition"
                />
                {userSearchTerm && (
                  <button 
                    onClick={() => setUserSearchTerm('')}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* 2. MAIN 2-COLUMN SECTION (Left Menu + Profile, Right Active Panel) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Menu Dropdown Card + Profile Card */}
          {/* ========================================================================= */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Card 1: MENU OPTIONS DROPDOWN */}
            <div className="bg-white rounded-3xl border border-gray-200/80 p-4 shadow-sm space-y-3">
              
              {/* Dropdown Header */}
              <div 
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center justify-between cursor-pointer select-none pb-2 border-b border-gray-100"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                    <span className="text-xs font-black">☰</span>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                      MENU OPTIONS DROPDOWN
                    </div>
                    <div className="text-xs font-bold text-gray-900 capitalize">
                      Active: {activeMenu === 'scan' ? 'Scan Me' : activeMenu}
                    </div>
                  </div>
                </div>

                <button className="text-gray-400 hover:text-gray-600 p-1">
                  {menuOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              </div>

              {/* Menu Items List */}
              {menuOpen && (
                <div className="space-y-1.5 pt-1 text-xs">
                  
                  {/* 1. Tap to Scan / Scan Me */}
                  <button
                    type="button"
                    onClick={() => setActiveMenu('scan')}
                    className={`w-full py-2.5 px-3 rounded-2xl flex items-center justify-between transition-all ${
                      activeMenu === 'scan'
                        ? 'bg-[#ff8c00] text-black font-extrabold shadow-md'
                        : 'text-gray-700 hover:bg-gray-50 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <QrCode className="w-4 h-4" />
                      <span>Tap to Scan / Scan Me</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </button>

                  {/* 2. History (Active in user's screenshot) */}
                  <button
                    type="button"
                    onClick={() => setActiveMenu('history')}
                    className={`w-full py-2.5 px-3.5 rounded-2xl flex items-center justify-between transition-all ${
                      activeMenu === 'history'
                        ? 'bg-[#ff8c00] text-black font-extrabold shadow-md'
                        : 'text-gray-700 hover:bg-gray-50 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4" />
                      <span>History</span>
                    </div>
                    <span className={`w-5 h-5 rounded-full text-[11px] font-black flex items-center justify-center ${
                      activeMenu === 'history' ? 'bg-black text-[#ff8c00]' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {historyItems.length}
                    </span>
                  </button>

                  {/* 3. User Guide */}
                  <button
                    type="button"
                    onClick={() => setActiveMenu('guide')}
                    className={`w-full py-2.5 px-3 rounded-2xl flex items-center justify-between transition-all ${
                      activeMenu === 'guide'
                        ? 'bg-[#ff8c00] text-black font-extrabold shadow-md'
                        : 'text-gray-700 hover:bg-gray-50 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="w-4 h-4" />
                      <span>User Guide</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </button>

                  {/* 4. Rewards */}
                  <button
                    type="button"
                    onClick={() => setActiveMenu('rewards')}
                    className={`w-full py-2.5 px-3 rounded-2xl flex items-center justify-between transition-all ${
                      activeMenu === 'rewards'
                        ? 'bg-[#ff8c00] text-black font-extrabold shadow-md'
                        : 'text-gray-700 hover:bg-gray-50 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Award className="w-4 h-4" />
                      <span>Rewards</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                      {rewardPoints} Pts
                    </span>
                  </button>

                  {/* 5. Contact Us */}
                  <button
                    type="button"
                    onClick={() => setActiveMenu('contact')}
                    className={`w-full py-2.5 px-3 rounded-2xl flex items-center justify-between transition-all ${
                      activeMenu === 'contact'
                        ? 'bg-[#ff8c00] text-black font-extrabold shadow-md'
                        : 'text-gray-700 hover:bg-gray-50 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <PhoneCall className="w-4 h-4" />
                      <span>Contact Us</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </button>

                </div>
              )}

            </div>

            {/* Card 2: USER PROFILE CARD (Pixel-perfect matching screenshot) */}
            <div className="bg-white rounded-3xl border border-gray-200/80 p-4 sm:p-5 shadow-sm space-y-4">
              
              {/* User Avatar + Name + Email */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#ff8c00] text-black font-black text-lg flex items-center justify-center shadow-sm shrink-0">
                  {initialChar}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-sm text-gray-900 truncate">{displayName}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-600 fill-cyan-100 shrink-0" />
                  </div>
                  <div className="text-[11px] text-gray-500 truncate font-medium">
                    {displayEmail}
                  </div>
                </div>
              </div>

              {/* Info Rows */}
              <div className="space-y-2 text-xs border-t border-gray-100 pt-3">
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium flex items-center gap-1.5">
                    <span className="w-3.5 text-gray-400">📱</span> Mobile Phone
                  </span>
                  <span className="font-semibold text-gray-900 font-mono text-[11px]">{displayPhone}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium flex items-center gap-1.5">
                    <span className="w-3.5 text-emerald-500">✔</span> SMS Verification
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                    Verified
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium flex items-center gap-1.5">
                    <span className="w-3.5 text-amber-500">🎖️</span> Explorer Points
                  </span>
                  <span className="font-bold text-amber-600">{rewardPoints} Pts</span>
                </div>

              </div>

              {/* Log Out Button */}
              <button
                type="button"
                onClick={() => { logout(); setCurrentView('landing'); }}
                className="w-full py-2 px-3 rounded-2xl bg-[#fff0f2] hover:bg-[#ffe2e6] text-[#e11d48] font-bold text-xs border border-rose-200 flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out of Traveler Account</span>
              </button>

            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Active Panel + Bottom Trending Banner */}
          {/* ========================================================================= */}
          <div className="lg:col-span-8 space-y-4">

            {/* PANEL 1: SEARCH & EXPLORATION HISTORY (Matching screenshot) */}
            {activeMenu === 'history' && (
              <div className="bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-6 shadow-sm space-y-4">
                
                {/* Panel Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-inner">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-black text-gray-900 leading-tight">
                        Search & Exploration History
                      </h2>
                      <p className="text-gray-500 text-xs">
                        Recently searched and explored heritage places
                      </p>
                    </div>
                  </div>

                  {/* Badges & Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-bold text-xs">
                      {displayedHistory.length} Places Explored
                    </span>

                    {displayedHistory.length > 0 && (
                      <button
                        onClick={clearAllHistory}
                        className="px-3 py-1 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 font-bold text-xs flex items-center gap-1 transition"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Clear All</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* History Items List */}
                <div className="space-y-3">
                  {displayedHistory.length === 0 ? (
                    <div className="text-center py-12 text-gray-400 text-xs">
                      No exploration history found. Search places or scan monument QRs to record visits.
                    </div>
                  ) : (
                    displayedHistory.map((item) => (
                      <div 
                        key={item.id}
                        onClick={() => {
                          const matched = destinations.find(d => d._id === item.placeMatch || d.title.toLowerCase().includes(item.title.toLowerCase()));
                          if (matched && onSelectPlace) onSelectPlace(matched);
                        }}
                        className="p-3.5 sm:p-4 rounded-2xl border border-gray-200 hover:border-amber-400 hover:shadow-md transition flex items-center justify-between gap-3 group bg-white cursor-pointer"
                      >
                        {/* Left: Thumbnail & Info */}
                        <div className="flex items-center gap-3.5 min-w-0">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-12 h-12 rounded-xl object-cover border border-gray-200 shrink-0 shadow-sm group-hover:scale-105 transition-transform"
                          />

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-0.5">
                              <span className="font-extrabold text-sm text-gray-900 group-hover:text-amber-600 transition">
                                {item.title}
                              </span>
                              <span className="px-2 py-0.5 rounded-md bg-amber-100/70 text-amber-800 text-[10px] font-semibold border border-amber-200/50">
                                {item.tag}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                              <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
                              <span className="truncate">{item.location}</span>
                              <span className="text-gray-300">•</span>
                              <span className="shrink-0">{item.timestamp}</span>
                            </div>
                          </div>
                        </div>

                        {/* Right: Points Badge & Remove Action */}
                        <div className="text-right shrink-0 flex flex-col items-end gap-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[11px]">
                              {item.points}
                            </span>
                            <button
                              onClick={(e) => removeHistoryItem(item.id, e)}
                              className="p-1 text-gray-400 hover:text-red-500 rounded transition"
                              title="Delete from history"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="text-[10px] text-gray-400 font-medium">
                            {item.status}
                          </span>
                        </div>

                      </div>
                    ))
                  )}
                </div>

              </div>
            )}

            {/* PANEL 2: TAP TO SCAN / SCAN ME VIEW */}
            {activeMenu === 'scan' && (
              <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-sm space-y-4 text-center">
                <div className="max-w-md mx-auto space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 mx-auto flex items-center justify-center">
                    <QrCode className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-black text-gray-950">Monument QR Scanner</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    Point your camera at any Team Phoenix heritage marker across Nashik to unlock verified audio guides, architectural blueprints, and earn +25 reward points.
                  </p>

                  <div className="p-6 rounded-2xl bg-slate-50 border-2 border-dashed border-amber-300 relative overflow-hidden flex flex-col items-center justify-center min-h-[180px]">
                    {isScanning ? (
                      <div className="space-y-2 text-center">
                        <Camera className="w-8 h-8 text-amber-500 animate-bounce mx-auto" />
                        <div className="text-xs font-bold text-gray-700">Verifying Monument Geolocation...</div>
                      </div>
                    ) : scanSuccess ? (
                      <div className="space-y-1 text-center">
                        <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto" />
                        <div className="text-sm font-black text-emerald-700">+25 Explorer Points Credited!</div>
                        <div className="text-xs text-gray-500">Trimbakeshwar Shiva Temple Verified</div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <QrCode className="w-16 h-16 text-gray-800 mx-auto opacity-80" />
                        <button
                          onClick={handleSimulateScan}
                          className="px-5 py-2 rounded-full bg-[#ff8c00] hover:bg-[#e07b00] text-black font-black text-xs uppercase tracking-wider transition shadow-md"
                        >
                          Simulate Camera Scan
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* PANEL 3: USER GUIDE VIEW */}
            {activeMenu === 'guide' && (
              <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-sm space-y-4">
                <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-600" />
                  Nashik Smart Tourism Traveler Guide
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-gray-200 space-y-1">
                    <div className="font-bold text-gray-900 text-sm">1. QR Monument Badges</div>
                    <p className="text-gray-500">Locate Team Phoenix bronze QR plaques near temple sanctums & fort gates for instant multi-lingual history.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-gray-200 space-y-1">
                    <div className="font-bold text-gray-900 text-sm">2. Collect Explorer Points</div>
                    <p className="text-gray-500">Earn +25 points for every new circuit visited. Exchange points for vineyard tastings and museum admissions.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-gray-200 space-y-1">
                    <div className="font-bold text-gray-900 text-sm">3. Offline Memory Lane</div>
                    <p className="text-gray-500">Save places to your wishlist to read historical timelines even when Sahyadri valleys have low mobile signal.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-gray-200 space-y-1">
                    <div className="font-bold text-gray-900 text-sm">4. Verified Local Hosts</div>
                    <p className="text-gray-500">Contact verified homestay owners and government-licensed guides directly via our messaging portal.</p>
                  </div>
                </div>
              </div>
            )}

            {/* PANEL 4: REWARDS VIEW */}
            {activeMenu === 'rewards' && (
              <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div>
                    <h3 className="text-lg font-black text-gray-900">Your Explorer Rewards</h3>
                    <p className="text-xs text-gray-500">Redeem points earned from monument explorations across Maharashtra</p>
                  </div>
                  <div className="px-4 py-2 rounded-2xl bg-amber-500 text-black font-black text-base shadow-sm">
                    {rewardPoints} Pts
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-4 rounded-2xl border border-gray-200 flex items-center justify-between gap-3">
                    <div>
                      <div className="font-bold text-gray-900 text-sm">Sula Vineyards Tasting Voucher</div>
                      <div className="text-gray-500">20% Discount on Estate Tasting & Tour</div>
                    </div>
                    <button className="px-3 py-1.5 rounded-full bg-amber-500 text-black font-bold text-xs">
                      Redeem 75 Pts
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl border border-gray-200 flex items-center justify-between gap-3">
                    <div>
                      <div className="font-bold text-gray-900 text-sm">Pandavleni Caves Audio Guide Pass</div>
                      <div className="text-gray-500">Free VIP Audio Walkthrough across 24 Buddhist Caves</div>
                    </div>
                    <button className="px-3 py-1.5 rounded-full bg-amber-500 text-black font-bold text-xs">
                      Redeem 50 Pts
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* PANEL 5: CONTACT US VIEW */}
            {activeMenu === 'contact' && (
              <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-sm space-y-4">
                <h3 className="text-lg font-black text-gray-900">Contact Nashik Tourism Helpdesk</h3>
                <p className="text-xs text-gray-500">Need personal itinerary assistance or emergency tourism support?</p>
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs space-y-2">
                  <div className="font-bold text-amber-900">Digital Memory Lane Nashik Operations</div>
                  <div className="text-amber-800">📞 Phone: +91 8999515737 / +91 7559302356</div>
                  <div className="text-amber-800">✉️ Email: support@digitalmemorylane.org</div>
                  <div className="text-amber-800">📍 Hub: Tourism Hub India, Panchavati, Nashik</div>
                </div>
              </div>
            )}

            {/* BOTTOM BANNER: "Want to explore all trending tourist places?" (Matching screenshot) */}
            <div className="bg-[#fff8f0] border border-amber-200/70 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="font-black text-base sm:text-lg text-gray-950">
                  Want to explore all trending tourist places?
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Discover top temples, waterfalls, historic forts & wineries in Nashik.
                </p>
              </div>

              <button
                onClick={() => {
                  if (setCurrentView) setCurrentView('landing');
                  window.scrollTo({ top: 900, behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-full bg-[#ff8c00] hover:bg-[#e07b00] text-black font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_4px_14px_rgba(255,140,0,0.35)] hover:shadow-[0_6px_18px_rgba(255,140,0,0.45)] hover:scale-105 shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <span>EXPLORE PLACES</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
