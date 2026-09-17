import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LANGUAGES = [
  { code: 'en', label: 'English', nativeName: 'English' },
  { code: 'hi', label: 'हिन्दी (Hindi)', nativeName: 'हिन्दी' },
  { code: 'mr', label: 'मराठी (Marathi)', nativeName: 'मराठी' },
  { code: 'gu', label: 'ગુજરાતી (Gujarati)', nativeName: 'ગુજરાતી' },
  { code: 'bn', label: 'বাংলা (Bengali)', nativeName: 'বাংলা' },
  { code: 'te', label: 'తెలుగు (Telugu)', nativeName: 'తెలుగు' },
  { code: 'ta', label: 'தமிழ் (Tamil)', nativeName: 'தமிழ்' }
];

const TRANSLATIONS = {
  en: {
    // Navbar
    brandTagline: 'Discover Nashik',
    searchPlaceholder: 'Search saved locations...',
    searchSavedHeading: 'Saved Locations',
    viewWishlist: 'View Wishlist',
    otherDestinations: 'Other Destinations',
    noSavedLocations: 'No locations saved yet. Click the ❤️ on any place to save it here!',
    logIn: 'LOG IN',
    logOut: 'Log Out',
    exploreWeb: 'Explore Web',
    userDashboard: 'Dashboard',
    adminSuite: 'Admin Suite',
    viewWebsite: 'View Website',

    // Hero Section
    heroBadge: 'SMART NASHIK TOURISM PORTAL',
    heroTitlePrefix: 'DISCOVER THE SPIRIT OF',
    heroSubtitle: 'Explore sacred Jyotirlinga sanctums, lush vineyards of India’s Wine Capital, 2000-year-old Buddhist caves, and misty Sahyadri mountain peaks.',
    currentlyViewing: 'CURRENTLY VIEWING',
    heroMainTitle1: "Let's Know",
    heroMainTitle2: 'Our Nashik',
    heroDescription: 'Explore timeless temples, Buddhist caves, sacred river ghats, and majestic Sahyadri mountain forts through local registered tourism hosts.',
    historicalSitesStat: 'HISTORICAL SITES',
    yearsHeritageStat: 'YEARS HERITAGE',
    verifiedHostsStat: 'VERIFIED HOSTS',
    travelerRatingStat: 'TRAVELER RATING',
    exploreDestinationsBtn: 'Explore Destinations',
    savedPlacesBtn: 'View Saved Places',
    verifiedGuidesStat: '100% Verified Guides',
    activeCircuitsStat: '5+ Sacred & Scenic Circuits',

    // Top Destinations
    trendingActiveBadge: 'Trending Tourism Sites Active',
    iconicLandmarksBadge: 'Iconic Maharashtra Landmarks',
    topDestinationsTitle: 'Top Destinations',
    trendingOnlyBadge: 'Trending',
    topDestinationsSubtitle: 'Exclusively featuring Maharashtra tourist attractions and heritage monuments marked as trending by administrators, synced in real time with MongoDB Atlas.',
    noTrendingYet: 'No Destinations Marked as Trending Yet',
    noTrendingSubtitle: 'Go to Admin Suite > Site Info and toggle "Set Trending" on any destination to showcase it here.',
    milestonesCount: 'Milestones',
    exploreSite: 'Explore Site',
    saveWishlist: 'Save to Wishlist',
    savedWishlist: 'Saved to Wishlist',

    // Platform Features
    featuresBadge: 'PLATFORM FEATURES',
    featuresTitle: 'Empowering Travelers & Local Hosts',
    featuresSubtitle: 'Innovative tools built to elevate Maharashtra heritage exploration and empower municipal guides.',
    feat1Title: 'Data From Resprctive Munclple Office',
    feat1Desc: 'Get authentic local insights, hidden gems, and tailored historical narratives directly from registered hosts.',
    feat2Title: 'Smart Destination Search',
    feat2Desc: 'Search ancient temples, thrilling treks, heritage caves, and wildlife spots with filters and real-time timings.',
    feat3Title: 'Seamless Travel Planning',
    feat3Desc: 'Explore entry fees, best seasons, parking info, and guide contact details in one unified portal.',

    // Platform Disclaimers
    disclaimersBadge: 'IMPORTANT NOTICE',
    disclaimersTitle: 'Platform & Travel Disclaimers',
    disc1Title: 'Team Pheonix Ai & Information Disclaimer',
    disc1Desc: 'AI generated images are prone to errors in images. It is a purely technical glitch and not intented to harm the sentiments of any indivisual or community.',
    disc2Title: 'General Travel & Information Disclaimer',
    disc2Desc: 'All destination information, visiting timings, entry fees, and route suggestions provided on this portal are taken from google .Visitors are advised to cross-verify local opening hours and on-ground guidelines prior to traveling.',
    disc3Title: 'Local Regulations & Safety Advice',
    disc3Desc: 'Travelers are strictly requested to respect monument guidelines, heritage preservation rules, wildlife reserve norms, and local customs. The platform is not liable for itinerary disruptions, weather advisories, or restricted entries.',
    disc4Title: 'Third-Party & Navigation Services',
    disc4Desc: 'External links, map directions, transport details, and accommodation references are provided for convenience. Team Phoenix does not endorse or control third-party service providers.',
    discFooter: 'By utilizing this portal, you acknowledge and agree to adhere to standard safety and tourism regulations.',
    sihInitiative: 'SIH Tourism Safety Initiative',

    // Place Details Modal
    reviewsBadge: '★ 4.9 (15,420+ REVIEWS)',
    keyFeaturesTitle: 'KEY FEATURES & HIGHLIGHTS',
    detailedDescTitle: 'Detailed Description (In-Depth Heritage & Tourist Guide)',
    detailedDescSubtitle: 'Click to expand text / listen to audio guide in your selected language',
    readMore: 'Read More',
    readLess: 'Read Less',
    playAudio: 'Play Audio',
    stopAudio: 'Stop Audio',
    visualTimelineTitle: 'VISUAL TIMELINE (YEAR-BY-YEAR ERA SLIDER)',
    visualTimelineSubtitle: 'Slide to travel through historical eras',
    previousEra: 'Previous Era',
    nextEra: 'Next Era',
    nearbyPlacesTitle: 'NEARBY PLACES TO VISIT (WITHIN 15KM)',
    clickToNavigate: 'Click to navigate',
    circuitsTitle: 'CO-RELATED HISTORICAL CIRCUITS & HERITAGE LINKS',
    liveWebResourceTitle: 'Live Destination Web Resource',
    liveWebResourceSubtitle: 'Explore real-time encyclopedia articles, historical archives, and guide pages on the web.',
    readWebGuide: 'READ WEB GUIDE',
    publishAccessible: 'Publish (Accessible to Users on Website)',
    addToSites: 'ADD TO SITES',
    savedToSites: 'SAVED TO SITES!',
    closeModal: 'Close',

    // User Dashboard
    travelerDashboardPill: 'Traveler Dashboard',
    menuOptionsDropdown: 'MENU OPTIONS DROPDOWN',
    tapToScan: 'Tap to Scan / Scan Me',
    historyMenu: 'History',
    userGuideMenu: 'User Guide',
    rewardsMenu: 'Rewards',
    contactUsMenu: 'Contact Us',

    // Admin Dashboard
    adminNavigation: 'ADMIN NAVIGATION',
    overviewMenu: 'Overview',
    siteInfoMenu: 'Site Info',
    monumentPhotoMenu: 'Monument Photo',
    reviewsMenu: 'Reviews',
    usersInfoMenu: 'Users Info',
    addDestinationBtn: 'ADD DESTINATION',
    publishedSitesStat: 'PUBLISHED SITE NO.',
    registeredUsersStat: 'REGISTERED USER NO.',
    totalReviewsStat: 'TOTAL REVIEWS',
    pendingPhotosStat: 'PENDING MONUMENT PHOTO',
    recentlyManagedTitle: 'Recently Managed Destinations',
    viewAllSites: 'View All Sites'
  },

  hi: {
    // Navbar
    brandTagline: 'नासिक दर्शन',
    searchPlaceholder: 'सहेजे गए स्थान खोजें...',
    searchSavedHeading: 'सहेजे गए स्थान',
    viewWishlist: 'इच्छा-सूची देखें',
    otherDestinations: 'अन्य गंतव्य',
    noSavedLocations: 'अभी तक कोई स्थान सहेजा नहीं गया है। किसी भी स्थान को सहेजने के लिए ❤️ पर क्लिक करें!',
    logIn: 'लॉग इन',
    logOut: 'लॉग आउट',
    exploreWeb: 'वेबसाइट देखें',
    userDashboard: 'डैशबोर्ड',
    adminSuite: 'एडमिन सुइट',
    viewWebsite: 'वेबसाइट देखें',

    // Hero Section
    heroBadge: 'स्मार्ट नासिक पर्यटन पोर्टल',
    heroTitlePrefix: 'अन्वेषण करें पवित्र',
    heroSubtitle: 'पवित्र ज्योतिर्लिंग, भारत की वाइन राजधानी के हरे-भरे अंगूर के बाग, 2000 साल पुरानी बौद्ध गुफाएं और सुरम्य सह्याद्री पर्वत चोटियों का भ्रमण करें।',
    currentlyViewing: 'वर्तमान में देख रहे हैं',
    heroMainTitle1: 'आइए जानें',
    heroMainTitle2: 'हमारा नासिक',
    heroDescription: 'स्थानीय पंजीकृत पर्यटन मेजबानों के माध्यम से प्राचीन मंदिरों, बौद्ध गुफाओं, पवित्र नदी घाटों और राजसी सह्याद्री किलों का अन्वेषण करें।',
    historicalSitesStat: 'ऐतिहासिक स्थल',
    yearsHeritageStat: 'वर्षों की विरासत',
    verifiedHostsStat: 'सत्यापित मेजबान',
    travelerRatingStat: 'यात्री रेटिंग',
    exploreDestinationsBtn: 'गंतव्य देखें',
    savedPlacesBtn: 'सहेजे गए स्थान देखें',
    verifiedGuidesStat: '100% सत्यापित गाइड',
    activeCircuitsStat: '5+ पवित्र और दर्शनीय सर्किट',

    // Top Destinations
    trendingActiveBadge: 'ट्रेंडिंग पर्यटन स्थल सक्रिय',
    iconicLandmarksBadge: 'महाराष्ट्र के प्रमुख ऐतिहासिक स्थल',
    topDestinationsTitle: 'प्रमुख पर्यटन स्थल',
    trendingOnlyBadge: 'ट्रेंडिंग',
    topDestinationsSubtitle: 'प्रशासकों द्वारा ट्रेंडिंग के रूप में चिह्नित विशेष महाराष्ट्र पर्यटन स्थल और ऐतिहासिक स्मारक, मोंगोडीबी एटलस के साथ रीयल-टाइम में सिंक।',
    noTrendingYet: 'अभी कोई गंतव्य ट्रेंडिंग के रूप में चिह्नित नहीं है',
    noTrendingSubtitle: 'एडमिन सुइट > साइट इन्फो पर जाएं और किसी भी गंतव्य को यहाँ प्रदर्शित करने के लिए "सेट ट्रेंडिंग" टॉगल करें।',
    milestonesCount: 'ऐतिहासिक चरण',
    exploreSite: 'स्थान देखें',
    saveWishlist: 'इच्छा-सूची में जोड़ें',
    savedWishlist: 'सहेजा गया',

    // Platform Features
    featuresBadge: 'प्लेटफॉर्म सुविधाएं',
    featuresTitle: 'यात्रियों और स्थानीय मेजबानों का सशक्तिकरण',
    featuresSubtitle: 'महाराष्ट्र की विरासत अन्वेषण को बढ़ाने और स्थानीय गाइडों को सशक्त बनाने के लिए निर्मित आधुनिक उपकरण।',
    feat1Title: 'संबंधित नगर निगम कार्यालय से डेटा',
    feat1Desc: 'पंजीकृत मेजबानों से सीधे प्रामाणिक स्थानीय अंतर्दृष्टि, छिपे हुए रत्न और ऐतिहासिक विवरण प्राप्त करें।',
    feat2Title: 'स्मार्ट गंतव्य खोज',
    feat2Desc: 'फ़िल्टर और वास्तविक समय की जानकारी के साथ प्राचीन मंदिरों, ट्रेक, गुफाओं और वन्यजीव स्थलों को खोजें।',
    feat3Title: 'सहज यात्रा योजना',
    feat3Desc: 'एक एकीकृत पोर्टल में प्रवेश शुल्क, सर्वोत्तम मौसम, पार्किंग और गाइड संपर्क विवरण देखें।',

    // Platform Disclaimers
    disclaimersBadge: 'महत्वपूर्ण सूचना',
    disclaimersTitle: 'प्लेटफ़ॉर्म और यात्रा दिशानिर्देश',
    disc1Title: 'टीम फीनिक्स एआई और सूचना अस्वीकरण',
    disc1Desc: 'एआई जनित छवियों में तकनीकी त्रुटियां हो सकती हैं। यह विशुद्ध रूप से तकनीकी प्रक्रिया है और इसका उद्देश्य किसी की भावनाओं को आहत करना नहीं है।',
    disc2Title: 'सामान्य यात्रा और सूचना अस्वीकरण',
    disc2Desc: 'इस पोर्टल पर उपलब्ध गंतव्य जानकारी, समय, प्रवेश शुल्क और मार्ग सुझाव गूगल से लिए गए हैं। यात्रियों को सलाह दी जाती है कि वे स्थानीय समय की पुष्टि करें।',
    disc3Title: 'स्थानीय नियम और सुरक्षा सलाह',
    disc3Desc: 'यात्रियों से अनुरोध है कि वे स्मारकों के नियमों, विरासत संरक्षण, वन्यजीव नियमों और स्थानीय परंपराओं का सम्मान करें।',
    disc4Title: 'तृतीय-पक्ष और नेविगेशन सेवाएं',
    disc4Desc: 'बाहरी लिंक, मानचित्र दिशा-निर्देश और परिवहन विवरण सुविधा के लिए दिए गए हैं। टीम फीनिक्स बाहरी सेवा प्रदाताओं का समर्थन नहीं करती है।',
    discFooter: 'इस पोर्टल का उपयोग करके, आप मानक सुरक्षा और पर्यटन नियमों का पालन करने के लिए सहमत हैं।',
    sihInitiative: 'एसआईएच पर्यटन सुरक्षा पहल',

    // Place Details Modal
    reviewsBadge: '★ 4.9 (15,420+ समीक्षाएं)',
    keyFeaturesTitle: 'प्रमुख विशेषताएं और मुख्य आकर्षण',
    detailedDescTitle: 'विस्तृत विवरण (विरासत एवं पर्यटक गाइड)',
    detailedDescSubtitle: 'विस्तृत पाठ देखने / अपनी भाषा में ऑडियो गाइड सुनने के लिए क्लिक करें',
    readMore: 'अधिक पढ़ें',
    readLess: 'कम पढ़ें',
    playAudio: 'ऑडियो सुनें',
    stopAudio: 'ऑडियो रोकें',
    visualTimelineTitle: 'दृश्य समयरेखा (वर्ष-दर-वर्ष युग स्लाइडर)',
    visualTimelineSubtitle: 'ऐतिहासिक युगों की यात्रा करने के लिए स्लाइड करें',
    previousEra: 'पिछला युग',
    nextEra: 'अगला युग',
    nearbyPlacesTitle: 'आसपास के दर्शनीय स्थल (15 किमी के भीतर)',
    clickToNavigate: 'नेविगेट करने के लिए क्लिक करें',
    circuitsTitle: 'संबंधित ऐतिहासिक सर्किट एवं हेरिटेज लिंक',
    liveWebResourceTitle: 'लाइव गंतव्य वेब संसाधन',
    liveWebResourceSubtitle: 'वेब पर रीयल-टाइम विश्वकोश लेख, ऐतिहासिक अभिलेखागार और गाइड पृष्ठ खोजें।',
    readWebGuide: 'वेब गाइड पढ़ें',
    publishAccessible: 'प्रकाशित करें (वेबसाइट पर उपयोगकर्ताओं के लिए दृश्यमान)',
    addToSites: 'साइटों में जोड़ें',
    savedToSites: 'साइटों में सहेजा गया!',
    closeModal: 'बंद करें',

    // User Dashboard
    travelerDashboardPill: 'यात्री डैशबोर्ड',
    menuOptionsDropdown: 'मेनू विकल्प ड्रॉपडाउन',
    tapToScan: 'स्कैन करने के लिए टैप करें',
    historyMenu: 'इतिहास',
    userGuideMenu: 'उपयोगकर्ता गाइड',
    rewardsMenu: 'पुरस्कार',
    contactUsMenu: 'संपर्क करें',

    // Admin Dashboard
    adminNavigation: 'एडमिन नेविगेशन',
    overviewMenu: 'सिंहावलोकन',
    siteInfoMenu: 'साइट जानकारी',
    monumentPhotoMenu: 'स्मारक फोटो',
    reviewsMenu: 'समीक्षाएं',
    usersInfoMenu: 'उपयोगकर्ता सूची',
    addDestinationBtn: 'नया गंतव्य जोड़ें',
    publishedSitesStat: 'प्रकाशित साइट संख्या',
    registeredUsersStat: 'पंजीकृत उपयोगकर्ता',
    totalReviewsStat: 'कुल समीक्षाएं',
    pendingPhotosStat: 'लंबित स्मारक फोटो',
    recentlyManagedTitle: 'हाल ही में प्रबंधित गंतव्य',
    viewAllSites: 'सभी साइटें देखें'
  },

  mr: {
    // Navbar
    brandTagline: 'नाशिक दर्शन',
    searchPlaceholder: 'जतन केलेली ठिकाणे शोधा...',
    searchSavedHeading: 'जतन केलेली ठिकाणे',
    viewWishlist: 'इच्छा-यादी पहा',
    otherDestinations: 'इतर पर्यटन स्थळे',
    noSavedLocations: 'अद्याप कोणतेही ठिकाण जतन केलेले नाही. जतन करण्यासाठी कोणत्याही ठिकाणावर ❤️ क्लिक करा!',
    logIn: 'लॉग इन',
    logOut: 'लॉग आउट',
    exploreWeb: 'वेबसाइट पहा',
    userDashboard: 'डॅशबोर्ड',
    adminSuite: 'अ‍ॅडमिन सुइट',
    viewWebsite: 'वेबसाइट पहा',

    // Hero Section
    heroBadge: 'स्मार्ट नाशिक पर्यटन पोर्टल',
    heroTitlePrefix: 'नाशिकची पवित्र भूमी',
    heroSubtitle: 'पवित्र त्र्यंबकेश्वर ज्योतिर्लिंग, भारताची वाइन राजधानी, २००० वर्षे जुनी पांडवलेणी आणि सह्याद्रीच्या निसर्गरम्य डोंगररांगांचे दर्शन घ्या.',
    currentlyViewing: 'सध्या पाहत आहात',
    heroMainTitle1: 'चला जाणून घेऊया',
    heroMainTitle2: 'आपले नाशिक',
    heroDescription: 'स्थानिक नोंदणीकृत पर्यटन मार्गदर्शकांसह प्राचीन मंदिरे, बौद्ध लेणी, पवित्र नदीचे घाट आणि सह्याद्रीच्या डोंगररांगांचे दर्शन घ्या.',
    historicalSitesStat: 'ऐतिहासिक स्थळे',
    yearsHeritageStat: 'वर्षांचा वारसा',
    verifiedHostsStat: 'सत्यापित यजमान',
    travelerRatingStat: 'पर्यटक रेटिंग',
    exploreDestinationsBtn: 'पर्यटन स्थळे पहा',
    savedPlacesBtn: 'जतन केलेली ठिकाणे',
    verifiedGuidesStat: '१००% प्रमाणित मार्गदर्शक',
    activeCircuitsStat: '५+ पवित्र व निसर्गरम्य सर्किट्स',

    // Top Destinations
    trendingActiveBadge: 'ट्रेंडिंग पर्यटन स्थळे सक्रिय',
    iconicLandmarksBadge: 'महाराष्ट्राची ऐतिहासिक व पवित्र स्थळे',
    topDestinationsTitle: 'प्रमुख पर्यटन स्थळे',
    trendingOnlyBadge: 'ट्रेंडिंग',
    topDestinationsSubtitle: 'पर्यटन प्रशासकांनी ट्रेंडिंग म्हणून चिन्हांकित केलेली विशेष महाराष्ट्र पर्यटन स्थळे, थेट मोंगोडीबी अ‍ॅटलससोबत समक्रमित.',
    noTrendingYet: 'सध्या कोणतेही ठिकाण ट्रेंडिंग म्हणून चिन्हांकित नाही',
    noTrendingSubtitle: 'अ‍ॅडमिन सुइट > साइट इन्फोवर जा आणि येथे प्रदर्शित करण्यासाठी कोणत्याही ठिकाणावर "सेट ट्रेंडिंग" टॉगल करा.',
    milestonesCount: 'ऐतिहासिक टप्पे',
    exploreSite: 'स्थळ पहा',
    saveWishlist: 'इच्छा-यादीत जतन करा',
    savedWishlist: 'जतन केले',

    // Platform Features
    featuresBadge: 'प्लॅटफॉर्म वैशिष्ट्ये',
    featuresTitle: 'पर्यटक आणि स्थानिक यजमानांचे सक्षमीकरण',
    featuresSubtitle: 'महाराष्ट्राच्या ऐतिहासिक वारशाचा परिचय घडवून आणण्यासाठी आणि स्थानिक मार्गदर्शकांना बळकट करण्यासाठी आधुनिक तंत्रज्ञान.',
    feat1Title: 'संबंधित महानगरपालिका कार्यालयाकडून माहिती',
    feat1Desc: 'नोंदणीकृत यजमानांकडून थेट स्थानिक माहिती, अज्ञात पर्यटन स्थळे आणि ऐतिहासिक संदर्भ मिळवा.',
    feat2Title: 'स्मार्ट पर्यटन स्थळ शोध',
    feat2Desc: 'फिल्टर्स आणि अचूक वेळेसह प्राचीन मंदिरे, ट्रेक्स, ऐतिहासिक लेणी आणि निसर्गपर्यटन स्थळे शोधा.',
    feat3Title: 'सुलभ प्रवास नियोजन',
    feat3Desc: 'एकाच पोर्टलवर प्रवेश शुल्क, भेट देण्याची सर्वोत्तम वेळ, पार्किंग आणि मार्गदर्शकांची माहिती मिळवा.',

    // Platform Disclaimers
    disclaimersBadge: 'महत्त्वाची सूचना',
    disclaimersTitle: 'प्लॅटफॉर्म आणि प्रवास मार्गदर्शक तत्त्वे',
    disc1Title: 'टीम फिनिक्स एआय व माहिती अस्वीकरण',
    disc1Desc: 'एआय निर्मित छायाचित्रांमध्ये तांत्रिक त्रुटी असू शकतात. ही केवळ तांत्रिक प्रक्रिया असून कोणाच्याही भावना दुखावण्याचा हेतू नाही.',
    disc2Title: 'सामान्य प्रवास आणि माहिती अस्वीकरण',
    disc2Desc: 'या पोर्टलवरील माहिती, वेळ, प्रवेश शुल्क आणि मार्गांची माहिती गुगलवरून संकलित केली आहे. प्रवासापूर्वी स्थानिक वेळेची खात्री करून घ्यावी.',
    disc3Title: 'स्थानिक नियम आणि सुरक्षा सल्ला',
    disc3Desc: 'पर्यटकांनी स्मारकांचे नियम, वारसा जतन, वन्यजीव नियम आणि स्थानिक संस्कृतीचा आदर करावा.',
    disc4Title: 'तृतीय-पक्ष आणि नेव्हिगेशन सेवा',
    disc4Desc: 'बाह्य लिंक्स, नकाशा आणि वाहतूक माहिती सोयीसाठी दिली आहे. टीम फिनिक्स या सेवांवर नियंत्रण ठेवत नाही.',
    discFooter: 'या पोर्टलचा वापर करून, आपण प्रमाणित सुरक्षा आणि पर्यटन नियमांचे पालन करण्यास सहमती दर्शवता.',
    sihInitiative: 'एसआयएच पर्यटन सुरक्षा उपक्रम',

    // Place Details Modal
    reviewsBadge: '★ ४.९ (१५,४२०+ पुनरावलोकने)',
    keyFeaturesTitle: 'प्रमुख वैशिष्ट्ये आणि आकर्षणे',
    detailedDescTitle: 'सविस्तर माहिती (वारसा व पर्यटन मार्गदर्शक)',
    detailedDescSubtitle: 'सविस्तर मजकूर वाचण्यासाठी किंवा आपल्या भाषेत ऑडिओ ऐकण्यासाठी येथे क्लिक करा',
    readMore: 'अधिक वाचा',
    readLess: 'कमी वाचा',
    playAudio: 'ऑडिओ ऐका',
    stopAudio: 'ऑडिओ थांबवा',
    visualTimelineTitle: 'दृश्य टाइमलाइन (वर्षानुसार कालखंड स्लाइडर)',
    visualTimelineSubtitle: 'ऐतिहासिक कालखंडातून प्रवास करण्यासाठी स्लाइड करा',
    previousEra: 'मागील कालखंड',
    nextEra: 'पुढील कालखंड',
    nearbyPlacesTitle: 'जवळपासची पर्यटन स्थळे (१५ किमी अंतरावर)',
    clickToNavigate: 'नेव्हिगेट करण्यासाठी क्लिक करा',
    circuitsTitle: 'संबंधित ऐतिहासिक सर्किट्स आणि हेरिटेज लिंक्स',
    liveWebResourceTitle: 'थेट पर्यटन वेब रिसोर्स',
    liveWebResourceSubtitle: 'वेबवर थेट ज्ञानकोश लेख, ऐतिहासिक कागदपत्रे आणि मार्गदर्शक पृष्ठे शोधा.',
    readWebGuide: 'वेब मार्गदर्शक वाचा',
    publishAccessible: 'प्रकाशित करा (वेबसाइटवर सर्व पर्यटकांसाठी उपलब्ध)',
    addToSites: 'साइट्समध्ये जोडा',
    savedToSites: 'साइट्समध्ये जतन केले!',
    closeModal: 'बंद करा',

    // User Dashboard
    travelerDashboardPill: 'पर्यटक डॅशबोर्ड',
    menuOptionsDropdown: 'मेनू पर्याय ड्रॉपडाउन',
    tapToScan: 'स्कॅन करण्यासाठी टॅप करा',
    historyMenu: 'इतिहास',
    userGuideMenu: 'वापरकर्ता मार्गदर्शक',
    rewardsMenu: 'बक्षिसे',
    contactUsMenu: 'संपर्क साधा',

    // Admin Dashboard
    adminNavigation: 'अ‍ॅडमिन नेव्हिगेशन',
    overviewMenu: 'विहंगावलोकन',
    siteInfoMenu: 'साइट माहिती',
    monumentPhotoMenu: 'स्मारक छायाचित्रे',
    reviewsMenu: 'पुनरावलोकने',
    usersInfoMenu: 'वापरकर्ते यादी',
    addDestinationBtn: 'नवीन स्थळ जोडा',
    publishedSitesStat: 'प्रकाशित स्थळे संख्या',
    registeredUsersStat: 'नोंदणीकृत वापरकर्ते',
    totalReviewsStat: 'एकूण पुनरावलोकने',
    pendingPhotosStat: 'प्रलंबित स्मारक छायाचित्रे',
    recentlyManagedTitle: 'अलीकडे व्यवस्थापित केलेली स्थळे',
    viewAllSites: 'सर्व स्थळे पहा'
  },

  gu: {
    // Navbar
    brandTagline: 'નાસિક દર્શન',
    searchPlaceholder: 'સંગ્રહિત સ્થાનો શોધો...',
    searchSavedHeading: 'સંગ્રહિત સ્થાનો',
    viewWishlist: 'ઈચ્છા-સૂચિ જુઓ',
    otherDestinations: 'અન્ય પ્રવાસન સ્થળો',
    noSavedLocations: 'હજુ સુધી કોઈ સ્થાન સંગ્રહિત નથી. સાચવવા માટે ❤️ ક્લિક કરો!',
    logIn: 'લૉગ ઇન',
    logOut: 'લૉગ આઉટ',
    exploreWeb: 'વેબસાઇટ જુઓ',
    userDashboard: 'ડેશબોર્ડ',
    adminSuite: 'એડમિન સ્યુટ',
    viewWebsite: 'વેબસાઇટ જુઓ',

    // Hero Section
    heroBadge: 'સ્માર્ટ નાસિક પ્રવાસન પોર્ટલ',
    heroTitlePrefix: 'અન્વેષણ કરો પવિત્ર',
    heroSubtitle: 'પવિત્ર જ્યોતિર્લિંગ, ભારતના વાઇન કેપિટલના લીલાછમ બગીચા, ૨૦૦૦ વર્ષ જૂની બૌદ્ધ ગુફાઓ અને સહ્યાદ્રી પર્વતોનું અદ્ભુત સૌંદર્ય.',
    currentlyViewing: 'હાલમાં જોઈ રહ્યા છો',
    heroMainTitle1: 'ચાલો જાણીએ',
    heroMainTitle2: 'આપણું નાસિક',
    heroDescription: 'સ્થાનિક નોંધાયેલા પ્રવાસન યજમાનો સાથે પ્રાચીન મંદિરો, બૌદ્ધ ગુફાઓ, પવિત્ર નદી ઘાટ અને સહ્યાદ્રી કિલ્લાઓની મુલાકાત લો.',
    historicalSitesStat: 'ઐતિહાસિક સ્થળો',
    yearsHeritageStat: 'વર્ષોનો વારસો',
    verifiedHostsStat: 'ચકાસાયેલ યજમાનો',
    travelerRatingStat: 'યાત્રી રેટિંગ',
    exploreDestinationsBtn: 'સ્થળો જુઓ',
    savedPlacesBtn: 'સંગ્રહિત સ્થળો',
    verifiedGuidesStat: '૧૦૦% પ્રમાણિત માર્ગદર્શક',
    activeCircuitsStat: '૫+ પવિત્ર પ્રવાસ પરિપથ',

    // Top Destinations
    trendingActiveBadge: 'ટ્રેન્ડિંગ પ્રવાસન સ્થળો સક્રિય',
    iconicLandmarksBadge: 'મહારાષ્ટ્રના પ્રખ્યાત સ્મારકો',
    topDestinationsTitle: 'મુખ્ય પ્રવાસન સ્થળો',
    trendingOnlyBadge: 'ટ્રેન્ડિંગ',
    topDestinationsSubtitle: 'એડમિનિસ્ટ્રેટર્સ દ્વારા ટ્રેન્ડિંગ તરીકે ચિહ્નિત મહારાષ્ટ્રના મુખ્ય આકર્ષણો, મોંગોડીબી સાથે રીઅલ-ટાઇમમાં સિંક.',
    noTrendingYet: 'હજુ કોઈ સ્થળ ટ્રેન્ડિંગ તરીકે ચિહ્નિત નથી',
    noTrendingSubtitle: 'એડમિન સ્યુટ > સાઇટ ઇન્ફો પર જાઓ અને અહીં દર્શાવવા માટે "સેટ ટ્રેન્ડિંગ" ટૉગલ કરો.',
    milestonesCount: 'ઐતિહાસિક તબક્કા',
    exploreSite: 'વિગત જુઓ',
    saveWishlist: 'વિશલિસ્ટમાં ઉમેરો',
    savedWishlist: 'સાચવેલ છે',

    // Platform Features
    featuresBadge: 'પ્લેટફોર્મ સુવિધાઓ',
    featuresTitle: 'યાત્રીઓ અને સ્થાનિક યજમાનોનું સશક્તિકરણ',
    featuresSubtitle: 'મહારાષ્ટ્ર વારસાના અન્વેષણ માટે આધુનિક પ્રવાસન સાધનો.',
    feat1Title: 'સંબંધિત મ્યુનિસિપલ કચેરી તરફથી ડેટા',
    feat1Desc: 'નોંધાયેલા યજમાનો પાસેથી સીધી અધિકૃત સ્થાનિક માહિતી અને ઐતિહાસિક વિગતો મેળવો.',
    feat2Title: 'સ્માર્ટ ડેસ્ટિનેશન સર્ચ',
    feat2Desc: 'પ્રાચીન મંદિરો, ટ્રેક્સ, ગુફાઓ અને કુદરતી સ્થળો ફિલ્ટર્સ સાથે શોધો.',
    feat3Title: 'સરળ પ્રવાસ આયોજન',
    feat3Desc: 'પ્રવેશ ફી, શ્રેષ્ઠ ઋતુ, પાર્કિંગ અને ગાઇડની માહિતી એક જ જગ્યાએ.',

    // Platform Disclaimers
    disclaimersBadge: 'મહત્વપૂર્ણ સૂચના',
    disclaimersTitle: 'પ્લેટફોર્મ અને પ્રવાસ માર્ગદર્શિકા',
    disc1Title: 'ટીમ ફિનિક્સ એઆઇ અને માહિતી અસ્વીકરણ',
    disc1Desc: 'એઆઈ જનરેટેડ ઈમેજમાં ક્ષતિઓ હોઈ શકે છે. આ માત્ર ટેકનિકલ પ્રક્રિયા છે.',
    disc2Title: 'સામાન્ય પ્રવાસ અસ્વીકરણ',
    disc2Desc: 'બધી વિગતો ગૂગલ પરથી લેવામાં આવી છે. મુસાફરી પહેલા સ્થાનિક સમયની પુષ્ટિ કરો.',
    disc3Title: 'સ્થાનિક નિયમો અને સલામતી',
    disc3Desc: 'સ્મારકના નિયમો અને સ્થાનિક રીતરિવાજોનું પાલન કરવાની વિનંતી છે.',
    disc4Title: 'તૃતીય-પક્ષ સેવાઓ',
    disc4Desc: 'બાહ્ય લિંક્સ અને નેવિગેશન સુવિધા માટે આપવામાં આવ્યા છે.',
    discFooter: 'આ પોર્ટલનો ઉપયોગ કરીને, તમે પ્રમાણભૂત સલામતી નિયમોનું પાલન કરવા સંમત થાઓ છો.',
    sihInitiative: 'એસઆઇએચ પ્રવાસન સુરક્ષા પહેલ',

    // Place Details Modal
    reviewsBadge: '★ ૪.૯ (૧૫,૪૨૦+ સમીક્ષાઓ)',
    keyFeaturesTitle: 'મુખ્ય વિશેષતાઓ અને આકર્ષણો',
    detailedDescTitle: 'વિગતવાર વર્ણન (વારસો અને પ્રવાસી માર્ગદર્શિકા)',
    detailedDescSubtitle: 'તમારી ભાષામાં ઓડિયો સાંભળવા અથવા વિગતવાર વાંચવા માટે ક્લિક કરો',
    readMore: 'વધુ વાંચો',
    readLess: 'ઓછું વાંચો',
    playAudio: 'ઓડિયો સાંભળો',
    stopAudio: 'ઓડિયો રોકો',
    visualTimelineTitle: 'વિઝ્યુઅલ ટાઇમલાઇન (વર્ષ-દર-વર્ષ સ્લાઇડર)',
    visualTimelineSubtitle: 'ઐતિહાસિક યુગની યાત્રા કરવા માટે સ્લાઇડ કરો',
    previousEra: 'પાછલો યુગ',
    nextEra: 'આગલો યુગ',
    nearbyPlacesTitle: 'નજીકના જોવાલાયક સ્થળો (૧૫ કિમીની અંદર)',
    clickToNavigate: 'નેવિગેટ કરવા ક્લિક કરો',
    circuitsTitle: 'સંબંધિત ઐતિહાસિક સર્કિટ્સ અને હેરિટેજ લિંક્સ',
    liveWebResourceTitle: 'લાઈવ ડેસ્ટિનેશન વેબ રિસોર્સ',
    liveWebResourceSubtitle: 'વેબ પર રીઅલ-ટાઇમ જ્ઞાનકોશ અને માહિતી માર્ગદર્શિકા જુઓ.',
    readWebGuide: 'વેબ ગાઇડ વાંચો',
    publishAccessible: 'પ્રકાશિત કરો (વેબસાઇટ પર વપરાશકર્તાઓ માટે ઉપલબ્ધ)',
    addToSites: 'સાઇટ્સમાં ઉમેરો',
    savedToSites: 'સાઇટ્સમાં ઉમેરાયું!',
    closeModal: 'બંધ કરો',

    // User Dashboard
    travelerDashboardPill: 'યાત્રી ડેશબોર્ડ',
    menuOptionsDropdown: 'મેનુ વિકલ્પો ડ્રોપડાઉન',
    tapToScan: 'સ્કેન કરવા માટે ટેપ કરો',
    historyMenu: 'ઇતિહાસ',
    userGuideMenu: 'વપરાશકર્તા માર્ગદર્શિકા',
    rewardsMenu: 'પુરસ્કારો',
    contactUsMenu: 'સંપર્ક કરો',

    // Admin Dashboard
    adminNavigation: 'એડમિન નેવિગેશન',
    overviewMenu: 'ઝાંખી',
    siteInfoMenu: 'સાઇટ માહિતી',
    monumentPhotoMenu: 'સ્મારક ફોટા',
    reviewsMenu: 'સમીક્ષાઓ',
    usersInfoMenu: 'વપરાશકર્તાઓની યાદી',
    addDestinationBtn: 'નવું સ્થળ ઉમેરો',
    publishedSitesStat: 'પ્રકાશિત સાઇટ્સ સંખ્યા',
    registeredUsersStat: 'નોંધાયેલા વપરાશકર્તાઓ',
    totalReviewsStat: 'કુલ સમીક્ષાઓ',
    pendingPhotosStat: 'બાકી સ્મારક ફોટા',
    recentlyManagedTitle: 'તાજેતરમાં સંચાલિત સ્થળો',
    viewAllSites: 'બધી સાઇટ્સ જુઓ'
  },

  bn: {
    // Navbar
    brandTagline: 'নাসিক দর্শন',
    searchPlaceholder: 'সংরক্ষিত স্থান অনুসন্ধান করুন...',
    searchSavedHeading: 'সংরক্ষিত স্থানসমূহ',
    viewWishlist: 'পছন্দের তালিকা দেখুন',
    otherDestinations: 'অন্যান্য গন্তব্য',
    noSavedLocations: 'এখনও কোনো স্থান সংরক্ষণ করা হয়নি। সংরক্ষণ করতে ❤️ ক্লিক করুন!',
    logIn: 'লগ ইন',
    logOut: 'লগ আউট',
    exploreWeb: 'ওয়েবসাইট দেখুন',
    userDashboard: 'ড্যাশবোর্ড',
    adminSuite: 'অ্যাডমিন স্যুট',
    viewWebsite: 'ওয়েবসাইট দেখুন',

    // Hero Section
    heroBadge: 'স্মার্ট নাসিক পর্যটন পোর্টাল',
    heroTitlePrefix: 'আবিষ্কার করুন পবিত্র',
    heroSubtitle: 'পবিত্র জ্যোতির্লিঙ্গ, ভারতের ওয়াইন রাজধানীর মনোরম আঙ্গুর বাগান, ২০০০ বছরের প্রাচীন বৌদ্ধ গুহা এবং সহ্যাদ্রি পর্বতমালার সৌন্দর্য অন্বেষণ করুন।',
    currentlyViewing: 'বর্তমানে দেখছেন',
    heroMainTitle1: 'আসুন জানি',
    heroMainTitle2: 'আমাদের নাসিক',
    heroDescription: 'স্থানীয় নিবন্ধিত পর্যটন হোস্টদের সাথে প্রাচীন মন্দির, বৌদ্ধ গুহা, পবিত্র নদী ঘাট এবং সহ্যাদ্রি দুর্গসমূহ ভ্রমণ করুন।',
    historicalSitesStat: 'ঐতিহাসিক স্থান',
    yearsHeritageStat: 'বছরের ঐতিহ্য',
    verifiedHostsStat: 'যাচাইকৃত হোস্ট',
    travelerRatingStat: 'ভ্রমণকারী রেটিং',
    exploreDestinationsBtn: 'গন্তব্য দেখুন',
    savedPlacesBtn: 'সংরক্ষিত স্থানসমূহ',
    verifiedGuidesStat: '১০০% যাচাইকৃত গাইড',
    activeCircuitsStat: '৫+ পবিত্র ও দর্শনীয় সার্কিট',

    // Top Destinations
    trendingActiveBadge: 'ট্রেন্ডিং পর্যটন স্থান সক্রিয়',
    iconicLandmarksBadge: 'মহারাষ্ট্রের বিখ্যাত ল্যান্ডমার্ক',
    topDestinationsTitle: 'প্রধান পর্যটন স্থানসমূহ',
    trendingOnlyBadge: 'ট্রেন্ডিং',
    topDestinationsSubtitle: 'প্রশাসক দ্বারা ট্রেন্ডিং হিসেবে চিহ্নিত মহারাষ্ট্রের পর্যটন স্থান, মঙ্গোডিবি অ্যাটলাসের সাথে রিয়েল-টাইমে সিঙ্ক।',
    noTrendingYet: 'এখনও কোনো স্থান ট্রেন্ডিং হিসেবে চিহ্নিত নেই',
    noTrendingSubtitle: 'অ্যাডমিন স্যুট > সাইট ইনফোতে যান এবং এখানে প্রদর্শন করতে "সেট ট্রেন্ডিং" টগল করুন।',
    milestonesCount: 'ঐতিহাসিক মাইলফলক',
    exploreSite: 'স্থান দেখুন',
    saveWishlist: 'পছন্দের তালিকায় যুক্ত করুন',
    savedWishlist: 'সংরক্ষিত',

    // Platform Features
    featuresBadge: 'প্ল্যাটফর্ম বৈশিষ্ট্য',
    featuresTitle: 'ভ্রমণকারী ও স্থানীয় হোস্টদের ক্ষমতায়ন',
    featuresSubtitle: 'মহারাষ্ট্রের ঐতিহ্য অন্বেষণের জন্য আধুনিক পর্যটন সরঞ্জাম।',
    feat1Title: 'পৌরসভা কার্যালয় থেকে খাঁটি তথ্য',
    feat1Desc: 'নিবন্ধিত হোস্টদের কাছ থেকে খাঁটি স্থানীয় তথ্য ও ঐতিহাসিক বিবরণ পান।',
    feat2Title: 'স্মার্ট গন্তব্য অনুসন্ধান',
    feat2Desc: 'ফিল্টার এবং রিয়েল-টাইম সময়সূচীর সাথে প্রাচীন মন্দির, ট্রেক এবং গুহা খুঁজুন।',
    feat3Title: 'সহজ ভ্রমণ পরিকল্পনা',
    feat3Desc: 'প্রবেশ মূল্য, সেরা সময়, পার্কিং এবং গাইড তথ্য এক জায়গায় পান।',

    // Platform Disclaimers
    disclaimersBadge: 'গুরুত্বপূর্ণ বিজ্ঞপ্তি',
    disclaimersTitle: 'প্ল্যাটফর্ম ও ভ্রমণ নির্দেশিকা',
    disc1Title: 'টিম ফিনিক্স এআই ও তথ্য অস্বীকৃতি',
    disc1Desc: 'এআই জেনারেটেড ছবিতে প্রযুক্তিগত ত্রুটি হতে পারে। এটি কেবল একটি প্রযুক্তিগত প্রক্রিয়া।',
    disc2Title: 'সাধারণ ভ্রমণ অস্বীকৃতি',
    disc2Desc: 'সব তথ্য গুগল থেকে নেওয়া। ভ্রমণের পূর্বে স্থানীয় সময় যাচাই করার পরামর্শ দেওয়া হচ্ছে।',
    disc3Title: 'স্থানীয় নিয়ম ও সুরক্ষা পরামর্শ',
    disc3Desc: 'স্মারক নির্দেশিকা এবং স্থানীয় রীতিনীতি মেনে চলার অনুরোধ করা হচ্ছে।',
    disc4Title: 'তৃতীয় পক্ষের পরিষেবা',
    disc4Desc: 'বাহ্যিক লিঙ্ক ও দিকনির্দেশনা সুবিধার জন্য দেওয়া হয়েছে।',
    discFooter: 'এই পোর্টাল ব্যবহার করে আপনি আদর্শ সুরক্ষা নির্দেশিকা মেনে নিতে সম্মত হন।',
    sihInitiative: 'এসআইএইচ পর্যটন সুরক্ষা উদ্যোগ',

    // Place Details Modal
    reviewsBadge: '★ ৪.৯ (১৫,৪২০+ পর্যালোচনা)',
    keyFeaturesTitle: 'প্রধান বৈশিষ্ট্য ও আকর্ষণ',
    detailedDescTitle: 'বিস্তারিত বিবরণ (ঐতিহ্য ও পর্যটন গাইড)',
    detailedDescSubtitle: 'অডিও শুনতে বা বিস্তারিত পাঠ পড়তে ক্লিক করুন',
    readMore: 'আরও পড়ুন',
    readLess: 'সংক্ষেপে পড়ুন',
    playAudio: 'অডিও শুনুন',
    stopAudio: 'অডিও থামান',
    visualTimelineTitle: 'ভিজ্যুয়াল টাইমলাইন (বছরভিত্তিক যুগ স্লাইডার)',
    visualTimelineSubtitle: 'ঐতিহাসিক যুগে ভ্রমণের জন্য স্লাইড করুন',
    previousEra: 'পূর্ববর্তী যুগ',
    nextEra: 'পরবর্তী যুগ',
    nearbyPlacesTitle: 'কাছাকাছি দর্শনীয় স্থান (১৫ কিমির মধ্যে)',
    clickToNavigate: 'নেভিগেট করতে ক্লিক করুন',
    circuitsTitle: 'সম্পর্কিত ঐতিহাসিক সার্কিট ও ঐতিহ্য লিংক',
    liveWebResourceTitle: 'লাইভ গন্তব্য ওয়েব রিসোর্স',
    liveWebResourceSubtitle: 'ওয়েবে রিয়েল-টাইম বিশ্বকোষ নিবন্ধ এবং গাইড পৃষ্ঠা অন্বেষণ করুন।',
    readWebGuide: 'ওয়েব গাইড পড়ুন',
    publishAccessible: 'প্রকাশ করুন (ব্যবহারকারীদের জন্য উন্মুক্ত)',
    addToSites: 'সাইটে যুক্ত করুন',
    savedToSites: 'সংরক্ষিত হয়েছে!',
    closeModal: 'বন্ধ করুন',

    // User Dashboard
    travelerDashboardPill: 'ভ্রমণকারী ড্যাশবোর্ড',
    menuOptionsDropdown: 'মেনু বিকল্প ড্রপডাউন',
    tapToScan: 'স্ক্যান করতে ট্যাপ করুন',
    historyMenu: 'ইতিহাস',
    userGuideMenu: 'ব্যবহারকারী নির্দেশিকা',
    rewardsMenu: 'পুরস্কার',
    contactUsMenu: 'যোগাযোগ করুন',

    // Admin Dashboard
    adminNavigation: 'অ্যাডমিন নেভিগেশন',
    overviewMenu: 'সংক্ষিপ্ত বিবরণ',
    siteInfoMenu: 'সাইট তথ্য',
    monumentPhotoMenu: 'স্মারক ছবি',
    reviewsMenu: 'পর্যালোচনা',
    usersInfoMenu: 'ব্যবহারকারী তালিকা',
    addDestinationBtn: 'নতুন গন্তব্য যোগ করুন',
    publishedSitesStat: 'প্রকাশিত সাইট সংখ্যা',
    registeredUsersStat: 'নিবন্ধিত ব্যবহারকারী',
    totalReviewsStat: 'মোট পর্যালোচনা',
    pendingPhotosStat: 'অপেক্ষারত স্মারক ছবি',
    recentlyManagedTitle: 'সম্প্রতি পরিচালিত স্থানসমূহ',
    viewAllSites: 'সব স্থান দেখুন'
  },

  te: {
    // Navbar
    brandTagline: 'నాసిక్ దర్శనం',
    searchPlaceholder: 'భద్రపరిచిన ప్రదేశాలను శోధించండి...',
    searchSavedHeading: 'భద్రపరిచిన ప్రదేశాలు',
    viewWishlist: 'విష్‌లిస్ట్ చూడండి',
    otherDestinations: 'ఇతర గమ్యస్థానాలు',
    noSavedLocations: 'ఇంకా ఏ ప్రదేశం భద్రపరచబడలేదు. భద్రపరచడానికి ❤️ పై క్లిక్ చేయండి!',
    logIn: 'లాగిన్',
    logOut: 'లాగ్ అవుట్',
    exploreWeb: 'వెబ్‌సైట్ చూడండి',
    userDashboard: 'డాష్‌బోర్డ్',
    adminSuite: 'అడ్మిన్ సూట్',
    viewWebsite: 'వెబ్‌సైట్ చూడండి',

    // Hero Section
    heroBadge: 'స్మార్ట్ నాసిక్ పర్యాటక పోర్టల్',
    heroTitlePrefix: 'అన్వేషించండి పవిత్ర',
    heroSubtitle: 'పవిత్ర జ్యోతిర్లింగ క్షేత్రం, భారతదేశపు వైన్ రాజధాని తోటలు, 2000 సంవత్సరాల పురాతన బౌద్ధ గుహలు మరియు సహ్యాద్రి కొండల అందాలను అన్వేషించండి.',
    currentlyViewing: 'ప్రస్తుతం చూస్తున్నారు',
    heroMainTitle1: 'తెలుసుకుందాం',
    heroMainTitle2: 'మన నాసిక్',
    heroDescription: 'స్థానిక నమోదిత పర్యాటక హోస్ట్‌లతో ప్రాచీన దేవాలయాలు, బౌద్ధ గుహలు, పవిత్ర నదీ ఘాట్లు మరియు సహ్యాద్రి కోటలను సందర్శించండి.',
    historicalSitesStat: 'చారిత్రక ప్రదేశాలు',
    yearsHeritageStat: 'సంవత్సరాల వారసత్వం',
    verifiedHostsStat: 'ధృవీకరించబడిన హోస్ట్‌లు',
    travelerRatingStat: 'యాత్రికుల రేటింగ్',
    exploreDestinationsBtn: 'గమ్యస్థానాలను చూడండి',
    savedPlacesBtn: 'భద్రపరిచిన ప్రదేశాలు',
    verifiedGuidesStat: '100% ధృవీకరించబడిన గైడ్‌లు',
    activeCircuitsStat: '5+ పవిత్ర పర్యాటక సర్క్యూట్లు',

    // Top Destinations
    trendingActiveBadge: 'ట్రెండింగ్ పర్యాటక ప్రదేశాలు సక్రియం',
    iconicLandmarksBadge: 'మహారాష్ట్ర ప్రముఖ చారిత్రక ప్రదేశాలు',
    topDestinationsTitle: 'ప్రముఖ పర్యాటక ప్రదేశాలు',
    trendingOnlyBadge: 'ట్రెండింగ్',
    topDestinationsSubtitle: 'అడ్మినిస్ట్రేటర్లు ట్రెండింగ్‌గా గుర్తించిన ప్రముఖ మహారాష్ట్ర ఆకర్షణలు, మొంగోడీబీతో రియల్-టైమ్‌లో సమకాలీకరించబడ్డాయి.',
    noTrendingYet: 'ఇంకా ఏ ప్రదేశం ట్రెండింగ్‌గా గుర్తించబడలేదు',
    noTrendingSubtitle: 'అడ్మిన్ సూట్ > సైట్ సమాచారానికి వెళ్లి ఇక్కడ చూపించడానికి "సెట్ ట్రెండింగ్" టోగుల్ చేయండి.',
    milestonesCount: 'చారిత్రక మైలురాళ్ళు',
    exploreSite: 'ప్రదేశం చూడండి',
    saveWishlist: 'విష్‌లిస్ట్‌కు జోడించండి',
    savedWishlist: 'భద్రపరచబడింది',

    // Platform Features
    featuresBadge: 'ప్లాట్‌ఫారమ్ ఫీచర్లు',
    featuresTitle: 'యాత్రికులు & స్థానిక హోస్ట్‌ల సాధికారత',
    featuresSubtitle: 'మహారాష్ట్ర వారసత్వ అన్వేషణను మెరుగుపరచడానికి రూపొందించిన ఆధునిక సాధనాలు.',
    feat1Title: 'పురపాలక సంఘం నుండి అధికారిక సమాచారం',
    feat1Desc: 'నమోదిత స్థానిక హోస్ట్‌ల నుండి ప్రామాణిక సమాచారం మరియు చారిత్రక వివరాలను పొందండి.',
    feat2Title: 'స్మార్ట్ గమ్యస్థాన శోధన',
    feat2Desc: 'ప్రాచీన దేవాలయాలు, ట్రెక్స్, గుహలను సమగ్ర ఫిల్టర్లతో శోధించండి.',
    feat3Title: 'సులభమైన ప్రయాణ ప్రణాళిక',
    feat3Desc: 'ప్రవేశ రుసుములు, ఉత్తమ సమయం, పార్కింగ్ మరియు గైడ్ వివరాలను ఒకే చోట పొందండి.',

    // Platform Disclaimers
    disclaimersBadge: 'ముఖ్య గమనిక',
    disclaimersTitle: 'ప్లాట్‌ఫారమ్ & ప్రయాణ మార్గదర్శకాలు',
    disc1Title: 'టీమ్ ఫీనిక్స్ ఏఐ సమాచార నిరాకరణ',
    disc1Desc: 'ఏఐ చిత్రాలలో సాంకేతిక లోపాలు ఉండవచ్చు. ఇది పూర్తిగా సాంకేతిక ప్రక్రియ మాత్రమే.',
    disc2Title: 'సాధారణ ప్రయాణ నిరాకరణ',
    disc2Desc: 'సమాచారం గూగుల్ నుండి సేకరించబడింది. ప్రయాణించే ముందు స్థానిక సమయాలను నిర్ధారించుకోండి.',
    disc3Title: 'స్థానిక నిబంధనలు & భద్రతా సలహా',
    disc3Desc: 'స్మారక చిహ్నాల నిబంధనలు మరియు స్థానిక ఆచారాలను గౌరవించవలసిందిగా కోరడమైనది.',
    disc4Title: 'మూడవ పక్ష సేవలు',
    disc4Desc: 'బాహ్య లింకులు మరియు నావిగేషన్ సమాచారం సౌలభ్యం కోసం అందించబడ్డాయి.',
    discFooter: 'ఈ పోర్టల్‌ను ఉపయోగించడం ద్వారా మీరు ప్రామాణిక భద్రతా నిబంధనలను అంగీకరిస్తున్నారు.',
    sihInitiative: 'ఎస్ఐహెచ్ పర్యాటక భద్రతా చొరవ',

    // Place Details Modal
    reviewsBadge: '★ 4.9 (15,420+ సమీక్షలు)',
    keyFeaturesTitle: 'ముఖ్య లక్షణాలు & ఆకర్షణలు',
    detailedDescTitle: 'వివరణాత్మక సమాచారం (వారసత్వ & పర్యాటక గైడ్)',
    detailedDescSubtitle: 'ఆడియో వినడానికి లేదా వివరాలు చదవడానికి క్లిక్ చేయండి',
    readMore: 'మరింత చదవండి',
    readLess: 'తక్కువ చదవండి',
    playAudio: 'ఆడియో వినండి',
    stopAudio: 'ఆడియో ఆపండి',
    visualTimelineTitle: 'విజువల్ టైమ్‌లైన్ (సంవత్సరాల వారీగా స్లైడర్)',
    visualTimelineSubtitle: 'చారిత్రక యుగాలలో ప్రయాణించడానికి స్లైడ్ చేయండి',
    previousEra: 'మునుపటి యుగం',
    nextEra: 'తదుపరి యుగం',
    nearbyPlacesTitle: 'సమీపంలోని దర్శనీయ ప్రదేశాలు (15 కి.మీ పరిధిలో)',
    clickToNavigate: 'నావిగేట్ చేయడానికి క్లిక్ చేయండి',
    circuitsTitle: 'సంబంధిత చారిత్రక సర్క్యూట్లు & వారసత్వ లింకులు',
    liveWebResourceTitle: 'లైవ్ గమ్యస్థాన వెబ్ వనరు',
    liveWebResourceSubtitle: 'వెబ్‌లో నిజ-సమయ ఎన్‌సైక్లోపీడియా వ్యాసాలు మరియు గైడ్ పేజీలను అన్వేషించండి.',
    readWebGuide: 'వెబ్ గైడ్ చదవండి',
    publishAccessible: 'ప్రచురించండి (వెబ్‌సైట్‌లో వినియోగదారులకు అందుబాటులో)',
    addToSites: 'సైట్లకు జోడించండి',
    savedToSites: 'జోడించబడింది!',
    closeModal: 'మూసివేయి',

    // User Dashboard
    travelerDashboardPill: 'యాత్రికుల డాష్‌బోర్డ్',
    menuOptionsDropdown: 'మెనూ ఎంపికల డ్రాప్‌డౌన్',
    tapToScan: 'స్కాన్ చేయడానికి నొక్కండి',
    historyMenu: 'చరిత్ర',
    userGuideMenu: 'వినియోగదారు గైడ్',
    rewardsMenu: 'బహుమతులు',
    contactUsMenu: 'మమ్మల్ని సంప్రదించండి',

    // Admin Dashboard
    adminNavigation: 'అడ్మిన్ నావిగేషన్',
    overviewMenu: 'సమీక్ష',
    siteInfoMenu: 'సైట్ సమాచారం',
    monumentPhotoMenu: 'స్మారక ఫోటోలు',
    reviewsMenu: 'సమీక్షలు',
    usersInfoMenu: 'వినియోగదారుల జాబితా',
    addDestinationBtn: 'కొత్త గమ్యస్థానాన్ని జోడించండి',
    publishedSitesStat: 'ప్రచురించిన సైట్ల సంఖ్య',
    registeredUsersStat: 'నమోదిత వినియోగదారులు',
    totalReviewsStat: 'మొత్తం సమీక్షలు',
    pendingPhotosStat: 'పెండింగ్ స్మారక ఫోటోలు',
    recentlyManagedTitle: 'ఇటీవల నిర్వహించిన ప్రదేశాలు',
    viewAllSites: 'అన్ని సైట్లను చూడండి'
  },

  ta: {
    // Navbar
    brandTagline: 'நாசிக் தரிசனம்',
    searchPlaceholder: 'சேமிக்கப்பட்ட இடங்களைத் தேடுங்கள்...',
    searchSavedHeading: 'சேமிக்கப்பட்ட இடங்கள்',
    viewWishlist: 'விருப்பப்பட்டியலைக் காண்க',
    otherDestinations: 'பிற இடங்கள்',
    noSavedLocations: 'இன்னும் எந்த இடமும் சேமிக்கப்படவில்லை. சேமிக்க ❤️ கிளிக் செய்க!',
    logIn: 'உள்நுழைக',
    logOut: 'வெளியேறுக',
    exploreWeb: 'இணையதளத்தைக் காண்க',
    userDashboard: 'டாஷ்போர்டு',
    adminSuite: 'நிர்வாகப் பிரிவு',
    viewWebsite: 'இணையதளத்தைக் காண்க',

    // Hero Section
    heroBadge: 'ஸ்மார்ட் நாசிக் சுற்றுலா தளம்',
    heroTitlePrefix: 'கண்டறியுங்கள் புனித',
    heroSubtitle: 'புனித ஜோதிர்லிங்கத் தலம், இந்தியாவின் ஒயின் தலைநகரின் பசுமையான திராட்சைத் தோட்டங்கள், 2000 ஆண்டுகள் பழமையான பௌத்த குகைகள் மற்றும் சஹ்யாத்ரி மலைகளைக் காணுங்கள்.',
    currentlyViewing: 'தற்போது பார்க்கப்படுவது',
    heroMainTitle1: 'அறிந்துகொள்வோம்',
    heroMainTitle2: 'நமது நாசிக்',
    heroDescription: 'உள்ளூர் பதிவுசெய்த சுற்றுலா வழிகாட்டிகளுடன் பழமையான கோயில்கள், பௌத்த குகைகள், புனித நதிக்கரைகள் மற்றும் கோட்டைகளை உலாவுங்கள்.',
    historicalSitesStat: 'வரலாற்றுத் தலங்கள்',
    yearsHeritageStat: 'ஆண்டுகால பாரம்பரியம்',
    verifiedHostsStat: 'சரிபார்க்கப்பட்ட வழிகாட்டிகள்',
    travelerRatingStat: 'பயணி மதிப்பீடு',
    exploreDestinationsBtn: 'தலங்களைக் காண்க',
    savedPlacesBtn: 'சேமித்த தலங்கள்',
    verifiedGuidesStat: '100% சரிபார்க்கப்பட்ட வழிகாட்டிகள்',
    activeCircuitsStat: '5+ புனித சுற்றுலாப் பாதைகள்',

    // Top Destinations
    trendingActiveBadge: 'பிரபல சுற்றுலாத் தலங்கள் செயலில்',
    iconicLandmarksBadge: 'மகாராஷ்டிராவின் வரலாற்றுத் தலங்கள்',
    topDestinationsTitle: 'முக்கிய சுற்றுலாத் தலங்கள்',
    trendingOnlyBadge: 'பிரபலம்',
    topDestinationsSubtitle: 'நிர்வாகிகளால் பிரபலமாக அறிவிக்கப்பட்ட மகாராஷ்டிராவின் முக்கிய இடங்கள், மோங்கோடிபியுடன் நிகழ்நேரத்தில் இணைக்கப்பட்டுள்ளன.',
    noTrendingYet: 'இன்னும் எந்த இடமும் பிரபலமாக குறிக்கப்படவில்லை',
    noTrendingSubtitle: 'நிர்வாக அறை > தள விவரத்திற்கு சென்று இங்கே காட்ட "செட் ட்ரெண்டிங்" என்பதை மாற்றவும்.',
    milestonesCount: 'வரலாற்று மைல்கற்கள்',
    exploreSite: 'இடத்தைக் காண்க',
    saveWishlist: 'விருப்பப்பட்டியலில் சேர்',
    savedWishlist: 'சேமிக்கப்பட்டது',

    // Platform Features
    featuresBadge: 'தளத்தின் சிறப்பம்சங்கள்',
    featuresTitle: 'பயணிகள் மற்றும் வழிகாட்டிகளின் மேம்பாடு',
    featuresSubtitle: 'மகாராஷ்டிர பாரம்பரியத்தை வெளிக்கொணர வடிவமைக்கப்பட்ட நவீன கருவிகள்.',
    feat1Title: 'நகராட்சி அலுவலகத்தின் நம்பகமான தரவு',
    feat1Desc: 'பதிவுசெய்த வழிகாட்டிகளிடமிருந்து நம்பகமான உள்ளூர் தகவல்கள் மற்றும் வரலாற்று விவரங்களைப் பெறுங்கள்.',
    feat2Title: 'ஸ்மார்ட் சுற்றுலா தேடல்',
    feat2Desc: 'பழங்காலக் கோயில்கள், மலையேற்றங்கள், குகைகளை வடிகட்டிகளுடன் தேடுங்கள்.',
    feat3Title: 'எளிதான பயணத் திட்டம்',
    feat3Desc: 'நுழைவுக் கட்டணம், சிறந்த பருவம், பார்க்கிங் மற்றும் வழிகாட்டி விவரங்களை ஒரே இடத்தில் பெறுங்கள்.',

    // Platform Disclaimers
    disclaimersBadge: 'முக்கிய அறிவிப்பு',
    disclaimersTitle: 'தளம் மற்றும் பயண வழிகாட்டுதல்கள்',
    disc1Title: 'டீம் ஃபீனிக்ஸ் ஏஐ மற்றும் தகவல் பொறுப்புத்துறப்பு',
    disc1Desc: 'ஏஐ படங்களில் தொழில்நுட்ப குறைபாடுகள் இருக்கலாம். இது முற்றிலும் தொழில்நுட்ப செயல்பாடாகும்.',
    disc2Title: 'பொதுவான பயணப் பொறுப்புத்துறப்பு',
    disc2Desc: 'தகவல்கள் கூகிளிலிருந்து பெறப்பட்டவை. பயணத்திற்கு முன் நேரங்களை சரிபார்க்கவும்.',
    disc3Title: 'உள்ளூர் விதிமுறைகள் மற்றும் பாதுகாப்பு',
    disc3Desc: 'நினைவுச்சின்ன வழிகாட்டுதல்களையும் உள்ளூர் கலாச்சாரத்தையும் மதிக்குமாறு கேட்டுக்கொள்கிறோம்.',
    disc4Title: 'மூன்றாம் தரப்பு சேவைகள்',
    disc4Desc: 'வெளிப்புற இணைப்புகள் மற்றும் வழிகாட்டுதல்கள் வசதிக்காக மட்டுமே வழங்கப்படுகின்றன.',
    discFooter: 'இந்த போர்ட்டலைப் பயன்படுத்துவதன் மூலம் பாதுகாப்பு விதிமுறைகளை ஏற்கிறீர்கள்.',
    sihInitiative: 'எஸ்ஐஹெச் சுற்றுலா பாதுகாப்பு முயற்சி',

    // Place Details Modal
    reviewsBadge: '★ 4.9 (15,420+ மதிப்புரைகள்)',
    keyFeaturesTitle: 'முக்கிய அம்சங்கள் மற்றும் சிறப்புகள்',
    detailedDescTitle: 'விரிவான விளக்கம் (பாரம்பரிய & சுற்றுலா வழிகாட்டி)',
    detailedDescSubtitle: 'உங்கள் மொழியில் ஆடியோ கேட்க அல்லது விரிவாகப் படிக்க கிளிக் செய்க',
    readMore: 'மேலும் படிக்க',
    readLess: 'குறைவாகப் படிக்க',
    playAudio: 'ஆடியோ கேட்க',
    stopAudio: 'ஆடியோ நிறுத்த',
    visualTimelineTitle: 'காட்சி காலவரிசை (ஆண்டு வாரியான ஸ்லைடர்)',
    visualTimelineSubtitle: 'வரலாற்று காலங்களை அறிய ஸ்லைடு செய்க',
    previousEra: 'முந்தைய காலம்',
    nextEra: 'அடுத்த காலம்',
    nearbyPlacesTitle: 'அருகிலுள்ள சுற்றுலாத் தலங்கள் (15 கிமீக்குள்)',
    clickToNavigate: 'வழிகாட்ட கிளிக் செய்க',
    circuitsTitle: 'தொடர்புடைய வரலாற்றுச் சுற்றுலாப் பாதைகள்',
    liveWebResourceTitle: 'நேரடி இணைய தகவல் ஆதாரம்',
    liveWebResourceSubtitle: 'விக்கிப்பீடியா மற்றும் இணைய வழிகாட்டிப் பக்கங்களை ஆராயுங்கள்.',
    readWebGuide: 'இணைய வழிகாட்டியைப் படிக்கவும்',
    publishAccessible: 'வெளியிடுக (பயனர்கள் பார்க்கக்கூடியது)',
    addToSites: 'தளங்களில் சேர்',
    savedToSites: 'சேமிக்கப்பட்டது!',
    closeModal: 'மூடுக',

    // User Dashboard
    travelerDashboardPill: 'பயணி டாஷ்போர்டு',
    menuOptionsDropdown: 'மெனு தேர்வுகள்',
    tapToScan: 'ஸ்கேன் செய்ய தட்டவும்',
    historyMenu: 'வரலாறு',
    userGuideMenu: 'பயனர் வழிகாட்டி',
    rewardsMenu: 'வெகுமதிகள்',
    contactUsMenu: 'தொடர்புகொள்க',

    // Admin Dashboard
    adminNavigation: 'நிர்வாக வழிசெலுத்தல்',
    overviewMenu: 'மேலோட்டம்',
    siteInfoMenu: 'தள விவரம்',
    monumentPhotoMenu: 'நினைவுச்சின்ன புகைப்படங்கள்',
    reviewsMenu: 'மதிப்புரைகள்',
    usersInfoMenu: 'பயனர்கள் பட்டியல்',
    addDestinationBtn: 'புதிய இடத்தைச் சேர்',
    publishedSitesStat: 'வெளியிடப்பட்ட தளங்கள்',
    registeredUsersStat: 'பதிவுசெய்த பயனர்கள்',
    totalReviewsStat: 'மொத்த மதிப்புரைகள்',
    pendingPhotosStat: 'நிலுவையிலுள்ள புகைப்படங்கள்',
    recentlyManagedTitle: 'சமீபத்தில் நிர்வகிக்கப்பட்டவை',
    viewAllSites: 'அனைத்து இடங்களையும் காண்க'
  }
};

