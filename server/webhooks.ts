import Stripe from "stripe";
import { notifyOwner } from "./_core/notification";
import { getDb } from "./db";
import { orders } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { trackMetaConversion } from "./meta";
import { getOrderByOrderId, getCustomerByEmail } from "./payments";
import { sendBrevoEmail } from "./brevo";

const stripe = new Stripe(process.env.STRIPE_SK || "", {
  apiVersion: "2026-02-25.clover",
});

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";

/**
 * Procesa eventos de webhook de Stripe
 * Detecta pagos completados y envía notificaciones
 */
export async function handleStripeWebhook(
  body: string,
  signature: string
): Promise<{ success: boolean; message: string }> {
  if (!WEBHOOK_SECRET) {
    return {
      success: false,
      message: "STRIPE_WEBHOOK_SECRET no configurado",
    };
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, WEBHOOK_SECRET);
  } catch (err) {
    const error = err as Error;
    console.error("[Webhook] Error verificando firma:", error.message);
    return {
      success: false,
      message: `Error verificando firma: ${error.message}`,
    };
  }

  console.log(`[Webhook] Evento recibido: ${event.type}`);

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentIntentSucceeded(paymentIntent);
        break;
      }

      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;
        await handleChargeRefunded(charge);
        break;
      }

      default:
        console.log(`[Webhook] Evento no manejado: ${event.type}`);
    }

    return {
      success: true,
      message: `Evento ${event.type} procesado correctamente`,
    };
  } catch (err) {
    const error = err as Error;
    console.error("[Webhook] Error procesando evento:", error.message);
    return {
      success: false,
      message: `Error procesando evento: ${error.message}`,
    };
  }
}

/**
 * Maneja checkout.session.completed
 * Se dispara cuando el cliente completa el checkout
 */
async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
): Promise<void> {
  const sessionId = session.id;
  const customerId = session.customer_email || session.customer as string;
  const amount = session.amount_total || 0;
  const currency = session.currency || "eur";

  console.log(
    `[Webhook] Checkout completado: ${sessionId} - ${customerId} - €${amount / 100}`
  );

  // Actualizar orden en la base de datos
  if (session.metadata?.orderId) {
    const db = await getDb();
    if (db) {
      await db
        .update(orders)
        .set({
          status: "completed",
          paymentIntentId: session.payment_intent as string,
          updatedAt: new Date(),
        })
        .where(eq(orders.orderId, session.metadata.orderId));

      console.log(`[Webhook] Orden actualizada: ${session.metadata.orderId}`);
    } else {
      console.warn(`[Webhook] Base de datos no disponible para actualizar orden`);
    }
  } else {
    console.warn(`[Webhook] No se encontró orderId en metadata de sesión: ${sessionId}`);
  }

  // Notificar al propietario
  await notifyOwner({
    title: "🎉 ¡Nueva venta completada!",
    content: `Cliente: ${customerId}\nMonto: €${(amount / 100).toFixed(2)}\nSesión: ${sessionId}`,
  });

  console.log("[Webhook] Notificación enviada al propietario");

  // Track conversion with Meta Conversions API
  if (session.metadata?.orderId) {
    try {
      const order = await getOrderByOrderId(session.metadata.orderId);
      if (order) {
        const customer = await getCustomerByEmail(customerId);
        if (customer) {
          await trackMetaConversion({
            email: customer.email,
            phone: customer.phone || undefined,
            firstName: customer.firstName || undefined,
            lastName: customer.lastName || undefined,
            amount: amount / 100,
            currency: currency,
            orderId: session.metadata.orderId,
          });
        }
      }
    } catch (error) {
      const err = error as Error;
      console.error("[Webhook] Error tracking Meta conversion:", err.message);
      // Don't throw - conversion tracking failure shouldn't block the webhook
    }
  }

  // Send "Post compra" email with Brevo (Template ID: 1)
  try {
    const customer = await getCustomerByEmail(customerId);
    if (customer) {
      await sendBrevoEmail(
        customer.email,
        1,
        {
          firstName: customer.firstName || "Cliente",
          lastName: customer.lastName || "",
          orderId: session.metadata?.orderId || "",
          amount: (amount / 100).toFixed(2),
          currency: currency.toUpperCase(),
        }
      );
      console.log(`[Webhook] Post compra email sent to: ${customer.email}`);
    }
  } catch (error) {
    const err = error as Error;
    console.error("[Webhook] Error sending post compra email:", err.message);
  }
}

/**
 * Maneja payment_intent.succeeded
 * Se dispara cuando un pago es exitoso
 */
async function handlePaymentIntentSucceeded(
  paymentIntent: Stripe.PaymentIntent
): Promise<void> {
  const amount = paymentIntent.amount || 0;
  const customer = paymentIntent.customer as string;

  console.log(
    `[Webhook] Pago exitoso: ${paymentIntent.id} - €${amount / 100}`
  );

  // Aquí puedes agregar lógica adicional si es necesario
  // Por ejemplo, enviar email de confirmación, crear acceso al programa, etc.
}

/**
 * Maneja charge.refunded
 * Se dispara cuando se reembolsa un pago
 */
async function handleChargeRefunded(charge: Stripe.Charge): Promise<void> {
  const amount = charge.amount_refunded || 0;

  console.log(
    `[Webhook] Reembolso procesado: ${charge.id} - €${amount / 100}`
  );

  // Notificar al propietario sobre reembolsos
  await notifyOwner({
    title: "⚠️ Reembolso procesado",
    content: `Cargo: ${charge.id}\nMonto reembolsado: €${(amount / 100).toFixed(2)}`,
  });
}
