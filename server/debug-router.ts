import { publicProcedure, router } from "./_core/trpc";

// Store logs in memory
let debugLogs: string[] = [];

export function addDebugLog(message: string) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}`;
  debugLogs.push(logEntry);
  // Keep only last 100 logs
  if (debugLogs.length > 100) {
    debugLogs = debugLogs.slice(-100);
  }
  console.log(logEntry);
}

export const debugRouter = router({
  getLogs: publicProcedure.query(() => {
    return {
      logs: debugLogs,
      timestamp: new Date().toISOString(),
    };
  }),

  clearLogs: publicProcedure.mutation(() => {
    debugLogs = [];
    return { success: true };
  }),
});
