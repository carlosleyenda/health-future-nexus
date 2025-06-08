
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, DollarSign, Calendar, Users, Download, Eye } from 'lucide-react';
import { useAuthStore } from '@/store/auth';

export default function FinancialDashboard() {
  const { user } = useAuthStore();
  const [timeRange, setTimeRange] = useState('month');
  
  const isDoctor = user?.role === 'doctor';
  const isAdmin = user?.role === 'admin';

  // Sample data for doctor
  const doctorStats = {
    monthlyRevenue: 45230,
    totalPatients: 156,
    avgConsultationFee: 800,
    pendingPayments: 2400,
    consultationsThisMonth: 67,
    revenueGrowth: 12.5,
    upcomingPayouts: 42830
  };

  // Sample data for admin
  const adminStats = {
    platformRevenue: 125600,
    totalCommissions: 25120,
    activeDoctors: 45,
    totalTransactions: 1234,
    averageTransactionValue: 750,
    revenueGrowth: 18.2,
    monthlyGrowth: 15.3
  };

  const recentTransactions = [
    { id: '1', patient: 'Ana García', amount: 800, commission: isAdmin ? 80 : 0, date: '2024-01-15', status: 'completed' },
    { id: '2', patient: 'Carlos López', amount: 1200, commission: isAdmin ? 120 : 0, date: '2024-01-14', status: 'completed' },
    { id: '3', patient: 'María Rodríguez', amount: 600, commission: isAdmin ? 60 : 0, date: '2024-01-13', status: 'pending' },
    { id: '4', patient: 'José Martínez', amount: 900, commission: isAdmin ? 90 : 0, date: '2024-01-12', status: 'completed' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const DoctorDashboard = () => (
    <>
      {/* Revenue Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ingresos del Mes</p>
                <p className="text-2xl font-bold">${doctorStats.monthlyRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Consultas</p>
                <p className="text-2xl font-bold">{doctorStats.consultationsThisMonth}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tarifa Promedio</p>
                <p className="text-2xl font-bold">${doctorStats.avgConsultationFee}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Próximo Pago</p>
                <p className="text-2xl font-bold">${doctorStats.upcomingPayouts.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">En 3 días</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Growth Chart Placeholder */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Tendencia de Ingresos</span>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">
                +{doctorStats.revenueGrowth}% este mes
              </Badge>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Semana</SelectItem>
                  <SelectItem value="month">Mes</SelectItem>
                  <SelectItem value="year">Año</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 mx-auto mb-3 text-blue-600" />
              <p className="text-muted-foreground">Gráfico de tendencias de ingresos</p>
              <p className="text-sm text-muted-foreground">Implementación pendiente</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );

  const AdminDashboard = () => (
    <>
      {/* Platform Revenue Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ingresos Plataforma</p>
                <p className="text-2xl font-bold">${adminStats.platformRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Comisiones</p>
                <p className="text-2xl font-bold">${adminStats.totalCommissions.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Doctores Activos</p>
                <p className="text-2xl font-bold">{adminStats.activeDoctors}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Transacciones</p>
                <p className="text-2xl font-bold">{adminStats.totalTransactions.toLocaleString()}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Commission Breakdown */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Desglose de Comisiones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-900">10%</div>
              <div className="text-sm text-blue-700">Consultas Generales</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-lg font-bold text-purple-900">15%</div>
              <div className="text-sm text-purple-700">Consultas Especializadas</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-900">5%</div>
              <div className="text-sm text-green-700">Farmacia & Delivery</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">
            {isDoctor ? 'Panel Financiero' : 'Dashboard Financiero'}
          </h2>
          <p className="text-muted-foreground">
            {isDoctor ? 'Gestiona tus ingresos y pagos' : 'Supervisión financiera de la plataforma'}
          </p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Exportar Reporte
        </Button>
      </div>

      {isDoctor && <DoctorDashboard />}
      {isAdmin && <AdminDashboard />}

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Transacciones Recientes</span>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Ver Todas
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{transaction.patient}</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString('es-MX')}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${transaction.amount}</div>
                  {isAdmin && transaction.commission > 0 && (
                    <div className="text-sm text-green-600">
                      Comisión: ${transaction.commission}
                    </div>
                  )}
                  <Badge className={getStatusColor(transaction.status)}>
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payout Schedule (Doctor only) */}
      {isDoctor && (
        <Card>
          <CardHeader>
            <CardTitle>Calendario de Pagos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <div className="font-medium">Próximo Pago</div>
                  <div className="text-sm text-muted-foreground">18 de Enero, 2024</div>
                </div>
                <div className="text-lg font-bold text-green-700">
                  ${doctorStats.upcomingPayouts.toLocaleString()}
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Pago Pendiente</div>
                  <div className="text-sm text-muted-foreground">Consultas del 1-15 Enero</div>
                </div>
                <div className="text-lg font-bold">
                  ${doctorStats.pendingPayments.toLocaleString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
