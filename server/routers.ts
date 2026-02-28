import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { paymentsRouter } from "./paymentsRouter";
import { adminRouter } from "./adminRouter";
import { leadsRouter } from "./leadsRouter";
import { getPricingInfo } from "./pricing";

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
});

export type AppRouter = typeof appRouter;
