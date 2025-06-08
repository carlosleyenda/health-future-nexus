
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { TrendingUp, DollarSign, Calendar, Users, Download, Eye, ArrowUp, ArrowDown } from 'lucide-react';
import { useAuthStore } from '@/store/auth';

export default function ImprovedFinancialDashboard() {
  const { user } = useAuthStore();
  const [timeRange, setTimeRange] = useState('month');
  
  const isDoctor = user?.role === 'doctor';
  const isAdmin = user?.role === 'admin';

  // Enhanced data with better visual hierarchy
  const doctorStats = {
    monthlyRevenue: 45230,
    revenueChange: 12.5,
    totalPatients: 156,
    patientChange: 8,
    avgConsultationFee: 800,
    feeChange: 5.2,
    pendingPayments: 2400,
    consultationsThisMonth: 67,
    upcomingPayouts: 42830,
    payoutDate: '18 de Enero'
  };

  const adminStats = {
    platformRevenue: 125600,
    revenueChange: 18.2,
    totalCommissions: 25120,
    commissionChange: 15.3,
    activeDoctors: 45,
    doctorChange: 12,
    totalTransactions: 1234,
    transactionChange: 22.1
  };

  const recentTransactions = [
    { id: '1', patient: 'Ana García', amount: 800, commission: isAdmin ? 80 : 0, date: '2024-01-15', status: 'completed', type: 'consultation' },
    { id: '2', patient: 'Carlos López', amount: 1200, commission: isAdmin ? 120 : 0, date: '2024-01-14', status: 'completed', type: 'specialist' },
    { id: '3', patient: 'María Rodríguez', amount: 600, commission: isAdmin ? 60 : 0, date: '2024-01-13', status: 'pending', type: 'consultation' },
    { id: '4', patient: 'José Martínez', amount: 900, commission: isAdmin ? 90 : 0, date: '2024-01-12', status: 'completed', type: 'consultation' }
  ];

  const StatCard = ({ title, value, change, icon: Icon, color, subtitle = null }) => (
    <Card className="relative overflow-hidden transition-all duration-200 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            {subtitle && (
              <p className="text-xs text-gray-500">{subtitle}</p>
            )}
            <div className="flex items-center gap-1">
              {change > 0 ? (
                <ArrowUp className="h-3 w-3 text-green-600" />
              ) : (
                <ArrowDown className="h-3 w-3 text-red-600" />
              )}
              <span className={`text-xs font-medium ${
                change > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {Math.abs(change)}% vs mes anterior
              </span>
            </div>
          </div>
          <div className={`p-3 rounded-xl ${color}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const TransactionRow = ({ transaction }) => (
    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-600 font-medium text-sm">
            {transaction.patient.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div>
          <div className="font-medium text-gray-900">{transaction.patient}</div>
          <div className="text-sm text-gray-500">
            {new Date(transaction.date).toLocaleDateString('es-MX')} • {transaction.type}
          </div>
        </div>
      </div>
      <div className="text-right space-y-1">
        <div className="text-lg font-bold text-gray-900">${transaction.amount.toLocaleString()}</div>
        {isAdmin && transaction.commission > 0 && (
          <div className="text-sm text-green-600">+${transaction.commission}</div>
        )}
        <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
          {transaction.status === 'completed' ? 'Completado' : 'Pendiente'}
        </Badge>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {isDoctor ? 'Mi Panel Financiero' : 'Dashboard Financiero'}
          </h2>
          <p className="text-gray-600 mt-1">
            {isDoctor ? 'Gestiona tus ingresos y pagos de manera eficiente' : 'Supervisión completa de la actividad financiera'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Esta semana</SelectItem>
              <SelectItem value="month">Este mes</SelectItem>
              <SelectItem value="year">Este año</SelectItem>
            </SelectContent>
          </Select>
          <Button className="shadow-md hover:shadow-lg transition-all">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      {isDoctor && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Ingresos del Mes"
            value={`$${doctorStats.monthlyRevenue.toLocaleString()}`}
            change={doctorStats.revenueChange}
            icon={DollarSign}
            color="bg-gradient-to-br from-green-500 to-green-600"
          />
          <StatCard
            title="Consultas Realizadas"
            value={doctorStats.consultationsThisMonth}
            change={doctorStats.patientChange}
            icon={Calendar}
            color="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <StatCard
            title="Tarifa Promedio"
            value={`$${doctorStats.avgConsultationFee}`}
            change={doctorStats.feeChange}
            icon={TrendingUp}
            color="bg-gradient-to-br from-purple-500 to-purple-600"
          />
          <StatCard
            title="Próximo Pago"
            value={`$${doctorStats.upcomingPayouts.toLocaleString()}`}
            change={8.5}
            icon={Calendar}
            color="bg-gradient-to-br from-orange-500 to-orange-600"
            subtitle={doctorStats.payoutDate}
          />
        </div>
      )}

      {isAdmin && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Ingresos Plataforma"
            value={`$${adminStats.platformRevenue.toLocaleString()}`}
            change={adminStats.revenueChange}
            icon={DollarSign}
            color="bg-gradient-to-br from-green-500 to-green-600"
          />
          <StatCard
            title="Comisiones Totales"
            value={`$${adminStats.totalCommissions.toLocaleString()}`}
            change={adminStats.commissionChange}
            icon={TrendingUp}
            color="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <StatCard
            title="Doctores Activos"
            value={adminStats.activeDoctors}
            change={adminStats.doctorChange}
            icon={Users}
            color="bg-gradient-to-br from-purple-500 to-purple-600"
          />
          <StatCard
            title="Transacciones"
            value={adminStats.totalTransactions.toLocaleString()}
            change={adminStats.transactionChange}
            icon={Calendar}
            color="bg-gradient-to-br from-orange-500 to-orange-600"
          />
        </div>
      )}

      {/* Enhanced Revenue Chart */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="border-b bg-gray-50/50">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span>Tendencia de Ingresos</span>
            </div>
            <Badge className="bg-green-100 text-green-800 border-green-200">
              +{isDoctor ? doctorStats.revenueChange : adminStats.revenueChange}% este {timeRange === 'month' ? 'mes' : timeRange}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="h-80 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl flex items-center justify-center border-2 border-dashed border-blue-200">
            <div className="text-center space-y-4">
              <TrendingUp className="h-16 w-16 mx-auto text-blue-400" />
              <div>
                <p className="text-lg font-medium text-gray-700">Gráfico de Tendencias</p>
                <p className="text-sm text-gray-500">Los datos se visualizarán aquí próximamente</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Transactions List */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="border-b bg-gray-50/50">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Eye className="h-5 w-5 text-blue-600" />
              <span>Transacciones Recientes</span>
            </div>
            <Button variant="outline" size="sm" className="shadow-sm">
              Ver Todas
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Payout Schedule (Doctor only) */}
      {isDoctor && (
        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b bg-gray-50/50">
            <CardTitle className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-blue-600" />
              Calendario de Pagos
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-4">
              <div className="flex items-center justify-between p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <div className="space-y-1">
                  <div className="font-semibold text-green-900">Próximo Pago</div>
                  <div className="text-sm text-green-700">{doctorStats.payoutDate}, 2024</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-800">
                    ${doctorStats.upcomingPayouts.toLocaleString()}
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-200 mt-1">
                    En 3 días
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between p-6 bg-orange-50 rounded-xl border border-orange-200">
                <div className="space-y-1">
                  <div className="font-semibold text-orange-900">Pago Pendiente</div>
                  <div className="text-sm text-orange-700">Consultas del 1-15 Enero</div>
                </div>
                <div className="text-2xl font-bold text-orange-800">
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
