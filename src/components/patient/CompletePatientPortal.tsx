
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Activity, 
  FileText, 
  Calendar, 
  Smartphone,
  Download,
  Share2,
  Brain
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { usePatientProfile } from '@/hooks/usePatient';
import { useConnectedDevices } from '@/hooks/useDevices';
import SimpleMedicalHistory from '@/components/medical/SimpleMedicalHistory';
import CompactHealthMetrics from '@/components/dashboard/sections/CompactHealthMetrics';
import DeviceConnection from '@/components/devices/DeviceConnection';
import HealthTimeline from '@/components/patient/HealthTimeline';
import MedicalRecordViewer from '@/components/patient/MedicalRecordViewer';
import SimpleAIDiagnostic from '@/components/ai/SimpleAIDiagnostic';

interface CompletePatientPortalProps {
  patientId: string;
}

export default function CompletePatientPortal({ patientId }: CompletePatientPortalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [recordType, setRecordType] = useState('all');

  const { data: profile } = usePatientProfile(patientId);
  const { data: connectedDevices } = useConnectedDevices(patientId);

  const handleExportData = () => {
    console.log('Exporting patient data...');
  };

  const handleShareRecord = (recordId: string) => {
    console.log('Sharing record:', recordId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header compacto */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {profile?.firstName} {profile?.lastName}
                </h1>
                <div className="flex items-center space-x-3 mt-1">
                  <Badge variant="outline" className="text-xs">
                    Tipo de Sangre: {profile?.bloodType || 'No especificado'}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Dispositivos: {connectedDevices?.length || 0}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleExportData}>
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal con mejor organización */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="history">Historial</TabsTrigger>
            <TabsTrigger value="ai-assistant">IA Médica</TabsTrigger>
            <TabsTrigger value="devices">Dispositivos</TabsTrigger>
            <TabsTrigger value="timeline">Línea Temporal</TabsTrigger>
          </TabsList>

          {/* Overview mejorado */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <SimpleMedicalHistory patientId={patientId} />
              </div>
              
              <div className="space-y-6">
                <CompactHealthMetrics patientId={patientId} />
                
                {/* Estado de conectividad */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center text-base">
                      <Smartphone className="h-5 w-5 mr-2" />
                      Dispositivos Conectados
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {connectedDevices?.length ? (
                      <div className="space-y-2">
                        {connectedDevices.slice(0, 3).map((device) => (
                          <div key={device.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center space-x-2">
                              <div className={`w-2 h-2 rounded-full ${device.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                              <span className="text-sm font-medium">{device.name}</span>
                            </div>
                            <Badge variant={device.isActive ? "default" : "secondary"} className="text-xs">
                              {device.isActive ? 'Activo' : 'Inactivo'}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-3">
                        <Smartphone className="h-6 w-6 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">Sin dispositivos conectados</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Historial médico */}
          <TabsContent value="history">
            <SimpleMedicalHistory patientId={patientId} />
          </TabsContent>

          {/* IA Médica */}
          <TabsContent value="ai-assistant">
            <SimpleAIDiagnostic />
          </TabsContent>

          {/* Dispositivos */}
          <TabsContent value="devices">
            <DeviceConnection patientId={patientId} />
          </TabsContent>

          {/* Timeline */}
          <TabsContent value="timeline">
            <HealthTimeline patientId={patientId} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
