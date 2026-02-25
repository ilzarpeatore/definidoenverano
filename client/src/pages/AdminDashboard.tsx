import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { LogOut, Download, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'stats' | 'customers' | 'orders' | 'assessments'>('stats');

  // Queries
  const statsQuery = trpc.admin.getStats.useQuery(undefined, { enabled: isAuthenticated });
  const customersQuery = trpc.admin.getCustomers.useQuery(
    { page: 1, limit: 50 },
    { enabled: isAuthenticated }
  );
  const ordersQuery = trpc.admin.getOrders.useQuery(
    { page: 1, limit: 50 },
    { enabled: isAuthenticated }
  );
  const exportCustomersQuery = trpc.admin.exportCustomersCSV.useQuery(undefined, { enabled: false });
  const exportOrdersQuery = trpc.admin.exportOrdersCSV.useQuery(undefined, { enabled: false });

  // Mutations
  const loginMutation = trpc.admin.login.useMutation();

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
    toast.success('Sesión cerrada');
  };

  const handleExportCustomers = async () => {
    try {
      const result = await exportCustomersQuery.refetch();
      if (result.data?.csv) {
        const element = document.createElement('a');
        const file = new Blob([result.data.csv], { type: 'text/csv' });
        element.href = URL.createObjectURL(file);
        element.download = result.data.filename;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        toast.success('Clientes exportados correctamente');
      }
    } catch (error) {
      toast.error('Error al exportar clientes');
    }
  };

  const handleExportOrders = async () => {
    try {
      const result = await exportOrdersQuery.refetch();
      if (result.data?.csv) {
        const element = document.createElement('a');
        const file = new Blob([result.data.csv], { type: 'text/csv' });
        element.href = URL.createObjectURL(file);
        element.download = result.data.filename;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        toast.success('Órdenes exportadas correctamente');
      }
    } catch (error) {
      toast.error('Error al exportar órdenes');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center py-12">
        <div className="container max-w-md mx-auto px-4">
          <div className="card-glass border border-border p-8 rounded-sm">
            <h1 className="font-display text-3xl text-white mb-2">Panel de Admin</h1>
            <p className="text-gray-400 mb-8">Definido en Verano</p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Contraseña</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingresa tu contraseña"
                    className="w-full px-4 py-2 bg-card border border-border rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loginMutation.isPending || !password}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-2 rounded-sm"
              >
                {loginMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Verificando...
                  </span>
                ) : (
                  'Acceder'
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-card border-b border-border py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="font-display text-3xl text-white">Panel de Administración</h1>
            <p className="text-gray-400">Definido en Verano</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 flex gap-4">
          {[
            { id: 'stats', label: 'Estadísticas' },
            { id: 'customers', label: 'Clientes' },
            { id: 'orders', label: 'Órdenes' },
            { id: 'assessments', label: 'Assessments' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-4 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-accent text-accent'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <div>
            <h2 className="font-display text-2xl text-white mb-8">Estadísticas</h2>
            {statsQuery.isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
              </div>
            ) : statsQuery.data ? (
              <div className="grid md:grid-cols-4 gap-6">
                <div className="card-glass border border-border p-6 rounded-sm">
                  <p className="text-gray-400 text-sm mb-2">Total de Clientes</p>
                  <p className="font-display text-4xl text-accent font-bold">{statsQuery.data.totalCustomers}</p>
                </div>
                <div className="card-glass border border-border p-6 rounded-sm">
                  <p className="text-gray-400 text-sm mb-2">Órdenes Completadas</p>
                  <p className="font-display text-4xl text-accent font-bold">{statsQuery.data.completedOrders}</p>
                </div>
                <div className="card-glass border border-border p-6 rounded-sm">
                  <p className="text-gray-400 text-sm mb-2">Ingresos Totales</p>
                  <p className="font-display text-4xl text-accent font-bold">€{statsQuery.data.totalRevenue}</p>
                </div>
                <div className="card-glass border border-border p-6 rounded-sm">
                  <p className="text-gray-400 text-sm mb-2">Tasa de Conversión</p>
                  <p className="font-display text-4xl text-accent font-bold">{statsQuery.data.conversionRate}%</p>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-display text-2xl text-white">Clientes</h2>
              <Button
                onClick={handleExportCustomers}
                className="flex items-center gap-2 bg-accent hover:bg-accent/90"
              >
                <Download className="w-4 h-4" />
                Exportar CSV
              </Button>
            </div>
            {customersQuery.isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
              </div>
            ) : customersQuery.data?.customers.length ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-4 text-gray-300">Email</th>
                      <th className="text-left py-4 px-4 text-gray-300">Nombre</th>
                      <th className="text-left py-4 px-4 text-gray-300">Teléfono</th>
                      <th className="text-left py-4 px-4 text-gray-300">Fecha de Registro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customersQuery.data.customers.map(customer => (
                      <tr key={customer.id} className="border-b border-border hover:bg-card/50">
                        <td className="py-4 px-4 text-gray-300">{customer.email}</td>
                        <td className="py-4 px-4 text-gray-300">{customer.firstName} {customer.lastName}</td>
                        <td className="py-4 px-4 text-gray-300">{customer.phone}</td>
                        <td className="py-4 px-4 text-gray-300">
                          {new Date(customer.createdAt).toLocaleDateString('es-ES')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-400 text-center py-12">No hay clientes aún</p>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-display text-2xl text-white">Órdenes</h2>
              <Button
                onClick={handleExportOrders}
                className="flex items-center gap-2 bg-accent hover:bg-accent/90"
              >
                <Download className="w-4 h-4" />
                Exportar CSV
              </Button>
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
                      <th className="text-left py-4 px-4 text-gray-300">Orden ID</th>
                      <th className="text-left py-4 px-4 text-gray-300">Monto</th>
                      <th className="text-left py-4 px-4 text-gray-300">Estado</th>
                      <th className="text-left py-4 px-4 text-gray-300">Método de Pago</th>
                      <th className="text-left py-4 px-4 text-gray-300">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordersQuery.data.orders.map(order => (
                      <tr key={order.id} className="border-b border-border hover:bg-card/50">
                        <td className="py-4 px-4 text-gray-300 font-mono">{order.orderId.substring(0, 12)}</td>
                        <td className="py-4 px-4 text-gray-300">€{(order.amount / 100).toFixed(2)}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded text-xs font-bold ${
                            order.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                            order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {order.status === 'completed' ? 'Completada' :
                             order.status === 'pending' ? 'Pendiente' :
                             'Fallida'}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-300">{order.paymentMethod}</td>
                        <td className="py-4 px-4 text-gray-300">
                          {new Date(order.createdAt).toLocaleDateString('es-ES')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-400 text-center py-12">No hay órdenes aún</p>
            )}
          </div>
        )}

        {/* Assessments Tab */}
        {activeTab === 'assessments' && (
          <div>
            <h2 className="font-display text-2xl text-white mb-8">Assessments</h2>
            <p className="text-gray-400">Selecciona un cliente de la lista de clientes para ver su assessment</p>
          </div>
        )}
      </div>
    </div>
  );
}
