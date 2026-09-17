import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  X, MapPin, Heart, Calendar, Clock, Ticket, Plane, 
  BookOpen, ListChecks, History, FileText, CheckCircle 
} from 'lucide-react';

export default function PlaceDetailsModal({ place, onClose }) {
  const { favorites, toggleFavorite } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!place) return null;

  const isFav = favorites.includes(place._id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-2xl my-auto max-h-[92vh] flex flex-col text-gray-900">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-gray-200 text-gray-700 flex items-center justify-center hover:bg-white hover:scale-105 shadow-md transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Photo Banner */}
        <div className="relative h-72 sm:h-96 shrink-0">
          <img 
            src={place.image} 
            alt={place.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-black/30" />

          {/* Place Title & Location Over Image */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-amber-700 border border-amber-300 shadow-sm uppercase tracking-wider">
                {place.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-sm">
                {place.era}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                  {place.title}
                </h2>
                <div className="flex items-center gap-1.5 text-sm text-amber-800 font-semibold mt-1">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  {place.state}
                </div>
              </div>

              <button 
                onClick={() => toggleFavorite(place._id)}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition shrink-0 ${
                  isFav 
                    ? 'bg-red-50 border-red-300 text-red-500 shadow-sm' 
                    : 'bg-white/90 border-gray-200 text-gray-600 hover:text-red-500 shadow-sm'
                }`}
                title={isFav ? "Saved to Wishlist" : "Add to Wishlist"}
              >
                <Heart className={`w-6 h-6 ${isFav ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 px-6 bg-slate-50 flex gap-2 sm:gap-6 overflow-x-auto shrink-0">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`py-3.5 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === 'overview' 
                ? 'border-amber-500 text-amber-700' 
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            History & Overview
          </button>

          <button 
            onClick={() => setActiveTab('keypoints')}
            className={`py-3.5 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === 'keypoints' 
                ? 'border-amber-500 text-amber-700' 
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <ListChecks className="w-4 h-4" />
            Key Visitor Points
          </button>

          <button 
            onClick={() => setActiveTab('timeline')}
            className={`py-3.5 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === 'timeline' 
                ? 'border-amber-500 text-amber-700' 
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <History className="w-4 h-4" />
            Historical Timeline ({place.timeline?.length || 0})
          </button>

          <button 
            onClick={() => setActiveTab('description')}
            className={`py-3.5 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === 'description' 
                ? 'border-amber-500 text-amber-700' 
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            Long Description
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 text-gray-700 space-y-6">
          
          {/* 1. OVERVIEW & SHORT HISTORY */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h4 className="font-serif text-lg font-bold text-gray-900 mb-2">
                  Short History & Origin
                </h4>
                <div className="p-5 rounded-2xl bg-amber-50/70 border-l-4 border-amber-500 text-gray-800 text-sm sm:text-base leading-relaxed">
                  {place.shortHistory}
                </div>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-gray-900 mb-3">
                  Top Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {place.keyPoints?.highlights?.map((h, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-gray-800 font-medium">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. KEY VISITOR POINTS */}
          {activeTab === 'keypoints' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gray-500 font-bold">Best Time to Visit</div>
                    <div className="text-sm font-bold text-gray-900 mt-1">{place.keyPoints?.bestTime || 'October to March'}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gray-500 font-bold">Visiting Timings</div>
                    <div className="text-sm font-bold text-gray-900 mt-1">{place.keyPoints?.timings || 'Sunrise to Sunset'}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Ticket className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gray-500 font-bold">Entry Tariff</div>
                    <div className="text-sm font-bold text-gray-900 mt-1">{place.keyPoints?.entryFee || '₹50 (Indians), ₹600 (Foreigners)'}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Plane className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gray-500 font-bold">Nearest Transit</div>
                    <div className="text-sm font-bold text-gray-900 mt-1">{place.keyPoints?.nearestTransit || 'Local Airport & Railway'}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. INTERACTIVE HISTORICAL TIMELINE */}
          {activeTab === 'timeline' && (
            <div className="relative pl-8 space-y-6 animate-in fade-in py-2">
              {/* Vertical Spine */}
              <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-gradient-to-b from-amber-500 via-amber-300 to-amber-100" />

              {place.timeline?.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Node */}
                  <div className="absolute -left-8 top-1.5 w-5 h-5 rounded-full bg-amber-500 border-4 border-white shadow-md group-hover:scale-125 transition-transform" />

                  {/* Card */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 group-hover:border-amber-400 transition">
                    <span className="inline-block px-3 py-0.5 rounded-full text-xs font-bold font-serif bg-amber-100 text-amber-800 border border-amber-200 mb-2">
                      {item.year}
                    </span>
                    <h5 className="text-base font-bold text-gray-900 mb-1.5">
                      {item.title}
                    </h5>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 4. LONG IN-DEPTH DESCRIPTION */}
          {activeTab === 'description' && (
            <div className="space-y-4 animate-in fade-in">
              <h4 className="font-serif text-lg font-bold text-gray-900">
                Cultural & Architectural Heritage
              </h4>
              <p className="text-sm sm:text-base leading-relaxed text-gray-700 whitespace-pre-line">
                {place.longDescription}
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
