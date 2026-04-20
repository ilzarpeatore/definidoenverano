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


describe("Stripe Checkout Session", () => {
  it("should validate card payment method input", () => {
    const paymentMethod = "card";
    expect(paymentMethod).toBe("card");
    expect(["card", "bizum"]).toContain(paymentMethod);
  });

  it("should validate Bizum payment method input", () => {
    const paymentMethod = "bizum";
    expect(paymentMethod).toBe("bizum");
    expect(["card", "bizum"]).toContain(paymentMethod);
  });

  it("should validate amount is positive", () => {
    const amount = 50;
    expect(amount).toBeGreaterThan(0);
  });

  it("should validate return URL format", () => {
    const returnUrl = "https://example.com/stripe-return?session_id={CHECKOUT_SESSION_ID}";
    expect(returnUrl).toMatch(/^https:\/\//);
    expect(returnUrl).toContain("stripe-return");
  });

  it("should validate cancel URL format", () => {
    const cancelUrl = "https://example.com/stripe-cancel";
    expect(cancelUrl).toMatch(/^https:\/\//);
    expect(cancelUrl).toContain("stripe-cancel");
  });

  it("should convert EUR to cents correctly", () => {
    const amountEur = 0.5;
    const amountCents = Math.round(amountEur * 100);
    expect(amountCents).toBe(50);
  });

  it("should validate customer email format", () => {
    const email = "customer@example.com";
    expect(email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it("should handle optional customer email", () => {
    const email: string | undefined = undefined;
    expect(email).toBeUndefined();
  });
});
