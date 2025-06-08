import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, DollarSign, Activity, Plus, Settings, FileText, Database, UserPlus } from 'lucide-react';
import SystemConfiguration from '@/components/admin/SystemConfiguration';
import ReportsGenerator from '@/components/admin/ReportsGenerator';
import DatabaseManagement from '@/components/admin/DatabaseManagement';
import CreateUserForm from '@/components/admin/CreateUserForm';
import UserManagement from '@/components/admin/UserManagement';

interface AdminTab {
  id: string;
  label: string;
  icon: React.ElementType;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<string>('overview');

  const tabs: AdminTab[] = [
    { id: 'overview', label: 'Vista General', icon: Activity },
    { id: 'users', label: 'Usuarios', icon: Users },
    { id: 'config', label: 'Configuración', icon: Settings },
    { id: 'reports', label: 'Reportes', icon: FileText },
    { id: 'database', label: 'Base de Datos', icon: Database },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Usuarios Totales
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,248</div>
                <p className="text-xs text-muted-foreground">
                  +180 desde el mes pasado
                </p>
                <div className="mt-4 flex gap-2">
                  <Badge variant="outline">845 Pacientes</Badge>
                  <Badge variant="outline">312 Doctores</Badge>
                  <Badge variant="outline">91 Admin</Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Citas Programadas
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">349</div>
                <p className="text-xs text-muted-foreground">
                  +24% desde la semana pasada
                </p>
                <div className="mt-4 flex gap-2">
                  <Badge variant="outline" className="bg-green-50">245 Confirmadas</Badge>
                  <Badge variant="outline" className="bg-yellow-50">78 Pendientes</Badge>
                  <Badge variant="outline" className="bg-red-50">26 Canceladas</Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Ingresos Mensuales
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$248,560</div>
                <p className="text-xs text-muted-foreground">
                  +12.5% desde el mes pasado
                </p>
                <div className="mt-4">
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Meta: $300,000</span>
                    <span>78%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Consultas Virtuales
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,423</div>
                <p className="text-xs text-muted-foreground">
                  +32% desde el mes pasado
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Completadas</span>
                    <span>1,245</span>
                  </div>
                  <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: '87%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Canceladas</span>
                    <span>178</span>
                  </div>
                  <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full rounded-full" style={{ width: '13%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Acciones Rápidas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="w-full flex items-center gap-2 justify-center" onClick={() => setActiveTab('users')}>
                    <UserPlus className="h-4 w-4" />
                    <span>Crear Usuario</span>
                  </Button>
                  <Button variant="outline" className="w-full flex items-center gap-2 justify-center" onClick={() => setActiveTab('reports')}>
                    <FileText className="h-4 w-4" />
                    <span>Generar Reporte</span>
                  </Button>
                  <Button variant="outline" className="w-full flex items-center gap-2 justify-center" onClick={() => setActiveTab('config')}>
                    <Settings className="h-4 w-4" />
                    <span>Configuración</span>
                  </Button>
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
        <h1 className="text-3xl font-bold tracking-tight">Panel de Administración</h1>
        <Button onClick={() => setActiveTab('users')}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Usuario
        </Button>
      </div>

      <div className="flex overflow-x-auto space-x-4 pb-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            variant={activeTab === tab.id ? "default" : "outline"}
            className="flex items-center gap-2"
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </Button>
        ))}
      </div>

      {renderTabContent()}
    </div>
  );
}
