import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, ArrowRight, Heart, Clock, Flame } from 'lucide-react';

export default function TopDestinations({ destinations = [], onSelectPlace }) {
  const { favorites = [], toggleFavorite } = useAuth();
  const { t, translateDestination } = useLanguage();

  // ONLY destinations that are published AND marked as Trending by Admin
  const trendingDestinations = destinations.filter(
    d => d.isPublished !== false && !!d.isTrending
  );

  return (
    <section id="destinations" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 text-amber-700 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.2em] mb-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 shadow-xs">
          <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500 animate-bounce" />
          <span>{trendingDestinations.length} {t('trendingActiveBadge')}</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2 flex items-center justify-center gap-2.5">
          <span>{t('topDestinationsTitle')}</span>
          <span className="text-xs font-sans font-black px-2.5 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm flex items-center gap-1">
            <Flame className="w-3 h-3 fill-current" />
            <span>{t('trendingOnlyBadge')}</span>
          </span>
        </h2>

        <p className="text-gray-500 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
          {t('topDestinationsSubtitle')}
        </p>
      </div>

      {/* Only Trending Destinations Grid */}
      {trendingDestinations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingDestinations.map((place) => {
            const isFav = favorites.includes(place._id);
            const locPlace = translateDestination(place);

            return (
              <div 
                key={place._id}
                onClick={() => onSelectPlace(locPlace)}
                className="group bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col border border-orange-400 ring-2 ring-orange-400/25 shadow-md shadow-orange-500/10"
              >
                {/* Image & Badges Container */}
                <div className="relative h-48 sm:h-52 overflow-hidden">
                  <img 
                    src={locPlace.image} 
                    alt={locPlace.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Badges on Top Left */}
                  <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 max-w-[75%]">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-amber-800 border border-amber-300 shadow-xs uppercase tracking-wider backdrop-blur-xs">
                      {locPlace.category}
                    </span>

                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md flex items-center gap-1 uppercase tracking-wider animate-in fade-in">
                      <Flame className="w-3 h-3 fill-current animate-pulse" />
                      <span>{t('trendingOnlyBadge')}</span>
                    </span>
                  </div>

                  {/* Favorite Heart Button */}
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(place._id);
                    }}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border transition cursor-pointer shadow-sm ${
                      isFav 
                        ? 'bg-red-500 text-white border-red-500 hover:bg-red-600 scale-110' 
                        : 'bg-white/85 border-white text-gray-700 hover:text-red-500 hover:bg-white'
                    }`}
                    title={isFav ? t('savedWishlist') : t('saveWishlist')}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                  </button>

                  {/* Location Pill on Bottom Left */}
                  <div className="absolute bottom-3 left-3 text-xs text-white flex items-center gap-1.5 font-bold drop-shadow-md">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{locPlace.state}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-gray-900 group-hover:text-amber-600 transition leading-snug">
                      {locPlace.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-500 text-xs line-clamp-2 mb-3.5 leading-relaxed">
                    {locPlace.shortHistory}
                  </p>

                  {/* Highlights tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {locPlace.keyPoints?.highlights?.slice(0, 3).map((h, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-gray-700 font-medium">
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* Card Footer */}
                  <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between text-[11px]">
                    <span className="text-gray-500 flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3 text-emerald-600" />
                      <span>{locPlace.timeline?.length || 4} {t('milestonesCount')}</span>
                    </span>

                    <span className="text-amber-600 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>{t('exploreSite')}</span>
                      <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-10 text-center rounded-3xl bg-amber-50/40 border border-amber-200/80 max-w-md mx-auto space-y-2">
          <Flame className="w-8 h-8 text-orange-400 mx-auto" />
          <div className="font-bold text-gray-900 text-sm">{t('noTrendingYet')}</div>
          <p className="text-gray-500 text-xs leading-relaxed">
            {t('noTrendingSubtitle')}
          </p>
        </div>
      )}
    </section>
  );
}
