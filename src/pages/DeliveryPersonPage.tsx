import React from 'react';
import { useAuthStore } from '@/store/auth';
import { Navigate } from 'react-router-dom';
import DeliveryPersonDashboard from '@/components/delivery/DeliveryPersonDashboard';

export default function DeliveryPersonPage() {
  const { user } = useAuthStore();

  // For demo purposes, we'll show the delivery person dashboard
  // In a real app, you'd check if the user has delivery person role
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <DeliveryPersonDashboard deliveryPersonId={user.id} />
    </div>
  );
}