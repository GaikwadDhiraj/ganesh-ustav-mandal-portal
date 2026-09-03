"use server";

import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { getAllMandals, approveMandalStatus, deleteMandalFromStore } from "./mandalActions";

let inMemorySettings = {
  id: "default-settings",
  adminUpiId: "8600570542@paytm",
  registrationFee: 501
};

export async function getAdminDashboardStats() {
  const mandals = await getAllMandals();
  const settings = await getPlatformSettings();
  
  const total = mandals.length;
  const pending = mandals.filter(m => m.status === "PENDING").length;
  const approved = mandals.filter(m => m.status === "APPROVED").length;
  const rejected = mandals.filter(m => m.status === "REJECTED").length;

  return {
    total,
    pending,
    approved,
    rejected,
    mandals,
    settings
  };
}

export async function updateMandalStatusAdmin(id, status, customSlug = null) {
  try {
    const updateData = { status };
    if (customSlug) {
      updateData.slug = slugify(customSlug);
    }
    const updated = await prisma.mandal.update({
      where: { id },
      data: updateData
    });
    return { success: true, mandal: updated };
  } catch (err) {
    return await approveMandalStatus(id, status);
  }
}

export async function deleteMandalAdmin(id) {
  try {
    try {
      await prisma.$transaction([
        prisma.eventSchedule.deleteMany({ where: { mandalId: id } }),
        prisma.mandalMember.deleteMany({ where: { mandalId: id } }),
        prisma.galleryImage.deleteMany({ where: { mandalId: id } }),
        prisma.mandal.delete({ where: { id } })
      ]);
    } catch (dbErr) {
      deleteMandalFromStore(id);
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message || "हटवताना त्रुटी आली." };
  }
}

export async function getPlatformSettings() {
  try {
    const setting = await prisma.platformSetting.findFirst();
    if (setting) return setting;
  } catch (err) {
    // Fallback to in-memory settings
  }
  return inMemorySettings;
}

export async function updatePlatformSettings(adminUpiId, registrationFee) {
  try {
    const feeNumber = parseFloat(registrationFee) || 501;
    try {
      const updated = await prisma.platformSetting.upsert({
        where: { id: "default-settings" },
        update: { adminUpiId, registrationFee: feeNumber },
        create: { id: "default-settings", adminUpiId, registrationFee: feeNumber }
      });
      inMemorySettings = updated;
      return { success: true, settings: updated };
    } catch (dbErr) {
      inMemorySettings = { id: "default-settings", adminUpiId, registrationFee: feeNumber };
      return { success: true, settings: inMemorySettings };
    }
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export async function updateMandalAdmin(id, data) {
  try {
    const targetSlug = slugify(data.slug || data.name);
    
    try {
      // Transactional delete & recreate related arrays to support full edit capabilities
      const updated = await prisma.$transaction(async (tx) => {
        // Delete existing relations
        await tx.eventSchedule.deleteMany({ where: { mandalId: id } });
        await tx.mandalMember.deleteMany({ where: { mandalId: id } });
        await tx.galleryImage.deleteMany({ where: { mandalId: id } });

        // Update Mandal scalar fields & recreate relations
        return await tx.mandal.update({
          where: { id },
          data: {
            slug: targetSlug,
            name: data.name,
            tagline: data.tagline,
            establishedYear: data.establishedYear,
            address: data.address,
            city: data.city,
            contactPerson: data.contactPerson,
            contactPhone: data.contactPhone,
            contactEmail: data.contactEmail,
            shortDescription: (data.shortDescription || "").slice(0, 150),
            aboutText: (data.aboutText || "").slice(0, 1000),
            heroImageUrl: data.heroImageUrl,
            upiId: data.upiId,
            qrCodeUrl: data.qrCodeUrl,
            googleMapUrl: data.googleMapUrl,
            registrationFeeTxnId: data.registrationFeeTxnId,
            registrationFeeAmount: parseFloat(data.registrationFeeAmount) || 501,
            status: data.status,
            aboutHighlight1Title: data.aboutHighlight1Title,
            aboutHighlight1Desc: data.aboutHighlight1Desc,
            aboutHighlight2Title: data.aboutHighlight2Title,
            aboutHighlight2Desc: data.aboutHighlight2Desc,
            aboutHighlight3Title: data.aboutHighlight3Title,
            aboutHighlight3Desc: data.aboutHighlight3Desc,
            aboutHighlight4Title: data.aboutHighlight4Title,
            aboutHighlight4Desc: data.aboutHighlight4Desc,
            events: {
              create: (data.events || []).map((e, idx) => ({
                dayTitle: e.dayTitle || `दिवस ${idx + 1}`,
                eventTime: e.eventTime || "वेळ",
                title: e.title || "कार्यक्रम",
                description: e.description || "",
                order: idx
              }))
            },
            members: {
              create: (data.members || []).map((m, idx) => ({
                name: m.name || "सदस्य",
                designation: m.designation || "कार्यकर्ते",
                imageUrl: m.imageUrl || "",
                order: idx
              }))
            },
            gallery: {
              create: (data.gallery || []).map((g, idx) => ({
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
      });
      return { success: true, mandal: updated };
    } catch (dbErr) {
      console.warn("DB update fallback:", dbErr.message);
      return { success: true, mandal: data };
    }
  } catch (err) {
    return { success: false, error: err.message };
  }
}
