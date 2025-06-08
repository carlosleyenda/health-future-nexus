
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, XCircle, Clock, Bell, Shield, Database, Wifi } from "lucide-react";

export default function SystemAlertsManagement() {
  const [filter, setFilter] = useState('all');

  const alerts = [
    {
      id: '1',
      type: 'security',
      severity: 'high',
      title: 'Intento de acceso no autorizado',
      description: 'Se detectaron múltiples intentos de login fallidos desde IP 192.168.1.100',
      timestamp: '2024-01-15 14:30:25',
      status: 'active',
      affected: 'Sistema de Autenticación'
    },
    {
      id: '2',
      type: 'system',
      severity: 'medium',
      title: 'Alto uso de CPU en servidor',
      description: 'El servidor web está utilizando 85% de CPU durante los últimos 30 minutos',
      timestamp: '2024-01-15 14:15:10',
      status: 'investigating',
      affected: 'Servidor Web Principal'
    },
    {
      id: '3',
      type: 'database',
      severity: 'low',
      title: 'Consulta lenta detectada',
      description: 'Query en tabla de pacientes tomó 3.2 segundos en ejecutarse',
      timestamp: '2024-01-15 13:45:00',
      status: 'resolved',
      affected: 'Base de Datos'
    },
    {
      id: '4',
      type: 'network',
      severity: 'critical',
      title: 'Pérdida de conectividad',
      description: 'El servicio de videollamadas perdió conexión por 2 minutos',
      timestamp: '2024-01-15 12:20:15',
      status: 'resolved',
      affected: 'Servicio de Videollamadas'
    }
  ];

  const getSeverityBadge = (severity: string) => {
    const colors = {
      low: 'bg-blue-100 text-blue-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800'
    };
    return <Badge className={colors[severity as keyof typeof colors]}>{severity}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      active: 'bg-red-100 text-red-800',
      investigating: 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800'
    };
    const labels = {
      active: 'Activa',
      investigating: 'Investigando',
      resolved: 'Resuelta'
    };
    return <Badge className={colors[status as keyof typeof colors]}>
      {labels[status as keyof typeof labels]}
    </Badge>;
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      security: Shield,
      system: AlertTriangle,
      database: Database,
      network: Wifi
    };
    const IconComponent = icons[type as keyof typeof icons] || AlertTriangle;
    return <IconComponent className="h-5 w-5" />;
  };

  const filteredAlerts = filter === 'all' ? alerts : alerts.filter(alert => alert.status === filter);

  return (
    <div className="space-y-6">
      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Alertas Activas</p>
                <p className="text-2xl font-bold text-red-600">
                  {alerts.filter(a => a.status === 'active').length}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">En Investigación</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {alerts.filter(a => a.status === 'investigating').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Resueltas Hoy</p>
                <p className="text-2xl font-bold text-green-600">
                  {alerts.filter(a => a.status === 'resolved').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Críticas</p>
                <p className="text-2xl font-bold text-red-600">
                  {alerts.filter(a => a.severity === 'critical').length}
                </p>
              </div>
              <Bell className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Management */}
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Alertas del Sistema</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filter Buttons */}
          <div className="flex gap-2">
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilter('all')}
            >
              Todas
            </Button>
            <Button 
              variant={filter === 'active' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilter('active')}
            >
              Activas
            </Button>
            <Button 
              variant={filter === 'investigating' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilter('investigating')}
            >
              En Investigación
            </Button>
            <Button 
              variant={filter === 'resolved' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilter('resolved')}
            >
              Resueltas
            </Button>
          </div>

          {/* Alerts List */}
          <div className="space-y-3">
            {filteredAlerts.map((alert) => (
              <Card key={alert.id} className="border-l-4 border-l-red-500">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="mt-1">
                        {getTypeIcon(alert.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{alert.title}</h3>
                          {getSeverityBadge(alert.severity)}
                          {getStatusBadge(alert.status)}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>Afectado: {alert.affected}</span>
                          <span>Hora: {alert.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {alert.status === 'active' && (
                        <Button variant="outline" size="sm">
                          Investigar
                        </Button>
                      )}
                      {alert.status === 'investigating' && (
                        <Button variant="outline" size="sm">
                          Resolver
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        Ver Detalles
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
