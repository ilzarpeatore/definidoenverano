import { eq, desc, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, informedConsents, InsertInformedConsent, customers, orders, assessmentResponses, freeWeekSignups, InsertFreeWeekSignup } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function saveInformedConsent(consent: InsertInformedConsent): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot save consent: database not available");
    return;
  }

  try {
    await db.insert(informedConsents).values(consent);
  } catch (error) {
    console.error("[Database] Failed to save informed consent:", error);
    throw error;
  }
}

/**
 * Get customer with all related orders and assessments
 */
export async function getCustomerWithDetails(customerId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get customer: database not available");
    return undefined;
  }

  try {
    const customer = await db.select().from(customers).where(eq(customers.id, customerId)).limit(1);
    if (!customer.length) return undefined;

    const customerOrders = await db.select().from(orders).where(eq(orders.customerId, customerId)).orderBy(desc(orders.createdAt));
    const customerAssessments = await db.select().from(assessmentResponses).where(eq(assessmentResponses.customerId, customerId));

    return {
      ...customer[0],
      orders: customerOrders,
      assessments: customerAssessments,
    };
  } catch (error) {
    console.error("[Database] Failed to get customer with details:", error);
    throw error;
  }
}

/**
 * Get all customers with their latest order and assessment status
 */
export async function getAllCustomersWithStatus() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get customers: database not available");
    return [];
  }

  try {
    const allCustomers = await db.select().from(customers).orderBy(desc(customers.createdAt));
    
    const customersWithStatus = await Promise.all(
      allCustomers.map(async (customer) => {
        const latestOrder = await db.select().from(orders).where(eq(orders.customerId, customer.id)).orderBy(desc(orders.createdAt)).limit(1);
        const assessment = await db.select().from(assessmentResponses).where(eq(assessmentResponses.customerId, customer.id)).limit(1);
        
        return {
          ...customer,
          latestOrder: latestOrder[0] || null,
          assessment: assessment[0] || null,
        };
      })
    );

    return customersWithStatus;
  } catch (error) {
    console.error("[Database] Failed to get customers with status:", error);
    throw error;
  }
}

/**
 * Get order with customer and assessment details
 */
export async function getOrderWithDetails(orderId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get order: database not available");
    return undefined;
  }

  try {
    const order = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
    if (!order.length) return undefined;

    const customer = await db.select().from(customers).where(eq(customers.id, order[0].customerId)).limit(1);
    const assessment = await db.select().from(assessmentResponses).where(eq(assessmentResponses.orderId, orderId)).limit(1);

    return {
      ...order[0],
      customer: customer[0] || null,
      assessment: assessment[0] || null,
    };
  } catch (error) {
    console.error("[Database] Failed to get order with details:", error);
    throw error;
  }
}

/**
 * Get assessment with customer and order details
 */
export async function getAssessmentWithDetails(assessmentId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get assessment: database not available");
    return undefined;
  }

  try {
    const assessment = await db.select().from(assessmentResponses).where(eq(assessmentResponses.id, assessmentId)).limit(1);
    if (!assessment.length) return undefined;

    const customer = await db.select().from(customers).where(eq(customers.id, assessment[0].customerId)).limit(1);
    const order = await db.select().from(orders).where(eq(orders.id, assessment[0].orderId)).limit(1);

    return {
      ...assessment[0],
      customer: customer[0] || null,
      order: order[0] || null,
    };
  } catch (error) {
    console.error("[Database] Failed to get assessment with details:", error);
    throw error;
  }
}

export async function createFreeWeekSignup(data: Omit<InsertFreeWeekSignup, 'createdAt' | 'updatedAt' | 'accessToken' | 'accessExpiresAt'> & { accessToken: string; accessExpiresAt: Date }) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const result = await db.insert(freeWeekSignups).values({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return result;
  } catch (error) {
    console.error("[Database] Failed to create free week signup:", error);
    throw error;
  }
}

export async function getFreeWeekSignup(email: string) {
  const db = await getDb();
  if (!db) {
    return undefined;
  }

  try {
    const result = await db.select().from(freeWeekSignups).where(eq(freeWeekSignups.email, email)).limit(1);
    return result[0] || undefined;
  } catch (error) {
    console.error("[Database] Failed to get free week signup:", error);
    throw error;
  }
}

export async function getAllFreeWeekSignups(limit: number = 50, offset: number = 0) {
  const db = await getDb();
  if (!db) {
    return [];
  }

  try {
    const result = await db
      .select()
      .from(freeWeekSignups)
      .orderBy(desc(freeWeekSignups.createdAt))
      .limit(limit)
      .offset(offset);
    return result;
  } catch (error) {
    console.error("[Database] Failed to get free week signups:", error);
    throw error;
  }
}

export async function getFreeWeekSignupsCount() {
  const db = await getDb();
  if (!db) {
    return 0;
  }

  try {
    const result = await db
      .select({ count: sql`COUNT(*)` })
      .from(freeWeekSignups);
    return (result[0]?.count as number) || 0;
  } catch (error) {
    console.error("[Database] Failed to count free week signups:", error);
    throw error;
  }
}

export async function getFreeWeekSignupsBySource(source: 'ads' | 'popup' | 'direct') {
  const db = await getDb();
  if (!db) {
    return [];
  }

  try {
    const result = await db
      .select()
      .from(freeWeekSignups)
      .where(eq(freeWeekSignups.source, source))
      .orderBy(desc(freeWeekSignups.createdAt));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get free week signups by source:", error);
    throw error;
  }
}

// TODO: add feature queries here as your schema grows.

/**
 * Create a new order
 */
export async function createOrder(data: {
  orderId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethod: string;
  assessmentData?: Record<string, unknown>;
}) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create order: database not available");
    return null;
  }

  try {
    // For now, just log the order creation since we don't have a dedicated orders table setup
    console.log("[Database] Order created:", data);
    return data;
  } catch (error) {
    console.error("[Database] Failed to create order:", error);
    throw error;
  }
}

/**
 * Get order by order ID
 */
export async function getOrderByOrderId(orderId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get order: database not available");
    return null;
  }

  try {
    // For now, return a mock order object
    console.log("[Database] Getting order:", orderId);
    return { orderId, status: "pending" };
  } catch (error) {
    console.error("[Database] Failed to get order:", error);
    throw error;
  }
}

/**
 * Get orders by customer ID
 */
export async function getOrderByCustomerId(customerId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get orders: database not available");
    return [];
  }

  try {
    // For now, return empty array
    console.log("[Database] Getting orders for customer:", customerId);
    return [];
  } catch (error) {
    console.error("[Database] Failed to get orders:", error);
    throw error;
  }
}

/**
 * Update order status
 */
export async function updateOrderStatus(
  orderId: string,
  status: string,
  paymentMethod?: string
) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update order: database not available");
    return null;
  }

  try {
    console.log("[Database] Updating order status:", { orderId, status, paymentMethod });
    return { orderId, status };
  } catch (error) {
    console.error("[Database] Failed to update order:", error);
    throw error;
  }
}
