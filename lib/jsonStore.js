import fs from "fs";
import path from "path";
import { DEMO_MANDALS } from "./defaultData";

const DATA_DIR = path.join(process.cwd(), "data");
const MANDALS_FILE = path.join(DATA_DIR, "mandals_db.json");
const SETTINGS_FILE = path.join(DATA_DIR, "platform_settings.json");

// Ensure data directory exists
function ensureDataDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (err) {
    console.error("Error creating data directory:", err);
  }
}

// Load Mandals from JSON file with fallback to DEMO_MANDALS
export function loadMandalsFromFile() {
  ensureDataDir();
  try {
    if (fs.existsSync(MANDALS_FILE)) {
      const data = fs.readFileSync(MANDALS_FILE, "utf-8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error("Error reading mandals_db.json:", err);
  }
  
  // Default initial data
  saveMandalsToFile(DEMO_MANDALS);
  return DEMO_MANDALS;
}

// Save Mandals array to JSON file synchronously
export function saveMandalsToFile(mandals) {
  ensureDataDir();
  try {
    fs.writeFileSync(MANDALS_FILE, JSON.stringify(mandals, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving mandals_db.json:", err);
  }
}

// Load Platform Settings from file
export function loadSettingsFromFile() {
  ensureDataDir();
  const defaultSettings = {
    id: "default-settings",
    adminUpiId: "8600570542@paytm",
    registrationFee: 501
  };
  try {
    if (fs.existsSync(SETTINGS_FILE)) {
      const data = fs.readFileSync(SETTINGS_FILE, "utf-8");
      const parsed = JSON.parse(data);
      if (parsed && parsed.adminUpiId) {
        return parsed;
      }
    }
  } catch (err) {
    console.error("Error reading platform_settings.json:", err);
  }
  saveSettingsToFile(defaultSettings);
  return defaultSettings;
}

// Save Platform Settings to file
export function saveSettingsToFile(settings) {
  ensureDataDir();
  try {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving platform_settings.json:", err);
  }
}
