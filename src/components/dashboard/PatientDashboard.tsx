
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Heart, 
  Activity, 
  Pill, 
  FileText, 
  Video, 
  Clock,
  MapPin,
  Phone,
  Plus
} from "lucide-react";

export const PatientDashboard = () => {
  const upcomingAppointments = [
    {
      id: "1",
      doctor: "Dra. María García",
      specialty: "Cardiología",
      date: "2024-06-05",
      time: "10:00 AM",
      type: "virtual",
      status: "confirmed"
    },
    {
      id: "2",
      doctor: "Dr. Carlos López",
      specialty: "Medicina General",
      date: "2024-06-08",
      time: "2:30 PM",
      type: "in_person",
      status: "scheduled"
    }
  ];

  const healthMetrics = [
    { label: "Presión Arterial", value: "120/80", unit: "mmHg", status: "normal" },
    { label: "Frecuencia Cardíaca", value: "72", unit: "bpm", status: "normal" },
    { label: "Peso", value: "75.2", unit: "kg", status: "stable" },
    { label: "Glucosa", value: "95", unit: "mg/dL", status: "normal" }
  ];

  const medications = [
    { name: "Metformina", dosage: "500mg", frequency: "2 veces al día", nextDose: "8:00 PM" },
    { name: "Lisinopril", dosage: "10mg", frequency: "1 vez al día", nextDose: "9:00 AM" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mi Dashboard</h1>
          <p className="text-gray-600">Gestiona tu salud de forma integral</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Agendar Cita
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
          <Video className="h-6 w-6 text-blue-600" />
          <span className="text-sm">Consulta Virtual</span>
        </Button>
        <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
          <Calendar className="h-6 w-6 text-green-600" />
          <span className="text-sm">Agendar Cita</span>
        </Button>
        <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
          <FileText className="h-6 w-6 text-purple-600" />
          <span className="text-sm">Ver Historial</span>
        </Button>
        <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
          <Pill className="h-6 w-6 text-red-600" />
          <span className="text-sm">Medicamentos</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Próximas Citas */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              Próximas Citas
            </CardTitle>
            <CardDescription>
              Tus citas médicas programadas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">{appointment.doctor}</h4>
                    <p className="text-sm text-gray-600">{appointment.specialty}</p>
                  </div>
                  <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                    {appointment.status === "confirmed" ? "Confirmada" : "Programada"}
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {appointment.date} - {appointment.time}
                  </div>
                  <div className="flex items-center">
                    {appointment.type === "virtual" ? (
                      <Video className="h-4 w-4 mr-1" />
                    ) : (
                      <MapPin className="h-4 w-4 mr-1" />
                    )}
                    {appointment.type === "virtual" ? "Virtual" : "Presencial"}
                  </div>
                </div>
                <div className="mt-3 flex space-x-2">
                  {appointment.type === "virtual" && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <Video className="h-4 w-4 mr-1" />
                      Unirse
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    <Phone className="h-4 w-4 mr-1" />
                    Contactar
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Métricas de Salud */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-red-600" />
              Métricas de Salud
            </CardTitle>
            <CardDescription>
              Últimas mediciones
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {healthMetrics.map((metric, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-900">{metric.label}</p>
                  <p className="text-xs text-gray-500">Última medición</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    {metric.value} <span className="text-sm font-normal text-gray-500">{metric.unit}</span>
                  </p>
                  <Badge 
                    variant={metric.status === "normal" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {metric.status === "normal" ? "Normal" : "Estable"}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Medicamentos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Pill className="h-5 w-5 mr-2 text-blue-600" />
              Medicamentos
            </CardTitle>
            <CardDescription>
              Recordatorios y dosis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {medications.map((med, index) => (
              <div key={index} className="border rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">{med.name}</h4>
                    <p className="text-sm text-gray-600">{med.dosage} - {med.frequency}</p>
                  </div>
                  <Badge variant="outline">Activo</Badge>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  Próxima dosis: {med.nextDose}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Historial Reciente */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-purple-600" />
              Historial Reciente
            </CardTitle>
            <CardDescription>
              Últimas actividades médicas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-medium text-gray-900">Consulta Cardiológica</p>
                <p className="text-sm text-gray-600">Dra. María García - 28 May 2024</p>
                <p className="text-xs text-gray-500">Revisión de rutina, resultados normales</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <p className="font-medium text-gray-900">Análisis de Sangre</p>
                <p className="text-sm text-gray-600">Laboratorio Central - 25 May 2024</p>
                <p className="text-xs text-gray-500">Perfil lipídico, glucosa en ayunas</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <p className="font-medium text-gray-900">Receta Médica</p>
                <p className="text-sm text-gray-600">Dr. Carlos López - 22 May 2024</p>
                <p className="text-xs text-gray-500">Metformina 500mg, renovación</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
