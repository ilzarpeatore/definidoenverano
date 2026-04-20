import { Express, Request, Response, raw } from "express";
import { handleStripeWebhookEvent, verifyStripeWebhookSignature } from "./stripe-webhook";

/**
 * Register webhook endpoints
 */
export function registerWebhookHandlers(app: Express) {
  // Stripe webhook endpoint
  // Note: This must use raw body parser, not JSON
  app.post(
    "/api/webhooks/stripe",
    raw({ type: "application/json" }),
    async (req: Request, res: Response) => {
      try {
        const signature = req.headers["stripe-signature"] as string;
        const body = req.body;

        if (!signature) {
          console.error("[Webhook] Missing Stripe signature");
          return res.status(400).json({ error: "Missing signature" });
        }

        if (!body) {
          console.error("[Webhook] Missing request body");
          return res.status(400).json({ error: "Missing body" });
        }

        // Verify signature
        const isValid = verifyStripeWebhookSignature(
          typeof body === "string" ? body : JSON.stringify(body),
          signature
        );

        if (!isValid) {
          console.error("[Webhook] Invalid Stripe signature");
          return res.status(401).json({ error: "Invalid signature" });
        }

        // Handle the webhook event
        const result = await handleStripeWebhookEvent(
          typeof body === "string" ? body : JSON.stringify(body),
          signature
        );

        if (result.success) {
          console.log(`[Webhook] Stripe webhook processed successfully: ${result.message}`);
          return res.status(200).json({ received: true, message: result.message });
        } else {
          console.error(`[Webhook] Stripe webhook error: ${result.message}`);
          return res.status(400).json({ error: result.message });
        }
      } catch (error) {
        console.error("[Webhook] Stripe webhook handler error:", error);
        return res.status(500).json({
          error: error instanceof Error ? error.message : "Internal server error",
        });
      }
    }
  );

  console.log("[Webhook] Webhook handlers registered");
}
