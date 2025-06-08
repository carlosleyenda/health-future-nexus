
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import QuickActions from './sections/QuickActions';
import UpcomingAppointments from './sections/UpcomingAppointments';
import HealthMetrics from './sections/HealthMetrics';
import MedicationsCard from './sections/MedicationsCard';
import RecentHistoryCard from './sections/RecentHistoryCard';

export const PatientDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Mi Dashboard</h1>
          <p className="text-muted-foreground">Gestiona tu salud de forma integral</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Agendar Cita
        </Button>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <UpcomingAppointments />
        <HealthMetrics />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MedicationsCard />
        <RecentHistoryCard />
      </div>
    </div>
  );
};
