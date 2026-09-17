import React from 'react';
import { ShieldCheck, Compass, Map } from 'lucide-react';

export default function PlatformFeatures() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Data From Resprctive Munclple Office",
      description: "Get authentic local insights, hidden gems, and tailored historical narratives directly from registered hosts."
    },
    {
      icon: Compass,
      title: "Smart Destination Search",
      description: "Search ancient temples, thrilling treks, heritage caves, and wildlife spots with filters and real-time timings."
    },
    {
      icon: Map,
      title: "Seamless Travel Planning",
      description: "Explore entry fees, best seasons, parking info, and guide contact details in one unified portal."
    }
  ];

  return (
    <section className="bg-white text-gray-900 py-10 sm:py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-7 sm:mb-8">
          <div className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5">
            PLATFORM FEATURES
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950">
            Empowering Travelers & Local Hosts
          </h2>
        </div>

        {/* 3 Features Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-200 flex flex-col items-start"
              >
                {/* Yellow rounded square icon container */}
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-500 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 stroke-[1.8]" />
                </div>

                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5">
                  {item.title}
                </h3>

                <p className="text-gray-500 text-xs leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
