import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createPayPalOrder, capturePayPalOrder } from "./paypal-service";

export const paypalRouter = router({
  /**
   * Create a PayPal order
   */
  createOrder: publicProcedure
    .input(
      z.object({
        amount: z.number().positive(),
        returnUrl: z.string().url(),
        cancelUrl: z.string().url(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { orderId, approvalUrl } = await createPayPalOrder(
          input.amount,
          input.returnUrl,
          input.cancelUrl
        );

        return {
          success: true,
          orderId,
          approvalUrl,
        };
      } catch (error) {
        console.error("[PayPal Router] Create order error:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),

  /**
   * Capture a PayPal order after user approval
   */
  captureOrder: publicProcedure
    .input(
      z.object({
        orderId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const result = await capturePayPalOrder(input.orderId);

        return {
          success: result.status === "COMPLETED",
          status: result.status,
          email: (result.payer as any)?.email_address || "unknown",
          name: (result.payer as any)?.name?.given_name || "Customer",
        };
      } catch (error) {
        console.error("[PayPal Router] Capture order error:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),
});
