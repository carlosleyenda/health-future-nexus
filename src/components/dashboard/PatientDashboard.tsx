
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Activity, Calendar, Pill, FileText, Heart, Stethoscope } from "lucide-react";
import { useNavigate } from "react-router-dom";
import QuickActions from './sections/QuickActions';
import UpcomingAppointments from './sections/UpcomingAppointments';
import HealthMetrics from './sections/HealthMetrics';
import MedicationsCard from './sections/MedicationsCard';
import RecentHistoryCard from './sections/RecentHistoryCard';
import AppointmentBookingModal from '@/components/appointments/AppointmentBookingModal';
import { useAuthStore } from '@/store/auth';

export const PatientDashboard = () => {
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const quickAccessItems = [
    {
      title: "Asistente IA Médico",
      description: "Consulta síntomas y obtén orientación médica",
      icon: Stethoscope,
      action: () => navigate('/ai-assistant'),
      color: "bg-blue-50 text-blue-600 border-blue-200"
    },
    {
      title: "Delivery Médico",
      description: "Solicita medicamentos y servicios a domicilio",
      icon: Heart,
      action: () => navigate('/delivery'),
      color: "bg-green-50 text-green-600 border-green-200"
    },
    {
      title: "Historial Médico",
      description: "Accede a todos tus documentos médicos",
      icon: FileText,
      action: () => navigate('/medical-records'),
      color: "bg-purple-50 text-purple-600 border-purple-200"
    }
  ];

  return (
    <>
      <div className="space-y-6">
        {/* Header mejorado */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Bienvenido, {user?.firstName || 'Usuario'}
            </h1>
            <p className="text-muted-foreground">
              Gestiona tu salud de forma integral y accede a todos nuestros servicios
            </p>
          </div>
          <Button 
            onClick={() => setShowAppointmentModal(true)}
            className="sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Agendar Cita
          </Button>
        </div>

        {/* Acceso rápido a servicios principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickAccessItems.map((item, index) => (
            <Card 
              key={index} 
              className={`cursor-pointer hover:shadow-md transition-all duration-200 border-2 ${item.color}`}
              onClick={item.action}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <item.icon className="h-6 w-6" />
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  {item.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Contenido principal en grid responsive */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <UpcomingAppointments />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MedicationsCard />
              <RecentHistoryCard />
            </div>
          </div>
          <div className="space-y-6">
            <HealthMetrics />
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
