import React from 'react';
import { useAuthStore } from '@/store/auth';
import DeviceConnection from '@/components/devices/DeviceConnection';
import IoTDashboard from '@/components/iot/IoTDashboard';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DevicesPage() {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dispositivos Conectados</h1>
      
      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="connection">Conectar Dispositivos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <IoTDashboard patientId={user.id} />
        </TabsContent>
        
        <TabsContent value="connection">
          <DeviceConnection patientId={user.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}