
import React from 'react';
import { useAuthStore } from '@/store/auth';
import PaymentPortal from '@/components/payments/PaymentPortal';
import PatientFinancialDashboard from '@/components/patient/PatientFinancialDashboard';
import DoctorFinancialDashboard from '@/components/doctor/DoctorFinancialDashboard';

export default function PaymentsPage() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        {user?.role === 'patient' ? 'Mis Pagos' : 
         user?.role === 'doctor' ? 'Finanzas' : 'Pagos'}
      </h1>
      {user?.role === 'patient' ? (
        <PatientFinancialDashboard />
      ) : user?.role === 'doctor' ? (
        <DoctorFinancialDashboard />
      ) : (
        <PaymentPortal />
      )}
    </div>
  );
}
