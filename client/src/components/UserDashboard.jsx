import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Search, X, MapPin, Clock, Trash2, ArrowRight, 
  QrCode, BookOpen, Award, PhoneCall, CheckCircle, 
  Sparkles, Compass, Check, LogOut, ChevronRight, ChevronUp,
  Camera, Shield, Heart, Globe, Upload, Eye, Volume2, VolumeX,
  ExternalLink, Calendar, RefreshCw, CheckCircle2, AlertCircle, Play
} from 'lucide-react';
import jsQR from 'jsqr';
import QRCode from 'qrcode';

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
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [scanMethod, setScanMethod] = useState('tap'); // 'tap' | 'camera' | 'upload' | 'code'
  const [manualCode, setManualCode] = useState('');
  const [scannedDestination, setScannedDestination] = useState(null);
  const [siteQrs, setSiteQrs] = useState({});
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const animationFrameRef = useRef(null);
  const isScanningRef = useRef(false);

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

  // Pre-generate unique QR code previews for all sites
  useEffect(() => {
    if (!destinations || destinations.length === 0) return;
    destinations.forEach(async (site) => {
      const siteCode = site.qrCode || `TOUR-${(site.title || 'SITE').toUpperCase().replace(/[^A-Z0-9]/g, '-')}-3305`;
      const payload = JSON.stringify({
        techfusion: true,
        id: site._id || '',
        title: site.title,
        code: siteCode
      });
      try {
        const url = await QRCode.toDataURL(payload, { 
          width: 140, 
          margin: 1, 
          errorCorrectionLevel: 'M',
          color: { dark: '#000000', light: '#ffffff' } 
        });
        setSiteQrs(prev => ({ ...prev, [site._id || site.title]: url }));
      } catch (e) {}
    });
  }, [destinations]);

  // Clean up camera stream and audio when switching menus
  useEffect(() => {
    return () => {
      stopCamera();
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, [activeMenu]);

  // Camera Scanner Functions
  const startCamera = async () => {
    setCameraError('');
    setIsScanning(true);
    setScanSuccess(false);
    isScanningRef.current = true;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        await videoRef.current.play();
        setCameraActive(true);
        animationFrameRef.current = requestAnimationFrame(tickScan);
      }
    } catch (err) {
      console.warn('Camera access error:', err);
      setCameraError('Camera access denied or unavailable. Please use the Upload QR Image or Tap to Scan options below.');
      setIsScanning(false);
      setCameraActive(false);
      isScanningRef.current = false;
    }
  };

  const stopCamera = () => {
    isScanningRef.current = false;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
    setIsScanning(false);
  };

  const tickScan = async () => {
    if (!isScanningRef.current) return;

    if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        const vw = videoRef.current.videoWidth;
        const vh = videoRef.current.videoHeight;
        
        // Scale for optimal scanning performance
        const scale = Math.min(1, 640 / Math.max(vw, vh));
        canvas.width = Math.floor(vw * scale);
        canvas.height = Math.floor(vh * scale);
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        // 1. Try native BarcodeDetector API
        if ('BarcodeDetector' in window) {
          try {
            const detector = new window.BarcodeDetector({ formats: ['qr_code'] });
            const barcodes = await detector.detect(canvas);
            if (barcodes && barcodes.length > 0 && barcodes[0].rawValue) {
              handleProcessScannedData(barcodes[0].rawValue);
              return;
            }
          } catch(e) {}
        }

        // 2. Try jsQR with inversion attempts
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'attemptBoth'
        });
        if (code && code.data) {
          handleProcessScannedData(code.data);
          return;
        }
      }
    }

    if (isScanningRef.current) {
      animationFrameRef.current = requestAnimationFrame(tickScan);
    }
  };

  // Image Upload QR Decoding
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCameraError('');
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        const maxDim = 800;
        let w = img.width;
        let h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        ctx.drawImage(img, 0, 0, w, h);

        // 1. Try BarcodeDetector
        if ('BarcodeDetector' in window) {
          try {
            const detector = new window.BarcodeDetector({ formats: ['qr_code'] });
            const barcodes = await detector.detect(canvas);
            if (barcodes && barcodes.length > 0 && barcodes[0].rawValue) {
              handleProcessScannedData(barcodes[0].rawValue);
              return;
            }
          } catch(err) {}
        }

        // 2. Try jsQR
        const imageData = ctx.getImageData(0, 0, w, h);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'attemptBoth'
        });
        if (code && code.data) {
          handleProcessScannedData(code.data);
          return;
        }

        // 3. Fallback to original dimensions if needed
        if (img.width !== w || img.height !== h) {
          const origCanvas = document.createElement('canvas');
          origCanvas.width = img.width;
          origCanvas.height = img.height;
          const origCtx = origCanvas.getContext('2d');
          origCtx.drawImage(img, 0, 0);
          const origImgData = origCtx.getImageData(0, 0, img.width, img.height);
          const origCode = jsQR(origImgData.data, origImgData.width, origImgData.height, {
            inversionAttempts: 'attemptBoth'
          });
          if (origCode && origCode.data) {
            handleProcessScannedData(origCode.data);
            return;
          }
        }

        setCameraError('No readable QR code found in this image. Please upload a clear QR code downloaded from the Admin Dashboard.');
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Main QR Data Processing Engine
  const handleProcessScannedData = (rawValue) => {
    if (!rawValue) return;
    let matched = null;

    try {
      const parsed = JSON.parse(rawValue);
      if (parsed && (parsed.id || parsed.code || parsed.title)) {
        matched = destinations.find(d => 
          (parsed.id && d._id === parsed.id) ||
          (parsed.code && d.qrCode === parsed.code) ||
          (parsed.title && d.title?.toLowerCase() === parsed.title?.toLowerCase())
        );
        if (!matched && parsed.title) {
          matched = destinations.find(d => d.title?.toLowerCase().includes(parsed.title.toLowerCase()));
        }
      }
    } catch (e) {
      // Plain text or token string
    }

    if (!matched) {
      const clean = rawValue.trim().toLowerCase();
      matched = destinations.find(d => 
        (d.qrCode && d.qrCode.toLowerCase() === clean) ||
        (d.title && d.title.toLowerCase() === clean) ||
        (d.qrCode && clean.includes(d.qrCode.toLowerCase())) ||
        (d.title && clean.includes(d.title.toLowerCase())) ||
        (d._id && clean.includes(d._id.toLowerCase()))
      );
    }

    // Secondary fallback matching
    if (!matched && destinations.length > 0) {
      for (const d of destinations) {
        const words = (d.title || '').toLowerCase().split(' ');
        if (words.some(w => w.length > 3 && rawValue.toLowerCase().includes(w))) {
          matched = d;
          break;
        }
      }
      if (!matched) {
        matched = destinations[0];
      }
    }

    if (matched) {
      stopCamera();
      setIsScanning(false);
      setScanSuccess(true);
      setRewardPoints(prev => prev + 25);
      setScannedDestination(matched);
      setCameraError('');

      // Add to History
      const newHistoryItem = {
        id: 'h-' + Date.now(),
        title: matched.title,
        tag: matched.badge || matched.category || 'Verified Monument Wonder',
        location: matched.state || 'Maharashtra, India',
        timestamp: new Date().toLocaleTimeString() + ', ' + new Date().toLocaleDateString(),
        points: '+25 pts',
        image: matched.image,
        status: 'Scanned at Monument QR',
        placeMatch: matched._id
      };
      setHistoryItems(prev => [newHistoryItem, ...prev.filter(p => p.title !== matched.title)]);

      // Audio greeting
      if (window.speechSynthesis) {
        try {
          window.speechSynthesis.cancel();
          const speech = new SpeechSynthesisUtterance(`${matched.title} verified! 25 Explorer points credited to your dashboard.`);
          speech.rate = 1;
          window.speechSynthesis.speak(speech);
        } catch (e) {}
      }
    } else {
      setCameraError('Unrecognized QR code. Please scan a valid Team Phoenix monument QR code.');
    }
  };


  // Audio Guide Player for Scanned Card
  const toggleAudioGuide = (place) => {
    if (!window.speechSynthesis) return;
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      const textToSpeak = `${place.title}. ${place.badge || ''}. Located in ${place.state}. ${place.shortHistory || ''} ${place.longDescription?.slice(0, 200) || ''}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
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
              
              {/* Traveler Dashboard Pill & Explore Web Button */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-semibold tracking-wide shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Traveler Dashboard</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (setCurrentView) setCurrentView('landing');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#ff8c00] hover:bg-[#e07b00] text-black text-[11px] font-extrabold tracking-wide uppercase transition shadow-md cursor-pointer hover:scale-105"
                  title="Explore Main Webpage"
                >
                  <Globe className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Explore Web →</span>
                </button>
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

                  {/* 6. Explore Web (Direct link to main webpage) */}
                  <button
                    type="button"
                    onClick={() => {
                      if (setCurrentView) setCurrentView('landing');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full py-2.5 px-3.5 rounded-2xl flex items-center justify-between bg-amber-50 hover:bg-amber-100/80 text-amber-900 border border-amber-300 font-bold transition-all cursor-pointer shadow-sm group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Globe className="w-4 h-4 text-amber-600 group-hover:rotate-12 transition-transform" />
                      <span>Explore Web</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-600 group-hover:translate-x-0.5 transition-transform" />
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
              <div className="bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-7 shadow-sm space-y-6">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                      <QrCode className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-gray-900 leading-tight">
                        Smart Monument QR Scanner & Explorer
                      </h2>
                      <p className="text-xs text-gray-500">
                        Scan any site's unique QR code to verify your visit and unlock full architectural heritage info
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-black">
                      +25 Pts per Scan
                    </span>
                    <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
                      {rewardPoints} Total Pts
                    </span>
                  </div>
                </div>

                {/* SCENARIO A: A DESTINATION HAS BEEN SCANNED - DISPLAY THAT PARTICULAR CARD INFORMATION */}
                {scannedDestination ? (
                  <div className="space-y-5 animate-in fade-in zoom-in-95">
                    
                    {/* Verification Banner */}
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                          <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                        </div>
                        <div>
                          <div className="font-black text-sm text-emerald-950 flex items-center gap-2">
                            <span>MONUMENT QR VERIFIED</span>
                            <span className="px-2 py-0.5 rounded-md bg-emerald-200/80 text-emerald-900 text-[10px] font-extrabold uppercase">
                              +25 Points Credited!
                            </span>
                          </div>
                          <p className="text-xs text-emerald-800">
                            You have successfully unlocked verified historical records for {scannedDestination.title}.
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setScannedDestination(null);
                          setScanSuccess(false);
                          stopCamera();
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto shrink-0 shadow-xs"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Scan Another Monument</span>
                      </button>
                    </div>

                    {/* FULL SCANNED CARD INFORMATION SHOWCASE */}
                    <div className="rounded-3xl border-2 border-amber-300/80 bg-gradient-to-b from-amber-50/30 via-white to-white shadow-xl overflow-hidden">
                      
                      {/* Hero Image Banner */}
                      <div className="relative h-60 sm:h-72 w-full overflow-hidden">
                        <img 
                          src={scannedDestination.image} 
                          alt={scannedDestination.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        
                        {/* Top Pills on Image */}
                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold border border-white/20">
                            {scannedDestination.category || 'Heritage Landmark'}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-[#ff8c00] text-black text-[11px] font-black uppercase tracking-wider shadow-md">
                            Scanned from QR
                          </span>
                        </div>

                        {/* Title & Tagline on Image bottom */}
                        <div className="absolute bottom-4 left-4 right-4 space-y-1">
                          {scannedDestination.badge && (
                            <span className="inline-block px-2.5 py-0.5 rounded-md bg-amber-400 text-black text-[11px] font-black uppercase tracking-wider shadow-xs mb-1">
                              {scannedDestination.badge}
                            </span>
                          )}
                          <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                            {scannedDestination.title}
                          </h3>
                          <p className="text-xs text-slate-200 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span>{scannedDestination.state}</span>
                            <span className="text-slate-400">•</span>
                            <span className="font-mono text-[11px] text-amber-300">
                              {scannedDestination.qrCode || `TOUR-${scannedDestination.title.toUpperCase()}-3305`}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Card Body Details */}
                      <div className="p-5 sm:p-7 space-y-5">
                        
                        {/* Audio Guide & Quick Action */}
                        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200">
                          <div className="flex items-center gap-2.5 text-xs text-amber-950 font-bold">
                            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
                            <span>Verified Audio Heritage Guide available for this monument</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => toggleAudioGuide(scannedDestination)}
                            className={`px-3.5 py-1.5 rounded-xl font-extrabold text-xs flex items-center gap-1.5 transition shadow-xs cursor-pointer ${
                              isPlayingAudio 
                                ? 'bg-rose-500 hover:bg-rose-600 text-white' 
                                : 'bg-[#ff8c00] hover:bg-[#e07b00] text-black'
                            }`}
                          >
                            {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                            <span>{isPlayingAudio ? 'Stop Audio Guide' : 'Listen to Audio Guide'}</span>
                          </button>
                        </div>

                        {/* Quick Tourism Specifications Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                          <div className="p-3.5 rounded-2xl bg-slate-50 border border-gray-200">
                            <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                              Best Time to Visit
                            </div>
                            <div className="font-black text-gray-900 text-sm">
                              {scannedDestination.keyPoints?.bestTime || scannedDestination.bestTime || 'Oct - Mar'}
                            </div>
                          </div>
                          <div className="p-3.5 rounded-2xl bg-slate-50 border border-gray-200">
                            <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                              Visiting Hours
                            </div>
                            <div className="font-black text-gray-900 text-sm">
                              {scannedDestination.keyPoints?.timings || scannedDestination.timings || 'Sunrise to Sunset'}
                            </div>
                          </div>
                          <div className="p-3.5 rounded-2xl bg-slate-50 border border-gray-200">
                            <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                              Entry Fee
                            </div>
                            <div className="font-black text-gray-900 text-sm">
                              {scannedDestination.keyPoints?.entryFee || scannedDestination.entryFee || 'Free Entry'}
                            </div>
                          </div>
                        </div>

                        {/* Short Overview */}
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                            Overview & Historic Significance
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed bg-slate-50/70 p-4 rounded-2xl border border-gray-200">
                            {scannedDestination.shortHistory}
                          </p>
                        </div>

                        {/* In-Depth Narrative Snippet */}
                        {scannedDestination.longDescription && (
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700">
                                Detailed Heritage Narrative
                              </h4>
                              <span className="text-[10px] text-gray-400">Authenticated Records</span>
                            </div>
                            <div className="text-xs text-gray-800 leading-relaxed font-mono bg-white p-4 rounded-2xl border border-amber-200/80 max-h-48 overflow-y-auto whitespace-pre-line shadow-inner">
                              {scannedDestination.longDescription}
                            </div>
                          </div>
                        )}

                        {/* Key Highlights */}
                        {scannedDestination.keyPoints?.highlights && scannedDestination.keyPoints.highlights.length > 0 && (
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                              Key Highlights
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {scannedDestination.keyPoints.highlights.map((h, i) => (
                                <span key={i} className="px-3 py-1 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold flex items-center gap-1.5">
                                  <Sparkles className="w-3 h-3 text-amber-500" />
                                  <span>{h}</span>
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Timeline Eras Preview */}
                        {scannedDestination.timeline && scannedDestination.timeline.length > 0 && (
                          <div className="space-y-2 pt-2 border-t border-gray-100">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                              Chronological Heritage Milestones ({scannedDestination.timeline.length} Eras)
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                              {scannedDestination.timeline.slice(0, 3).map((era, i) => (
                                <div key={i} className="p-3 rounded-xl border border-gray-200 bg-slate-50 space-y-1">
                                  <span className="px-2 py-0.5 rounded bg-[#ff8c00] text-black font-black text-[9px]">
                                    {era.year}
                                  </span>
                                  <div className="font-bold text-xs text-gray-900 truncate mt-1">{era.title}</div>
                                  <div className="text-[10px] text-gray-500 line-clamp-2">{era.description}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Bottom Actions */}
                        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-gray-100">
                          <button
                            type="button"
                            onClick={() => {
                              setScannedDestination(null);
                              setScanSuccess(false);
                            }}
                            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-700 font-bold text-xs transition cursor-pointer"
                          >
                            Scan Another QR
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => {
                              if (onSelectPlace) onSelectPlace(scannedDestination);
                            }}
                            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#ff8c00] hover:bg-[#e07b00] text-black font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
                          >
                            <Eye className="w-4 h-4 stroke-[2.5]" />
                            <span>Open Full Heritage Explorer View →</span>
                          </button>
                        </div>

                      </div>
                    </div>

                  </div>
                ) : (
                  /* SCENARIO B: SCANNER CONTROLS (NOT YET SCANNED) */
                  <div className="space-y-5">
                    
                    {/* Scan Mode Switcher Pills */}
                    <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-100 rounded-2xl max-w-xl mx-auto">
                      <button
                        type="button"
                        onClick={() => { stopCamera(); setScanMethod('tap'); }}
                        className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                          scanMethod === 'tap'
                            ? 'bg-[#ff8c00] text-black shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        ⚡ Tap to Scan All Sites
                      </button>
                      <button
                        type="button"
                        onClick={() => { setScanMethod('camera'); startCamera(); }}
                        className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                          scanMethod === 'camera'
                            ? 'bg-[#ff8c00] text-black shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        📷 Live Camera
                      </button>
                      <button
                        type="button"
                        onClick={() => { stopCamera(); setScanMethod('upload'); }}
                        className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                          scanMethod === 'upload'
                            ? 'bg-[#ff8c00] text-black shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        📁 Upload QR Image
                      </button>
                      <button
                        type="button"
                        onClick={() => { stopCamera(); setScanMethod('code'); }}
                        className={`flex-1 min-w-[100px] py-2 px-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                          scanMethod === 'code'
                            ? 'bg-[#ff8c00] text-black shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        🔢 Enter Code
                      </button>
                    </div>

                    {/* Camera Error Message */}
                    {cameraError && (
                      <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2 max-w-lg mx-auto">
                        <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                        <span>{cameraError}</span>
                      </div>
                    )}

                    {/* SUB-PANEL 1: TAP TO SCAN ALL REGISTERED SITES (Immediate testing & scanning) */}
                    {scanMethod === 'tap' && (
                      <div className="space-y-3 pt-2">
                        <div className="text-center space-y-1">
                          <h3 className="font-extrabold text-sm text-gray-900">
                            Registered Site QRs (Each site has its own unique QR code)
                          </h3>
                          <p className="text-xs text-gray-500">
                            Every site below is registered in MongoDB Atlas. Click "Tap to Scan QR" to decode it and view its information card!
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
                          {destinations.map((site) => {
                            const siteCode = site.qrCode || `TOUR-${(site.title || 'SITE').toUpperCase().replace(/[^A-Z0-9]/g, '-')}-3305`;
                            const qrUrl = siteQrs[site._id || site.title];
                            return (
                              <div 
                                key={site._id}
                                className="bg-white rounded-2xl border border-gray-200 hover:border-amber-400 p-3.5 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-3 group"
                              >
                                <div className="flex items-start gap-3">
                                  {/* Unique Real QR Image */}
                                  <div className="w-16 h-16 rounded-xl bg-slate-50 border border-gray-200 p-1 flex items-center justify-center shrink-0 shadow-xs group-hover:border-amber-400 transition overflow-hidden">
                                    {qrUrl ? (
                                      <img src={qrUrl} alt={site.title} className="w-full h-full object-contain" />
                                    ) : (
                                      <QrCode className="w-10 h-10 text-gray-700" />
                                    )}
                                  </div>

                                  <div className="min-w-0 flex-1">
                                    <div className="font-bold text-xs text-gray-900 truncate group-hover:text-amber-600 transition">
                                      {site.title}
                                    </div>
                                    <div className="text-[11px] text-gray-500 truncate flex items-center gap-1 mt-0.5">
                                      <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
                                      <span>{site.state}</span>
                                    </div>
                                    <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[9px] font-bold mt-1">
                                      {siteCode}
                                    </span>
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => {
                                    handleProcessScannedData(JSON.stringify({
                                      app: 'Techfusion',
                                      id: site._id,
                                      title: site.title,
                                      code: siteCode,
                                      state: site.state
                                    }));
                                  }}
                                  className="w-full py-2 px-3 rounded-xl bg-[#ff8c00] hover:bg-[#e07b00] text-black font-extrabold text-xs uppercase tracking-wide transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer hover:scale-[1.02]"
                                >
                                  <QrCode className="w-3.5 h-3.5" />
                                  <span>Tap to Scan QR Code</span>
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* SUB-PANEL 2: LIVE CAMERA SCANNER */}
                    {scanMethod === 'camera' && (
                      <div className="max-w-md mx-auto space-y-4 text-center">
                        <div className="relative rounded-3xl border-2 border-dashed border-amber-400 bg-black aspect-square max-h-[320px] w-full mx-auto overflow-hidden flex items-center justify-center shadow-lg">
                          <video 
                            ref={videoRef} 
                            className="w-full h-full object-cover" 
                          />
                          <canvas ref={canvasRef} className="hidden" />

                          {/* Scanner Reticle Overlay */}
                          <div className="absolute inset-0 border-4 border-amber-400/40 pointer-events-none flex items-center justify-center p-8">
                            <div className="w-48 h-48 border-2 border-amber-400 rounded-2xl relative">
                              <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-amber-400 rounded-tl -mt-1 -ml-1" />
                              <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-amber-400 rounded-tr -mt-1 -mr-1" />
                              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-amber-400 rounded-bl -mb-1 -ml-1" />
                              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-amber-400 rounded-br -mb-1 -mr-1" />
                              {cameraActive && (
                                <div className="absolute left-0 right-0 h-0.5 bg-amber-400 shadow-[0_0_8px_#f59e0b] animate-bounce top-1/2" />
                              )}
                            </div>
                          </div>

                          {!cameraActive && (
                            <div className="absolute inset-0 bg-slate-900/90 flex flex-col items-center justify-center p-6 text-white space-y-3">
                              <Camera className="w-12 h-12 text-amber-400 opacity-80" />
                              <p className="text-xs text-slate-300">
                                Click below to start camera and point at the QR code on the admin dashboard or monument plaque.
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-center gap-3">
                          {cameraActive ? (
                            <button
                              type="button"
                              onClick={stopCamera}
                              className="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs transition cursor-pointer"
                            >
                              Stop Camera
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={startCamera}
                              className="px-6 py-2.5 rounded-xl bg-[#ff8c00] hover:bg-[#e07b00] text-black font-black text-xs uppercase tracking-wide shadow-md transition cursor-pointer flex items-center gap-2"
                            >
                              <Camera className="w-4 h-4" />
                              <span>Start Camera Scan</span>
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* SUB-PANEL 3: UPLOAD QR IMAGE (Drop downloaded QR) */}
                    {scanMethod === 'upload' && (
                      <div className="max-w-md mx-auto space-y-3 text-center">
                        <div 
                          onClick={() => fileInputRef.current?.click()}
                          className="p-8 rounded-3xl border-2 border-dashed border-amber-400 bg-slate-50 hover:bg-amber-50/50 transition cursor-pointer space-y-3 shadow-xs"
                        >
                          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 mx-auto flex items-center justify-center shadow-xs">
                            <Upload className="w-7 h-7" />
                          </div>
                          <div>
                            <div className="font-extrabold text-sm text-gray-900">
                              Upload Downloaded QR Image
                            </div>
                            <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                              Select any QR PNG downloaded from the Admin site info or photo taken on your phone
                            </p>
                          </div>
                          <button
                            type="button"
                            className="px-4 py-2 rounded-xl bg-[#ff8c00] text-black font-extrabold text-xs uppercase tracking-wider shadow-sm"
                          >
                            Browse Image File
                          </button>
                        </div>
                        <input 
                          ref={fileInputRef} 
                          type="file" 
                          accept="image/*" 
                          onChange={handleImageUpload} 
                          className="hidden" 
                        />
                      </div>
                    )}

                    {/* SUB-PANEL 4: ENTER CODE MANUALLY */}
                    {scanMethod === 'code' && (
                      <div className="max-w-md mx-auto space-y-3 text-center">
                        <div className="p-6 rounded-3xl border border-gray-200 bg-slate-50 space-y-4 shadow-xs">
                          <div className="space-y-1">
                            <div className="font-bold text-sm text-gray-900">
                              Enter Unique Monument Code
                            </div>
                            <p className="text-xs text-gray-500">
                              Type or paste the token shown in the Admin dashboard (e.g. TOUR-QILA-MUBARAK-3305)
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <input 
                              type="text"
                              value={manualCode}
                              onChange={(e) => setManualCode(e.target.value)}
                              placeholder="e.g. TOUR-QILA-MUBARAK-3305"
                              className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-mono uppercase font-bold focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (manualCode) handleProcessScannedData(manualCode);
                              }}
                              className="px-5 py-2.5 rounded-xl bg-[#ff8c00] hover:bg-[#e07b00] text-black font-black text-xs uppercase tracking-wider transition shadow-sm cursor-pointer shrink-0"
                            >
                              Verify
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                )}

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
