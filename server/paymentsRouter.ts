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
   * Create checkout session
   * Saves customer info, assessment, and creates order
   */
  createCheckoutSession: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        phone: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        assessment: assessmentSchema,
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
          amount: 19700, // 197€ in cents
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

        return {
          success: true,
          orderId,
          customerId: customer.id,
          amount: 19700,
          currency: "EUR",
        };
      } catch (error) {
        console.error("[Payments] Error creating checkout session:", error);
        throw error;
      }
    }),

  /**
   * Process Stripe payment
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
        // TODO: Verify payment intent with Stripe API
        // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        // const paymentIntent = await stripe.paymentIntents.retrieve(input.paymentIntentId);
        // if (paymentIntent.status !== 'succeeded') throw new Error('Payment not succeeded');

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
        // TODO: Verify order with PayPal API
        // const paypalClient = new PayPalClient(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_SECRET);
        // const order = await paypalClient.getOrder(input.paypalOrderId);
        // if (order.status !== 'COMPLETED') throw new Error('Order not completed');

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
        // TODO: Verify order with Klarna API
        // const klarnaClient = new KlarnaClient(process.env.KLARNA_API_KEY);
        // const order = await klarnaClient.getOrder(input.klarnaOrderId);
        // if (order.status !== 'authorized') throw new Error('Order not authorized');

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
        // TODO: Process Apple Pay token with Stripe
        // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        // const paymentMethod = await stripe.paymentMethods.create({
        //   type: 'card',
        //   card: { token: input.paymentToken }
        // });

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
        // TODO: Process Google Pay token with Stripe
        // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        // const paymentMethod = await stripe.paymentMethods.create({
        //   type: 'card',
        //   card: { token: input.paymentToken }
        // });

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
