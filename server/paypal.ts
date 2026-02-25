import { ENV } from "./_core/env";

const PAYPAL_API_BASE = "https://api-m.sandbox.paypal.com";

/**
 * Get PayPal access token
 */
export async function getPayPalAccessToken(): Promise<string> {
  const auth = Buffer.from(
    `${ENV.paypalClientId}:${ENV.paypalSecret}`
  ).toString("base64");

  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    throw new Error(`Failed to get PayPal access token: ${response.statusText}`);
  }

  const data = (await response.json()) as { access_token: string };
  return data.access_token;
}

/**
 * Create PayPal order
 */
export async function createPayPalOrder(
  amount: number,
  orderId: string,
  returnUrl: string,
  cancelUrl: string
) {
  const accessToken = await getPayPalAccessToken();

  const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: orderId,
          amount: {
            currency_code: "EUR",
            value: (amount / 100).toFixed(2),
          },
          description: "Programa Definido en Verano - 12 Semanas",
        },
      ],
      payer: {
        email_address: "buyer@example.com",
      },
      application_context: {
        brand_name: "Definido en Verano",
        user_action: "PAY_NOW",
        return_url: returnUrl,
        cancel_url: cancelUrl,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create PayPal order: ${response.statusText}`);
  }

  const data = (await response.json()) as {
    id: string;
    links: Array<{ rel: string; href: string }>;
  };
  return data;
}

/**
 * Capture PayPal order
 */
export async function capturePayPalOrder(orderId: string) {
  const accessToken = await getPayPalAccessToken();

  const response = await fetch(
    `${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to capture PayPal order: ${response.statusText}`);
  }

  const data = (await response.json()) as {
    id: string;
    status: string;
    purchase_units: Array<{
      payments: {
        captures: Array<{
          id: string;
          status: string;
        }>;
      };
    }>;
  };
  return data;
}
