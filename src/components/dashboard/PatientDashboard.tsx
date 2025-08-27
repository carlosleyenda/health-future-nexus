
import React from 'react';
import { useAuthStore } from '@/store/auth';
import CompactHealthMetrics from './sections/CompactHealthMetrics';
import CompactUpcomingAppointments from './sections/CompactUpcomingAppointments';
import SimpleMedicalHistory from '@/components/medical/SimpleMedicalHistory';
import SimpleAIDiagnostic from '@/components/ai/SimpleAIDiagnostic';

export default function PatientDashboard() {
  const { user } = useAuthStore();
  const patientId = user?.id || 'demo-patient';

  return (
    <div className="space-y-6 p-6">
      {/* Header de bienvenida */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          ¡Hola, {user?.firstName || 'Usuario'}! 👋
        </h1>
        <p className="text-gray-600">
          Aquí tienes un resumen de tu salud y próximas actividades
        </p>
      </div>

      {/* Grid principal - diseño responsivo mejorado */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Columna izquierda - Métricas y citas */}
        <div className="lg:col-span-5 space-y-6">
          <CompactHealthMetrics patientId={patientId} />
          <CompactUpcomingAppointments patientId={patientId} />
        </div>

        {/* Columna derecha - Historial e IA */}
        <div className="lg:col-span-7 space-y-6">
          <SimpleMedicalHistory patientId={patientId} />
          <SimpleAIDiagnostic />
        </div>
      </div>
    </div>
  );
}
