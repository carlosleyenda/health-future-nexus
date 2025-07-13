
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { Stethoscope, Users, FileText, Calendar, MessageSquare } from 'lucide-react';
import TodaysSchedule from './sections/TodaysSchedule';
import PatientAlerts from './sections/PatientAlerts';
import RevenueSummary from './sections/RevenueSummary';
import RecentReviews from './sections/RecentReviews';
import DoctorActions from '@/components/doctor/DoctorActions';

export const DoctorDashboard = () => {
  const { profile } = useAuthStore();
  const navigate = useNavigate();

  const quickAccessItems = [
    {
      title: "Asistente IA Diagnóstico",
      description: "Herramienta de apoyo para diagnósticos",
      icon: Stethoscope,
      action: () => navigate('/ai-assistant'),
      color: "bg-blue-50 text-blue-600 border-blue-200"
    },
    {
      title: "Historiales Médicos",
      description: "Accede a documentos de pacientes",
      icon: FileText,
      action: () => navigate('/medical-records'),
      color: "bg-green-50 text-green-600 border-green-200"
    },
    {
      title: "Chat con Pacientes",
      description: "Comunicación directa y segura",
      icon: MessageSquare,
      action: () => navigate('/chat'),
      color: "bg-purple-50 text-purple-600 border-purple-200"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header mejorado */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Dr. {profile?.last_name || 'Doctor'}
          </h1>
          <p className="text-muted-foreground">
            Gestiona tus pacientes y consultas médicas
          </p>
        </div>
      </div>

      {/* Acceso rápido a herramientas médicas */}
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
      
      {/* Doctor Actions - Componente completo de acciones */}
      <DoctorActions doctorId={profile?.user_id || ''} />
      
      {/* Main Grid responsive */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <TodaysSchedule />
        <PatientAlerts />
      </div>
      
      {/* Revenue and Reviews */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <RevenueSummary />
        <RecentReviews />
      </div>
    </div>
  );
};
