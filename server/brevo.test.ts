import { describe, expect, it } from "vitest";
import { ENV } from "./_core/env";

describe("Brevo API Integration", () => {
  it("should validate BREVO_API_KEY is configured", async () => {
    expect(ENV.brevoApiKey).toBeDefined();
    expect(ENV.brevoApiKey).toBeTruthy();
    expect(ENV.brevoApiKey.length).toBeGreaterThan(0);
  });

  it("should validate BREVO_API_KEY format", async () => {
    const apiKey = ENV.brevoApiKey;
    // Brevo API keys start with 'xkeysib-'
    expect(apiKey).toMatch(/^xkeysib-/);
  });

  it("should test Brevo API connectivity", async () => {
    const apiKey = ENV.brevoApiKey;
    
    try {
      const response = await fetch("https://api.brevo.com/v3/account", {
        method: "GET",
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
        },
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toHaveProperty("email");
      expect(data).toHaveProperty("firstName");
    } catch (error) {
      throw new Error(`Brevo API connection failed: ${error}`);
    }
  });
});
