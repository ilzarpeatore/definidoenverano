import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Customers table - Información de clientes que compran el programa
 */
export const customers = mysqlTable("customers", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  phone: varchar("phone", { length: 20 }),
  firstName: varchar("firstName", { length: 100 }),
  lastName: varchar("lastName", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Customer = typeof customers.$inferSelect;
export type InsertCustomer = typeof customers.$inferInsert;

/**
 * Orders table - Órdenes de compra
 */
export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  customerId: int("customerId").notNull(),
  orderId: varchar("orderId", { length: 100 }).notNull().unique(),
  amount: int("amount").notNull(),
  currency: varchar("currency", { length: 3 }).default("EUR").notNull(),
  status: mysqlEnum("status", ["pending", "completed", "failed", "refunded"])
    .default("pending")
    .notNull(),
  paymentMethod: varchar("paymentMethod", { length: 50 }),
  paymentIntentId: varchar("paymentIntentId", { length: 255 }),
  paypalOrderId: varchar("paypalOrderId", { length: 255 }),
  klarnaOrderId: varchar("klarnaOrderId", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

/**
 * Assessment Responses - Respuestas del cuestionario de evaluación
 */
export const assessmentResponses = mysqlTable("assessmentResponses", {
  id: int("id").autoincrement().primaryKey(),
  customerId: int("customerId").notNull(),
  orderId: int("orderId").notNull(),
  experienceLevel: varchar("experienceLevel", { length: 50 }),
  yearsTraining: int("yearsTraining"),
  mainGoal: varchar("mainGoal", { length: 100 }),
  bodyAreasToImprove: text("bodyAreasToImprove"),
  musclesToDevelop: text("musclesToDevelop"),
  availableTime: varchar("availableTime", { length: 50 }),
  motivation: text("motivation"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AssessmentResponse = typeof assessmentResponses.$inferSelect;
export type InsertAssessmentResponse = typeof assessmentResponses.$inferInsert;

/**
 * Customer Notes - Notas internas sobre clientes
 */
export const customerNotes = mysqlTable("customerNotes", {
  id: int("id").autoincrement().primaryKey(),
  customerId: int("customerId").notNull(),
  note: text("note").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CustomerNote = typeof customerNotes.$inferSelect;
export type InsertCustomerNote = typeof customerNotes.$inferInsert;

/**
 * Audit Log - Historial de cambios y acciones
 */
export const auditLog = mysqlTable("auditLog", {
  id: int("id").autoincrement().primaryKey(),
  customerId: int("customerId"),
  orderId: int("orderId"),
  action: varchar("action", { length: 100 }).notNull(),
  description: text("description"),
  oldValue: text("oldValue"),
  newValue: text("newValue"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AuditLog = typeof auditLog.$inferSelect;
export type InsertAuditLog = typeof auditLog.$inferInsert;

/**
 * Leads table - Contactos capturados por popup y recursos gratuitos
 */
export const leads = mysqlTable("leads", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  firstName: varchar("firstName", { length: 100 }).notNull(),
  lastName: varchar("lastName", { length: 100 }).notNull(),
  source: mysqlEnum("source", ["popup_free_week", "free_resource_guide", "free_resource_calculator", "free_resource_checklist"]).notNull(),
  status: mysqlEnum("status", ["subscribed", "unsubscribed"]).default("subscribed").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;

/**
 * Free Resources - Gestión de descargas de recursos gratuitos
 */
export const freeResources = mysqlTable("freeResources", {
  id: int("id").autoincrement().primaryKey(),
  leadId: int("leadId").notNull(),
  resourceType: mysqlEnum("resourceType", ["guide_7_errors", "calculator_macros", "checklist_30_days"]).notNull(),
  downloadedAt: timestamp("downloadedAt").defaultNow().notNull(),
});

export type FreeResource = typeof freeResources.$inferSelect;
export type InsertFreeResource = typeof freeResources.$inferInsert;
