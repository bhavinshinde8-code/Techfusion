import React from 'react';
import { Castle, Flame, Landmark, ArrowRight } from 'lucide-react';

export default function DiscoverIndia({ onFilterCircuit }) {
  const circuits = [
    {
      title: "Royal Forts & Palaces",
      category: "Forts & Palaces",
      badge: "Medieval Chivalry",
      icon: Castle,
      image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
      description: "Explore impregnable desert citadels, Rajput valor, and opulent Mughal court architectures across Amber, Mehrangarh, and Agra."
    },
    {
      title: "Sacred Temples & Ghats",
      category: "Spiritual & Temples",
      badge: "Living Antiquity",
      icon: Flame,
      image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
      description: "Witness thousands of years of uninterrupted devotion along the Holy Ganges in Varanasi, Kanchipuram, and grand Dravidian gopurams."
    },
    {
      title: "Lost Empires & Boulder Ruins",
      category: "UNESCO Heritage",
      badge: "Archaeological Marvels",
      icon: Landmark,
      image: "https://images.unsplash.com/photo-1600100397608-f010f444f479?auto=format&fit=crop&w=800&q=80",
      description: "Walk among the colossal monolithic stone chariot shrines of Hampi (Vijayanagara) and the carved rock sanctuaries of Ajanta and Ellora."
    }
  ];

  return (
    <section id="discoveries" className="py-20 bg-gradient-to-b from-[#0B0F19] via-[#0E1526] to-[#0B0F19] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header (Matches "Feature" from sketch) */}
        <div className="text-center mb-14">
          <div className="text-amber-400 text-xs font-bold uppercase tracking-[0.2em] mb-2">
            Curated Cultural Journeys
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">
            Discover India’s Essence
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Immerse yourself into distinct historical circuits that shaped civilization across thousands of years.
          </p>
        </div>

        {/* 3 Circuit Cards (Matches Sketch 3 Boxes) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {circuits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                onClick={() => onFilterCircuit(item.category)}
                className="group bg-[#111827]/80 border border-white/10 hover:border-amber-500/50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col"
              >
                <div className="relative h-52 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold bg-black/70 backdrop-blur-md text-amber-300 border border-amber-500/30">
                    {item.badge}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 group-hover:bg-amber-500 group-hover:text-black transition">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-serif text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>

                  <div className="mt-auto text-amber-400 text-xs font-semibold flex items-center gap-1.5 group-hover:translate-x-1.5 transition-transform">
                    Explore Circuit <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
