
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, User, Phone, Video, FileText, Calendar, Filter, Clock } from 'lucide-react';
import { useDoctorPatients } from '@/hooks/useDoctor';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface PatientManagementProps {
  doctorId: string;
}

export default function PatientManagement({ doctorId }: PatientManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const { data: patients } = useDoctorPatients(doctorId);
  const navigate = useNavigate();

  const handleViewPatient = (patientId: string) => {
    navigate(`/patients/${patientId}`);
  };

  const handleStartConsultation = (patientId: string) => {
    toast.success('Iniciando consulta...');
    navigate(`/consultations?patient=${patientId}`);
  };

  const handleScheduleAppointment = (patientId: string) => {
    navigate(`/appointments?patient=${patientId}`);
  };

  const handleViewRecords = (patientId: string) => {
    navigate(`/medical-records?patient=${patientId}`);
  };

  const filteredPatients = patients?.filter(patient => {
    const matchesSearch = patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  }) || [];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Pacientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar pacientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtros
            </Button>
          </div>

          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="active">Activos</TabsTrigger>
              <TabsTrigger value="recent">Recientes</TabsTrigger>
              <TabsTrigger value="all">Todos</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              {filteredPatients.length > 0 ? (
                <div className="grid gap-4">
                  {filteredPatients.map((patient) => (
                    <Card key={patient.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                              <User className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-medium">
                                {patient.firstName} {patient.lastName}
                              </h3>
                              <p className="text-sm text-gray-500">{patient.email}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline">Activo</Badge>
                                <span className="text-xs text-gray-400">
                                  Última consulta: Hace 2 días
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleViewRecords(patient.id)}
                              className="flex items-center gap-1"
                            >
                              <FileText className="h-3 w-3" />
                              Historial
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleScheduleAppointment(patient.id)}
                              className="flex items-center gap-1"
                            >
                              <Calendar className="h-3 w-3" />
                              Cita
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleStartConsultation(patient.id)}
                              className="flex items-center gap-1"
                            >
                              <Video className="h-3 w-3" />
                              Consulta
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <User className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No hay pacientes
                  </h3>
                  <p className="text-gray-500">
                    Los pacientes asignados aparecerán aquí
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="recent">
              <div className="text-center py-8">
                <Clock className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Pacientes Recientes
                </h3>
                <p className="text-gray-500">
                  Historial de consultas recientes
                </p>
              </div>
            </TabsContent>

            <TabsContent value="all">
              <div className="text-center py-8">
                <User className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Todos los Pacientes
                </h3>
                <p className="text-gray-500">
                  Base de datos completa de pacientes
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
