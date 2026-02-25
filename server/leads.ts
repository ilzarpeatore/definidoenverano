import { eq } from "drizzle-orm";
import { leads, freeResources, InsertLead, InsertFreeResource } from "../drizzle/schema";
import { getDb } from "./db";

/**
 * Crear un nuevo lead desde el popup o recursos gratuitos
 */
export async function createLead(data: InsertLead) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    const result = await db.insert(leads).values(data);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create lead:", error);
    throw error;
  }
}

/**
 * Obtener un lead por email
 */
export async function getLeadByEmail(email: string) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(leads).where(eq(leads.email, email)).limit(1);
  return result.length > 0 ? result[0] : null;
}

/**
 * Registrar descarga de recurso gratuito
 */
export async function recordFreeResourceDownload(leadId: number, resourceType: "guide_7_errors" | "calculator_macros" | "checklist_30_days") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    await db.insert(freeResources).values({
      leadId,
      resourceType,
    });
  } catch (error) {
    console.error("[Database] Failed to record resource download:", error);
    throw error;
  }
}

/**
 * Obtener todos los leads
 */
export async function getAllLeads() {
  const db = await getDb();
  if (!db) return [];

  try {
    const result = await db.select().from(leads).orderBy(leads.createdAt);
    return result;
  } catch (error) {
    console.error("[Database] Failed to get leads:", error);
    return [];
  }
}

/**
 * Obtener leads por fuente
 */
export async function getLeadsBySource(source: "popup_free_week" | "free_resource_guide" | "free_resource_calculator" | "free_resource_checklist") {
  const db = await getDb();
  if (!db) return [];

  try {
    const result = await db.select().from(leads).where(eq(leads.source, source));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get leads by source:", error);
    return [];
  }
}
