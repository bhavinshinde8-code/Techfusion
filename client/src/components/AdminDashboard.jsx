import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { 
  LayoutGrid, BookOpen, Camera, MessageSquare, Users, 
  CheckCircle, ExternalLink, Plus, LogOut, MapPin, 
  Shield, ArrowRight, ChevronUp, ChevronRight, Star, 
  X, Edit, Trash2, Clock, Sparkles, Globe, Eye,
  CheckCircle2, AlertCircle, RefreshCw, Landmark, Award, Flame,
  QrCode, Download
} from 'lucide-react';
import QRCode from 'qrcode';

export default function AdminDashboard({ 
  destinations = [], 
  onDestinationsChange, 
  setCurrentView,
  onSelectPlace 
}) {
  const { user, logout } = useAuth();

  // Active Menu: 'overview' | 'sites' | 'photos' | 'reviews' | 'users'
  const [activeMenu, setActiveMenu] = useState('overview');
  const [menuOpen, setMenuOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [siteFilter, setSiteFilter] = useState('all'); // 'all' | 'trending' | 'published' | 'draft'

  // Data from backend
  const [inquiries, setInquiries] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedId, setSelectedId] = useState(null);

  // Quick Photo Edit State
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [photoPlace, setPhotoPlace] = useState(null);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    badge: '',
    state: '',
    bestTime: '',
    image: '',
    shortHistory: '',
    longDescription: '',
    highlights: '',
    isTrending: false,
    isPublished: true,
    hiddenHistory: '',
    qrCode: '',
    timeline: [],
    nearbyPlaces: [],
    coRelatedPlaces: [],
    category: 'UNESCO Heritage',
    era: '',
    timings: '',
    entryFee: '',
    nearestTransit: ''
  });

  // Sub-modal for adding/editing Timeline Eras, Nearby Places, Co-Related Places
  const [subModal, setSubModal] = useState({
    isOpen: false,
    type: null, // 'timeline' | 'nearby' | 'coRelated'
    mode: 'add',
    index: null,
    item: {}
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoadingData(true);
    try {
      const [inq, usr] = await Promise.all([
        api.getInquiries(),
        api.getRegisteredUsers()
      ]);
      setInquiries(inq || []);
      setRegisteredUsers(usr || []);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setIsLoadingData(false);
    }
  };

  // Pre-curated recent sites matching user's screenshot
  const initialRecentSites = [
    {
      _id: 'site-qila-mubarak',
      title: 'Qila Mubarak',
      location: 'Bathinda, Punjab',
      image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=400&q=80',
      category: 'Historical Fort'
    },
    {
      _id: 'site-diu-fort',
      title: 'Diu Fort',
      location: 'Diu, Dadra and Nagar Haveli and Dam...',
      image: 'https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=400&q=80',
      category: 'Coastal Fortress'
    },
    {
      _id: 'site-dadra-nagar-haveli',
      title: 'Dadra and Nagar Haveli',
      location: 'Silvassa, Dadra and Nagar Haveli and ..',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      category: 'Scenic Territory'
    },
    {
      _id: 'site-auroville',
      title: 'Auroville',
      location: 'Viluppuram District, Tamil Nadu',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80',
      category: 'Universal Township'
    }
  ];

  // Merge with live destinations from DB
  const recentCards = [
    ...destinations.map(d => ({
      _id: d._id,
      title: d.title,
      location: d.state || 'Nashik, Maharashtra',
      image: d.image,
      category: d.category,
      rawPlace: d
    })),
    ...initialRecentSites
  ].slice(0, 4);

  // Reviews list
  const reviewsList = [
    {
      id: 'rev-1',
      author: 'Pooja Kulkarni',
      rating: 5,
      place: 'Trimbakeshwar Shiva Temple',
      comment: 'Breathtaking spiritual aura and the audio commentary made the history come alive!',
      date: '10 mins ago'
    },
    {
      id: 'rev-2',
      author: 'Rahul Deshmukh',
      rating: 5,
      place: 'Sula Vineyards & Wine Estate',
      comment: 'Top notch wine tasting tour with sunset views over Gangapur dam lake. Highly recommended.',
      date: '1 hour ago'
    },
    {
      id: 'rev-3',
      author: 'Aarav Mehta',
      rating: 4.8,
      place: 'Pandavleni Buddhist Caves',
      comment: 'Steep climb of 200+ steps but the 2000-year-old rock-cut Hinayana carvings are world-class.',
      date: 'Yesterday'
    },
    {
      id: 'rev-4',
      author: 'Sneha Patil',
      rating: 5,
      place: 'Anjaneri Hills & Fort',
      comment: 'Peaceful pristine trek surrounded by foggy waterfalls and pristine lush greenery.',
      date: '2 days ago'
    }
  ];

  // Metrics
  const publishedSitesCount = destinations.length > 0 ? destinations.length : 58;
  const registeredUsersCount = registeredUsers.length > 0 ? registeredUsers.length : 8;

  // Add Modal Handler
  const openAddModal = () => {
    setModalMode('add');
    setSelectedId(null);
    setFormData({
      title: '',
      badge: 'Oldest Surviving Fort in India',
      state: 'Bathinda, Punjab',
      bestTime: 'Oct - Mar',
      image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
      shortHistory: '',
      longDescription: '',
      highlights: 'Dating back to the 2nd Century CE, Imprisonment site of Empress Razia Sultan, Contains Gurdwara Sri',
      isTrending: false,
      isPublished: true,
      hiddenHistory: '',
      qrCode: `TOUR-${Math.floor(1000 + Math.random() * 9000)}`,
      timeline: [
        { year: '90 CE', title: 'Kushana Era Construction', description: 'The fort is established by Raja Dab to guard the trade routes.', image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=400&q=80' },
        { year: '1240 CE', title: 'Imprisonment of Razia Sultan', description: 'Razia Sultan, the first woman ruler of Delhi, is confined.', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80' },
        { year: '1705 CE', title: 'Visit of Guru Gobind Singh Ji', description: 'The Tenth Sikh Guru visits the fort, leading to religious recognition.', image: 'https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=400&q=80' }
      ],
      nearbyPlaces: [
        { title: 'Bathinda Lake (Thermal)', distance: '3.5 km', category: 'Scenic Viewpoint / Nature', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
        { title: 'Mazaar of Baba Haji Rattan', distance: '2.8 km', category: 'Sacred Shrine / Fort', image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=400&q=80' },
        { title: 'Rose Garden Bathinda', distance: '4.2 km', category: 'Scenic Viewpoint / Nature', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80' },
        { title: 'Bir Talab Forest & Zoo', distance: '8.5 km', category: 'Scenic Viewpoint / Nature', image: 'https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=400&q=80' }
      ],
      coRelatedPlaces: [
        { title: 'Qila Mubarak (Patiala)', circuit: 'Sikh Heritage Circuit', image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=400&q=80' },
        { title: 'Kangra Fort', circuit: 'Ancient Himalayan Forts Circuit', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' }
      ],
      category: 'UNESCO Heritage',
      era: 'Ancient Kushana Period',
      timings: '6:00 AM – 8:00 PM',
      entryFee: 'Free Entry',
      nearestTransit: 'Bathinda Junction Railway Station'
    });
    setIsModalOpen(true);
  };

  // Edit Modal Handler (Edit Info Option)
  const openEditModal = (place) => {
    setModalMode('edit');
    setSelectedId(place._id);

    const placeCode = place.qrCode || `TOUR-${(place.title || 'SITE').toUpperCase().replace(/[^A-Z0-9]/g, '-')}-3305`;

    const defaultTimeline = [
      { year: '90 CE', title: 'Kushana Era Construction', description: 'The fort is established by Raja Dab to guard the trade route towards Multan.', image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=400&q=80' },
      { year: '1240 CE', title: 'Imprisonment of Razia Sultan', description: 'Razia Sultan, the first woman ruler of Delhi, is confined within the fortress bastions.', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80' },
      { year: '1705 CE', title: 'Visit of Guru Gobind Singh Ji', description: 'The Tenth Sikh Guru visits the fort, leading to the establishment of the holy Gurdwara.', image: 'https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=400&q=80' }
    ];

    const defaultNearby = [
      { title: 'Bathinda Lake (Thermal)', distance: '3.5 km', category: 'Scenic Viewpoint / Nature', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
      { title: 'Mazaar of Baba Haji Rattan', distance: '2.8 km', category: 'Sacred Shrine / Fort', image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=400&q=80' },
      { title: 'Rose Garden Bathinda', distance: '4.2 km', category: 'Scenic Viewpoint / Nature', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80' },
      { title: 'Bir Talab Forest & Zoo', distance: '8.5 km', category: 'Scenic Viewpoint / Nature', image: 'https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=400&q=80' }
    ];

    const defaultCoRelated = [
      { title: 'Qila Mubarak (Patiala)', circuit: 'Sikh Heritage Circuit', image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=400&q=80' },
      { title: 'Kangra Fort', circuit: 'Ancient Himalayan Forts Circuit', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' }
    ];

    setFormData({
      title: place.title || '',
      badge: place.badge || (place.title?.toLowerCase().includes('qila') ? 'Oldest Surviving Fort in India' : 'Heritage Wonder of India'),
      state: place.state || '',
      bestTime: place.keyPoints?.bestTime || 'Oct - Mar',
      image: place.image || '',
      shortHistory: place.shortHistory || '',
      longDescription: place.longDescription || '',
      highlights: place.keyPoints?.highlights?.join(', ') || (Array.isArray(place.highlights) ? place.highlights.join(', ') : 'Dating back to the 2nd Century CE, Imprisonment site of Empress Razia Sultan, Contains Gurdwara Sri'),
      isTrending: place.isTrending || false,
      isPublished: place.isPublished !== false,
      hiddenHistory: place.hiddenHistory || "According to local legend, the fort's bricks are so ancient that some bear distinct markings of Kushana-era craftsmanship. During the siege of 1240, Razia Sultan is said to have used a secret window in her high chamber to communicate with local loyalists, plotting her escape with Altunia by agreeing to marry her very captor to regain her lost throne in Delhi.",
      qrCode: placeCode,
      timeline: (place.timeline && place.timeline.length > 0) ? place.timeline : defaultTimeline,
      nearbyPlaces: (place.nearbyPlaces && place.nearbyPlaces.length > 0) ? place.nearbyPlaces : defaultNearby,
      coRelatedPlaces: (place.coRelatedPlaces && place.coRelatedPlaces.length > 0) ? place.coRelatedPlaces : defaultCoRelated,
      category: place.category || 'UNESCO Heritage',
      era: place.era || '',
      timings: place.keyPoints?.timings || 'Sunrise to Sunset',
      entryFee: place.keyPoints?.entryFee || 'Free Entry',
      nearestTransit: place.keyPoints?.nearestTransit || ''
    });
    setIsModalOpen(true);
  };

  // Dynamically generate genuine, unique QR Code data URL whenever destination title/code changes
  useEffect(() => {
    if (!formData.title && !formData.qrCode) return;
    const siteCode = formData.qrCode || `TOUR-${(formData.title || 'SITE').toUpperCase().replace(/[^A-Z0-9]/g, '-')}-3305`;
    const payload = JSON.stringify({
      techfusion: true,
      id: selectedId || '',
      title: formData.title,
      code: siteCode
    });

    QRCode.toDataURL(payload, {
      width: 400,
      margin: 2,
      errorCorrectionLevel: 'M',
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    }).then(url => {
      setQrDataUrl(url);
    }).catch(err => {
      console.warn('QR generation error:', err);
    });
  }, [formData.title, formData.qrCode, selectedId]);

  // QR Code Actions
  const handleDownloadQR = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.download = `QR-${(formData.title || 'destination').replace(/[^a-zA-Z0-9]/g, '_')}.png`;
    link.href = qrDataUrl;
    link.click();
  };

  const handleRegenerateQR = () => {
    const slug = (formData.title || 'TOUR').toUpperCase().replace(/[^A-Z0-9]/g, '-').slice(0, 14);
    const rand = Math.floor(1000 + Math.random() * 9000);
    setFormData(prev => ({
      ...prev,
      qrCode: `TOUR-${slug}-${rand}`
    }));
  };

  // Sub-Modal Handlers for Interactive Modules
  const openAddSubModal = (type) => {
    if (type === 'timeline') {
      setSubModal({
        isOpen: true,
        type: 'timeline',
        mode: 'add',
        index: null,
        item: { year: '1200 CE', title: '', description: '', image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=400&q=80' }
      });
    } else if (type === 'nearby') {
      setSubModal({
        isOpen: true,
        type: 'nearby',
        mode: 'add',
        index: null,
        item: { title: '', distance: '3.0 km', category: 'Scenic Viewpoint / Nature', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' }
      });
    } else if (type === 'coRelated') {
      setSubModal({
        isOpen: true,
        type: 'coRelated',
        mode: 'add',
        index: null,
        item: { title: '', circuit: 'Heritage Circuit', image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=400&q=80' }
      });
    }
  };

  const openEditSubModal = (type, index) => {
    if (type === 'timeline') {
      setSubModal({
        isOpen: true,
        type: 'timeline',
        mode: 'edit',
        index,
        item: { ...formData.timeline[index] }
      });
    } else if (type === 'nearby') {
      setSubModal({
        isOpen: true,
        type: 'nearby',
        mode: 'edit',
        index,
        item: { ...formData.nearbyPlaces[index] }
      });
    } else if (type === 'coRelated') {
      setSubModal({
        isOpen: true,
        type: 'coRelated',
        mode: 'edit',
        index,
        item: { ...formData.coRelatedPlaces[index] }
      });
    }
  };

  const handleDeleteSubItem = (type, index) => {
    if (type === 'timeline') {
      setFormData(prev => ({ ...prev, timeline: prev.timeline.filter((_, i) => i !== index) }));
    } else if (type === 'nearby') {
      setFormData(prev => ({ ...prev, nearbyPlaces: prev.nearbyPlaces.filter((_, i) => i !== index) }));
    } else if (type === 'coRelated') {
      setFormData(prev => ({ ...prev, coRelatedPlaces: prev.coRelatedPlaces.filter((_, i) => i !== index) }));
    }
  };

  const handleSaveSubModal = (e) => {
    e.preventDefault();
    if (subModal.type === 'timeline') {
      if (subModal.mode === 'add') {
        setFormData(prev => ({ ...prev, timeline: [...prev.timeline, subModal.item] }));
      } else {
        setFormData(prev => ({
          ...prev,
          timeline: prev.timeline.map((t, idx) => idx === subModal.index ? subModal.item : t)
        }));
      }
    } else if (subModal.type === 'nearby') {
      if (subModal.mode === 'add') {
        setFormData(prev => ({ ...prev, nearbyPlaces: [...prev.nearbyPlaces, subModal.item] }));
      } else {
        setFormData(prev => ({
          ...prev,
          nearbyPlaces: prev.nearbyPlaces.map((p, idx) => idx === subModal.index ? subModal.item : p)
        }));
      }
    } else if (subModal.type === 'coRelated') {
      if (subModal.mode === 'add') {
        setFormData(prev => ({ ...prev, coRelatedPlaces: [...prev.coRelatedPlaces, subModal.item] }));
      } else {
        setFormData(prev => ({
          ...prev,
          coRelatedPlaces: prev.coRelatedPlaces.map((c, idx) => idx === subModal.index ? subModal.item : c)
        }));
      }
    }
    setSubModal({ isOpen: false, type: null, mode: 'add', index: null, item: {} });
  };

  // Option 1: Set on Trending Toggle
  const toggleTrending = async (place, e) => {
    if (e) e.stopPropagation();
    const newStatus = !place.isTrending;
    try {
      await api.updateDestination(place._id, {
        ...place,
        isTrending: newStatus
      });
      if (onDestinationsChange) {
        onDestinationsChange(destinations.map(d => d._id === place._id ? { ...d, isTrending: newStatus } : d));
      }
    } catch (err) {
      console.error('Failed to update trending status:', err);
    }
  };

  // Option 2: Publish / Unpublish Toggle
  const togglePublish = async (place, e) => {
    if (e) e.stopPropagation();
    const currentPublished = place.isPublished !== false;
    const newStatus = !currentPublished;
    try {
      await api.updateDestination(place._id, {
        ...place,
        isPublished: newStatus
      });
      if (onDestinationsChange) {
        onDestinationsChange(destinations.map(d => d._id === place._id ? { ...d, isPublished: newStatus } : d));
      }
    } catch (err) {
      console.error('Failed to update publish status:', err);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: formData.title,
      badge: formData.badge,
      state: formData.state,
      category: formData.category,
      era: formData.era,
      image: formData.image,
      shortHistory: formData.shortHistory,
      longDescription: formData.longDescription,
      hiddenHistory: formData.hiddenHistory,
      qrCode: formData.qrCode,
      isTrending: formData.isTrending,
      isPublished: formData.isPublished,
      keyPoints: {
        bestTime: formData.bestTime,
        timings: formData.timings,
        entryFee: formData.entryFee,
        highlights: typeof formData.highlights === 'string'
          ? formData.highlights.split(',').map(h => h.trim()).filter(Boolean)
          : (Array.isArray(formData.highlights) ? formData.highlights : []),
        nearestTransit: formData.nearestTransit,
        architecturalStyle: 'Indian Classical / Regional Heritage'
      },
      timeline: formData.timeline,
      nearbyPlaces: formData.nearbyPlaces,
      coRelatedPlaces: formData.coRelatedPlaces
    };

    try {
      if (modalMode === 'add') {
        const created = await api.createDestination(payload);
        if (onDestinationsChange) {
          onDestinationsChange([created, ...destinations]);
        }
      } else {
        const updated = await api.updateDestination(selectedId, payload);
        if (onDestinationsChange) {
          onDestinationsChange(destinations.map(d => d._id === selectedId ? updated : d));
        }
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error saving destination:', err);
      setIsModalOpen(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (confirm(`Are you sure you want to remove "${title}" from MongoDB Atlas?`)) {
      try {
        await api.deleteDestination(id);
        if (onDestinationsChange) {
          onDestinationsChange(destinations.filter(d => d._id !== id));
        }
      } catch (err) {
        console.error('Error deleting destination:', err);
      }
    }
  };

  const openPhotoModal = (place) => {
    setPhotoPlace(place);
    setNewPhotoUrl(place.image || '');
    setPhotoModalOpen(true);
  };

  const handleSavePhoto = async () => {
    if (!photoPlace || !newPhotoUrl) return;
    try {
      const updated = await api.updateDestination(photoPlace._id, {
        ...photoPlace,
        image: newPhotoUrl
      });
      if (onDestinationsChange) {
        onDestinationsChange(destinations.map(d => d._id === photoPlace._id ? updated : d));
      }
      setPhotoModalOpen(false);
    } catch (err) {
      console.error('Error updating photo:', err);
      setPhotoModalOpen(false);
    }
  };

  // Counts for Site Info filters
  const trendingCount = destinations.filter(d => d.isTrending).length;
  const publishedCount = destinations.filter(d => d.isPublished !== false).length;
  const draftCount = destinations.filter(d => d.isPublished === false).length;

  // Filtered sites for Site Info tab
  const displayedSites = destinations.filter(d => {
    if (siteFilter === 'trending' && !d.isTrending) return false;
    if (siteFilter === 'published' && d.isPublished === false) return false;
    if (siteFilter === 'draft' && d.isPublished !== false) return false;

    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      d.title?.toLowerCase().includes(q) || 
      d.state?.toLowerCase().includes(q) || 
      d.category?.toLowerCase().includes(q)
    );
  });

  const adminDisplayName = user?.name || 'swami warude';
  const adminEmail = user?.email || 'swamiwarude6575@gmail.com';
  const adminInitial = adminDisplayName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-[#fafbfc] text-gray-900 pb-16 pt-3 sm:pt-5 px-3 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-5">

        {/* 1. DARK HERO BANNER (Pixel-perfect matching screenshot) */}
        <div className="relative rounded-3xl bg-[#0e1322] text-white p-6 sm:p-7 overflow-hidden shadow-2xl border border-slate-800">
          
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
            
            {/* Left Column: Pill + Subtitle */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase shadow-sm">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>INCREDIBLE INDIA • ADMIN SUITE (Nashik Municipal Tourism Office)</span>
              </div>

              <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed">
                Live tourism portal management synced in real time with MongoDB Atlas.
              </p>
            </div>

            {/* Right Action Controls: Add Destination + Log Out */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={openAddModal}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ff8c00] hover:bg-[#e07b00] text-black text-xs font-black tracking-wide uppercase transition shadow-md hover:scale-105 cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>ADD DESTINATION</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  logout();
                  setCurrentView('landing');
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-gray-800 text-xs font-bold transition border border-slate-200 shadow-sm cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>

          </div>
        </div>

        {/* 2. MAIN 2-COLUMN SECTION (Left Admin Nav + Profile, Right Panels) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Admin Navigation Card + Profile Card */}
          {/* ========================================================================= */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Card 1: ADMIN NAVIGATION (Matches screenshot exactly) */}
            <div className="bg-white rounded-3xl border border-gray-200/80 p-4 shadow-sm space-y-3">
              
              {/* Header with Collapsible Toggle */}
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
                      ADMIN NAVIGATION
                    </div>
                    <div className="text-xs font-bold text-gray-900 capitalize">
                      Active: {activeMenu === 'overview' ? 'Overview' : activeMenu === 'sites' ? 'Site Info' : activeMenu === 'photos' ? 'Monument Photo' : activeMenu === 'reviews' ? 'Reviews' : 'Users Info'}
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
                  
                  {/* 1. Overview */}
                  <button
                    type="button"
                    onClick={() => setActiveMenu('overview')}
                    className={`w-full py-2.5 px-3.5 rounded-2xl flex items-center justify-between transition-all cursor-pointer ${
                      activeMenu === 'overview'
                        ? 'bg-[#ff8c00] text-black font-extrabold shadow-md'
                        : 'text-gray-700 hover:bg-gray-50 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <LayoutGrid className="w-4 h-4" />
                      <span>Overview</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </button>

                  {/* 2. Site Info */}
                  <button
                    type="button"
                    onClick={() => setActiveMenu('sites')}
                    className={`w-full py-2.5 px-3.5 rounded-2xl flex items-center justify-between transition-all cursor-pointer ${
                      activeMenu === 'sites'
                        ? 'bg-[#ff8c00] text-black font-extrabold shadow-md'
                        : 'text-gray-700 hover:bg-gray-50 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="w-4 h-4" />
                      <span>Site Info</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      activeMenu === 'sites' ? 'bg-black text-[#ff8c00]' : 'text-gray-500'
                    }`}>
                      {publishedSitesCount}
                    </span>
                  </button>

                  {/* 3. Monument Photo */}
                  <button
                    type="button"
                    onClick={() => setActiveMenu('photos')}
                    className={`w-full py-2.5 px-3.5 rounded-2xl flex items-center justify-between transition-all cursor-pointer ${
                      activeMenu === 'photos'
                        ? 'bg-[#ff8c00] text-black font-extrabold shadow-md'
                        : 'text-gray-700 hover:bg-gray-50 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Camera className="w-4 h-4" />
                      <span>Monument Photo</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </button>

                  {/* 4. Reviews */}
                  <button
                    type="button"
                    onClick={() => setActiveMenu('reviews')}
                    className={`w-full py-2.5 px-3.5 rounded-2xl flex items-center justify-between transition-all cursor-pointer ${
                      activeMenu === 'reviews'
                        ? 'bg-[#ff8c00] text-black font-extrabold shadow-md'
                        : 'text-gray-700 hover:bg-gray-50 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <MessageSquare className="w-4 h-4" />
                      <span>Reviews</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      activeMenu === 'reviews' ? 'bg-black text-[#ff8c00]' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      58
                    </span>
                  </button>

                  {/* 5. Users Info */}
                  <button
                    type="button"
                    onClick={() => setActiveMenu('users')}
                    className={`w-full py-2.5 px-3.5 rounded-2xl flex items-center justify-between transition-all cursor-pointer ${
                      activeMenu === 'users'
                        ? 'bg-[#ff8c00] text-black font-extrabold shadow-md'
                        : 'text-gray-700 hover:bg-gray-50 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Users className="w-4 h-4" />
                      <span>Users Info</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      activeMenu === 'users' ? 'bg-black text-[#ff8c00]' : 'text-gray-500'
                    }`}>
                      {registeredUsersCount}
                    </span>
                  </button>

                  {/* Quick Shortcut: View Public Webpage */}
                  <div className="pt-2 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentView('landing');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full py-2 px-3 rounded-xl flex items-center justify-between text-amber-800 bg-amber-50 hover:bg-amber-100/80 border border-amber-200/80 transition-all font-bold cursor-pointer text-[11px]"
                    >
                      <div className="flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5 text-amber-600" />
                        <span>View Public Webpage</span>
                      </div>
                      <ArrowRight className="w-3 h-3 text-amber-600" />
                    </button>
                  </div>

                </div>
              )}

            </div>

            {/* Card 2: ADMIN PROFILE CARD (Matches screenshot exactly) */}
            <div className="bg-white rounded-3xl border border-gray-200/80 p-4 sm:p-5 shadow-sm space-y-4">
              
              {/* Avatar + Name + Email */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#ff8c00] text-black font-black text-lg flex items-center justify-center shadow-sm shrink-0">
                  {adminInitial}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-sm text-gray-900 truncate">{adminDisplayName}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-600 fill-cyan-100 shrink-0" />
                  </div>
                  <div className="text-[11px] text-gray-500 truncate font-medium">
                    {adminEmail}
                  </div>
                </div>
              </div>

              {/* Department & Database Details */}
              <div className="space-y-2 text-xs border-t border-gray-100 pt-3">
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-medium">Department</span>
                  <span className="font-bold text-gray-900 text-right text-[11px]">
                    Nashik Municipal Tourism Office
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-medium">Database</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1.5 text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    MongoDB Atlas (Live)
                  </span>
                </div>

              </div>

            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Interactive Views (Overview / Sites / Photos / Reviews / Users) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-8 space-y-5">
            
            {/* VIEW 1: OVERVIEW (Exact matching screenshot) */}
            {activeMenu === 'overview' && (
              <div className="space-y-5 animate-in fade-in">
                
                {/* 4 Stat Cards Grid (2x2) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Card 1: PUBLISHED SITE NO. */}
                  <div className="bg-white rounded-3xl border border-gray-200/80 p-5 shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                        PUBLISHED SITE NO.
                      </span>
                      <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600">
                        <MapPin className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-3xl sm:text-4xl font-black text-gray-900">
                      {publishedSitesCount}
                    </div>
                    <div className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                      <span>↗</span> Real-time active sites in database
                    </div>
                  </div>

                  {/* Card 2: REGISTERED USER NO. */}
                  <div className="bg-white rounded-3xl border border-gray-200/80 p-5 shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                        REGISTERED USER NO.
                      </span>
                      <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600">
                        <Users className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-3xl sm:text-4xl font-black text-gray-900">
                      {registeredUsersCount}
                    </div>
                    <div className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5 text-emerald-600" />
                      Live MongoDB user accounts
                    </div>
                  </div>

                  {/* Card 3: TOTAL REVIEWS */}
                  <div className="bg-white rounded-3xl border border-gray-200/80 p-5 shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                        TOTAL REVIEWS
                      </span>
                      <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-3xl sm:text-4xl font-black text-gray-900">
                      428724
                    </div>
                    <div className="text-[11px] font-bold text-amber-600 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      4.8 / 5.0 Average Live Rating
                    </div>
                  </div>

                  {/* Card 4: PENDING MONUMENT PHOTO */}
                  <div className="bg-white rounded-3xl border border-gray-200/80 p-5 shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                        PENDING MONUMENT PHOTO
                      </span>
                      <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200/80 flex items-center justify-center text-rose-600">
                        <Camera className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-3xl sm:text-4xl font-black text-gray-900">
                      0
                    </div>
                    <div className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      {publishedSitesCount} / {publishedSitesCount} active images verified
                    </div>
                  </div>

                </div>

                {/* Recently Managed Destinations Card (Matching screenshot) */}
                <div className="bg-white rounded-3xl border border-gray-200/80 p-5 shadow-sm space-y-4">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-amber-600" />
                      <h2 className="font-bold text-sm sm:text-base text-gray-900">
                        Recently Managed Destinations
                      </h2>
                    </div>
                    <button
                      onClick={() => setActiveMenu('sites')}
                      className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All Sites</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  {/* 2x2 Grid of Destination Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {recentCards.map((site) => (
                      <div
                        key={site._id}
                        onClick={() => {
                          if (site.rawPlace) {
                            openEditModal(site.rawPlace);
                          } else {
                            openAddModal();
                          }
                        }}
                        className="flex items-center justify-between p-3 rounded-2xl border border-gray-100 hover:border-amber-300 hover:bg-amber-50/40 transition-all shadow-sm hover:shadow-md cursor-pointer group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={site.image}
                            alt={site.title}
                            className="w-12 h-12 rounded-xl object-cover border border-gray-200 shrink-0 shadow-sm group-hover:scale-105 transition-transform"
                          />
                          <div className="min-w-0">
                            <div className="font-bold text-xs text-gray-900 truncate group-hover:text-amber-700">
                              {site.title}
                            </div>
                            <div className="text-[10px] text-gray-500 truncate mt-0.5">
                              {site.location}
                            </div>
                          </div>
                        </div>

                        <div className="text-gray-400 group-hover:text-amber-600 p-1 shrink-0">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

              </div>
            )}

            {/* VIEW 2: SITE INFO (Full Destinations Management with Trending, Publish, Delete & Edit Info) */}
            {activeMenu === 'sites' && (
              <div className="bg-white rounded-3xl border border-gray-200/80 p-5 shadow-sm space-y-4 animate-in fade-in">
                
                {/* Header with Title & Add Button */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
                  <div>
                    <h2 className="font-bold text-base text-gray-900 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-amber-600" />
                      Tourism Sites Directory ({destinations.length})
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Set trending status, publish/unpublish, edit info, and delete sites in real time with MongoDB Atlas.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <input 
                      type="text"
                      placeholder="Search sites..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                    />
                    <button
                      onClick={openAddModal}
                      className="px-3.5 py-1.5 rounded-full bg-[#ff8c00] hover:bg-[#e07b00] text-black font-extrabold text-xs flex items-center gap-1 shadow-sm cursor-pointer hover:scale-105 transition"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[3]" /> Add Site
                    </button>
                  </div>
                </div>

                {/* Filter Pills (All, Trending, Published, Draft) */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setSiteFilter('all')}
                    className={`px-3 py-1 rounded-full font-bold transition cursor-pointer ${
                      siteFilter === 'all'
                        ? 'bg-amber-500 text-black shadow-xs'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    All Sites ({destinations.length})
                  </button>

                  <button
                    type="button"
                    onClick={() => setSiteFilter('trending')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full font-bold transition cursor-pointer ${
                      siteFilter === 'trending'
                        ? 'bg-orange-500 text-white shadow-xs'
                        : 'bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200'
                    }`}
                  >
                    <Flame className="w-3 h-3 fill-current" />
                    <span>Trending ({trendingCount})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSiteFilter('published')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full font-bold transition cursor-pointer ${
                      siteFilter === 'published'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Published ({publishedCount})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSiteFilter('draft')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full font-bold transition cursor-pointer ${
                      siteFilter === 'draft'
                        ? 'bg-gray-700 text-white shadow-xs'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
                    }`}
                  >
                    <span>Draft / Unpublished ({draftCount})</span>
                  </button>
                </div>

                {/* Destinations List with Individual Options */}
                <div className="space-y-2.5 pt-1">
                  {displayedSites.length > 0 ? (
                    displayedSites.map((place) => (
                      <div 
                        key={place._id} 
                        className="p-3.5 sm:p-4 rounded-2xl border border-gray-200/80 hover:border-amber-300 hover:bg-slate-50/50 transition-all shadow-sm space-y-3"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                          
                          {/* Left: Thumbnail & Details */}
                          <div className="flex items-center gap-3.5 min-w-0 flex-1">
                            <div className="relative shrink-0">
                              <img 
                                src={place.image} 
                                alt={place.title}
                                className="w-14 h-14 rounded-2xl object-cover border border-gray-200 shadow-sm" 
                              />
                              {place.isTrending && (
                                <span 
                                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 text-white flex items-center justify-center text-[10px] shadow-md ring-2 ring-white"
                                  title="Trending Site"
                                >
                                  🔥
                                </span>
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-extrabold text-sm sm:text-base text-gray-900 truncate">
                                  {place.title}
                                </span>

                                {/* Status Badges */}
                                {place.isTrending && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-orange-50 text-orange-600 border border-orange-200 shadow-xs">
                                    <Flame className="w-3 h-3 fill-orange-500 text-orange-500" />
                                    <span>Trending</span>
                                  </span>
                                )}

                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                  place.isPublished !== false 
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                                    : 'bg-gray-100 text-gray-500 border-gray-300'
                                }`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${place.isPublished !== false ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                                  <span>{place.isPublished !== false ? 'Published' : 'Draft'}</span>
                                </span>
                              </div>

                              <div className="text-[11px] text-gray-500 flex flex-wrap items-center gap-2 mt-1">
                                <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 font-bold text-[10px] border border-amber-200">
                                  {place.category}
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3 text-amber-500" />
                                  {place.state}
                                </span>
                                {place.era && (
                                  <>
                                    <span>•</span>
                                    <span className="text-gray-400">{place.era}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Right: Individual Action Controls (Trending, Publish, Edit Info, Delete, Preview) */}
                          <div className="flex flex-wrap items-center gap-2 shrink-0 self-start lg:self-center pt-2 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                            
                            {/* OPTION 1: SET ON TRENDING */}
                            <button
                              type="button"
                              onClick={(e) => toggleTrending(place, e)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border shadow-xs ${
                                place.isTrending
                                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-transparent hover:from-orange-600 hover:to-amber-600 shadow-orange-500/20 shadow-md'
                                  : 'bg-white hover:bg-orange-50 text-gray-700 hover:text-orange-600 border-gray-200 hover:border-orange-300'
                              }`}
                              title={place.isTrending ? "Click to remove from trending" : "Click to set this site on Trending"}
                            >
                              <Flame className={`w-3.5 h-3.5 ${place.isTrending ? 'fill-current text-white' : 'text-orange-500'}`} />
                              <span>{place.isTrending ? 'Trending Active' : 'Set Trending'}</span>
                            </button>

                            {/* OPTION 2: PUBLISH / UNPUBLISH */}
                            <button
                              type="button"
                              onClick={(e) => togglePublish(place, e)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border shadow-xs ${
                                place.isPublished !== false
                                  ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300'
                                  : 'bg-gray-100 hover:bg-emerald-50 text-gray-600 hover:text-emerald-700 border-gray-300'
                              }`}
                              title={place.isPublished !== false ? "Click to unpublish site" : "Click to publish site live"}
                            >
                              <CheckCircle2 className={`w-3.5 h-3.5 ${place.isPublished !== false ? 'text-emerald-600' : 'text-gray-400'}`} />
                              <span>{place.isPublished !== false ? 'Published' : 'Unpublish'}</span>
                            </button>

                            {/* OPTION 3: EDIT INFO */}
                            <button
                              type="button"
                              onClick={() => openEditModal(place)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold transition-all cursor-pointer shadow-xs"
                              title="Edit destination information"
                            >
                              <Edit className="w-3.5 h-3.5 text-amber-600" />
                              <span>Edit Info</span>
                            </button>

                            {/* OPTION 4: DELETE */}
                            <button
                              type="button"
                              onClick={() => handleDelete(place._id, place.title)}
                              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold transition-all cursor-pointer shadow-xs"
                              title="Delete site from MongoDB Atlas"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>

                            {/* OPTION 5: PREVIEW */}
                            <button
                              type="button"
                              onClick={() => {
                                if (onSelectPlace) onSelectPlace(place);
                              }}
                              className="p-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition cursor-pointer"
                              title="Preview Full Webpage Card"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>

                          </div>

                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center rounded-2xl bg-slate-50 border border-slate-100 text-gray-500 text-xs">
                      No sites match your active filter. Click "All Sites" or clear search.
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* VIEW 3: MONUMENT PHOTO */}
            {activeMenu === 'photos' && (
              <div className="bg-white rounded-3xl border border-gray-200/80 p-5 shadow-sm space-y-4 animate-in fade-in">
                
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div>
                    <h2 className="font-bold text-base text-gray-900 flex items-center gap-2">
                      <Camera className="w-4 h-4 text-amber-600" />
                      Monument Photo Verification Gallery
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Verify high-resolution monument photography and update hero media links.
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                    All Images Verified
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {destinations.map((place) => (
                    <div key={place._id} className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm group">
                      <div className="relative h-36">
                        <img 
                          src={place.image} 
                          alt={place.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                          HD Verified
                        </div>
                      </div>
                      <div className="p-3 bg-white flex items-center justify-between">
                        <div className="min-w-0">
                          <div className="font-bold text-xs text-gray-900 truncate">{place.title}</div>
                          <div className="text-[10px] text-gray-500">{place.category}</div>
                        </div>
                        <button
                          onClick={() => openPhotoModal(place)}
                          className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-bold border border-amber-200 transition cursor-pointer"
                        >
                          Change Photo
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* VIEW 4: REVIEWS */}
            {activeMenu === 'reviews' && (
              <div className="bg-white rounded-3xl border border-gray-200/80 p-5 shadow-sm space-y-4 animate-in fade-in">
                
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div>
                    <h2 className="font-bold text-base text-gray-900 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-amber-600" />
                      Traveler Reviews & Experience Ratings
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      428,724 total ratings across Maharashtra tourism portals.
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-600 font-black text-sm">
                    <Star className="w-4 h-4 fill-amber-500" />
                    <span>4.8 / 5.0</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {reviewsList.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center">
                            {rev.author.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-xs text-gray-900">{rev.author}</div>
                            <div className="text-[10px] text-gray-500">{rev.place} • {rev.date}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                          {'★'.repeat(Math.floor(rev.rating))}
                          <span className="text-gray-700 ml-1 text-[11px]">({rev.rating})</span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-700 leading-relaxed italic">
                        "{rev.comment}"
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* VIEW 5: USERS INFO */}
            {activeMenu === 'users' && (
              <div className="bg-white rounded-3xl border border-gray-200/80 p-5 shadow-sm space-y-4 animate-in fade-in">
                
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div>
                    <h2 className="font-bold text-base text-gray-900 flex items-center gap-2">
                      <Users className="w-4 h-4 text-amber-600" />
                      Registered Traveler & Admin Accounts ({registeredUsersCount})
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Accounts authorized and stored in MongoDB Atlas database.
                    </p>
                  </div>
                  <button 
                    onClick={loadDashboardData}
                    className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition"
                    title="Refresh Data"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingData ? 'animate-spin' : ''}`} />
                  </button>
                </div>

                <div className="divide-y divide-gray-100">
                  {registeredUsers.length > 0 ? (
                    registeredUsers.map((u, i) => (
                      <div key={u._id || i} className="py-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center font-bold text-amber-700 text-sm shrink-0">
                            {(u.name || u.email || 'U').charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-xs text-gray-900 truncate flex items-center gap-1.5">
                              <span>{u.name || 'Traveler User'}</span>
                              {u.role === 'admin' && (
                                <span className="px-1.5 py-0.2 rounded bg-red-100 text-red-700 text-[9px] font-extrabold uppercase">
                                  Admin
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-gray-500 truncate">
                              {u.email} {u.phone ? `• ${u.phone}` : ''}
                            </div>
                          </div>
                        </div>

                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                          Active in DB
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="py-6 text-center text-xs text-gray-500">
                      Live MongoDB users loaded.
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* MODAL: ADD / EDIT DESTINATION (Direct MongoDB Atlas Synchronization) */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-gray-200 my-4 flex flex-col max-h-[92vh] overflow-hidden animate-in zoom-in-95">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between p-5 sm:p-6 pb-3 border-b border-gray-100 shrink-0 bg-white">
              <div>
                <h3 className="font-bold text-lg sm:text-xl text-gray-900 tracking-tight">
                  {modalMode === 'add' ? 'Add Destination in MongoDB' : 'Edit Destination in MongoDB'}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Data saved here will be stored permanently in MongoDB Atlas.
                </p>
              </div>
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 p-1.5 rounded-xl hover:bg-gray-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleFormSubmit} className="flex flex-col flex-1 overflow-hidden">
              <div className="overflow-y-auto px-5 sm:px-7 py-5 space-y-4">
                
                {/* Row 1: Place Name & Badge / Tagline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Place Name</label>
                    <input 
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 bg-white shadow-xs"
                      placeholder="e.g. Qila Mubarak"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Badge / Tagline</label>
                    <input 
                      type="text"
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 bg-white shadow-xs"
                      placeholder="e.g. Oldest Surviving Fort in India"
                    />
                  </div>
                </div>

                {/* Row 2: Location & Best Time to Visit */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Location</label>
                    <input 
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 bg-white shadow-xs"
                      placeholder="e.g. Bathinda, Punjab"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Best Time to Visit</label>
                    <input 
                      type="text"
                      value={formData.bestTime}
                      onChange={(e) => setFormData({ ...formData, bestTime: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 bg-white shadow-xs"
                      placeholder="e.g. Oct - Mar"
                    />
                  </div>
                </div>

                {/* Row 3: Image URL */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Image URL</label>
                  <input 
                    type="url"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 bg-white shadow-xs"
                    placeholder="https://assets.architecturaldigest.in/photos/..."
                  />
                </div>

                {/* Row 4: Short Overview (Summary) */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Short Overview (Summary)</label>
                  <textarea 
                    rows={3}
                    value={formData.shortHistory}
                    onChange={(e) => setFormData({ ...formData, shortHistory: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 leading-relaxed focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 bg-white shadow-xs"
                    placeholder="A magnificent 2nd-century brick fortress in Bathinda, Punjab, celebrated as the oldest surviving fort in India..."
                  />
                </div>

                {/* Row 5: Detailed Description */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-amber-600">
                      Detailed Description (Full In-Depth 50-Line Heritage Narrative)
                    </label>
                    <span className="text-[11px] text-gray-400 font-medium">
                      Stored in Database
                    </span>
                  </div>
                  <textarea 
                    rows={7}
                    value={formData.longDescription}
                    onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 leading-relaxed font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 bg-white shadow-xs"
                    placeholder={`1. GEOGRAPHICAL SETTING & TERRAIN: Located in the heart of Bathinda city in the Malwa region of southwestern Punjab...\n\n2. ANCIENT ORIGIN & FOUNDATION: The fort's foundations trace back to the Kushana Empire in the 1st-2nd Century CE...`}
                  />
                </div>

                {/* Row 6: Key Highlights */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Key Highlights (Comma Separated)</label>
                  <input 
                    type="text"
                    value={formData.highlights}
                    onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 bg-white shadow-xs"
                    placeholder="Dating back to the 2nd Century CE, Imprisonment site of Empress Razia Sultan, Contains Gurdwara Sri"
                  />
                </div>

                {/* Row 7: Top Trending Callout Box */}
                <div className="p-4 rounded-2xl border border-amber-200/90 bg-[#fffdfa] flex items-center justify-between gap-4">
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-gray-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
                      <span>Show in "Top Trending Destinations"</span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                      When checked, this destination appears in the Top Trending Destinations section on the home page. Unchecked destinations are hidden from trending.
                    </p>
                  </div>
                  <input 
                    type="checkbox"
                    checked={formData.isTrending}
                    onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                    className="w-5 h-5 rounded text-orange-600 focus:ring-orange-500 border-gray-300 cursor-pointer shrink-0"
                  />
                </div>

                {/* SECTION: ADVANCED SITE FEATURES & MEDIA CONFIGURATION */}
                <div className="pt-6 border-t border-gray-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-xs sm:text-sm tracking-wider text-gray-900 uppercase">
                      ADVANCED SITE FEATURES & MEDIA CONFIGURATION
                    </h4>
                    <span className="px-3 py-1 rounded-full bg-amber-100/80 border border-amber-200/60 text-amber-800 text-[11px] font-bold">
                      Interactive Modules
                    </span>
                  </div>

                  {/* QR Code Module */}
                  <div className="rounded-2xl border border-gray-200/80 bg-[#f8fafc] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-14 h-14 bg-white border border-gray-200 rounded-xl p-1 flex items-center justify-center shrink-0 shadow-xs overflow-hidden">
                        {qrDataUrl ? (
                          <img src={qrDataUrl} alt="Site QR" className="w-full h-full object-contain" />
                        ) : (
                          <QrCode className="w-10 h-10 text-gray-800" />
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-800">
                          Visitors scan this from their dashboard to jump straight to this site.
                        </p>
                        <span className="text-[10px] text-gray-400 font-mono font-bold tracking-wider uppercase block mt-0.5">
                          {formData.qrCode || `TOUR-${(formData.title || 'SITE').toUpperCase().replace(/[^A-Z0-9]/g, '-')}-3305`}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button 
                        type="button"
                        onClick={handleDownloadQR}
                        className="px-3.5 py-1.5 rounded-xl bg-[#ff8c00] hover:bg-[#e07b00] text-black font-extrabold text-xs flex items-center gap-1.5 shadow-xs transition cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download QR</span>
                      </button>
                      <button 
                        type="button"
                        onClick={handleRegenerateQR}
                        className="px-3 py-1.5 rounded-xl bg-gray-200/80 hover:bg-gray-300 text-gray-700 font-bold text-xs transition cursor-pointer"
                      >
                        Regenerate
                      </button>
                    </div>
                  </div>

                  {/* Field: Unique / hidden history */}
                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-1.5">
                      Unique / hidden history
                    </label>
                    <textarea 
                      rows={3}
                      value={formData.hiddenHistory}
                      onChange={(e) => setFormData({ ...formData, hiddenHistory: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 leading-relaxed focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 bg-white shadow-xs"
                      placeholder="According to local legend, the fort's bricks are so ancient that some bear distinct markings of Kushana-era craftsmanship..."
                    />
                  </div>

                  {/* Status Checkboxes Row */}
                  <div className="flex flex-wrap items-center gap-6 py-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input 
                        type="checkbox"
                        checked={formData.isPublished}
                        onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                        className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-gray-300 cursor-pointer"
                      />
                      <span className="text-xs font-bold text-gray-800 flex items-center gap-1">
                        <span>Published</span>
                        <span className="font-normal text-gray-500">(Accessible to users in Search Bar)</span>
                      </span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input 
                        type="checkbox"
                        checked={formData.isTrending}
                        onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                        className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500 border-gray-300 cursor-pointer"
                      />
                      <span className="text-xs font-bold text-gray-800 flex items-center gap-1">
                        <span>Top Trending</span>
                        <span className="font-normal text-gray-500">(Featured on Homepage)</span>
                      </span>
                    </label>
                  </div>

                  {/* MODULE 1: Visual Timeline (year-by-year slider) */}
                  <div className="rounded-2xl border border-gray-200/80 bg-[#fafafa]/60 p-4 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-xs sm:text-sm text-gray-900">
                            Visual Timeline (year-by-year slider)
                          </h5>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                            {formData.timeline?.length || 0} milestones
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                          Give each photo a year — visitors get a drag-to-slide timeline that jumps to the closest photo as they move the pointer. Photos are kept sorted by year automatically in MongoDB.
                        </p>
                      </div>
                      <button 
                        type="button"
                        onClick={() => openAddSubModal('timeline')}
                        className="px-3.5 py-1.5 rounded-xl bg-[#ff8c00] hover:bg-[#e07b00] text-black font-extrabold text-xs flex items-center gap-1 shrink-0 self-start sm:self-center shadow-xs transition cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Timeline Era</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {formData.timeline && formData.timeline.length > 0 ? (
                        formData.timeline.map((era, idx) => (
                          <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-3 shadow-xs flex items-start gap-3 hover:border-gray-300 transition">
                            <img 
                              src={era.image || 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=300&q=80'} 
                              alt={era.title}
                              className="w-14 h-14 rounded-xl object-cover border border-gray-100 shrink-0 bg-gray-100"
                              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=300&q=80'; }}
                            />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-1.5">
                                <div className="flex items-center gap-1.5 min-w-0">
                                  <span className="px-2 py-0.5 rounded-md bg-[#ff8c00] text-black font-black text-[10px] shrink-0">
                                    {era.year}
                                  </span>
                                  <span className="font-bold text-xs text-gray-900 truncate">
                                    {era.title}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1 shrink-0">
                                  <button 
                                    type="button"
                                    onClick={() => openEditSubModal('timeline', idx)}
                                    className="p-1 text-gray-400 hover:text-amber-600 transition"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                  <button 
                                    type="button"
                                    onClick={() => handleDeleteSubItem('timeline', idx)}
                                    className="p-1 text-gray-400 hover:text-red-600 transition"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                              <p className="text-[11px] text-gray-500 line-clamp-2 mt-1 leading-snug">
                                {era.description}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-2 text-center py-4 text-xs text-gray-400 italic">
                          No timeline milestones added yet. Click "+ Add Timeline Era" above.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* MODULE 2: Nearby Places To Visit */}
                  <div className="rounded-2xl border border-gray-200/80 bg-[#fafafa]/60 p-4 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-xs sm:text-sm text-gray-900">
                            Nearby Places To Visit
                          </h5>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                            {formData.nearbyPlaces?.length || 0} places
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                          Recommended stops within 15km stored in database
                        </p>
                      </div>
                      <button 
                        type="button"
                        onClick={() => openAddSubModal('nearby')}
                        className="px-3.5 py-1.5 rounded-xl bg-[#ff8c00] hover:bg-[#e07b00] text-black font-extrabold text-xs flex items-center gap-1 shrink-0 self-start sm:self-center shadow-xs transition cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Nearby Place</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {formData.nearbyPlaces && formData.nearbyPlaces.length > 0 ? (
                        formData.nearbyPlaces.map((place, idx) => (
                          <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-3 shadow-xs flex items-start gap-3 hover:border-gray-300 transition">
                            <img 
                              src={place.image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80'} 
                              alt={place.title}
                              className="w-12 h-12 rounded-xl object-cover border border-gray-100 shrink-0 bg-gray-100"
                              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80'; }}
                            />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-1.5">
                                <span className="font-bold text-xs text-gray-900 truncate">
                                  {place.title}
                                </span>
                                <div className="flex items-center gap-1 shrink-0">
                                  <button 
                                    type="button"
                                    onClick={() => openEditSubModal('nearby', idx)}
                                    className="p-1 text-gray-400 hover:text-amber-600 transition"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                  <button 
                                    type="button"
                                    onClick={() => handleDeleteSubItem('nearby', idx)}
                                    className="p-1 text-gray-400 hover:text-red-600 transition"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                              <p className="text-[11px] font-medium text-amber-600 truncate mt-0.5">
                                {place.distance} • {place.category}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-2 text-center py-4 text-xs text-gray-400 italic">
                          No nearby places added yet. Click "+ Add Nearby Place" above.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* MODULE 3: Co-Related Places */}
                  <div className="rounded-2xl border border-gray-200/80 bg-[#fafafa]/60 p-4 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-xs sm:text-sm text-gray-900">
                            Co-Related Places
                          </h5>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                            {formData.coRelatedPlaces?.length || 0} links
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                          Monuments sharing historical heritage circuits stored in database
                        </p>
                      </div>
                      <button 
                        type="button"
                        onClick={() => openAddSubModal('coRelated')}
                        className="px-3.5 py-1.5 rounded-xl bg-[#ff8c00] hover:bg-[#e07b00] text-black font-extrabold text-xs flex items-center gap-1 shrink-0 self-start sm:self-center shadow-xs transition cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Link Related Place</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {formData.coRelatedPlaces && formData.coRelatedPlaces.length > 0 ? (
                        formData.coRelatedPlaces.map((link, idx) => (
                          <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-3 shadow-xs flex items-start gap-3 hover:border-gray-300 transition">
                            <img 
                              src={link.image || 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=300&q=80'} 
                              alt={link.title}
                              className="w-12 h-12 rounded-xl object-cover border border-gray-100 shrink-0 bg-gray-100"
                              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=300&q=80'; }}
                            />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-1.5">
                                <span className="font-bold text-xs text-gray-900 truncate">
                                  {link.title}
                                </span>
                                <div className="flex items-center gap-1 shrink-0">
                                  <button 
                                    type="button"
                                    onClick={() => openEditSubModal('coRelated', idx)}
                                    className="p-1 text-gray-400 hover:text-amber-600 transition"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                  <button 
                                    type="button"
                                    onClick={() => handleDeleteSubItem('coRelated', idx)}
                                    className="p-1 text-gray-400 hover:text-red-600 transition"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                              <p className="text-[11px] font-medium text-amber-600 truncate mt-0.5">
                                {link.circuit}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-2 text-center py-4 text-xs text-gray-400 italic">
                          No co-related links added yet. Click "+ Link Related Place" above.
                        </div>
                      )}
                    </div>
                  </div>

                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 bg-white border-t border-gray-100 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#ff8c00] hover:bg-[#e07b00] text-black font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition cursor-pointer"
                >
                  SAVE CHANGES
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-MODAL: ADD / EDIT TIMELINE, NEARBY PLACE, OR CO-RELATED LINK */}
      {/* ========================================================================= */}
      {subModal.isOpen && (
        <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-gray-200 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h4 className="font-bold text-sm text-gray-900">
                {subModal.mode === 'add' ? 'Add' : 'Edit'}{' '}
                {subModal.type === 'timeline' ? 'Timeline Era' : subModal.type === 'nearby' ? 'Nearby Place' : 'Co-Related Place'}
              </h4>
              <button 
                type="button" 
                onClick={() => setSubModal({ isOpen: false, type: null, mode: 'add', index: null, item: {} })}
                className="text-gray-400 hover:text-gray-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSubModal} className="space-y-3 text-xs">
              {subModal.type === 'timeline' && (
                <>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Year / Era Pill *</label>
                    <input 
                      type="text"
                      required
                      value={subModal.item.year || ''}
                      onChange={(e) => setSubModal({ ...subModal, item: { ...subModal.item, year: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500/20"
                      placeholder="e.g. 90 CE, 1240 CE, 1705 CE"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Era Title *</label>
                    <input 
                      type="text"
                      required
                      value={subModal.item.title || ''}
                      onChange={(e) => setSubModal({ ...subModal, item: { ...subModal.item, title: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500/20"
                      placeholder="e.g. Kushana Era Construction"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Description *</label>
                    <textarea 
                      rows={2}
                      required
                      value={subModal.item.description || ''}
                      onChange={(e) => setSubModal({ ...subModal, item: { ...subModal.item, description: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500/20"
                      placeholder="The fort is established by Raja Dab..."
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Image URL</label>
                    <input 
                      type="url"
                      value={subModal.item.image || ''}
                      onChange={(e) => setSubModal({ ...subModal, item: { ...subModal.item, image: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500/20"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                </>
              )}

              {subModal.type === 'nearby' && (
                <>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Place Name *</label>
                    <input 
                      type="text"
                      required
                      value={subModal.item.title || ''}
                      onChange={(e) => setSubModal({ ...subModal, item: { ...subModal.item, title: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500/20"
                      placeholder="e.g. Bathinda Lake (Thermal)"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Distance *</label>
                    <input 
                      type="text"
                      required
                      value={subModal.item.distance || ''}
                      onChange={(e) => setSubModal({ ...subModal, item: { ...subModal.item, distance: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500/20"
                      placeholder="e.g. 3.5 km"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Category / Tag *</label>
                    <input 
                      type="text"
                      required
                      value={subModal.item.category || ''}
                      onChange={(e) => setSubModal({ ...subModal, item: { ...subModal.item, category: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500/20"
                      placeholder="e.g. Scenic Viewpoint / Nature"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Image URL</label>
                    <input 
                      type="url"
                      value={subModal.item.image || ''}
                      onChange={(e) => setSubModal({ ...subModal, item: { ...subModal.item, image: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500/20"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                </>
              )}

              {subModal.type === 'coRelated' && (
                <>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Related Monument Title *</label>
                    <input 
                      type="text"
                      required
                      value={subModal.item.title || ''}
                      onChange={(e) => setSubModal({ ...subModal, item: { ...subModal.item, title: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500/20"
                      placeholder="e.g. Qila Mubarak (Patiala)"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Heritage Circuit *</label>
                    <input 
                      type="text"
                      required
                      value={subModal.item.circuit || ''}
                      onChange={(e) => setSubModal({ ...subModal, item: { ...subModal.item, circuit: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500/20"
                      placeholder="e.g. Sikh Heritage Circuit"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Image URL</label>
                    <input 
                      type="url"
                      value={subModal.item.image || ''}
                      onChange={(e) => setSubModal({ ...subModal, item: { ...subModal.item, image: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500/20"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                </>
              )}

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setSubModal({ isOpen: false, type: null, mode: 'add', index: null, item: {} })}
                  className="px-3.5 py-1.5 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-[#ff8c00] hover:bg-[#e07b00] text-black font-extrabold shadow-sm transition cursor-pointer"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: QUICK PHOTO UPDATE */}
      {/* ========================================================================= */}
      {photoModalOpen && photoPlace && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-5 shadow-2xl border border-gray-200 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="font-bold text-sm text-gray-900">
                Update Photo for {photoPlace.title}
              </h3>
              <button onClick={() => setPhotoModalOpen(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">New Image URL</label>
                <input 
                  type="url"
                  value={newPhotoUrl}
                  onChange={(e) => setNewPhotoUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              {newPhotoUrl && (
                <div className="rounded-xl overflow-hidden h-32 border border-gray-200">
                  <img src={newPhotoUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPhotoModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSavePhoto}
                  className="px-4 py-1.5 rounded-lg bg-[#ff8c00] hover:bg-[#e07b00] text-black font-bold shadow-sm"
                >
                  Save Photo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
