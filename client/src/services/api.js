// Enhanced destinations database including iconic Nashik tourism circuits
const FALLBACK_DESTINATIONS = [
  {
    _id: "trimbakeshwar-temple",
    title: "Trimbakeshwar Shiva Temple",
    state: "Nashik, Maharashtra",
    category: "Spiritual & Temples",
    era: "1755–1786 CE (Peshwa Balaji Baji Rao)",
    image: "/places/trimbakeshwar.jpg",
    shortHistory: "One of the twelve sacred Jyotirlingas of Lord Shiva and the holy source of the Godavari River. Famed for its unique three-faced lingam embodying Brahma, Vishnu, and Rudra crowned with a jewelled crest.",
    keyPoints: {
      bestTime: "September to February (Pleasant weather & Maha Shivratri)",
      timings: "5:30 AM to 9:00 PM",
      entryFee: "Free General Entry (VIP Darshan ₹200)",
      highlights: ["Three-faced Jyotirlinga (Tridev)", "Kushavarta sacred kund", "Brahmagiri mountain trek", "Black stone Nagara architecture"],
      nearestTransit: "Nashik Road Railway Station (36 km) / Ozar Airport Nashik",
      architecturalStyle: "Hemadpanthi / Nagara Black Basalt Style"
    },
    timeline: [
      { year: "Antiquity", title: "Sage Gautama's Penance", description: "According to Hindu tradition, Sage Gautama resides on Brahmagiri hill; Lord Shiva manifests as a Jyotirlinga." },
      { year: "1755 CE", title: "Peshwa Balaji Baji Rao Commission", description: "Third Peshwa Balaji Baji Rao (Nana Saheb) begins building the black basalt stone temple complex." },
      { year: "1786 CE", title: "Consecration of the Sanctum", description: "After 31 years of meticulous stone carving, the magnificent temple is formally consecrated at a cost of 16 lakh rupees." },
      { year: "Modern Era", title: "Kumbh Mela Pilgrimages", description: "Hosts the sacred Simhastha Kumbh Mela every 12 years attracting millions of sadhus and pilgrims." }
    ],
    longDescription: "Trimbakeshwar Shiva Temple is located in the town of Trimbak in the Nashik district of Maharashtra, India. It is dedicated to Shiva and is one of the twelve sacred Jyotirlingas.\n\nThe extraordinary feature of the Jyotirlinga here is its three faces representing Lord Brahma, Lord Vishnu, and Lord Rudra. It is situated at the foothills of the Brahmagiri mountain, where the sacred Godavari river originates from Gangadwar.\n\nThe entire structure is made of basalt black stone, featuring intricate carvings of deities, dancers, and Vedic motifs."
  },
  {
    _id: "sula-vineyards",
    title: "Sula Vineyards & Wine Estate",
    state: "Nashik, Maharashtra",
    category: "Natural & Scenic",
    era: "1999 CE to Present (Pioneering Indian Viticulture)",
    image: "/places/sula-vineyards.jpg",
    shortHistory: "Founded in 1999, Sula pioneered wine tourism in Nashik, transforming the region into the recognized 'Wine Capital of India'. Offers world-class rolling vineyard tours, boutique stays, and the annual SulaFest.",
    keyPoints: {
      bestTime: "October to March (Grape harvesting season Jan–Mar)",
      timings: "11:30 AM to 10:30 PM daily",
      entryFee: "₹400–₹1,000 (Includes wine tasting & guided tour)",
      highlights: ["Vineyard tasting room with panoramic valley view", "Oak barrel cellar tour", "Italian dining at Little Italy", "Grape stomping sessions"],
      nearestTransit: "Nashik Road Station (18 km) / Mumbai International Airport (170 km)",
      architecturalStyle: "Contemporary Eco-Tourism & Tuscan Winery Style"
    },
    timeline: [
      { year: "1999 CE", title: "First Vineyard Planted", description: "Rajeev Samant establishes Sula on his family's 30-acre estate, planting French Sauvignon Blanc and Chenin Blanc varieties." },
      { year: "2000 CE", title: "First Vintage Released", description: "Sula produces its inaugural wine bottles, earning immediate national acclaim for quality Indian wine." },
      { year: "2008 CE", title: "Inaugural SulaFest", description: "Launches the iconic SulaFest gourmet music and wine festival attracting global travelers." },
      { year: "2020s CE", title: "Eco-Sustainability Milestone", description: "Over 70% of winery power transitioned to solar energy, pioneering sustainable agro-tourism." }
    ],
    longDescription: "Sula Vineyards is an Indian winery located in Nashik, Maharashtra, near the panoramic Gangapur Dam lake. Spanning hundreds of lush acres surrounded by Sahyadri hills, Sula put Indian winemaking firmly on the global map.\n\nVisitors walk through state-of-the-art fermentation units, oak barrel aging cellars, and sunlit vineyards while learning grape cultivating nuances from professional sommeliers."
  },
  {
    _id: "pandavleni-caves",
    title: "Pandavleni Buddhist Caves",
    state: "Nashik, Maharashtra",
    category: "Ancient Caves",
    era: "2nd Century BCE – 5th Century CE (Satavahana Dynasty)",
    image: "/places/pandavleni.jpg",
    shortHistory: "A cluster of 24 rock-cut Hinayana Buddhist caves carved into the north-facing slope of Trirashmi hill over 2,000 years ago. Famous for ancient Brahmi inscriptions, viharas (monasteries), and chaityas (prayer halls).",
    keyPoints: {
      bestTime: "July to February (Pleasant breeze and monsoon green hills)",
      timings: "8:30 AM to 5:30 PM",
      entryFee: "₹25 (Indians), ₹300 (Foreigners)",
      highlights: ["Cave 3 (Gautamiputra Vihara with intricate pillar capitals)", "Cave 18 (Ancient Chaitya prayer hall)", "Brahmi stone inscriptions", "Panoramic city view of Nashik"],
      nearestTransit: "Nashik Road Railway Station (9 km) / Pathardi Phata Highway",
      architecturalStyle: "Ancient Rock-Cut Indian Rock Architecture"
    },
    timeline: [
      { year: "c. 250 BCE", title: "Initial Carvings Begin", description: "Buddhist monks begin carving rock sanctuaries on Trirashmi Hill along ancient trade routes." },
      { year: "1st–2nd Century CE", title: "Satavahana Royal Benefaction", description: "Queen Gautami Balashri excavates Cave 3 commemorating her legendary son, Gautamiputra Satakarni." },
      { year: "5th Century CE", title: "Mahayana Iconography Added", description: "Sculptures of Buddha, Bodhisattvas, and celestial attendants are carved within existing viharas." },
      { year: "1900s CE", title: "ASI Preservation", description: "Declared a protected national archaeological monument by the Archaeological Survey of India." }
    ],
    longDescription: "The Pandavleni Caves (also known as Trirashmi Leni) comprise 24 caves carved between the 2nd century BCE and the 5th century CE. Most of the caves are viharas (monasteries with stone beds) where Buddhist monks studied and meditated during rainy seasons.\n\nCave 18 is a magnificent Chaitya hall with a vaulted ceiling, stupa sanctum, and an elaborate arched entrance carved directly from the basalt cliff."
  },
  {
    _id: "anjaneri-hills",
    title: "Anjaneri Hills & Fort",
    state: "Nashik, Maharashtra",
    category: "Natural & Scenic",
    era: "Treta Yuga (Revered Birthplace of Lord Hanuman)",
    image: "/places/anjaneri.jpg",
    shortHistory: "Perched at an elevation of 1,280 meters in the Sahyadri range, Anjaneri is spiritually revered as the sacred birthplace of Lord Hanuman. The scenic plateau trek features Jain rock carvings, misty waterfalls, and the Anjani Mata Temple.",
    keyPoints: {
      bestTime: "July to February (Monsoon waterfalls & cool winter plateau breezes)",
      timings: "6:00 AM to 6:00 PM",
      entryFee: "Free Entry",
      highlights: ["Anjani Mata Temple atop plateau", "Reverse waterfall phenomenon during monsoon", "Ancient Jain rock-cut shrines", "Lake Seeta shaped like a footprint"],
      nearestTransit: "Nashik Road Station (30 km) / Trimbak Road (7 km from Trimbakeshwar)",
      architecturalStyle: "Sahyadri Mountain Fort & Hilltop Shrines"
    },
    timeline: [
      { year: "Ancient Era", title: "Birth of Lord Hanuman", description: "According to Hindu tradition, Mata Anjani performs deep penance on this hilltop; Lord Hanuman is born here." },
      { year: "11th–12th Century CE", title: "Yadava Dynasty Fortifications", description: "Seuna (Yadava) kings construct defensive ramparts, water cisterns, and rock-hewn steps." },
      { year: "Modern Era", title: "Medicinal Plant Conservation", description: "Declared an ecological and medicinal plant reserve home to rare endemic flora and Ceropegia species." }
    ],
    longDescription: "Anjaneri is one of the most picturesque hill forts in the Nashik-Trimbakeshwar range. The trek passes through ancient stone staircases cut into sheer volcanic cliffs, passing 12th-century Jain temples with ornate lintels.\n\nThe summit opens up into a vast high-altitude plateau with Lake Seeta and panoramic views of Brahmagiri mountain and the Godavari valley."
  },
  {
    _id: "ramkund-nashik",
    title: "Ramkund & Godavari Ghats",
    state: "Panchavati, Nashik",
    category: "Spiritual & Temples",
    era: "Treta Yuga to 1696 CE (Chitraro Rao)",
    image: "/places/ramkund.jpg",
    shortHistory: "The sacred focal point of Panchavati along the holy Godavari river. Believed to be the exact spot where Lord Rama bathed during his 14-year exile; hosts the colossal Simhastha Kumbh Mela every 12 years.",
    keyPoints: {
      bestTime: "September to March (Evening Godavari Aarti at sunset)",
      timings: "Open 24 Hours (Daily Aarti at 7:00 PM)",
      entryFee: "Free Entry",
      highlights: ["Evening Godavari Maha Aarti", "Kalaram Temple nearby", "Sita Gumpha (Sita's Cave)", "Sacred Kapaleshwar Temple"],
      nearestTransit: "Nashik Road Railway Station (9 km) / Panchavati Bus Stand",
      architecturalStyle: "Peshwa-Era Stone Ghats & Kund Architecture"
    },
    timeline: [
      { year: "Treta Yuga", title: "Lord Rama's Residence in Panchavati", description: "Rama, Sita, and Lakshmana reside in Panchavati during their vanvas; Rama performs rituals at this pool." },
      { year: "1696 CE", title: "Stone Kund Built by Chitraro Rao", description: "Chitraro Rao Khatarkar constructs the current massive stone embankment around Ramkund." },
      { year: "1782 CE", title: "Kalaram Temple Built", description: "Sardar Rangarao Odhekar constructs the adjacent black-stone Kalaram Temple with 2,000 workers over 12 years." },
      { year: "Present Day", title: "Kumbh Mela Confluence", description: "Millions gather for the sacred Shahi Snan (royal bath) during the 12-year Kumbh cycle." }
    ],
    longDescription: "Ramkund is a sacred bathing ghat located on the banks of the Godavari river in Panchavati, Nashik. According to the Ramayana, Lord Rama bathed here and immersed the ashes of his father, King Dasharatha.\n\nWater from the kund is revered across Maharashtra. At dusk, the ghats glow with thousands of flickering oil lamps floating on the river during the Godavari Aarti, while bells echo from ancient Peshwa-era temples surrounding the riverfront."
  },
  {
    _id: "india-gate",
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
      { year: "1971 CE", title: "Amar Jawan Jyoti Unveiled", description: "Prime Minister Indira Gandhi dedicates the eternal flame honoring martyred soldiers." }
    ],
    longDescription: "The India Gate is a war memorial located astride the Kartavya Path in New Delhi."
  },
  {
    _id: "raigad-fort",
    title: "Raigad Fort Citadel",
    state: "Raigad, Maharashtra",
    category: "Forts & Palaces",
    era: "1674 CE (Chhatrapati Shivaji Maharaj)",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1920&q=80",
    shortHistory: "The legendary capital of the Maratha Empire under Chhatrapati Shivaji Maharaj, soaring 820 metres above sea level in the Sahyadri mountains.",
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
    _id: "taj-mahal",
    title: "Taj Mahal",
    state: "Agra, Uttar Pradesh",
    category: "UNESCO Heritage",
    era: "1631–1653 CE (Mughal Empire)",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1920&q=80",
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

const API_BASE = '/api';

const getHeaders = () => {
  const token = localStorage.getItem('phoenix_jwt');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

export const api = {
  // Destinations
  async getDestinations(search = '', category = 'All') {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category && category !== 'All') params.append('category', category);

      const res = await fetch(`${API_BASE}/destinations?${params.toString()}`);
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      return data.data;
    } catch (err) {
      const local = localStorage.getItem('phoenix_destinations_cache');
      let list = local ? JSON.parse(local) : FALLBACK_DESTINATIONS;
      if (category && category !== 'All') list = list.filter(d => d.category.toLowerCase() === category.toLowerCase());
      if (search) {
        const q = search.toLowerCase();
        list = list.filter(d => d.title.toLowerCase().includes(q) || d.state.toLowerCase().includes(q));
      }
      return list;
    }
  },

  async createDestination(payload) {
    try {
      const res = await fetch(`${API_BASE}/destinations`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to create destination');
      return data.data;
    } catch (err) {
      const local = localStorage.getItem('phoenix_destinations_cache');
      const list = local ? JSON.parse(local) : [...FALLBACK_DESTINATIONS];
      const newD = { _id: 'd-' + Date.now(), ...payload };
      list.unshift(newD);
      localStorage.setItem('phoenix_destinations_cache', JSON.stringify(list));
      return newD;
    }
  },

  async updateDestination(id, payload) {
    try {
      const res = await fetch(`${API_BASE}/destinations/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update destination');
      return data.data;
    } catch (err) {
      const local = localStorage.getItem('phoenix_destinations_cache');
      const list = local ? JSON.parse(local) : [...FALLBACK_DESTINATIONS];
      const idx = list.findIndex(d => d._id === id);
      if (idx > -1) {
        list[idx] = { ...list[idx], ...payload };
        localStorage.setItem('phoenix_destinations_cache', JSON.stringify(list));
        return list[idx];
      }
      return payload;
    }
  },

  async deleteDestination(id) {
    try {
      const res = await fetch(`${API_BASE}/destinations/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete');
      return true;
    } catch (err) {
      const local = localStorage.getItem('phoenix_destinations_cache');
      const list = local ? JSON.parse(local) : [...FALLBACK_DESTINATIONS];
      const filtered = list.filter(d => d._id !== id);
      localStorage.setItem('phoenix_destinations_cache', JSON.stringify(filtered));
      return true;
    }
  },

  // Auth (Strict Database Authentication)
  async login(email, password, role) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Login failed. Account not found in database.');
    }
    return data;
  },

  async register(name, email, password, role) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Registration failed.');
    }
    return data;
  },

  // Inquiries
  async submitInquiry(payload) {
    try {
      const res = await fetch(`${API_BASE}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return await res.json();
    } catch (err) {
      return { success: true, data: { _id: 'inq-' + Date.now(), ...payload } };
    }
  },

  async getInquiries() {
    try {
      const res = await fetch(`${API_BASE}/inquiries`, { headers: getHeaders() });
      const data = await res.json();
      return data.data;
    } catch (err) {
      return [
        {
          _id: 'inq-1',
          name: 'Devendra Verma',
          email: 'devendra@travels.in',
          interest: 'Heritage Walk Itinerary',
          message: 'Looking for a 3-day guided heritage tour across Nashik.',
          createdAt: new Date().toISOString()
        }
      ];
    }
  },

  async getRegisteredUsers() {
    try {
      const res = await fetch(`${API_BASE}/auth/users`, { headers: getHeaders() });
      const data = await res.json();
      return data.data || [];
    } catch (err) {
      return [];
    }
  }
};
