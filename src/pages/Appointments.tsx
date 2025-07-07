
import React from 'react';
import { useAuthStore } from '@/store/auth';
import AppointmentsList from '@/components/appointments/AppointmentsList';
import AdvancedAppointmentManager from '@/components/patient/AdvancedAppointmentManager';

export default function AppointmentsPage() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Mis Citas</h1>
      {user?.role === 'patient' ? (
        <AdvancedAppointmentManager />
      ) : (
        <AppointmentsList patientId={user?.id || ''} />
      )}
    </div>
  );
}
