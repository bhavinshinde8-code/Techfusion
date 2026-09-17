/* ==============================================================
   PHOENIX - LET'S KNOW OUR INDIA
   Core Application Engine & Tourism Management System
   ============================================================== */

// --- INITIAL SEED DATABASE OF ICONIC INDIAN HERITAGE DESTINATIONS ---
const INITIAL_PLACES = [
  {
    id: "taj-mahal",
    title: "Taj Mahal",
    state: "Agra, Uttar Pradesh",
    category: "UNESCO Heritage",
    era: "1631–1653 CE (Mughal Empire)",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
    shortHistory: "Commissioned in 1631 by Mughal Emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal. Built entirely of ivory-white Makrana marble, it stands as the jewel of Muslim art in India and an immortal ode to love.",
    keyPoints: {
      bestTime: "October to March (Pleasant weather)",
      timings: "Sunrise to Sunset (Closed on Fridays)",
      entryFee: "₹50 (Indians), ₹1,100 (Foreign Nationals)",
      highlights: ["Ivory-white marble dome", "Reflecting pool fountains", "Pietra dura floral inlay", "Four minarets with optical illusion tilt"],
      nearestTransit: "Agra Cantt Railway Station (5 km) / Kheria Airport Agra",
      architecturalStyle: "Indo-Islamic Mughal Architecture"
    },
    timeline: [
      { year: "1631 CE", title: "Death of Mumtaz Mahal & Vow", description: "Empress Mumtaz Mahal passes away during childbirth in Burhanpur. Shah Jahan vows to erect an unmatched mausoleum." },
      { year: "1632 CE", title: "Construction Commences", description: "Over 20,000 artisans, sculptors, and calligraphers gathered from across India, Persia, and the Ottoman Empire begin construction." },
      { year: "1648 CE", title: "Main Mausoleum Completed", description: "The central marble tomb, minarets, and main dome are completed along the Yamuna riverfront." },
      { year: "1653 CE", title: "Complex Finished", description: "The surrounding Charbagh gardens, the red sandstone mosque, and main gateway (Darwaza-i-rauza) are fully consecrated." },
      { year: "1983 CE", title: "UNESCO World Heritage Inscription", description: "Declared a UNESCO World Heritage Site as 'the jewel of Muslim art in India and one of the universally admired masterpieces'." },
      { year: "2007 CE", title: "New 7 Wonders of the World", description: "Voted globally as one of the New 7 Wonders of the World." }
    ],
    longDescription: `The Taj Mahal is an ivory-white marble mausoleum on the south bank of the Yamuna river in Agra. It was commissioned in 1631 by the fifth Mughal emperor, Shah Jahan (reigned 1628–1658), to house the tomb of his beloved wife, Mumtaz Mahal; it also houses the tomb of Shah Jahan himself.\n\nThe tomb is the centerpiece of a 42-acre complex, which includes a mosque, a guest house, and formal gardens bounded on three sides by a crenellated wall. The building material was sourced from all over India and Central Asia: white Makrana marble from Rajasthan, jasper from Punjab, jade and crystal from China, turquoise from Tibet, lapis lazuli from Afghanistan, and sapphire from Sri Lanka.\n\nThe central dome, often called the onion dome, rises nearly 73 metres (240 ft) high and is surrounded by four smaller domes and four towering minarets deliberately angled slightly outward to protect the central shrine in case of an earthquake.`
  },
  {
    id: "varanasi-ghats",
    title: "Varanasi & Sacred Ganga Ghats",
    state: "Varanasi, Uttar Pradesh",
    category: "Spiritual & Temples",
    era: "c. 1200 BCE to Present (Living Antiquity)",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
    shortHistory: "Regarded as one of the world's oldest continuously inhabited cities and the spiritual capital of India. Along the holy river Ganga, 88 historic stone ghats host daily dawn rituals, sacred cremations, and the famed evening Ganga Aarti.",
    keyPoints: {
      bestTime: "November to February (Cool breeze & festive Dev Deepawali)",
      timings: "Open 24/7 (Ganga Aarti at 6:30 PM daily)",
      entryFee: "Free access to ghats (Boat rides ₹200–₹1,000)",
      highlights: ["Dashashwamedh Ghat Aarti", "Subah-e-Banaras sunrise boat ride", "Kashi Vishwanath Corridor", "Assi Ghat morning meditation"],
      nearestTransit: "Varanasi Junction (BSB) / Lal Bahadur Shastri International Airport (VNS)",
      architecturalStyle: "Ancient Riverfront Stone Embankments & Nagara Temples"
    },
    timeline: [
      { year: "1200 BCE", title: "Vedic Settlements Form", description: "Early Vedic scholars establish ashrams along the sacred Varuna and Assi rivers." },
      { year: "528 BCE", title: "Lord Buddha's First Sermon at Sarnath", description: "Gautama Buddha delivers his first sermon (Dhammacakkappavattana Sutta) just 10 km from Varanasi." },
      { year: "8th Century CE", title: "Adi Shankara Visits Kashi", description: "Philosopher Adi Shankara establishes Shaivite theological dominance and revives Hindu philosophical debates." },
      { year: "1777 CE", title: "Ahilyabai Holkar Rebuilds Kashi Vishwanath", description: "The legendary Queen of Malwa reconstructs the grand Kashi Vishwanath temple after earlier destructions." },
      { year: "2021 CE", title: "Kashi Vishwanath Corridor Inauguration", description: "A state-of-the-art 500,000 sq ft pedestrian corridor connects the shrine directly to the sacred Ganga." }
    ],
    longDescription: `Varanasi, also known as Kashi and Benares, is the cultural heart of northern India. Mark Twain famously described it: 'Benares is older than history, older than tradition, older even than legend, and looks twice as old as all of them put together.'\n\nThe city's 88 ghats represent steps leading directly into the sacred waters of the Ganges. Pilgrims take purifying dips believing that bathing in the Ganges washes away sins, and dying in Kashi grants Moksha (liberation from the cycle of rebirth).\n\nEvery evening at dusk, Dashashwamedh Ghat hosts the majestic Ganga Aarti, where priests in ceremonial robes wield brass lamps billowing incense and light to Vedic chants heard across the river.`
  },
  {
    id: "amber-fort-jaipur",
    title: "Amer Fort & Palace",
    state: "Jaipur, Rajasthan",
    category: "Forts & Palaces",
    era: "1592 CE (Kachwaha Rajput Dynasty)",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    shortHistory: "Perched high on the Aravalli Hills overlooking Maota Lake, Amer Fort is celebrated for its artistic Hindu-Rajput architectural elements, sprawling courtyards, and the glittering Sheesh Mahal (Mirror Palace).",
    keyPoints: {
      bestTime: "October to March (Rajasthan winter)",
      timings: "9:00 AM to 5:00 PM / Night Viewing 6:30 PM to 9:15 PM",
      entryFee: "₹100 (Indians), ₹500 (Foreigners)",
      highlights: ["Sheesh Mahal (Glass Mirror Palace)", "Diwan-e-Aam audience hall", "Ganesh Pol gateway", "Panoramic view of Maota Lake"],
      nearestTransit: "Jaipur International Airport (JAI) / Jaipur Junction Railway Station (13 km)",
      architecturalStyle: "Rajput-Mughal Fusion Architecture"
    },
    timeline: [
      { year: "1592 CE", title: "Raja Man Singh I Begins Construction", description: "Commander-in-chief of Emperor Akbar's army, Raja Man Singh I, starts building the hilltop citadel on remnants of an earlier Meena fort." },
      { year: "1620–1667 CE", title: "Expansions under Mirza Raja Jai Singh", description: "The iconic Sheesh Mahal and Jai Mandir courtyard are embellished with Belgian glass mosaics." },
      { year: "1727 CE", title: "Capital Shifts to Jaipur City", description: "Maharaja Sawai Jai Singh II founds the planned city of Jaipur down in the plains, retaining Amer as the royal defensive citadel." },
      { year: "2013 CE", title: "UNESCO Hill Forts Recognition", description: "Inscribed as a UNESCO World Heritage Site as part of the group of Hill Forts of Rajasthan." }
    ],
    longDescription: `Amer Fort is situated atop Cheel ka Teela (Hill of Eagles) in Amer town, 11 kilometres from Jaipur. Built with red sandstone and marble, the fort is divided into four main sections, each with its own entry gate and courtyard.\n\nThe primary entrance is through the grand Suraj Pol (Sun Gate) leading into Jaleb Chowk. The crowning jewel of the palace is the Sheesh Mahal (Palace of Mirrors), constructed with convex glass mirrors imported from Belgium that reflect a single candle's flame across the ceiling like a starry night sky.`
  },
  {
    id: "hampi-ruins",
    title: "Hampi & Vijayanagara Citadel",
    state: "Vijayanagara, Karnataka",
    category: "UNESCO Heritage",
    era: "1336–1565 CE (Vijayanagara Empire)",
    image: "https://images.unsplash.com/photo-1600100397608-f010f444f479?auto=format&fit=crop&w=1200&q=80",
    shortHistory: "The legendary capital of the Vijayanagara Empire, Hampi was once the second-largest city in the medieval world after Beijing. Spanning across 4,100 hectares of otherworldly boulder-strewn landscapes, it preserves over 1,600 surviving monuments.",
    keyPoints: {
      bestTime: "November to February",
      timings: "6:00 AM to 6:00 PM daily",
      entryFee: "₹40 (Indians), ₹600 (Foreigners)",
      highlights: ["Stone Chariot at Vittala Temple", "Virupaksha Temple", "Musical Pillars", "Lotus Mahal & Elephant Stables"],
      nearestTransit: "Hosapete Railway Station (13 km) / Jindal Vijaynagar Airport (35 km)",
      architecturalStyle: "Dravidian Vijayanagara Architecture"
    },
    timeline: [
      { year: "1336 CE", title: "Empire Founded by Harihara & Bukka", description: "The brothers Harihara and Bukka establish the Vijayanagara Empire under the guidance of Saint Vidyaranya." },
      { year: "1509–1529 CE", title: "Golden Era of Emperor Krishnadevaraya", description: "Under Krishnadevaraya, the empire reaches its political and cultural zenith. Trade in diamonds, horses, and silks attracts Portuguese and Persian merchants." },
      { year: "1565 CE", title: "Battle of Talikota", description: "A coalition of Deccan Sultanates defeats Vijayanagara; the city is sacked and pillaged for six months, leaving behind the romantic ruins seen today." },
      { year: "1986 CE", title: "UNESCO World Heritage Site", description: "Hampi is declared a UNESCO World Heritage Site for its exceptional architectural and archaeological integrity." }
    ],
    longDescription: `Hampi, located along the Tungabhadra River, represents one of the most surreal and captivating archaeological landscapes on earth. In the 15th and 16th centuries, Portuguese chroniclers Domingo Paes and Fernão Nunes described Vijayanagara as a city of unimaginable opulence, where rubies, diamonds, and pearls were sold openly in street bazaars.\n\nThe Vittala Temple complex features the world-renowned stone chariot (Garuda shrine), carved from granite blocks so precisely fitted that joints are invisible, and 56 musical pillars that emit distinct acoustic swaras when gently tapped.`
  },
  {
    id: "qutub-minar-delhi",
    title: "Qutub Minar & Mehrauli Complex",
    state: "New Delhi, Delhi",
    category: "UNESCO Heritage",
    era: "1192–1220 CE (Delhi Sultanate)",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
    shortHistory: "At 72.5 meters tall, the Qutub Minar is the world's tallest brick minaret. Constructed of fluted red sandstone and marble, the complex includes the enigmatic 4th-century rust-resistant Iron Pillar of Chandragupta II.",
    keyPoints: {
      bestTime: "October to March",
      timings: "7:00 AM to 9:00 PM (Lit up at night)",
      entryFee: "₹40 (Indians), ₹600 (Foreigners)",
      highlights: ["72.5m brick minaret", "Rust-resistant 4th-century Iron Pillar", "Alai Darwaza gateway", "Quwwat-ul-Islam Mosque"],
      nearestTransit: "Qutab Minar Metro Station (Yellow Line) / IGI Airport New Delhi",
      architecturalStyle: "Indo-Islamic Afghan Style"
    },
    timeline: [
      { year: "1192 CE", title: "Foundation by Qutb-ud-din Aibak", description: "Qutb-ud-din Aibak, founder of the Delhi Sultanate, commences the minaret to mark victory and call faithful to prayer." },
      { year: "1220 CE", title: "Superstructure Added by Iltutmish", description: "Shams-ud-din Iltutmish adds three more fluted red sandstone storeys to complete the monumental tower." },
      { year: "1368 CE", title: "Restoration by Firoz Shah Tughlaq", description: "Following a lightning strike, Firoz Shah repairs the upper storeys with white marble accents." },
      { year: "1993 CE", title: "UNESCO Recognition", description: "Inscribed as a World Heritage Monument representing the architectural dawn of Islamic rule in Northern India." }
    ],
    longDescription: `The Qutub Minar complex stands as an open-air museum of medieval Delhi's evolving dynasties. The minaret itself tapers from a 14.3-meter base diameter to 2.7 meters at its peak, adorned with intricate geometric lattice bands and Quranic inscriptions.\n\nWithin the courtyard stands the 1,600-year-old Gupta-era Iron Pillar, standing 7.2 meters tall and weighing over six tons. Despite enduring Delhi's monsoons and intense summer heat for over a millennium and a half, the high-purity forge-welded iron remains completely rust-free, showcasing the astonishing metallurgy of ancient India.`
  },
  {
    id: "khajuraho-temples",
    title: "Khajuraho Group of Monuments",
    state: "Chhatarpur, Madhya Pradesh",
    category: "UNESCO Heritage",
    era: "950–1050 CE (Chandela Dynasty)",
    image: "https://images.unsplash.com/photo-1600100397608-f010f444f479?auto=format&fit=crop&w=1200&q=80",
    shortHistory: "Famed globally for their nagara-style architectural symbolism and intricate erotic stone sculptures, the Khajuraho temples celebrate life, spirituality, celestial musicians, and divine cosmic harmony.",
    keyPoints: {
      bestTime: "October to March (Annual Khajuraho Dance Festival in Feb)",
      timings: "Sunrise to Sunset",
      entryFee: "₹40 (Indians), ₹600 (Foreigners)",
      highlights: ["Kandariya Mahadeva Temple", "Lakshmana Temple carvings", "Light & Sound Show in evening", "Khajuraho Dance Festival"],
      nearestTransit: "Khajuraho Airport (HJR) / Khajuraho Railway Station",
      architecturalStyle: "Nagara Style Sandstone Temple Architecture"
    },
    timeline: [
      { year: "950 CE", title: "Chandela Kings Begin Building", description: "The Rajput Chandela dynasty initiates the construction of an ambitious cluster of 85 sandstone temples." },
      { year: "1030 CE", title: "Kandariya Mahadeva Dedicated", description: "King Vidyadhara completes the grandest temple dedicated to Lord Shiva, soaring 31 meters high with 872 carved figures." },
      { year: "13th Century CE", title: "Abandonment & Forest Reclamation", description: "Following the decline of the Chandelas, dense central Indian forests swallow and protect the temples from destruction." },
      { year: "1838 CE", title: "Rediscovery by T.S. Burt", description: "British army engineer Captain T.S. Burt is guided through the wilderness by local villagers to rediscover the surviving 25 temples." }
    ],
    longDescription: `The temples of Khajuraho are an architectural triumph that express the four goals of human life in Hindu philosophy: Dharma, Artha, Kama, and Moksha. Contrary to common myths, only about 10% of the external carvings depict erotic motifs; the remaining 90% portray the rich everyday life of medieval India—farmers, court musicians, warriors, dancers applying cosmetics, and mythical beasts.\n\nConstructed from fine-grained sandstone without mortar, the stones are joined with mortise and tenon joints, remaining intact and sturdy after over a thousand years.`
  }
];

