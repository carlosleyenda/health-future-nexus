
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserPlus, Settings, FileText, Database, TrendingUp, AlertTriangle, Activity, BarChart3, Monitor, Globe, Bot, Shield, Smartphone, TestTube, Calendar, Package, Stethoscope, Bell } from "lucide-react";
import UserManagement from '@/components/admin/UserManagement';
import DoctorManagement from '@/components/admin/DoctorManagement';
import PatientManagement from '@/components/admin/PatientManagement';
import AppointmentManagement from '@/components/admin/AppointmentManagement';
import InventoryManagement from '@/components/admin/InventoryManagement';
import SystemAlertsManagement from '@/components/admin/SystemAlertsManagement';
import SystemConfiguration from '@/components/admin/SystemConfiguration';
import { ReportsGenerator } from '@/components/admin/ReportsGenerator';
import { DatabaseManagement } from '@/components/admin/DatabaseManagement';
import AdvancedAnalytics from '@/components/admin/AdvancedAnalytics';
import SystemMonitoring from '@/components/admin/SystemMonitoring';
import ExecutiveDashboard from '@/components/analytics/ExecutiveDashboard';
import GlobalHealthcareDashboard from '@/components/global-marketplace/GlobalHealthcareDashboard';
import AutomationDashboard from '@/components/automation/AutomationDashboard';
import QualityAssuranceDashboard from '@/components/testing/QualityAssuranceDashboard';
import ComplianceDashboard from '@/components/compliance/ComplianceDashboard';
import IoTDashboard from '@/components/iot/IoTDashboard';
import EcosystemManagement from '@/components/admin/EcosystemManagement';
import EcosystemSynergyDashboard from '@/components/admin/EcosystemSynergyDashboard';

