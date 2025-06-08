
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, TrendingDown, Users, DollarSign, Activity, 
  AlertTriangle, Download, Calendar, BarChart3, PieChart, Target
} from 'lucide-react';
import { businessIntelligenceService } from '@/services/analytics/businessIntelligenceService';
import type { ExecutiveDashboard as ExecutiveDashboardType } from '@/types/analytics';

export default function ExecutiveDashboard() {
  const [dashboard, setDashboard] = useState<ExecutiveDashboardType | null>(null);
  const [period, setPeriod] = useState('monthly');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, [period]);

  const loadDashboard = async () => {
    setIsLoading(true);
    try {
      const data = await businessIntelligenceService.generateExecutiveDashboard('org-1', period);
      setDashboard(data);
    } catch (error) {
      console.error('Error loading executive dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-600">No se pudieron cargar los datos del dashboard ejecutivo</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Ejecutivo</h1>
          <p className="text-muted-foreground">Análisis y métricas empresariales</p>
        </div>
        <div className="flex gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Diario</SelectItem>
              <SelectItem value="weekly">Semanal</SelectItem>
              <SelectItem value="monthly">Mensual</SelectItem>
              <SelectItem value="quarterly">Trimestral</SelectItem>
              <SelectItem value="yearly">Anual</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ingresos Totales</p>
                <p className="text-2xl font-bold">${dashboard.metrics.revenue.total.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  {dashboard.metrics.revenue.growth >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                  )}
                  <span className={`text-sm ${dashboard.metrics.revenue.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {dashboard.metrics.revenue.growth > 0 ? '+' : ''}{dashboard.metrics.revenue.growth}%
                  </span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pacientes Totales</p>
                <p className="text-2xl font-bold">{dashboard.metrics.patients.total.toLocaleString()}</p>
                <p className="text-sm text-blue-600">+{dashboard.metrics.patients.newPatients} nuevos</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Consultas</p>
                <p className="text-2xl font-bold">{dashboard.metrics.operations.consultations}</p>
                <p className="text-sm text-purple-600">{dashboard.metrics.operations.appointments} citas</p>
              </div>
              <Activity className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Margen de Beneficio</p>
                <p className="text-2xl font-bold">{dashboard.metrics.financial.profitMargin}%</p>
                <p className="text-sm text-orange-600">LTV: ${dashboard.metrics.financial.lifetimeValue}</p>
              </div>
              <Target className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {dashboard.alerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Alertas Empresariales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dashboard.alerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant={
                      alert.severity === 'critical' ? 'destructive' :
                      alert.severity === 'high' ? 'secondary' : 'outline'
                    }>
                      {alert.severity}
                    </Badge>
                    <div>
                      <p className="font-medium">{alert.message}</p>
                      <p className="text-sm text-muted-foreground">{alert.recommendation}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver Detalles
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detailed Analytics Tabs */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Ingresos</TabsTrigger>
          <TabsTrigger value="operations">Operaciones</TabsTrigger>
          <TabsTrigger value="trends">Tendencias</TabsTrigger>
          <TabsTrigger value="forecasting">Pronósticos</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Desglose de Ingresos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dashboard.metrics.revenue.breakdown.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="capitalize">{item.category.replace('_', ' ')}</span>
                      <div className="text-right">
                        <div className="font-semibold">${item.amount.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">{item.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Métricas Financieras
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Costo por Adquisición</span>
                    <span className="font-semibold">${dashboard.metrics.financial.costPerAcquisition}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Flujo de Caja</span>
                    <span className="font-semibold">${dashboard.metrics.financial.cashFlow.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Retención de Pacientes</span>
                    <span className="font-semibold">{dashboard.metrics.patients.retention}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Satisfacción</span>
                    <span className="font-semibold">{dashboard.metrics.patients.satisfaction}/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="operations" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Eficiencia Operacional</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Tasa de Cancelación</span>
                    <span className="font-semibold">{dashboard.metrics.operations.cancellationRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tiempo de Espera Promedio</span>
                    <span className="font-semibold">{dashboard.metrics.operations.averageWaitTime} min</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análisis de Tendencias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboard.trends.map((trend, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{trend.metric}</p>
                      <p className="text-sm text-muted-foreground">
                        Actual: {trend.current} | Anterior: {trend.previous}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant={
                        trend.trend === 'up' ? 'default' :
                        trend.trend === 'down' ? 'destructive' : 'secondary'
                      }>
                        {trend.trend === 'up' ? '↗' : trend.trend === 'down' ? '↘' : '→'} {trend.trend}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">
                        Confianza: {(trend.confidence * 100).toFixed(0)}%
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
              <CardTitle>Pronósticos y Predicciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Pronósticos avanzados disponibles próximamente</p>
                <p className="text-sm text-gray-500 mt-2">
                  Análisis predictivo basado en IA para optimización de recursos
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
