import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { createLead, getLeadByEmail, recordFreeResourceDownload, getAllLeads, getLeadsBySource } from "./leads";
import { addContactToBrevo, sendBrevoEmail } from "./brevo";

export const leadsRouter = router({
  /**
   * Crear un nuevo lead desde el popup de semana gratis
   */
  createLeadFromPopup: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        firstName: z.string().min(1),
        lastName: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Verificar si el email ya existe
        const existingLead = await getLeadByEmail(input.email);
        if (existingLead) {
          return {
            success: true,
            message: "Email ya registrado",
            leadId: existingLead.id,
            isNew: false,
          };
        }

        // Crear nuevo lead
        await createLead({
          email: input.email,
          firstName: input.firstName,
          lastName: input.lastName,
          source: "popup_free_week",
        });

        // Sincronizar con Brevo automáticamente
        try {
          await addContactToBrevo({
            email: input.email,
            firstName: input.firstName,
            lastName: input.lastName,
            attributes: {
              source: "popup_free_week",
              registeredAt: new Date().toISOString(),
            },
          });
        } catch (brevoError) {
          console.error("[Leads] Brevo sync failed, but lead was created:", brevoError);
          // Don't fail the whole operation if Brevo sync fails
        }

        // Send "Semana gratis de entrenamiento" email (Template ID: 2)
        try {
          await sendBrevoEmail(
            input.email,
            2,
            {
              firstName: input.firstName,
              lastName: input.lastName,
              trialEndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString("es-ES"),
            }
          );
          console.log(`[Leads] Free trial email sent to: ${input.email}`);
        } catch (emailError) {
          console.error("[Leads] Error sending free trial email:", emailError);
          // Don't fail the whole operation if email sending fails
        }

        const newLead = await getLeadByEmail(input.email);

        return {
          success: true,
          message: "Lead creado exitosamente",
          leadId: newLead?.id,
          isNew: true,
        };
      } catch (error) {
        console.error("[Leads] Error creating lead from popup:", error);
        return {
          success: false,
          message: "Error al crear el lead",
        };
      }
    }),

  /**
   * Crear un nuevo lead desde recursos gratuitos
   */
  createLeadFromResource: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        resourceType: z.enum(["guide_7_errors", "calculator_macros", "checklist_30_days"]),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Verificar si el email ya existe
        let lead = await getLeadByEmail(input.email);

        if (!lead) {
          // Crear nuevo lead
          const sourceMap = {
            guide_7_errors: "free_resource_guide" as const,
            calculator_macros: "free_resource_calculator" as const,
            checklist_30_days: "free_resource_checklist" as const,
          };

          await createLead({
            email: input.email,
            firstName: input.firstName,
            lastName: input.lastName,
            source: sourceMap[input.resourceType],
          });

          lead = await getLeadByEmail(input.email);
        }

        // Registrar descarga del recurso
        if (lead) {
          await recordFreeResourceDownload(lead.id, input.resourceType);
        }

        return {
          success: true,
          message: "Lead creado y recurso registrado",
          leadId: lead?.id,
        };
      } catch (error) {
        console.error("[Leads] Error creating lead from resource:", error);
        return {
          success: false,
          message: "Error al crear el lead",
        };
      }
    }),

  /**
   * Obtener todos los leads (solo para admin)
   */
  getAllLeads: publicProcedure.query(async () => {
    try {
      const allLeads = await getAllLeads();
      return {
        success: true,
        data: allLeads,
      };
    } catch (error) {
      console.error("[Leads] Error getting all leads:", error);
      return {
        success: false,
        data: [],
      };
    }
  }),

  /**
   * Obtener leads por fuente
   */
  getLeadsBySource: publicProcedure
    .input(
      z.object({
        source: z.enum(["popup_free_week", "free_resource_guide", "free_resource_calculator", "free_resource_checklist"]),
      })
    )
    .query(async ({ input }) => {
      try {
        const sourceLeads = await getLeadsBySource(input.source);
        return {
          success: true,
          data: sourceLeads,
        };
      } catch (error) {
        console.error("[Leads] Error getting leads by source:", error);
        return {
          success: false,
          data: [],
        };
      }
    }),
});
