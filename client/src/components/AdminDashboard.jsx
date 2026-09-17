import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { 
  Plus, Edit, Trash2, Shield, Landmark, Award, Clock, 
  Mail, ArrowLeft, Eye, X, History, Users, CheckCircle2 
} from 'lucide-react';

export default function AdminDashboard({ destinations, onDestinationsChange, setCurrentView }) {
  const [activeTab, setActiveTab] = useState('places');
  const [inquiries, setInquiries] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedId, setSelectedId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    state: '',
    category: 'UNESCO Heritage',
    era: '',
    image: '',
    shortHistory: '',
    longDescription: '',
    bestTime: '',
    timings: '',
    entryFee: '',
    highlights: '',
    nearestTransit: '',
    timeline: [
      { year: '12th Century CE', title: 'Monument Foundation', description: 'Built by the patron dynasty.' },
      { year: 'Modern Era', title: 'Heritage Inscription', description: 'Recognized as an iconic tourism wonder.' }
    ]
  });

  useEffect(() => {
    loadInquiries();
    loadUsers();
  }, []);

  const loadInquiries = async () => {
    const list = await api.getInquiries();
    setInquiries(list || []);
  };

  const loadUsers = async () => {
    const list = await api.getRegisteredUsers();
    setRegisteredUsers(list || []);
  };

  const openAddModal = () => {
    setModalMode('add');
    setSelectedId(null);
    setFormData({
      title: '',
      state: '',
      category: 'UNESCO Heritage',
      era: '13th Century CE',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
      shortHistory: '',
      longDescription: '',
      bestTime: 'October to March',
      timings: 'Sunrise to Sunset',
      entryFee: '₹50 (Indians), ₹600 (Foreigners)',
      highlights: 'Architectural carvings, Ancient Sanctum',
      nearestTransit: 'Regional Airport & Railway',
      timeline: [
        { year: '13th Century CE', title: 'Foundational Consecration', description: 'Constructed under royal commission.' },
        { year: '1984 CE', title: 'National Monument Status', description: 'Preserved by the Archaeological Survey.' }
      ]
    });
    setIsModalOpen(true);
  };

  const openEditModal = (place) => {
    setModalMode('edit');
    setSelectedId(place._id);
    setFormData({
      title: place.title || '',
      state: place.state || '',
      category: place.category || 'UNESCO Heritage',
      era: place.era || '',
      image: place.image || '',
      shortHistory: place.shortHistory || '',
      longDescription: place.longDescription || '',
      bestTime: place.keyPoints?.bestTime || '',
      timings: place.keyPoints?.timings || '',
      entryFee: place.keyPoints?.entryFee || '',
      highlights: place.keyPoints?.highlights?.join(', ') || '',
      nearestTransit: place.keyPoints?.nearestTransit || '',
      timeline: place.timeline && place.timeline.length > 0 
        ? place.timeline 
        : [{ year: '1200 CE', title: 'Historical Milestone', description: 'Key historic event.' }]
    });
    setIsModalOpen(true);
  };

  const addTimelineMilestone = () => {
    setFormData({
      ...formData,
      timeline: [...formData.timeline, { year: '', title: '', description: '' }]
    });
  };

  const updateTimelineMilestone = (index, field, value) => {
    const updated = [...formData.timeline];
    updated[index][field] = value;
    setFormData({ ...formData, timeline: updated });
  };

  const removeTimelineMilestone = (index) => {
    const updated = formData.timeline.filter((_, i) => i !== index);
    setFormData({ ...formData, timeline: updated });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: formData.title,
      state: formData.state,
      category: formData.category,
      era: formData.era,
      image: formData.image,
      shortHistory: formData.shortHistory,
      longDescription: formData.longDescription,
      keyPoints: {
        bestTime: formData.bestTime,
        timings: formData.timings,
        entryFee: formData.entryFee,
        highlights: formData.highlights.split(',').map(h => h.trim()).filter(Boolean),
        nearestTransit: formData.nearestTransit,
        architecturalStyle: 'Indian Classical / Regional'
      },
      timeline: formData.timeline.filter(t => t.year && t.title)
    };

    if (modalMode === 'add') {
      const created = await api.createDestination(payload);
      onDestinationsChange([created, ...destinations]);
    } else {
      const updated = await api.updateDestination(selectedId, payload);
      onDestinationsChange(destinations.map(d => d._id === selectedId ? updated : d));
    }

    setIsModalOpen(false);
  };

  const handleDelete = async (id, title) => {
    if (confirm(`Are you sure you want to remove "${title}" from the platform?`)) {
      await api.deleteDestination(id);
      onDestinationsChange(destinations.filter(d => d._id !== id));
    }
  };

  const totalPlaces = destinations.length;
  const unescoPlaces = destinations.filter(d => d.category.toLowerCase().includes('unesco')).length;
  const totalMilestones = destinations.reduce((acc, d) => acc + (d.timeline ? d.timeline.length : 0), 0);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto bg-slate-50 text-gray-900">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-200">
        <div>
          <button 
            onClick={() => setCurrentView('landing')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 mb-1.5 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </button>
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-gray-900 flex items-center gap-2.5">
            <Shield className="w-6 h-6 text-amber-600" />
            Admin Management Suite
          </h1>
          <p className="text-gray-500 text-xs mt-0.5">
            Create, update, and manage tourist destinations, interactive historical timelines, and traveler inquiries.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button 
            onClick={openAddModal}
            className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Destination
          </button>

          <button 
            onClick={() => setCurrentView('user-dashboard')}
            className="px-3.5 py-1.5 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            View as Traveler
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <div className="font-serif text-xl font-bold text-gray-900">{totalPlaces}</div>
            <div className="text-[11px] text-gray-500 font-medium">Total Destinations</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="font-serif text-xl font-bold text-gray-900">{unescoPlaces}</div>
            <div className="text-[11px] text-gray-500 font-medium">UNESCO Heritage</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="font-serif text-xl font-bold text-gray-900">{totalMilestones}</div>
            <div className="text-[11px] text-gray-500 font-medium">Timeline Milestones</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <div className="font-serif text-xl font-bold text-gray-900">{inquiries.length}</div>
            <div className="text-[11px] text-gray-500 font-medium">Traveler Inquiries</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200 mb-5 text-xs sm:text-sm">
        <button
          onClick={() => setActiveTab('places')}
          className={`pb-2.5 font-bold border-b-2 transition ${
            activeTab === 'places' 
              ? 'border-amber-500 text-amber-700' 
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          Manage Destinations ({destinations.length})
        </button>
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`pb-2.5 font-bold border-b-2 transition ${
            activeTab === 'inquiries' 
              ? 'border-amber-500 text-amber-700' 
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          Traveler Inquiries ({inquiries.length})
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`pb-2.5 font-bold border-b-2 transition ${
            activeTab === 'users' 
              ? 'border-amber-500 text-amber-700' 
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          Registered Accounts ({registeredUsers.length})
        </button>
      </div>

      {/* 1. PLACES MANAGEMENT TABLE */}
      {activeTab === 'places' && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm text-xs sm:text-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-gray-700">
              <thead className="bg-slate-50 text-gray-600 text-[11px] uppercase font-bold border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3">Destination</th>
                  <th className="px-4 py-3">State</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Timeline</th>
                  <th className="px-4 py-3">Best Time</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {destinations.map((place) => (
                  <tr key={place._id} className="hover:bg-slate-50/80 transition">
                    <td className="px-4 py-3 flex items-center gap-2.5">
                      <img 
                        src={place.image} 
                        alt={place.title}
                        className="w-10 h-10 rounded-lg object-cover shrink-0 border border-gray-200"
                      />
                      <span className="font-bold text-gray-900">{place.title}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{place.state}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        {place.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs">
                      <span className="flex items-center gap-1 text-gray-600 font-medium">
                        <History className="w-3.5 h-3.5 text-amber-600" />
                        {place.timeline?.length || 0} Milestones
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">{place.keyPoints?.bestTime || 'Year-round'}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button 
                          onClick={() => openEditModal(place)}
                          className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                          title="Edit Destination"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(place._id, place.title)}
                          className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                          title="Delete Destination"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. INQUIRIES LIST */}
      {activeTab === 'inquiries' && (
        <div className="space-y-3">
          {inquiries.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-xl border border-gray-200 text-gray-500 text-xs">
              No inquiries received yet.
            </div>
          ) : (
            inquiries.map((inq, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-900 text-xs sm:text-sm">{inq.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-amber-700 font-semibold">
                      {inq.interest}
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-500 mb-2">{inq.email}</div>
                  <p className="text-xs text-gray-700 italic">"{inq.message}"</p>
                </div>
                <div className="text-[11px] text-gray-400 shrink-0">
                  {new Date(inq.createdAt || Date.now()).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* 3. REGISTERED USERS & ADMINS LIST (SAVED IN MONGODB ATLAS) */}
      {activeTab === 'users' && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm text-xs sm:text-sm">
          <div className="p-4 bg-slate-50 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-600" />
                MongoDB Atlas: Registered Accounts in Techfusion Database
              </h3>
              <p className="text-[11px] text-gray-500">
                All signup information for users and admins is encrypted and saved directly to the <span className="font-semibold text-emerald-700 font-mono">Techfusion.users</span> collection.
              </p>
            </div>
            <button 
              onClick={loadUsers} 
              className="self-start sm:self-auto px-3 py-1 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 text-[11px] font-bold text-gray-700 transition"
            >
              Refresh List
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-gray-700">
              <thead className="bg-slate-100 text-gray-600 text-[11px] uppercase font-bold border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3">User / Admin Name</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Email Address</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Saved in Database</th>
                  <th className="px-4 py-3 text-right">Registration Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {registeredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-gray-500">
                      No registered accounts found in database.
                    </td>
                  </tr>
                ) : (
                  registeredUsers.map((u) => (
                    <tr key={u._id} className="hover:bg-amber-50/40 transition">
                      <td className="px-4 py-3 font-bold text-gray-900 flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          u.role === 'admin' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <span>{u.name}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 ${
                          u.role === 'admin' 
                            ? 'bg-amber-100 border border-amber-300 text-amber-800' 
                            : 'bg-emerald-100 border border-emerald-300 text-emerald-800'
                        }`}>
                          <Shield className="w-2.5 h-2.5" />
                          {u.role === 'admin' ? 'Admin Host' : 'Traveler'}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-[11px] text-gray-800">
                        {u.email}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {u.phone || '—'}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Atlas: Techfusion
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-gray-500 text-[11px]">
                        {new Date(u.createdAt || Date.now()).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ADD / EDIT DESTINATION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-2xl my-auto max-h-[90vh] overflow-y-auto text-gray-900">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-700 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="font-serif text-xl font-extrabold text-gray-900 mb-1 flex items-center gap-2">
              <Landmark className="w-5 h-5 text-amber-600" />
              {modalMode === 'add' ? 'Add New Destination' : 'Edit Destination'}
            </h2>
            <p className="text-[11px] text-gray-500 mb-4">
              Enter photos, visitor details, and historical timeline milestones.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Destination Name *</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-gray-200 text-gray-900 text-xs focus:outline-none focus:border-amber-500"
                    placeholder="e.g. Konark Sun Temple"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">State / Location *</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-gray-200 text-gray-900 text-xs focus:outline-none focus:border-amber-500"
                    placeholder="e.g. Odisha, India"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Category *</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-gray-200 text-gray-900 text-xs focus:outline-none focus:border-amber-500"
                  >
                    <option value="UNESCO Heritage">UNESCO Heritage</option>
                    <option value="Forts & Palaces">Forts & Palaces</option>
                    <option value="Spiritual & Temples">Spiritual & Temples</option>
                    <option value="Ancient Caves">Ancient Caves</option>
                    <option value="Natural & Scenic">Natural & Scenic</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Historical Era</label>
                  <input 
                    type="text" 
                    value={formData.era}
                    onChange={(e) => setFormData({ ...formData, era: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-gray-200 text-gray-900 text-xs focus:outline-none focus:border-amber-500"
                    placeholder="e.g. 13th Century CE"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Photo URL *</label>
                <input 
                  type="url" 
                  required 
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-gray-200 text-gray-900 text-xs focus:outline-none focus:border-amber-500"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Short History (Summary) *</label>
                <textarea 
                  rows="2" 
                  required 
                  value={formData.shortHistory}
                  onChange={(e) => setFormData({ ...formData, shortHistory: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-gray-200 text-gray-900 text-xs focus:outline-none focus:border-amber-500 resize-none"
                  placeholder="2-3 sentence overview..."
                ></textarea>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Long Detailed Description *</label>
                <textarea 
                  rows="3" 
                  required 
                  value={formData.longDescription}
                  onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-gray-200 text-gray-900 text-xs focus:outline-none focus:border-amber-500 resize-none"
                  placeholder="Cultural, architectural, and folklore details..."
                ></textarea>
              </div>

              {/* Key Visitor Points */}
              <div className="pt-2 border-t border-gray-200">
                <h4 className="font-bold text-amber-700 mb-2">Key Visitor Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">Best Time</label>
                    <input 
                      type="text" 
                      value={formData.bestTime}
                      onChange={(e) => setFormData({ ...formData, bestTime: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-gray-200 text-gray-900 text-xs"
                      placeholder="e.g. Oct to Mar"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">Timings</label>
                    <input 
                      type="text" 
                      value={formData.timings}
                      onChange={(e) => setFormData({ ...formData, timings: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-gray-200 text-gray-900 text-xs"
                      placeholder="e.g. Sunrise to Sunset"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">Entry Fee</label>
                    <input 
                      type="text" 
                      value={formData.entryFee}
                      onChange={(e) => setFormData({ ...formData, entryFee: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-gray-200 text-gray-900 text-xs"
                      placeholder="e.g. ₹50 (Indians)"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">Highlights</label>
                    <input 
                      type="text" 
                      value={formData.highlights}
                      onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-gray-200 text-gray-900 text-xs"
                      placeholder="Stone chariot, Sun dial"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">Nearest Transit</label>
                    <input 
                      type="text" 
                      value={formData.nearestTransit}
                      onChange={(e) => setFormData({ ...formData, nearestTransit: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-gray-200 text-gray-900 text-xs"
                      placeholder="Bhubaneswar Airport"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Timeline Builder */}
              <div className="pt-2.5 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-amber-700">Historical Timeline Milestones</h4>
                  <button 
                    type="button" 
                    onClick={addTimelineMilestone}
                    className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-300 hover:bg-amber-100 text-[11px] font-bold flex items-center gap-1 transition"
                  >
                    <Plus className="w-3 h-3" /> Add Milestone
                  </button>
                </div>

                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {formData.timeline.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-50 border border-gray-200">
                      <input 
                        type="text" 
                        placeholder="Year" 
                        value={item.year}
                        onChange={(e) => updateTimelineMilestone(idx, 'year', e.target.value)}
                        className="w-24 px-2 py-1 rounded bg-white border border-gray-200 text-xs text-gray-900"
                        required
                      />
                      <input 
                        type="text" 
                        placeholder="Event Title" 
                        value={item.title}
                        onChange={(e) => updateTimelineMilestone(idx, 'title', e.target.value)}
                        className="w-36 px-2 py-1 rounded bg-white border border-gray-200 text-xs text-gray-900"
                        required
                      />
                      <input 
                        type="text" 
                        placeholder="Milestone description..." 
                        value={item.description}
                        onChange={(e) => updateTimelineMilestone(idx, 'description', e.target.value)}
                        className="flex-1 px-2 py-1 rounded bg-white border border-gray-200 text-xs text-gray-900"
                        required
                      />
                      <button 
                        type="button"
                        onClick={() => removeTimelineMilestone(idx)}
                        className="p-1 rounded text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-gray-200 flex justify-end gap-2.5">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs shadow-sm"
                >
                  Save Destination
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
