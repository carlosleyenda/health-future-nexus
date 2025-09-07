import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  DollarSign, 
  TrendingUp, 
  Calendar,
  CreditCard,
  Gift,
  Wallet,
  PiggyBank,
  Target,
  Award,
  Download,
  Eye,
  Clock,
  AlertCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import type { EarningsSummary } from '@/types/professionalDelivery';

interface ProfessionalEarningsProps {
  earnings: EarningsSummary;
  currency?: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function ProfessionalEarnings({ earnings, currency = "S/" }: ProfessionalEarningsProps) {
  const chartData = [
    { name: 'Lun', amount: 45.20, deliveries: 8 },
    { name: 'Mar', amount: 52.80, deliveries: 12 },
    { name: 'Mié', amount: 38.50, deliveries: 6 },
    { name: 'Jue', amount: 61.30, deliveries: 15 },
    { name: 'Vie', amount: 73.40, deliveries: 18 },
    { name: 'Sáb', amount: 89.60, deliveries: 22 },
    { name: 'Dom', amount: 67.20, deliveries: 16 }
  ];

  const pieData = [
    { name: 'Tarifas de Entrega', value: earnings.breakdown?.deliveryFees || 0 },
    { name: 'Propinas', value: earnings.breakdown?.tips || 0 },
    { name: 'Bonificaciones', value: earnings.breakdown?.bonuses || 0 },
    { name: 'Incentivos', value: (earnings.breakdown?.bonuses || 0) * 0.3 }
  ];

  const paymentMethods = [
    { method: 'Transferencia Bancaria', amount: earnings.month * 0.7, status: 'Pagado', date: '15 Nov' },
    { method: 'Efectivo', amount: earnings.month * 0.2, status: 'Pendiente', date: 'Hoy' },
    { method: 'Billetera Digital', amount: earnings.month * 0.1, status: 'Procesando', date: '18 Nov' }
  ];

  const achievements = [
    { title: 'Top Performer', description: 'Top 10% este mes', icon: <Award className="h-5 w-5" />, color: 'bg-yellow-500' },
    { title: 'Puntualidad', description: '95% entregas a tiempo', icon: <Clock className="h-5 w-5" />, color: 'bg-blue-500' },
    { title: 'Cliente Satisfecho', description: '4.8★ promedio', icon: <Gift className="h-5 w-5" />, color: 'bg-green-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Resumen Principal */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Ganancia Hoy</p>
                <p className="text-2xl font-bold">{currency}{earnings.today?.toFixed(2) || '0.00'}</p>
                <p className="text-green-100 text-xs">+12% vs ayer</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-100" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Esta Semana</p>
                <p className="text-2xl font-bold">{currency}{earnings.week?.toFixed(2) || '0.00'}</p>
                <p className="text-blue-100 text-xs">+8% vs semana pasada</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-100" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Este Mes</p>
                <p className="text-2xl font-bold">{currency}{earnings.month?.toFixed(2) || '0.00'}</p>
                <p className="text-purple-100 text-xs">Meta: {currency}1,800</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-100" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Propinas</p>
                <p className="text-2xl font-bold">{currency}{earnings.totalTips?.toFixed(2) || '0.00'}</p>
                <p className="text-orange-100 text-xs">Promedio diario</p>
              </div>
              <Gift className="h-8 w-8 text-orange-100" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="analytics">Análisis</TabsTrigger>
          <TabsTrigger value="payments">Pagos</TabsTrigger>
          <TabsTrigger value="goals">Metas</TabsTrigger>
          <TabsTrigger value="achievements">Logros</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gráfico de Ganancias Diarias */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Ganancias Esta Semana
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === 'amount' ? `${currency}${value}` : value,
                        name === 'amount' ? 'Ganancia' : 'Entregas'
                      ]}
                    />
                    <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="deliveries" stroke="#82ca9d" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Distribución de Ingresos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PiggyBank className="h-5 w-5" />
                  Distribución de Ingresos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${currency}${value}`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Métricas Rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Wallet className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Promedio por Entrega</p>
                    <p className="text-xl font-bold">{currency}{earnings.averagePerDelivery?.toFixed(2) || '0.00'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pagos Pendientes</p>
                    <p className="text-xl font-bold">{currency}{earnings.pendingPayments?.toFixed(2) || '0.00'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Award className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Mejor Día</p>
                    <p className="text-xl font-bold">{currency}{earnings.bestDay?.amount?.toFixed(2) || '0.00'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análisis de Rendimiento</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#8884d8" name="Ganancia" />
                  <Bar dataKey="deliveries" fill="#82ca9d" name="Entregas" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Historial de Pagos</h3>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Descargar
            </Button>
          </div>

          <div className="space-y-3">
            {paymentMethods.map((payment, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{payment.method}</p>
                        <p className="text-sm text-muted-foreground">{payment.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{currency}{payment.amount.toFixed(2)}</p>
                      <Badge 
                        variant={
                          payment.status === 'Pagado' ? 'default' : 
                          payment.status === 'Pendiente' ? 'destructive' : 
                          'secondary'
                        }
                        className="text-xs"
                      >
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Goals Tab */}
        <TabsContent value="goals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Metas Mensuales
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Ingresos Mensuales</span>
                  <span className="text-sm text-muted-foreground">
                    {currency}{earnings.month?.toFixed(2) || '0.00'} / {currency}1,800
                  </span>
                </div>
                <Progress value={((earnings.month || 0) / 1800) * 100} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Entregas Mensuales</span>
                  <span className="text-sm text-muted-foreground">85 / 120</span>
                </div>
                <Progress value={(85 / 120) * 100} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Calificación Promedio</span>
                  <span className="text-sm text-muted-foreground">4.8 / 5.0</span>
                </div>
                <Progress value={(4.8 / 5.0) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${achievement.color} text-white`}>
                      {achievement.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Próximos Objetivos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="font-medium">Completar 100 entregas</p>
                    <p className="text-sm text-muted-foreground">15 entregas restantes para desbloquear bonificación</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <AlertCircle className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Mantener 4.9+ estrellas</p>
                    <p className="text-sm text-muted-foreground">Calidad de servicio excepcional</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}