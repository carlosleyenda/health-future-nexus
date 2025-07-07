
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, Activity, Calendar, Pill, FileText, Heart, Stethoscope, 
  Shield, Smartphone, Bell, TrendingUp, Clock, MapPin, Star,
  MessageCircle, Video, Phone, ChevronRight, AlertCircle,
  CheckCircle, Target, Zap, User, Users, CreditCard
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from '@/store/auth';
import AppointmentBookingModal from '@/components/appointments/AppointmentBookingModal';

export const PatientDashboard = () => {
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [activeHealthTab, setActiveHealthTab] = useState('overview');
  const { user, profile } = useAuthStore();
  const navigate = useNavigate();

  // Datos simulados del estado de salud del paciente
  const healthStatus = {
    overall: 85,
    vitals: {
      heartRate: 72,
      bloodPressure: "120/80",
      weight: 70.5,
      temperature: 36.6
    },
    nextAppointment: {
      doctor: "Dr. García",
      specialty: "Cardiología",
      date: "2024-06-12",
      time: "10:30",
      type: "virtual"
    },
    medications: [
      { name: "Lisinopril", dosage: "10mg", frequency: "1 vez al día", nextDose: "20:00" },
      { name: "Metformina", dosage: "500mg", frequency: "2 veces al día", nextDose: "12:00" }
    ],
    alerts: [
      { type: "medication", message: "Recordar tomar Metformina en 2 horas", priority: "medium" },
      { type: "appointment", message: "Cita con Dr. García mañana a las 10:30", priority: "high" }
    ]
  };

  const quickActions = [
    {
      title: "Agendar Cita",
      description: "Consulta con especialistas",
      icon: Calendar,
      action: () => setShowAppointmentModal(true),
      color: "bg-blue-500",
      textColor: "text-white"
    },
    {
      title: "Consulta Virtual",
      description: "Telemedicina inmediata",
      icon: Video,
      action: () => navigate('/consultation'),
      color: "bg-green-500",
      textColor: "text-white"
    },
    {
      title: "Chat Médico",
      description: "Mensajes con doctores",
      icon: MessageCircle,
      action: () => navigate('/chat'),
      color: "bg-purple-500",
      textColor: "text-white"
    },
    {
      title: "Emergencia",
      description: "Contacto inmediato",
      icon: Phone,
      action: () => navigate('/emergency'),
      color: "bg-red-500",
      textColor: "text-white"
    }
  ];

  const services = [
    {
      title: "Mi Historial Médico",
      description: "Documentos, estudios y análisis",
      icon: FileText,
      route: "/medical-records",
      stats: "24 documentos"
    },
    {
      title: "Medicamentos",
      description: "Recetas y recordatorios",
      icon: Pill,
      route: "/medications",
      stats: "3 activos"
    },
    {
      title: "Dispositivos Conectados",
      description: "Smartwatch, tensiómetro",
      icon: Smartphone,
      route: "/devices",
      stats: "2 conectados"
    },
            {
              title: "Mi Cartera Digital",
              description: "Pagos, seguros y finanzas",
              icon: CreditCard,
              route: "/payments",
              stats: "$1,250 disponible"
            },
            {
              title: "Red de Doctores",
              description: "Encuentra especialistas",
              icon: Users,
              route: "/marketplace", 
              stats: "45+ doctores"
            },
            {
              title: "Mi Perfil de Salud",
              description: "Configuración personal",
              icon: User,
              route: "/profile",
              stats: "Completo al 85%"
            }
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold">
                  ¡Hola, {profile?.first_name || 'Usuario'}! 👋
                </h1>
                <p className="text-blue-100 mt-2 text-lg">
                  Tu salud está en buenas manos. Aquí tienes todo lo que necesitas.
                </p>
                
                {/* Health Score */}
                <div className="mt-6 flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-6 w-6 text-red-300" />
                    <span className="font-semibold">Índice de Salud:</span>
                  </div>
                  <div className="flex-1 max-w-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-blue-100">Excelente</span>
                      <span className="text-sm font-medium">{healthStatus.overall}%</span>
                    </div>
                    <Progress value={healthStatus.overall} className="h-2" />
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 lg:mt-0 lg:ml-8 grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">{healthStatus.vitals.heartRate}</div>
                  <div className="text-blue-100 text-sm">BPM</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">{healthStatus.vitals.bloodPressure}</div>
                  <div className="text-blue-100 text-sm">mmHg</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Alertas importantes */}
          {healthStatus.alerts.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Bell className="h-5 w-5 mr-2 text-orange-500" />
                Recordatorios Importantes
              </h2>
              <div className="space-y-3">
                {healthStatus.alerts.map((alert, index) => (
                  <Card key={index} className={`border-l-4 ${
                    alert.priority === 'high' ? 'border-l-red-500 bg-red-50' : 
                    alert.priority === 'medium' ? 'border-l-orange-500 bg-orange-50' : 
                    'border-l-blue-500 bg-blue-50'
                  }`}>
                    <CardContent className="py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <AlertCircle className={`h-5 w-5 ${
                            alert.priority === 'high' ? 'text-red-500' : 
                            alert.priority === 'medium' ? 'text-orange-500' : 
                            'text-blue-500'
                          }`} />
                          <span className="font-medium">{alert.message}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Acciones Rápidas */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Zap className="h-6 w-6 mr-2 text-yellow-500" />
              Acciones Rápidas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Card 
                  key={index}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 group"
                  onClick={action.action}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 ${action.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <action.icon className={`h-8 w-8 ${action.textColor}`} />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{action.title}</h3>
                    <p className="text-gray-600 text-sm">{action.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Próxima Cita */}
          {healthStatus.nextAppointment && (
            <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-green-700">
                  <Calendar className="h-5 w-5 mr-2" />
                  Próxima Cita Médica
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Stethoscope className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{healthStatus.nextAppointment.doctor}</h3>
                      <p className="text-gray-600">{healthStatus.nextAppointment.specialty}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(healthStatus.nextAppointment.date).toLocaleDateString('es-MX')}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {healthStatus.nextAppointment.time}
                        </div>
                        <Badge variant={healthStatus.nextAppointment.type === 'virtual' ? 'default' : 'secondary'}>
                          {healthStatus.nextAppointment.type === 'virtual' ? 'Virtual' : 'Presencial'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 lg:mt-0 space-y-2 lg:space-y-0 lg:space-x-2 lg:flex">
                    <Button variant="outline" className="w-full lg:w-auto">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Enviar Mensaje
                    </Button>
                    <Button className="w-full lg:w-auto">
                      <Video className="h-4 w-4 mr-2" />
                      Unirse a Consulta
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Grid Principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Servicios Principales */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Target className="h-6 w-6 mr-2 text-blue-500" />
                Mis Servicios de Salud
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                  <Card 
                    key={index}
                    className="cursor-pointer hover:shadow-lg transition-all duration-200 group hover:bg-blue-50"
                    onClick={() => navigate(service.route)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <service.icon className="h-8 w-8 text-blue-600 group-hover:scale-110 transition-transform" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{service.title}</h3>
                          <p className="text-gray-600 text-sm">{service.description}</p>
                          <Badge variant="secondary" className="mt-2">{service.stats}</Badge>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Panel Lateral */}
            <div className="space-y-6">
              {/* Medicamentos Actuales */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Pill className="h-5 w-5 mr-2 text-green-500" />
                    Medicamentos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {healthStatus.medications.map((med, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{med.name}</h4>
                        <p className="text-sm text-gray-600">{med.dosage} - {med.frequency}</p>
                        <p className="text-xs text-blue-600">Próxima: {med.nextDose}</p>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    Ver Todos los Medicamentos
                  </Button>
                </CardContent>
              </Card>

              {/* Métricas de Actividad */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-purple-500" />
                    Actividad Reciente
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Pasos hoy</span>
                    <span className="font-semibold">8,432</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Horas de sueño</span>
                    <span className="font-semibold">7.5h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Calorías quemadas</span>
                    <span className="font-semibold">234 kcal</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <p className="text-xs text-gray-500 text-center">
                    75% de tu meta diaria alcanzada
                  </p>
                </CardContent>
              </Card>

              {/* Rating y Feedback */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="h-5 w-5 mr-2 text-yellow-500" />
                    Tu Experiencia
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    ¿Cómo ha sido tu experiencia con nuestros servicios?
                  </p>
                  <div className="flex justify-center space-x-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className="h-6 w-6 text-yellow-400 fill-current cursor-pointer hover:scale-110 transition-transform" 
                      />
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">
                    Dejar Comentario
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <AppointmentBookingModal 
        open={showAppointmentModal}
        onOpenChange={setShowAppointmentModal}
      />
    </>
  );
};
