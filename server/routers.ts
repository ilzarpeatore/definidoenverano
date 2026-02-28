import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { paymentsRouter } from "./paymentsRouter";
import { adminRouter } from "./adminRouter";
import { leadsRouter } from "./leadsRouter";
import { getPricingInfo } from "./pricing";
import { saveInformedConsent } from "./db";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  pricing: router({
    getCurrent: publicProcedure.query(() => getPricingInfo()),
  }),
  payments: paymentsRouter,
  admin: adminRouter,
  leads: leadsRouter,
  consent: router({
    save: publicProcedure
      .input(
        z.object({
          customerId: z.number(),
          orderId: z.number(),
          consentText: z.string(),
          ipAddress: z.string(),
          userAgent: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          await saveInformedConsent({
            customerId: input.customerId,
            orderId: input.orderId,
            consentText: input.consentText,
            ipAddress: input.ipAddress,
            userAgent: input.userAgent,
            consentedAt: new Date(),
            createdAt: new Date(),
          });
          return { success: true };
        } catch (error) {
          console.error("[Consent] Failed to save consent:", error);
          throw new Error("Failed to save consent");
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
