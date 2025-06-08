
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Heart, 
  FileText, 
  Calendar, 
  Pill, 
  Activity, 
  Smartphone,
  Shield,
  Download,
  Share2,
  Filter,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { usePatientProfile, usePatientMedicalHistory, usePatientHealthMetrics } from '@/hooks/usePatient';
import { useConnectedDevices, useDeviceData } from '@/hooks/useDevices';
import MedicalHistory from '@/components/medical/MedicalHistory';
import HealthDashboard from '@/components/health/HealthDashboard';
import DeviceConnection from '@/components/devices/DeviceConnection';
import HealthTimeline from '@/components/patient/HealthTimeline';
import MedicalRecordViewer from '@/components/patient/MedicalRecordViewer';

interface CompletePatientPortalProps {
  patientId: string;
}

export default function CompletePatientPortal({ patientId }: CompletePatientPortalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [recordType, setRecordType] = useState('all');

  const { data: profile } = usePatientProfile(patientId);
  const { data: medicalHistory } = usePatientMedicalHistory(patientId);
  const { data: healthMetrics } = usePatientHealthMetrics(patientId);
  const { data: connectedDevices } = useConnectedDevices(patientId);

  const handleExportData = () => {
    console.log('Exporting patient data...');
  };

  const handleShareRecord = (recordId: string) => {
    console.log('Sharing record:', recordId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Patient Info */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {profile?.firstName} {profile?.lastName}
                </h1>
                <p className="text-gray-600">Expediente Médico Completo</p>
                <div className="flex items-center space-x-4 mt-2">
                  <Badge variant="outline">Tipo de Sangre: {profile?.bloodType}</Badge>
                  <Badge variant="outline">
                    Dispositivos: {connectedDevices?.length || 0}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={handleExportData}>
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Compartir
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="history">Historial</TabsTrigger>
            <TabsTrigger value="metrics">Métricas</TabsTrigger>
            <TabsTrigger value="devices">Dispositivos</TabsTrigger>
            <TabsTrigger value="timeline">Línea Temporal</TabsTrigger>
            <TabsTrigger value="records">Documentos</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    Estado de Salud
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Estado General</span>
                    <Badge variant="default">Estable</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Última Consulta</span>
                    <span className="text-sm text-gray-600">
                      {medicalHistory?.[0]?.date ? 
                        new Date(medicalHistory[0].date).toLocaleDateString('es-MX') : 
                        'N/A'
                      }
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Medicamentos Activos</span>
                    <span className="text-sm font-medium">
                      {profile?.currentMedications?.length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Alergias Conocidas</span>
                    <span className="text-sm font-medium">
                      {profile?.allergies?.length || 0}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Actividad Reciente
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {medicalHistory?.slice(0, 3).map((record, index) => (
                    <div key={record.id} className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{record.chiefComplaint}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(record.date).toLocaleDateString('es-MX')}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Connected Devices */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Smartphone className="h-5 w-5 mr-2" />
                    Dispositivos Conectados
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {connectedDevices?.length ? (
                    connectedDevices.map((device) => (
                      <div key={device.id} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${device.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                          <div>
                            <p className="text-sm font-medium">{device.name}</p>
                            <p className="text-xs text-gray-500">{device.type}</p>
                          </div>
                        </div>
                        <Badge variant={device.isActive ? "default" : "secondary"}>
                          {device.isActive ? 'Activo' : 'Inactivo'}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <Smartphone className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">Sin dispositivos conectados</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Conectar Dispositivo
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quick Access to Health Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Métricas de Salud Recientes</CardTitle>
              </CardHeader>
              <CardContent>
                <HealthDashboard patientId={patientId} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Medical History Tab */}
          <TabsContent value="history">
            <MedicalHistory patientId={patientId} />
          </TabsContent>

          {/* Health Metrics Tab */}
          <TabsContent value="metrics">
            <HealthDashboard patientId={patientId} />
          </TabsContent>

          {/* Devices Tab */}
          <TabsContent value="devices">
            <DeviceConnection patientId={patientId} />
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline">
            <HealthTimeline patientId={patientId} />
          </TabsContent>

          {/* Records Tab */}
          <TabsContent value="records" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Buscar en registros médicos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <select 
                      value={dateFilter} 
                      onChange={(e) => setDateFilter(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="all">Todas las fechas</option>
                      <option value="week">Última semana</option>
                      <option value="month">Último mes</option>
                      <option value="year">Último año</option>
                    </select>
                    <select 
                      value={recordType} 
                      onChange={(e) => setRecordType(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="all">Todos los tipos</option>
                      <option value="consultation">Consultas</option>
                      <option value="lab">Laboratorios</option>
                      <option value="imaging">Imagenología</option>
                      <option value="prescription">Recetas</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <MedicalRecordViewer 
              patientId={patientId}
              searchTerm={searchTerm}
              dateFilter={dateFilter}
              recordType={recordType}
              onShare={handleShareRecord}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
