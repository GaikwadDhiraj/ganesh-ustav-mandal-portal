"use server";

import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { DEMO_MANDALS } from "@/lib/defaultData";
import { loadMandalsFromFile, saveMandalsToFile } from "@/lib/jsonStore";

let inMemoryMandals = loadMandalsFromFile();

// Helper to combine DB, File, and In-Memory mandals without duplicates
function mergeAllMandals(dbMandals = [], fileMandals = [], memoryMandals = []) {
  const map = new Map();

  // 1. Add DEMO_MANDALS as base
  DEMO_MANDALS.forEach(m => map.set(m.id, m));

  // 2. Add File Mandals
  fileMandals.forEach(m => map.set(m.id || m.slug, m));

  // 3. Add In-Memory Mandals
  memoryMandals.forEach(m => map.set(m.id || m.slug, m));

  // 4. Add DB Mandals (highest priority)
  dbMandals.forEach(m => map.set(m.id || m.slug, m));

  return Array.from(map.values()).sort((a, b) => {
    const dateA = new Date(a.createdAt || 0).getTime();
    const dateB = new Date(b.createdAt || 0).getTime();
    return dateB - dateA;
  });
}

export async function generateUniqueSlug(baseName, city = "", estYear = "") {
  const baseSlug = slugify(`${baseName} ${city} ${estYear}`);
  let candidate = baseSlug;
  let counter = 1;

  const allExisting = await getAllMandals();

  while (true) {
    const existing = allExisting.find(
      m => m.slug && m.slug.toLowerCase() === candidate.toLowerCase()
    );
    if (!existing) {
      return candidate;
    }
    candidate = `${baseSlug}-${counter}`;
    counter++;
  }
}

