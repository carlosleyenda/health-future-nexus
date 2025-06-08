
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, ScatterPlot, Scatter
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Users, Clock, Star, 
  MapPin, Calendar, DollarSign, AlertTriangle, Download
} from 'lucide-react';
import { MetricCard } from '@/components/ui/metric-card';

interface AnalyticsData {
  satisfaction: {
    average: number;
    trend: number;
    responses: number;
    distribution: { rating: number; count: number }[];
  };
  doctorEfficiency: {
    avgConsultationTime: number;
    doctorRatings: { name: string; rating: number; consultations: number }[];
    timeDistribution: { hour: number; consultations: number }[];
  };
  specialties: {
    demand: { specialty: string; appointments: number; growth: number }[];
    revenue: { specialty: string; revenue: number }[];
  };
  predictions: {
    hourlyDemand: { hour: number; predicted: number; actual: number }[];
    weeklyTrends: { week: string; predicted: number; confidence: number }[];
  };
  marketing: {
    roi: number;
    acquisitionCost: number;
    conversionFunnel: { stage: string; users: number; rate: number }[];
    retention: { week: number; retained: number }[];
  };
  geographic: {
    distribution: { city: string; users: number; revenue: number }[];
    growth: { region: string; growth: number }[];
  };
}

const mockAnalyticsData: AnalyticsData = {
  satisfaction: {
    average: 4.6,
    trend: 8.5,
    responses: 1247,
    distribution: [
      { rating: 5, count: 620 },
      { rating: 4, count: 380 },
      { rating: 3, count: 150 },
      { rating: 2, count: 67 },
      { rating: 1, count: 30 }
    ]
  },
  doctorEfficiency: {
    avgConsultationTime: 28.5,
    doctorRatings: [
      { name: 'Dr. García', rating: 4.8, consultations: 145 },
      { name: 'Dr. López', rating: 4.7, consultations: 128 },
      { name: 'Dr. Martínez', rating: 4.6, consultations: 112 },
      { name: 'Dr. Rodríguez', rating: 4.5, consultations: 98 }
    ],
    timeDistribution: [
      { hour: 8, consultations: 15 },
      { hour: 9, consultations: 28 },
      { hour: 10, consultations: 42 },
      { hour: 11, consultations: 38 },
      { hour: 12, consultations: 25 },
      { hour: 13, consultations: 18 },
      { hour: 14, consultations: 35 },
      { hour: 15, consultations: 45 },
      { hour: 16, consultations: 40 },
      { hour: 17, consultations: 32 },
      { hour: 18, consultations: 22 }
    ]
  },
  specialties: {
    demand: [
      { specialty: 'Medicina General', appointments: 340, growth: 15.2 },
      { specialty: 'Cardiología', appointments: 180, growth: 8.7 },
      { specialty: 'Dermatología', appointments: 165, growth: 22.1 },
      { specialty: 'Neurología', appointments: 120, growth: 12.3 },
      { specialty: 'Psicología', appointments: 95, growth: 35.6 }
    ],
    revenue: [
      { specialty: 'Cardiología', revenue: 145000 },
      { specialty: 'Neurología', revenue: 98000 },
      { specialty: 'Dermatología', revenue: 87000 },
      { specialty: 'Medicina General', revenue: 156000 },
      { specialty: 'Psicología', revenue: 65000 }
    ]
  },
  predictions: {
    hourlyDemand: [
      { hour: 8, predicted: 18, actual: 15 },
      { hour: 9, predicted: 25, actual: 28 },
      { hour: 10, predicted: 40, actual: 42 },
      { hour: 11, predicted: 35, actual: 38 },
      { hour: 12, predicted: 22, actual: 25 }
    ],
    weeklyTrends: [
      { week: 'Sem 1', predicted: 240, confidence: 85 },
      { week: 'Sem 2', predicted: 265, confidence: 78 },
      { week: 'Sem 3', predicted: 280, confidence: 72 },
      { week: 'Sem 4', predicted: 295, confidence: 68 }
    ]
  },
  marketing: {
    roi: 285,
    acquisitionCost: 45,
    conversionFunnel: [
      { stage: 'Visitantes', users: 10000, rate: 100 },
      { stage: 'Registro', users: 1200, rate: 12 },
      { stage: 'Primera Cita', users: 480, rate: 4.8 },
      { stage: 'Cliente Recurrente', users: 240, rate: 2.4 }
    ],
    retention: [
      { week: 1, retained: 100 },
      { week: 2, retained: 78 },
      { week: 4, retained: 65 },
      { week: 8, retained: 52 },
      { week: 12, retained: 45 }
    ]
  },
  geographic: {
    distribution: [
      { city: 'Ciudad de México', users: 2400, revenue: 180000 },
      { city: 'Guadalajara', users: 890, revenue: 67000 },
      { city: 'Monterrey', users: 650, revenue: 58000 },
      { city: 'Puebla', users: 420, revenue: 32000 }
    ],
    growth: [
      { region: 'Norte', growth: 18.5 },
      { region: 'Centro', growth: 12.3 },
      { region: 'Sur', growth: 25.7 },
      { region: 'Occidente', growth: 15.2 }
    ]
  }
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function AdvancedAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const { data: analytics, isLoading } = useQuery({
    queryKey: ['advanced-analytics', selectedPeriod],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      return mockAnalyticsData;
    },
  });

  if (isLoading) {
    return <div className="p-6">Cargando analytics avanzados...</div>;
  }

  if (!analytics) {
    return <div className="p-6">Error al cargar los datos.</div>;
  }

  const exportReport = (format: 'pdf' | 'excel') => {
    console.log(`Exportando reporte en formato ${format}`);
    // Simular descarga
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Analytics Avanzados</h1>
          <p className="text-muted-foreground">Análisis profundo del rendimiento</p>
        </div>
        <div className="flex gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Semanal</SelectItem>
              <SelectItem value="monthly">Mensual</SelectItem>
              <SelectItem value="quarterly">Trimestral</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => exportReport('pdf')} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar PDF
          </Button>
          <Button onClick={() => exportReport('excel')} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar Excel
          </Button>
        </div>
      </div>

      {/* KPIs Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          label="Satisfacción Promedio"
          value={`${analytics.satisfaction.average}/5`}
          icon={Star}
          trend={{ value: analytics.satisfaction.trend, isPositive: true }}
        />
        <MetricCard
          label="Tiempo Promedio de Consulta"
          value={`${analytics.doctorEfficiency.avgConsultationTime} min`}
          icon={Clock}
          trend={{ value: -5.2, isPositive: true }}
        />
        <MetricCard
          label="ROI Marketing"
          value={`${analytics.marketing.roi}%`}
          icon={DollarSign}
          trend={{ value: 15.3, isPositive: true }}
        />
        <MetricCard
          label="Costo de Adquisición"
          value={`$${analytics.marketing.acquisitionCost}`}
          icon={Users}
          trend={{ value: -12.1, isPositive: true }}
        />
      </div>

      <Tabs defaultValue="satisfaction" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="satisfaction">Satisfacción</TabsTrigger>
          <TabsTrigger value="efficiency">Eficiencia</TabsTrigger>
          <TabsTrigger value="specialties">Especialidades</TabsTrigger>
          <TabsTrigger value="predictions">Predicciones</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
          <TabsTrigger value="geographic">Geográfico</TabsTrigger>
        </TabsList>

        <TabsContent value="satisfaction" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribución de Calificaciones</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analytics.satisfaction.distribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ rating, count }) => `${rating}★ (${count})`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {analytics.satisfaction.distribution.map((entry, index) => (
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
                <CardTitle>Métricas de Satisfacción</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Promedio General</span>
                  <Badge variant="secondary">{analytics.satisfaction.average}/5</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Total de Respuestas</span>
                  <Badge variant="outline">{analytics.satisfaction.responses}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Tendencia</span>
                  <Badge variant="default" className="text-green-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{analytics.satisfaction.trend}%
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="efficiency" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Ratings de Doctores</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analytics.doctorEfficiency.doctorRatings}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[4, 5]} />
                    <Tooltip />
                    <Bar dataKey="rating" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribución de Consultas por Hora</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={analytics.doctorEfficiency.timeDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="consultations" stroke="#8884d8" fill="#8884d8" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="specialties" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Demanda por Especialidad</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analytics.specialties.demand}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="specialty" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="appointments" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ingresos por Especialidad</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analytics.specialties.revenue}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="revenue"
                      label={({ specialty, revenue }) => `${specialty}: $${(revenue/1000).toFixed(0)}k`}
                    >
                      {analytics.specialties.revenue.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${(Number(value)/1000).toFixed(0)}k`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Predicción de Demanda por Hora</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analytics.predictions.hourlyDemand}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="predicted" stroke="#8884d8" name="Predicho" />
                    <Line type="monotone" dataKey="actual" stroke="#82ca9d" name="Real" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tendencias Semanales</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analytics.predictions.weeklyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="predicted" fill="#8884d8" />
                    <Bar dataKey="confidence" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="marketing" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Funnel de Conversión</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analytics.marketing.conversionFunnel}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="stage" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="users" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Retención de Usuarios</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analytics.marketing.retention}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="retained" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="geographic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribución Geográfica</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analytics.geographic.distribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="city" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="users" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Crecimiento por Región</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analytics.geographic.growth}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="growth"
                      label={({ region, growth }) => `${region}: ${growth}%`}
                    >
                      {analytics.geographic.growth.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Alertas y Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Insights y Alertas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <span>La especialidad de Psicología muestra un crecimiento del 35.6% - considerar aumentar capacidad</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span>La satisfacción del paciente ha mejorado 8.5% este mes</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <MapPin className="h-4 w-4 text-blue-600" />
              <span>La región Sur muestra el mayor crecimiento (25.7%) - oportunidad de expansión</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
