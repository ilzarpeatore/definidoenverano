import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getDb } from "./db";
import { customers, orders } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const paymentRouter = router({
  /**
   * Create a payment record for Bizum manual transfer
   */
  createBizumPayment: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        firstName: z.string(),
        lastName: z.string().optional(),
        phone: z.string().optional(),
        amount: z.number().positive(),
        paymentMethod: z.enum(["bizum", "card", "paypal"]),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const db = await getDb();
        if (!db) {
          return {
            success: false,
            error: "Database not available",
          };
        }

        // Create or get customer
        let customerId: number;
        const existingCustomers = await db
          .select()
          .from(customers)
          .where(eq(customers.email, input.email))
          .limit(1);

        if (existingCustomers.length > 0) {
          customerId = existingCustomers[0].id;
        } else {
          const result = await db.insert(customers).values({
            email: input.email,
            firstName: input.firstName,
            lastName: input.lastName,
            phone: input.phone,
          });

          customerId = (result as any).insertId as number;
        }

        // Create order with pending status for Bizum
        const orderId = `bizum_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const result = await db.insert(orders).values({
          customerId: customerId,
          orderId: orderId,
          amount: Math.round(input.amount * 100), // Store as cents
          currency: "EUR",
          status: "pending", // Bizum payments start as pending
          paymentMethod: input.paymentMethod,
        });

        console.log(
          `[Payment Router] ${input.paymentMethod} payment created for ${input.email}: ${orderId}`
        );

        return {
          success: true,
          orderId: orderId,
          customerId: customerId,
          message: `Payment record created for ${input.paymentMethod}`,
        };
      } catch (error) {
        console.error("[Payment Router] Error creating payment:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),

  /**
   * Get payment status
   */
  getPaymentStatus: publicProcedure
    .input(z.object({ orderId: z.string() }))
    .query(async ({ input }) => {
      try {
        const db = await getDb();
        if (!db) {
          return {
            success: false,
            error: "Database not available",
          };
        }

        const orderResults = await db
          .select()
          .from(orders)
          .where(eq(orders.orderId, input.orderId))
          .limit(1);

        if (orderResults.length === 0) {
          return {
            success: false,
            error: "Order not found",
          };
        }

        const order = orderResults[0];

        return {
          success: true,
          orderId: order.orderId,
          status: order.status,
          paymentMethod: order.paymentMethod,
          amount: order.amount / 100, // Convert back to EUR
          createdAt: order.createdAt,
        };
      } catch (error) {
        console.error("[Payment Router] Error getting payment status:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),

  /**
   * Update payment status (for manual confirmation)
   */
  updatePaymentStatus: publicProcedure
    .input(
      z.object({
        orderId: z.string(),
        status: z.enum(["pending", "completed", "failed", "refunded"]),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const db = await getDb();
        if (!db) {
          return {
            success: false,
            error: "Database not available",
          };
        }

        await db
          .update(orders)
          .set({
            status: input.status,
          })
          .where(eq(orders.orderId, input.orderId));

        console.log(
          `[Payment Router] Payment status updated: ${input.orderId} -> ${input.status}`
        );

        return {
          success: true,
          message: `Payment status updated to ${input.status}`,
        };
      } catch (error) {
        console.error("[Payment Router] Error updating payment status:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),

  /**
   * Get all payments for admin dashboard
   */
  getAllPayments: publicProcedure
    .input(
      z.object({
        limit: z.number().default(50),
        offset: z.number().default(0),
        status: z.enum(["pending", "completed", "failed", "refunded"]).optional(),
      })
    )
    .query(async ({ input }) => {
      try {
        const db = await getDb();
        if (!db) {
          return {
            success: false,
            payments: [],
            error: "Database not available",
          };
        }

        // This is a simplified query - in production you'd want to use proper joins
        const allOrders = await db.select().from(orders).limit(input.limit).offset(input.offset);

        // Filter by status if provided
        const filteredOrders = input.status
          ? allOrders.filter((o) => o.status === input.status)
          : allOrders;

        return {
          success: true,
          payments: filteredOrders.map((order) => ({
            id: order.id,
            orderId: order.orderId,
            customerId: order.customerId,
            amount: order.amount / 100,
            currency: order.currency,
            status: order.status,
            paymentMethod: order.paymentMethod,
            createdAt: order.createdAt,
          })),
        };
      } catch (error) {
        console.error("[Payment Router] Error getting payments:", error);
        return {
          success: false,
          payments: [],
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),
});
