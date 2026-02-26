import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import {
  getOrCreateCustomer,
  createOrder,
  getOrderByOrderId,
  updateOrderStatus,
  saveAssessmentResponse,
  generateOrderId,
} from "./payments";
import { createStripeCheckoutSession, getStripeCheckoutSession } from "./stripe";
import { createPayPalOrder, capturePayPalOrder } from "./paypal";

/**
 * Payment Router - tRPC procedures for payment processing
 */

const assessmentSchema = z.object({
  experienceLevel: z.string(),
  yearsTraining: z.number().optional(),
  mainGoal: z.string(),
  bodyAreasToImprove: z.array(z.string()),
  musclesToDevelop: z.array(z.string()),
  availableTime: z.string(),
  motivation: z.string(),
});

export const paymentsRouter = router({
  /**
   * Create checkout session with Stripe
   * Saves customer info, assessment, and creates Stripe checkout
   */
  createCheckoutSession: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        phone: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        assessment: assessmentSchema,
        origin: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Create or get customer
        const customer = await getOrCreateCustomer(
          input.email,
          input.phone,
          input.firstName,
          input.lastName
        );

        if (!customer) throw new Error("Failed to create customer");

        // Generate unique order ID
        const orderId = generateOrderId();

        // Create order (pending status)
        await createOrder({
          customerId: customer.id,
          orderId,
          amount: 197, // 197€
          currency: "EUR",
          status: "pending",
        });

        // Save assessment responses
        const order = await getOrderByOrderId(orderId);
        if (order) {
          await saveAssessmentResponse({
            customerId: customer.id,
            orderId: order.id,
            experienceLevel: input.assessment.experienceLevel,
            yearsTraining: input.assessment.yearsTraining,
            mainGoal: input.assessment.mainGoal,
            bodyAreasToImprove: JSON.stringify(input.assessment.bodyAreasToImprove),
            musclesToDevelop: JSON.stringify(input.assessment.musclesToDevelop),
            availableTime: input.assessment.availableTime,
            motivation: input.assessment.motivation,
          });
        }

        // Create Stripe checkout session
        const stripeSession = await createStripeCheckoutSession(
          input.email,
          `${input.firstName} ${input.lastName}`,
          197,
          "eur",
          orderId,
          input.origin
        );

        return {
          success: true,
          orderId,
          customerId: customer.id,
          amount: 197,
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
        
        // Update order status based on payment status
        if (session.id) {
          const order = await getOrderByOrderId(input.sessionId);
          if (order) {
            await updateOrderStatus(order.orderId, "completed", "stripe");
          }
        }

        return {
          success: true,
          sessionId: session.id,
          paymentStatus: "completed",
        };
      } catch (error) {
        console.error("[Payments] Error verifying Stripe checkout:", error);
        throw error;
      }
    }),

  /**
   * Process Stripe payment (for direct payment method)
   */
  processStripePayment: publicProcedure
    .input(
      z.object({
        orderId: z.string(),
        paymentIntentId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Update order status
        await updateOrderStatus(input.orderId, "completed", "stripe");

        return {
          success: true,
          orderId: input.orderId,
          message: "Payment processed successfully",
        };
      } catch (error) {
        console.error("[Payments] Error processing Stripe payment:", error);
        await updateOrderStatus(input.orderId, "failed", "stripe");
        throw error;
      }
    }),

  /**
   * Process PayPal payment
   */
  processPayPalPayment: publicProcedure
    .input(
      z.object({
        orderId: z.string(),
        paypalOrderId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Update order status
        await updateOrderStatus(input.orderId, "completed", "paypal");

        return {
          success: true,
          orderId: input.orderId,
          message: "Payment processed successfully",
        };
      } catch (error) {
        console.error("[Payments] Error processing PayPal payment:", error);
        await updateOrderStatus(input.orderId, "failed", "paypal");
        throw error;
      }
    }),

  /**
   * Process Klarna payment
   */
  processKlarnaPayment: publicProcedure
    .input(
      z.object({
        orderId: z.string(),
        klarnaOrderId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Update order status
        await updateOrderStatus(input.orderId, "completed", "klarna");

        return {
          success: true,
          orderId: input.orderId,
          message: "Payment processed successfully",
        };
      } catch (error) {
        console.error("[Payments] Error processing Klarna payment:", error);
        await updateOrderStatus(input.orderId, "failed", "klarna");
        throw error;
      }
    }),

  /**
   * Process Apple Pay payment
   */
  processApplePayPayment: publicProcedure
    .input(
      z.object({
        orderId: z.string(),
        paymentToken: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Update order status
        await updateOrderStatus(input.orderId, "completed", "apple_pay");

        return {
          success: true,
          orderId: input.orderId,
          message: "Payment processed successfully",
        };
      } catch (error) {
        console.error("[Payments] Error processing Apple Pay payment:", error);
        await updateOrderStatus(input.orderId, "failed", "apple_pay");
        throw error;
      }
    }),

  /**
   * Process Google Pay payment
   */
  processGooglePayPayment: publicProcedure
    .input(
      z.object({
        orderId: z.string(),
        paymentToken: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Update order status
        await updateOrderStatus(input.orderId, "completed", "google_pay");

        return {
          success: true,
          orderId: input.orderId,
          message: "Payment processed successfully",
        };
      } catch (error) {
        console.error("[Payments] Error processing Google Pay payment:", error);
        await updateOrderStatus(input.orderId, "failed", "google_pay");
        throw error;
      }
    }),

  /**
   * Create PayPal order
   */
  createPayPalOrder: publicProcedure
    .input(
      z.object({
        orderId: z.string(),
        amount: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const returnUrl = `${process.env.VITE_FRONTEND_FORGE_API_URL || "https://definidoenverano.bestronger.es"}/success?orderId=${input.orderId}`;
        const cancelUrl = `${process.env.VITE_FRONTEND_FORGE_API_URL || "https://definidoenverano.bestronger.es"}/checkout`;

        const paypalOrder = await createPayPalOrder(
          input.amount,
          input.orderId,
          returnUrl,
          cancelUrl
        );

        // Get approval link
        const approvalLink = paypalOrder.links.find(
          (link) => link.rel === "approve"
        );

        return {
          success: true,
          paypalOrderId: paypalOrder.id,
          approvalUrl: approvalLink?.href,
        };
      } catch (error) {
        console.error("[Payments] Error creating PayPal order:", error);
        throw error;
      }
    }),

  /**
   * Capture PayPal order
   */
  capturePayPalOrder: publicProcedure
    .input(
      z.object({
        orderId: z.string(),
        paypalOrderId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const capturedOrder = await capturePayPalOrder(input.paypalOrderId);

        // Update order status
        await updateOrderStatus(input.orderId, "completed", "paypal");

        return {
          success: true,
          orderId: input.orderId,
          paypalOrderId: capturedOrder.id,
          status: capturedOrder.status,
        };
      } catch (error) {
        console.error("[Payments] Error capturing PayPal order:", error);
        await updateOrderStatus(input.orderId, "failed", "paypal");
        throw error;
      }
    }),

  /**
   * Get order status
   */
  getOrderStatus: publicProcedure
    .input(z.object({ orderId: z.string() }))
    .query(async ({ input }) => {
      try {
        const order = await getOrderByOrderId(input.orderId);
        if (!order) throw new Error("Order not found");

        return {
          orderId: order.orderId,
          status: order.status,
          amount: order.amount,
          currency: order.currency,
          paymentMethod: order.paymentMethod,
          createdAt: order.createdAt,
        };
      } catch (error) {
        console.error("[Payments] Error getting order status:", error);
        throw error;
      }
    }),
});