// --- LOCAL STORAGE & APPLICATION STATE ---
let placesData = [];
let currentUser = null; // { name, email, role: 'user' | 'admin' }
let favoritePlaceIds = [];
let inquiriesData = [];
let currentAuthMode = 'login'; // 'login' | 'signup'
let activeFilterCategory = 'All';

// Load saved data or initialize
function initAppState() {
  const savedPlaces = localStorage.getItem('phoenix_places');
  if (savedPlaces) {
    try {
      placesData = JSON.parse(savedPlaces);
    } catch (e) {
      placesData = [...INITIAL_PLACES];
    }
  } else {
    placesData = [...INITIAL_PLACES];
    savePlacesToStorage();
  }

  const savedFavs = localStorage.getItem('phoenix_favorites');
  if (savedFavs) {
    try { favoritePlaceIds = JSON.parse(savedFavs); } catch(e) { favoritePlaceIds = []; }
  }

  const savedUser = localStorage.getItem('phoenix_user');
  if (savedUser) {
    try { currentUser = JSON.parse(savedUser); } catch(e) { currentUser = null; }
  }

  const savedInquiries = localStorage.getItem('phoenix_inquiries');
  if (savedInquiries) {
    try { inquiriesData = JSON.parse(savedInquiries); } catch(e) { inquiriesData = []; }
  } else {
    inquiriesData = [
      {
        id: "inq-1",
        name: "Devendra Verma",
        email: "devendra@travels.in",
        interest: "Heritage Walk Itinerary",
        message: "Looking for a 3-day guided heritage tour across the Amber and Mehrangarh royal forts in Rajasthan.",
        date: "2026-09-15"
      },
      {
        id: "inq-2",
        name: "Sarah Jenkins",
        email: "sarah.j@wanderlust.com",
        interest: "Historical Timeline Research",
        message: "Can you provide more academic documentation on the architectural timeline of the Hampi Stone Chariot?",
        date: "2026-09-16"
      }
    ];
    localStorage.setItem('phoenix_inquiries', JSON.stringify(inquiriesData));
  }

  updateAuthUI();
  renderTopDestinations();
  renderUserDashboard(placesData);
  updateFavoritesCount();
}

