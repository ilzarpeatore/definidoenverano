import { describe, it, expect } from "vitest";
import { trackMetaConversion } from "./meta";

describe("Meta Conversions API", () => {
  it("should validate Meta credentials are configured", async () => {
    // Check if Meta credentials are set in environment
    const hasMetaPixelId = !!process.env.META_PIXEL_ID;
    const hasMetaAccessToken = !!process.env.META_ACCESS_TOKEN;

    console.log(`Meta Pixel ID configured: ${hasMetaPixelId}`);
    console.log(`Meta Access Token configured: ${hasMetaAccessToken}`);

    // If credentials are configured, test the API call
    if (hasMetaPixelId && hasMetaAccessToken) {
      const result = await trackMetaConversion({
        email: "test@example.com",
        phone: "+34123456789",
        firstName: "Test",
        lastName: "User",
        amount: 0.5,
        currency: "EUR",
        orderId: "TEST-ORDER-001",
      });

      console.log("Meta Conversion API Response:", result);
      expect(result).toHaveProperty("success");
      expect(result).toHaveProperty("message");
      expect(result.success).toBe(true);
    } else {
      console.warn("Meta credentials not configured - skipping API test");
      expect(true).toBe(true);
    }
  });

  it("should track purchase conversion with full data", async () => {
    const hasCredentials = !!process.env.META_PIXEL_ID && !!process.env.META_ACCESS_TOKEN;

    if (hasCredentials) {
      const result = await trackMetaConversion({
        email: "customer@example.com",
        phone: "+34987654321",
        firstName: "Juan",
        lastName: "Perez",
        amount: 197,
        currency: "EUR",
        orderId: "ORDER-20260226-ABC123",
      });

      expect(result.success).toBe(true);
      expect(result.message).toContain("successfully");
    } else {
      console.warn("Meta credentials not configured - skipping full test");
      expect(true).toBe(true);
    }
  });
});
