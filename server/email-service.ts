import { sendBrevoEmail, addContactToBrevo } from "./brevo";

/**
 * Email service for automated post-purchase notifications
 */

export interface PurchaseEmailData {
  email: string;
  firstName?: string;
  lastName?: string;
  orderId: string;
  amount: number;
  paymentMethod: string;
  accessUrl?: string;
}

/**
 * Send welcome email after successful purchase
 * Template ID should be configured in Brevo dashboard
 */
export async function sendPurchaseWelcomeEmail(
  data: PurchaseEmailData
): Promise<void> {
  try {
    // Add contact to Brevo
    await addContactToBrevo({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      attributes: {
        ORDER_ID: data.orderId,
        AMOUNT: data.amount.toString(),
        PAYMENT_METHOD: data.paymentMethod,
        PURCHASE_DATE: new Date().toISOString(),
      },
      listIds: [7], // "Customers" list - adjust ID based on your Brevo account
    });

    // Send transactional email
    // Template ID 5 should be your "Welcome After Purchase" template
    await sendBrevoEmail(data.email, 5, {
      FIRST_NAME: data.firstName || "Valued Customer",
      ORDER_ID: data.orderId,
      AMOUNT: `€${data.amount.toFixed(2)}`,
      ACCESS_URL: data.accessUrl || "https://reset.bestronger.es/access",
      PAYMENT_METHOD: data.paymentMethod,
    });

    console.log(`[Email Service] Welcome email sent to ${data.email}`);
  } catch (error) {
    console.error("[Email Service] Error sending welcome email:", error);
    throw error;
  }
}

/**
 * Send access instructions email
 */
export async function sendAccessInstructionsEmail(
  email: string,
  firstName: string,
  accessUrl: string,
  password?: string
): Promise<void> {
  try {
    // Template ID 2 should be your "Access Instructions" template
    await sendBrevoEmail(email, 2, {
      FIRST_NAME: firstName,
      ACCESS_URL: accessUrl,
      PASSWORD: password || "Check your email for login details",
      SUPPORT_EMAIL: "soporte@bestronger.es",
    });

    console.log(`[Email Service] Access instructions sent to ${email}`);
  } catch (error) {
    console.error("[Email Service] Error sending access instructions:", error);
    throw error;
  }
}

/**
 * Send payment confirmation email
 */
export async function sendPaymentConfirmationEmail(
  email: string,
  firstName: string,
  orderId: string,
  amount: number,
  paymentMethod: string
): Promise<void> {
  try {
    // Template ID 3 should be your "Payment Confirmation" template
    await sendBrevoEmail(email, 3, {
      FIRST_NAME: firstName,
      ORDER_ID: orderId,
      AMOUNT: `€${amount.toFixed(2)}`,
      PAYMENT_METHOD: paymentMethod,
      DATE: new Date().toLocaleDateString("es-ES"),
      INVOICE_URL: `https://reset.bestronger.es/invoices/${orderId}`,
    });

    console.log(`[Email Service] Payment confirmation sent to ${email}`);
  } catch (error) {
    console.error("[Email Service] Error sending payment confirmation:", error);
    throw error;
  }
}

/**
 * Send onboarding email sequence
 */
export async function sendOnboardingEmail(
  email: string,
  firstName: string,
  programStartDate: string
): Promise<void> {
  try {
    // Template ID 4 should be your "Onboarding" template
    await sendBrevoEmail(email, 4, {
      FIRST_NAME: firstName,
      PROGRAM_START_DATE: programStartDate,
      PROGRAM_URL: "https://reset.bestronger.es/app",
      SUPPORT_EMAIL: "soporte@bestronger.es",
      WHATSAPP_LINK: "https://wa.me/34666777888",
    });

    console.log(`[Email Service] Onboarding email sent to ${email}`);
  } catch (error) {
    console.error("[Email Service] Error sending onboarding email:", error);
    throw error;
  }
}

/**
 * Send refund notification email
 */
export async function sendRefundNotificationEmail(
  email: string,
  firstName: string,
  orderId: string,
  amount: number,
  reason: string
): Promise<void> {
  try {
    // Template ID 6 should be your "Refund Notification" template
    await sendBrevoEmail(email, 6, {
      FIRST_NAME: firstName,
      ORDER_ID: orderId,
      AMOUNT: `€${amount.toFixed(2)}`,
      REASON: reason,
      SUPPORT_EMAIL: "soporte@bestronger.es",
    });

    console.log(`[Email Service] Refund notification sent to ${email}`);
  } catch (error) {
    console.error("[Email Service] Error sending refund notification:", error);
    throw error;
  }
}

/**
 * Send quiz results email with profile-specific template
 */
export async function sendQuizResultsEmail(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profile: string;
  severity: number;
  totalScore: number;
}): Promise<void> {
  try {
    const profileNames: Record<string, string> = {
      ejecutivo_atrapado: "Ejecutivo Atrapado",
      emprendedor_quemado: "Emprendedor Quemado",
      atleta_lesionado: "Atleta Lesionado",
      recien_diagnosticado: "Recién Diagnosticado",
    };

    // Map profiles to template IDs
    const templateIds: Record<string, number> = {
      ejecutivo_atrapado: 10,
      emprendedor_quemado: 11,
      atleta_lesionado: 12,
      recien_diagnosticado: 13,
    };

    // Add contact to Brevo
    await addContactToBrevo({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      attributes: {
        QUIZ_PROFILE: data.profile,
        QUIZ_SEVERITY: data.severity.toString(),
        QUIZ_SCORE: data.totalScore.toString(),
        PHONE: data.phone,
        QUIZ_DATE: new Date().toISOString(),
      },
      listIds: [8], // "Quiz Respondents" list
    });

    // Send profile-specific email
    const templateId = templateIds[data.profile] || 10;
    await sendBrevoEmail(data.email, templateId, {
      FIRST_NAME: data.firstName,
      LAST_NAME: data.lastName,
      PROFILE: profileNames[data.profile] || data.profile,
      SEVERITY: data.severity.toString(),
      TOTAL_SCORE: data.totalScore.toString(),
      PHONE: data.phone,
    });

    console.log(`[Email Service] Quiz results email sent to ${data.email}`);
  } catch (error) {
    console.error("[Email Service] Error sending quiz results email:", error);
    throw error;
  }
}
