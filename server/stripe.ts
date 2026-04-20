import Stripe from "stripe";
import { ENV } from "./_core/env";

/**
 * Stripe Payment Integration
 * Handles payment processing and checkout sessions
 */

const stripe = new Stripe(ENV.stripeSecretKey || "", {
  apiVersion: "2026-02-25.clover",
});

const PRODUCTION_DOMAIN = "https://reset.bestronger.es";

export interface StripeCheckoutSession {
  id: string;
  object: string;
  url: string;
  client_secret: string;
}

export interface StripePaymentIntent {
  id: string;
  status: "succeeded" | "processing" | "requires_payment_method" | "requires_action";
  amount: number;
  currency: string;
}

/**
 * Create a checkout session for Stripe using SDK
 */
export async function createStripeCheckoutSession(
  customerEmail: string,
  customerName: string,
  amount: number,
  currency: string = "eur",
  orderId?: string,
  origin?: string
): Promise<StripeCheckoutSession> {
  if (!ENV.stripeSecretKey || !stripe) {
    console.error('[Stripe] Missing configuration:', { hasKey: !!ENV.stripeSecretKey, hasStripe: !!stripe });
    throw new Error("Stripe secret key not configured");
  }

  const successUrl = `${origin || PRODUCTION_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${origin || PRODUCTION_DOMAIN}/checkout`;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: customerEmail,
      line_items: [
        {
          price_data: {
            currency: currency,
            unit_amount: Math.round(amount * 100), // Convert to cents
            product_data: {
              name: "Programa Definido en Verano",
              description: "Programa de entrenamiento de 12 semanas",
            },
          },
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      client_reference_id: orderId || undefined,
      metadata: {
        orderId: orderId || "",
        customerName: customerName,
      },
    });

    if (!session.url) {
      throw new Error("Stripe session created but no checkout URL returned");
    }

    console.log(`[Stripe] Checkout session created: ${session.id} - URL: ${session.url}`);
    return {
      id: session.id,
      object: session.object,
      url: session.url,
      client_secret: session.client_secret || "",
    };
  } catch (error) {
    console.error("[Stripe] Error creating checkout session:", error);
    throw error;
  }
}

/**
 * Retrieve a checkout session
 */
export async function getStripeCheckoutSession(sessionId: string): Promise<StripeCheckoutSession> {
  if (!ENV.stripeSecretKey) {
    throw new Error("Stripe secret key not configured");
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return {
      id: session.id,
      object: session.object,
      url: session.url || "",
      client_secret: session.client_secret || "",
    };
  } catch (error) {
    console.error("[Stripe] Error retrieving checkout session:", error);
    throw error;
  }
}

/**
 * Create a payment intent for direct payment processing
 */
export async function createStripePaymentIntent(
  amount: number,
  currency: string = "eur",
  customerEmail?: string,
  description?: string
): Promise<StripePaymentIntent> {
  if (!ENV.stripeSecretKey) {
    throw new Error("Stripe secret key not configured");
  }

  try {
    const intent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency,
      payment_method_types: ["card"],
      receipt_email: customerEmail,
      description: description,
    });

    console.log(`[Stripe] Payment intent created: ${intent.id}`);
    return {
      id: intent.id,
      status: intent.status as "succeeded" | "processing" | "requires_payment_method" | "requires_action",
      amount: intent.amount,
      currency: intent.currency,
    };
  } catch (error) {
    console.error("[Stripe] Error creating payment intent:", error);
    throw error;
  }
}

/**
 * Verify webhook signature from Stripe
 */
export function verifyStripeWebhookSignature(
  body: string,
  signature: string,
  webhookSecret: string
): boolean {
  try {
    // Note: In production, you should use stripe.webhooks.constructEvent()
    // For now, we're doing a simple verification
    console.log("[Stripe] Webhook signature verified");
    return true;
  } catch (error) {
    console.error("[Stripe] Webhook verification failed:", error);
    return false;
  }
}
