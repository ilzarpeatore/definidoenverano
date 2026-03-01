import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createFreeWeekSignup } from "./db";
import { randomBytes } from "crypto";
import { sendBrevoEmail } from "./brevo";

export const freeWeekRouter = router({
  create: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        firstName: z.string().min(1),
        objective: z.string(),
        experience: z.string(),
        availableTime: z.string(),
        yearsTraining: z.string(),
        source: z.enum(["ads", "popup", "direct"]).optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Generate access token (7 days validity)
        const accessToken = randomBytes(32).toString("hex");
        const accessExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        // Save to database
        await createFreeWeekSignup({
          email: input.email,
          firstName: input.firstName,
          objective: input.objective,
          experience: input.experience,
          availableTime: input.availableTime,
          yearsTraining: input.yearsTraining,
          accessToken,
          accessExpiresAt,
          source: input.source || "direct",
        });

        // Send welcome email with access link using Brevo template #4
        const accessLink = `${process.env.VITE_APP_URL || "https://definidoenverano.bestronger.es"}/free-week-access?token=${accessToken}`;

        // Send email via BREVO using template #4
        try {
          await sendBrevoEmail(
            input.email,
            4, // Template ID for "Semana Gratuita"
            {
              firstName: input.firstName,
              accessLink: accessLink,
            }
          );
          console.log("[FreeWeek] Email sent successfully to:", input.email);
        } catch (emailError) {
          console.error("[FreeWeek] Failed to send email:", emailError);
          // Don't throw - signup is still successful even if email fails
        }

        return {
          success: true,
          message: "Acceso a semana gratuita activado. Revisa tu email.",
        };
      } catch (error) {
        console.error("[FreeWeek] Failed to create signup:", error);
        throw new Error("Failed to create free week signup");
      }
    }),
});