export async function registerMandal(formData) {
  try {
    const name = formData.name;
    const tagline = formData.tagline || "गणपती बाप्पा मोरया! मंगलमूर्ती मोरया!";
    const establishedYear = formData.establishedYear || "";
    const address = formData.address;
    const city = formData.city || "पुणे";
    const contactPerson = formData.contactPerson;
    const contactPhone = formData.contactPhone;
    const contactEmail = formData.contactEmail || "";
    
    // Short & Detailed Descriptions with char limits
    const shortDescription = (formData.shortDescription || "").slice(0, 150) || "आमच्या गणेशोत्सवात आपले सहर्ष स्वागत आहे.";
    const aboutText = (formData.aboutText || "").slice(0, 1000) || "आमच्या गणेशोत्सवात आपले सहर्ष स्वागत आहे. श्रींच्या चरणी आपली सेवा व प्रार्थना अर्पित करा आणि बाप्पाचे आशीर्वाद प्राप्त करा.";
    
    const heroImageUrl = formData.heroImageUrl || "/hero-main-ganesha.jpg";
    const upiId = formData.upiId || "";
    const qrCodeUrl = formData.qrCodeUrl || (upiId ? `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=${upiId}` : "");
    const googleMapUrl = formData.googleMapUrl || "";
    const googleMapIframe = formData.googleMapIframe || "";

    const registrationFeeTxnId = formData.registrationFeeTxnId || "";
    const registrationFeeAmount = parseFloat(formData.registrationFeeAmount) || 501;

    // Customizable 4 About Section Highlights
    const aboutHighlight1Title = formData.aboutHighlight1Title || "भव्य व सुरेख देखावे";
    const aboutHighlight1Desc  = formData.aboutHighlight1Desc  || "दरवर्षी आकर्षक व पर्यावरणपूरक देखावे सादर केले जातात.";
    
    const aboutHighlight2Title = formData.aboutHighlight2Title || "सामाजिक उपक्रम";
    const aboutHighlight2Desc  = formData.aboutHighlight2Desc  || "रक्तदान शिबिर, वृक्षारोपण व मोफत रुग्ण सेवा.";

    const aboutHighlight3Title = formData.aboutHighlight3Title || "सांस्कृतिक स्पर्धा";
    const aboutHighlight3Desc  = formData.aboutHighlight3Desc  || "महिला व लहान मुलांसाठी मनोरंजक स्पर्धा.";

    const aboutHighlight4Title = formData.aboutHighlight4Title || "एकजूट व कार्यकर्ते";
    const aboutHighlight4Desc  = formData.aboutHighlight4Desc  || "तरुणांची भक्कम साथ व सर्वधर्मीय बंधुभाव.";

    // Generate Transliterated Unique English Slug
    const slug = await generateUniqueSlug(name, city, establishedYear);

    // Parse sub-arrays
    const events = (formData.events || []).map((e, idx) => ({ ...e, id: `evt-${Date.now()}-${idx}`, order: idx }));
    const members = (formData.members || []).map((m, idx) => ({ ...m, id: `mem-${Date.now()}-${idx}`, order: idx }));
    const gallery = (formData.gallery || []).map((g, idx) => ({ ...g, id: `gal-${Date.now()}-${idx}`, order: idx }));

    const newMandal = {
      id: "mandal-" + Date.now(),
      slug,
      name,
      tagline,
      establishedYear,
      address,
      city,
      contactPerson,
      contactPhone,
      contactEmail,
      shortDescription,
      aboutText,
      heroImageUrl,
      upiId,
      qrCodeUrl,
      googleMapUrl,
      googleMapIframe,
      registrationFeeTxnId,
      registrationFeeAmount,
      aboutHighlight1Title,
      aboutHighlight1Desc,
      aboutHighlight2Title,
      aboutHighlight2Desc,
      aboutHighlight3Title,
      aboutHighlight3Desc,
      aboutHighlight4Title,
      aboutHighlight4Desc,
      status: "PENDING",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      events,
      members,
      gallery
    };

    let createdMandal = newMandal;

    try {
      const created = await prisma.mandal.create({
        data: {
          slug: newMandal.slug,
          name: newMandal.name,
          tagline: newMandal.tagline,
          establishedYear: newMandal.establishedYear,
          address: newMandal.address,
          city: newMandal.city,
          contactPerson: newMandal.contactPerson,
          contactPhone: newMandal.contactPhone,
          contactEmail: newMandal.contactEmail,
          shortDescription: newMandal.shortDescription,
          aboutText: newMandal.aboutText,
          heroImageUrl: newMandal.heroImageUrl,
          upiId: newMandal.upiId,
          qrCodeUrl: newMandal.qrCodeUrl,
          googleMapUrl: newMandal.googleMapUrl,
          googleMapIframe: newMandal.googleMapIframe,
          registrationFeeTxnId: newMandal.registrationFeeTxnId,
          registrationFeeAmount: newMandal.registrationFeeAmount,
          aboutHighlight1Title: newMandal.aboutHighlight1Title,
          aboutHighlight1Desc: newMandal.aboutHighlight1Desc,
          aboutHighlight2Title: newMandal.aboutHighlight2Title,
          aboutHighlight2Desc: newMandal.aboutHighlight2Desc,
          aboutHighlight3Title: newMandal.aboutHighlight3Title,
          aboutHighlight3Desc: newMandal.aboutHighlight3Desc,
          aboutHighlight4Title: newMandal.aboutHighlight4Title,
          aboutHighlight4Desc: newMandal.aboutHighlight4Desc,
          status: "PENDING",
          events: {
            create: events.map((e, idx) => ({
              dayTitle: e.dayTitle || `दिवस ${idx + 1}`,
              eventTime: e.eventTime || "वेळ ठरली नाही",
              title: e.title || "कार्यक्रम",
              description: e.description || "",
              order: idx
            }))
          },
          members: {
            create: members.map((m, idx) => ({
              name: m.name || "सदस्य",
              designation: m.designation || "कार्यकर्ते",
              imageUrl: m.imageUrl || "",
              order: idx
            }))
          },
          gallery: {
            create: gallery.map((g, idx) => ({
              imageUrl: g.imageUrl || "",
              caption: g.caption || "",
              order: idx
            }))
          }
        },
        include: {
          events: true,
          members: true,
          gallery: true
        }
      });
      createdMandal = created;
    } catch (dbErr) {
      console.warn("DB offline/fallback to file store:", dbErr.message);
    }

    // Save to File Store & In-Memory
    const fileMandals = loadMandalsFromFile();
    const merged = mergeAllMandals([createdMandal], fileMandals, inMemoryMandals);
    inMemoryMandals = merged;
    saveMandalsToFile(merged);

    return { success: true, mandal: createdMandal, slug: createdMandal.slug };
  } catch (err) {
    console.error("registerMandal error:", err);
    return { success: false, error: err.message || "नोंदणी करताना त्रुटी आली." };
  }
}

