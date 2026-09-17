import React from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Heart, MapPin } from 'lucide-react';

export default function FavoritesModal({ isOpen, onClose, destinations, onSelectPlace }) {
  const { favorites, toggleFavorite } = useAuth();

  if (!isOpen) return null;

  const savedPlaces = destinations.filter(d => favorites.includes(d._id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[85vh] flex flex-col text-gray-900">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <h2 className="font-serif text-2xl font-extrabold text-gray-900 flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500 fill-red-500/20" />
            Saved Heritage Wishlist
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Your bookmarked monuments and destinations across India.
          </p>
        </div>

        <div className="overflow-y-auto flex-1 pr-1">
          {savedPlaces.length === 0 ? (
            <div className="text-center py-14">
              <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3 stroke-1" />
              <h3 className="font-serif text-lg font-bold text-gray-900 mb-1">Your wishlist is empty</h3>
              <p className="text-xs text-gray-500 mb-4">Click the heart icon on any monument card to bookmark it.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedPlaces.map((place) => (
                <div 
                  key={place._id}
                  onClick={() => {
                    onClose();
                    onSelectPlace(place);
                  }}
                  className="group bg-slate-50 border border-gray-200 hover:border-amber-400 rounded-2xl p-3 flex gap-3 cursor-pointer transition shadow-sm"
                >
                  <img 
                    src={place.image} 
                    alt={place.title}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 border border-gray-200"
                  />
                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <h4 className="font-serif font-bold text-gray-900 text-sm truncate group-hover:text-amber-600 transition">
                        {place.title}
                      </h4>
                      <p className="text-xs text-amber-700 font-semibold flex items-center gap-1 mt-0.5 truncate">
                        <MapPin className="w-3 h-3 shrink-0 text-amber-600" />
                        {place.state}
                      </p>
                    </div>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(place._id);
                      }}
                      className="text-[11px] text-red-600 hover:text-red-700 flex items-center gap-1 self-start mt-1 font-semibold"
                    >
                      <Heart className="w-3 h-3 fill-current" /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
