import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  createOrder,
  getOrderByOrderId,
  updateOrderStatus,
  getOrderByCustomerId,
} from "./db";
import {
  createStripeCheckoutSession,
  getStripeCheckoutSession,
} from "./stripe";
import { notifyOwner } from "./_core/notification";

export const paymentsRouter = router({
  /**
   * Create a checkout session
   */
  createCheckoutSession: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        phone: z.string().optional(),
        assessment: z.object({
          age: z.number(),
          painLevel: z.number(),
          motivation: z.string(),
        }),
        origin: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const amount = 50; // €0.50 for testing, change to 197 for production

        // Create order in database
        const orderId = `order_${Date.now()}`;
        await createOrder({
          orderId,
          customerId: input.email,
          customerName: `${input.firstName} ${input.lastName}`,
          customerEmail: input.email,
          customerPhone: input.phone,
          amount,
          currency: "EUR",
          status: "pending",
          paymentMethod: "stripe",
          assessmentData: {
            age: input.assessment.age,
            painLevel: input.assessment.painLevel,
            motivation: input.assessment.motivation,
          },
        });

        // Create Stripe checkout session
        const stripeSession = await createStripeCheckoutSession(
          input.email,
          `${input.firstName} ${input.lastName}`,
          amount,
          "eur",
          orderId,
          input.origin
        );

        console.log('[Payments] Stripe session created:', JSON.stringify(stripeSession));
        console.log('[Payments] Stripe session URL:', stripeSession.url);

        if (!stripeSession.url) {
          throw new Error('Stripe session URL is undefined');
        }

        return {
          success: true,
          orderId,
          customerId: input.email,
          amount,
          currency: "EUR",
          checkoutUrl: stripeSession.url,
          sessionId: stripeSession.id,
        };
      } catch (error) {
        console.error("[Payments] Error creating checkout session:", error);
        throw error;
      }
    }),

  /**
   * Verify Stripe checkout session
   */
  verifyStripeCheckout: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input }) => {
      try {
        const session = await getStripeCheckoutSession(input.sessionId);
        
        console.log('[Payments] Verifying Stripe session:', {
          sessionId: session.id,
          paymentStatus: session.payment_status,
          metadata: session.metadata,
          clientReferenceId: session.client_reference_id,
        });

        // Check if payment was actually completed
        if (session.payment_status !== "paid") {
          console.warn('[Payments] Payment not completed, status:', session.payment_status);
          return {
            success: false,
            sessionId: session.id,
            paymentStatus: session.payment_status || "unpaid",
          };
        }

        // Get the internal orderId from Stripe metadata or client_reference_id
        const orderId = session.metadata?.orderId || session.client_reference_id;
        
        if (!orderId) {
          console.error('[Payments] No orderId found in session metadata');
          return {
            success: false,
            sessionId: session.id,
            paymentStatus: session.payment_status,
            error: "Order ID not found",
          };
        }

        // Update the correct order
        const order = await getOrderByOrderId(orderId);
        if (order) {
          console.log('[Payments] Updating order status:', orderId);
          await updateOrderStatus(order.orderId, "completed", "stripe");
        } else {
          console.warn('[Payments] Order not found:', orderId);
        }

        return {
          success: true,
          sessionId: session.id,
          orderId: orderId,
          paymentStatus: session.payment_status,
        };
      } catch (error) {
        console.error("[Payments] Error verifying Stripe checkout:", error);
        throw error;
      }
    }),

  /**
   * Get order by ID
   */
  getOrder: publicProcedure
    .input(z.object({ orderId: z.string() }))
    .query(async ({ input }) => {
      try {
        const order = await getOrderByOrderId(input.orderId);
        return order;
      } catch (error) {
        console.error("[Payments] Error getting order:", error);
        throw error;
      }
    }),

  /**
   * Get orders by customer email
   */
  getCustomerOrders: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .query(async ({ input }) => {
      try {
        const orders = await getOrderByCustomerId(input.email);
        return orders;
      } catch (error) {
        console.error("[Payments] Error getting customer orders:", error);
        throw error;
      }
    }),
});
