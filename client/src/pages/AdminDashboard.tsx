import { useState, useEffect } from 'react';
import { ChevronDown, Plus, MessageSquare, History } from 'lucide-react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { LogOut, Download, Eye, EyeOff, Loader2, Search, Filter } from 'lucide-react';

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'stats' | 'customers' | 'orders' | 'assessments' | 'reports'>('stats');
  const [expandedAssessments, setExpandedAssessments] = useState<number[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
  const [noteText, setNoteText] = useState('');

  // Filtros
  const [customerSearch, setCustomerSearch] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<'all' | 'completed' | 'pending' | 'failed'>('all');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatus, setOrderStatus] = useState<'all' | 'pending' | 'completed' | 'failed' | 'refunded'>('all');
  const [assessmentSearch, setAssessmentSearch] = useState('');
  const [assessmentGoal, setAssessmentGoal] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const toggleAssessment = (customerId: number) => {
    setExpandedAssessments(prev =>
      prev.includes(customerId)
        ? prev.filter(id => id !== customerId)
        : [...prev, customerId]
    );
  };

  // Queries
  const statsQuery = trpc.admin.getStats.useQuery(undefined, { enabled: isAuthenticated });
  const customersQuery = trpc.admin.getCustomers.useQuery(
    { search: customerSearch, paymentStatus, startDate: dateRange.start, endDate: dateRange.end, page: 1, limit: 50 },
    { enabled: isAuthenticated }
  );
  const ordersQuery = trpc.admin.getOrders.useQuery(
    { search: orderSearch, status: orderStatus, startDate: dateRange.start, endDate: dateRange.end, page: 1, limit: 50 },
    { enabled: isAuthenticated }
  );
  const assessmentsQuery = trpc.admin.getAssessments.useQuery(
    { search: assessmentSearch, mainGoal: assessmentGoal, page: 1, limit: 50 },
    { enabled: isAuthenticated }
  );
  const conversionReportQuery = trpc.admin.getConversionReport.useQuery(
    { startDate: dateRange.start, endDate: dateRange.end },
    { enabled: isAuthenticated && activeTab === 'reports' }
  );
  const revenueReportQuery = trpc.admin.getRevenueReport.useQuery(
    { startDate: dateRange.start, endDate: dateRange.end },
    { enabled: isAuthenticated && activeTab === 'reports' }
  );
  const clientsByGoalQuery = trpc.admin.getClientsByGoalReport.useQuery(undefined, { enabled: isAuthenticated && activeTab === 'reports' });
  const customerNotesQuery = trpc.admin.getCustomerNotes.useQuery(
    { customerId: selectedCustomer! },
    { enabled: isAuthenticated && selectedCustomer !== null }
  );
  const auditLogQuery = trpc.admin.getAuditLog.useQuery(
    { customerId: selectedCustomer || undefined, page: 1, limit: 20 },
    { enabled: isAuthenticated && selectedCustomer !== null }
  );

  // Mutations
  const loginMutation = trpc.admin.login.useMutation();
  const addNoteMutation = trpc.admin.addCustomerNote.useMutation();
  const exportCustomersQuery = trpc.admin.exportCustomersCSV.useQuery(undefined, { enabled: false });
  const exportOrdersQuery = trpc.admin.exportOrdersCSV.useQuery(undefined, { enabled: false });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await loginMutation.mutateAsync({ password });
      if (result.success) {
        setIsAuthenticated(true);
        setPassword('');
        toast.success('¡Bienvenido al panel de administración!');
      }
    } catch (error) {
      toast.error('Contraseña incorrecta');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setActiveTab('stats');
    navigate('/');
  };

  const handleAddNote = async (customerId: number) => {
    if (!noteText.trim()) {
      toast.error('La nota no puede estar vacía');
      return;
    }

    try {
      await addNoteMutation.mutateAsync({ customerId, note: noteText });
      setNoteText('');
      await customerNotesQuery.refetch();
      toast.success('Nota añadida correctamente');
    } catch (error) {
      toast.error('Error al añadir la nota');
    }
  };

  const downloadCSV = (csv: string, filename: string) => {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <div className="card-glass border border-border p-8 rounded-sm max-w-md w-full">
          <h1 className="font-display text-3xl text-white mb-2">Panel Admin</h1>
          <p className="text-gray-400 mb-6">Definido en Verano</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="w-full px-4 py-3 bg-card border border-border text-white placeholder-gray-500 rounded-sm focus:outline-none focus:border-accent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <Button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full bg-accent hover:bg-accent/90 text-black font-semibold"
            >
              {loginMutation.isPending ? <Loader2 className="animate-spin mr-2" size={20} /> : null}
              Acceder
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-card/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-display text-2xl text-white">Panel de Administración</h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut size={18} />
            Salir
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-4 flex gap-4 overflow-x-auto">
          {['stats', 'customers', 'orders', 'assessments', 'reports'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-accent text-accent'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <div>
            <h2 className="font-display text-2xl text-white mb-8">Estadísticas</h2>
            {statsQuery.isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
              </div>
            ) : statsQuery.data ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="card-glass border border-border p-6 rounded-sm">
                  <p className="text-gray-400 text-sm mb-2">Clientes Totales</p>
                  <p className="font-display text-3xl text-accent">{statsQuery.data.totalCustomers}</p>
                </div>
                <div className="card-glass border border-border p-6 rounded-sm">
                  <p className="text-gray-400 text-sm mb-2">Órdenes Completadas</p>
                  <p className="font-display text-3xl text-accent">{statsQuery.data.completedOrders}</p>
                </div>
                <div className="card-glass border border-border p-6 rounded-sm">
                  <p className="text-gray-400 text-sm mb-2">Ingresos Totales</p>
                  <p className="font-display text-3xl text-accent">{statsQuery.data.totalRevenue.toFixed(2)}€</p>
                </div>
                <div className="card-glass border border-border p-6 rounded-sm">
                  <p className="text-gray-400 text-sm mb-2">Tasa de Conversión</p>
                  <p className="font-display text-3xl text-accent">{statsQuery.data.conversionRate}%</p>
                </div>
                <div className="card-glass border border-border p-6 rounded-sm">
                  <p className="text-gray-400 text-sm mb-2">Órdenes Pendientes</p>
                  <p className="font-display text-3xl text-accent">{statsQuery.data.pendingOrders}</p>
                </div>
                <div className="card-glass border border-border p-6 rounded-sm">
                  <p className="text-gray-400 text-sm mb-2">Órdenes Totales</p>
                  <p className="font-display text-3xl text-accent">{statsQuery.data.totalOrders}</p>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl text-white">Clientes</h2>
              <Button
                onClick={() => {
                  exportCustomersQuery.refetch().then(result => {
                    if (result.data) {
                      downloadCSV(result.data.csv, result.data.filename);
                    }
                  });
                }}
                className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-black"
              >
                <Download size={18} />
                Descargar CSV
              </Button>
            </div>

            {/* Filtros */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Buscar por email o nombre..."
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-card border border-border text-white placeholder-gray-500 rounded-sm focus:outline-none focus:border-accent"
                />
              </div>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value as any)}
                className="px-4 py-2 bg-card border border-border text-white rounded-sm focus:outline-none focus:border-accent"
              >
                <option value="all">Todos los estados</option>
                <option value="completed">Completado</option>
                <option value="pending">Pendiente</option>
                <option value="failed">Fallido</option>
              </select>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="px-4 py-2 bg-card border border-border text-white rounded-sm focus:outline-none focus:border-accent"
              />
            </div>

            {customersQuery.isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
              </div>
            ) : customersQuery.data?.customers.length ? (
              <div className="space-y-3">
                {customersQuery.data.customers.map(customer => (
                  <div key={customer.id} className="card-glass border border-border p-4 rounded-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-white">{customer.firstName} {customer.lastName}</h3>
                        <p className="text-gray-400 text-sm">{customer.email} • {customer.phone}</p>
                      </div>
                      <Button
                        onClick={() => setSelectedCustomer(customer.id)}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <MessageSquare size={16} />
                        Notas
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-12">No hay clientes</p>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl text-white">Órdenes</h2>
              <Button
                onClick={() => {
                  exportOrdersQuery.refetch().then(result => {
                    if (result.data) {
                      downloadCSV(result.data.csv, result.data.filename);
                    }
                  });
                }}
                className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-black"
              >
                <Download size={18} />
                Descargar CSV
              </Button>
            </div>

            {/* Filtros */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Buscar por email..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-card border border-border text-white placeholder-gray-500 rounded-sm focus:outline-none focus:border-accent"
                />
              </div>
              <select
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value as any)}
                className="px-4 py-2 bg-card border border-border text-white rounded-sm focus:outline-none focus:border-accent"
              >
                <option value="all">Todos los estados</option>
                <option value="completed">Completado</option>
                <option value="pending">Pendiente</option>
                <option value="failed">Fallido</option>
              </select>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="px-4 py-2 bg-card border border-border text-white rounded-sm focus:outline-none focus:border-accent"
              />
            </div>

            {ordersQuery.isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
              </div>
            ) : ordersQuery.data?.orders.length ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-gray-400">ID Orden</th>
                      <th className="text-left py-3 px-4 text-gray-400">Monto</th>
                      <th className="text-left py-3 px-4 text-gray-400">Estado</th>
                      <th className="text-left py-3 px-4 text-gray-400">Método</th>
                      <th className="text-left py-3 px-4 text-gray-400">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordersQuery.data.orders.map(order => (
                      <tr key={order.id} className="border-b border-border hover:bg-card/50">
                        <td className="py-3 px-4 text-white">{order.orderId}</td>
                        <td className="py-3 px-4 text-white">{(order.amount || 0) / 100}€</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            order.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                            order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-400">{order.paymentMethod}</td>
                        <td className="py-3 px-4 text-gray-400">{new Date(order.createdAt).toLocaleDateString('es-ES')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-400 text-center py-12">No hay órdenes</p>
            )}
          </div>
        )}

        {/* Assessments Tab */}
        {activeTab === 'assessments' && (
          <div>
            <h2 className="font-display text-2xl text-white mb-6">Assessments</h2>

            {/* Filtros */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Buscar por email..."
                  value={assessmentSearch}
                  onChange={(e) => setAssessmentSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-card border border-border text-white placeholder-gray-500 rounded-sm focus:outline-none focus:border-accent"
                />
              </div>
              <input
                type="text"
                placeholder="Filtrar por objetivo..."
                value={assessmentGoal}
                onChange={(e) => setAssessmentGoal(e.target.value)}
                className="px-4 py-2 bg-card border border-border text-white placeholder-gray-500 rounded-sm focus:outline-none focus:border-accent"
              />
            </div>

            {assessmentsQuery.isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
              </div>
            ) : assessmentsQuery.data?.assessments.length ? (
              <div className="space-y-3">
                {assessmentsQuery.data.assessments.map(assessment => (
                  <div key={assessment.id} className="card-glass border border-border p-4 rounded-sm">
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400 mb-1">Objetivo</p>
                        <p className="text-white font-semibold">{assessment.mainGoal}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 mb-1">Experiencia</p>
                        <p className="text-white font-semibold">{assessment.experienceLevel}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 mb-1">Tiempo Disponible</p>
                        <p className="text-white font-semibold">{assessment.availableTime}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 mb-1">Años Entrenando</p>
                        <p className="text-white font-semibold">{assessment.yearsTraining} años</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-12">No hay assessments</p>
            )}
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div>
            <h2 className="font-display text-2xl text-white mb-6">Reportes</h2>

            {conversionReportQuery.isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
              </div>
            ) : (
              <div className="space-y-6">
                {/* Conversion Report */}
                {conversionReportQuery.data && (
                  <div className="card-glass border border-border p-6 rounded-sm">
                    <h3 className="font-semibold text-white mb-4">Reporte de Conversión</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Leads Totales</p>
                        <p className="font-display text-2xl text-accent">{conversionReportQuery.data.totalLeads}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Tasa de Conversión</p>
                        <p className="font-display text-2xl text-accent">{conversionReportQuery.data.conversionRate}%</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Órdenes Completadas</p>
                        <p className="font-display text-2xl text-accent">{conversionReportQuery.data.completedOrders}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Ingresos</p>
                        <p className="font-display text-2xl text-accent">{conversionReportQuery.data.revenue.toFixed(2)}€</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Revenue Report */}
                {revenueReportQuery.data && (
                  <div className="card-glass border border-border p-6 rounded-sm">
                    <h3 className="font-semibold text-white mb-4">Reporte de Ingresos</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Ingresos Totales</p>
                        <p className="font-display text-2xl text-accent">{revenueReportQuery.data.totalRevenue.toFixed(2)}€</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Número de Órdenes</p>
                        <p className="font-display text-2xl text-accent">{revenueReportQuery.data.orderCount}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Ticket Promedio</p>
                        <p className="font-display text-2xl text-accent">{revenueReportQuery.data.averageOrderValue}€</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Clients by Goal */}
                {clientsByGoalQuery.data && (
                  <div className="card-glass border border-border p-6 rounded-sm">
                    <h3 className="font-semibold text-white mb-4">Clientes por Objetivo</h3>
                    <div className="space-y-2">
                      {Object.entries(clientsByGoalQuery.data).map(([goal, count]) => (
                        <div key={goal} className="flex items-center justify-between">
                          <span className="text-gray-400">{goal}</span>
                          <span className="font-semibold text-accent">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Notes Sidebar */}
      {selectedCustomer !== null && (
        <div className="fixed right-0 top-0 h-full w-96 bg-card border-l border-border shadow-lg overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <MessageSquare size={18} />
                Notas del Cliente
              </h3>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Add Note */}
            <div className="mb-6 pb-6 border-b border-border">
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Añadir una nota..."
                className="w-full px-3 py-2 bg-background border border-border text-white placeholder-gray-500 rounded-sm focus:outline-none focus:border-accent text-sm"
                rows={3}
              />
              <Button
                onClick={() => handleAddNote(selectedCustomer)}
                disabled={addNoteMutation.isPending}
                className="mt-3 w-full bg-accent hover:bg-accent/90 text-black text-sm"
              >
                {addNoteMutation.isPending ? <Loader2 className="animate-spin mr-2" size={16} /> : <Plus size={16} className="mr-2" />}
                Añadir Nota
              </Button>
            </div>

            {/* Notes List */}
            {customerNotesQuery.isLoading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="w-5 h-5 animate-spin text-accent" />
              </div>
            ) : customerNotesQuery.data?.length ? (
              <div className="space-y-3">
                {customerNotesQuery.data.map(note => (
                  <div key={note.id} className="bg-background p-3 rounded-sm border border-border">
                    <p className="text-white text-sm">{note.note}</p>
                    <p className="text-gray-500 text-xs mt-2">{new Date(note.createdAt).toLocaleDateString('es-ES')}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm text-center py-4">Sin notas</p>
            )}

            {/* Audit Log */}
            {auditLogQuery.data?.logs.length && (
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2 text-sm">
                  <History size={16} />
                  Historial
                </h4>
                <div className="space-y-2 text-xs">
                  {auditLogQuery.data.logs.map(log => (
                    <div key={log.id} className="text-gray-400">
                      <p className="font-semibold text-white">{log.action}</p>
                      <p>{log.description}</p>
                      <p className="text-gray-500">{new Date(log.createdAt).toLocaleDateString('es-ES')}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
