const SEED_DESTINATIONS = [
  {
    title: "India Gate",
    state: "New Delhi, Delhi",
    category: "UNESCO Heritage",
    era: "1921–1931 CE (British Raj / Colonial Era)",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1920&q=80",
    shortHistory: "A majestic 42-metre-high war memorial archway designed by Sir Edwin Lutyens. Commemorates 84,000 soldiers of the British Indian Army who lost their lives during the First World War.",
    keyPoints: {
      bestTime: "October to March (Evening illuminations)",
      timings: "Open 24/7 (Illuminated 7:00 PM to 11:00 PM)",
      entryFee: "Free Entry",
      highlights: ["Amar Jawan Jyoti eternal flame", "42m triumphal sandstone arch", "Kartavya Path promenade", "Canopy of King George V"],
      nearestTransit: "Central Secretariat Metro Station / IGI Airport New Delhi",
      architecturalStyle: "Triumphal Arch (Neo-Classical / Lutyens Style)"
    },
    timeline: [
      { year: "1921 CE", title: "Foundation Stone Laid", description: "Duke of Connaught lays the foundation stone on 10 February 1921." },
      { year: "1931 CE", title: "Inauguration by Lord Irwin", description: "Viceroy Lord Irwin formally inaugurates the 42-meter memorial archway." },
      { year: "1971 CE", title: "Amar Jawan Jyoti Unveiled", description: "Prime Minister Indira Gandhi dedicates the eternal flame honoring martyred soldiers." },
      { year: "2022 CE", title: "Kartavya Path & Netaji Statue", description: "Redeveloped central vista opens with a 28-foot monolithic black granite statue of Netaji." }
    ],
    longDescription: "The India Gate is a war memorial located astride the Kartavya Path in New Delhi. Designed by Sir Edwin Lutyens, it evokes the Arc de Triomphe in Paris and commemorates 84,000 soldiers."
  },
  {
    title: "Trimbakeshwar Shiva Temple",
    state: "Nashik, Maharashtra",
    category: "Spiritual & Temples",
    era: "1755–1786 CE (Peshwa Balaji Baji Rao)",
    image: "https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=1200&q=80",
    shortHistory: "One of the twelve sacred Jyotirlingas of Lord Shiva and the holy source of the Godavari River. Famed for its unique three-faced lingam embodying Brahma, Vishnu, and Rudra.",
    keyPoints: {
      bestTime: "September to February",
      timings: "5:30 AM to 9:00 PM",
      entryFee: "Free General Entry (VIP Darshan ₹200)",
      highlights: ["Three-faced Jyotirlinga (Tridev)", "Kushavarta sacred kund", "Brahmagiri mountain trek", "Black stone Nagara architecture"],
      nearestTransit: "Nashik Road Railway Station (36 km) / Ozar Airport Nashik",
      architecturalStyle: "Hemadpanthi / Nagara Black Basalt Style"
    },
    timeline: [
      { year: "1755 CE", title: "Peshwa Commission", description: "Peshwa Balaji Baji Rao starts construction of the basalt stone temple." },
      { year: "1786 CE", title: "Temple Consecration", description: "Consecrated after 31 years of sculpting at a cost of 16 lakh rupees." }
    ],
    longDescription: "Trimbakeshwar Shiva Temple is located in Trimbak, Maharashtra. The three faces on the lingam represent Brahma, Vishnu, and Rudra."
  },
  {
    title: "Raigad Fort Citadel",
    state: "Raigad, Maharashtra",
    category: "Forts & Palaces",
    era: "1674 CE (Chhatrapati Shivaji Maharaj)",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    shortHistory: "The legendary capital of the Maratha Empire under Chhatrapati Shivaji Maharaj, soaring 820 metres above sea level in the Sahyadri mountains. Known as the 'Gibraltar of the East'.",
    keyPoints: {
      bestTime: "October to March",
      timings: "6:00 AM to 6:00 PM",
      entryFee: "₹25 (Indians), ₹300 (Foreigners)",
      highlights: ["Maha Darwaja main gate", "Shivaji Maharaj Samadhi", "Takmak Tok cliff drop", "Holi Cha Mal"],
      nearestTransit: "Mangaon Railway Station (45 km) / Pune & Mumbai Airports",
      architecturalStyle: "Hill Fortress Maratha Architecture"
    },
    timeline: [
      { year: "1656 CE", title: "Capture by Shivaji Maharaj", description: "Shivaji Maharaj seizes the fortress and fortifies it as his capital." },
      { year: "1674 CE", title: "Grand Coronation Ceremony", description: "Shivaji Maharaj is crowned Chhatrapati of the sovereign Maratha Empire." }
    ],
    longDescription: "Raigad is a hill fort situated in Mahad, Maharashtra. It was chosen by Chhatrapati Shivaji Maharaj as his capital."
  },
  {
    title: "Taj Mahal",
    state: "Agra, Uttar Pradesh",
    category: "UNESCO Heritage",
    era: "1631–1653 CE (Mughal Empire)",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
    shortHistory: "Commissioned in 1631 by Mughal Emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal. Built entirely of ivory-white Makrana marble.",
    keyPoints: {
      bestTime: "October to March",
      timings: "Sunrise to Sunset (Closed on Fridays)",
      entryFee: "₹50 (Indians), ₹1,100 (Foreign Nationals)",
      highlights: ["Ivory-white marble dome", "Reflecting pool fountains", "Pietra dura floral inlay", "Four minarets"],
      nearestTransit: "Agra Cantt Railway Station (5 km) / Kheria Airport Agra",
      architecturalStyle: "Indo-Islamic Mughal Architecture"
    },
    timeline: [
      { year: "1631 CE", title: "Death of Mumtaz Mahal", description: "Shah Jahan vows to erect an unmatched mausoleum." },
      { year: "1653 CE", title: "Complex Finished", description: "The entire Charbagh garden and marble dome are finished." }
    ],
    longDescription: "The Taj Mahal is an ivory-white marble mausoleum on the south bank of the Yamuna river in Agra."
  }
];

module.exports = { SEED_DESTINATIONS };
