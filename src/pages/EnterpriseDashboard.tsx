import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Building2, Users, TrendingUp, DollarSign, Activity, Shield, 
  Settings, Calendar, FileText, BarChart3, Clock, Star,
  AlertTriangle, CheckCircle, ArrowUp, ArrowDown, Eye,
  Stethoscope, UserCheck, CreditCard, Zap, Target
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const performanceData = [
  { month: 'Ene', consultas: 2847, ingresos: 184500, doctores: 12, satisfaccion: 4.8 },
  { month: 'Feb', consultas: 3234, ingresos: 201200, doctores: 14, satisfaccion: 4.7 },
  { month: 'Mar', consultas: 3891, ingresos: 245800, doctores: 16, satisfaccion: 4.9 },
  { month: 'Abr', consultas: 4156, ingresos: 278300, doctores: 18, satisfaccion: 4.8 },
  { month: 'May', consultas: 4623, ingresos: 312400, doctores: 20, satisfaccion: 4.9 },
  { month: 'Jun', consultas: 5234, ingresos: 367800, doctores: 22, satisfaccion: 4.9 }
];

const doctorMetrics = [
  {
    id: '1',
    name: 'Dr. María González',
    specialty: 'Cardiología',
    patients: 142,
    consultations: 89,
    rating: 4.9,
    revenue: 24500,
    availability: 'Disponible',
    status: 'active'
  },
  {
    id: '2',
    name: 'Dr. Carlos Ruiz',
    specialty: 'Neurología',
    patients: 118,
    consultations: 67,
    rating: 4.8,
    revenue: 18700,
    availability: 'En consulta',
    status: 'busy'
  },
  {
    id: '3',
    name: 'Dra. Ana Martín',
    specialty: 'Dermatología',
    patients: 95,
    consultations: 54,
    rating: 4.7,
    revenue: 15200,
    availability: 'Disponible',
    status: 'active'
  }
];

const kpiMetrics = [
  {
    title: 'Ingresos Mensuales',
    value: '$367,800',
    change: '+18.2%',
    trend: 'up',
    icon: DollarSign,
    color: 'green'
  },
  {
    title: 'Consultas Totales',
    value: '5,234',
    change: '+13.2%',
    trend: 'up',
    icon: Activity,
    color: 'blue'
  },
  {
    title: 'Doctores Activos',
    value: '22',
    change: '+10.0%',
    trend: 'up',
    icon: Stethoscope,
    color: 'purple'
  },
  {
    title: 'Satisfacción',
    value: '4.9/5.0',
    change: '+2.1%',
    trend: 'up',
    icon: Star,
    color: 'yellow'
  }
];

