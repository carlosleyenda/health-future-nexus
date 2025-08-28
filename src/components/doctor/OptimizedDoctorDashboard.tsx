import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { 
  Stethoscope, Users, Calendar, MessageSquare, Brain, 
  Activity, TrendingUp, Clock, AlertCircle, Video,
  DollarSign, Star, FileText, Zap, Heart
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function OptimizedDoctorDashboard() {
  const { profile } = useAuthStore();
  const navigate = useNavigate();

  // Datos mock mejorados
  const todayMetrics = {
    appointments: { total: 12, completed: 8, upcoming: 4 },
    revenue: { today: 1800, month: 28500, target: 30000 },
    patients: { active: 156, new: 8, urgent: 2 },
    rating: { current: 4.8, reviews: 234, trending: '+0.2' }
  };

  const quickActions = [
    {
      title: 'IA Diagnóstica',
      description: 'Asistente médico inteligente',
      icon: Brain,
      onClick: () => navigate('/ai-assistant'),
      color: 'bg-gradient-to-r from-blue-500 to-purple-600',
      badge: 'Pro'
    },
    {
      title: 'Consulta Virtual',
      description: 'Iniciar videollamada',
      icon: Video,
      onClick: () => navigate('/consultations'),
      color: 'bg-gradient-to-r from-green-500 to-teal-600',
      badge: 'Live'
    },
    {
      title: 'Emergencia',
      description: 'Protocolo de urgencia',
      icon: AlertCircle,
      onClick: () => navigate('/emergency'),
      color: 'bg-gradient-to-r from-red-500 to-pink-600',
      badge: '2 casos'
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      time: '10:00',
      patient: 'Ana García',
      type: 'Consulta General',
      status: 'confirmed',
      isVirtual: true
    },
    {
      id: 2,
      time: '10:30',
      patient: 'Carlos Méndez',
      type: 'Seguimiento',
      status: 'pending',
      isVirtual: false
    },
    {
      id: 3,
      time: '11:00',
      patient: 'María López',
      type: 'Primera Consulta',
      status: 'confirmed',
      isVirtual: true
    }
  ];

  const recentActivities = [
    { time: '09:45', action: 'Consulta completada', patient: 'Pedro Sánchez', type: 'success' },
    { time: '09:30', action: 'Receta enviada', patient: 'Laura Ruiz', type: 'info' },
    { time: '09:15', action: 'Resultado de análisis', patient: 'Miguel Torres', type: 'warning' },
    { time: '09:00', action: 'Nueva cita agendada', patient: 'Sofia Herrera', type: 'success' }
  ];

  return (
    <div className="space-y-6">
      {/* Header Personalizado */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dr. {profile?.first_name} {profile?.last_name}
          </h1>
          <p className="text-muted-foreground mt-1">
            Dashboard Médico Professional • {new Date().toLocaleDateString('es-MX')}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Stethoscope className="h-4 w-4 mr-2" />
            Nueva Consulta
          </Button>
          <Button variant="outline">
            <MessageSquare className="h-4 w-4 mr-2" />
            Chat
            <Badge className="ml-2 bg-red-500">3</Badge>
          </Button>
        </div>
      </div>

      {/* Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Citas de Hoy</p>
                <p className="text-2xl font-bold">{todayMetrics.appointments.completed}/{todayMetrics.appointments.total}</p>
                <p className="text-xs text-blue-600">
                  {todayMetrics.appointments.upcoming} próximas
                </p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ingresos Hoy</p>
                <p className="text-2xl font-bold">${todayMetrics.revenue.today.toLocaleString()}</p>
                <p className="text-xs text-green-600">
                  {Math.round((todayMetrics.revenue.month / todayMetrics.revenue.target) * 100)}% del objetivo
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pacientes Activos</p>
                <p className="text-2xl font-bold">{todayMetrics.patients.active}</p>
                <p className="text-xs text-purple-600">
                  +{todayMetrics.patients.new} nuevos esta semana
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rating Profesional</p>
                <p className="text-2xl font-bold">{todayMetrics.rating.current}</p>
                <p className="text-xs text-yellow-600">
                  {todayMetrics.rating.trending} este mes
                </p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Acciones Rápidas Mejoradas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickActions.map((action, index) => (
          <Card 
            key={index}
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden"
            onClick={action.onClick}
          >
            <div className={`h-2 ${action.color}`} />
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <action.icon className="h-8 w-8 text-white drop-shadow-lg" />
                <Badge variant="secondary">{action.badge}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold text-lg mb-1">{action.title}</h3>
              <p className="text-sm text-muted-foreground">{action.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contenido Principal con Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="agenda" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="agenda">Agenda</TabsTrigger>
              <TabsTrigger value="pacientes">Pacientes</TabsTrigger>
              <TabsTrigger value="actividad">Actividad</TabsTrigger>
              <TabsTrigger value="finanzas">Finanzas</TabsTrigger>
            </TabsList>

            <TabsContent value="agenda" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Próximas Citas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div 
                        key={appointment.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Clock className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">{appointment.patient}</h4>
                            <p className="text-sm text-muted-foreground">{appointment.type}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant={appointment.isVirtual ? "default" : "outline"}>
                                {appointment.isVirtual ? 'Virtual' : 'Presencial'}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{appointment.time}</span>
                            </div>
                          </div>
                        </div>
                        <Button size="sm">
                          {appointment.isVirtual ? <Video className="h-4 w-4" /> : <Users className="h-4 w-4" />}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pacientes" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Gestión de Pacientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg text-center">
                      <Users className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                      <p className="text-2xl font-bold">{todayMetrics.patients.active}</p>
                      <p className="text-sm text-muted-foreground">Total Pacientes</p>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <Activity className="h-8 w-8 mx-auto text-green-600 mb-2" />
                      <p className="text-2xl font-bold">{todayMetrics.patients.new}</p>
                      <p className="text-sm text-muted-foreground">Nuevos Esta Semana</p>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <AlertCircle className="h-8 w-8 mx-auto text-red-600 mb-2" />
                      <p className="text-2xl font-bold">{todayMetrics.patients.urgent}</p>
                      <p className="text-sm text-muted-foreground">Casos Urgentes</p>
                    </div>
                  </div>
                  <Button className="w-full mt-4" onClick={() => navigate('/patients')}>
                    <Users className="h-4 w-4 mr-2" />
                    Ver Todos los Pacientes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="actividad" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Actividad Reciente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border-l-4 border-l-blue-200 bg-muted/30 rounded">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'success' ? 'bg-green-500' :
                          activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.patient}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="finanzas" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Resumen Financiero</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <DollarSign className="h-6 w-6 text-green-600 mb-2" />
                        <p className="text-sm text-muted-foreground">Ingresos del Mes</p>
                        <p className="text-xl font-bold">${todayMetrics.revenue.month.toLocaleString()}</p>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-blue-600 mb-2" />
                        <p className="text-sm text-muted-foreground">Progreso del Objetivo</p>
                        <p className="text-xl font-bold">{Math.round((todayMetrics.revenue.month / todayMetrics.revenue.target) * 100)}%</p>
                      </div>
                    </div>
                    <Button className="w-full" onClick={() => navigate('/doctor/financials')}>
                      <FileText className="h-4 w-4 mr-2" />
                      Ver Dashboard Financiero Completo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Panel Lateral */}
        <div className="space-y-6">
          {/* Estado del Sistema */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Estado del Sistema
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">IA Diagnóstica</span>
                  <Badge className="bg-green-100 text-green-800">Activo</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Videoconsultas</span>
                  <Badge className="bg-green-100 text-green-800">Disponible</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Chat Médico</span>
                  <Badge className="bg-yellow-100 text-yellow-800">3 mensajes</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Emergencias</span>
                  <Badge className="bg-red-100 text-red-800">2 casos</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Acciones Rápidas */}
          <Card>
            <CardHeader>
              <CardTitle>Acciones Médicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/ai-assistant')}
              >
                <Brain className="h-4 w-4 mr-2" />
                Consultar IA
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/medical-records')}
              >
                <FileText className="h-4 w-4 mr-2" />
                Historiales
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/prescriptions')}
              >
                <Heart className="h-4 w-4 mr-2" />
                Recetas
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/schedule')}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Mi Agenda
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}