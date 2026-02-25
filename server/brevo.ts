import { ENV } from "./_core/env";

/**
 * Brevo API Integration
 * Handles automatic synchronization of leads to Brevo contact lists
 */

export interface BrevoContact {
  email: string;
  firstName?: string;
  lastName?: string;
  attributes?: Record<string, string | number | boolean>;
  listIds?: number[];
}

/**
 * Add or update a contact in Brevo
 */
export async function addContactToBrevo(contact: BrevoContact): Promise<void> {
  if (!ENV.brevoApiKey) {
    console.warn("[Brevo] API key not configured, skipping contact sync");
    return;
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": ENV.brevoApiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: contact.email,
        firstName: contact.firstName || "",
        lastName: contact.lastName || "",
        attributes: contact.attributes || {},
        listIds: contact.listIds || [],
        updateEnabled: true, // Update if contact already exists
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`[Brevo] Failed to add contact: ${response.status} - ${error}`);
      throw new Error(`Brevo API error: ${response.status}`);
    }

    console.log(`[Brevo] Contact added/updated: ${contact.email}`);
  } catch (error) {
    console.error("[Brevo] Error adding contact:", error);
    throw error;
  }
}

/**
 * Send a transactional email via Brevo
 */
export async function sendBrevoEmail(
  to: string,
  templateId: number,
  params?: Record<string, string>
): Promise<void> {
  if (!ENV.brevoApiKey) {
    console.warn("[Brevo] API key not configured, skipping email send");
    return;
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": ENV.brevoApiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: [{ email: to }],
        templateId: templateId,
        params: params || {},
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`[Brevo] Failed to send email: ${response.status} - ${error}`);
      throw new Error(`Brevo API error: ${response.status}`);
    }

    console.log(`[Brevo] Email sent to: ${to}`);
  } catch (error) {
    console.error("[Brevo] Error sending email:", error);
    throw error;
  }
}

/**
 * Get list ID by name (for organizing contacts)
 */
export async function getBrevoListIdByName(listName: string): Promise<number | null> {
  if (!ENV.brevoApiKey) {
    console.warn("[Brevo] API key not configured");
    return null;
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/contacts/lists", {
      method: "GET",
      headers: {
        "api-key": ENV.brevoApiKey,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(`[Brevo] Failed to get lists: ${response.status}`);
      return null;
    }

    const data = (await response.json()) as { lists?: Array<{ id: number; name: string }> };
    const list = data.lists?.find((l) => l.name === listName);
    return list?.id || null;
  } catch (error) {
    console.error("[Brevo] Error getting list ID:", error);
    return null;
  }
}
