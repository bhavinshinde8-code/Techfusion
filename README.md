# Phoenix - Let's Know Our India 🇮🇳
**Full-Stack MERN Architecture (React.js + Tailwind CSS + Node.js + Express + MongoDB)**

An interactive full-stack tourism web application structured with decoupled **`client/`** (React + Tailwind CSS) and **`server/`** (Node.js + Express + MongoDB) directories, celebrating India's rich architectural monuments, historical timelines, and cultural heritage.

---

## 🎨 Design Implemented From Your Wireframe Sketch

```
+-------------------------------------------------------------+
|  [Logo Phoenix]      [Home | Top Destinations | ...]  [Sign Up] [Login] |
+-------------------------------------------------------------+
|                                                             |
|                    Let's Know Our India.                    |
|             [ Search any place across India... ]            |
|       [ 42+ UNESCO ] [ 5,000+ Yrs ] [ 1,000+ Forts ]        |
|                                                             |
+-------------------------------------------------------------+
|  TOP DESTINATIONS (3 Boxes)                                 |
|  +----------------+  +----------------+  +----------------+ |
|  | Taj Mahal      |  | Varanasi Ghats |  | Amer Fort      | |
|  +----------------+  +----------------+  +----------------+ |
+-------------------------------------------------------------+
|  FEATURE / DISCOVERIES (3 Boxes)                            |
|  +----------------+  +----------------+  +----------------+ |
|  | Royal Forts    |  | Sacred Ghats   |  | Ancient Ruins  | |
|  +----------------+  +----------------+  +----------------+ |
+-------------------------------------------------------------+
|  CONTACT US                                                 |
|  [ Headquarter & Helplines ]      [ Inquiry Submission Form ]|
+-------------------------------------------------------------+
|  FOOTER & DISCLAIMERS                                       |
+-------------------------------------------------------------+
```

---

## 📁 Project Directory Layout

```
Techfusion/
├── client/                     # React.js + Tailwind CSS (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx             # Left: Phoenix Logo, Right: Sign Up & Login
│   │   │   ├── Hero.jsx               # "Let's Know Our India", Search & Stats
│   │   │   ├── TopDestinations.jsx    # Top landmark cards (3 boxes from sketch)
│   │   │   ├── DiscoverIndia.jsx      # Thematic heritage circuits
│   │   │   ├── ContactUs.jsx          # Inquiry submission & contact cards
│   │   │   ├── Footer.jsx             # Disclaimers & heritage links
│   │   │   ├── AuthModal.jsx          # Login/Signup modal with Role toggle
│   │   │   ├── PlaceDetailsModal.jsx  # Photo, Short History, Key Points, Timeline, Long Description
│   │   │   ├── UserDashboard.jsx      # Instant destination search, category chips, wishlist
│   │   │   ├── AdminDashboard.jsx     # Stats, CRUD place table, milestone builder, inquiries
│   │   │   └── FavoritesModal.jsx     # Saved places wishlist
│   │   ├── context/
│   │   │   └── AuthContext.jsx        # Authentication and favorites state
│   │   ├── services/
│   │   │   └── api.js                 # API service layer with resilient fallback
│   │   ├── App.jsx                    # View controller & layout orchestration
│   │   ├── main.jsx                   # React entry point
│   │   └── index.css                  # Tailwind CSS directives & scrollbar styling
│   ├── tailwind.config.js             # Heritage gold and dark theme extensions
│   ├── postcss.config.js
│   ├── vite.config.js                 # Vite dev server with /api proxy to port 5000
│   └── package.json
│
└── server/                     # Node.js + Express + MongoDB (Mongoose)
    ├── config/
    │   └── db.js                      # MongoDB connection with resilient fallback
    ├── models/
    │   ├── User.js                    # User schema with JWT auth & role-based access
    │   ├── Destination.js             # Destination schema with timeline array & visitor points
    │   └── Inquiry.js                 # Customer inquiry schema
    ├── controllers/
    │   ├── authController.js          # Register, Login, Token generation
    │   ├── destinationController.js   # Search, Filter, Create, Update, Delete
    │   └── inquiryController.js       # Submit inquiry, List inquiries
    ├── routes/
    │   ├── authRoutes.js              # /api/auth
    │   ├── destinationRoutes.js       # /api/destinations
    │   └── inquiryRoutes.js           # /api/inquiries
    ├── middleware/
    │   └── authMiddleware.js          # JWT verification & Admin authorization
    ├── seed/
    │   └── seedData.js                # Initial dataset with timeline milestones
    ├── .env                           # Server environment variables
    ├── server.js                      # Express server entry point
    └── package.json
```

---

## ⚡ How to Run the Application

### 1. Start the Backend (`server/`)
In your terminal, navigate to `server`:
```bash
cd server
npm install
npm run dev
```
The server will start on port `5000`:
- API Base: `http://localhost:5000/api`
- Connected to MongoDB (`mongodb://127.0.0.1:27017/phoenix_tourism`). If MongoDB is not yet running, it seamlessly operates with built-in resilient in-memory storage for instant development!

### 2. Start the Frontend (`client/`)
In a second terminal window, navigate to `client`:
```bash
cd client
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 🔑 Demo Access Credentials
Use the top announcement pills for 1-click preview:
- ⚡ **Demo Traveler**: `traveler@phoenix.in` | Password: `password123`
- 👑 **Demo Admin**: `admin@phoenix-tourism.in` | Password: `password123`
