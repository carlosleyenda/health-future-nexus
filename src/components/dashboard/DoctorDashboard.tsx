
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Users, 
  Activity, 
  FileText, 
  Video, 
  Clock,
  TrendingUp,
  AlertCircle,
  MessageSquare
} from "lucide-react";

export const DoctorDashboard = () => {
  const todayAppointments = [
    {
      id: "1",
      patient: "Juan Pérez",
      time: "10:00 AM",
      type: "virtual",
      condition: "Control de Hipertensión",
      status: "confirmed"
    },
    {
      id: "2",
      patient: "María González",
      time: "11:30 AM",
      type: "in_person",
      condition: "Consulta General",
      status: "waiting"
    },
    {
      id: "3",
      patient: "Carlos Ruiz",
      time: "2:00 PM",
      type: "virtual",
      condition: "Seguimiento Diabetes",
      status: "scheduled"
    }
  ];

  const stats = [
    { label: "Pacientes Hoy", value: "12", icon: Users, color: "text-blue-600" },
    { label: "Consultas Virtuales", value: "8", icon: Video, color: "text-green-600" },
    { label: "Pacientes Totales", value: "247", icon: Activity, color: "text-purple-600" },
    { label: "Casos Urgentes", value: "2", icon: AlertCircle, color: "text-red-600" }
  ];

  const recentPatients = [
    {
      name: "Ana Martínez",
      condition: "Hipertensión",
      lastVisit: "Hace 2 días",
      status: "stable",
      priority: "normal"
    },
    {
      name: "Roberto Silva",
      condition: "Diabetes Tipo 2",
      lastVisit: "Hace 5 días",
      status: "monitoring",
      priority: "high"
    },
    {
      name: "Laura Torres",
      condition: "Consulta General",
      lastVisit: "Hace 1 semana",
      status: "follow_up",
      priority: "normal"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Médico</h1>
          <p className="text-gray-600">Gestiona tus consultas y pacientes</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <MessageSquare className="h-4 w-4 mr-2" />
            Mensajes
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Calendar className="h-4 w-4 mr-2" />
            Ver Agenda
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Citas de Hoy */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              Citas de Hoy
            </CardTitle>
            <CardDescription>
              Agenda del día actual
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {todayAppointments.map((appointment) => (
              <div key={appointment.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">{appointment.patient}</h4>
                    <p className="text-sm text-gray-600">{appointment.condition}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={
                      appointment.status === "confirmed" ? "default" : 
                      appointment.status === "waiting" ? "secondary" : "outline"
                    }>
                      {appointment.status === "confirmed" ? "Confirmada" : 
                       appointment.status === "waiting" ? "En Espera" : "Programada"}
                    </Badge>
                    {appointment.type === "virtual" && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Virtual
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {appointment.time}
                  </div>
                </div>
                <div className="flex space-x-2">
                  {appointment.status === "waiting" ? (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <Video className="h-4 w-4 mr-1" />
                      Iniciar Consulta
                    </Button>
                  ) : appointment.type === "virtual" && appointment.status === "confirmed" ? (
                    <Button size="sm" variant="outline">
                      <Video className="h-4 w-4 mr-1" />
                      Preparar Sesión
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline">
                      Ver Detalles
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    <FileText className="h-4 w-4 mr-1" />
                    Historial
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pacientes Recientes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-purple-600" />
              Pacientes Recientes
            </CardTitle>
            <CardDescription>
              Últimos pacientes atendidos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentPatients.map((patient, index) => (
              <div key={index} className="border rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">{patient.name}</h4>
                    <p className="text-sm text-gray-600">{patient.condition}</p>
                  </div>
                  <Badge 
                    variant={patient.priority === "high" ? "destructive" : "outline"}
                    className="text-xs"
                  >
                    {patient.priority === "high" ? "Prioritario" : "Normal"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{patient.lastVisit}</span>
                  <Badge variant="secondary" className="text-xs">
                    {patient.status === "stable" ? "Estable" : 
                     patient.status === "monitoring" ? "Monitoreo" : "Seguimiento"}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Métricas del Mes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
              Métricas del Mes
            </CardTitle>
            <CardDescription>
              Estadísticas de consultas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Consultas Totales</span>
                <span className="text-lg font-bold text-gray-900">89</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Consultas Virtuales</span>
                <span className="text-lg font-bold text-green-600">62 (70%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Pacientes Nuevos</span>
                <span className="text-lg font-bold text-blue-600">15</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Satisfacción</span>
                <span className="text-lg font-bold text-purple-600">4.8/5</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Casos Urgentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
              Casos que Requieren Atención
            </CardTitle>
            <CardDescription>
              Pacientes con seguimiento urgente
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border-l-4 border-red-500 pl-4">
                <p className="font-medium text-gray-900">Pedro Ramírez</p>
                <p className="text-sm text-gray-600">Hipertensión no controlada</p>
                <p className="text-xs text-red-600">Requiere ajuste de medicación</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <p className="font-medium text-gray-900">Carmen López</p>
                <p className="text-sm text-gray-600">Diabetes Tipo 1</p>
                <p className="text-xs text-yellow-600">Resultados de laboratorio pendientes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