type AdminView = 'dashboard' | 'users' | 'doctors' | 'patients' | 'appointments' | 'inventory' | 'alerts' | 'config' | 'reports' | 'database' | 'analytics' | 'monitoring' | 'executive' | 'global' | 'automation' | 'qa' | 'compliance' | 'iot' | 'ecosystem' | 'synergy';

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState<AdminView>('dashboard');

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
      case 'doctors':
        return <DoctorManagement />;
      case 'patients':
        return <PatientManagement />;
      case 'appointments':
        return <AppointmentManagement />;
      case 'inventory':
        return <InventoryManagement />;
      case 'alerts':
        return <SystemAlertsManagement />;
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
      case 'executive':
        return <ExecutiveDashboard />;
      case 'global':
        return <GlobalHealthcareDashboard />;
      case 'automation':
        return <AutomationDashboard />;
      case 'qa':
        return <QualityAssuranceDashboard />;
      case 'compliance':
        return <ComplianceDashboard organizationId="org-1" />;
      case 'iot':
        return <IoTDashboard patientId="patient-1" />;
      case 'ecosystem':
        return <EcosystemManagement />;
      case 'synergy':
        return <EcosystemSynergyDashboard />;
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

            {/* Gestión Principal */}
            <Card>
              <CardHeader>
                <CardTitle>Gestión Principal del Ecosistema</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button 
                    onClick={() => setActiveView('users')} 
                    variant="outline" 
                    className="h-auto flex-col py-6 hover:bg-blue-50 border-blue-200"
                  >
                    <UserPlus className="h-8 w-8 mb-2 text-blue-600" />
                    <span className="text-sm font-medium">Gestionar Usuarios</span>
                  </Button>
                  <Button 
                    onClick={() => setActiveView('doctors')} 
                    variant="outline" 
                    className="h-auto flex-col py-6 hover:bg-green-50 border-green-200"
                  >
                    <Stethoscope className="h-8 w-8 mb-2 text-green-600" />
                    <span className="text-sm font-medium">Gestionar Médicos</span>
                  </Button>
                  <Button 
                    onClick={() => setActiveView('patients')} 
                    variant="outline" 
                    className="h-auto flex-col py-6 hover:bg-purple-50 border-purple-200"
                  >
                    <Users className="h-8 w-8 mb-2 text-purple-600" />
                    <span className="text-sm font-medium">Gestionar Pacientes</span>
                  </Button>
                  <Button 
                    onClick={() => setActiveView('appointments')} 
                    variant="outline" 
                    className="h-auto flex-col py-6 hover:bg-orange-50 border-orange-200"
                  >
                    <Calendar className="h-8 w-8 mb-2 text-orange-600" />
                    <span className="text-sm font-medium">Gestionar Citas</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Gestión del Ecosistema Completo */}
            <Card>
              <CardHeader>
                <CardTitle>Ecosistema Completo - Sinergia Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    onClick={() => setActiveView('ecosystem')} 
                    variant="outline" 
                    className="h-auto flex-col py-6 hover:bg-emerald-50 border-emerald-200"
                  >
                    <Globe className="h-8 w-8 mb-2 text-emerald-600" />
                    <span className="text-sm font-medium">Gestión Completa del Ecosistema</span>
                    <span className="text-xs text-muted-foreground mt-1">Empresas • Farmacias • Hospitales • Delivery • Ambulancias</span>
                  </Button>
                  <Button 
                    onClick={() => setActiveView('synergy')} 
                    variant="outline" 
                    className="h-auto flex-col py-6 hover:bg-teal-50 border-teal-200"
                  >
                    <Activity className="h-8 w-8 mb-2 text-teal-600" />
                    <span className="text-sm font-medium">Coordinación y Sinergia</span>
                    <span className="text-xs text-muted-foreground mt-1">Flujos • Métricas • Optimización en Tiempo Real</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Operaciones y Recursos */}
            <Card>
              <CardHeader>
                <CardTitle>Operaciones y Recursos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button 
                    onClick={() => setActiveView('inventory')} 
                    variant="outline" 
                    className="h-auto flex-col py-6 hover:bg-indigo-50 border-indigo-200"
                  >
                    <Package className="h-8 w-8 mb-2 text-indigo-600" />
                    <span className="text-sm font-medium">Inventario</span>
                  </Button>
                  <Button 
                    onClick={() => setActiveView('alerts')} 
                    variant="outline" 
                    className="h-auto flex-col py-6 hover:bg-red-50 border-red-200"
                  >
                    <Bell className="h-8 w-8 mb-2 text-red-600" />
                    <span className="text-sm font-medium">Alertas Sistema</span>
                  </Button>
                  <Button 
                    onClick={() => setActiveView('config')} 
                    variant="outline" 
                    className="h-auto flex-col py-6 hover:bg-gray-50 border-gray-200"
                  >
                    <Settings className="h-8 w-8 mb-2 text-gray-600" />
                    <span className="text-sm font-medium">Configuración</span>
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

            {/* Analytics e Inteligencia */}
            <Card>
              <CardHeader>
                <CardTitle>Analytics e Inteligencia</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button 
                    onClick={() => setActiveView('executive')} 
                    variant="outline" 
                    className="h-auto flex-col py-6 hover:bg-purple-50 border-purple-200"
                  >
                    <TrendingUp className="h-8 w-8 mb-2 text-purple-600" />
                    <span className="text-sm font-medium">Dashboard Ejecutivo</span>
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
                    onClick={() => setActiveView('reports')} 
                    variant="outline" 
                    className="h-auto flex-col py-6 hover:bg-indigo-50 border-indigo-200"
                  >
                    <FileText className="h-8 w-8 mb-2 text-indigo-600" />
                    <span className="text-sm font-medium">Generar Reportes</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Monitoreo y Automatización */}
            <Card>
              <CardHeader>
                <CardTitle>Monitoreo y Automatización</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button 
                    onClick={() => setActiveView('monitoring')} 
                    variant="outline" 
                    className="h-auto flex-col py-6 hover:bg-purple-50 border-purple-200"
                  >
                    <Monitor className="h-8 w-8 mb-2 text-purple-600" />
                    <span className="text-sm font-medium">Monitoreo Sistema</span>
                  </Button>
                  <Button 
                    onClick={() => setActiveView('automation')} 
                    variant="outline" 
                    className="h-auto flex-col py-6 hover:bg-cyan-50 border-cyan-200"
                  >
                    <Bot className="h-8 w-8 mb-2 text-cyan-600" />
                    <span className="text-sm font-medium">Automatización</span>
                  </Button>
                  <Button 
                    onClick={() => setActiveView('iot')} 
                    variant="outline" 
                    className="h-auto flex-col py-6 hover:bg-teal-50 border-teal-200"
                  >
                    <Smartphone className="h-8 w-8 mb-2 text-teal-600" />
                    <span className="text-sm font-medium">Dispositivos IoT</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Global y Cumplimiento */}
            <Card>
              <CardHeader>
                <CardTitle>Global y Cumplimiento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button 
                    onClick={() => setActiveView('global')} 
                    variant="outline" 
                    className="h-auto flex-col py-6 hover:bg-emerald-50 border-emerald-200"
                  >
                    <Globe className="h-8 w-8 mb-2 text-emerald-600" />
                    <span className="text-sm font-medium">Mercado Global</span>
                  </Button>
                  <Button 
                    onClick={() => setActiveView('compliance')} 
                    variant="outline" 
                    className="h-auto flex-col py-6 hover:bg-amber-50 border-amber-200"
                  >
                    <Shield className="h-8 w-8 mb-2 text-amber-600" />
                    <span className="text-sm font-medium">Cumplimiento</span>
                  </Button>
                  <Button 
                    onClick={() => setActiveView('qa')} 
                    variant="outline" 
                    className="h-auto flex-col py-6 hover:bg-rose-50 border-rose-200"
                  >
                    <TestTube className="h-8 w-8 mb-2 text-rose-600" />
                    <span className="text-sm font-medium">Quality Assurance</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Actividad Reciente */}
            <Card>
              <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { 
                      action: 'Nuevo médico registrado', 
                      user: 'Dr. Luis Fernández', 
                      time: 'Hace 1 minuto',
                      type: 'doctor',
                      status: 'success'
                    },
                    { 
                      action: 'Inventario bajo', 
                      user: 'Sistema', 
                      time: 'Hace 2 minutos',
                      type: 'inventory',
                      status: 'warning'
                    },
                    { 
                      action: 'Nuevo usuario registrado', 
                      user: 'Dr. Ana García', 
                      time: 'Hace 5 minutos',
                      type: 'user',
                      status: 'success'
                    },
                    { 
                      action: 'Cita programada', 
                      user: 'Juan Pérez', 
                      time: 'Hace 8 minutos',
                      type: 'appointment',
                      status: 'info'
                    },
                    { 
                      action: 'Alerta de seguridad', 
                      user: 'Sistema', 
                      time: 'Hace 15 minutos',
                      type: 'security',
                      status: 'error'
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
          <h1 className="text-3xl font-bold">Panel de Administración Completo</h1>
          <p className="text-muted-foreground">Gestiona la plataforma y todas sus funcionalidades avanzadas</p>
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
