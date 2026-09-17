import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LANGUAGES = [
  { code: 'en', label: 'English', nativeName: 'English' },
  { code: 'hi', label: 'हिन्दी (Hindi)', nativeName: 'हिन्दी' },
  { code: 'mr', label: 'मराठी (Marathi)', nativeName: 'मराठी' }
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
