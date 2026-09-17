import React, { useState, useEffect } from 'react';
import { MapPin, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Iconic Nashik tourist spots for sliding background
const NASHIK_PLACES = [
  {
    title: "TRIMBAKESHWAR SHIVA TEMPLE",
    location: "NASHIK, MAHARASHTRA",
    category: "Sacred Jyotirlinga",
    image: "/places/trimbakeshwar.jpg",
    id: "trimbakeshwar-temple"
  },
  {
    title: "SULA VINEYARDS",
    location: "NASHIK, MAHARASHTRA",
    category: "Wine Capital of India",
    image: "/places/sula-vineyards.jpg",
    id: "sula-vineyards"
  },
  {
    title: "PANDAVLENI BUDDHIST CAVES",
    location: "NASHIK, MAHARASHTRA",
    category: "2nd Century BCE Rock-Cut Caves",
    image: "/places/pandavleni.jpg",
    id: "pandavleni-caves"
  },
  {
    title: "ANJANERI HILLS & FORT",
    location: "NASHIK, MAHARASHTRA",
    category: "Sahyadri Mountain Trek",
    image: "/places/anjaneri.jpg",
    id: "anjaneri-hills"
  },
  {
    title: "RAMKUND & GODAVARI GHATS",
    location: "PANCHAVATI, NASHIK",
    category: "Historic Kumbh Mela Ghats",
    image: "/places/ramkund.jpg",
    id: "ramkund-nashik"
  }
];

export default function Hero({ onSelectPlaceById }) {
  const { t, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Preload all background images so crossfade transitions are instant and butter smooth
  useEffect(() => {
    NASHIK_PLACES.forEach(spot => {
      const img = new Image();
      img.src = spot.image;
    });
  }, []);

  // Auto-slide every 4.5 seconds smoothly without manual arrow buttons
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % NASHIK_PLACES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const currentSpot = NASHIK_PLACES[currentIndex];

  const handlePillClick = () => {
    if (onSelectPlaceById) {
      onSelectPlaceById(currentSpot.id, currentSpot.title);
    }
  };

  return (
    <section className="relative w-full h-[52vh] min-h-[380px] sm:min-h-[420px] md:min-h-[460px] lg:min-h-[500px] max-h-[540px] flex flex-col justify-between items-center text-center px-4 pt-5 sm:pt-7 pb-4 sm:pb-5 overflow-hidden select-none">

      {/* Sliding Background Images of Nashik with Continuous Automatic Crossfade */}
      {NASHIK_PLACES.map((spot, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${idx === currentIndex ? 'opacity-100 scale-100 z-0' : 'opacity-0 scale-105 pointer-events-none -z-10'
            }`}
          style={{
            backgroundImage: `url('${spot.image}')`,
            filter: 'brightness(0.92) contrast(1.06)'
          }}
        />
      ))}

      {/* Cinematic Semi-Transparent Overlay - preserves full picture visibility while keeping text crisp */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/65 z-10 pointer-events-none" />

      {/* Gentle bottom feather fade into page background */}
      <div className="absolute bottom-0 inset-x-0 h-10 sm:h-14 bg-gradient-to-t from-slate-50/80 to-transparent z-10 pointer-events-none" />

      {/* Center Hero Content - Centered directly in the middle of the sliding image */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto px-3 my-auto">

        {/* Top Pill Badge */}
        <div
          onClick={handlePillClick}
          className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1 rounded-full bg-white/95 border border-amber-500 text-amber-900 text-[10px] sm:text-xs font-bold tracking-wide mb-2 sm:mb-2.5 shadow-md hover:scale-105 cursor-pointer transition animate-in fade-in backdrop-blur-sm max-w-[95vw]"
        >
          <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-600 fill-amber-500/20 shrink-0" />
          <span className="truncate">
            {t('currentlyViewing', 'CURRENTLY VIEWING')}: <span className="text-gray-950 font-extrabold">{currentSpot.title}</span> ({currentSpot.location})
          </span>
        </div>

        {/* Main Title: Aligned dead center */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black tracking-tight text-white mb-2 sm:mb-2.5 drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] leading-tight">
          {t('heroMainTitle1', "Let's Know")} <span className="text-amber-400 drop-shadow-[0_0_26px_rgba(245,158,11,0.85)]">{t('heroMainTitle2', 'Our Nashik')}</span>
        </h1>

        {/* Subtitle: Centered under title */}
        <p className="text-white text-xs sm:text-sm md:text-base max-w-lg sm:max-w-xl md:max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] px-2 mb-2.5 sm:mb-3 text-slate-100">
          {t('heroDescription', 'Explore timeless temples, Buddhist caves, sacred river ghats, and majestic Sahyadri mountain forts through local registered tourism hosts.')}
        </p>

        {/* Subtle Slide Indicators */}
        <div className="flex items-center gap-1.5">
          {NASHIK_PLACES.map((spot, i) => (
            <span
              key={i}
              className={`transition-all duration-500 rounded-full ${i === currentIndex
                ? 'w-6 sm:w-7 h-1 sm:h-1.5 bg-amber-400 shadow-md'
                : 'w-1 sm:w-1.5 h-1 sm:h-1.5 bg-white/50'
                }`}
            />
          ))}
        </div>

      </div>

      {/* Bottom 4 Stats Cards - Positioned cleanly at bottom edge */}
      <div className="relative z-20 w-full max-w-3xl lg:max-w-4xl mx-auto mt-auto pt-2 pb-1">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5">

          {/* Card 1 */}
          <div className="py-1.5 sm:py-2 px-2.5 sm:px-3 rounded-xl bg-white/95 backdrop-blur-sm border border-gray-200/90 shadow-sm text-center hover:border-amber-400 hover:shadow-md transition">
            <div className="text-lg sm:text-xl font-black text-amber-600 leading-snug">
              12+
            </div>
            <div className="text-[8px] sm:text-[9px] font-bold tracking-wider text-gray-600 uppercase">
              {t('historicalSitesStat', 'HISTORICAL SITES')}
            </div>
          </div>

          {/* Card 2 */}
          <div className="py-1.5 sm:py-2 px-2.5 sm:px-3 rounded-xl bg-white/95 backdrop-blur-sm border border-gray-200/90 shadow-sm text-center hover:border-amber-400 hover:shadow-md transition">
            <div className="text-lg sm:text-xl font-black text-amber-600 leading-snug">
              2000+
            </div>
            <div className="text-[8px] sm:text-[9px] font-bold tracking-wider text-gray-600 uppercase">
              {t('yearsHeritageStat', 'YEARS HERITAGE')}
            </div>
          </div>

          {/* Card 3 */}
          <div className="py-1.5 sm:py-2 px-2.5 sm:px-3 rounded-xl bg-white/95 backdrop-blur-sm border border-gray-200/90 shadow-sm text-center hover:border-amber-400 hover:shadow-md transition">
            <div className="text-lg sm:text-xl font-black text-amber-600 leading-snug">
              50+
            </div>
            <div className="text-[8px] sm:text-[9px] font-bold tracking-wider text-gray-600 uppercase">
              {t('verifiedHostsStat', 'VERIFIED HOSTS')}
            </div>
          </div>

          {/* Card 4 */}
          <div className="py-1.5 sm:py-2 px-2.5 sm:px-3 rounded-xl bg-white/95 backdrop-blur-sm border border-gray-200/90 shadow-sm text-center hover:border-amber-400 hover:shadow-md transition">
            <div className="text-lg sm:text-xl font-black text-amber-600 leading-snug flex items-center justify-center gap-1">
              4.9 <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 inline -mt-0.5" />
            </div>
            <div className="text-[8px] sm:text-[9px] font-bold tracking-wider text-gray-600 uppercase">
              {t('travelerRatingStat', 'TRAVELER RATING')}
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
