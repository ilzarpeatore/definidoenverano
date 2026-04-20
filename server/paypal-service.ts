import { ENV } from "./_core/env";

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

  // Get access token
  const tokenResponse = await fetch("https://api.paypal.com/v1/oauth2/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${ENV.paypalClientId}:${ENV.paypalSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text();
    console.error('[PayPal] Token error:', errorText);
    throw new Error(`Failed to get PayPal access token: ${tokenResponse.statusText}`);
  }

  const tokenData = await tokenResponse.json() as { access_token: string };
  const accessToken = tokenData.access_token;

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
    console.error("[PayPal] Create order error:", error);
    throw new Error(`Failed to create PayPal order: ${orderResponse.statusText}`);
  }

  const order = await orderResponse.json() as PayPalOrder;

  // Find approval link
  const approvalLink = (order as any).links?.find(
    (link: any) => link.rel === "approve"
  );

  if (!approvalLink) {
    throw new Error("No approval link in PayPal response");
  }

  return {
    orderId: order.id,
    approvalUrl: approvalLink.href,
  };
}

/**
 * Capture a PayPal order after user approval
 */
export async function capturePayPalOrder(
  orderId: string
): Promise<{ status: string; email?: string; name?: string }> {
  if (!ENV.paypalClientId || !ENV.paypalSecret) {
    throw new Error("PayPal credentials not configured");
  }

  // Get access token
  const tokenResponse = await fetch("https://api.paypal.com/v1/oauth2/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${ENV.paypalClientId}:${ENV.paypalSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text();
    console.error('[PayPal] Token error:', errorText);
    throw new Error(`Failed to get PayPal access token: ${tokenResponse.statusText}`);
  }

  const tokenData = await tokenResponse.json() as { access_token: string };
  const accessToken = tokenData.access_token;

  // Capture order
  const captureResponse = await fetch(
    `https://api.paypal.com/v2/checkout/orders/${orderId}/capture`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!captureResponse.ok) {
    const error = await captureResponse.json();
    console.error("[PayPal] Capture error:", error);
    throw new Error(`Failed to capture PayPal order: ${captureResponse.statusText}`);
  }

  const order = await captureResponse.json() as PayPalOrder;

  return {
    status: order.status,
    email: order.payer?.email_address,
    name: order.payer?.name?.given_name,
  };
}
