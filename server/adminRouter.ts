import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { publicProcedure, router } from './_core/trpc';
import { getDb } from './db';
import { customers, orders, assessmentResponses, customerNotes, auditLog } from '../drizzle/schema';
import { eq, and, gte, lte, like, desc } from 'drizzle-orm';

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

      return {
        success: true,
        token: 'admin-token-' + Date.now(),
      };
    }),

  // Obtener estadísticas
  getStats: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

    try {
      const allCustomers = await db.select().from(customers);
      const allOrders = await db.select().from(orders);
      const completedOrders = allOrders.filter(o => o.status === 'completed');
      const totalRevenue = completedOrders.reduce((sum, o) => sum + (o.amount || 0), 0);

      return {
        totalCustomers: allCustomers.length,
        totalOrders: allOrders.length,
        completedOrders: completedOrders.length,
        pendingOrders: allOrders.filter(o => o.status === 'pending').length,
        totalRevenue: totalRevenue / 100,
        conversionRate: allCustomers.length > 0 ? ((completedOrders.length / allCustomers.length) * 100).toFixed(2) : '0',
      };
    } catch (error) {
      console.error('[Admin] Error getting stats:', error);
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
    }
  }),

  // Obtener clientes con búsqueda y filtros avanzados
  getCustomers: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
        paymentStatus: z.enum(['all', 'completed', 'pending', 'failed']).optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        page: z.number().default(1),
        limit: z.number().default(20),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

      try {
        let customersData = await db.select().from(customers);
        let ordersData = await db.select().from(orders);

        // Filtrar por búsqueda
        if (input.search) {
          customersData = customersData.filter(c =>
            (c.email ?? '').toLowerCase().includes(input.search!.toLowerCase()) ||
            (c.firstName ?? '').toLowerCase().includes(input.search!.toLowerCase()) ||
            (c.lastName ?? '').toLowerCase().includes(input.search!.toLowerCase()) ||
            (c.phone ?? '').includes(input.search!)
          );
        }

        // Filtrar por estado de pago
        if (input.paymentStatus && input.paymentStatus !== 'all') {
          const filteredOrders = ordersData.filter(o => o.status === input.paymentStatus);
          const customerIds = new Set(filteredOrders.map(o => o.customerId));
          customersData = customersData.filter(c => customerIds.has(c.id));
        }

        // Filtrar por fecha
        if (input.startDate || input.endDate) {
          const start = input.startDate ? new Date(input.startDate) : null;
          const end = input.endDate ? new Date(input.endDate) : null;

          customersData = customersData.filter(c => {
            const createdAt = new Date(c.createdAt);
            if (start && createdAt < start) return false;
            if (end && createdAt > end) return false;
            return true;
          });
        }

        // Paginar
        const offset = (input.page - 1) * input.limit;
        const paginatedCustomers = customersData.slice(offset, offset + input.limit);

        // Obtener órdenes asociadas
        const customerIds = paginatedCustomers.map(c => c.id);
        const customerOrders = ordersData.filter(o => customerIds.includes(o.customerId));

        return {
          customers: paginatedCustomers,
          orders: customerOrders,
          total: customersData.length,
          page: input.page,
          limit: input.limit,
        };
      } catch (error) {
        console.error('[Admin] Error getting customers:', error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      }
    }),

  // Obtener órdenes con filtros
  getOrders: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
        status: z.enum(['all', 'pending', 'completed', 'failed', 'refunded']).optional(),
        paymentMethod: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        page: z.number().default(1),
        limit: z.number().default(20),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

      try {
        let ordersData = await db.select().from(orders);
        const customersData = await db.select().from(customers);

        // Filtrar por búsqueda (email o nombre del cliente)
        if (input.search) {
          const matchingCustomers = customersData.filter(c =>
            (c.email ?? '').toLowerCase().includes(input.search!.toLowerCase()) ||
            (c.firstName ?? '').toLowerCase().includes(input.search!.toLowerCase())
          );
          const customerIds = new Set(matchingCustomers.map(c => c.id));
          ordersData = ordersData.filter(o => customerIds.has(o.customerId));
        }

        // Filtrar por estado
        if (input.status && input.status !== 'all') {
          ordersData = ordersData.filter(o => o.status === input.status);
        }

        // Filtrar por método de pago
        if (input.paymentMethod) {
          ordersData = ordersData.filter(o => o.paymentMethod === input.paymentMethod);
        }

        // Filtrar por fecha
        if (input.startDate || input.endDate) {
          const start = input.startDate ? new Date(input.startDate) : null;
          const end = input.endDate ? new Date(input.endDate) : null;

          ordersData = ordersData.filter(o => {
            const createdAt = new Date(o.createdAt);
            if (start && createdAt < start) return false;
            if (end && createdAt > end) return false;
            return true;
          });
        }

        // Paginar
        const offset = (input.page - 1) * input.limit;
        const paginatedOrders = ordersData.slice(offset, offset + input.limit);

        return {
          orders: paginatedOrders,
          total: ordersData.length,
          page: input.page,
          limit: input.limit,
        };
      } catch (error) {
        console.error('[Admin] Error getting orders:', error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      }
    }),

  // Obtener assessments con búsqueda y filtros
  getAssessments: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
        mainGoal: z.string().optional(),
        experienceLevel: z.string().optional(),
        page: z.number().default(1),
        limit: z.number().default(20),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

      try {
        let assessmentsData = await db.select().from(assessmentResponses);
        const customersData = await db.select().from(customers);

        // Filtrar por búsqueda (email o nombre del cliente)
        if (input.search) {
          const matchingCustomers = customersData.filter(c =>
            (c.email ?? '').toLowerCase().includes(input.search!.toLowerCase()) ||
            (c.firstName ?? '').toLowerCase().includes(input.search!.toLowerCase())
          );
          const customerIds = new Set(matchingCustomers.map(c => c.id));
          assessmentsData = assessmentsData.filter(a => customerIds.has(a.customerId));
        }

        // Filtrar por objetivo principal
        if (input.mainGoal) {
          assessmentsData = assessmentsData.filter(a => a.mainGoal === input.mainGoal);
        }

        // Filtrar por nivel de experiencia
        if (input.experienceLevel) {
          assessmentsData = assessmentsData.filter(a => a.experienceLevel === input.experienceLevel);
        }

        // Paginar
        const offset = (input.page - 1) * input.limit;
        const paginatedAssessments = assessmentsData.slice(offset, offset + input.limit);

        return {
          assessments: paginatedAssessments,
          total: assessmentsData.length,
          page: input.page,
          limit: input.limit,
        };
      } catch (error) {
        console.error('[Admin] Error getting assessments:', error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      }
    }),

  // Añadir nota a cliente
  addCustomerNote: publicProcedure
    .input(
      z.object({
        customerId: z.number(),
        note: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

      try {
        await db.insert(customerNotes).values({
          customerId: input.customerId,
          note: input.note,
        });

        // Log de auditoría
        await db.insert(auditLog).values({
          customerId: input.customerId,
          action: 'NOTE_ADDED',
          description: `Nota añadida: ${input.note.substring(0, 50)}...`,
        });

        return { success: true };
      } catch (error) {
        console.error('[Admin] Error adding note:', error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      }
    }),

  // Obtener notas de cliente
  getCustomerNotes: publicProcedure
    .input(z.object({ customerId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

      try {
        const notes = await db
          .select()
          .from(customerNotes)
          .where(eq(customerNotes.customerId, input.customerId));

        return notes;
      } catch (error) {
        console.error('[Admin] Error getting notes:', error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      }
    }),

  // Obtener historial de auditoría
  getAuditLog: publicProcedure
    .input(
      z.object({
        customerId: z.number().optional(),
        orderId: z.number().optional(),
        action: z.string().optional(),
        page: z.number().default(1),
        limit: z.number().default(50),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

      try {
        let logs = await db.select().from(auditLog);

        if (input.customerId) {
          logs = logs.filter(l => l.customerId === input.customerId);
        }

        if (input.orderId) {
          logs = logs.filter(l => l.orderId === input.orderId);
        }

        if (input.action) {
          logs = logs.filter(l => l.action === input.action);
        }

        // Ordenar por fecha descendente
        logs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        // Paginar
        const offset = (input.page - 1) * input.limit;
        const paginatedLogs = logs.slice(offset, offset + input.limit);

        return {
          logs: paginatedLogs,
          total: logs.length,
          page: input.page,
          limit: input.limit,
        };
      } catch (error) {
        console.error('[Admin] Error getting audit log:', error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      }
    }),

  // Generar reporte de conversión
  getConversionReport: publicProcedure
    .input(
      z.object({
        startDate: z.string().optional(),
        endDate: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

      try {
        const customersData = await db.select().from(customers);
        const ordersData = await db.select().from(orders);

        let filteredCustomers = customersData;
        let filteredOrders = ordersData;

        if (input.startDate || input.endDate) {
          const start = input.startDate ? new Date(input.startDate) : null;
          const end = input.endDate ? new Date(input.endDate) : null;

          filteredCustomers = customersData.filter(c => {
            const createdAt = new Date(c.createdAt);
            if (start && createdAt < start) return false;
            if (end && createdAt > end) return false;
            return true;
          });

          filteredOrders = ordersData.filter(o => {
            const createdAt = new Date(o.createdAt);
            if (start && createdAt < start) return false;
            if (end && createdAt > end) return false;
            return true;
          });
        }

        const completedOrders = filteredOrders.filter(o => o.status === 'completed');
        const conversionRate = filteredCustomers.length > 0
          ? ((completedOrders.length / filteredCustomers.length) * 100).toFixed(2)
          : '0';

        return {
          totalLeads: filteredCustomers.length,
          totalOrders: filteredOrders.length,
          completedOrders: completedOrders.length,
          conversionRate: parseFloat(conversionRate),
          revenue: completedOrders.reduce((sum, o) => sum + (o.amount || 0), 0) / 100,
          byPaymentMethod: {
            stripe: filteredOrders.filter(o => o.paymentMethod === 'stripe').length,
            paypal: filteredOrders.filter(o => o.paymentMethod === 'paypal').length,
            klarna: filteredOrders.filter(o => o.paymentMethod === 'klarna').length,
            applePay: filteredOrders.filter(o => o.paymentMethod === 'applePay').length,
            googlePay: filteredOrders.filter(o => o.paymentMethod === 'googlePay').length,
          },
        };
      } catch (error) {
        console.error('[Admin] Error generating report:', error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      }
    }),

  // Generar reporte de ingresos por período
  getRevenueReport: publicProcedure
    .input(
      z.object({
        startDate: z.string().optional(),
        endDate: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

      try {
        let ordersData = await db.select().from(orders);

        if (input.startDate || input.endDate) {
          const start = input.startDate ? new Date(input.startDate) : null;
          const end = input.endDate ? new Date(input.endDate) : null;

          ordersData = ordersData.filter(o => {
            const createdAt = new Date(o.createdAt);
            if (start && createdAt < start) return false;
            if (end && createdAt > end) return false;
            return true;
          });
        }

        const completedOrders = ordersData.filter(o => o.status === 'completed');
        const totalRevenue = completedOrders.reduce((sum, o) => sum + (o.amount || 0), 0) / 100;

        // Agrupar por día
        const revenueByDay: Record<string, number> = {};
        completedOrders.forEach(order => {
          const date = new Date(order.createdAt).toISOString().split('T')[0];
          revenueByDay[date] = (revenueByDay[date] || 0) + (order.amount || 0) / 100;
        });

        return {
          totalRevenue,
          orderCount: completedOrders.length,
          averageOrderValue: completedOrders.length > 0 ? (totalRevenue / completedOrders.length).toFixed(2) : '0',
          revenueByDay,
        };
      } catch (error) {
        console.error('[Admin] Error generating revenue report:', error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      }
    }),

  // Generar reporte de clientes por objetivo
  getClientsByGoalReport: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

    try {
      const assessmentsData = await db.select().from(assessmentResponses);

      const byGoal: Record<string, number> = {};
      assessmentsData.forEach(a => {
        const goal = a.mainGoal || 'Sin especificar';
        byGoal[goal] = (byGoal[goal] || 0) + 1;
      });

      return byGoal;
    } catch (error) {
      console.error('[Admin] Error generating goal report:', error);
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
    }
  }),

  // Exportar clientes a CSV
  exportCustomersCSV: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

    try {
      const customersData = await db.select().from(customers);
      const ordersData = await db.select().from(orders);

      // Crear CSV
      const headers = ['ID', 'Nombre', 'Email', 'Teléfono', 'Estado de Pago', 'Fecha de Registro'];
      const rows = customersData.map(c => {
        const order = ordersData.find(o => o.customerId === c.id);
        return [
          c.id,
          `${c.firstName} ${c.lastName}`,
          c.email,
          c.phone || '',
          order?.status || 'Sin orden',
          new Date(c.createdAt).toLocaleDateString('es-ES'),
        ];
      });

      const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

      return {
        csv,
        filename: `clientes-${new Date().toISOString().split('T')[0]}.csv`,
      };
    } catch (error) {
      console.error('[Admin] Error exporting customers:', error);
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
    }
  }),

  // Exportar órdenes a CSV
  exportOrdersCSV: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

    try {
      const ordersData = await db.select().from(orders);
      const customersData = await db.select().from(customers);

      // Crear CSV
      const headers = ['ID Orden', 'Cliente', 'Email', 'Monto', 'Estado', 'Método de Pago', 'Fecha'];
      const rows = ordersData.map(o => {
        const customer = customersData.find(c => c.id === o.customerId);
        return [
          o.orderId,
          `${customer?.firstName} ${customer?.lastName}`,
          customer?.email || '',
          `${(o.amount || 0) / 100}€`,
          o.status,
          o.paymentMethod || '',
          new Date(o.createdAt).toLocaleDateString('es-ES'),
        ];
      });

      const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

      return {
        csv,
        filename: `ordenes-${new Date().toISOString().split('T')[0]}.csv`,
      };
    } catch (error) {
      console.error('[Admin] Error exporting orders:', error);
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
    }
  }),
});