function savePlacesToStorage() {
  localStorage.setItem('phoenix_places', JSON.stringify(placesData));
}

function saveFavoritesToStorage() {
  localStorage.setItem('phoenix_favorites', JSON.stringify(favoritePlaceIds));
  updateFavoritesCount();
}

function updateFavoritesCount() {
  const count = favoritePlaceIds.length;
  const favCountEl = document.getElementById('favCount');
  const userDashFavEl = document.getElementById('userDashFavCount');
  if (favCountEl) favCountEl.innerText = count;
  if (userDashFavEl) userDashFavEl.innerText = count;
}

// --- VIEW NAVIGATION CONTROLLER ---
function switchView(viewName) {
  // Hide all views
  document.querySelectorAll('.view-section').forEach(view => {
    view.classList.remove('active');
  });

  const landing = document.getElementById('landingView');
  const userDash = document.getElementById('userDashboardView');
  const adminDash = document.getElementById('adminDashboardView');

  // Close dropdown if open
  const dropdown = document.getElementById('dropdownMenu');
  if (dropdown) dropdown.classList.remove('show');

  if (viewName === 'landing') {
    landing.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (viewName === 'user-dashboard') {
    userDash.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderUserDashboard(placesData);
  } else if (viewName === 'admin-dashboard') {
    if (!currentUser || currentUser.role !== 'admin') {
      showToast('Admin privilege required. Log in as Admin to access management.', 'info');
      quickDemoLogin('admin');
      return;
    }
    adminDash.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderAdminDashboard();
  }
}

function smoothScroll(elementId) {
  const el = document.getElementById(elementId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

function requireAuth(targetView = 'user') {
  if (!currentUser) {
    openAuthModal('login');
    showToast('Please log in to explore the interactive dashboard.', 'info');
  } else {
    if (targetView === 'admin') {
      if (currentUser.role === 'admin') switchView('admin-dashboard');
      else showToast('You are logged in as a standard user. Admin access required.', 'info');
    } else {
      switchView('user-dashboard');
    }
  }
}

// --- AUTHENTICATION & ROLE MANAGEMENT ---
function openAuthModal(mode = 'login') {
  currentAuthMode = mode;
  setAuthMode(mode);
  document.getElementById('authModal').classList.add('show');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('show');
}

function setAuthMode(mode) {
  currentAuthMode = mode;
  const tabLogin = document.getElementById('tabLogin');
  const tabSignup = document.getElementById('tabSignup');
  const nameGroup = document.getElementById('nameGroup');
  const submitBtn = document.getElementById('authSubmitBtn');

  if (mode === 'login') {
    tabLogin.classList.add('active');
    tabSignup.classList.remove('active');
    nameGroup.style.display = 'none';
    submitBtn.innerHTML = '<i class="fa-solid fa-arrow-right-to-bracket"></i> Continue to Phoenix';
  } else {
    tabLogin.classList.remove('active');
    tabSignup.classList.add('active');
    nameGroup.style.display = 'block';
    submitBtn.innerHTML = '<i class="fa-solid fa-user-plus"></i> Create Phoenix Account';
  }
}

function quickDemoLogin(role = 'user') {
  if (role === 'admin') {
    currentUser = {
      name: 'Aditya Rajput (Admin)',
      email: 'admin@phoenix-tourism.in',
      role: 'admin'
    };
    showToast('👑 Logged in as Admin! Full management suite unlocked.', 'success');
  } else {
    currentUser = {
      name: 'Pooja Sharma',
      email: 'pooja.traveler@example.com',
      role: 'user'
    };
    showToast('✨ Logged in as Traveler! Welcome to Phoenix.', 'success');
  }
  localStorage.setItem('phoenix_user', JSON.stringify(currentUser));
  closeModal('authModal');
  updateAuthUI();

  if (role === 'admin') {
    switchView('admin-dashboard');
  } else {
    switchView('user-dashboard');
  }
}

function handleAuthSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('authEmail').value.trim();
  const role = document.getElementById('authRole').value;
  const name = currentAuthMode === 'signup' 
    ? (document.getElementById('authName').value.trim() || 'Traveler')
    : (email.split('@')[0]);

  currentUser = { name, email, role };
  localStorage.setItem('phoenix_user', JSON.stringify(currentUser));
  closeModal('authModal');
  updateAuthUI();

  showToast(`Welcome back, ${name}! Logged in as ${role.toUpperCase()}.`, 'success');

  if (role === 'admin') {
    switchView('admin-dashboard');
  } else {
    switchView('user-dashboard');
  }
}

function logout() {
  currentUser = null;
  localStorage.removeItem('phoenix_user');
  updateAuthUI();
  switchView('landing');
  showToast('You have been logged out successfully.', 'info');
}

function updateAuthUI() {
  const authActions = document.getElementById('authActions');
  const userMenu = document.getElementById('userMenu');
  const adminLink = document.getElementById('adminLink');
  const switchToAdminBtn = document.getElementById('switchToAdminBtn');

  if (currentUser) {
    authActions.style.display = 'none';
    userMenu.classList.remove('hidden');

    document.getElementById('navUserName').innerText = currentUser.name;
    document.getElementById('navUserRole').innerText = currentUser.role.toUpperCase();
    document.getElementById('dropdownEmail').innerText = currentUser.email;
    document.getElementById('navAvatar').innerText = currentUser.name.charAt(0).toUpperCase();

    if (currentUser.role === 'admin') {
      adminLink.classList.remove('hidden');
      if (switchToAdminBtn) switchToAdminBtn.style.display = 'inline-flex';
    } else {
      adminLink.classList.add('hidden');
      if (switchToAdminBtn) switchToAdminBtn.style.display = 'none';
    }
  } else {
    authActions.style.display = 'flex';
    userMenu.classList.add('hidden');
    if (switchToAdminBtn) switchToAdminBtn.style.display = 'none';
  }
}

function toggleDropdown() {
  const menu = document.getElementById('dropdownMenu');
  menu.classList.toggle('show');
}

function toggleMobileNav() {
  const nav = document.querySelector('.nav-links');
  if (nav.style.display === 'flex') {
    nav.style.display = 'none';
  } else {
    nav.style.display = 'flex';
    nav.style.flexDirection = 'column';
    nav.style.position = 'absolute';
    nav.style.top = '100%';
    nav.style.left = '0';
    nav.style.width = '100%';
    nav.style.background = 'rgba(11, 15, 25, 0.98)';
    nav.style.padding = '20px';
    nav.style.borderBottom = '1px solid var(--border-gold)';
  }
}

// Close dropdown on outside click
window.addEventListener('click', (e) => {
  const userBadge = document.querySelector('.user-badge');
  const dropdownMenu = document.getElementById('dropdownMenu');
  if (dropdownMenu && !dropdownMenu.contains(e.target) && !userBadge?.contains(e.target)) {
    dropdownMenu.classList.remove('show');
  }
});

// --- RENDER LANDING PAGE TOP DESTINATIONS (Matches Sketch 3 boxes) ---
function renderTopDestinations(filterCat = 'all') {
  const container = document.getElementById('topDestinationsGrid');
  if (!container) return;

  let filtered = placesData;
  if (filterCat !== 'all') {
    filtered = placesData.filter(p => p.category.toLowerCase() === filterCat.toLowerCase());
  }

  // Show up to 6 on landing page
  const displayItems = filtered.slice(0, 6);

  container.innerHTML = displayItems.map(place => {
    const isFav = favoritePlaceIds.includes(place.id);
    return `
      <div class="dest-card" onclick="openPlaceDetails('${place.id}')">
        <div class="dest-card-image-wrap">
          <img src="${place.image}" alt="${place.title}" loading="lazy">
          <span class="dest-category-badge">${place.category}</span>
          <button class="dest-fav-btn ${isFav ? 'active' : ''}" title="Save place" onclick="toggleFavorite('${place.id}', event)">
            <i class="fa-${isFav ? 'solid' : 'regular'} fa-heart"></i>
          </button>
        </div>
        <div class="dest-card-body">
          <div class="dest-location">
            <i class="fa-solid fa-location-dot"></i> ${place.state}
          </div>
          <h3 class="dest-title">${place.title}</h3>
          <p class="dest-summary">${place.shortHistory}</p>
          <div class="dest-highlights">
            ${place.keyPoints.highlights.slice(0, 3).map(h => `<span class="highlight-tag">${h}</span>`).join('')}
          </div>
          <div class="dest-card-footer">
            <span class="dest-timeline-indicator">
              <i class="fa-solid fa-timeline"></i> ${place.timeline.length} Timeline Milestones
            </span>
            <button class="btn-explore-details" onclick="openPlaceDetails('${place.id}')">
              Explore <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function filterLandingPlaces(cat, btnElement) {
  if (btnElement) {
    document.querySelectorAll('.category-pills .pill').forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');
  }
  renderTopDestinations(cat);
}

function filterByCircuit(categoryName) {
  switchView('user-dashboard');
  setDashboardFilter(categoryName);
}

// --- HERO SEARCH HANDLERS ---
function handleHeroSearchKey(event) {
  if (event.key === 'Enter') {
    triggerHeroSearch();
  }
}

function triggerHeroSearch() {
  const query = document.getElementById('heroSearchInput').value.trim();
  switchView('user-dashboard');
  const dashInput = document.getElementById('dashSearchInput');
  if (dashInput) {
    dashInput.value = query;
    handleDashSearch(query);
  }
}

// --- USER DASHBOARD SEARCH & EXPLORATION ---
function renderUserDashboard(items) {
  const container = document.getElementById('userDestinationsGrid');
  const statusEl = document.getElementById('resultsCountText');
  if (!container) return;

  if (items.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: span 3;">
        <i class="fa-solid fa-compass-drafting"></i>
        <h3>No destinations found</h3>
        <p>Try searching for a different place, monument name, or Indian state.</p>
        <button class="btn btn-gold" onclick="clearSearch()" style="margin-top: 16px;">View All Places</button>
      </div>
    `;
    if (statusEl) statusEl.innerText = 'No destinations matched your criteria';
    return;
  }

  if (statusEl) {
    statusEl.innerText = `Showing ${items.length} destination${items.length > 1 ? 's' : ''}`;
  }

  container.innerHTML = items.map(place => {
    const isFav = favoritePlaceIds.includes(place.id);
    return `
      <div class="dest-card" onclick="openPlaceDetails('${place.id}')">
        <div class="dest-card-image-wrap">
          <img src="${place.image}" alt="${place.title}" loading="lazy">
          <span class="dest-category-badge">${place.category}</span>
          <button class="dest-fav-btn ${isFav ? 'active' : ''}" title="Save place" onclick="toggleFavorite('${place.id}', event)">
            <i class="fa-${isFav ? 'solid' : 'regular'} fa-heart"></i>
          </button>
        </div>
        <div class="dest-card-body">
          <div class="dest-location">
            <i class="fa-solid fa-location-dot"></i> ${place.state}
          </div>
          <h3 class="dest-title">${place.title}</h3>
          <p class="dest-summary">${place.shortHistory}</p>
          <div class="dest-highlights">
            ${place.keyPoints.highlights.slice(0, 3).map(h => `<span class="highlight-tag">${h}</span>`).join('')}
          </div>
          <div class="dest-card-footer">
            <span class="dest-timeline-indicator">
              <i class="fa-solid fa-clock-rotate-left"></i> ${place.era}
            </span>
            <button class="btn-explore-details" onclick="openPlaceDetails('${place.id}')">
              View Timeline & Info <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function handleDashSearch(query) {
  const clearBtn = document.getElementById('clearSearchBtn');
  if (clearBtn) clearBtn.style.display = query ? 'block' : 'none';

  applyFiltersAndSearch();
}

function clearSearch() {
  const dashInput = document.getElementById('dashSearchInput');
  if (dashInput) dashInput.value = '';
  const clearBtn = document.getElementById('clearSearchBtn');
  if (clearBtn) clearBtn.style.display = 'none';
  applyFiltersAndSearch();
}

function setDashboardFilter(category, btnElement) {
  activeFilterCategory = category;
  if (btnElement) {
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    btnElement.classList.add('active');
  } else {
    // Synchronize UI chip
    document.querySelectorAll('.filter-chip').forEach(c => {
      if (c.innerText.toLowerCase() === category.toLowerCase()) c.classList.add('active');
      else c.classList.remove('active');
    });
  }
  applyFiltersAndSearch();
}

function applyFiltersAndSearch() {
  const query = (document.getElementById('dashSearchInput')?.value || '').toLowerCase().trim();

  let results = placesData.filter(place => {
    const matchesCategory = (activeFilterCategory === 'All' || place.category.toLowerCase() === activeFilterCategory.toLowerCase());
    
    if (!matchesCategory) return false;

    if (!query) return true;

    const inTitle = place.title.toLowerCase().includes(query);
    const inState = place.state.toLowerCase().includes(query);
    const inHistory = place.shortHistory.toLowerCase().includes(query);
    const inEra = place.era.toLowerCase().includes(query);
    const inHighlights = place.keyPoints.highlights.some(h => h.toLowerCase().includes(query));

    return inTitle || inState || inHistory || inEra || inHighlights;
  });

  renderUserDashboard(results);
}

// --- PLACE DETAILS MODAL (Photo Gallery, Short History, Key Points, Timeline, Long Description) ---
function openPlaceDetails(placeId) {
  const place = placesData.find(p => p.id === placeId);
  if (!place) return;

  const isFav = favoritePlaceIds.includes(place.id);
  const contentEl = document.getElementById('placeDetailsContent');

  contentEl.innerHTML = `
    <!-- Top Hero Image Banner -->
    <div class="details-hero-banner">
      <img src="${place.image}" alt="${place.title}">
      <div class="details-hero-overlay">
        <div class="details-badge-row">
          <span class="dest-category-badge">${place.category}</span>
          <span class="dest-category-badge" style="background: rgba(16, 185, 129, 0.2); border-color: rgba(16, 185, 129, 0.4); color: #34d399;">
            <i class="fa-solid fa-hourglass-half"></i> ${place.era}
          </span>
        </div>
        <h2 class="details-place-title">${place.title}</h2>
        <div class="details-location-sub">
          <i class="fa-solid fa-location-dot"></i> ${place.state}
        </div>
      </div>
    </div>

    <!-- Body Content With Tabs -->
    <div class="details-body-wrapper">
      <div class="details-tabs-nav">
        <button class="details-tab-btn active" onclick="switchDetailTab('overview', this)">
          <i class="fa-solid fa-book-open"></i> History & Overview
        </button>
        <button class="details-tab-btn" onclick="switchDetailTab('keypoints', this)">
          <i class="fa-solid fa-list-check"></i> Key Visitor Points
        </button>
        <button class="details-tab-btn" onclick="switchDetailTab('timeline', this)">
          <i class="fa-solid fa-timeline"></i> Historical Timeline (${place.timeline.length})
        </button>
        <button class="details-tab-btn" onclick="switchDetailTab('description', this)">
          <i class="fa-solid fa-feather"></i> Long Description
        </button>
      </div>

      <!-- Tab 1: Overview & Short History -->
      <div id="tab-overview" class="details-tab-pane active">
        <h4 class="section-headline">Short History & Origin</h4>
        <div class="short-history-highlight-box">
          ${place.shortHistory}
        </div>

        <h4 class="section-headline">At a Glance Highlights</h4>
        <div class="dest-highlights" style="margin-bottom: 24px;">
          ${place.keyPoints.highlights.map(h => `<span class="highlight-tag" style="font-size: 0.85rem; padding: 6px 14px;"><i class="fa-solid fa-check" style="color:var(--emerald)"></i> ${h}</span>`).join('')}
        </div>

        <div style="display: flex; gap: 12px; margin-top: 20px;">
          <button class="btn btn-gold" onclick="toggleFavorite('${place.id}', event)">
            <i class="fa-${isFav ? 'solid' : 'regular'} fa-heart"></i> ${isFav ? 'Saved to Wishlist' : 'Add to My Wishlist'}
          </button>
          <button class="btn btn-outline" onclick="switchDetailTab('timeline', document.querySelectorAll('.details-tab-btn')[2])">
            <i class="fa-solid fa-clock-rotate-left"></i> View Historical Timeline
          </button>
        </div>
      </div>

      <!-- Tab 2: Key Visitor Points -->
      <div id="tab-keypoints" class="details-tab-pane">
        <div class="key-points-grid">
          <div class="key-point-card">
            <div class="kp-icon"><i class="fa-solid fa-calendar-check"></i></div>
            <div>
              <div class="kp-title">Best Time to Visit</div>
              <div class="kp-value">${place.keyPoints.bestTime}</div>
            </div>
          </div>

          <div class="key-point-card">
            <div class="kp-icon"><i class="fa-solid fa-clock"></i></div>
            <div>
              <div class="kp-title">Visiting Timings</div>
              <div class="kp-value">${place.keyPoints.timings}</div>
            </div>
          </div>

          <div class="key-point-card">
            <div class="kp-icon"><i class="fa-solid fa-ticket"></i></div>
            <div>
              <div class="kp-title">Entry Fee</div>
              <div class="kp-value">${place.keyPoints.entryFee}</div>
            </div>
          </div>

          <div class="key-point-card">
            <div class="kp-icon"><i class="fa-solid fa-archway"></i></div>
            <div>
              <div class="kp-title">Architectural Style</div>
              <div class="kp-value">${place.keyPoints.architecturalStyle || 'Classical Indian Architecture'}</div>
            </div>
          </div>

          <div class="key-point-card" style="grid-column: span 2;">
            <div class="kp-icon"><i class="fa-solid fa-plane-departure"></i></div>
            <div>
              <div class="kp-title">Nearest Airport & Rail Connectivity</div>
              <div class="kp-value">${place.keyPoints.nearestTransit}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab 3: Historical Timeline -->
      <div id="tab-timeline" class="details-tab-pane">
        <div class="timeline-container">
          <div class="timeline-spine"></div>
          ${place.timeline.map((item, idx) => `
            <div class="timeline-item">
              <div class="timeline-node"></div>
              <div class="timeline-card">
                <span class="timeline-year">${item.year}</span>
                <h4 class="timeline-event-title">${item.title}</h4>
                <p class="timeline-event-desc">${item.description}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Tab 4: Long Description -->
      <div id="tab-description" class="details-tab-pane">
        <h4 class="section-headline">Comprehensive Historical & Cultural Insights</h4>
        <div class="long-description-text">${place.longDescription}</div>
      </div>
    </div>
  `;

  document.getElementById('placeDetailsModal').classList.add('show');
}

function switchDetailTab(tabName, btnElement) {
  document.querySelectorAll('.details-tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.details-tab-pane').forEach(pane => pane.classList.remove('active'));

  if (btnElement) btnElement.classList.add('active');
  const targetPane = document.getElementById(`tab-${tabName}`);
  if (targetPane) targetPane.classList.add('active');
}

// --- WISHLIST / FAVORITES ---
function toggleFavorite(placeId, event) {
  if (event) event.stopPropagation();

  if (!currentUser) {
    openAuthModal('login');
    showToast('Please login to save places to your wishlist.', 'info');
    return;
  }

  const idx = favoritePlaceIds.indexOf(placeId);
  const place = placesData.find(p => p.id === placeId);
  const title = place ? place.title : 'Place';

  if (idx > -1) {
    favoritePlaceIds.splice(idx, 1);
    showToast(`Removed "${title}" from your saved places.`, 'info');
  } else {
    favoritePlaceIds.push(placeId);
    showToast(`Added "${title}" to your saved wishlist! ❤️`, 'success');
  }

  saveFavoritesToStorage();
  renderTopDestinations();
  applyFiltersAndSearch();
}

function openFavoritesModal() {
  const container = document.getElementById('favoritesListContainer');
  const favPlaces = placesData.filter(p => favoritePlaceIds.includes(p.id));

  if (favPlaces.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fa-regular fa-heart"></i>
        <h3>Your Wishlist is Empty</h3>
        <p>Explore Indian destinations and click the heart icon to save places for your upcoming adventures.</p>
        <button class="btn btn-gold" onclick="closeModal('favoritesModal'); switchView('user-dashboard');" style="margin-top:14px;">
          Explore Destinations
        </button>
      </div>
    `;
  } else {
    container.innerHTML = favPlaces.map(place => `
      <div class="dest-card" onclick="closeModal('favoritesModal'); openPlaceDetails('${place.id}')">
        <div class="dest-card-image-wrap" style="height:150px;">
          <img src="${place.image}" alt="${place.title}">
          <button class="dest-fav-btn active" onclick="toggleFavorite('${place.id}', event)">
            <i class="fa-solid fa-heart"></i>
          </button>
        </div>
        <div class="dest-card-body" style="padding:14px;">
          <h4 style="font-family: var(--font-serif); font-size: 1.1rem; color:#fff;">${place.title}</h4>
          <span style="font-size:0.75rem; color:var(--gold-light);"><i class="fa-solid fa-location-dot"></i> ${place.state}</span>
        </div>
      </div>
    `).join('');
  }

  document.getElementById('favoritesModal').classList.add('show');
}

// --- ADMIN DASHBOARD & CRUD SYSTEM ---
function renderAdminDashboard() {
  // Metrics
  document.getElementById('metricTotalPlaces').innerText = placesData.length;
  document.getElementById('adminPlaceCount').innerText = placesData.length;

  const unescoCount = placesData.filter(p => p.category.toLowerCase().includes('unesco')).length;
  document.getElementById('metricUnescoPlaces').innerText = unescoCount;

  const totalMilestones = placesData.reduce((acc, p) => acc + (p.timeline ? p.timeline.length : 0), 0);
  document.getElementById('metricTotalTimelines').innerText = totalMilestones;

  document.getElementById('metricTotalInquiries').innerText = inquiriesData.length;
  document.getElementById('adminInquiryCount').innerText = inquiriesData.length;

  // Render Places Table
  const tableBody = document.getElementById('adminPlacesTableBody');
  tableBody.innerHTML = placesData.map(place => `
    <tr>
      <td>
        <div class="table-dest-info">
          <img class="table-dest-thumb" src="${place.image}" alt="${place.title}">
          <span class="table-dest-name">${place.title}</span>
        </div>
      </td>
      <td>${place.state}</td>
      <td><span class="badge-tag">${place.category}</span></td>
      <td><i class="fa-solid fa-timeline" style="color:var(--gold-primary)"></i> ${place.timeline ? place.timeline.length : 0} milestones</td>
      <td>${place.keyPoints.bestTime || 'Year-round'}</td>
      <td>
        <div class="actions-cell">
          <button class="btn-action edit" title="Edit destination" onclick="openPlaceModal('edit', '${place.id}')">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button class="btn-action delete" title="Delete destination" onclick="deletePlace('${place.id}')">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');

  // Render Inquiries List
  const inqContainer = document.getElementById('adminInquiriesList');
  inqContainer.innerHTML = inquiriesData.map(inq => `
    <div class="inquiry-card">
      <div>
        <div class="inquiry-sender">${inq.name}</div>
        <div class="inquiry-email"><i class="fa-solid fa-envelope"></i> ${inq.email} | <span style="color:var(--text-muted);">${inq.interest}</span></div>
        <p class="inquiry-text">"${inq.message}"</p>
      </div>
      <div style="font-size:0.8rem; color:var(--text-muted); white-space:nowrap;">
        <i class="fa-solid fa-clock"></i> ${inq.date || 'Recent'}
      </div>
    </div>
  `).join('');
}

function switchAdminTab(tabName, btnElement) {
  document.querySelectorAll('.admin-tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));

  if (btnElement) btnElement.classList.add('active');

  if (tabName === 'places') {
    document.getElementById('adminPlacesTab').classList.add('active');
  } else {
    document.getElementById('adminInquiriesTab').classList.add('active');
  }
}

// Dynamic Timeline Row Builder in Admin Modal
function addTimelineRow(year = '', title = '', desc = '') {
  const container = document.getElementById('timelineRowsContainer');
  const row = document.createElement('div');
  row.className = 'timeline-row-item';
  row.innerHTML = `
    <input type="text" class="t-year" placeholder="Year/Era (e.g. 1565 CE)" value="${year}" style="width: 130px;" required />
    <input type="text" class="t-title" placeholder="Event Title" value="${title}" style="width: 220px;" required />
    <input type="text" class="t-desc" placeholder="Milestone Description" value="${desc}" style="flex:1;" required />
    <button type="button" class="btn-remove-row" title="Remove milestone" onclick="this.parentElement.remove()">
      <i class="fa-solid fa-trash-can"></i>
    </button>
  `;
  container.appendChild(row);
}

function openPlaceModal(mode = 'add', placeId = null) {
  const titleEl = document.getElementById('placeFormTitle');
  const form = document.getElementById('placeForm');
  const rowsContainer = document.getElementById('timelineRowsContainer');
  rowsContainer.innerHTML = '';

  if (mode === 'edit' && placeId) {
    const place = placesData.find(p => p.id === placeId);
    if (!place) return;

    titleEl.innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Edit Destination: ${place.title}`;
    document.getElementById('formPlaceId').value = place.id;
    document.getElementById('formTitle').value = place.title;
    document.getElementById('formState').value = place.state;
    document.getElementById('formCategory').value = place.category;
    document.getElementById('formEra').value = place.era || '';
    document.getElementById('formImageUrl').value = place.image;
    document.getElementById('formShortHistory').value = place.shortHistory;
    document.getElementById('formLongDescription').value = place.longDescription;

    document.getElementById('formBestTime').value = place.keyPoints.bestTime;
    document.getElementById('formTimings').value = place.keyPoints.timings;
    document.getElementById('formEntryFee').value = place.keyPoints.entryFee;
    document.getElementById('formHighlights').value = place.keyPoints.highlights.join(', ');
    document.getElementById('formNearestTransit').value = place.keyPoints.nearestTransit;

    // Prepopulate timeline rows
    if (place.timeline && place.timeline.length > 0) {
      place.timeline.forEach(item => addTimelineRow(item.year, item.title, item.description));
    } else {
      addTimelineRow();
    }
  } else {
    titleEl.innerHTML = `<i class="fa-solid fa-landmark"></i> Add New Destination`;
    form.reset();
    document.getElementById('formPlaceId').value = '';
    // Provide 2 default empty milestone rows
    addTimelineRow('12th Century CE', 'Monument Foundation', 'Built under the regional patron dynasty.');
    addTimelineRow('Modern Day', 'Restoration & Tourism', 'Declared as a key cultural heritage site.');
  }

  document.getElementById('placeFormModal').classList.add('show');
}

function handlePlaceFormSubmit(e) {
  e.preventDefault();

  const placeId = document.getElementById('formPlaceId').value;
  const title = document.getElementById('formTitle').value.trim();
  const state = document.getElementById('formState').value.trim();
  const category = document.getElementById('formCategory').value;
  const era = document.getElementById('formEra').value.trim() || 'Historic Era';
  const image = document.getElementById('formImageUrl').value.trim();
  const shortHistory = document.getElementById('formShortHistory').value.trim();
  const longDescription = document.getElementById('formLongDescription').value.trim();

  const bestTime = document.getElementById('formBestTime').value.trim();
  const timings = document.getElementById('formTimings').value.trim();
  const entryFee = document.getElementById('formEntryFee').value.trim();
  const highlights = document.getElementById('formHighlights').value.split(',').map(s => s.trim()).filter(Boolean);
  const nearestTransit = document.getElementById('formNearestTransit').value.trim();

  // Extract timeline entries from rows
  const timeline = [];
  document.querySelectorAll('#timelineRowsContainer .timeline-row-item').forEach(row => {
    const year = row.querySelector('.t-year').value.trim();
    const tTitle = row.querySelector('.t-title').value.trim();
    const desc = row.querySelector('.t-desc').value.trim();
    if (year && tTitle) {
      timeline.push({ year, title: tTitle, description: desc });
    }
  });

  const payload = {
    id: placeId || ('place-' + Date.now()),
    title,
    state,
    category,
    era,
    image,
    shortHistory,
    longDescription,
    keyPoints: {
      bestTime,
      timings,
      entryFee,
      highlights,
      nearestTransit,
      architecturalStyle: 'Indian Classical / Regional'
    },
    timeline
  };

  if (placeId) {
    const index = placesData.findIndex(p => p.id === placeId);
    if (index > -1) {
      placesData[index] = payload;
      showToast(`Updated "${title}" successfully!`, 'success');
    }
  } else {
    placesData.unshift(payload);
    showToast(`Added new destination "${title}"!`, 'success');
  }

  savePlacesToStorage();
  closeModal('placeFormModal');
  renderAdminDashboard();
  renderTopDestinations();
  applyFiltersAndSearch();
}

function deletePlace(placeId) {
  const place = placesData.find(p => p.id === placeId);
  if (!place) return;

  if (confirm(`Are you sure you want to delete "${place.title}" from the platform?`)) {
    placesData = placesData.filter(p => p.id !== placeId);
    favoritePlaceIds = favoritePlaceIds.filter(id => id !== placeId);
    savePlacesToStorage();
    saveFavoritesToStorage();
    renderAdminDashboard();
    renderTopDestinations();
    applyFiltersAndSearch();
    showToast(`Deleted "${place.title}".`, 'info');
  }
}

// --- CONTACT FORM HANDLER ---
function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const interest = document.getElementById('contactInterest').value;
  const message = document.getElementById('contactMessage').value.trim();

  const newInquiry = {
    id: 'inq-' + Date.now(),
    name,
    email,
    interest,
    message,
    date: new Date().toISOString().split('T')[0]
  };

  inquiriesData.unshift(newInquiry);
  localStorage.setItem('phoenix_inquiries', JSON.stringify(inquiriesData));

  document.getElementById('contactForm').reset();
  showToast('Namaste! Your inquiry has been sent to the Phoenix Heritage team.', 'success');
}

// --- TOAST NOTIFICATION UTILITY ---
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  let icon = 'fa-info-circle';
  if (type === 'success') icon = 'fa-circle-check';
  if (type === 'error') icon = 'fa-circle-exclamation';

  toast.innerHTML = `
    <i class="fa-solid ${icon}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initAppState();
});
