import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp, Users, DollarSign, Activity, BarChart3,
  UserCheck, Stethoscope, MessageSquare, Globe,
  AlertTriangle, CheckCircle, Clock, Target,
  Filter, Download, RefreshCw, Settings
} from 'lucide-react';

const marketplaceMetrics = {
  totalDoctors: 1247,
  activeDoctors: 892,
  totalPatients: 15683,
  activePatients: 8934,
  totalConsultations: 24567,
  monthlyRevenue: 584720,
  avgConsultationPrice: 87,
  satisfactionRate: 94.6
};

const recentActivity = [
  {
    id: '1',
    type: 'new_doctor',
    doctor: 'Dr. Elena Rodríguez',
    specialty: 'Cardiología',
    timestamp: 'Hace 15 min',
    status: 'pending_verification'
  },
  {
    id: '2',
    type: 'consultation_completed',
    doctor: 'Dr. Carlos Mendoza',
    patient: 'María López',
    amount: 120,
    timestamp: 'Hace 32 min',
    status: 'completed'
  },
  {
    id: '3',
    type: 'dispute',
    doctor: 'Dr. Ana García',
    patient: 'Pedro Martín',
    issue: 'Cancelación tardía',
    timestamp: 'Hace 1 hora',
    status: 'pending_review'
  }
];

const topPerformingDoctors = [
  {
    id: '1',
    name: 'Dr. María González',
    specialty: 'Cardiología',
    consultations: 156,
    revenue: 13920,
    rating: 4.9,
    responseTime: '3 min'
  },
  {
    id: '2',
    name: 'Dr. Carlos Ruiz',
    specialty: 'Neurología',
    consultations: 134,
    revenue: 16080,
    rating: 4.8,
    responseTime: '5 min'
  },
  {
    id: '3',
    name: 'Dra. Ana Martín',
    specialty: 'Dermatología',
    consultations: 98,
    revenue: 9310,
    rating: 4.7,
    responseTime: '2 min'
  }
];

const pendingApprovals = [
  {
    id: '1',
    type: 'doctor_application',
    name: 'Dr. Luis Fernández',
    specialty: 'Psiquiatría',
    experience: 12,
    documents: 'Completos',
    submittedAt: '2024-01-14'
  },
  {
    id: '2',
    type: 'specialty_verification',
    name: 'Dra. Carmen Soto',
    specialty: 'Endocrinología',
    currentSpecialty: 'Medicina Interna',
    certification: 'Pendiente'
  }
];

