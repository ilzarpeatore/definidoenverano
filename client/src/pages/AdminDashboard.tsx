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
  const [expandedCustomers, setExpandedCustomers] = useState<number[]>([]);
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

  const toggleCustomer = (customerId: number) => {
    setExpandedCustomers(prev =>
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
  const conversionReportQuery = trpc.admin.getConversionReport.useQuery({}, { enabled: isAuthenticated });
  const revenueReportQuery = trpc.admin.getRevenueReport.useQuery({}, { enabled: isAuthenticated });

  const customerNotesQuery = trpc.admin.getCustomerNotes.useQuery(
    { customerId: selectedCustomer || 0 },
    { enabled: selectedCustomer !== null && isAuthenticated }
  );

  const addNoteMutation = trpc.admin.addCustomerNote.useMutation({
    onSuccess: () => {
      toast.success('Nota añadida');
      setNoteText('');
      customerNotesQuery.refetch();
    },
    onError: () => toast.error('Error al añadir nota')
  });

  const handleAuth = () => {
    if (password === 'Adminbs1998') {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      toast.error('Contraseña incorrecta');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="card-glass border border-border p-8 rounded-sm max-w-md w-full">
          <h1 className="text-2xl font-bold text-white mb-6">Panel de Administración</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
                  className="w-full px-4 py-2 bg-card border border-border text-white rounded-sm focus:outline-none focus:border-accent"
                  placeholder="Ingresa contraseña"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <Button onClick={handleAuth} className="w-full">Acceder</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Panel de Administración</h1>
        <Button
          onClick={() => {
            setIsAuthenticated(false);
            navigate('/');
          }}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <LogOut size={16} />
          Salir
        </Button>
      </div>

      {/* Tabs */}
      <div className="border-b border-border flex">
        {(['stats', 'customers', 'orders', 'assessments', 'reports'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === tab
                ? 'text-accent border-b-2 border-accent'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6 max-w-7xl mx-auto">
        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            {statsQuery.isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
              </div>
            ) : statsQuery.data ? (
              <div className="grid md:grid-cols-4 gap-4">
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
                  <p className="font-display text-3xl text-accent">{(statsQuery.data.totalRevenue / 100).toFixed(2)}€</p>
                </div>
                <div className="card-glass border border-border p-6 rounded-sm">
                  <p className="text-gray-400 text-sm mb-2">Tasa Conversión</p>
                  <p className="font-display text-3xl text-accent">{statsQuery.data.conversionRate}%</p>
                </div>
              </div>
            ) : null}

            {/* Conversion Report */}
            {conversionReportQuery.data && (
              <div className="card-glass border border-border p-6 rounded-sm">
                <h3 className="font-semibold text-white mb-4">Reporte de Conversión</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Tasa de Conversión</p>
                    <p className="font-display text-2xl text-accent">{conversionReportQuery.data.conversionRate}%</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Clientes Totales</p>
                    <p className="font-display text-2xl text-accent">{conversionReportQuery.data.totalCustomers}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Revenue Report */}
            {revenueReportQuery.data && (
              <div className="card-glass border border-border p-6 rounded-sm">
                <h3 className="font-semibold text-white mb-4">Reporte de Ingresos</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Ingresos Totales</p>
                    <p className="font-display text-2xl text-accent">{(revenueReportQuery.data.totalRevenue / 100).toFixed(2)}€</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Ticket Promedio</p>
                    <p className="font-display text-2xl text-accent">{(revenueReportQuery.data.averageOrderValue / 100).toFixed(2)}€</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <div>
            <div className="mb-6 space-y-4">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="text"
                    placeholder="Buscar cliente..."
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
                  <option value="all">Todos</option>
                  <option value="completed">Completado</option>
                  <option value="pending">Pendiente</option>
                  <option value="failed">Fallido</option>
                </select>
              </div>
            </div>

            {customersQuery.isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
              </div>
            ) : customersQuery.data?.customers.length ? (
              <div className="space-y-3">
                {customersQuery.data.customers.map((customer: any) => (
                  <div key={customer.id} className="card-glass border border-border rounded-sm overflow-hidden">
                    <button
                      onClick={() => toggleCustomer(customer.id)}
                      className="w-full p-4 flex items-center justify-between hover:bg-card/50 transition"
                    >
                      <div className="flex-1 text-left">
                        <h3 className="font-semibold text-white">{customer.firstName} {customer.lastName}</h3>
                        <p className="text-gray-400 text-sm">{customer.email} • {customer.phone}</p>
                      </div>
                      <ChevronDown 
                        size={20} 
                        className={`text-accent transition-transform ${
                          expandedCustomers.includes(customer.id) ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    
                    {expandedCustomers.includes(customer.id) && (
                      <div className="border-t border-border p-4 bg-card/30 space-y-4">
                        {/* Assessment Info */}
                        {customer.assessment ? (
                          <div className="space-y-2">
                            <h4 className="font-semibold text-white text-sm">Assessment</h4>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>
                                <p className="text-gray-500">Objetivo</p>
                                <p className="text-accent">{customer.assessment.mainGoal}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Experiencia</p>
                                <p className="text-accent">{customer.assessment.experienceLevel}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Tiempo Disponible</p>
                                <p className="text-accent">{customer.assessment.availableTime}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Años Entrenando</p>
                                <p className="text-accent">{customer.assessment.yearsTraining}</p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-400 text-sm">Sin assessment</p>
                        )}
                        
                        {/* Order Info */}
                        {customer.latestOrder ? (
                          <div className="space-y-2 pt-2 border-t border-border">
                            <h4 className="font-semibold text-white text-sm">Última Orden</h4>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>
                                <p className="text-gray-500">ID Orden</p>
                                <p className="text-accent">{customer.latestOrder.orderId}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Monto</p>
                                <p className="text-accent">{(customer.latestOrder.amount || 0) / 100}€</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Estado</p>
                                <p className={`font-semibold ${
                                  customer.latestOrder.status === 'completed' ? 'text-green-400' :
                                  customer.latestOrder.status === 'pending' ? 'text-yellow-400' :
                                  'text-red-400'
                                }`}>{customer.latestOrder.status}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Fecha</p>
                                <p className="text-accent">{new Date(customer.latestOrder.createdAt).toLocaleDateString('es-ES')}</p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-400 text-sm pt-2 border-t border-border">Sin órdenes</p>
                        )}
                        
                        <Button
                          onClick={() => setSelectedCustomer(customer.id)}
                          variant="outline"
                          size="sm"
                          className="w-full mt-2"
                        >
                          <MessageSquare size={16} className="mr-2" />
                          Ver Notas
                        </Button>
                      </div>
                    )}
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
            <div className="mb-6 space-y-4">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="text"
                    placeholder="Buscar orden..."
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
                  <option value="all">Todos</option>
                  <option value="pending">Pendiente</option>
                  <option value="completed">Completado</option>
                  <option value="failed">Fallido</option>
                </select>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  className="px-4 py-2 bg-card border border-border text-white rounded-sm focus:outline-none focus:border-accent"
                />
              </div>
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
                      <th className="text-left py-3 px-4 text-gray-400">Cliente</th>
                      <th className="text-left py-3 px-4 text-gray-400">Monto</th>
                      <th className="text-left py-3 px-4 text-gray-400">Estado</th>
                      <th className="text-left py-3 px-4 text-gray-400">Assessment</th>
                      <th className="text-left py-3 px-4 text-gray-400">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordersQuery.data.orders.map((order: any) => (
                      <tr key={order.id} className="border-b border-border hover:bg-card/50">
                        <td className="py-3 px-4 text-white">{order.orderId}</td>
                        <td className="py-3 px-4 text-white">{order.customer ? `${order.customer.firstName} ${order.customer.lastName}` : 'N/A'}</td>
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
                        <td className="py-3 px-4 text-gray-400">{order.assessment ? order.assessment.mainGoal : 'N/A'}</td>
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
            <div className="mb-6 space-y-4">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="text"
                    placeholder="Buscar assessment..."
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
            </div>

            {assessmentsQuery.isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
              </div>
            ) : assessmentsQuery.data?.assessments.length ? (
              <div className="space-y-3">
                {assessmentsQuery.data.assessments.map((assessment: any) => (
                  <div key={assessment.id} className="card-glass border border-border p-4 rounded-sm">
                    <div className="mb-3 pb-3 border-b border-border">
                      <p className="text-gray-400 text-xs mb-1">Cliente</p>
                      <p className="text-white font-semibold">{assessment.customer ? `${assessment.customer.firstName} ${assessment.customer.lastName}` : 'N/A'}</p>
                      <p className="text-gray-500 text-xs">{assessment.customer?.email}</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="text-gray-400 mb-1">Objetivo</p>
                        <p className="text-white font-semibold">{assessment.mainGoal}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 mb-1">Experiencia</p>
                        <p className="text-white font-semibold">{assessment.experienceLevel}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 mb-1">Orden ID</p>
                        <p className="text-white font-semibold">{assessment.order ? assessment.order.orderId : 'N/A'}</p>
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

        {/* Notes Section */}
        {selectedCustomer !== null && (
          <div className="fixed bottom-0 right-0 w-96 bg-card border-l border-t border-border p-6 rounded-tl-sm shadow-lg max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white">Notas del Cliente</h3>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {customerNotesQuery.isLoading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="w-5 h-5 animate-spin text-accent" />
              </div>
            ) : customerNotesQuery.data?.notes?.length ? (
              <div className="space-y-3">
                {customerNotesQuery.data.notes.map((note: any) => (
                  <div key={note.id} className="bg-background p-3 rounded-sm border border-border">
                    <p className="text-white text-sm">{note.note}</p>
                    <p className="text-gray-500 text-xs mt-2">{new Date(note.createdAt).toLocaleDateString('es-ES')}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm text-center py-4">Sin notas</p>
            )}

            <div className="mt-4 space-y-2">
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Añadir nota..."
                className="w-full px-3 py-2 bg-background border border-border text-white rounded-sm focus:outline-none focus:border-accent text-sm"
                rows={3}
              />
              <Button
                onClick={() => {
                  if (selectedCustomer && noteText.trim()) {
                    addNoteMutation.mutate({ customerId: selectedCustomer, note: noteText });
                  }
                }}
                className="w-full"
                disabled={addNoteMutation.isPending}
              >
                {addNoteMutation.isPending ? 'Guardando...' : 'Guardar Nota'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
