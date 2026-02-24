import { eq } from "drizzle-orm";
import { getDb } from "./db";
import { assessmentResponses, customers, orders } from "../drizzle/schema";
import type { InsertCustomer, InsertOrder, InsertAssessmentResponse } from "../drizzle/schema";

/**
 * Payment & Customer Database Helpers
 */

export async function createCustomer(data: InsertCustomer) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(customers).values(data);
  return result;
}

export async function getCustomerByEmail(email: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db
    .select()
    .from(customers)
    .where(eq(customers.email, email))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function getOrCreateCustomer(email: string, phone?: string, firstName?: string, lastName?: string) {
  let customer = await getCustomerByEmail(email);

  if (!customer) {
    await createCustomer({
      email,
      phone,
      firstName,
      lastName,
    });
    customer = await getCustomerByEmail(email);
  }

  return customer;
}

export async function createOrder(data: InsertOrder) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(orders).values(data);
  return result;
}

export async function getOrderByOrderId(orderId: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db
    .select()
    .from(orders)
    .where(eq(orders.orderId, orderId))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function updateOrderStatus(
  orderId: string,
  status: "pending" | "completed" | "failed" | "refunded",
  paymentMethod?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db
    .update(orders)
    .set({
      status,
      paymentMethod,
      updatedAt: new Date(),
    })
    .where(eq(orders.orderId, orderId));

  return result;
}

export async function saveAssessmentResponse(data: InsertAssessmentResponse) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(assessmentResponses).values(data);
  return result;
}

export async function getAssessmentByCustomerId(customerId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db
    .select()
    .from(assessmentResponses)
    .where(eq(assessmentResponses.customerId, customerId))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

/**
 * Generate unique order ID
 */
export function generateOrderId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `ORDER-${timestamp}-${random}`.toUpperCase();
}
