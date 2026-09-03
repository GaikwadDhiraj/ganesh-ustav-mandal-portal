import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Marathi Devanagari to English Transliteration dictionary
const marathiToEnglishMap = {
  "श्री": "shree",
  "छत्रपती": "chhatrapati",
  "शिवाजी": "shivaji",
  "गणेश": "ganesh",
  "गणपती": "ganpati",
  "सार्वजनिक": "sarvajanik",
  "गणेशोत्सव": "ganeshotsav",
  "उत्सव": "utsav",
  "मंडळ": "mandal",
  "बाल": "bal",
  "मित्र": "mitra",
  "तरुण": "tarun",
  "नवतरुण": "navtarun",
  "एकता": "ekta",
  "आझाद": "azad",
  "राजा": "raja",
  "पुणे": "pune",
  "मुंबई": "mumbai",
  "ठाणे": "thane",
  "नाशिक": "nashik",
  "नागपूर": "nagpur",
  "कोल्हापूर": "kolhapur",
  "सांगली": "sangli",
  "सातारा": "satara",
  "सोलापूर": "solapur",
  "अहमदनगर": "ahmednagar",
  "औरंगाबाद": "aurangabad",
  "संभाजीनगर": "sambhajinagar",
};

export function marathiToEnglishText(text) {
  if (!text) return "";
  
  let result = text;

  // Replace common words first
  Object.keys(marathiToEnglishMap).forEach((word) => {
    const regex = new RegExp(word, "g");
    result = result.replace(regex, marathiToEnglishMap[word]);
  });

  // Basic character map for remaining Devanagari chars
  const devanagariMap = {
    'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo', 'ऋ': 'ru',
    'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au', 'अं': 'am', 'अः': 'ah',
    'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'n',
    'च': 'ch', 'छ': 'chh', 'ज': 'j', 'झ': 'jh', 'ञ': 'n',
    'ट': 't', 'ठ': 'th', 'ड': 'd', 'ढ': 'dh', 'ण': 'n',
    'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n',
    'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm',
    'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v', 'श': 'sh',
    'ष': 'sh', 'स': 's', 'ह': 'h', 'ळ': 'l', 'क्ष': 'ksh', 'ज्ञा': 'dnya',
    'ा': 'a', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo', 'े': 'e', 'ै': 'ai',
    'ो': 'o', 'ौ': 'au', 'ं': 'm', 'ः': 'h', '्': ''
  };

  let charResult = "";
  for (let i = 0; i < result.length; i++) {
    const ch = result[i];
    if (devanagariMap[ch] !== undefined) {
      charResult += devanagariMap[ch];
    } else {
      charResult += ch;
    }
  }

  return charResult;
}

export function slugify(text) {
  if (!text) return "mandal-" + Date.now();
  
  // Transliterate Marathi text to English
  const englishTransliterated = marathiToEnglishText(text);

  let str = englishTransliterated
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "") // Keep only English letters, numbers, hyphens
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

  if (!str || str.length < 2) {
    str = "mandal-" + Math.floor(1000 + Math.random() * 9000);
  }

  return str;
}
