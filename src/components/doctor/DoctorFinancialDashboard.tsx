
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, TrendingUp, Users, Calendar, Clock,
  Stethoscope, FileText, Target, Award, BarChart3,
  PieChart, CreditCard, Settings
} from 'lucide-react';
import AIChat from '@/components/ai/AIChat';

export default function DoctorFinancialDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const doctorMetrics = {
    monthlyEarnings: 28500,
    avgConsultationFee: 150,
    totalPatients: 156,
    completedConsultations: 189,
    pendingPayments: 2400,
    performanceRating: 4.8
  };

  const earningsBreakdown = [
    { type: 'Consultas Virtuales', amount: 18900, sessions: 126, rate: 150 },
    { type: 'Consultas Presenciales', amount: 6750, sessions: 45, rate: 150 },
    { type: 'Consultas de Seguimiento', amount: 2100, sessions: 28, rate: 75 },
    { type: 'Bonos por Performance', amount: 750, sessions: 1, rate: 750 }
  ];

  const upcomingPayments = [
    { date: '2024-06-15', amount: 8500, description: 'Pago quincenal - Consultas del 1-15 Jun', status: 'pending' },
    { date: '2024-06-30', amount: 9200, description: 'Pago mensual - Performance bonus', status: 'scheduled' },
    { date: '2024-07-05', amount: 2400, description: 'Reembolso gastos médicos', status: 'processing' }
  ];

  const patientStats = [
    { category: 'Nuevos Pacientes', count: 24, revenue: 3600, trend: '+15%' },
    { category: 'Pacientes Recurrentes', count: 132, revenue: 19800, trend: '+8%' },
    { category: 'Consultas de Emergencia', count: 8, revenue: 1600, trend: '+25%' },
    { category: 'Planes de Seguimiento', count: 45, revenue: 3375, trend: '+12%' }
  ];

  const performanceMetrics = [
    { metric: 'Tiempo promedio consulta', value: '28 min', target: '30 min', status: 'good' },
    { metric: 'Rating de satisfacción', value: '4.8/5', target: '4.5/5', status: 'excellent' },
    { metric: 'Tasa de no-show', value: '8%', target: '<10%', status: 'good' },
    { metric: 'Consultas por día', value: '12', target: '10', status: 'excellent' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Financiero - Dr. Panel</h1>
          <p className="text-muted-foreground">
            Gestiona tus ingresos, métricas de performance y objetivos profesionales
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Generar Reporte
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Configurar Tarifas
          </Button>
        </div>
      </div>

      {/* Métricas principales del doctor */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ingresos del Mes</p>
                <p className="text-2xl font-bold">${doctorMetrics.monthlyEarnings.toLocaleString()}</p>
                <p className="text-xs text-green-600">+12% vs mes anterior</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Tarifa Promedio</p>
              <p className="text-xl font-bold">${doctorMetrics.avgConsultationFee}</p>
              <p className="text-xs text-blue-600">Por consulta</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Pacientes Atendidos</p>
              <p className="text-xl font-bold">{doctorMetrics.totalPatients}</p>
              <p className="text-xs text-purple-600">Este mes</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Consultas</p>
              <p className="text-xl font-bold">{doctorMetrics.completedConsultations}</p>
              <p className="text-xs text-blue-600">Completadas</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Rating</p>
              <p className="text-xl font-bold">{doctorMetrics.performanceRating}</p>
              <p className="text-xs text-yellow-600">⭐ Promedio</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel principal para doctores */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="earnings" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="earnings">Ingresos</TabsTrigger>
              <TabsTrigger value="patients">Pacientes</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="schedule">Agenda</TabsTrigger>
            </TabsList>

            <TabsContent value="earnings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Desglose de Ingresos por Tipo de Consulta
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {earningsBreakdown.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.type}</h4>
                          <p className="text-sm text-gray-500">{item.sessions} sesiones × ${item.rate}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">${item.amount.toLocaleString()}</p>
                          <p className="text-sm text-green-600">
                            {Math.round((item.amount / doctorMetrics.monthlyEarnings) * 100)}% del total
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Próximos Pagos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingPayments.map((payment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{payment.description}</p>
                          <p className="text-sm text-gray-500">{payment.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${payment.amount.toLocaleString()}</p>
                          <Badge variant={
                            payment.status === 'pending' ? 'default' :
                            payment.status === 'scheduled' ? 'secondary' : 'outline'
                          }>
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="patients" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Análisis de Base de Pacientes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {patientStats.map((stat, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">{stat.category}</h4>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-2xl font-bold">{stat.count}</p>
                            <p className="text-sm text-gray-500">pacientes</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">${stat.revenue.toLocaleString()}</p>
                            <p className="text-sm text-green-600">{stat.trend}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Métricas de Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {performanceMetrics.map((metric, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">{metric.metric}</h4>
                          <p className="text-sm text-gray-500">Objetivo: {metric.target}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="font-bold">{metric.value}</p>
                          <Badge variant={
                            metric.status === 'excellent' ? 'default' :
                            metric.status === 'good' ? 'secondary' : 'destructive'
                          }>
                            {metric.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Objetivos y Bonificaciones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg bg-green-50">
                      <h4 className="font-semibold text-green-800">Meta Mensual Alcanzada</h4>
                      <p className="text-green-600">150+ consultas completadas</p>
                      <p className="font-bold text-green-800">Bonus: $750</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold">Próxima Meta: Rating 4.9</h4>
                      <p className="text-gray-600">Actual: 4.8 | Faltante: 0.1 puntos</p>
                      <p className="font-bold">Bonus potencial: $500</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Optimización de Agenda
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Horarios Más Rentables</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>9:00 - 12:00 AM:</span>
                          <span className="font-medium">$180/hora</span>
                        </div>
                        <div className="flex justify-between">
                          <span>2:00 - 5:00 PM:</span>
                          <span className="font-medium">$165/hora</span>
                        </div>
                        <div className="flex justify-between">
                          <span>6:00 - 8:00 PM:</span>
                          <span className="font-medium">$200/hora</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Disponibilidad Semanal</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Lunes - Viernes:</span>
                          <span className="font-medium">8 hrs/día</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sábados:</span>
                          <span className="font-medium">4 hrs/día</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Emergencias:</span>
                          <span className="font-medium">24/7</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Panel lateral específico para doctores */}
        <div className="space-y-6">
          {/* Acciones rápidas para doctores */}
          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Clock className="h-4 w-4 mr-2" />
                Ajustar Horarios
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <DollarSign className="h-4 w-4 mr-2" />
                Configurar Tarifas
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Generar Facturas
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <CreditCard className="h-4 w-4 mr-2" />
                Ver Pagos Pendientes
              </Button>
            </CardContent>
          </Card>

          {/* AI Chat específico para doctores */}
          <AIChat
            context="clinical"
            title="Asistente Profesional"
            placeholder="Consulta sobre tarifas, pacientes, optimización de agenda..."
          />
        </div>
      </div>
    </div>
  );
}
