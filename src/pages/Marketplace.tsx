import React from 'react';
import { useAuthStore } from '@/store/auth';
import PatientMarketplace from '@/components/marketplace/PatientMarketplace';
import DoctorMarketplace from '@/components/marketplace/DoctorMarketplace';
import AdminMarketplace from '@/components/marketplace/AdminMarketplace';

export default function MarketplacePage() {
  const { profile } = useAuthStore();
  
  // Determinar qué versión del marketplace mostrar según el rol
  const userRole = profile?.role || 'patient';
  
  switch (userRole) {
    case 'doctor':
      return <DoctorMarketplace />;
    case 'admin':
    case 'enterprise':
      return <AdminMarketplace />;
    case 'patient':
    case 'pharmacy':
    default:
      return <PatientMarketplace />;
  }
}