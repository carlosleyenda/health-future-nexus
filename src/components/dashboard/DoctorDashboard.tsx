
import React from 'react';
import TodaysSchedule from './sections/TodaysSchedule';
import PatientAlerts from './sections/PatientAlerts';
import RevenueSummary from './sections/RevenueSummary';
import DoctorQuickActions from './sections/DoctorQuickActions';
import RecentReviews from './sections/RecentReviews';

export const DoctorDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard del Doctor</h1>
        <p className="text-muted-foreground">Gestiona tus pacientes y consultas</p>
      </div>
      
      {/* Quick Actions */}
      <DoctorQuickActions />
      
      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TodaysSchedule />
        <PatientAlerts />
      </div>
      
      {/* Revenue and Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueSummary />
        <RecentReviews />
      </div>
    </div>
  );
};
