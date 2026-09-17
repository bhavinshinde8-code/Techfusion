import React, { useState } from 'react';
import { api } from '../services/api';
import { MapPin, Mail, PhoneCall, Send, CheckCircle2 } from 'lucide-react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: 'General Tourism Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await api.submitInquiry(formData);
    setLoading(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', interest: 'General Tourism Inquiry', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left: Contact Info (Matches Sketch) */}
        <div className="lg:col-span-5">
          <div className="text-amber-400 text-xs font-bold uppercase tracking-[0.2em] mb-2">
            Get in Touch
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">
            Contact Phoenix
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8">
            Have questions regarding heritage circuits, local historians, custom travel itineraries, or adding a new monument to our national archive? We are here to help.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Headquarters</h4>
                <p className="text-xs text-gray-400 mt-0.5">Phoenix Heritage Plaza, Janpath Road, New Delhi, India</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Email Address</h4>
                <p className="text-xs text-gray-400 mt-0.5">heritage-support@phoenix-tourism.in</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">National Tourist Helpline</h4>
                <p className="text-xs text-gray-400 mt-0.5">+91 (11) 2336-1234 / Toll-Free: 1800-11-1363</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-7 bg-[#111827] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl">
          <h3 className="font-serif text-2xl font-bold text-white mb-6">
            Send an Inquiry
          </h3>

          {submitted && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center gap-3 text-sm">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>Namaste! Your message has been received. Our heritage team will get back to you shortly.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">Your Full Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Aarav Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-amber-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">Email Address *</label>
                <input 
                  type="email" 
                  required
                  placeholder="aarav@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-amber-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2">Area of Interest</label>
              <select 
                value={formData.interest}
                onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-500 transition"
              >
                <option value="General Tourism Inquiry">General Tourism Inquiry</option>
                <option value="Historical Timeline Research">Historical Timeline Research</option>
                <option value="Heritage Walk Itinerary">Heritage Walk Itinerary</option>
                <option value="Suggesting a New Monument">Suggesting a New Monument</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2">Your Query / Message *</label>
              <textarea 
                rows="4"
                required
                placeholder="Tell us what destination or heritage site you would like to know more about..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-amber-500 transition resize-none"
              ></textarea>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Submitting...' : 'Send Message'}</span>
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
