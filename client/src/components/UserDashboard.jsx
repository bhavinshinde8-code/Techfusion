import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { 
  Search, X, MapPin, Heart, Clock, ArrowRight, ArrowLeft, 
  Compass, Landmark, Mail, Shield, CheckCircle2, 
  Send, Table as TableIcon, LayoutGrid
} from 'lucide-react';

export default function UserDashboard({ 
  destinations, 
  onSelectPlace, 
  setCurrentView, 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory, 
  openWishlistModal 
}) {
  const { favorites, toggleFavorite, user } = useAuth();
  const [activeTab, setActiveTab] = useState('explore'); // 'explore' | 'wishlist' | 'inquiries' | 'profile'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [inquiries, setInquiries] = useState([]);
  const [submittingInquiry, setSubmittingInquiry] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    interest: 'Heritage & History Trail',
    message: ''
  });

  const categories = [
    'All',
    'UNESCO Heritage',
    'Forts & Palaces',
    'Spiritual & Temples',
    'Ancient Caves',
    'Natural & Scenic'
  ];

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = async () => {
    try {
      const list = await api.getInquiries();
      if (user?.email) {
        const userInqs = (list || []).filter(i => i.email?.toLowerCase() === user.email.toLowerCase());
        setInquiries(userInqs.length > 0 ? userInqs : (list || []));
      } else {
        setInquiries(list || []);
      }
    } catch (err) {
      console.warn('Could not load inquiries:', err);
    }
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (!inquiryForm.message.trim()) return;

    setSubmittingInquiry(true);
    try {
      const payload = {
        name: inquiryForm.name || user?.name || 'Traveler',
        email: inquiryForm.email || user?.email || 'traveler@example.com',
        interest: inquiryForm.interest,
        message: inquiryForm.message,
        createdAt: new Date().toISOString()
      };
      await api.submitInquiry(payload);
      setInquiries(prev => [payload, ...prev]);
      setInquirySuccess(true);
      setInquiryForm({
        name: user?.name || '',
        email: user?.email || '',
        interest: 'Heritage & History Trail',
        message: ''
      });
      setTimeout(() => setInquirySuccess(false), 4000);
    } catch (err) {
      alert('Failed to submit inquiry. Please try again.');
    } finally {
      setSubmittingInquiry(false);
    }
  };

  // Filtered destinations
  const filtered = destinations.filter(place => {
    const matchCategory = selectedCategory === 'All' || place.category.toLowerCase() === selectedCategory.toLowerCase();
    if (!matchCategory) return false;

    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const inTitle = place.title.toLowerCase().includes(q);
    const inState = place.state.toLowerCase().includes(q);
    const inShort = place.shortHistory && place.shortHistory.toLowerCase().includes(q);
    const inEra = place.era && place.era.toLowerCase().includes(q);
    return inTitle || inState || inShort || inEra;
  });

  const wishlistPlaces = destinations.filter(d => favorites.includes(d._id));
  const totalPlaces = destinations.length;
  const totalMilestones = destinations.reduce((acc, d) => acc + (d.timeline ? d.timeline.length : 0), 0);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto bg-slate-50 text-gray-900">
      
      {/* Header Banner - Matching Admin Suite Style */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
        <div>
          <button 
            onClick={() => setCurrentView('landing')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 mb-1.5 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </button>
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-gray-900 flex items-center gap-2.5">
            <Compass className="w-6 h-6 text-amber-600" />
            Traveler Explorer Suite
          </h1>
          <p className="text-gray-500 text-xs mt-0.5">
            Discover iconic Nashik & India heritage circuits, manage your saved wishlist, and plan custom itineraries.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button 
            onClick={() => setActiveTab('wishlist')}
            className="px-3.5 py-1.5 rounded-xl bg-white border border-gray-200 hover:border-red-300 text-xs font-bold text-gray-800 flex items-center gap-2 shadow-sm transition hover:bg-red-50/50"
          >
            <Heart className="w-4 h-4 text-red-500 fill-red-500/20" />
            <span>Wishlist ({favorites.length})</span>
          </button>

          {user?.role === 'admin' && (
            <button 
              onClick={() => setCurrentView('admin-dashboard')}
              className="px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-400 text-amber-800 text-xs font-bold hover:bg-amber-100 transition shadow-sm flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Suite</span>
            </button>
          )}
        </div>
      </div>

      {/* Top 4 Key Metric Stat Cards - Matching Admin Suite */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
        <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <div className="font-serif text-xl font-bold text-gray-900">{totalPlaces}</div>
            <div className="text-[11px] text-gray-500 font-medium">Available Places</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-bold">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <div>
            <div className="font-serif text-xl font-bold text-gray-900">{favorites.length}</div>
            <div className="text-[11px] text-gray-500 font-medium">Saved Wishlist</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="font-serif text-xl font-bold text-gray-900">{totalMilestones}</div>
            <div className="text-[11px] text-gray-500 font-medium">Timeline Milestones</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <div className="font-serif text-xl font-bold text-gray-900">{inquiries.length}</div>
            <div className="text-[11px] text-gray-500 font-medium">Tour Inquiries</div>
          </div>
        </div>
      </div>

      {/* Structured Navigation Tabs - Matching Admin Suite */}
      <div className="flex flex-wrap gap-4 border-b border-gray-200 mb-5 text-xs sm:text-sm">
        <button
          onClick={() => setActiveTab('explore')}
          className={`pb-2.5 font-bold border-b-2 transition ${
            activeTab === 'explore' 
              ? 'border-amber-500 text-amber-700' 
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          Explore Destinations ({filtered.length})
        </button>
        <button
          onClick={() => setActiveTab('wishlist')}
          className={`pb-2.5 font-bold border-b-2 transition ${
            activeTab === 'wishlist' 
              ? 'border-amber-500 text-amber-700' 
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          Saved Wishlist ({wishlistPlaces.length})
        </button>
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`pb-2.5 font-bold border-b-2 transition ${
            activeTab === 'inquiries' 
              ? 'border-amber-500 text-amber-700' 
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          My Inquiries & Guided Tours ({inquiries.length})
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-2.5 font-bold border-b-2 transition ${
            activeTab === 'profile' 
              ? 'border-amber-500 text-amber-700' 
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          Traveler Profile
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: EXPLORE DESTINATIONS */}
      {/* ========================================================================= */}
      {activeTab === 'explore' && (
        <div className="space-y-4">
          
          {/* Search & Filter Bar with Grid/Table Toggle */}
          <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              
              {/* Search Bar */}
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-2.5" />
                <input 
                  type="text" 
                  placeholder="Search destinations by title, state, era, or history..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-9 py-2 rounded-xl bg-slate-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:border-amber-500 transition"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* View Toggle (Grid Cards vs Table) */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0 self-end sm:self-auto">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition ${
                    viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                  }`}
                  title="Card Grid View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Grid</span>
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition ${
                    viewMode === 'table' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                  }`}
                  title="Table Directory View"
                >
                  <TableIcon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Directory</span>
                </button>
              </div>

            </div>

            {/* Category Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition ${
                    selectedCategory === cat
                      ? 'bg-amber-500 text-black font-bold shadow-sm'
                      : 'bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 1A. Table View (Matching Admin Directory Table) */}
          {viewMode === 'table' && (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm text-xs sm:text-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-gray-700">
                  <thead className="bg-slate-50 text-gray-600 text-[11px] uppercase font-bold border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3">Destination</th>
                      <th className="px-4 py-3">State / City</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Historical Era</th>
                      <th className="px-4 py-3">Milestones</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs">
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-10 text-gray-500">
                          No destinations found matching your filters.
                        </td>
                      </tr>
                    ) : (
                      filtered.map((place) => {
                        const isFav = favorites.includes(place._id);
                        return (
                          <tr key={place._id} className="hover:bg-amber-50/40 transition">
                            <td className="px-4 py-3 font-bold text-gray-900 flex items-center gap-2.5">
                              <img 
                                src={place.image} 
                                alt={place.title} 
                                className="w-8 h-8 rounded-lg object-cover border border-gray-200 shrink-0 shadow-sm"
                              />
                              <div>
                                <div>{place.title}</div>
                                <div className="text-[10px] text-gray-400 line-clamp-1 font-normal max-w-xs">
                                  {place.shortHistory}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-gray-600 font-medium">
                              <span className="flex items-center gap-1 text-[11px]">
                                <MapPin className="w-3 h-3 text-amber-500" />
                                {place.state}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-gray-700 border border-slate-200">
                                {place.category}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-gray-700 text-[11px] font-medium">
                              {place.era || 'Antiquity'}
                            </td>
                            <td className="px-4 py-3 text-gray-500 text-[11px]">
                              {place.timeline?.length || 4} Milestones
                            </td>
                            <td className="px-4 py-3 text-right space-x-1.5">
                              <button
                                onClick={() => toggleFavorite(place._id)}
                                className={`p-1.5 rounded-lg border transition ${
                                  isFav 
                                    ? 'bg-red-50 text-red-600 border-red-200' 
                                    : 'bg-white text-gray-500 border-gray-200 hover:text-red-500'
                                }`}
                                title={isFav ? 'Remove from Wishlist' : 'Save to Wishlist'}
                              >
                                <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                              </button>
                              <button
                                onClick={() => onSelectPlace(place)}
                                className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-black font-bold text-[11px] transition shadow-sm"
                              >
                                Details
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 1B. Card Grid View */}
          {viewMode === 'grid' && (
            <div>
              {filtered.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
                  <Compass className="w-10 h-10 text-amber-500 mx-auto mb-2 animate-pulse" />
                  <h3 className="font-serif text-lg font-bold text-gray-900 mb-1">No destinations found</h3>
                  <p className="text-gray-500 text-xs mb-3">Try searching with a different keyword or category.</p>
                  <button 
                    onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                    className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs shadow-sm"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filtered.map((place) => {
                    const isFav = favorites.includes(place._id);
                    return (
                      <div 
                        key={place._id}
                        onClick={() => onSelectPlace(place)}
                        className="group bg-white border border-gray-200 hover:border-amber-500 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col shadow-sm"
                      >
                        <div className="relative h-44 overflow-hidden">
                          <img 
                            src={place.image} 
                            alt={place.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                          
                          <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-amber-700 border border-amber-300 shadow-sm uppercase tracking-wider">
                            {place.category}
                          </span>

                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(place._id);
                            }}
                            className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border transition ${
                              isFav 
                                ? 'bg-red-500 text-white border-red-500 shadow-sm' 
                                : 'bg-white/85 border-white text-gray-700 hover:text-red-500'
                            }`}
                          >
                            <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                          </button>

                          <div className="absolute bottom-2.5 left-2.5 text-xs text-white flex items-center gap-1 font-semibold drop-shadow-md">
                            <MapPin className="w-3.5 h-3.5 text-amber-400" />
                            {place.state}
                          </div>
                        </div>

                        <div className="p-4 flex flex-col flex-1">
                          <div className="text-[11px] text-emerald-700 font-bold mb-0.5">{place.era}</div>
                          <h3 className="font-serif text-lg font-bold text-gray-900 mb-1.5 group-hover:text-amber-600 transition leading-snug">
                            {place.title}
                          </h3>
                          
                          <p className="text-gray-600 text-xs line-clamp-2 mb-3 leading-relaxed">
                            {place.shortHistory}
                          </p>

                          <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                            <span className="text-gray-500 flex items-center gap-1 text-[11px]">
                              <Clock className="w-3.5 h-3.5 text-emerald-600" />
                              {place.timeline?.length || 4} Milestones
                            </span>

                            <span className="text-amber-600 font-bold flex items-center gap-1 text-[11px] group-hover:translate-x-1 transition-transform">
                              Details <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: MY SAVED WISHLIST */}
      {/* ========================================================================= */}
      {activeTab === 'wishlist' && (
        <div>
          {wishlistPlaces.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
              <Heart className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <h3 className="font-serif text-lg font-bold text-gray-900 mb-1">Your wishlist is empty</h3>
              <p className="text-gray-500 text-xs mb-4">Click the heart icon on any destination to save it here for offline viewing and planning.</p>
              <button 
                onClick={() => setActiveTab('explore')}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs shadow-sm transition"
              >
                Browse Destinations
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {wishlistPlaces.map((place) => (
                <div 
                  key={place._id}
                  className="bg-white border border-gray-200 hover:border-red-300 rounded-xl overflow-hidden shadow-sm flex flex-col group transition"
                >
                  <div className="relative h-44 overflow-hidden cursor-pointer" onClick={() => onSelectPlace(place)}>
                    <img 
                      src={place.image} 
                      alt={place.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-amber-700 shadow-sm uppercase">
                      {place.category}
                    </span>
                    <div className="absolute bottom-2.5 left-2.5 text-xs text-white flex items-center gap-1 font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      {place.state}
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <div className="text-[11px] text-emerald-700 font-bold mb-0.5">{place.era}</div>
                    <h3 className="font-serif text-base font-bold text-gray-900 mb-1 leading-snug">
                      {place.title}
                    </h3>
                    <p className="text-gray-600 text-xs line-clamp-2 mb-3 leading-relaxed">
                      {place.shortHistory}
                    </p>

                    <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                      <button 
                        onClick={() => toggleFavorite(place._id)}
                        className="px-2.5 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-[11px] font-bold transition flex items-center gap-1"
                      >
                        <Heart className="w-3 h-3 fill-current" /> Remove
                      </button>

                      <button 
                        onClick={() => onSelectPlace(place)}
                        className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-black text-[11px] font-bold transition shadow-sm flex items-center gap-1"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: INQUIRIES & GUIDED TOUR REQUESTS */}
      {/* ========================================================================= */}
      {activeTab === 'inquiries' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Direct Inquiry Form */}
          <div className="lg:col-span-5 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h3 className="font-serif text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
              <Send className="w-4 h-4 text-amber-600" />
              Request Guided Tour & Helpdesk
            </h3>
            <p className="text-gray-500 text-xs mb-4">
              Looking for a custom itinerary or verified local destination host in Nashik? Submit your query below.
            </p>

            {inquirySuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Inquiry submitted successfully! A verified host will reach out soon.</span>
              </div>
            )}

            <form onSubmit={handleInquirySubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Your Name</label>
                <input 
                  type="text"
                  required
                  value={inquiryForm.name}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-amber-500 transition"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email"
                  required
                  value={inquiryForm.email}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-amber-500 transition"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Destination Circuit Interest</label>
                <select
                  value={inquiryForm.interest}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, interest: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-amber-500 transition font-medium"
                >
                  <option>Heritage & History Trail (Pandavleni Caves)</option>
                  <option>Spiritual Jyotirlinga Circuit (Trimbakeshwar)</option>
                  <option>Vineyard Agro-Tourism (Sula Vineyards)</option>
                  <option>Sahyadri Forts & Trekking (Anjaneri Hills)</option>
                  <option>Godavari River Walk (Ramkund Ghats)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Message / Travel Dates / Group Size</label>
                <textarea 
                  rows="3"
                  required
                  value={inquiryForm.message}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                  placeholder="Tell us what you'd like to experience, planned dates, group size..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-amber-500 transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submittingInquiry}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs transition shadow-sm flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submittingInquiry ? 'Submitting...' : 'Send Inquiry to Team Phoenix'}</span>
              </button>
            </form>
          </div>

          {/* Right Column: Inquiries List */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between pb-1">
              <h3 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-purple-600" />
                Submitted Tour Inquiries ({inquiries.length})
              </h3>
              <button 
                onClick={loadInquiries} 
                className="text-xs text-amber-700 hover:underline font-semibold"
              >
                Refresh
              </button>
            </div>

            {inquiries.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200 text-gray-500 text-xs">
                No inquiries submitted yet. Use the form on the left to request guided assistance.
              </div>
            ) : (
              inquiries.map((inq, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-gray-900 text-sm">{inq.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 font-bold">
                        {inq.interest}
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-400 mb-1.5">{inq.email}</div>
                    <p className="text-gray-700 italic">"{inq.message}"</p>
                  </div>
                  <div className="text-right shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full mb-1">
                      <CheckCircle2 className="w-2.5 h-2.5" /> Received
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {new Date(inq.createdAt || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: TRAVELER PROFILE & DATABASE DETAILS */}
      {/* ========================================================================= */}
      {activeTab === 'profile' && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm max-w-2xl mx-auto">
          <div className="flex items-center gap-4 pb-5 border-b border-gray-200">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-700 font-bold text-xl shadow-inner">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'T'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-gray-950 font-serif">{user?.name || 'Guest Explorer'}</h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {user?.role === 'admin' ? 'Admin Host' : 'Traveler Explorer'}
                </span>
              </div>
              <div className="text-xs text-gray-500 mt-0.5">{user?.email || 'Logged in via session'}</div>
            </div>
          </div>

          <div className="py-5 space-y-4 text-xs border-b border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 font-medium">Database Store:</span>
              <span className="font-mono font-bold text-emerald-700 inline-flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                MongoDB Atlas (Techfusion.users)
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500 font-medium">Saved Wishlist Items:</span>
              <span className="font-bold text-gray-900">{favorites.length} places</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500 font-medium">Submitted Inquiries:</span>
              <span className="font-bold text-gray-900">{inquiries.length} tour requests</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500 font-medium">Portal Access:</span>
              <span className="font-bold text-gray-800">Verified Explorer Portal</span>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => setCurrentView('landing')}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-gray-700 font-bold text-xs transition"
            >
              Back to Home
            </button>

            <button
              onClick={() => setActiveTab('explore')}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs transition shadow-sm"
            >
              Explore More Places
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
