import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  createStripeCheckoutSession,
  retrieveCheckoutSession,
  verifyPaymentStatus,
} from "./stripe-service";

export const stripeRouter = router({
  /**
   * Create a Stripe checkout session for card or Bizum payment
   */
  createCheckoutSession: publicProcedure
    .input(
      z.object({
        amount: z.number().positive(),
        paymentMethod: z.enum(["card", "bizum"]),
        returnUrl: z.string().url(),
        cancelUrl: z.string().url(),
        customerEmail: z.string().email().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const result = await createStripeCheckoutSession({
          amount: input.amount,
          paymentMethod: input.paymentMethod,
          returnUrl: input.returnUrl,
          cancelUrl: input.cancelUrl,
          customerEmail: input.customerEmail,
        });

        return {
          success: true,
          sessionId: result.sessionId,
          checkoutUrl: result.checkoutUrl,
        };
      } catch (error) {
        console.error("[Stripe Router] Create checkout error:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),

  /**
   * Retrieve checkout session details
   */
  getCheckoutSession: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input }) => {
      try {
        const session = await retrieveCheckoutSession(input.sessionId);
        return {
          success: true,
          session: {
            id: session.id,
            payment_status: session.payment_status,
            customer_email: session.customer_email,
            amount_total: session.amount_total,
          },
        };
      } catch (error) {
        console.error("[Stripe Router] Get session error:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),

  /**
   * Verify payment status after Stripe redirect
   */
  verifyCheckout: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const result = await verifyPaymentStatus(input.sessionId);
        return result;
      } catch (error) {
        console.error("[Stripe Router] Verify checkout error:", error);
        return {
          success: false,
          status: "error",
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),
});
