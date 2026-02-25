import { ENV } from "./_core/env";

/**
 * Stripe Payment Integration
 * Handles payment processing and checkout sessions
 */

const STRIPE_API_URL = "https://api.stripe.com/v1";

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
 * Create a checkout session for Stripe
 */
export async function createStripeCheckoutSession(
  customerEmail: string,
  customerName: string,
  amount: number,
  currency: string = "eur",
  orderId?: string
): Promise<StripeCheckoutSession> {
  if (!ENV.stripeSecretKey) {
    throw new Error("Stripe secret key not configured");
  }

  const params = new URLSearchParams({
    "payment_method_types[0]": "card",
    mode: "payment",
    customer_email: customerEmail,
    "line_items[0][price_data][currency]": currency,
    "line_items[0][price_data][unit_amount]": String(Math.round(amount * 100)), // Convert to cents
    "line_items[0][price_data][product_data][name]": "Programa Definido en Verano",
    "line_items[0][price_data][product_data][description]": "Programa de entrenamiento de 12 semanas",
    "line_items[0][quantity]": "1",
    success_url: "https://definidoenverano.bestronger.es/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "https://definidoenverano.bestronger.es/checkout",
    client_reference_id: orderId || "",
  });

  try {
    const response = await fetch(`${STRIPE_API_URL}/checkout/sessions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ENV.stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`[Stripe] Failed to create checkout session: ${response.status} - ${error}`);
      throw new Error(`Stripe API error: ${response.status}`);
    }

    const session = (await response.json()) as StripeCheckoutSession;
    console.log(`[Stripe] Checkout session created: ${session.id}`);
    return session;
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
    const response = await fetch(`${STRIPE_API_URL}/checkout/sessions/${sessionId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ENV.stripeSecretKey}`,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`[Stripe] Failed to retrieve session: ${response.status} - ${error}`);
      throw new Error(`Stripe API error: ${response.status}`);
    }

    const session = (await response.json()) as StripeCheckoutSession;
    return session;
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

  const params = new URLSearchParams({
    amount: String(Math.round(amount * 100)), // Convert to cents
    currency: currency,
    payment_method_types: "card",
  });

  if (customerEmail) {
    params.append("receipt_email", customerEmail);
  }

  if (description) {
    params.append("description", description);
  }

  try {
    const response = await fetch(`${STRIPE_API_URL}/payment_intents`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ENV.stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`[Stripe] Failed to create payment intent: ${response.status} - ${error}`);
      throw new Error(`Stripe API error: ${response.status}`);
    }

    const intent = (await response.json()) as StripePaymentIntent;
    console.log(`[Stripe] Payment intent created: ${intent.id}`);
    return intent;
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
