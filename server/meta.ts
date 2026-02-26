import { ENV } from "./_core/env";

interface MetaConversionData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  amount: number;
  currency: string;
  orderId: string;
}

/**
 * Track purchase conversion with Meta Conversions API
 * Sends server-side event to Meta for accurate conversion tracking
 */
export async function trackMetaConversion(
  data: MetaConversionData
): Promise<{ success: boolean; message: string }> {
  // Re-read from process.env to get latest values (for testing)
  const pixelId = process.env.META_PIXEL_ID || ENV.metaPixelId;
  const accessToken = process.env.META_ACCESS_TOKEN || ENV.metaAccessToken;

  if (!accessToken || !pixelId) {
    console.warn("[Meta] Access Token or Pixel ID not configured");
    return {
      success: false,
      message: "Meta credentials not configured",
    };
  }

  try {
    // Prepare event data for Meta Conversions API
    const userData = {
      ...(data.email && { em: hashData(data.email) }),
      ...(data.phone && { ph: hashData(data.phone) }),
      ...(data.firstName && { fn: hashData(data.firstName) }),
      ...(data.lastName && { ln: hashData(data.lastName) }),
    };

    const eventData = {
      event_name: "Purchase",
      event_time: Math.floor(Date.now() / 1000),
      user_data: userData,
      custom_data: {
        value: data.amount,
        currency: data.currency.toUpperCase(),
        content_name: "Definido en Verano - 12 Week Program",
        content_type: "product",
        content_id: data.orderId,
      },
      event_source_url: "https://definidoenverano.bestronger.es",
      event_id: `purchase_${data.orderId}_${Date.now()}`,
    };

    // Send to Meta Conversions API
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${pixelId}/events`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [eventData],
          access_token: accessToken,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("[Meta] Conversion tracking error:", error);
      return {
        success: false,
        message: `Meta API error: ${JSON.stringify(error)}`,
      };
    }

    const result = await response.json();
    console.log("[Meta] Conversion tracked successfully:", result);

    return {
      success: true,
      message: "Conversion tracked successfully",
    };
  } catch (error) {
    const err = error as Error;
    console.error("[Meta] Error tracking conversion:", err.message);
    return {
      success: false,
      message: `Error tracking conversion: ${err.message}`,
    };
  }
}

/**
 * Hash data for Meta Conversions API (SHA-256)
 * Meta requires hashed PII for privacy
 */
function hashData(value: string): string {
  // For simplicity, we'll use a basic hash
  // In production, use crypto.subtle.digest('SHA-256', ...)
  const crypto = require("crypto");
  return crypto.createHash("sha256").update(value.toLowerCase().trim()).digest("hex");
}

/**
 * Track custom event with Meta Pixel (client-side)
 * Call from frontend to track custom events
 */
export function getMetaPixelTrackingCode(): string {
  const pixelId = process.env.META_PIXEL_ID || ENV.metaPixelId;
  if (!pixelId) return "";

  return `
    <script>
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelId}');
      fbq('track', 'PageView');
    </script>
  `;
}
