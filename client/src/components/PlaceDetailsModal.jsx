import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  X, MapPin, Heart, Calendar, Clock, Star, Volume2, 
  VolumeX, ChevronDown, ChevronUp, ChevronLeft, ChevronRight,
  Compass, ExternalLink, Link2, Globe, Check, Plus, CheckCircle2,
  Navigation, Share2, Sparkles, Flame, BookOpen
} from 'lucide-react';

export default function PlaceDetailsModal({ place, onClose, onTogglePublish, onAddSite }) {
  const { favorites = [], toggleFavorite, user } = useAuth();
  const { t, language, translateDestination } = useLanguage();
  
  // Localized destination details
  const locPlace = translateDestination(place) || place;
  
  // Audio Guide state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [speechUtterance, setSpeechUtterance] = useState(null);

  // Detailed Description expanded state
  const [isDescExpanded, setIsDescExpanded] = useState(true);

  // Timeline Slider state
  const [timelineIndex, setTimelineIndex] = useState(0);

  // Published toggle state
  const [isPublished, setIsPublished] = useState(place?.isPublished !== false);
  const [isAddedToSites, setIsAddedToSites] = useState(false);

  useEffect(() => {
    // Reset states when a new place opens
    setTimelineIndex(0);
    setIsPlayingAudio(false);
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (place) {
      setIsPublished(place.isPublished !== false);
    }
  }, [place]);

  // Clean up speech synthesis on unmount or close
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!place) return null;

  const isFav = favorites.includes(place._id);

  // Contextual Timeline Data
  const defaultTimeline = [
    {
      year: locPlace.era || '966 CE',
      title: 'Foundational Royal Endowment',
      description: `Historic patrons commission sacred stone edifices, instituting daily rituals and lasting cultural prominence for ${locPlace.title}.`,
      image: locPlace.image
    },
    {
      year: '1517 CE',
      title: 'Imperial Patronage & Expansion',
      description: `Rulers endow golden kalashas, mandapas, and vast revenue grants, elevating the monument to national heritage prominence.`,
      image: locPlace.image
    },
    {
      year: '1933 CE',
      title: 'Modern Preservation & Pilgrimage Circuit',
      description: `Recognized and protected under state cultural heritage trusts with millions of international travelers visiting annually.`,
      image: locPlace.image
    }
  ];

  const timelineList = locPlace.timeline && locPlace.timeline.length > 0 ? locPlace.timeline : defaultTimeline;
  const currentTimeline = timelineList[Math.min(timelineIndex, timelineList.length - 1)] || timelineList[0];

  // Highlights
  const defaultHighlights = [
    `Architectural Sanctum of ${locPlace.title}`,
    'Historic Basalt Stone Carvings & Heritage Sculptures',
    'Sacred Water Kund & Scenic Natural Viewpoints',
    'Recognized Monument of Cultural & Spiritual Eminence'
  ];
  const highlights = (locPlace.keyPoints?.highlights && locPlace.keyPoints.highlights.length > 0) 
    ? locPlace.keyPoints.highlights 
    : defaultHighlights;

  // Contextual Nearby Places based on destination
  const getNearbyPlaces = () => {
    const titleLower = (place.title || '').toLowerCase();
    if (titleLower.includes('trimbak')) {
      return [
        { name: 'Brahmagiri Mountain Trek', dist: '1.2 km', tag: 'Scenic Viewpoint / Nature', image: '/places/anjaneri.jpg' },
        { name: 'Kushavarta Sacred Kund', dist: '0.5 km', tag: 'Sacred Shrine', image: '/places/ramkund.jpg' },
        { name: 'Gangadwar Godavari Spring', dist: '2.0 km', tag: 'Historic Holy Origin', image: '/places/trimbakeshwar.jpg' },
        { name: 'Gorakhnath Gufa', dist: '3.5 km', tag: 'Ancient Hermitage Cave', image: '/places/pandavleni.jpg' }
      ];
    }
    if (titleLower.includes('sula')) {
      return [
        { name: 'York Winery & Tasting Room', dist: '1.8 km', tag: 'Artisan Wine Estate', image: '/places/sula-vineyards.jpg' },
        { name: 'Gangapur Dam & Boat Club', dist: '2.5 km', tag: 'Scenic Watersports', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
        { name: 'Soma Vine Village', dist: '3.0 km', tag: 'Boutique Resort & Spa', image: '/places/sula-vineyards.jpg' },
        { name: 'Chambhar Leni Caves', dist: '9.0 km', tag: 'Jain Heritage Caves', image: '/places/pandavleni.jpg' }
      ];
    }
    if (titleLower.includes('pandavleni')) {
      return [
        { name: 'Dadasaheb Phalke Smarak', dist: '0.8 km', tag: 'Cultural Memorial', image: '/places/ramkund.jpg' },
        { name: 'Buddha Vihar Meditation Hall', dist: '1.2 km', tag: 'Spiritual Center', image: '/places/pandavleni.jpg' },
        { name: 'Nashik Botanical Garden', dist: '4.5 km', tag: 'Eco Park & Laser Show', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80' },
        { name: 'Trimbak Heritage Circuit', dist: '22 km', tag: 'Pilgrimage Corridor', image: '/places/trimbakeshwar.jpg' }
      ];
    }
    if (titleLower.includes('anjaneri')) {
      return [
        { name: 'Anjaneri Temple & Peak', dist: '1.5 km', tag: 'Mythological Birthplace', image: '/places/anjaneri.jpg' },
        { name: 'Coin Museum Anjaneri', dist: '3.2 km', tag: 'Numismatic Heritage', image: '/places/ramkund.jpg' },
        { name: 'Trimbakeshwar Temple', dist: '7.0 km', tag: 'Sacred Jyotirlinga', image: '/places/trimbakeshwar.jpg' },
        { name: 'Vaitarna Dam Catchment', dist: '14 km', tag: 'Scenic Water Body', image: '/places/sula-vineyards.jpg' }
      ];
    }
    // Default / Tirupati / Generic matching screenshot
    return [
      { name: 'Sri Padmavathi Ammavari Temple', dist: '5.0 km', tag: 'Sacred Shrine', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=400&q=80' },
      { name: 'Chandragiri Fort', dist: '14.5 km', tag: 'Heritage Monument', image: 'https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=400&q=80' },
      { name: 'Silathoranam Natural Arch', dist: '1.5 km', tag: 'Scenic Viewpoint / Nature', image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=400&q=80' },
      { name: 'Kapila Theertham Waterfall Temple', dist: '2.5 km', tag: 'Scenic Viewpoint / Nature', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' }
    ];
  };

  // Contextual Historical Circuits
  const getHistoricalCircuits = () => {
    const titleLower = (place.title || '').toLowerCase();
    if (titleLower.includes('trimbak') || titleLower.includes('ramkund')) {
      return [
        {
          title: 'All-India 12 Jyotirlinga Circuit',
          circuit: 'Peshwa Shiva Heritage Corridor',
          description: 'Shares sacred spiritual synergy with Somnath, Mahakaleshwar, and Kashi Vishwanath as an immortal jyotirlinga source of the Godavari.'
        },
        {
          title: 'Simhastha Kumbh Mela Circuit',
          circuit: 'Panchavati Godavari Sacred Trail',
          description: 'Historically linked with Ujjain, Haridwar, and Prayagraj where millions of sadhus assemble every 12 years along the holy riverbanks.'
        }
      ];
    }
    if (titleLower.includes('sula')) {
      return [
        {
          title: 'Nashik Valley Agro-Viticulture Circuit',
          circuit: 'Maharashtra Wine Capital Route',
          description: 'Pioneering route connecting artisanal vineyards, micro-distilleries, and Sahyadri terroir agro-tourism.'
        },
        {
          title: 'Western Sahyadri Eco-Tourism Trail',
          circuit: 'Gangapur Dam Water Heritage',
          description: 'Integrated ecological corridor combining lake water sports, bird sanctuaries, and organic vineyard estates.'
        }
      ];
    }
    // Default matching screenshot
    return [
      {
        title: 'Srirangam Ranganathaswamy',
        circuit: 'Southern Vaishnavite Divya Desam Circuit',
        description: 'Both temples share profound historic patronage under the Cholas and Vijayanagara empires and stand as premier Divya Desam shrines dedicated to Vishnu.'
      },
      {
        title: 'Sri Kalahasteeswara Temple',
        circuit: 'Pancha Bhoota Stalam Circuit',
        description: 'Historically linked as the dual spiritual gateways of the region, where pilgrims traditionally visit Kalahasti (representing Wind) alongside Tirupati.'
      }
    ];
  };

  const nearbyPlaces = getNearbyPlaces();
  const historicalCircuits = getHistoricalCircuits();

  // Audio Guide Narration Handler with native SpeechSynthesis support
  const toggleAudioGuide = () => {
    if (!window.speechSynthesis) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${locPlace.title}. ${locPlace.shortHistory || ''} ${locPlace.longDescription || ''}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      const speechLangMap = {
        en: 'en-IN',
        hi: 'hi-IN',
        mr: 'mr-IN',
        gu: 'gu-IN',
        bn: 'bn-IN',
        te: 'te-IN',
        ta: 'ta-IN'
      };
      utterance.lang = speechLangMap[language] || 'en-IN';
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      setSpeechUtterance(utterance);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const handleTogglePublishInternal = () => {
    const nextVal = !isPublished;
    setIsPublished(nextVal);
    if (onTogglePublish) {
      onTogglePublish(place._id, nextVal);
    }
  };

  const handleAddSiteClick = () => {
    setIsAddedToSites(true);
    toggleFavorite(place._id);
    if (onAddSite) {
      onAddSite(place);
    }
    setTimeout(() => setIsAddedToSites(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/75 backdrop-blur-md animate-in fade-in overflow-y-auto">
      
      {/* Main Modal Container (Exact layout of screenshot) */}
      <div className="relative w-full max-w-2xl sm:max-w-3xl bg-white border border-gray-200/90 rounded-3xl overflow-hidden shadow-2xl my-auto max-h-[94vh] flex flex-col text-gray-900 font-sans">
        
        {/* ========================================================================= */}
        {/* 1. HERO PHOTO BANNER */}
        {/* ========================================================================= */}
        <div className="relative h-64 sm:h-72 md:h-80 w-full overflow-hidden shrink-0 select-none">
          <img 
            src={locPlace.image} 
            alt={locPlace.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1322] via-black/40 to-black/20" />

          {/* Top Left Rating Badge (Matching screenshot) */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff8c00] text-black font-black text-xs shadow-lg uppercase tracking-wide">
            <Star className="w-3.5 h-3.5 fill-black stroke-black" />
            <span>{t('reviewsBadge', '★ 4.9 (15,420+ REVIEWS)')}</span>
          </div>

          {/* Top Right Close Button (Matching screenshot) */}
          <button 
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white text-gray-800 flex items-center justify-center hover:bg-gray-100 shadow-xl transition cursor-pointer hover:scale-105"
            title="Close Details"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Bottom Left Title, Tag, and Location */}
          <div className="absolute bottom-5 left-5 right-5 z-10 text-white space-y-1">
            <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#ffaa33] drop-shadow-sm">
              {locPlace.category ? locPlace.category.toUpperCase() : 'ANCIENT VAISHNAVITE SHRINE'}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight drop-shadow-md">
              {locPlace.title}
            </h1>

            <div className="flex items-center gap-1.5 text-xs text-slate-200 font-semibold pt-0.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{locPlace.state}</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SCROLLABLE BODY CONTENT */}
        {/* ========================================================================= */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5 bg-[#fafbfc]">
          
          {/* --------------------------------------------------------------------- */}
          {/* 2. KEY FEATURES & HIGHLIGHTS */}
          {/* --------------------------------------------------------------------- */}
          <div className="space-y-2">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
              {t('keyFeaturesTitle', 'KEY FEATURES & HIGHLIGHTS')}
            </div>

            <div className="flex flex-wrap gap-2">
              {highlights.map((h, i) => (
                <div 
                  key={i}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-50/80 border border-amber-300 text-amber-950 flex items-center gap-1.5 shadow-xs"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* 3. DETAILED DESCRIPTION CARD (In-Depth Heritage & Tourist Guide) */}
          {/* --------------------------------------------------------------------- */}
          <div className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-5 shadow-xs space-y-3">
            
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xs sm:text-sm text-gray-900">
                    {t('detailedDescTitle', 'Detailed Description (In-Depth Heritage & Tourist Guide)')}
                  </h3>
                  <p className="text-[11px] text-gray-500">
                    {t('detailedDescSubtitle', 'Click to expand text / listen to audio guide in your selected language')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleAudioGuide}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 border transition cursor-pointer ${
                    isPlayingAudio
                      ? 'bg-amber-500 text-black border-amber-500 shadow-sm animate-pulse'
                      : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-300'
                  }`}
                  title="Listen to narrated audio guide"
                >
                  {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">{isPlayingAudio ? t('stopAudio', 'Stop Audio') : t('playAudio', 'Play Audio')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsDescExpanded(!isDescExpanded)}
                  className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-gray-800 text-xs font-bold flex items-center gap-1 transition cursor-pointer"
                >
                  <span>{isDescExpanded ? t('readLess', 'Read Less') : t('readMore', 'Read More')}</span>
                  {isDescExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Collapsible Content */}
            {isDescExpanded && (
              <div className="pt-2 border-t border-gray-100 space-y-3 animate-in fade-in text-xs sm:text-[13px] text-gray-700 leading-relaxed">
                <p>
                  {locPlace.longDescription || locPlace.shortHistory || 'Comprehensive historical archive detailing patronage, Vedic origins, and architectural evolution.'}
                </p>
                {locPlace.shortHistory && locPlace.longDescription && (
                  <p className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-gray-600 italic">
                    "{locPlace.shortHistory}"
                  </p>
                )}
              </div>
            )}

          </div>

          {/* --------------------------------------------------------------------- */}
          {/* 4. VISUAL TIMELINE (YEAR-BY-YEAR ERA SLIDER) */}
          {/* --------------------------------------------------------------------- */}
          <div className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-5 shadow-xs space-y-4">
            
            {/* Header with Counter Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xs sm:text-sm text-gray-900">
                    {t('visualTimelineTitle', 'VISUAL TIMELINE (YEAR-BY-YEAR ERA SLIDER)')}
                  </h3>
                  <p className="text-[10px] text-gray-500">
                    {t('visualTimelineSubtitle', 'Slide to travel through historical eras')} - {locPlace.title}
                  </p>
                </div>
              </div>

              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-300">
                {timelineIndex + 1} / {timelineList.length}
              </span>
            </div>

            {/* Slider Track Progress Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="relative w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-300"
                  style={{ width: `${((timelineIndex + 1) / timelineList.length) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                <span>{timelineList[0]?.year || 'Ancient Era'}</span>
                <span>{timelineList[timelineList.length - 1]?.year || 'Present Era'}</span>
              </div>
            </div>

            {/* Current Era Card */}
            <div className="p-3.5 sm:p-4 rounded-2xl border border-gray-200 bg-slate-50/50 flex flex-col sm:flex-row items-center gap-4">
              
              {/* Left Box: Real Image or Era Box */}
              <div className="w-full sm:w-36 h-24 rounded-xl bg-slate-800 text-white flex flex-col items-center justify-center p-2 text-center shrink-0 border border-slate-700 overflow-hidden relative shadow-inner">
                {currentTimeline.image ? (
                  <img src={currentTimeline.image} alt={currentTimeline.title} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <>
                    <Calendar className="w-5 h-5 text-amber-400 mb-1" />
                    <span className="text-[10px] font-bold text-slate-300 leading-tight">Era Milestone</span>
                    <span className="text-[9px] text-slate-400">{currentTimeline.year}</span>
                  </>
                )}
              </div>

              {/* Right Content */}
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="inline-flex items-center px-2 py-0.5 rounded-md bg-amber-500 text-black text-[10px] font-black uppercase">
                  {currentTimeline.year}
                </div>
                <h4 className="font-bold text-sm text-gray-900">
                  {currentTimeline.title}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {currentTimeline.description}
                </p>
              </div>

            </div>

            {/* Navigation Buttons (Previous / Next) */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                disabled={timelineIndex === 0}
                onClick={() => setTimelineIndex(prev => Math.max(0, prev - 1))}
                className={`px-4 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                  timelineIndex === 0
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50'
                    : 'border-gray-300 text-gray-800 hover:bg-gray-100 bg-white shadow-xs'
                }`}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>{t('previousEra', 'Previous Era')}</span>
              </button>

              <button
                type="button"
                disabled={timelineIndex === timelineList.length - 1}
                onClick={() => setTimelineIndex(prev => Math.min(timelineList.length - 1, prev + 1))}
                className={`px-4 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                  timelineIndex === timelineList.length - 1
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50'
                    : 'border-amber-400 text-amber-900 hover:bg-amber-100 bg-amber-50 shadow-xs'
                }`}
              >
                <span>{t('nextEra', 'Next Era')}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* --------------------------------------------------------------------- */}
          {/* 5. NEARBY PLACES TO VISIT (WITHIN 15KM) */}
          {/* --------------------------------------------------------------------- */}
          <div className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-5 shadow-xs space-y-3">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-600" />
                <h3 className="font-extrabold text-xs sm:text-sm text-gray-900 uppercase tracking-wide">
                  {t('nearbyPlacesTitle', 'NEARBY PLACES TO VISIT (WITHIN 15KM)')}
                </h3>
              </div>
              <span className="text-[10px] text-gray-400 font-medium">{t('clickToNavigate', 'Click to navigate')}</span>
            </div>

            {/* 2x2 Grid of Nearby Places */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {nearbyPlaces.map((near, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    const query = encodeURIComponent(`${near.name}, ${locPlace.state}`);
                    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
                  }}
                  className="flex items-center justify-between p-2.5 rounded-2xl border border-gray-200/90 hover:border-amber-400 hover:bg-amber-50/40 transition cursor-pointer group shadow-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img 
                      src={near.image} 
                      alt={near.name} 
                      className="w-11 h-11 rounded-xl object-cover border border-gray-200 shrink-0" 
                    />
                    <div className="min-w-0">
                      <div className="font-bold text-xs text-gray-900 truncate group-hover:text-amber-700">
                        {near.name}
                      </div>
                      <div className="text-[10px] text-gray-500 truncate mt-0.5">
                        <span className="font-bold text-amber-700">{near.dist}</span> • {near.tag}
                      </div>
                    </div>
                  </div>

                  <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 group-hover:bg-amber-500 group-hover:text-black transition shrink-0 ml-1.5">
                    <Navigation className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* --------------------------------------------------------------------- */}
          {/* 6. CO-RELATED HISTORICAL CIRCUITS & HERITAGE LINKS */}
          {/* --------------------------------------------------------------------- */}
          <div className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-5 shadow-xs space-y-3">
            
            <div className="flex items-center gap-2">
              <Link2 className="w-4 h-4 text-amber-600" />
              <h3 className="font-extrabold text-xs sm:text-sm text-gray-900 uppercase tracking-wide">
                {t('circuitsTitle', 'CO-RELATED HISTORICAL CIRCUITS & HERITAGE LINKS')}
              </h3>
            </div>

            {/* 2 Column Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {historicalCircuits.map((circ, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl border border-gray-200/90 bg-slate-50/50 space-y-2">
                  <div className="space-y-1">
                    <div className="font-bold text-xs text-gray-900">
                      {circ.title}
                    </div>
                    <span className="inline-block px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-bold">
                      {circ.circuit}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    {circ.description}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* --------------------------------------------------------------------- */}
          {/* 7. LIVE DESTINATION WEB RESOURCE */}
          {/* --------------------------------------------------------------------- */}
          <div className="bg-amber-50/60 border border-amber-200/90 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-gray-900">
                  {t('liveWebResourceTitle', 'Live Destination Web Resource')}
                </h4>
                <p className="text-[11px] text-gray-500">
                  {t('liveWebResourceSubtitle', 'Explore real-time encyclopedia articles, historical archives, and guide pages on the web.')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <a
                href={`https://en.wikipedia.org/wiki/${encodeURIComponent(place.title)}`}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-[#ff8c00] hover:bg-[#e07b00] text-black font-extrabold text-xs flex items-center gap-1 shadow-sm transition"
              >
                <span>{t('readWebGuide', 'READ WEB GUIDE')}</span>
                <ExternalLink className="w-3 h-3 stroke-[2.5]" />
              </a>

              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(place.title + ' ' + (place.state || ''))}`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-gray-100 text-gray-800 font-bold text-xs border border-gray-300 flex items-center gap-1 shadow-xs transition"
              >
                <span>Google</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 8. BOTTOM STICKY ACTION BAR (Matches screenshot exactly) */}
        {/* ========================================================================= */}
        <div className="bg-[#0e1322] text-white p-3.5 sm:p-4 rounded-b-3xl border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0 shadow-2xl">
          
          {/* Left Checkbox: Publish */}
          <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-bold text-slate-300 hover:text-white transition">
            <input 
              type="checkbox"
              checked={isPublished}
              onChange={handleTogglePublishInternal}
              className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500 cursor-pointer accent-[#ff8c00]"
            />
            <span>{t('publishAccessible', 'Publish (Accessible to Users on Website)')}</span>
          </label>

          {/* Right Action Buttons: Add to Sites + Close */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleAddSiteClick}
              className="px-4 py-2 rounded-xl bg-[#ff8c00] hover:bg-[#e07b00] text-black font-black text-xs uppercase tracking-wide flex items-center gap-1.5 shadow-md hover:scale-105 transition cursor-pointer"
            >
              {isAddedToSites ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                  <span>{t('savedToSites', 'SAVED TO SITES!')}</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  <span>{t('addToSites', 'ADD TO SITES')}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-gray-900 font-bold text-xs transition border border-slate-200 shadow-sm cursor-pointer"
            >
              {t('closeModal', 'Close')}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
