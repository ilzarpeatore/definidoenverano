import Stripe from "stripe";
import { ENV } from "./_core/env";

if (!ENV.stripeSecretKey) {
  throw new Error("STRIPE_SK environment variable is not set");
}

const stripe = new Stripe(ENV.stripeSecretKey, {
  apiVersion: "2026-02-25.clover",
});

export interface CreateCheckoutSessionInput {
  amount: number;
  currency?: string;
  paymentMethod: "card" | "bizum";
  returnUrl: string;
  cancelUrl: string;
  customerEmail?: string;
}

export async function createStripeCheckoutSession(
  input: CreateCheckoutSessionInput
): Promise<{ sessionId: string; checkoutUrl: string }> {
  try {
    const paymentMethodTypes: Stripe.Checkout.SessionCreateParams.PaymentMethodType[] =
      input.paymentMethod === "bizum" ? ["card", "ideal"] : ["card"];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: paymentMethodTypes,
      line_items: [
        {
          price_data: {
            currency: input.currency || "eur",
            product_data: {
              name: "Método RESET - Programa de 6 Semanas",
              description: "Acceso completo al programa de entrenamiento",
              images: [
                "https://reset.bestronger.es/logo.png",
              ],
            },
            unit_amount: Math.round(input.amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${input.returnUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: input.cancelUrl,
      customer_email: input.customerEmail,
      locale: "es",
      metadata: {
        paymentMethod: input.paymentMethod,
      },
    });

    if (!session.url) {
      throw new Error("Stripe session URL is undefined");
    }

    return {
      sessionId: session.id,
      checkoutUrl: session.url,
    };
  } catch (error) {
    console.error("[Stripe Service] Create checkout session error:", error);
    throw error;
  }
}

export async function retrieveCheckoutSession(
  sessionId: string
): Promise<Stripe.Checkout.Session> {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session;
  } catch (error) {
    console.error("[Stripe Service] Retrieve session error:", error);
    throw error;
  }
}

export async function verifyPaymentStatus(
  sessionId: string
): Promise<{
  success: boolean;
  status: string;
  email?: string;
  name?: string;
}> {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      return {
        success: true,
        status: "completed",
        email: session.customer_email || undefined,
        name: session.customer_details?.name || undefined,
      };
    }

    return {
      success: false,
      status: session.payment_status || "unknown",
    };
  } catch (error) {
    console.error("[Stripe Service] Verify payment error:", error);
    throw error;
  }
}
