
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Package, History, Map } from 'lucide-react';
import MedicalDelivery from '@/components/delivery/MedicalDelivery';
import DeliveryTracking from '@/components/delivery/DeliveryTracking';
import DeliveryHistory from '@/components/delivery/DeliveryHistory';
import DeliveryRequestForm from '@/components/delivery/DeliveryRequestForm';

export default function DeliveryPage() {
  const [activeTab, setActiveTab] = useState('track');

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Delivery Médico 🚀
        </h1>
        <p className="text-gray-600">
          Rastrea tus pedidos en tiempo real como en Rappi
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="track" className="flex items-center gap-2">
            <Map className="h-4 w-4" />
            Rastrear
          </TabsTrigger>
          <TabsTrigger value="request" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Solicitar
          </TabsTrigger>
          <TabsTrigger value="services" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Servicios
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            Historial
          </TabsTrigger>
        </TabsList>

        <TabsContent value="track" className="space-y-6">
          <DeliveryTracking />
        </TabsContent>

        <TabsContent value="request" className="space-y-6">
          <DeliveryRequestForm />
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <MedicalDelivery />
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <DeliveryHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}
