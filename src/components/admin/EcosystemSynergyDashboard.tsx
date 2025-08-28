import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Network,
  TrendingUp,
  Activity,
  Users,
  Building2,
  Pill,
  Hospital,
  Truck,
  Ambulance,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Zap,
  BarChart3,
  Globe,
  Shield
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface SynergyMetrics {
  connectivity: number;
  efficiency: number;
  satisfaction: number;
  responseTime: number;
}

interface EcosystemFlow {
  from: string;
  to: string;
  type: 'referral' | 'delivery' | 'emergency' | 'consultation';
  volume: number;
  status: 'healthy' | 'warning' | 'critical';
}

export default function EcosystemSynergyDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');

  const synergyMetrics: SynergyMetrics = {
    connectivity: 94,
    efficiency: 87,
    satisfaction: 92,
    responseTime: 85
  };

  const ecosystemFlows: EcosystemFlow[] = [
    {
      from: 'Doctores',
      to: 'Farmacias',
      type: 'delivery',
      volume: 456,
      status: 'healthy'
    },
    {
      from: 'Hospitales',
      to: 'Ambulancias',
      type: 'emergency',
      volume: 89,
      status: 'healthy'
    },
    {
      from: 'Pacientes',
      to: 'Doctores',
      type: 'consultation',
      volume: 234,
      status: 'warning'
    },
    {
      from: 'Doctores',
      to: 'Hospitales',
      type: 'referral',
      volume: 67,
      status: 'healthy'
    }
  ];

  const realTimeAlerts = [
    {
      id: 1,
      type: 'success',
      title: 'Farmacia Benavides conectada',
      message: 'Nueva integración completada exitosamente',
      timestamp: '2 min ago',
      entity: 'Farmacia'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Demora en entregas zona norte',
      message: 'Tiempo de respuesta 15% mayor al promedio',
      timestamp: '5 min ago',
      entity: 'Delivery'
    },
    {
      id: 3,
      type: 'info',
      title: 'Pico de demanda detectado',
      message: '40% más consultas que el promedio horario',
      timestamp: '8 min ago',
      entity: 'Sistema'
    }
  ];

  const entityPerformance = [
    {
      name: 'Hospitales',
      icon: Hospital,
      total: 15,
      active: 14,
      performance: 96,
      avgResponse: '4 min',
      status: 'excellent'
    },
    {
      name: 'Farmacias',
      icon: Pill,
      total: 45,
      active: 43,
      performance: 89,
      avgResponse: '12 min',
      status: 'good'
    },
    {
      name: 'Ambulancias',
      icon: Ambulance,
      total: 28,
      active: 26,
      performance: 94,
      avgResponse: '7 min',
      status: 'excellent'
    },
    {
      name: 'Repartidores',
      icon: Truck,
      total: 67,
      active: 58,
      performance: 82,
      avgResponse: '22 min',
      status: 'warning'
    },
    {
      name: 'Empresas',
      icon: Building2,
      total: 12,
      active: 11,
      performance: 91,
      avgResponse: '1 hr',
      status: 'good'
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      healthy: 'text-green-600 bg-green-100',
      warning: 'text-yellow-600 bg-yellow-100',
      critical: 'text-red-600 bg-red-100',
      excellent: 'text-green-600',
      good: 'text-blue-600',
      info: 'text-blue-600'
    };
    return colors[status as keyof typeof colors] || 'text-gray-600';
  };

  const getAlertIcon = (type: string) => {
    const icons = {
      success: CheckCircle,
      warning: AlertCircle,
      info: Activity
    };
    return icons[type as keyof typeof icons] || Activity;
  };

  return (
    <div className="space-y-6">
      {/* Ecosystem Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conectividad</p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold">{synergyMetrics.connectivity}%</p>
                  <Network className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <Progress value={synergyMetrics.connectivity} className="w-16 h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Eficiencia</p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold">{synergyMetrics.efficiency}%</p>
                  <Zap className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <Progress value={synergyMetrics.efficiency} className="w-16 h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Satisfacción</p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold">{synergyMetrics.satisfaction}%</p>
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <Progress value={synergyMetrics.satisfaction} className="w-16 h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tiempo Resp.</p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold">{synergyMetrics.responseTime}%</p>
                  <Clock className="h-5 w-5 text-orange-600" />
                </div>
              </div>
              <Progress value={synergyMetrics.responseTime} className="w-16 h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ecosystem Flows */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Flujos del Ecosistema en Tiempo Real
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {ecosystemFlows.map((flow, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{flow.from}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{flow.to}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className={getStatusColor(flow.status)}>
                    {flow.volume}
                  </Badge>
                  <div className={`w-2 h-2 rounded-full ${
                    flow.status === 'healthy' ? 'bg-green-500' : 
                    flow.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Real-time Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Alertas en Tiempo Real
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {realTimeAlerts.map((alert) => {
              const IconComponent = getAlertIcon(alert.type);
              return (
                <div key={alert.id} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                  <IconComponent className={`h-5 w-5 mt-0.5 ${getStatusColor(alert.type)}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{alert.title}</p>
                    <p className="text-xs text-muted-foreground">{alert.message}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {alert.entity}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Entity Performance Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Rendimiento por Entidad
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {entityPerformance.map((entity) => {
              const IconComponent = entity.icon;
              return (
                <div key={entity.name} className="p-4 bg-muted/50 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <IconComponent className="h-5 w-5 text-primary" />
                      <span className="font-medium text-sm">{entity.name}</span>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      entity.status === 'excellent' ? 'bg-green-500' :
                      entity.status === 'good' ? 'bg-blue-500' :
                      entity.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Activos</span>
                      <span>{entity.active}/{entity.total}</span>
                    </div>
                    <Progress value={(entity.active / entity.total) * 100} className="h-2" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Rendimiento</span>
                      <span className={getStatusColor(entity.status)}>{entity.performance}%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Tiempo Resp.</span>
                      <span>{entity.avgResponse}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions for Ecosystem Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Acciones Rápidas de Coordinación
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto flex-col py-6">
              <Globe className="h-8 w-8 mb-2 text-blue-600" />
              <span className="text-sm">Sincronizar Inventarios</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-6">
              <Network className="h-8 w-8 mb-2 text-green-600" />
              <span className="text-sm">Optimizar Rutas</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-6">
              <Activity className="h-8 w-8 mb-2 text-purple-600" />
              <span className="text-sm">Balancear Carga</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-6">
              <AlertCircle className="h-8 w-8 mb-2 text-red-600" />
              <span className="text-sm">Protocolo Emergencia</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}