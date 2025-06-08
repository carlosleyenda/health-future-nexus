
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserPlus, Settings, FileText, Database, TrendingUp, AlertTriangle, Activity, BarChart3, Monitor } from "lucide-react";
import UserManagement from '@/components/admin/UserManagement';
import SystemConfiguration from '@/components/admin/SystemConfiguration';
import { ReportsGenerator } from '@/components/admin/ReportsGenerator';
import { DatabaseManagement } from '@/components/admin/DatabaseManagement';
import AdvancedAnalytics from '@/components/admin/AdvancedAnalytics';
import SystemMonitoring from '@/components/admin/SystemMonitoring';

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState<'dashboard' | 'users' | 'config' | 'reports' | 'database' | 'analytics' | 'monitoring'>('dashboard');

  const stats = [
    {
      title: 'Usuarios Totales',
      value: '2,847',
      change: '+12%',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Citas Hoy',
      value: '156',
      change: '+8%',
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Ingresos Mensuales',
      value: '$45,230',
      change: '+15%',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Alertas Activas',
      value: '7',
      change: '-3%',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'users':
        return <UserManagement />;
      case 'config':
        return <SystemConfiguration />;
      case 'reports':
        return <ReportsGenerator />;
      case 'database':
        return <DatabaseManagement />;
      case 'analytics':
        return <AdvancedAnalytics />;
      case 'monitoring':
        return <SystemMonitoring />;
      default:
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {stat.change} desde el mes pasado
                        </p>
                      </div>
                      <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                  <Button 
                    onClick={() => setActiveView('users')} 
                    variant="outline" 
                    className="h-auto flex-col py-6 hover:bg-blue-50 border-blue-200"
                  >
                    <UserPlus className="h-8 w-8 mb-2 text-blue-600" />
                    <span className="text-sm font-medium">Gestionar Usuarios</span>
                  </Button>
                  <Button 
                    onClick={() => setActiveView('analytics')} 
                    variant="outline" 
                    className="h-auto flex-col py-6 hover:bg-green-50 border-green-200"
                  >
                    <BarChart3 className="h-8 w-8 mb-2 text-green-600" />
                    <span className="text-sm font-medium">Analytics Avanzados</span>
                  </Button>
                  <Button 
                    onClick={() => setActiveView('monitoring')} 
                    variant="outline" 
                    className="h-auto flex-col py-6 hover:bg-purple-50 border-purple-200"
                  >
                    <Monitor className="h-8 w-8 mb-2 text-purple-600" />
                    <span className="text-sm font-medium">Monitoreo</span>
                  </Button>
                  <Button 
                    onClick={() => setActiveView('config')} 
                    variant="outline" 
                    className="h-auto flex-col py-6 hover:bg-orange-50 border-orange-200"
                  >
                    <Settings className="h-8 w-8 mb-2 text-orange-600" />
                    <span className="text-sm font-medium">Configuración</span>
                  </Button>
                  <Button 
                    onClick={() => setActiveView('reports')} 
                    variant="outline" 
                    className="h-auto flex-col py-6 hover:bg-indigo-50 border-indigo-200"
                  >
                    <FileText className="h-8 w-8 mb-2 text-indigo-600" />
                    <span className="text-sm font-medium">Generar Reportes</span>
                  </Button>
                  <Button 
                    onClick={() => setActiveView('database')} 
                    variant="outline" 
                    className="h-auto flex-col py-6 hover:bg-red-50 border-red-200"
                  >
                    <Database className="h-8 w-8 mb-2 text-red-600" />
                    <span className="text-sm font-medium">Base de Datos</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { 
                      action: 'Nuevo usuario registrado', 
                      user: 'Dr. Ana García', 
                      time: 'Hace 2 minutos',
                      type: 'user',
                      status: 'success'
                    },
                    { 
                      action: 'Cita programada', 
                      user: 'Juan Pérez', 
                      time: 'Hace 5 minutos',
                      type: 'appointment',
                      status: 'info'
                    },
                    { 
                      action: 'Pago procesado', 
                      user: 'María López', 
                      time: 'Hace 10 minutos',
                      type: 'payment',
                      status: 'success'
                    },
                    { 
                      action: 'Sistema optimizado', 
                      user: 'Sistema', 
                      time: 'Hace 1 hora',
                      type: 'system',
                      status: 'info'
                    },
                    { 
                      action: 'Alerta de seguridad', 
                      user: 'Sistema', 
                      time: 'Hace 2 horas',
                      type: 'security',
                      status: 'warning'
                    }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-3 px-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.status === 'success' ? 'bg-green-500' :
                          activity.status === 'warning' ? 'bg-yellow-500' :
                          activity.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
                        }`}></div>
                        <div>
                          <p className="font-medium text-gray-900">{activity.action}</p>
                          <p className="text-sm text-gray-500">{activity.user}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Status Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="h-5 w-5" />
                    Estado del Sistema
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Gateway</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600">Online</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Base de Datos</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600">Online</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Servicio de Email</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm text-yellow-600">Latencia Alta</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Videollamadas</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600">Online</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Métricas Clave
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Tiempo de Respuesta</span>
                    <span className="text-sm font-medium">245ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Uso de CPU</span>
                    <span className="text-sm font-medium">68%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Uso de Memoria</span>
                    <span className="text-sm font-medium">72%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Tasa de Error</span>
                    <span className="text-sm font-medium text-green-600">0.02%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Panel de Administración</h1>
          <p className="text-muted-foreground">Gestiona la plataforma y sus usuarios</p>
        </div>
        {activeView !== 'dashboard' && (
          <Button onClick={() => setActiveView('dashboard')} variant="outline">
            Volver al Dashboard
          </Button>
        )}
      </div>

      {renderContent()}
    </div>
  );
}
