const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// In-Memory Seed Destinations (Ready for MongoDB integration)
let destinations = [
  {
    id: "taj-mahal",
    title: "Taj Mahal",
    state: "Agra, Uttar Pradesh",
    category: "UNESCO Heritage",
    era: "1631–1653 CE (Mughal Empire)",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
    shortHistory: "Commissioned in 1631 by Mughal Emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal.",
    keyPoints: {
      bestTime: "October to March",
      timings: "Sunrise to Sunset (Closed on Fridays)",
      entryFee: "₹50 (Indians), ₹1,100 (Foreigners)",
      highlights: ["Ivory-white marble dome", "Pietra dura floral inlay", "Reflecting pool"],
      nearestTransit: "Agra Cantt Railway Station (5 km)"
    },
    timeline: [
      { year: "1631 CE", title: "Death of Mumtaz Mahal", description: "Vow to build the monument." },
      { year: "1648 CE", title: "Main Mausoleum Done", description: "Dome and minarets completed." },
      { year: "1983 CE", title: "UNESCO Inscription", description: "World Heritage designation." }
    ],
    longDescription: "The Taj Mahal is an ivory-white marble mausoleum on the south bank of the Yamuna river in Agra."
  }
];

let inquiries = [];

// API Endpoints
app.get('/api/destinations', (req, res) => {
  const { search, category } = req.query;
  let results = [...destinations];

  if (category && category !== 'All') {
    results = results.filter(d => d.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(d => 
      d.title.toLowerCase().includes(q) || 
      d.state.toLowerCase().includes(q)
    );
  }

  res.json({ success: true, count: results.length, data: results });
});

app.post('/api/destinations', (req, res) => {
  const newPlace = { id: 'place-' + Date.now(), ...req.body };
  destinations.unshift(newPlace);
  res.status(201).json({ success: true, data: newPlace });
});

app.put('/api/destinations/:id', (req, res) => {
  const { id } = req.params;
  const index = destinations.findIndex(d => d.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Destination not found' });
  }
  destinations[index] = { ...destinations[index], ...req.body };
  res.json({ success: true, data: destinations[index] });
});

app.delete('/api/destinations/:id', (req, res) => {
  const { id } = req.params;
  destinations = destinations.filter(d => d.id !== id);
  res.json({ success: true, message: 'Destination deleted' });
});

// Auth endpoints
app.post('/api/auth/login', (req, res) => {
  const { email, password, role } = req.body;
  res.json({
    success: true,
    user: {
      email,
      name: email.split('@')[0],
      role: role || 'user',
      token: 'jwt-mock-token-' + Date.now()
    }
  });
});

// Inquiries
app.post('/api/inquiries', (req, res) => {
  const inquiry = { id: 'inq-' + Date.now(), ...req.body, date: new Date().toISOString().split('T')[0] };
  inquiries.unshift(inquiry);
  res.status(201).json({ success: true, data: inquiry });
});

app.get('/api/inquiries', (req, res) => {
  res.json({ success: true, data: inquiries });
});

// Fallback to index.html for Single Page App routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Phoenix Tourism Server running at http://localhost:${PORT}`);
  });
}

module.exports = app;
