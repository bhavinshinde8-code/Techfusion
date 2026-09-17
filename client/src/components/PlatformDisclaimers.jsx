import React from 'react';
import { Info, AlertTriangle, ShieldCheck, Compass } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function PlatformDisclaimers() {
  const { t } = useLanguage();

  const disclaimers = [
    {
      icon: AlertTriangle,
      title: t('disc1Title', 'Team Pheonix Ai & Information Disclaimer'),
      description: t('disc1Desc', 'AI generated images are prone to errors in images. It is a purely technical glitch and not intented to harm the sentiments of any indivisual or community.')
    },
    {
      icon: AlertTriangle,
      title: t('disc2Title', 'General Travel & Information Disclaimer'),
      description: t('disc2Desc', 'All destination information, visiting timings, entry fees, and route suggestions provided on this portal are taken from google .Visitors are advised to cross-verify local opening hours and on-ground guidelines prior to traveling.')
    },
    {
      icon: ShieldCheck,
      title: t('disc3Title', 'Local Regulations & Safety Advice'),
      description: t('disc3Desc', 'Travelers are strictly requested to respect monument guidelines, heritage preservation rules, wildlife reserve norms, and local customs. The platform is not liable for itinerary disruptions, weather advisories, or restricted entries.')
    },
    {
      icon: Compass,
      title: t('disc4Title', 'Third-Party & Navigation Services'),
      description: t('disc4Desc', 'External links, map directions, transport details, and accommodation references are provided for convenience. Team Phoenix does not endorse or control third-party service providers.')
    }
  ];

  return (
    <section className="bg-white py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Enclosed Disclaimer Box */}
        <div className="bg-white border border-gray-200/90 rounded-2xl p-5 sm:p-6 shadow-sm">
          
          {/* Header */}
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <div className="text-amber-600 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                {t('disclaimersBadge', 'IMPORTANT NOTICE')}
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                {t('disclaimersTitle', 'Platform & Travel Disclaimers')}
              </h3>
            </div>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-5">
            {disclaimers.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="bg-[#FAFAFB] border border-gray-200/80 rounded-xl p-3.5 flex flex-col justify-start"
                >
                  <div className="w-6 h-6 rounded-md bg-amber-100/60 text-amber-600 flex items-center justify-center mb-2">
                    <Icon className="w-3.5 h-3.5 stroke-[2]" />
                  </div>

                  <h4 className="text-xs font-bold text-gray-900 mb-1 leading-snug">
                    {item.title}
                  </h4>

                  <p className="text-gray-500 text-[11px] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Bottom Bar inside Disclaimer */}
          <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-400 gap-1.5">
            <span>
              {t('discFooter', 'By utilizing this portal, you acknowledge and agree to adhere to standard safety and tourism regulations.')}
            </span>
            <span className="text-amber-600 font-bold shrink-0 text-[11px]">
              {t('sihInitiative', 'SIH Tourism Safety Initiative')}
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
