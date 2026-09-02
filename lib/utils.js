import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function slugify(text) {
  if (!text) return "mandal-" + Date.now();
  
  // Basic transliteration / clean slug generator
  let str = text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u0900-\u097F\-]+/g, "") // Allow Devnagari & alphanumeric
    .replace(/\-\-+/g, "-");

  // Fallback to random unique string if empty
  if (!str || str === "-") {
    str = "mandal-" + Math.floor(1000 + Math.random() * 9000);
  }

  return str;
}
