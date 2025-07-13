import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthStore } from '@/store/auth';
import { 
  Users, 
  DollarSign, 
  Activity, 
  Calendar,
  TrendingUp,
  TrendingDown,
  Clock,
  Heart,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';

interface Metric {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  description: string;
  icon: React.ReactNode;
  color: string;
}

export default function MetricsDashboard() {
  const { profile } = useAuthStore();
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    generateMetrics();
    
    // Auto-refresh every 10 seconds for demo
    const interval = setInterval(() => {
      generateMetrics();
    }, 10000);

    return () => clearInterval(interval);
  }, [profile]);

  const generateMetrics = () => {
    setLoading(true);
    
    // Simulate real-time data based on user role
    const baseMetrics = {
      patient: [
        {
          id: 'appointments',
          title: 'Citas Programadas',
          value: Math.floor(Math.random() * 10) + 5,
          change: Math.random() * 20 - 10,
          changeType: Math.random() > 0.5 ? 'increase' : 'decrease',
          description: 'Próximas citas médicas',
          icon: <Calendar className="h-4 w-4" />,
          color: 'text-blue-600'
        },
        {
          id: 'health_score',
          title: 'Puntuación de Salud',
          value: `${Math.floor(Math.random() * 20) + 80}%`,
          change: Math.random() * 10 - 5,
          changeType: Math.random() > 0.3 ? 'increase' : 'decrease',
          description: 'Indicador general de salud',
          icon: <Heart className="h-4 w-4" />,
          color: 'text-green-600'
        },
        {
          id: 'medications',
          title: 'Medicamentos Activos',
          value: Math.floor(Math.random() * 5) + 2,
          change: Math.random() * 4 - 2,
          changeType: 'neutral',
          description: 'Tratamientos en curso',
          icon: <Activity className="h-4 w-4" />,
          color: 'text-purple-600'
        },
        {
          id: 'spending',
          title: 'Gasto Mensual',
          value: `$${(Math.random() * 2000 + 1000).toFixed(0)} MXN`,
          change: Math.random() * 30 - 15,
          changeType: Math.random() > 0.4 ? 'increase' : 'decrease',
          description: 'Gastos médicos del mes',
          icon: <DollarSign className="h-4 w-4" />,
          color: 'text-orange-600'
        }
      ],
      doctor: [
        {
          id: 'patients',
          title: 'Pacientes Activos',
          value: Math.floor(Math.random() * 50) + 100,
          change: Math.random() * 20 - 10,
          changeType: Math.random() > 0.4 ? 'increase' : 'decrease',
          description: 'Pacientes bajo tratamiento',
          icon: <Users className="h-4 w-4" />,
          color: 'text-blue-600'
        },
        {
          id: 'consultations',
          title: 'Consultas Hoy',
          value: Math.floor(Math.random() * 15) + 5,
          change: Math.random() * 10 - 5,
          changeType: Math.random() > 0.5 ? 'increase' : 'decrease',
          description: 'Consultas programadas hoy',
          icon: <Calendar className="h-4 w-4" />,
          color: 'text-green-600'
        },
        {
          id: 'revenue',
          title: 'Ingresos Mensuales',
          value: `$${(Math.random() * 20000 + 30000).toFixed(0)} MXN`,
          change: Math.random() * 25 - 12.5,
          changeType: Math.random() > 0.3 ? 'increase' : 'decrease',
          description: 'Ingresos del mes actual',
          icon: <DollarSign className="h-4 w-4" />,
          color: 'text-purple-600'
        },
        {
          id: 'satisfaction',
          title: 'Satisfacción',
          value: `${(Math.random() * 10 + 85).toFixed(1)}%`,
          change: Math.random() * 5 - 2.5,
          changeType: Math.random() > 0.2 ? 'increase' : 'decrease',
          description: 'Calificación promedio',
          icon: <Heart className="h-4 w-4" />,
          color: 'text-pink-600'
        }
      ],
      admin: [
        {
          id: 'total_users',
          title: 'Usuarios Totales',
          value: Math.floor(Math.random() * 1000) + 5000,
          change: Math.random() * 15 - 7.5,
          changeType: Math.random() > 0.2 ? 'increase' : 'decrease',
          description: 'Usuarios registrados',
          icon: <Users className="h-4 w-4" />,
          color: 'text-blue-600'
        },
        {
          id: 'revenue',
          title: 'Ingresos Mensuales',
          value: `$${(Math.random() * 100000 + 200000).toFixed(0)} MXN`,
          change: Math.random() * 20 - 10,
          changeType: Math.random() > 0.3 ? 'increase' : 'decrease',
          description: 'Ingresos totales del mes',
          icon: <DollarSign className="h-4 w-4" />,
          color: 'text-green-600'
        },
        {
          id: 'active_sessions',
          title: 'Sesiones Activas',
          value: Math.floor(Math.random() * 200) + 300,
          change: Math.random() * 30 - 15,
          changeType: Math.random() > 0.4 ? 'increase' : 'decrease',
          description: 'Usuarios conectados ahora',
          icon: <Activity className="h-4 w-4" />,
          color: 'text-purple-600'
        },
        {
          id: 'alerts',
          title: 'Alertas Activas',
          value: Math.floor(Math.random() * 10) + 2,
          change: Math.random() * 8 - 4,
          changeType: Math.random() > 0.6 ? 'increase' : 'decrease',
          description: 'Alertas del sistema',
          icon: <AlertTriangle className="h-4 w-4" />,
          color: 'text-red-600'
        }
      ]
    };

    const userRole = profile?.role || 'patient';
    const roleMetrics = baseMetrics[userRole as keyof typeof baseMetrics] || baseMetrics.patient;
    
    setMetrics(roleMetrics as Metric[]);
    setLastUpdate(new Date());
    setLoading(false);
  };

  const formatChange = (change: number, type: string) => {
    const isPositive = change > 0;
    const isNegative = change < 0;
    
    if (type === 'neutral' || Math.abs(change) < 0.1) {
      return { color: 'text-gray-600', icon: null, text: 'Sin cambios' };
    }
    
    return {
      color: isPositive ? 'text-green-600' : 'text-red-600',
      icon: isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />,
      text: `${isPositive ? '+' : ''}${change.toFixed(1)}%`
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Dashboard de Métricas</h2>
          <p className="text-muted-foreground">
            Seguimiento en tiempo real - Actualizado: {lastUpdate.toLocaleTimeString()}
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={generateMetrics}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Actualizar
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="realtime">Tiempo Real</TabsTrigger>
          <TabsTrigger value="trends">Tendencias</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric) => {
              const changeInfo = formatChange(metric.change, metric.changeType);
              
              return (
                <Card key={metric.id} className="transition-all duration-200 hover:shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {metric.title}
                    </CardTitle>
                    <div className={metric.color}>
                      {metric.icon}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <div className="flex items-center gap-1 text-xs">
                      <span className={changeInfo.color}>
                        {changeInfo.icon}
                      </span>
                      <span className={changeInfo.color}>
                        {changeInfo.text}
                      </span>
                      <span className="text-muted-foreground">vs mes pasado</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {metric.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="realtime" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Métricas en Tiempo Real
              </CardTitle>
              <CardDescription>
                Datos actualizados cada 10 segundos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {metrics.map((metric) => (
                  <div key={metric.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={metric.color}>
                        {metric.icon}
                      </div>
                      <div>
                        <p className="font-medium">{metric.title}</p>
                        <p className="text-sm text-muted-foreground">{metric.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Ahora</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {metrics.map((metric) => {
              const changeInfo = formatChange(metric.change, metric.changeType);
              
              return (
                <Card key={metric.id}>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <div className={metric.color}>
                        {metric.icon}
                      </div>
                      {metric.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-3xl font-bold">{metric.value}</div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={changeInfo.color.includes('green') ? 'default' : 
                                  changeInfo.color.includes('red') ? 'destructive' : 'secondary'}
                          className="text-xs"
                        >
                          {changeInfo.icon}
                          <span className="ml-1">{changeInfo.text}</span>
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Tendencia mensual
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {metric.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}