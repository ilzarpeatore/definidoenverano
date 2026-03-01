import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createFreeWeekSignup } from "./db";
import { randomBytes } from "crypto";
import axios from "axios";

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
        });

        // Send welcome email with access link
        const accessLink = `${process.env.VITE_APP_URL || "https://definidoenverano.bestronger.es"}/free-week-access?token=${accessToken}`;

        // Send email via BREVO
        try {
          await axios.post(
            "https://api.brevo.com/v3/smtp/email",
            {
              sender: { name: "Definido en Verano", email: "noreply@definidoenverano.com" },
              to: [{ email: input.email, name: input.firstName }],
              subject: "Tu acceso a 7 dias gratis esta listo!",
              htmlContent: `
                <h2>Hola ${input.firstName},</h2>
                <p>Bienvenido al Protocolo APEX 90!</p>
                <p>Tu acceso a 7 dias gratis esta listo. Haz clic en el boton de abajo para acceder:</p>
                <p><a href="${accessLink}" style="background-color: #D4AF37; color: black; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">ACCEDER A MI SEMANA GRATIS</a></p>
                <p>Este enlace es valido por 7 dias. Accede a:</p>
                <ul>
                  <li>App completa con entrenamientos personalizados</li>
                  <li>Plan de nutricion adaptado a tu objetivo</li>
                  <li>Seguimiento de progreso en tiempo real</li>
                  <li>Acceso a la comunidad privada</li>
                </ul>
                <p>Si tienes alguna pregunta, responde a este email.</p>
                <p>Que comience tu transformacion!</p>
                <p>Equipo Definido en Verano</p>
              `,
            },
            {
              headers: {
                "api-key": process.env.BREVO_API_KEY,
                "Content-Type": "application/json",
              },
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