// Destination-specific localized titles and descriptions for Nashik places
const DESTINATION_LOCALES = {
  hi: {
    'Trimbakeshwar Shiva Temple': {
      title: 'त्र्यंबकेश्वर ज्योतिर्लिंग शिव मंदिर',
      category: 'धार्मिक एवं तीर्थ स्थल',
      shortHistory: 'भगवान शिव के बारह पवित्र ज्योतिर्लिंगों में से एक और पवित्र गोदावरी नदी का उद्गम स्थल। ब्रह्मा, विष्णु और रुद्र के तीन मुखों वाले अद्वितीय लिंगम के लिए प्रसिद्ध।'
    },
    'Sula Vineyards & Wine Estate': {
      title: 'सुला वाइनयार्ड्स एवं वाइन एस्टेट',
      category: 'प्राकृतिक एवं दर्शनीय',
      shortHistory: '1999 में स्थापित, सुला ने नासिक में वाइन पर्यटन की शुरुआत की, जिसने इस क्षेत्र को भारत की वाइन राजधानी के रूप में पहचान दिलाई।'
    },
    'Pandavleni Buddhist Caves': {
      title: 'पांडवलेणी बौद्ध गुफाएं',
      category: 'प्राचीन गुफाएं',
      shortHistory: 'त्रिरश्मी पहाड़ी की ढलान पर 2000 साल पहले तराशी गई 24 रॉक-कट हीनयान बौद्ध गुफाओं का समूह। प्राचीन ब्राह्मी शिलालेखों और विहारों के लिए प्रसिद्ध।'
    },
    'Anjaneri Hills & Fort': {
      title: 'अंजनेरी पहाड़ी एवं दुर्ग',
      category: 'ट्रेकिंग एवं किले',
      shortHistory: 'भगवान हनुमान की जन्मस्थली के रूप में पूजनीय। सह्याद्री पर्वतमाला में सुंदर झरनों और घने जंगलों से घिरा एक प्रमुख ट्रेकिंग स्थल।'
    },
    'Ramkund & Godavari Ghats': {
      title: 'रामकुंड एवं गोदावरी घाट',
      category: 'धार्मिक एवं तीर्थ स्थल',
      shortHistory: 'पंचवटी में गोदावरी नदी पर स्थित पवित्र स्नान कुंड, जहां भगवान राम ने अपने वनवास के दौरान स्नान किया था। कुंभ मेले का मुख्य केंद्र।'
    }
  },
  mr: {
    'Trimbakeshwar Shiva Temple': {
      title: 'त्र्यंबकेश्वर ज्योतिर्लिंग शिव मंदिर',
      category: 'धार्मिक व तीर्थक्षेत्र',
      shortHistory: 'भगवान शंकरांच्या १२ पवित्र ज्योतिर्लिंगांपैकी एक आणि पवित्र गोदावरी नदीचे उगमस्थान. ब्रह्मा, विष्णू आणि महेश यांच्या त्रिमुखांसाठी प्रसिद्ध.'
    },
    'Sula Vineyards & Wine Estate': {
      title: 'सुला वाइनयार्ड्स आणि वाइन इस्टेट',
      category: 'निसर्गरम्य पर्यटन',
      shortHistory: '१९९९ मध्ये स्थापन झालेल्या सुलाने नाशिकमध्ये वाइन पर्यटनाची सुरुवात केली आणि नाशिकला भारताची वाइन राजधानी म्हणून जागतिक ओळख मिळवून दिली.'
    },
    'Pandavleni Buddhist Caves': {
      title: 'पांडवलेणी बौद्ध लेणी',
      category: 'प्राचीन लेणी',
      shortHistory: 'त्रिरश्मी टेकडीवर २००० वर्षांपूर्वी कोरलेला २४ हीनयान बौद्ध लेण्यांचा समूह. प्राचीन ब्राह्मी शिलालेख आणि विहार व चैत्यगृहांसाठी प्रसिद्ध.'
    },
    'Anjaneri Hills & Fort': {
      title: 'अंजनेरी टेकडी आणि किल्ला',
      category: 'ट्रेकिंग आणि किल्ले',
      shortHistory: 'हनुमानाचे जन्मस्थान मानले जाणारे पवित्र ठिकाण. सह्याद्रीच्या डोंगररांगांमध्ये निसर्गरम्य धबधबे आणि ट्रेकर्ससाठी प्रसिद्ध पर्यटन स्थळ.'
    },
    'Ramkund & Godavari Ghats': {
      title: 'रामकुंड व गोदावरी घाट',
      category: 'धार्मिक व तीर्थक्षेत्र',
      shortHistory: 'पंचवटीतील गोदावरी नदीवरील पवित्र स्नान कुंड. वनवासादरम्यान प्रभू श्रीरामांनी येथे स्नान केले होते. सिंहस्थ कुंभमेळ्याचे मुख्य केंद्र.'
    }
  },
  gu: {
    'Trimbakeshwar Shiva Temple': {
      title: 'ત્ર્યંબકેશ્વર જ્યોતિર્લિંગ શિવ મંદિર',
      category: 'ધાર્મિક અને તીર્થસ્થળ',
      shortHistory: 'ભગવાન શિવના ૧૨ પવિત્ર જ્યોતિર્લિંગોમાંનું એક અને પવિત્ર ગોદાવરી નદીનું ઉદ્ગમ સ્થાન. બ્રહ્મા, વિષ્ણુ અને રુદ્રના ત્રણ મુખવાળા અદ્વિતીય લિંગમ માટે વિશ્વવિખ્યાત.'
    },
    'Sula Vineyards & Wine Estate': {
      title: 'સુલા વાઇનયાર્ડ્સ અને વાઇન એસ્ટેટ',
      category: 'કુદરતી અને જોવાલાયક',
      shortHistory: '૧૯૯૯ માં સ્થપાયેલ સુલાએ નાસિકમાં વાઇન પર્યટનની શરૂઆત કરી અને આ પ્રદેશને ભારતના વાઇન કેપિટલ તરીકે વૈશ્વિક ઓળખ અપાવી.'
    },
    'Pandavleni Buddhist Caves': {
      title: 'પાંડવલેણી બૌદ્ધ ગુફાઓ',
      category: 'પ્રાચીન ગુફાઓ',
      shortHistory: 'ત્રિરશ્મિ ટેકરી પર ૨૦૦૦ વર્ષ પહેલાં કંડારાયેલી ૨૪ હીનયાન બૌદ્ધ ગુફાઓનો સમૂહ. પ્રાચીન બ્રાહ્મી શિલાલેખો અને વિહારો માટે જાણીતું.'
    },
    'Anjaneri Hills & Fort': {
      title: 'અંજનેરી ટેકરી અને કિલ્લો',
      category: 'ટ્રેકિંગ અને કિલ્લા',
      shortHistory: 'ભગવાન હનુમાનજીનું જન્મસ્થળ ગણાતું પવિત્ર સ્થળ. સહ્યાદ્રી પર્વતમાળામાં સુંદર ઝરણાં અને ટ્રેકિંગ માટે પ્રખ્યાત.'
    },
    'Ramkund & Godavari Ghats': {
      title: 'રામકુંડ અને ગોદાવરી ઘાટ',
      category: 'ધાર્મિક અને તીર્થસ્થળ',
      shortHistory: 'પંચવટીમાં ગોદાવરી નદી પર પવિત્ર સ્નાન કુંડ, જ્યાં ભગવાન રામે વનવાસ દરમિયાન સ્નાન કર્યું હતું. સિંહસ્થ કુંભમેળાનું મુખ્ય કેન્દ્ર.'
    }
  },
  bn: {
    'Trimbakeshwar Shiva Temple': {
      title: 'ত্র্যম্বকেশ্বর জ্যোতির্লিঙ্গ শিব মন্দির',
      category: 'ধর্মীয় ও তীর্থক্ষেত্র',
      shortHistory: 'ভগবান শিবের বারোটি পবিত্র জ্যোতির্লিঙ্গের অন্যতম এবং পবিত্র গোদাবরী নদীর উৎপত্তিস্থল। ব্রহ্মা, বিষ্ণু ও রুদ্রের ত্রিধারী লিঙ্গের জন্য বিশ্ববিখ্যাত।'
    },
    'Sula Vineyards & Wine Estate': {
      title: 'সুলা ভিনইয়ার্ডস অ্যান্ড ওয়াইন এস্টেট',
      category: 'প্রাকৃতিক ও দর্শনীয়',
      shortHistory: '১৯৯৯ সালে প্রতিষ্ঠিত সুলা নাসিকে ওয়াইন পর্যটন শুরু করে ভারতকে বিশ্বের ওয়াইন মানচিত্রে শীর্ষ স্থান এনে দেয়।'
    },
    'Pandavleni Buddhist Caves': {
      title: 'পাণ্ডবলেনী বৌদ্ধ গুহা',
      category: 'প্রাচীন গুহা',
      shortHistory: 'ত্রিরশ্মি পাহাড়ের ঢালে ২০০০ বছর আগে নির্মিত ২৪টি হীনযান বৌদ্ধ গুহার ঐতিহাসিক চত্বর। প্রাচীন ব্রাহ্মী শিলালিপির জন্য খ্যাত।'
    },
    'Anjaneri Hills & Fort': {
      title: 'অঞ্জনেরী পাহাড় ও দুর্গ',
      category: 'ট্রেকিং ও দুর্গ',
      shortHistory: 'ভগবান হনুমানের জন্মস্থান হিসেবে পূজিত পবিত্র স্থান। সহ্যাদ্রি পাহাড়ের মনোরম ঝর্ণা ও সবুজ অরণ্যে ঘেরা ট্রেকারদের স্বর্গ।'
    },
    'Ramkund & Godavari Ghats': {
      title: 'রামকুণ্ড ও গোদাবরী ঘাট',
      category: 'ধর্মীয় ও তীর্থক্ষেত্র',
      shortHistory: 'পঞ্চবটীতে গোদাবরী নদীর পবিত্র স্নান ঘাট, যেখানে শ্রীরামচন্দ্র বনবাসকালে স্নান করেছিলেন। সিংহস্থ কুম্ভমেলার মূল কেন্দ্র।'
    }
  },
  te: {
    'Trimbakeshwar Shiva Temple': {
      title: 'త్ర్యంబకేశ్వర్ జ్యోతిర్లింగ శివాలయం',
      category: 'ధార్మిక & పుణ్యక్షేత్రం',
      shortHistory: 'ద్వాదశ జ్యోతిర్లింగాలలో ఒకటి మరియు పవిత్ర గోదావరి నది జన్మస్థలం. బ్రహ్మ, విష్ణు, మహేశ్వరుల త్రిమూర్తి లింగ విశిష్టత కలిగిన పుణ్యధామం.'
    },
    'Sula Vineyards & Wine Estate': {
      title: 'సులా వైన్యార్డ్స్ అండ్ వైన్ ఎస్టేట్',
      category: 'సహజ దృశ్యాలు & పర్యాటకం',
      shortHistory: '1999 లో స్థాపించబడిన సులా, నాసిక్‌లో వైన్ పర్యాటకాన్ని ప్రారంభించి భారతదేశ వైన్ రాజధానిగా ప్రపంచ గుర్తింపు తెచ్చింది.'
    },
    'Pandavleni Buddhist Caves': {
      title: 'పాండవుల గుహలు (పాండవ్ లేని)',
      category: 'ప్రాచీన గుహలు',
      shortHistory: 'త్రిరశ్మి కొండపై 2000 సంవత్సరాల క్రితం చెక్కబడిన 24 హీనయాన బౌద్ధ రాతి గుహల సమూహం. ప్రాచీన బ్రాహ్మీ శాసనాలు మరియు విహారాలకు ప్రసిద్ధి.'
    },
    'Anjaneri Hills & Fort': {
      title: 'అంజనేరి కొండలు మరియు కోట',
      category: 'ట్రెక్కింగ్ & కోటలు',
      shortHistory: 'హనుమంతుని జన్మస్థలంగా పూజించబడే పవిత్ర స్థలం. సహ్యాద్రి పర్వత శ్రేణులలో జలపాతాలు మరియు సాహసికులకు అనువైన ట్రెక్కింగ్ మార్గం.'
    },
    'Ramkund & Godavari Ghats': {
      title: 'రామకుండ్ మరియు గోదావరి ఘాట్లు',
      category: 'ధార్మిక & పుణ్యక్షేత్రం',
      shortHistory: 'పంచవటిలో గోదావరి నది ఒడ్డున గల పవిత్ర స్నాన ఘట్టం. వనవాస కాలంలో శ్రీరాముడు ఇక్కడ స్నానమాచరించాడు. సింహస్థ కుంభమేళా ప్రధాన కేంద్రం.'
    }
  },
  ta: {
    'Trimbakeshwar Shiva Temple': {
      title: 'திரியம்பகேஸ்வரர் ஜோதிர்லிங்க சிவன் கோவில்',
      category: 'ஆன்மீகம் & புனித தலம்',
      shortHistory: 'பன்னிரண்டு ஜோதிர்லிங்கங்களில் ஒன்றும், புனித கோதாவரி நதியின் பிறப்பிடமும் ஆகும். பிரம்மா, விஷ்ணு மற்றும் ருத்ரரின் மூன்று முகங்களைக் கொண்ட தனித்துவமான லிங்கம்.'
    },
    'Sula Vineyards & Wine Estate': {
      title: 'சுலா திராட்சைத் தோட்டங்கள் மற்றும் ஒயின் எஸ்டேட்',
      category: 'இயற்கை எழில் & உலா',
      shortHistory: '1999 இல் தொடங்கப்பட்ட சுலா, நாசிக்கில் திராட்சை ஒயின் சுற்றுலாவைத் தொடங்கி, இந்தியாவின் ஒயின் தலைநகராக உலகிற்கு அறிமுகப்படுத்தியது.'
    },
    'Pandavleni Buddhist Caves': {
      title: 'பாண்டவ்லேனி பௌத்த குகைகள்',
      category: 'பழங்கால குகைகள்',
      shortHistory: 'திரிரஷ்மி மலையில் 2000 ஆண்டுகளுக்கு முன் பாறைகளில் செதுக்கப்பட்ட 24 பௌத்த குகைகளின் தொகுப்பு. பழங்கால பிராமி கல்வெட்டுகளுக்குப் பெயர் பெற்றது.'
    },
    'Anjaneri Hills & Fort': {
      title: 'அஞ்சனேரி மலை மற்றும் கோட்டை',
      category: 'மலையேற்றம் & கோட்டைகள்',
      shortHistory: 'அனுமனின் அவதாரத் தலமாகக் கருதப்படும் புனித மலை. சஹ்யாத்ரி மலைத்தொடரில் அருவிகள் மற்றும் இயற்கை எழில் கொஞ்சும் மலையேற்றப் பாதை.'
    },
    'Ramkund & Godavari Ghats': {
      title: 'ராமகுண்ட் மற்றும் கோதாவரி படித்துறை',
      category: 'ஆன்மீகம் & புனித தலம்',
      shortHistory: 'பஞ்சவடியில் கோதாவரி நதிக்கரையில் அமைந்துள்ள புனித தீர்த்தக் குளம். ராமர் வனவாசத்தின் போது நீராடிய தலம். கும்பமேளாவின் முக்கிய மையம்.'
    }
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('phoenix_lang') || 'en';
  });

  const setLanguage = (langCode) => {
    setLanguageState(langCode);
    localStorage.setItem('phoenix_lang', langCode);
  };

  // Helper translation function
  const t = (key, fallback = '') => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS.en;
    if (langDict[key] !== undefined) {
      return langDict[key];
    }
    return TRANSLATIONS.en[key] || fallback || key;
  };

  // Helper to translate destination title and short description
  const translateDestination = (place) => {
    if (!place) return place;
    if (language === 'en') return place;

    const langData = DESTINATION_LOCALES[language];
    if (langData && langData[place.title]) {
      const loc = langData[place.title];
      return {
        ...place,
        title: loc.title || place.title,
        category: loc.category || place.category,
        shortHistory: loc.shortHistory || place.shortHistory
      };
    }
    return place;
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t,
      translateDestination,
      languages: LANGUAGES
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