export default function EnterpriseDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      {/* Header Enterprise */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Panel Hospitalario Elite
              </h1>
              <p className="text-lg text-gray-600">
                Hospital Central • Gestión integral de servicios médicos
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-green-100 text-green-800 px-4 py-2 text-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Sistema Activo
            </Badge>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3">
              <Settings className="h-5 w-5 mr-2" />
              Configuración
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in">
              <div className={`absolute top-0 right-0 w-20 h-20 bg-${metric.color}-100 rounded-full -translate-y-6 translate-x-6`}>
                <IconComponent className={`h-8 w-8 text-${metric.color}-600 absolute bottom-4 left-4`} />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {metric.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-gray-900">
                    {metric.value}
                  </div>
                  <div className="flex items-center gap-2">
                    {metric.trend === 'up' ? (
                      <ArrowUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${
                      metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.change}
                    </span>
                    <span className="text-sm text-gray-500">vs mes anterior</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-white p-1 rounded-xl shadow-sm">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Resumen
          </TabsTrigger>
          <TabsTrigger value="doctors" className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4" />
            Doctores
          </TabsTrigger>
          <TabsTrigger value="patients" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Pacientes
          </TabsTrigger>
          <TabsTrigger value="operations" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Operaciones
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Compliance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Performance Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Evolución de Ingresos y Consultas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="consultas" 
                      stroke="#8B5CF6" 
                      fill="#8B5CF6" 
                      fillOpacity={0.3}
                      name="Consultas"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="ingresos" 
                      stroke="#06B6D4" 
                      fill="#06B6D4"
                      fillOpacity={0.3}
                      name="Ingresos ($)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Métricas Clave</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Ocupación Promedio</span>
                    <span className="text-lg font-bold text-green-600">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                  <div className="text-xs text-gray-500 mt-1">Target: 85%</div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Tiempo Respuesta</span>
                    <span className="text-lg font-bold text-blue-600">3.2 min</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <div className="text-xs text-gray-500 mt-1">Target: &lt;5 min</div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Conversión Digital</span>
                    <span className="text-lg font-bold text-purple-600">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                  <div className="text-xs text-gray-500 mt-1">Target: 90%</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="doctors" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {doctorMetrics.map((doctor) => (
              <Card key={doctor.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{doctor.name}</CardTitle>
                      <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                    </div>
                    <Badge 
                      className={`${
                        doctor.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {doctor.availability}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      <span>{doctor.patients} pacientes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-green-500" />
                      <span>{doctor.consultations} consultas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{doctor.rating} rating</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-purple-500" />
                      <span>${doctor.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Detalle
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      Agenda
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="patients" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribución de Pacientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Nuevos Pacientes</span>
                    <div className="text-right">
                      <div className="font-bold text-green-600">847</div>
                      <div className="text-xs text-gray-500">+23% vs mes anterior</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Pacientes Recurrentes</span>
                    <div className="text-right">
                      <div className="font-bold text-blue-600">2,341</div>
                      <div className="text-xs text-gray-500">+12% vs mes anterior</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Tasa de Retención</span>
                    <div className="text-right">
                      <div className="font-bold text-purple-600">94.3%</div>
                      <div className="text-xs text-gray-500">+2.1% vs mes anterior</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Satisfacción del Paciente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">4.9</div>
                    <div className="text-sm text-gray-600">Rating promedio</div>
                    <div className="flex justify-center mt-2">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Excelente (5★)</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span>Muy Bueno (4★)</span>
                      <span>18%</span>
                    </div>
                    <Progress value={18} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span>Bueno (3★)</span>
                      <span>4%</span>
                    </div>
                    <Progress value={4} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="operations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Operaciones en Tiempo Real
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Consultas Activas</span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">12</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <UserCheck className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Sala de Espera</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">8</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <span className="font-medium">Urgencias</span>
                  </div>
                  <span className="text-2xl font-bold text-yellow-600">2</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  Métricas Operacionales
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Eficiencia del Sistema</span>
                    <span className="text-lg font-bold text-green-600">96.8%</span>
                  </div>
                  <Progress value={97} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Tiempo Promedio de Consulta</span>
                    <span className="text-lg font-bold text-blue-600">24 min</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Disponibilidad Doctores</span>
                    <span className="text-lg font-bold text-purple-600">91%</span>
                  </div>
                  <Progress value={91} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <Shield className="h-5 w-5" />
                  Estado de Compliance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium">HIPAA Compliance</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Activo</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium">GDPR Compliance</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Activo</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium">SOC 2 Type II</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Certificado</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Reportes de Compliance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Reporte Mensual HIPAA
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Auditoría de Seguridad
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Log de Accesos
                </Button>
                
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <Zap className="h-4 w-4 mr-2" />
                  Generar Reporte Completo
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Action Center */}
      <Card className="mt-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Centro de Acción Rápida</h3>
              <p className="text-purple-100">
                Gestiona tu hospital con herramientas avanzadas de administración
              </p>
            </div>
            <div className="flex gap-4">
              <Button className="bg-white text-purple-600 hover:bg-gray-100">
                <Calendar className="h-4 w-4 mr-2" />
                Programar Cita
              </Button>
              <Button className="bg-white/10 text-white border border-white/20 hover:bg-white/20">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Alerta Urgente
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}