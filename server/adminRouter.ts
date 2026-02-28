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

  // Obtener clientes con búsqueda y filtros avanzados - CON RELACIONES
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
        const ordersData = await db.select().from(orders);
        const assessmentsData = await db.select().from(assessmentResponses);

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

        // Enriquecer clientes con órdenes y assessments
        const enrichedCustomers = paginatedCustomers.map(customer => {
          const custOrders = ordersData.filter(o => o.customerId === customer.id).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          const latestOrder = custOrders[0] || null;
          const assessment = assessmentsData.find(a => a.customerId === customer.id) || null;
          
          return {
            ...customer,
            latestOrder,
            assessment,
            totalOrders: custOrders.length,
          };
        });

        return {
          customers: enrichedCustomers,
          total: customersData.length,
          page: input.page,
          limit: input.limit,
        };
      } catch (error) {
        console.error('[Admin] Error getting customers:', error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      }
    }),

  // Obtener órdenes con filtros - CON RELACIONES
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
        const assessmentsData = await db.select().from(assessmentResponses);

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

        // Enriquecer órdenes con cliente y assessment
        const enrichedOrders = paginatedOrders.map(order => {
          const customer = customersData.find(c => c.id === order.customerId) || null;
          const assessment = assessmentsData.find(a => a.orderId === order.id) || null;
          
          return {
            ...order,
            customer,
            assessment,
          };
        });

        return {
          orders: enrichedOrders,
          total: ordersData.length,
          page: input.page,
          limit: input.limit,
        };
      } catch (error) {
        console.error('[Admin] Error getting orders:', error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      }
    }),

  // Obtener assessments con búsqueda y filtros - CON RELACIONES
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
        const ordersData = await db.select().from(orders);

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

        // Enriquecer assessments con cliente y orden
        const enrichedAssessments = paginatedAssessments.map(assessment => {
          const customer = customersData.find(c => c.id === assessment.customerId) || null;
          const order = ordersData.find(o => o.id === assessment.orderId) || null;
          
          return {
            ...assessment,
            customer,
            order,
          };
        });

        return {
          assessments: enrichedAssessments,
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
        const notes = await db.select().from(customerNotes).where(eq(customerNotes.customerId, input.customerId)).orderBy(desc(customerNotes.createdAt));
        return { notes };
      } catch (error) {
        console.error('[Admin] Error getting customer notes:', error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      }
    }),

  // Obtener audit log
  getAuditLog: publicProcedure
    .input(
      z.object({
        customerId: z.number().optional(),
        page: z.number().default(1),
        limit: z.number().default(20),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

      try {
        let whereCondition = undefined;
        if (input.customerId) {
          whereCondition = eq(auditLog.customerId, input.customerId);
        }

        const logs = whereCondition 
          ? await db.select().from(auditLog).where(whereCondition).orderBy(desc(auditLog.createdAt)).limit(input.limit).offset((input.page - 1) * input.limit)
          : await db.select().from(auditLog).orderBy(desc(auditLog.createdAt)).limit(input.limit).offset((input.page - 1) * input.limit);
        
        return { logs };
      } catch (error) {
        console.error('[Admin] Error getting audit log:', error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      }
    }),

  // Exportar clientes a CSV
  exportCustomersCSV: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

    try {
      const allCustomers = await db.select().from(customers);
      const allOrders = await db.select().from(orders);

      const csv = ['Email,Nombre,Apellido,Teléfono,Órdenes,Estado Último Pago,Monto Último Pago,Fecha Registro'];
      
      allCustomers.forEach(customer => {
        const customerOrders = allOrders.filter(o => o.customerId === customer.id).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        const latestOrder = customerOrders[0];
        
        csv.push([
          customer.email,
          customer.firstName || '',
          customer.lastName || '',
          customer.phone || '',
          customerOrders.length,
          latestOrder?.status || 'N/A',
          latestOrder ? `${(latestOrder.amount || 0) / 100}€` : '0€',
          new Date(customer.createdAt).toLocaleDateString('es-ES'),
        ].map(v => `"${v}"`).join(','));
      });

      return {
        csv: csv.join('\n'),
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
      const allOrders = await db.select().from(orders);
      const allCustomers = await db.select().from(customers);

      const csv = ['ID Orden,Cliente,Email,Monto,Estado,Método Pago,Fecha'];
      
      allOrders.forEach(order => {
        const customer = allCustomers.find(c => c.id === order.customerId);
        
        csv.push([
          order.orderId,
          `${customer?.firstName || ''} ${customer?.lastName || ''}`,
          customer?.email || '',
          `${(order.amount || 0) / 100}€`,
          order.status,
          order.paymentMethod || '',
          new Date(order.createdAt).toLocaleDateString('es-ES'),
        ].map(v => `"${v}"`).join(','));
      });

      return {
        csv: csv.join('\n'),
        filename: `ordenes-${new Date().toISOString().split('T')[0]}.csv`,
      };
    } catch (error) {
      console.error('[Admin] Error exporting orders:', error);
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
    }
  }),

  // Obtener reporte de conversión
  getConversionReport: publicProcedure
    .input(
      z.object({
        startDate: z.string().optional(),
        endDate: z.string().optional(),
      })
    )
    .query(async () => {
      // Placeholder para reporte de conversión
      return {
        conversionRate: 0,
        totalLeads: 0,
        totalCustomers: 0,
      };
    }),

  // Obtener reporte de ingresos
  getRevenueReport: publicProcedure
    .input(
      z.object({
        startDate: z.string().optional(),
        endDate: z.string().optional(),
      })
    )
    .query(async () => {
      // Placeholder para reporte de ingresos
      return {
        totalRevenue: 0,
        averageOrderValue: 0,
      };
    }),

  // Obtener clientes por objetivo
  getClientsByGoalReport: publicProcedure.query(async () => {
    // Placeholder para reporte de clientes por objetivo
    return {
      goals: [],
    };
  }),
});
