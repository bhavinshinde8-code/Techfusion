import React, { useState, useEffect } from 'react';
import { api } from './services/api';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TopDestinations from './components/TopDestinations';
import PlatformFeatures from './components/PlatformFeatures';
import PlatformDisclaimers from './components/PlatformDisclaimers';
import Footer from './components/Footer';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import PlaceDetailsModal from './components/PlaceDetailsModal';
import AuthModal from './components/AuthModal';
import FavoritesModal from './components/FavoritesModal';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'user-dashboard' | 'admin-dashboard'
  const [destinations, setDestinations] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    loadDestinations();
  }, []);

  const loadDestinations = async () => {
    const list = await api.getDestinations();
    setDestinations(list || []);
  };

  const handleHeroSelectPlaceById = (id, fallbackTitle) => {
    const found = destinations.find(d => d._id === id || d.title.toLowerCase().includes(fallbackTitle.toLowerCase()));
    if (found) {
      setSelectedPlace(found);
    } else {
      // Fallback
      setSelectedPlace({
        _id: id,
        title: fallbackTitle,
        state: "Nashik, Maharashtra",
        category: "Iconic Nashik Tourism",
        era: "Historic Maharashtra Heritage",
        image: "https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=1920&q=80",
        shortHistory: `${fallbackTitle} is one of the most revered and scenic tourist destinations in Nashik, Maharashtra.`,
        keyPoints: {
          bestTime: "October to March",
          timings: "Open Daily",
          entryFee: "Free / Nominal",
          highlights: ["Panoramic Views", "Cultural Significance", "Historical Legacy"],
          nearestTransit: "Nashik Road Railway Station"
        },
        timeline: [
          { year: "Historical Era", title: "Foundational Origin", description: "Constituted as a revered pilgrimage and heritage landmark." }
        ],
        longDescription: `${fallbackTitle} attracts travelers and pilgrims from across the globe, offering natural beauty and rich cultural heritage in the heart of Nashik.`
      });
    }
  };

  const handleOpenAuth = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 font-sans flex flex-col antialiased selection:bg-amber-500 selection:text-black">
      
      {/* Top Navbar */}
      <Navbar 
        currentView={currentView}
        setCurrentView={setCurrentView}
        openAuthModal={handleOpenAuth}
        openWishlistModal={() => setIsWishlistOpen(true)}
      />

      {/* VIEW 1: LANDING PAGE */}
      {currentView === 'landing' && (
        <main className="flex-1 animate-in fade-in">
          {/* 1. Hero Section with Automatic Sliding Background of Nashik Tourist Places */}
          <Hero 
            onSelectPlaceById={handleHeroSelectPlaceById}
          />

          {/* 2. Top Destinations Section */}
          <TopDestinations 
            destinations={destinations}
            onSelectPlace={(place) => setSelectedPlace(place)}
          />

          {/* 3. Platform Features ("Empowering Travelers & Local Hosts" - 3 Cards) */}
          <PlatformFeatures />

          {/* 4. Important Notice ("Platform & Travel Disclaimers" - 4 Cards + SIH Tourism Safety Initiative) */}
          <PlatformDisclaimers />
        </main>
      )}

      {/* VIEW 2: USER DASHBOARD */}
      {currentView === 'user-dashboard' && (
        <main className="flex-1 animate-in fade-in">
          <UserDashboard 
            destinations={destinations}
            onSelectPlace={(place) => setSelectedPlace(place)}
            setCurrentView={setCurrentView}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            openWishlistModal={() => setIsWishlistOpen(true)}
          />
        </main>
      )}

      {/* VIEW 3: ADMIN DASHBOARD */}
      {currentView === 'admin-dashboard' && (
        <main className="flex-1 animate-in fade-in">
          <AdminDashboard 
            destinations={destinations}
            onDestinationsChange={setDestinations}
            setCurrentView={setCurrentView}
          />
        </main>
      )}

      {/* Footer */}
      <Footer setCurrentView={setCurrentView} />

      {/* MODALS */}
      {/* 1. Place Details Modal */}
      <PlaceDetailsModal 
        place={selectedPlace}
        onClose={() => setSelectedPlace(null)}
      />

      {/* 2. Authentication Modal */}
      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
        onSuccessView={(view) => setCurrentView(view)}
      />

      {/* 3. Favorites / Wishlist Modal */}
      <FavoritesModal 
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        destinations={destinations}
        onSelectPlace={(place) => setSelectedPlace(place)}
      />
    </div>
  );
}
