import { z } from 'zod';
import { publicProcedure, router } from './_core/trpc';
import { getDb } from './db';
import { quizResponses } from '../drizzle/schema';
import { sendQuizResultsEmail } from './email-service';
import { eq } from 'drizzle-orm';

const submitQuizSchema = z.object({
  firstName: z.string().min(1, 'Nombre requerido'),
  lastName: z.string().min(1, 'Apellidos requeridos'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(1, 'Teléfono requerido'),
  answers: z.record(z.string().or(z.number()), z.string()),
  totalScore: z.number().min(0).max(100)
});

// Determine profile based on score
function determineProfile(score: number): string {
  if (score <= 5) {
    return 'recien_diagnosticado';
  } else if (score <= 10) {
    return 'atleta_lesionado';
  } else if (score <= 15) {
    return 'ejecutivo_atrapado';
  } else {
    return 'emprendedor_quemado';
  }
}

// Calculate severity (0-10)
function calculateSeverity(score: number): number {
  return Math.min(Math.round((score / 20) * 10), 10);
}

export const quizRouter = router({
  submit: publicProcedure
    .input(submitQuizSchema)
    .mutation(async ({ input }) => {
      try {
        const db = await getDb();
        if (!db) {
          throw new Error('Database not available');
        }

        const profile = determineProfile(input.totalScore);
        const severity = calculateSeverity(input.totalScore);

        // Save quiz response to database
        const result = await db.insert(quizResponses).values({
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          phone: input.phone,
          profile,
          severity,
          totalScore: input.totalScore,
          answers: JSON.stringify(input.answers),
          createdAt: new Date()
        });

        // Get the inserted ID from the result
        const quizId = result[0].insertId || 0;

        // Send email with results
        await sendQuizResultsEmail({
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          phone: input.phone,
          profile,
          severity,
          totalScore: input.totalScore
        });

        return {
          quizId,
          profile,
          severity,
          success: true
        };
      } catch (error) {
        console.error('Error submitting quiz:', error);
        throw new Error('Error al procesar el quiz');
      }
    }),

  getResults: publicProcedure
    .input(z.object({ quizId: z.number() }))
    .query(async ({ input }) => {
      try {
        const db = await getDb();
        if (!db) {
          throw new Error('Database not available');
        }

        const result = await db.select().from(quizResponses).where(eq(quizResponses.id, input.quizId)).limit(1);

        if (!result || result.length === 0) {
          throw new Error('Quiz no encontrado');
        }

        const quizData = result[0];
        return {
          id: quizData.id,
          firstName: quizData.firstName,
          lastName: quizData.lastName,
          email: quizData.email,
          profile: quizData.profile,
          severity: quizData.severity,
          totalScore: quizData.totalScore,
          createdAt: quizData.createdAt
        };
      } catch (error) {
        console.error('Error getting quiz results:', error);
        throw new Error('Error al obtener resultados');
      }
    })
});
