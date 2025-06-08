
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, TrendingUp, TrendingDown, Users, Calendar, 
  FileText, AlertTriangle, Brain, BarChart3, PieChart,
  CreditCard, Wallet, Package, Bell, Settings, Download
} from 'lucide-react';
import AIChat from '@/components/ai/AIChat';

export default function AdminFinancialDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const kpis = [
    {
      title: 'Ingresos Totales',
      value: '$847,230',
      change: '+22.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Margen de Ganancia',
      value: '68.3%',
      change: '+4.2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Costo por Adquisición',
      value: '$84.50',
      change: '-12.8%',
      trend: 'down',
      icon: TrendingDown,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Valor de Vida del Cliente',
      value: '$2,450',
      change: '+18.7%',
      trend: 'up',
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const revenueStreams = [
    { category: 'Consultas Virtuales', amount: 520000, percentage: 61.4, growth: '+28%' },
    { category: 'Servicios de Farmacia', amount: 180000, percentage: 21.2, growth: '+15%' },
    { category: 'Suscripciones Premium', amount: 95000, percentage: 11.2, growth: '+45%' },
    { category: 'Servicios Especializados', amount: 52230, percentage: 6.2, growth: '+35%' }
  ];

  const alerts = [
    {
      type: 'warning',
      title: 'Margen reducido en especialidades',
      description: 'Cardiología muestra margen 15% menor que promedio',
      action: 'Revisar pricing'
    },
    {
      type: 'info',
      title: 'Oportunidad de cross-selling',
      description: '340 pacientes elegibles para servicios premium',
      action: 'Activar campaña'
    },
    {
      type: 'success',
      title: 'Meta mensual alcanzada',
      description: 'Ingresos superaron meta en 8.5%',
      action: 'Revisar bonificaciones'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Financiero Administrativo</h1>
          <p className="text-muted-foreground">
            Análisis completo de rendimiento financiero y oportunidades de optimización
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exportar Reporte
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Configurar Alertas
          </Button>
        </div>
      </div>

      {/* KPIs principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                  <p className="text-2xl font-bold">{kpi.value}</p>
                  <p className={`text-xs flex items-center gap-1 ${
                    kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {kpi.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {kpi.change} vs mes anterior
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                  <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel principal de análisis */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="revenue" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="revenue">Ingresos</TabsTrigger>
              <TabsTrigger value="costs">Costos</TabsTrigger>
              <TabsTrigger value="profitability">Rentabilidad</TabsTrigger>
              <TabsTrigger value="forecasting">Proyecciones</TabsTrigger>
            </TabsList>

            <TabsContent value="revenue" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Análisis de Fuentes de Ingresos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueStreams.map((stream, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-semibold">{stream.category}</h4>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-2xl font-bold">${stream.amount.toLocaleString()}</span>
                            <span className="text-sm text-gray-500">{stream.percentage}% del total</span>
                            <span className="text-sm text-green-600 font-medium">{stream.growth}</span>
                          </div>
                        </div>
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-full bg-blue-600 rounded-full" 
                            style={{ width: `${stream.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="costs" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Análisis de Estructura de Costos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Costos Operativos</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Personal médico:</span>
                          <span className="font-medium">$245,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Tecnología y software:</span>
                          <span className="font-medium">$68,500</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Marketing digital:</span>
                          <span className="font-medium">$42,300</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Optimización de Costos</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-green-600">
                          <span className="text-sm">Ahorro por automatización:</span>
                          <span className="font-medium">-$15,200</span>
                        </div>
                        <div className="flex justify-between text-blue-600">
                          <span className="text-sm">Eficiencia en procesos:</span>
                          <span className="font-medium">-$8,900</span>
                        </div>
                        <div className="flex justify-between text-purple-600">
                          <span className="text-sm">Negociación proveedores:</span>
                          <span className="font-medium">-$12,400</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profitability" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Análisis de Rentabilidad por Servicio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { service: 'Teleconsulta General', margin: 72, revenue: 420000, trend: 'up' },
                      { service: 'Consulta Especializada', margin: 68, revenue: 180000, trend: 'up' },
                      { service: 'Servicios de Farmacia', margin: 45, revenue: 150000, trend: 'stable' },
                      { service: 'Planes Premium', margin: 85, revenue: 95000, trend: 'up' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">{item.service}</h4>
                          <p className="text-sm text-gray-500">Revenue: ${item.revenue.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">{item.margin}%</p>
                          <p className={`text-sm ${
                            item.trend === 'up' ? 'text-green-600' : 
                            item.trend === 'down' ? 'text-red-600' : 'text-gray-500'
                          }`}>
                            {item.trend === 'up' ? '↗ Creciendo' : 
                             item.trend === 'down' ? '↘ Decreciendo' : '→ Estable'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="forecasting" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Proyecciones IA - Próximos 6 meses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg text-center">
                      <h4 className="font-semibold text-green-600">Escenario Optimista</h4>
                      <p className="text-2xl font-bold mt-2">$1.2M</p>
                      <p className="text-sm text-gray-500">Probabilidad: 25%</p>
                    </div>
                    <div className="p-4 border rounded-lg text-center bg-blue-50">
                      <h4 className="font-semibold text-blue-600">Escenario Base</h4>
                      <p className="text-2xl font-bold mt-2">$980K</p>
                      <p className="text-sm text-gray-500">Probabilidad: 60%</p>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <h4 className="font-semibold text-orange-600">Escenario Conservador</h4>
                      <p className="text-2xl font-bold mt-2">$750K</p>
                      <p className="text-sm text-gray-500">Probabilidad: 15%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Panel lateral */}
        <div className="space-y-6">
          {/* Alertas Financieras */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Alertas Financieras
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {alerts.map((alert, index) => (
                <div key={index} className={`p-3 border rounded-lg ${
                  alert.type === 'warning' ? 'border-yellow-200 bg-yellow-50' :
                  alert.type === 'info' ? 'border-blue-200 bg-blue-50' :
                  'border-green-200 bg-green-50'
                }`}>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className={`h-4 w-4 mt-0.5 ${
                      alert.type === 'warning' ? 'text-yellow-600' :
                      alert.type === 'info' ? 'text-blue-600' :
                      'text-green-600'
                    }`} />
                    <div className="flex-1">
                      <h5 className="font-medium text-sm">{alert.title}</h5>
                      <p className="text-xs text-gray-600 mt-1">{alert.description}</p>
                      <Button size="sm" variant="outline" className="mt-2 h-6 text-xs">
                        {alert.action}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Chat especializado */}
          <AIChat
            context="financial"
            title="Consultor Financiero IA"
            placeholder="Pregunta sobre métricas, análisis financiero, optimización de costos..."
          />
        </div>
      </div>
    </div>
  );
}
