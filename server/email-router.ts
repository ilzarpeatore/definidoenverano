import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  sendPurchaseWelcomeEmail,
  sendAccessInstructionsEmail,
  sendPaymentConfirmationEmail,
  sendOnboardingEmail,
  sendRefundNotificationEmail,
} from "./email-service";

export const emailRouter = router({
  /**
   * Send welcome email after purchase
   */
  sendPurchaseWelcome: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        orderId: z.string(),
        amount: z.number().positive(),
        paymentMethod: z.string(),
        accessUrl: z.string().url().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await sendPurchaseWelcomeEmail({
          email: input.email,
          firstName: input.firstName,
          lastName: input.lastName,
          orderId: input.orderId,
          amount: input.amount,
          paymentMethod: input.paymentMethod,
          accessUrl: input.accessUrl,
        });

        return {
          success: true,
          message: "Welcome email sent successfully",
        };
      } catch (error) {
        console.error("[Email Router] Send welcome email error:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),

  /**
   * Send access instructions email
   */
  sendAccessInstructions: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        firstName: z.string(),
        accessUrl: z.string().url(),
        password: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await sendAccessInstructionsEmail(
          input.email,
          input.firstName,
          input.accessUrl,
          input.password
        );

        return {
          success: true,
          message: "Access instructions sent successfully",
        };
      } catch (error) {
        console.error("[Email Router] Send access instructions error:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),

  /**
   * Send payment confirmation email
   */
  sendPaymentConfirmation: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        firstName: z.string(),
        orderId: z.string(),
        amount: z.number().positive(),
        paymentMethod: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await sendPaymentConfirmationEmail(
          input.email,
          input.firstName,
          input.orderId,
          input.amount,
          input.paymentMethod
        );

        return {
          success: true,
          message: "Payment confirmation sent successfully",
        };
      } catch (error) {
        console.error("[Email Router] Send payment confirmation error:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),

  /**
   * Send onboarding email
   */
  sendOnboarding: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        firstName: z.string(),
        programStartDate: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await sendOnboardingEmail(
          input.email,
          input.firstName,
          input.programStartDate
        );

        return {
          success: true,
          message: "Onboarding email sent successfully",
        };
      } catch (error) {
        console.error("[Email Router] Send onboarding error:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),

  /**
   * Send refund notification email
   */
  sendRefundNotification: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        firstName: z.string(),
        orderId: z.string(),
        amount: z.number().positive(),
        reason: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await sendRefundNotificationEmail(
          input.email,
          input.firstName,
          input.orderId,
          input.amount,
          input.reason
        );

        return {
          success: true,
          message: "Refund notification sent successfully",
        };
      } catch (error) {
        console.error("[Email Router] Send refund notification error:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),
});
