
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { 
  Pill, 
  Brain, 
  Smartphone, 
  AlertTriangle, 
  CheckCircle,
  TrendingUp,
  Heart,
  Clock,
  Users,
  Shield,
  Wifi,
  WifiOff,
  Battery,
  MapPin,
  Camera,
  Bell,
  Star,
  Target,
  Activity
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import AdherenceMonitoring from './AdherenceMonitoring';
import DrugSafetyMonitoring from './DrugSafetyMonitoring';
import SmartPackagingPanel from './SmartPackagingPanel';
import IoTDeviceManager from './IoTDeviceManager';

export default function IntelligentMedicationDashboard() {
  const { user } = useAuthStore();
  const [adherenceScore, setAdherenceScore] = useState(87);
  const [activeMedications, setActiveMedications] = useState(5);
  const [smartDevices, setSmartDevices] = useState(3);
  const [aiInsights, setAiInsights] = useState(12);

  // Mock data for charts
  const adherenceData = [
    { date: '2024-06-01', score: 85 },
    { date: '2024-06-02', score: 92 },
    { date: '2024-06-03', score: 78 },
    { date: '2024-06-04', score: 95 },
    { date: '2024-06-05', score: 88 },
    { date: '2024-06-06', score: 91 },
    { date: '2024-06-07', score: 87 },
  ];

  const medicationEffectiveness = [
    { medication: 'Metformina', effectiveness: 92 },
    { medication: 'Lisinopril', effectiveness: 88 },
    { medication: 'Simvastatina', effectiveness: 85 },
    { medication: 'Omeprazol', effectiveness: 90 },
    { medication: 'Vitamina D', effectiveness: 82 },
  ];

  const sideEffectDistribution = [
    { name: 'Leves', value: 65, color: '#10b981' },
    { name: 'Moderados', value: 25, color: '#f59e0b' },
    { name: 'Severos', value: 8, color: '#ef4444' },
    { name: 'Sin efectos', value: 2, color: '#6b7280' },
  ];

  const getAdherenceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAdherenceLabel = (score: number) => {
    if (score >= 90) return 'Excelente';
    if (score >= 75) return 'Buena';
    return 'Necesita Mejora';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Medication Intelligence Platform</h1>
          <p className="text-muted-foreground">Gestión inteligente de medicamentos con IA y IoT</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Adherencia General</div>
          <div className={`text-3xl font-bold ${getAdherenceColor(adherenceScore)}`}>
            {adherenceScore}%
          </div>
          <div className={`text-sm font-medium ${getAdherenceColor(adherenceScore)}`}>
            {getAdherenceLabel(adherenceScore)}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medicamentos Activos</CardTitle>
            <Pill className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeMedications}</div>
            <p className="text-xs text-muted-foreground">2 próximos a vencer</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dispositivos IoT</CardTitle>
            <Smartphone className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{smartDevices}</div>
            <p className="text-xs text-muted-foreground">Todos conectados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Insights de IA</CardTitle>
            <Brain className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{aiInsights}</div>
            <p className="text-xs text-muted-foreground">3 críticos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas Activas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">1 requiere acción</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Alert */}
      <Alert className="border-l-4 border-l-purple-500">
        <Brain className="h-4 w-4" />
        <AlertDescription>
          <strong>IA detectó:</strong> Riesgo de interacción entre Metformina y nuevo suplemento. 
          Se recomienda consulta médica antes de continuar.
        </AlertDescription>
      </Alert>

      {/* Main Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="adherence">Adherencia</TabsTrigger>
          <TabsTrigger value="safety">Seguridad</TabsTrigger>
          <TabsTrigger value="intelligence">IA</TabsTrigger>
          <TabsTrigger value="iot">Dispositivos</TabsTrigger>
          <TabsTrigger value="packaging">Packaging</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Adherence Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Tendencia de Adherencia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={adherenceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString('es-MX', { month: 'short', day: 'numeric' })} />
                    <YAxis domain={[60, 100]} />
                    <Tooltip 
                      labelFormatter={(value) => new Date(value).toLocaleDateString('es-MX')}
                      formatter={(value) => [`${value}%`, 'Adherencia']}
                    />
                    <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Medication Effectiveness */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Efectividad por Medicamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={medicationEffectiveness} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="medication" type="category" width={80} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Efectividad']} />
                    <Bar dataKey="effectiveness" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Side Effects Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Distribución de Efectos Secundarios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={sideEffectDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {sideEffectDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Porcentaje']} />
                  </PieChart>
                </ResponsiveContainer>
                
                <div className="space-y-4">
                  {sideEffectDistribution.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <span className="text-lg font-bold">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Smart Devices Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Estado de Dispositivos Inteligentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Pill className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">Dispensador Principal</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Wifi className="h-4 w-4 text-green-500" />
                      <Battery className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Batería:</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Último sync:</span>
                      <span className="text-green-600">Hace 2 min</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-red-500" />
                      <span className="font-medium">Monitor de Signos</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Wifi className="h-4 w-4 text-green-500" />
                      <Battery className="h-4 w-4 text-yellow-500" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Batería:</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Último sync:</span>
                      <span className="text-green-600">Hace 5 min</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Camera className="h-5 w-5 text-purple-500" />
                      <span className="font-medium">Cámara de Adherencia</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <WifiOff className="h-4 w-4 text-red-500" />
                      <Battery className="h-4 w-4 text-red-500" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Batería:</span>
                      <span className="font-medium text-red-600">12%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Último sync:</span>
                      <span className="text-red-600">Hace 2 hrs</span>
                    </div>
                    <Progress value={12} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="adherence">
          <AdherenceMonitoring patientId={user?.id || ''} />
        </TabsContent>

        <TabsContent value="safety">
          <DrugSafetyMonitoring patientId={user?.id || ''} />
        </TabsContent>

        <TabsContent value="intelligence">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Inteligencia Artificial Médica
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* AI Predictions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-l-4 border-l-purple-500">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="h-4 w-4 text-purple-500" />
                        <span className="font-medium">Predicción de Adherencia</span>
                      </div>
                      <div className="text-2xl font-bold text-purple-600">92%</div>
                      <p className="text-sm text-gray-600">Probabilidad de adherencia próximos 7 días</p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-green-500">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="font-medium">Optimización de Dosis</span>
                      </div>
                      <div className="text-lg font-bold text-green-600">Metformina -10%</div>
                      <p className="text-sm text-gray-600">Reducción sugerida basada en biomarkers</p>
                    </CardContent>
                  </Card>
                </div>

                {/* AI Recommendations */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Recomendaciones de IA</h3>
                  
                  <Alert className="border-l-4 border-l-blue-500">
                    <Brain className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Optimización Terapéutica:</strong> Los datos indican que cambiar la hora de administración de Lisinopril a la mañana podría mejorar el control de presión arterial en un 15%.
                    </AlertDescription>
                  </Alert>

                  <Alert className="border-l-4 border-l-yellow-500">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Monitoreo Requerido:</strong> El análisis predictivo sugiere realizar pruebas de función renal en 2 semanas debido al patrón de medicamentos nefrotóxicos.
                    </AlertDescription>
                  </Alert>

                  <Alert className="border-l-4 border-l-green-500">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Oportunidad de Ahorro:</strong> Cambio a genérico de Simvastatina podría ahorrar $45/mes manteniendo la misma efectividad (confianza: 94%).
                    </AlertDescription>
                  </Alert>
                </div>

                {/* Predictive Analytics */}
                <Card>
                  <CardHeader>
                    <CardTitle>Análisis Predictivo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">78%</div>
                        <div className="text-sm">Probabilidad de efectos secundarios leves</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">94%</div>
                        <div className="text-sm">Efectividad esperada del tratamiento</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">7 días</div>
                        <div className="text-sm">Tiempo estimado para ver mejoras</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="iot">
          <IoTDeviceManager patientId={user?.id || ''} />
        </TabsContent>

        <TabsContent value="packaging">
          <SmartPackagingPanel patientId={user?.id || ''} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
