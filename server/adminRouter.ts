import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { publicProcedure, router } from './_core/trpc';
import { getDb } from './db';
import { customers, orders, assessmentResponses } from '../drizzle/schema';
import { eq, and, gte, lte, like } from 'drizzle-orm';

// Admin password (en producción, usar bcrypt)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD_HASH || 'adminbs1998';

export const adminRouter = router({
  // Login del admin
  login: publicProcedure
    .input(z.object({ password: z.string() }))
    .mutation(async ({ input }) => {
      if (input.password !== ADMIN_PASSWORD) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Contraseña incorrecta',
        });
      }

      // En producción, generar JWT token
      return {
        success: true,
        token: 'admin-token-' + Date.now(),
      };
    }),

  // Obtener todos los clientes
  getCustomers: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
        page: z.number().default(1),
        limit: z.number().default(20),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

      try {
        const result = await db.select().from(customers);
        
        const filtered = input.search
          ? result.filter(c => (c.email ?? '').includes(input.search ?? '') || (c.firstName ?? '').includes(input.search ?? ''))
          : result;

        return {
          customers: filtered,
          total: filtered.length,
          page: input.page,
          limit: input.limit,
        };
      } catch (error) {
        console.error('Error fetching customers:', error);
        return {
          customers: [],
          total: 0,
          page: input.page,
          limit: input.limit,
        };
      }
    }),

  // Obtener todas las órdenes
  getOrders: publicProcedure
    .input(
      z.object({
        status: z.enum(['pending', 'completed', 'failed', 'all']).optional(),
        page: z.number().default(1),
        limit: z.number().default(20),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

      try {
        const result = await db.select().from(orders);

        const filtered = input.status && input.status !== 'all'
          ? result.filter(o => o.status === input.status)
          : result;

        return {
          orders: filtered,
          total: filtered.length,
          page: input.page,
          limit: input.limit,
        };
      } catch (error) {
        console.error('Error fetching orders:', error);
        return {
          orders: [],
          total: 0,
          page: input.page,
          limit: input.limit,
        };
      }
    }),

  // Obtener assessment de un cliente
  getAssessment: publicProcedure
    .input(z.object({ customerId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

      try {
        const result = await db
          .select()
          .from(assessmentResponses)
          .where(eq(assessmentResponses.customerId, input.customerId));

        return result[0] || null;
      } catch (error) {
        console.error('Error fetching assessment:', error);
        return null;
      }
    }),

  // Obtener estadísticas
  getStats: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

    try {
      const allCustomers = await db.select().from(customers);
      const allOrders = await db.select().from(orders);
      const completedOrders = allOrders.filter(o => o.status === 'completed');
      const abandonedOrders = allOrders.filter(o => o.status === 'pending');

      const totalRevenue = completedOrders.reduce((sum, order) => sum + order.amount, 0);
      const conversionRate = allCustomers.length > 0 
        ? ((completedOrders.length / allCustomers.length) * 100).toFixed(2)
        : '0';

      return {
        totalCustomers: allCustomers.length,
        totalOrders: allOrders.length,
        completedOrders: completedOrders.length,
        abandonedOrders: abandonedOrders.length,
        totalRevenue: (totalRevenue / 100).toFixed(2),
        conversionRate: parseFloat(conversionRate),
        averageOrderValue: completedOrders.length > 0 
          ? (totalRevenue / completedOrders.length / 100).toFixed(2)
          : '0',
      };
    } catch (error) {
      console.error('Error fetching stats:', error);
      return {
        totalCustomers: 0,
        totalOrders: 0,
        completedOrders: 0,
        abandonedOrders: 0,
        totalRevenue: '0',
        conversionRate: 0,
        averageOrderValue: '0',
      };
    }
  }),

  // Exportar clientes a CSV
  exportCustomersCSV: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

    try {
      const allCustomers = await db.select().from(customers);

      const headers = ['Email', 'Nombre', 'Teléfono', 'Fecha de Registro'];
      const rows = allCustomers.map(c => [
        c.email || '',
        (c.firstName || '') + ' ' + (c.lastName || ''),
        c.phone || '',
        new Date(c.createdAt).toLocaleDateString('es-ES'),
      ]);

      const csv = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
      ].join('\n');

      return {
        csv,
        filename: `clientes-${new Date().toISOString().split('T')[0]}.csv`,
      };
    } catch (error) {
      console.error('Error exporting customers:', error);
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
    }
  }),

  // Exportar órdenes a CSV
  exportOrdersCSV: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

    try {
      const allOrders = await db.select().from(orders);

      const headers = ['Orden ID', 'Cliente ID', 'Monto', 'Estado', 'Método de Pago', 'Fecha'];
      const rows = allOrders.map(o => [
        o.orderId,
        o.customerId.toString(),
        (o.amount / 100).toFixed(2) + ' €',
        o.status,
        o.paymentMethod || '',
        new Date(o.createdAt).toLocaleDateString('es-ES'),
      ]);

      const csv = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
      ].join('\n');

      return {
        csv,
        filename: `ordenes-${new Date().toISOString().split('T')[0]}.csv`,
      };
    } catch (error) {
      console.error('Error exporting orders:', error);
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
    }
  }),
});
