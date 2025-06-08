import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserPlus, Settings, FileText, Database, TrendingUp, AlertTriangle, Activity } from "lucide-react";
import UserManagement from '@/components/admin/UserManagement';
import SystemConfiguration from '@/components/admin/SystemConfiguration';
import { ReportsGenerator } from '@/components/admin/ReportsGenerator';
import { DatabaseManagement } from '@/components/admin/DatabaseManagement';

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState<'dashboard' | 'users' | 'config' | 'reports' | 'database'>('dashboard');

  const stats = [
    {
      title: 'Usuarios Totales',
      value: '2,847',
      change: '+12%',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Citas Hoy',
      value: '156',
      change: '+8%',
      icon: Activity,
      color: 'text-green-600'
    },
    {
      title: 'Ingresos Mensuales',
      value: '$45,230',
      change: '+15%',
      icon: TrendingUp,
      color: 'text-purple-600'
    },
    {
      title: 'Alertas Activas',
      value: '7',
      change: '-3%',
      icon: AlertTriangle,
      color: 'text-red-600'
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
      default:
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.change} desde el mes pasado</p>
                      </div>
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button 
                    onClick={() => setActiveView('users')} 
                    variant="outline" 
                    className="h-auto flex-col py-6"
                  >
                    <UserPlus className="h-8 w-8 mb-2" />
                    <span>Gestionar Usuarios</span>
                  </Button>
                  <Button 
                    onClick={() => setActiveView('config')} 
                    variant="outline" 
                    className="h-auto flex-col py-6"
                  >
                    <Settings className="h-8 w-8 mb-2" />
                    <span>Configuración</span>
                  </Button>
                  <Button 
                    onClick={() => setActiveView('reports')} 
                    variant="outline" 
                    className="h-auto flex-col py-6"
                  >
                    <FileText className="h-8 w-8 mb-2" />
                    <span>Generar Reportes</span>
                  </Button>
                  <Button 
                    onClick={() => setActiveView('database')} 
                    variant="outline" 
                    className="h-auto flex-col py-6"
                  >
                    <Database className="h-8 w-8 mb-2" />
                    <span>Base de Datos</span>
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
                    { action: 'Nuevo usuario registrado', user: 'Dr. Ana García', time: 'Hace 2 minutos' },
                    { action: 'Cita programada', user: 'Juan Pérez', time: 'Hace 5 minutos' },
                    { action: 'Pago procesado', user: 'María López', time: 'Hace 10 minutos' },
                    { action: 'Sistema optimizado', user: 'Sistema', time: 'Hace 1 hora' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.user}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
