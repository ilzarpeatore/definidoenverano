import { describe, expect, it } from "vitest";
import { ENV } from "./_core/env";

describe("PayPal Credentials", () => {
  it("should have valid PayPal Client ID and Secret", () => {
    expect(ENV.paypalClientId).toBeDefined();
    expect(ENV.paypalSecret).toBeDefined();
    expect(ENV.paypalClientId).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(ENV.paypalSecret).toMatch(/^[A-Za-z0-9_-]+$/);
  });

  it("should validate PayPal credentials format", () => {
    // PayPal Client IDs are typically 80+ characters
    expect(ENV.paypalClientId?.length).toBeGreaterThan(50);
    // PayPal Secrets are typically 80+ characters
    expect(ENV.paypalSecret?.length).toBeGreaterThan(50);
  });
});
