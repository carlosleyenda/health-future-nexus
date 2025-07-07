import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, Activity, Brain, Zap, TrendingUp, AlertCircle, 
  Calendar, Clock, Target, Award, Smartphone, Wifi
} from "lucide-react";
import { LineChart, Line, AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Datos simulados de métricas de salud
const healthData = [
  { date: '01', heartRate: 72, steps: 8500, sleep: 7.2, stress: 25 },
  { date: '02', heartRate: 75, steps: 9200, sleep: 6.8, stress: 30 },
  { date: '03', heartRate: 70, steps: 10500, sleep: 8.1, stress: 15 },
  { date: '04', heartRate: 73, steps: 7800, sleep: 7.5, stress: 35 },
  { date: '05', heartRate: 71, steps: 11200, sleep: 7.8, stress: 20 },
  { date: '06', heartRate: 74, steps: 9800, sleep: 6.5, stress: 40 },
  { date: '07', heartRate: 69, steps: 12500, sleep: 8.5, stress: 10 },
];

const biometrics = {
  heartRate: { value: 72, status: 'optimal', change: '+2%' },
  bloodPressure: { value: '120/80', status: 'optimal', change: '-1%' },
  oxygenSat: { value: 98, status: 'optimal', change: '+0.5%' },
  weight: { value: 70.5, status: 'stable', change: '-0.2kg' },
  glucose: { value: 95, status: 'normal', change: '+3mg/dL' },
  temperature: { value: 36.6, status: 'normal', change: '+0.1°C' }
};

const deviceStatus = [
  { name: 'Apple Watch', status: 'connected', battery: 85, lastSync: '2 min ago' },
  { name: 'Tensiómetro Digital', status: 'connected', battery: 92, lastSync: '1 hour ago' },
  { name: 'Glucómetro', status: 'disconnected', battery: 45, lastSync: '2 days ago' },
];

export default function EnhancedHealthOverview() {
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'text-green-600 bg-green-50';
      case 'normal': return 'text-blue-600 bg-blue-50';
      case 'stable': return 'text-gray-600 bg-gray-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'critical': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Health Score Hero */}
      <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Índice de Salud General</h2>
              <p className="text-green-100 mb-4">
                Basado en tus métricas de los últimos 7 días
              </p>
              <div className="flex items-center space-x-4">
                <div className="text-4xl font-bold">92</div>
                <div>
                  <Badge className="bg-white/20 text-white border-white/30">
                    +5 puntos esta semana
                  </Badge>
                  <p className="text-sm text-green-100 mt-1">¡Excelente progreso!</p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-12 w-12 text-white" />
              </div>
              <Badge className="bg-white text-green-600">
                Estado Óptimo
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="vitals">Signos Vitales</TabsTrigger>
          <TabsTrigger value="trends">Tendencias</TabsTrigger>
          <TabsTrigger value="devices">Dispositivos</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Métricas Principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(biometrics).map(([key, metric]) => (
              <Card key={key} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium capitalize flex items-center justify-between">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                    <Badge className={`text-xs ${getStatusColor(metric.status)}`}>
                      {metric.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-2xl font-bold">{metric.value}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {metric.change} vs ayer
                      </div>
                    </div>
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Actividad Diaria */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-500" />
                  Actividad de Hoy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Pasos</span>
                    <span className="font-medium">12,500 / 10,000</span>
                  </div>
                  <Progress value={125} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Calorías Activas</span>
                    <span className="font-medium">450 / 400</span>
                  </div>
                  <Progress value={112.5} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Minutos de Ejercicio</span>
                    <span className="font-medium">35 / 30</span>
                  </div>
                  <Progress value={116} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-500" />
                  Bienestar Mental
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">Excelente</div>
                  <p className="text-sm text-gray-600">Nivel de estrés bajo</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Calidad del Sueño</span>
                    <span className="font-medium">8.5/10</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Horas de Sueño</span>
                    <span className="font-medium">8h 15min</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Nivel de Estrés</span>
                    <span className="font-medium text-green-600">Bajo</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vitals" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Frecuencia Cardíaca */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Frecuencia Cardíaca
                </CardTitle>
                <CardDescription>Últimas 24 horas</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={healthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="heartRate" 
                      stroke="#EF4444" 
                      strokeWidth={2}
                      dot={{ fill: '#EF4444' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-4 text-center">
                  <div className="text-2xl font-bold text-red-500">72 BPM</div>
                  <p className="text-sm text-gray-600">Promedio actual</p>
                </div>
              </CardContent>
            </Card>

            {/* Pasos Diarios */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-500" />
                  Actividad Física
                </CardTitle>
                <CardDescription>Pasos por día</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={healthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="steps" 
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="mt-4 text-center">
                  <div className="text-2xl font-bold text-blue-500">12,500</div>
                  <p className="text-sm text-gray-600">Pasos hoy</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tendencias de Salud (7 días)</CardTitle>
              <CardDescription>
                Evolución de tus principales métricas de salud
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={healthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="heartRate" 
                    stroke="#EF4444" 
                    name="Frecuencia Cardíaca"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sleep" 
                    stroke="#8B5CF6" 
                    name="Horas de Sueño"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="stress" 
                    stroke="#F59E0B" 
                    name="Nivel de Estrés"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deviceStatus.map((device, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-base">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5" />
                      {device.name}
                    </div>
                    <div className="flex items-center gap-1">
                      <Wifi className={`h-4 w-4 ${
                        device.status === 'connected' ? 'text-green-500' : 'text-gray-400'
                      }`} />
                      <Badge variant={device.status === 'connected' ? 'default' : 'secondary'}>
                        {device.status === 'connected' ? 'Conectado' : 'Desconectado'}
                      </Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Batería</span>
                        <span>{device.battery}%</span>
                      </div>
                      <Progress value={device.battery} className="h-2" />
                    </div>
                    
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Última sincronización</span>
                      <span>{device.lastSync}</span>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      disabled={device.status === 'connected'}
                    >
                      {device.status === 'connected' ? 'Sincronizado' : 'Conectar'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}