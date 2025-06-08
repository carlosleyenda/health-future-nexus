
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Stethoscope, 
  Users, 
  FileText, 
  Calendar, 
  MessageSquare,
  Video,
  Clock,
  Activity,
  Pill,
  Camera
} from 'lucide-react';
import { toast } from 'sonner';

interface DoctorActionsProps {
  doctorId: string;
}

export default function DoctorActions({ doctorId }: DoctorActionsProps) {
  const navigate = useNavigate();

  const handleStartConsultation = () => {
    toast.success('Iniciando consulta virtual...');
    navigate(`/consultations?doctor=${doctorId}`);
  };

  const handleViewPatients = () => {
    navigate('/patients');
  };

  const handleViewSchedule = () => {
    navigate('/schedule');
  };

  const handleViewMedicalRecords = () => {
    navigate('/medical-records');
  };

  const handleOpenChat = () => {
    navigate('/chat');
  };

  const handleAIAssistant = () => {
    navigate('/ai-assistant');
  };

  const handleEmergencyResponse = () => {
    toast.info('Activando protocolo de emergencia...');
    // Implementar lógica de emergencia
  };

  const handlePrescriptions = () => {
    navigate('/pharmacy');
  };

  const handleTakePhoto = () => {
    toast.info('Función de cámara médica próximamente...');
  };

  const actions = [
    {
      title: 'Iniciar Consulta',
      description: 'Videollamada con paciente',
      icon: Video,
      onClick: handleStartConsultation,
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      title: 'Ver Pacientes',
      description: 'Lista de pacientes asignados',
      icon: Users,
      onClick: handleViewPatients,
      color: 'bg-green-50 text-green-600 border-green-200'
    },
    {
      title: 'Mi Agenda',
      description: 'Citas y horarios',
      icon: Calendar,
      onClick: handleViewSchedule,
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    },
    {
      title: 'Expedientes',
      description: 'Historiales médicos',
      icon: FileText,
      onClick: handleViewMedicalRecords,
      color: 'bg-orange-50 text-orange-600 border-orange-200'
    },
    {
      title: 'Chat Médico',
      description: 'Mensajes con pacientes',
      icon: MessageSquare,
      onClick: handleOpenChat,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200'
    },
    {
      title: 'IA Diagnóstica',
      description: 'Asistente de diagnóstico',
      icon: Stethoscope,
      onClick: handleAIAssistant,
      color: 'bg-red-50 text-red-600 border-red-200'
    },
    {
      title: 'Emergencia',
      description: 'Protocolo de urgencias',
      icon: Activity,
      onClick: handleEmergencyResponse,
      color: 'bg-red-100 text-red-700 border-red-300'
    },
    {
      title: 'Recetas',
      description: 'Gestión de medicamentos',
      icon: Pill,
      onClick: handlePrescriptions,
      color: 'bg-teal-50 text-teal-600 border-teal-200'
    },
    {
      title: 'Captura Médica',
      description: 'Fotos y documentos',
      icon: Camera,
      onClick: handleTakePhoto,
      color: 'bg-gray-50 text-gray-600 border-gray-200'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Acciones Médicas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={action.onClick}
              className={`h-20 flex flex-col items-center justify-center space-y-2 hover:shadow-md transition-all duration-200 border-2 ${action.color}`}
            >
              <action.icon className="h-6 w-6" />
              <div className="text-center">
                <div className="text-sm font-medium">{action.title}</div>
                <div className="text-xs opacity-75">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
