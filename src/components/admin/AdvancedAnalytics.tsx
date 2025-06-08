import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ComposedChart, Scatter
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Users, Calendar, MapPin, Clock,
  Star, DollarSign, Activity, AlertTriangle, Download, FileText
} from 'lucide-react';

const satisfactionData = [
  { month: 'Ene', satisfaction: 4.2, responses: 145 },
  { month: 'Feb', satisfaction: 4.3, responses: 178 },
  { month: 'Mar', satisfaction: 4.1, responses: 156 },
  { month: 'Abr', satisfaction: 4.5, responses: 189 },
  { month: 'May', satisfaction: 4.4, responses: 203 },
  { month: 'Jun', satisfaction: 4.6, responses: 167 }
];

const doctorEfficiencyData = [
  { name: 'Dr. García', avgTime: 25, rating: 4.8, consultations: 89 },
  { name: 'Dra. López', avgTime: 30, rating: 4.6, consultations: 76 },
  { name: 'Dr. Martínez', avgTime: 22, rating: 4.9, consultations: 94 },
  { name: 'Dra. Rodríguez', avgTime: 35, rating: 4.4, consultations: 67 },
  { name: 'Dr. Fernández', avgTime: 28, rating: 4.7, consultations: 82 }
];

const specialtyDemandData = [
  { specialty: 'Cardiología', demand: 35, growth: 12 },
  { specialty: 'Dermatología', demand: 28, growth: 8 },
  { specialty: 'Pediatría', demand: 22, growth: -2 },
  { specialty: 'Neurología', demand: 18, growth: 15 },
  { specialty: 'Ginecología', demand: 25, growth: 5 }
];

const conversionFunnelData = [
  { stage: 'Visitantes', count: 10000, percentage: 100 },
  { stage: 'Registro', count: 2500, percentage: 25 },
  { stage: 'Primera cita', count: 1200, percentage: 12 },
  { stage: 'Pacientes activos', count: 800, percentage: 8 }
];

const retentionData = [
  { month: 'Mes 1', retention: 100 },
  { month: 'Mes 2', retention: 78 },
  { month: 'Mes 3', retention: 65 },
  { month: 'Mes 6', retention: 52 },
  { month: 'Mes 12', retention: 43 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function AdvancedAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [activeTab, setActiveTab] = useState('overview');

  const generateReport = (type: string) => {
    console.log(`Generando reporte: ${type}`);
    // Simular generación de reporte
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Analytics Avanzados</h2>
          <p className="text-muted-foreground">Análisis profundo del rendimiento de la clínica</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Semanal</SelectItem>
              <SelectItem value="monthly">Mensual</SelectItem>
              <SelectItem value="quarterly">Trimestral</SelectItem>
              <SelectItem value="yearly">Anual</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => generateReport('comprehensive')} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exportar Reporte
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="satisfaction">Satisfacción</TabsTrigger>
          <TabsTrigger value="efficiency">Eficiencia</TabsTrigger>
          <TabsTrigger value="demand">Demanda</TabsTrigger>
          <TabsTrigger value="conversion">Conversión</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* KPIs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Satisfacción Promedio</p>
                    <p className="text-2xl font-bold">4.4/5</p>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +5% vs mes anterior
                    </p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Tiempo Promedio</p>
                    <p className="text-2xl font-bold">28 min</p>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingDown className="h-3 w-3 mr-1" />
                      -2 min vs mes anterior
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Tasa de Conversión</p>
                    <p className="text-2xl font-bold">12%</p>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +1.2% vs mes anterior
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">ROI Marketing</p>
                    <p className="text-2xl font-bold">285%</p>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +12% vs mes anterior
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Heatmap de Actividad */}
          <Card>
            <CardHeader>
              <CardTitle>Heatmap de Actividad por Hora</CardTitle>
              <CardDescription>Distribución de citas por hora del día y día de la semana</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Heatmap simulado - Mayor actividad 9AM-5PM</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="satisfaction" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Evolución de Satisfacción del Paciente</CardTitle>
              <CardDescription>Puntuación promedio y número de respuestas por mes</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={satisfactionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" domain={[0, 5]} />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="right" dataKey="responses" fill="#8884d8" name="Respuestas" />
                  <Line yAxisId="left" type="monotone" dataKey="satisfaction" stroke="#82ca9d" name="Satisfacción" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="efficiency" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Eficiencia por Doctor</CardTitle>
              <CardDescription>Tiempo promedio por consulta vs rating del doctor</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={doctorEfficiencyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 5]} />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="avgTime" fill="#8884d8" name="Tiempo Promedio (min)" />
                  <Line yAxisId="right" type="monotone" dataKey="rating" stroke="#82ca9d" name="Rating" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demand" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Demanda por Especialidad</CardTitle>
                <CardDescription>Porcentaje de consultas por especialidad</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={specialtyDemandData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="demand"
                      label
                    >
                      {specialtyDemandData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Crecimiento por Especialidad</CardTitle>
                <CardDescription>Porcentaje de crecimiento mensual</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={specialtyDemandData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="specialty" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="growth" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="conversion" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Funnel de Conversión</CardTitle>
                <CardDescription>Del visitante al paciente activo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conversionFunnelData.map((stage, index) => (
                    <div key={stage.stage} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{stage.stage}</span>
                        <span className="text-sm text-muted-foreground">
                          {stage.count.toLocaleString()} ({stage.percentage}%)
                        </span>
                      </div>
                      <Progress value={stage.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Retención de Usuarios</CardTitle>
                <CardDescription>Porcentaje de usuarios que regresan</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={retentionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="retention" stroke="#8884d8" fill="#8884d8" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Alertas y Reportes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Alertas de KPIs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                <div>
                  <p className="font-medium">Tiempo de espera alto</p>
                  <p className="text-sm text-muted-foreground">Promedio: 45 min (Meta: 30 min)</p>
                </div>
                <Badge variant="destructive">Crítico</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium">Nueva tendencia de búsqueda</p>
                  <p className="text-sm text-muted-foreground">Aumento en consultas de telemedicina</p>
                </div>
                <Badge variant="outline">Info</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              Reportes Automáticos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button onClick={() => generateReport('weekly')} variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Reporte Semanal
              </Button>
              <Button onClick={() => generateReport('monthly')} variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Reporte Mensual
              </Button>
              <Button onClick={() => generateReport('quarterly')} variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Reporte Trimestral
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
