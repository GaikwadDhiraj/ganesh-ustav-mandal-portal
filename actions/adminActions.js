"use server";

import { getAllMandals, approveMandalStatus } from "./mandalActions";

export async function getAdminDashboardStats() {
  const mandals = await getAllMandals();
  const total = mandals.length;
  const pending = mandals.filter(m => m.status === "PENDING").length;
  const approved = mandals.filter(m => m.status === "APPROVED").length;
  const rejected = mandals.filter(m => m.status === "REJECTED").length;

  return {
    total,
    pending,
    approved,
    rejected,
    mandals
  };
}

export async function updateMandalStatusAdmin(id, status) {
  return await approveMandalStatus(id, status);
}
