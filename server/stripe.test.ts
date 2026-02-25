import { describe, expect, it } from "vitest";
import { ENV } from "./_core/env";

describe("Stripe Integration", () => {
  it("should have VITE_STRIPE_PUBLIC_KEY configured", async () => {
    const publicKey = process.env.VITE_STRIPE_PUBLIC_KEY;
    expect(publicKey).toBeDefined();
    expect(publicKey).toBeTruthy();
    expect(publicKey).toMatch(/^pk_(test|live)_/);
  });

  it("should have STRIPE_SK configured", async () => {
    const secretKey = process.env.STRIPE_SK || ENV.stripeSecretKey;
    expect(secretKey).toBeDefined();
    expect(secretKey).toBeTruthy();
    expect(secretKey).toMatch(/^sk_(test|live)_/);
  });

  it("should validate Stripe API connectivity with secret key", async () => {
    const secretKey = process.env.STRIPE_SK || ENV.stripeSecretKey;
    
    if (!secretKey) {
      throw new Error("STRIPE_SK not configured");
    }

    try {
      const response = await fetch("https://api.stripe.com/v1/account", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toHaveProperty("id");
      expect(data).toHaveProperty("type");
    } catch (error) {
      throw new Error(`Stripe API connection failed: ${error}`);
    }
  });
});
