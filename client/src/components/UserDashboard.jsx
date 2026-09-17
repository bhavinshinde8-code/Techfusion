import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Search, X, MapPin, Heart, Clock, ArrowRight, ArrowLeft, Compass } from 'lucide-react';

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

  const categories = [
    'All',
    'UNESCO Heritage',
    'Forts & Palaces',
    'Spiritual & Temples',
    'Ancient Caves',
    'Natural & Scenic'
  ];

  // Filtering
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

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-slate-50 text-gray-900">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-200">
        <div>
          <button 
            onClick={() => setCurrentView('landing')}
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 hover:text-amber-800 mb-2 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </button>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-gray-900">
            Traveler Discovery Dashboard
          </h1>
          <p className="text-gray-600 text-xs sm:text-sm mt-1">
            Search any place across India to uncover photos, short history, key points, historical timelines, and long descriptions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={openWishlistModal}
            className="px-4 py-2 rounded-xl bg-white border border-gray-200 hover:border-red-300 text-xs sm:text-sm font-semibold text-gray-800 flex items-center gap-2 shadow-sm transition"
          >
            <Heart className="w-4 h-4 text-red-500 fill-red-500/20" />
            Saved Wishlist ({favorites.length})
          </button>

          {user?.role === 'admin' && (
            <button 
              onClick={() => setCurrentView('admin-dashboard')}
              className="px-4 py-2 rounded-xl bg-amber-50 border border-amber-300 text-amber-800 text-xs sm:text-sm font-semibold hover:bg-amber-100 transition shadow-sm"
            >
              Admin Suite
            </button>
          )}
        </div>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 mb-8 shadow-sm">
        
        {/* Search Bar */}
        <div className="relative mb-5">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
          <input 
            type="text" 
            placeholder="Search by destination name, state (e.g. Rajasthan, Uttar Pradesh, Maharashtra), or era..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-3 rounded-xl bg-slate-50 border border-gray-200 text-gray-900 placeholder-gray-500 text-sm sm:text-base focus:outline-none focus:border-amber-500 transition"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Category Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition ${
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

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-gray-500 mb-6">
        <span>Showing {filtered.length} destination{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Places Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <Compass className="w-12 h-12 text-amber-500 mx-auto mb-3 animate-pulse" />
          <h3 className="font-serif text-xl font-bold text-gray-900 mb-1">No destinations found</h3>
          <p className="text-gray-500 text-sm mb-4">Try searching with a different keyword or select "All".</p>
          <button 
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs shadow-sm"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((place) => {
            const isFav = favorites.includes(place._id);
            return (
              <div 
                key={place._id}
                onClick={() => onSelectPlace(place)}
                className="group bg-white border border-gray-200 hover:border-amber-500/80 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col shadow-sm"
              >
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={place.image} 
                    alt={place.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                  
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold bg-white/95 text-amber-700 border border-amber-300 shadow-sm uppercase tracking-wider">
                    {place.category}
                  </span>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(place._id);
                    }}
                    className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border transition ${
                      isFav 
                        ? 'bg-red-500 text-white border-red-500 shadow-sm' 
                        : 'bg-white/80 border-white text-gray-700 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                  </button>

                  <div className="absolute bottom-3 left-3 text-xs text-white flex items-center gap-1.5 font-semibold drop-shadow-md">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    {place.state}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="text-xs text-emerald-700 font-bold mb-1">{place.era}</div>
                  <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition">
                    {place.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm line-clamp-3 mb-6 leading-relaxed">
                    {place.shortHistory}
                  </p>

                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-gray-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      {place.timeline?.length || 4} Milestones
                    </span>

                    <span className="text-amber-600 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      View Timeline & Details <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
