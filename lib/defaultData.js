export const ADMIN_TEAM_MEMBERS = [
  { name: "धिरज गायकवाड", phone: "8600570542", designation: "ॲडमिन टीम प्रमुख (Main Admin)" },
  { name: "काउस्तुभ रोंगे", phone: "7498444684", designation: "अधिकृत ॲडमिन" },
  { name: "विजय पाटील", phone: "7620198805", designation: "अधिकृत ॲडमिन" },
  { name: "विवेक पवार", phone: "9890528006", designation: "अधिकृत ॲडमिन" },
  { name: "दीपक पवार", phone: "8669233747", designation: "अधिकृत ॲडमिन" },
  { name: "अथर्व मालवदे", phone: "9322027844", designation: "अधिकृत ॲडमिन" },
];

export const DEMO_MANDALS = [
  {
    id: "demo-mandal-1",
    slug: "shree-chhatrapati-shivaji-ganesh-mandal",
    name: "श्री छत्रपती शिवाजी सार्वजनिक गणेशोत्सव मंडळ",
    tagline: "गणपती बाप्पा मोरया! मंगलमूर्ती मोरया!",
    establishedYear: "१९९५",
    address: "शिवाजी चौक, स्टेशन रोड",
    city: "पुणे",
    contactPerson: "राकेश शिंदे",
    contactPhone: "+91 9876543210",
    contactEmail: "contact@shivajimandal.org",
    aboutText: "आमचे मंडळ गेल्या ३० वर्षांपासून सामाजिक व सांस्कृतिक क्षेत्रात अग्रगण्य आहे. दरवर्षी भव्य देखावा, आरोग्य शिबिर, आणि रक्तदान शिबिराचे आयोजन केले जाते.",
    heroImageUrl: "/bal-ganesha-modak.jpg",
    upiId: "mandal987@upi",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=mandal987@upi&pn=ShreeShivajiMandal",
    googleMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15132.88370954005!2d73.8567437!3d18.5204303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c06935272a81%3A0x6b7720973a985e54!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    status: "APPROVED",
    
    // About Section Highlights
    aboutHighlight1Title: "भव्य व सुरेख देखावे",
    aboutHighlight1Desc: "दरवर्षी आकर्षक व पर्यावरणपूरक देखावे सादर केले जातात.",
    aboutHighlight2Title: "सामाजिक उपक्रम",
    aboutHighlight2Desc: "रक्तदान शिबिर, वृक्षारोपण व मोफत रुग्ण सेवा.",
    aboutHighlight3Title: "सांस्कृतिक स्पर्धा",
    aboutHighlight3Desc: "महिला व लहान मुलांसाठी मनोरंजक स्पर्धा.",
    aboutHighlight4Title: "एकजूट व कार्यकर्ते",
    aboutHighlight4Desc: "तरुणांची भक्कम साथ व सर्वधर्मीय बंधुभाव.",

    events: [
      {
        id: "e1",
        dayTitle: "दिवस १ (प्रतिष्ठापना)",
        eventTime: "सकाळी ९:०० वा.",
        title: "श्रींची भव्य मिरवणूक व प्राणप्रतिष्ठापना आरती",
        description: "पारंपरिक ढोल-ताशा पथकाच्या गजरात बाप्पाचे आगमन व पूजा."
      },
      {
        id: "e2",
        dayTitle: "दिवस ३ (आरोग्य शिबिर)",
        eventTime: "सकाळी १०:०० वा.",
        title: "मोफत नेत्र व आरोग्य तपासणी शिबिर",
        description: "सर्व नागरिकांसाठी मोफत औषध वाटप व तपासणी."
      },
      {
        id: "e3",
        dayTitle: "दिवस ५ (महाप्रसाद)",
        eventTime: "सायंकाळी ६:०० वा.",
        title: "भव्य महाप्रसाद वितरण व भजन संध्या",
        description: "प्रसिद्ध भजनी मंडळाचा कार्यक्रम आणि महाप्रसाद."
      },
      {
        id: "e4",
        dayTitle: "दिवस ७ (सांस्कृतिक स्पर्धा)",
        eventTime: "सायंकाळी ७:०० वा.",
        title: "महिलांसाठी होम मिनिस्टर व मुलांसाठी चित्रकला स्पर्धा",
        description: "आकर्षक बक्षीस वितरण सोहळा."
      },
      {
        id: "e5",
        dayTitle: "दिवस १० (विसर्जन मिरवणूक)",
        eventTime: "दुपारी १२:०० वा.",
        title: "उत्तरपूजा व भव्य विसर्जन मिरवणूक",
        description: "गुलाल उधळत निरोप सोहळा."
      }
    ],
    members: [
      {
        id: "m1",
        name: "राकेश शिंदे",
        designation: "अध्यक्ष",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop"
      },
      {
        id: "m2",
        name: "सचिन देशपांडे",
        designation: "उपाध्यक्ष",
        imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop"
      },
      {
        id: "m3",
        name: "अमोल कदम",
        designation: "सचिव / कार्यवाह",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop"
      },
      {
        id: "m4",
        name: "विक्रम पाटील",
        designation: "खजिनदार",
        imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop"
      },
      {
        id: "m5",
        name: "रोहित गायकवाड",
        designation: "कार्यकर्ते",
        imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop"
      }
    ],
    gallery: [
      {
        id: "g1",
        imageUrl: "/bal-ganesha-modak.jpg",
        caption: "बाल गणेश सुंदर देखावा"
      },
      {
        id: "g2",
        imageUrl: "/peeking-ganesha.jpg",
        caption: "बाल गणेश उत्सव"
      },
      {
        id: "g3",
        imageUrl: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=600&h=400&fit=crop",
        caption: "महाआरती सोहळा"
      },
      {
        id: "g4",
        imageUrl: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=600&h=400&fit=crop",
        caption: "सांस्कृतिक देखावा"
      }
    ]
  }
];
