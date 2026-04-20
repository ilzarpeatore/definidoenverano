import Stripe from "stripe";
import { ENV } from "./_core/env";
import { getDb } from "./db";
import { customers, orders } from "../drizzle/schema";
import { sendPurchaseWelcomeEmail } from "./email-service";
import { trackMetaConversion } from "./meta";
import { eq } from "drizzle-orm";

const stripe = new Stripe(ENV.stripeSecretKey, {
  apiVersion: "2026-02-25.clover",
});

// Webhook secret should be set via environment variable
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";

/**
 * Verify Stripe webhook signature
 */
export function verifyStripeWebhookSignature(
  body: string,
  signature: string
): boolean {
  try {
    stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);
    return true;
  } catch (error) {
    console.error("[Stripe Webhook] Signature verification failed:", error);
    return false;
  }
}

/**
 * Handle Stripe webhook events
 */
export async function handleStripeWebhookEvent(
  body: string,
  signature: string
): Promise<{ success: boolean; message: string }> {
  if (!STRIPE_WEBHOOK_SECRET) {
    console.error("[Stripe Webhook] Webhook secret not configured");
    return {
      success: false,
      message: "Webhook secret not configured",
    };
  }

  try {
    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      STRIPE_WEBHOOK_SECRET
    );

    console.log(`[Stripe Webhook] Received event: ${event.type}`);

    // Handle different event types
    switch (event.type) {
      case "checkout.session.completed":
        return await handleCheckoutSessionCompleted(
          event.data.object as Stripe.Checkout.Session
        );

      case "payment_intent.succeeded":
        return await handlePaymentIntentSucceeded(
          event.data.object as Stripe.PaymentIntent
        );

      case "charge.refunded":
        return await handleChargeRefunded(event.data.object as Stripe.Charge);

      default:
        console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
        return {
          success: true,
          message: `Event type ${event.type} received but not processed`,
        };
    }
  } catch (error) {
    console.error("[Stripe Webhook] Error processing webhook:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Handle checkout.session.completed event
 */
async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
): Promise<{ success: boolean; message: string }> {
  try {
    console.log(
      `[Stripe Webhook] Processing checkout session: ${session.id}`
    );

    const customerEmail = session.customer_email;
    const customerName = session.customer_details?.name || "Valued Customer";
    const amount = session.amount_total ? session.amount_total / 100 : 0;
    const paymentMethod = session.payment_method_types[0] || "unknown";

    if (!customerEmail) {
      console.error("[Stripe Webhook] No customer email found in session");
      return {
        success: false,
        message: "No customer email found",
      };
    }

    const db = await getDb();
    if (!db) {
      console.error("[Stripe Webhook] Database not available");
      return {
        success: false,
        message: "Database not available",
      };
    }

    // Split name into first and last
    const nameParts = customerName.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ");

    // Create or update customer
    let customerId: number;
    try {
      const existingCustomers = await db
        .select()
        .from(customers)
        .where(eq(customers.email, customerEmail))
        .limit(1);

      if (existingCustomers.length > 0) {
        customerId = existingCustomers[0].id;
      } else {
        const result = await db.insert(customers).values({
          email: customerEmail,
          firstName: firstName,
          lastName: lastName,
        });

        customerId = (result as any).insertId as number;
      }
    } catch (dbError) {
      console.error("[Stripe Webhook] Error creating/updating customer:", dbError);
      throw dbError;
    }

    // Create order record
    try {
      await db.insert(orders).values({
        customerId: customerId,
        orderId: session.id,
        amount: Math.round(amount * 100), // Store as cents
        currency: "EUR",
        status: "completed",
        paymentMethod: paymentMethod,
        paymentIntentId: session.payment_intent as string,
      });

      console.log(`[Stripe Webhook] Order created: ${session.id}`);
    } catch (orderError) {
      console.error("[Stripe Webhook] Error creating order:", orderError);
      throw orderError;
    }

    // Send welcome email
    try {
      await sendPurchaseWelcomeEmail({
        email: customerEmail,
        firstName: firstName,
        lastName: lastName,
        orderId: session.id,
        amount: amount,
        paymentMethod: paymentMethod,
        accessUrl: `${process.env.VITE_APP_URL || "https://reset.bestronger.es"}/app/access?token=${session.id}`,
      });

      console.log(`[Stripe Webhook] Welcome email sent to ${customerEmail}`);
    } catch (emailError) {
      console.error(
        "[Stripe Webhook] Error sending welcome email:",
        emailError
      );
      // Don't fail the webhook if email fails
    }

    // Track conversion in Meta Pixel
    try {
      await trackMetaConversion({
        email: customerEmail,
        firstName: firstName,
        lastName: lastName,
        amount: amount,
        currency: "EUR",
        orderId: session.id,
      });

      console.log(
        `[Stripe Webhook] Meta conversion tracked for ${customerEmail}`
      );
    } catch (metaError) {
      console.error("[Stripe Webhook] Error tracking Meta conversion:", metaError);
      // Don't fail the webhook if Meta tracking fails
    }

    return {
      success: true,
      message: `Payment processed successfully for ${customerEmail}`,
    };
  } catch (error) {
    console.error(
      "[Stripe Webhook] Error handling checkout session completed:",
      error
    );
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Handle payment_intent.succeeded event
 */
async function handlePaymentIntentSucceeded(
  paymentIntent: Stripe.PaymentIntent
): Promise<{ success: boolean; message: string }> {
  try {
    console.log(
      `[Stripe Webhook] Payment intent succeeded: ${paymentIntent.id}`
    );

    // This is typically handled by checkout.session.completed
    // but we keep this for additional payment tracking

    return {
      success: true,
      message: `Payment intent ${paymentIntent.id} succeeded`,
    };
  } catch (error) {
    console.error(
      "[Stripe Webhook] Error handling payment intent succeeded:",
      error
    );
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Handle charge.refunded event
 */
async function handleChargeRefunded(
  charge: Stripe.Charge
): Promise<{ success: boolean; message: string }> {
  try {
    console.log(`[Stripe Webhook] Charge refunded: ${charge.id}`);

    const db = await getDb();
    if (!db) {
      console.error("[Stripe Webhook] Database not available for refund");
      return {
        success: false,
        message: "Database not available",
      };
    }

    if (charge.payment_intent) {
      // Update order status to refunded
      await db
        .update(orders)
        .set({
          status: "refunded",
        })
        .where(eq(orders.paymentIntentId, charge.payment_intent as string));

      console.log(`[Stripe Webhook] Order refund status updated for charge ${charge.id}`);
    }

    return {
      success: true,
      message: `Charge ${charge.id} refunded`,
    };
  } catch (error) {
    console.error("[Stripe Webhook] Error handling charge refunded:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
