import React from 'react';
import { useAuth } from '../context/AuthContext';
import { MapPin, ArrowRight, Heart, Clock } from 'lucide-react';

export default function TopDestinations({ destinations, onSelectPlace }) {
  const { favorites, toggleFavorite } = useAuth();

  return (
    <section id="destinations" className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-7 sm:mb-8">
        <div className="text-amber-600 text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5">
          Iconic Landmarks
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1.5">
          Top Destinations
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto text-xs sm:text-sm">
          Handpicked architectural marvels, sacred pilgrimage capitals, and ancient fortresses defining India's grandeur.
        </p>
      </div>

      {/* 3-Card Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {destinations.slice(0, 3).map((place) => {
          const isFav = favorites.includes(place._id);
          return (
            <div 
              key={place._id}
              onClick={() => onSelectPlace(place)}
              className="group bg-white border border-gray-200 hover:border-amber-500/80 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col shadow-sm"
            >
              {/* Image & Badges */}
              <div className="relative h-44 sm:h-48 overflow-hidden">
                <img 
                  src={place.image} 
                  alt={place.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-amber-700 border border-amber-300 shadow-sm uppercase tracking-wider">
                  {place.category}
                </span>

                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(place._id);
                  }}
                  className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-md border transition ${
                    isFav 
                      ? 'bg-red-500 text-white border-red-500 shadow-sm' 
                      : 'bg-white/80 border-white text-gray-700 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                </button>

                <div className="absolute bottom-2.5 left-2.5 text-[11px] text-white flex items-center gap-1 font-semibold drop-shadow-md">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  {place.state}
                </div>
              </div>

              {/* Body */}
              <div className="p-4 sm:p-5 flex flex-col flex-1">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-gray-900 mb-1.5 group-hover:text-amber-600 transition">
                  {place.title}
                </h3>
                
                <p className="text-gray-500 text-xs line-clamp-2 mb-3.5 leading-relaxed">
                  {place.shortHistory}
                </p>

                {/* Highlights tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {place.keyPoints?.highlights?.slice(0, 3).map((h, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-gray-700 font-medium">
                      {h}
                    </span>
                  ))}
                </div>

                {/* Card Footer */}
                <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between text-[11px]">
                  <span className="text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-600" />
                    {place.timeline?.length || 4} Milestones
                  </span>

                  <span className="text-amber-600 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Explore Timeline <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