export async function getAllMandals() {
  let dbMandals = [];
  try {
    const dbRes = await prisma.mandal.findMany({
      include: {
        events: true,
        members: true,
        gallery: true
      },
      orderBy: { createdAt: "desc" }
    });
    if (dbRes && dbRes.length > 0) {
      dbMandals = dbRes;
    }
  } catch (err) {
    // DB offline fallback
  }

  const fileMandals = loadMandalsFromFile();
  const allMerged = mergeAllMandals(dbMandals, fileMandals, inMemoryMandals);
  inMemoryMandals = allMerged;
  saveMandalsToFile(allMerged);
  return allMerged;
}

export async function getMandalBySlug(slug) {
  if (!slug) return null;
  const targetSlug = decodeURIComponent(slug).trim().toLowerCase();

  // Check merged list first to ensure no delay
  const allMandals = await getAllMandals();
  const foundInMerged = allMandals.find(
    m => (m.slug && m.slug.toLowerCase() === targetSlug) || (m.id && m.id.toLowerCase() === targetSlug)
  );

  if (foundInMerged) return foundInMerged;

  // DB Direct fallback
  try {
    const dbMandal = await prisma.mandal.findFirst({
      where: {
        OR: [
          { slug: { equals: targetSlug, mode: "insensitive" } },
          { id: targetSlug }
        ]
      },
      include: {
        events: { orderBy: { order: "asc" } },
        members: { orderBy: { order: "asc" } },
        gallery: { orderBy: { order: "asc" } }
      }
    });

    if (dbMandal) return dbMandal;
  } catch (dbErr) {
    // Ignore
  }

  return DEMO_MANDALS[0];
}

export async function approveMandalStatus(id, newStatus = "APPROVED") {
  try {
    let updatedMandal = null;
    try {
      updatedMandal = await prisma.mandal.update({
        where: { id },
        data: { status: newStatus }
      });
    } catch (dbErr) {
      // Fallback
    }

    const allMandals = loadMandalsFromFile();
    const target = allMandals.find(m => m.id === id || m.slug === id);
    if (target) {
      target.status = newStatus;
    }
    if (updatedMandal) {
      updateInMemoryMandal(id, updatedMandal);
    } else if (target) {
      updateInMemoryMandal(id, target);
    }

    return { success: true, mandal: updatedMandal || target };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export async function updateInMemoryMandal(id, data) {
  const fileMandals = loadMandalsFromFile();
  const index = fileMandals.findIndex(m => m.id === id || (data.slug && m.slug === data.slug));
  if (index !== -1) {
    fileMandals[index] = { ...fileMandals[index], ...data };
  } else {
    fileMandals.unshift({ id: id || "mandal-" + Date.now(), ...data });
  }
  inMemoryMandals = fileMandals;
  saveMandalsToFile(fileMandals);
  return { success: true, mandal: data };
}

export async function deleteMandalFromStore(id) {
  const fileMandals = loadMandalsFromFile();
  inMemoryMandals = fileMandals.filter(m => m.id !== id && m.slug !== id);
  saveMandalsToFile(inMemoryMandals);
  return { success: true };
}