export default function AdminMarketplace() {
  const [timeRange, setTimeRange] = useState('30d');
  const [filterType, setFilterType] = useState('all');

  const handleApproveDoctor = (doctorId: string) => {
    console.log(`Aprobando doctor ${doctorId}`);
  };

  const handleRejectApplication = (doctorId: string) => {
    console.log(`Rechazando aplicación ${doctorId}`);
  };

  const handleExportData = () => {
    console.log('Exportando datos del marketplace');
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'new_doctor': return <UserCheck className="h-5 w-5 text-blue-500" />;
      case 'consultation_completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'dispute': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default: return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending_verification':
        return <Badge className="bg-yellow-100 text-yellow-800">Pendiente verificación</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completado</Badge>;
      case 'pending_review':
        return <Badge className="bg-red-100 text-red-800">Requiere revisión</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                Administración del Marketplace
              </h1>
              <p className="text-lg text-gray-300">
                Panel de control y métricas del ecosistema médico
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="text-white border-white hover:bg-white hover:text-gray-800"
                onClick={handleExportData}
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button 
                variant="outline" 
                className="text-white border-white hover:bg-white hover:text-gray-800"
              >
                <Settings className="h-4 w-4 mr-2" />
                Configurar
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros de tiempo */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex gap-4">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-48">
                    <Clock className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Últimos 7 días</SelectItem>
                    <SelectItem value="30d">Últimos 30 días</SelectItem>
                    <SelectItem value="90d">Últimos 90 días</SelectItem>
                    <SelectItem value="1y">Último año</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las métricas</SelectItem>
                    <SelectItem value="doctors">Solo doctores</SelectItem>
                    <SelectItem value="patients">Solo pacientes</SelectItem>
                    <SelectItem value="revenue">Solo ingresos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualizar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Métricas Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Doctores Totales</p>
                  <p className="text-2xl font-bold text-blue-600">{marketplaceMetrics.totalDoctors.toLocaleString()}</p>
                  <p className="text-sm text-green-600">+12% vs mes anterior</p>
                </div>
                <Stethoscope className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pacientes Activos</p>
                  <p className="text-2xl font-bold text-green-600">{marketplaceMetrics.activePatients.toLocaleString()}</p>
                  <p className="text-sm text-green-600">+8% vs mes anterior</p>
                </div>
                <Users className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Ingresos Mensuales</p>
                  <p className="text-2xl font-bold text-purple-600">${marketplaceMetrics.monthlyRevenue.toLocaleString()}</p>
                  <p className="text-sm text-green-600">+15% vs mes anterior</p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Satisfacción</p>
                  <p className="text-2xl font-bold text-yellow-600">{marketplaceMetrics.satisfactionRate}%</p>
                  <p className="text-sm text-green-600">+2.1% vs mes anterior</p>
                </div>
                <Target className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Actividad Reciente */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Actividad Reciente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-gray-900">
                        {activity.type === 'new_doctor' && `Nuevo doctor: ${activity.doctor}`}
                        {activity.type === 'consultation_completed' && `Consulta completada`}
                        {activity.type === 'dispute' && `Disputa reportada`}
                      </p>
                      <span className="text-xs text-gray-500">{activity.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {activity.specialty && `Especialidad: ${activity.specialty}`}
                      {activity.amount && `Monto: $${activity.amount}`}
                      {activity.issue && `Motivo: ${activity.issue}`}
                    </p>
                    {getStatusBadge(activity.status)}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Doctores */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Doctores Top Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topPerformingDoctors.map((doctor, index) => (
                <div key={doctor.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-blue-600">#{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-gray-900">{doctor.name}</p>
                      <span className="text-sm font-bold text-green-600">${doctor.revenue.toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-gray-600">{doctor.specialty}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                      <span>{doctor.consultations} consultas</span>
                      <span>Rating: {doctor.rating}</span>
                      <span>Responde en: {doctor.responseTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Aprobaciones Pendientes */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Aprobaciones Pendientes
              </CardTitle>
              <Badge className="bg-red-100 text-red-800">
                {pendingApprovals.length} pendientes
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApprovals.map((approval) => (
                <div key={approval.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-gray-900">{approval.name}</h3>
                      <Badge variant="outline">{approval.specialty}</Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      {approval.experience && (
                        <span>Experiencia: {approval.experience} años</span>
                      )}
                      {approval.documents && (
                        <span>Documentos: {approval.documents}</span>
                      )}
                      {approval.submittedAt && (
                        <span>Enviado: {approval.submittedAt}</span>
                      )}
                      {approval.certification && (
                        <span>Certificación: {approval.certification}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleRejectApplication(approval.id)}
                    >
                      Rechazar
                    </Button>
                    <Button 
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleApproveDoctor(approval.id)}
                    >
                      Aprobar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Métricas Adicionales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Distribución por Especialidades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Medicina General</span>
                  <span className="text-sm font-medium">23%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Cardiología</span>
                  <span className="text-sm font-medium">18%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Dermatología</span>
                  <span className="text-sm font-medium">15%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Pediatría</span>
                  <span className="text-sm font-medium">12%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tipos de Consulta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Video consulta</span>
                  <span className="text-sm font-medium">45%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Presencial</span>
                  <span className="text-sm font-medium">35%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Chat médico</span>
                  <span className="text-sm font-medium">20%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Países Activos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">España</span>
                  <span className="text-sm font-medium">45%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">México</span>
                  <span className="text-sm font-medium">28%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Argentina</span>
                  <span className="text-sm font-medium">18%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Colombia</span>
                  <span className="text-sm font-medium">9%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}