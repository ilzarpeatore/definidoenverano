import { ENV } from "./_core/env.ts";
import { addDebugLog } from "./debug-router";

interface PayPalOrder {
  id: string;
  status: string;
  payer?: {
    email_address?: string;
    name?: {
      given_name?: string;
      surname?: string;
    };
  };
  links?: Array<{
    rel: string;
    href: string;
  }>;
}

interface PayPalCreateOrderRequest {
  intent: string;
  purchase_units: Array<{
    amount: {
      currency_code: string;
      value: string;
    };
    description: string;
  }>;
  payment_source: {
    paypal: {
      experience_context: {
        return_url: string;
        cancel_url: string;
        payment_method_preference: string;
      };
    };
  };
}

/**
 * Create a PayPal order for the given amount
 */
export async function createPayPalOrder(
  amount: number,
  returnUrl: string,
  cancelUrl: string
): Promise<{ orderId: string; approvalUrl: string }> {
  if (!ENV.paypalClientId || !ENV.paypalSecret) {
    throw new Error("PayPal credentials not configured");
  }

  addDebugLog("[PayPal] Creating order...");
  addDebugLog(`[PayPal] Client ID exists: ${!!ENV.paypalClientId}`);
  addDebugLog(`[PayPal] Secret exists: ${!!ENV.paypalSecret}`);
  addDebugLog(`[PayPal] Client ID length: ${ENV.paypalClientId.length}`);
  addDebugLog(`[PayPal] Secret length: ${ENV.paypalSecret.length}`);

  // Get access token
  const authString = `${ENV.paypalClientId}:${ENV.paypalSecret}`;
  const authBase64 = Buffer.from(authString).toString("base64");

  addDebugLog(`[PayPal] Auth string length: ${authString.length}`);
  addDebugLog(`[PayPal] Auth header preview: ${authBase64.substring(0, 50)}...`);

  const tokenResponse = await fetch("https://api.paypal.com/v1/oauth2/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${authBase64}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  addDebugLog(`[PayPal] Token response status: ${tokenResponse.status}`);

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text();
    addDebugLog(`[PayPal] ERROR: Token error response: ${errorText}`);
    addDebugLog(`[PayPal] ERROR: Status: ${tokenResponse.status} ${tokenResponse.statusText}`);
    throw new Error(`Failed to get PayPal access token: ${tokenResponse.statusText}`);
  }

  const tokenData = (await tokenResponse.json()) as { access_token: string };
  const accessToken = tokenData.access_token;

  addDebugLog("[PayPal] Got access token, creating order...");

  // Create order
  const orderRequest: PayPalCreateOrderRequest = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "EUR",
          value: amount.toFixed(2),
        },
        description: "Método RESET - Programa Completo",
      },
    ],
    payment_source: {
      paypal: {
        experience_context: {
          return_url: returnUrl,
          cancel_url: cancelUrl,
          payment_method_preference: "IMMEDIATE",
        },
      },
    },
  };

  const orderResponse = await fetch("https://api.paypal.com/v2/checkout/orders", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderRequest),
  });

  if (!orderResponse.ok) {
    const error = await orderResponse.json();
    addDebugLog(`[PayPal] ERROR: Create order error: ${JSON.stringify(error)}`);
    throw new Error(`Failed to create PayPal order: ${orderResponse.statusText}`);
  }

  const order = (await orderResponse.json()) as PayPalOrder;

  addDebugLog(`[PayPal] Order created: ${order.id}`);

  const approvalUrl = order.links?.find((link) => link.rel === "approve_link")?.href;

  if (!approvalUrl) {
    throw new Error("No approval URL in PayPal response");
  }

  return { orderId: order.id, approvalUrl };
}

/**
 * Capture a PayPal order
 */
export async function capturePayPalOrder(orderId: string): Promise<PayPalOrder> {
  if (!ENV.paypalClientId || !ENV.paypalSecret) {
    throw new Error("PayPal credentials not configured");
  }

  // Get access token
  const authString = `${ENV.paypalClientId}:${ENV.paypalSecret}`;
  const authBase64 = Buffer.from(authString).toString("base64");

  const tokenResponse = await fetch("https://api.paypal.com/v1/oauth2/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${authBase64}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text();
    addDebugLog(`[PayPal] ERROR: Token error response: ${errorText}`);
    throw new Error(`Failed to get PayPal access token: ${tokenResponse.statusText}`);
  }

  const tokenData = (await tokenResponse.json()) as { access_token: string };
  const accessToken = tokenData.access_token;

  // Capture order
  const captureResponse = await fetch(`https://api.paypal.com/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!captureResponse.ok) {
    const error = await captureResponse.json();
    addDebugLog(`[PayPal] ERROR: Capture error: ${JSON.stringify(error)}`);
    throw new Error(`Failed to capture PayPal order: ${captureResponse.statusText}`);
  }

  const order = (await captureResponse.json()) as PayPalOrder;
  return order;
}
