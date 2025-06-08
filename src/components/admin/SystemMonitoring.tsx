
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Server, 
  Database, 
  Wifi, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw,
  Monitor,
  HardDrive,
  Cpu,
  Activity,
  Globe,
  Lock
} from 'lucide-react';

interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  threshold: number;
}

export default function SystemMonitoring() {
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const systemMetrics: SystemMetric[] = [
    { name: 'CPU Usage', value: 68, unit: '%', status: 'good', threshold: 80 },
    { name: 'Memory Usage', value: 72, unit: '%', status: 'good', threshold: 85 },
    { name: 'Disk Usage', value: 45, unit: '%', status: 'good', threshold: 90 },
    { name: 'Network I/O', value: 23, unit: 'MB/s', status: 'good', threshold: 100 },
  ];

  const serviceStatus = [
    { name: 'API Gateway', status: 'online', uptime: '99.98%', lastCheck: '2 min ago' },
    { name: 'Database Primary', status: 'online', uptime: '99.95%', lastCheck: '1 min ago' },
    { name: 'Database Replica', status: 'online', uptime: '99.92%', lastCheck: '3 min ago' },
    { name: 'File Storage', status: 'online', uptime: '99.99%', lastCheck: '1 min ago' },
    { name: 'Email Service', status: 'warning', uptime: '98.50%', lastCheck: '5 min ago' },
    { name: 'SMS Service', status: 'online', uptime: '99.89%', lastCheck: '2 min ago' },
    { name: 'Video Calls', status: 'online', uptime: '99.95%', lastCheck: '1 min ago' },
    { name: 'AI Assistant', status: 'online', uptime: '99.80%', lastCheck: '4 min ago' },
  ];

  const securityMetrics = [
    { name: 'Failed Login Attempts', value: 23, status: 'warning' },
    { name: 'Blocked IPs', value: 5, status: 'good' },
    { name: 'SSL Certificate', value: 45, status: 'good', unit: 'days until expiry' },
    { name: 'Active Sessions', value: 234, status: 'good' },
  ];

  const performanceMetrics = [
    { name: 'Average Response Time', value: 245, unit: 'ms', status: 'good' },
    { name: 'Requests per Minute', value: 1250, unit: 'rpm', status: 'good' },
    { name: 'Error Rate', value: 0.02, unit: '%', status: 'good' },
    { name: 'Cache Hit Rate', value: 94.5, unit: '%', status: 'good' },
  ];

  const refreshMetrics = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLastUpdate(new Date());
    setIsRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
      case 'good':
        return 'text-green-600 bg-green-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'critical':
      case 'offline':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
      case 'good':
        return <CheckCircle className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'critical':
      case 'offline':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Monitoreo del Sistema</h2>
          <p className="text-gray-600">
            Última actualización: {lastUpdate.toLocaleTimeString()}
          </p>
        </div>
        <Button onClick={refreshMetrics} disabled={isRefreshing} className="gap-2">
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Actualizar Métricas
        </Button>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {metric.name.includes('CPU') && <Cpu className="h-5 w-5 text-blue-600" />}
                  {metric.name.includes('Memory') && <Monitor className="h-5 w-5 text-green-600" />}
                  {metric.name.includes('Disk') && <HardDrive className="h-5 w-5 text-purple-600" />}
                  {metric.name.includes('Network') && <Wifi className="h-5 w-5 text-orange-600" />}
                  <span className="text-sm font-medium text-gray-600">{metric.name}</span>
                </div>
                <Badge className={getStatusColor(metric.status)}>
                  {getStatusIcon(metric.status)}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">{metric.value}</span>
                  <span className="text-sm text-gray-500">{metric.unit}</span>
                </div>
                <Progress 
                  value={metric.value} 
                  className="h-2"
                />
                <p className="text-xs text-gray-500">
                  Umbral: {metric.threshold}{metric.unit}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Service Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            Estado de Servicios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {serviceStatus.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(service.status)}>
                    {getStatusIcon(service.status)}
                  </Badge>
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-gray-500">Uptime: {service.uptime}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{service.lastCheck}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Métricas de Seguridad
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {securityMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Lock className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{metric.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">{metric.value}</span>
                  {metric.unit && <span className="text-sm text-gray-500">{metric.unit}</span>}
                  <Badge className={getStatusColor(metric.status)} size="sm">
                    {getStatusIcon(metric.status)}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Métricas de Rendimiento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{metric.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">{metric.value}</span>
                  <span className="text-sm text-gray-500">{metric.unit}</span>
                  <Badge className={getStatusColor(metric.status)} size="sm">
                    {getStatusIcon(metric.status)}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* System Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Alertas del Sistema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div className="flex-1">
                <p className="font-medium text-yellow-800">Servicio de Email con latencia alta</p>
                <p className="text-sm text-yellow-600">Se detectó una latencia promedio de 2.5s en el servicio de email</p>
              </div>
              <span className="text-xs text-yellow-600">hace 15 min</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <p className="font-medium text-blue-800">Mantenimiento programado completado</p>
                <p className="text-sm text-blue-600">Actualización de seguridad aplicada exitosamente</p>
              </div>
              <span className="text-xs text-blue-600">hace 1 hora</span>
            </div>

            <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div className="flex-1">
                <p className="font-medium text-green-800">Backup automático completado</p>
                <p className="text-sm text-green-600">Respaldo de base de datos realizado correctamente</p>
              </div>
              <span className="text-xs text-green-600">hace 3 horas</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
