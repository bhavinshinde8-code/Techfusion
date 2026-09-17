import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer({ setCurrentView }) {
  return (
    <footer className="bg-white text-gray-700 border-t border-gray-200 pt-10 pb-6 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 3-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 pb-8">
          
          {/* Column 1: Team Phoenix Brand with Logo */}
          <div className="md:col-span-5 space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg overflow-hidden bg-black border border-amber-500/30 flex items-center justify-center shadow-sm">
                <img 
                  src="/phoenix-logo.png" 
                  alt="Team Phoenix" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-bold text-base text-gray-900 tracking-tight">Team Phoenix</span>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed max-w-xs">
              Empowering meaningful travel across India by connecting passionate explorers with local destination hosts.
            </p>
          </div>

          {/* Column 2: HOST COMMUNITY */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="font-bold text-[11px] uppercase tracking-wider text-gray-900">
              HOST COMMUNITY
            </h4>
            <ul className="space-y-1 text-xs text-gray-600">
              <li>
                <button onClick={() => setCurrentView('admin-dashboard')} className="hover:text-amber-600 transition">
                  Host Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('admin-dashboard')} className="hover:text-amber-600 transition">
                  List a New Historical Site
                </button>
              </li>
              <li>
                <a href="#disclaimers" className="hover:text-amber-600 transition">
                  Host Guidelines
                </a>
              </li>
              <li>
                <a href="#disclaimers" className="hover:text-amber-600 transition">
                  Verification Process
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: CONTACT US */}
          <div className="md:col-span-4 space-y-2">
            <h4 className="font-bold text-[11px] uppercase tracking-wider text-gray-900">
              CONTACT US
            </h4>
            <div className="space-y-1.5 text-xs text-gray-600">
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>+91 8999515737 / Digital Memory Lane Helpdesk</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>support@digitalmemorylane.org</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Tourism Hub India</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-2">
          <p>© 2026Phoenix Tourism Portal. All rights reserved.</p>
          <p>Designed with React & Tailwind CSS for SIH Tourism Innovation</p>
        </div>

      </div>
    </footer>
  );
}
