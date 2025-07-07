import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { 
  Pill, Package, TrendingUp, DollarSign, Clock, Truck, 
  BarChart3, AlertTriangle, CheckCircle, Search, Filter,
  MapPin, Star, Eye, Plus, RefreshCw, Bell
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const salesData = [
  { month: 'Ene', orders: 234, revenue: 45600, delivered: 228, pending: 6 },
  { month: 'Feb', orders: 267, revenue: 52300, delivered: 261, pending: 6 },
  { month: 'Mar', orders: 312, revenue: 61200, delivered: 305, pending: 7 },
  { month: 'Abr', orders: 289, revenue: 56700, delivered: 284, pending: 5 },
  { month: 'May', orders: 345, revenue: 67800, delivered: 338, pending: 7 },
  { month: 'Jun', orders: 398, revenue: 78400, delivered: 390, pending: 8 }
];

const topMedications = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    prescriptions: 145,
    stock: 2840,
    revenue: 8750,
    trend: 'up',
    category: 'Analgésico'
  },
  {
    id: '2',
    name: 'Amoxicilina 875mg',
    prescriptions: 89,
    stock: 1560,
    revenue: 12400,
    trend: 'up',
    category: 'Antibiótico'
  },
  {
    id: '3',
    name: 'Losartán 50mg',
    prescriptions: 76,
    stock: 980,
    revenue: 9850,
    trend: 'stable',
    category: 'Antihipertensivo'
  },
  {
    id: '4',
    name: 'Metformina 850mg',
    prescriptions: 63,
    stock: 1240,
    revenue: 7600,
    trend: 'up',
    category: 'Antidiabético'
  }
];

const recentOrders = [
  {
    id: 'ORD-2024-001',
    patient: 'María González',
    doctor: 'Dr. Carlos Ruiz',
    medication: 'Paracetamol 500mg x30',
    status: 'En camino',
    total: 24.50,
    time: '10:30 AM'
  },
  {
    id: 'ORD-2024-002',
    patient: 'José Martín',
    doctor: 'Dra. Ana López',
    medication: 'Amoxicilina 875mg x14',
    status: 'Preparando',
    total: 18.75,
    time: '10:15 AM'
  },
  {
    id: 'ORD-2024-003',
    patient: 'Carmen Silva',
    doctor: 'Dr. Luis Moreno',
    medication: 'Losartán 50mg x28',
    status: 'Entregado',
    total: 32.40,
    time: '09:45 AM'
  }
];

const kpiMetrics = [
  {
    title: 'Ingresos Mensuales',
    value: '$78,400',
    change: '+15.6%',
    trend: 'up',
    icon: DollarSign,
    color: 'green'
  },
  {
    title: 'Órdenes Procesadas',
    value: '398',
    change: '+15.4%',
    trend: 'up',
    icon: Package,
    color: 'blue'
  },
  {
    title: 'Tiempo Entrega Promedio',
    value: '45 min',
    change: '-8.2%',
    trend: 'up',
    icon: Clock,
    color: 'purple'
  },
  {
    title: 'Tasa de Entrega',
    value: '98.0%',
    change: '+1.2%',
    trend: 'up',
    icon: Truck,
    color: 'orange'
  }
];

export default function PharmacyPartnerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Entregado': return 'bg-green-100 text-green-800';
      case 'En camino': return 'bg-blue-100 text-blue-800';
      case 'Preparando': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 p-6">
      {/* Header Farmacia */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl">
              <Pill className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Farmacia Partner Dashboard
              </h1>
              <p className="text-lg text-gray-600">
                Red de Farmacias • Gestión integral de pedidos y entregas
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-green-100 text-green-800 px-4 py-2 text-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Sistema Activo
            </Badge>
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3">
              <Bell className="h-5 w-5 mr-2" />
              Notificaciones
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
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium text-green-600">
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
        <TabsList className="grid w-full grid-cols-4 bg-white p-1 rounded-xl shadow-sm">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Resumen
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Órdenes
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <Pill className="h-4 w-4" />
            Inventario
          </TabsTrigger>
          <TabsTrigger value="delivery" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Entregas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sales Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Evolución de Ventas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#10B981" 
                      fill="#10B981"
                      fillOpacity={0.3}
                      name="Ingresos ($)"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="orders" 
                      stroke="#06B6D4" 
                      fill="#06B6D4"
                      fillOpacity={0.3}
                      name="Órdenes"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Top Medications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5 text-green-600" />
                  Medicamentos Top
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topMedications.slice(0, 4).map((med) => (
                  <div key={med.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{med.name}</div>
                      <div className="text-xs text-gray-500">{med.category}</div>
                      <div className="text-xs text-green-600 font-medium">
                        {med.prescriptions} prescripciones
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">
                        ${med.revenue.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        Stock: {med.stock}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar órdenes, pacientes, medicamentos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
                <Button>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Actualizar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Órdenes Recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="font-medium text-gray-900">{order.id}</div>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        <div><strong>Paciente:</strong> {order.patient}</div>
                        <div><strong>Doctor:</strong> {order.doctor}</div>
                        <div><strong>Medicamento:</strong> {order.medication}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">
                        ${order.total}
                      </div>
                      <div className="text-sm text-gray-500">{order.time}</div>
                      <Button size="sm" variant="outline" className="mt-2">
                        <Eye className="h-4 w-4 mr-2" />
                        Ver Detalle
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Inventory Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-blue-600" />
                  Estado del Inventario
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Stock Óptimo</span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">1,247</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <span className="font-medium">Stock Bajo</span>
                  </div>
                  <span className="text-2xl font-bold text-yellow-600">23</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <span className="font-medium">Agotado</span>
                  </div>
                  <span className="text-2xl font-bold text-red-600">3</span>
                </div>
              </CardContent>
            </Card>

            {/* Inventory Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Medicamento
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Package className="h-4 w-4 mr-2" />
                  Gestionar Stock
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Alertas de Stock
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Reporte de Inventario
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Medications List */}
          <Card>
            <CardHeader>
              <CardTitle>Lista de Medicamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {topMedications.map((med) => (
                  <div key={med.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className="text-xs">
                        {med.category}
                      </Badge>
                      <div className={`w-3 h-3 rounded-full ${
                        med.stock > 1000 ? 'bg-green-500' : 
                        med.stock > 500 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                    </div>
                    
                    <h4 className="font-medium text-gray-900 mb-2">{med.name}</h4>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Stock:</span>
                        <span className="font-medium">{med.stock} unidades</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Prescripciones:</span>
                        <span className="font-medium">{med.prescriptions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ingresos:</span>
                        <span className="font-medium text-green-600">
                          ${med.revenue.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Detalles
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delivery" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Delivery Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-blue-600" />
                  Estado de Entregas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Entregas del Día</span>
                    <span className="text-lg font-bold text-blue-600">87/92</span>
                  </div>
                  <Progress value={95} className="h-2" />
                  <div className="text-xs text-gray-500 mt-1">94.6% completadas</div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Tiempo Promedio</span>
                    <span className="text-lg font-bold text-green-600">45 min</span>
                  </div>
                  <Progress value={80} className="h-2" />
                  <div className="text-xs text-gray-500 mt-1">Target: 60 min</div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Repartidores Activos</span>
                    <span className="text-lg font-bold text-purple-600">12/15</span>
                  </div>
                  <Progress value={80} className="h-2" />
                  <div className="text-xs text-gray-500 mt-1">Cobertura actual</div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Map Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-green-600" />
                  Mapa de Entregas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">
                      Mapa interactivo de entregas
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      12 repartidores activos
                    </p>
                    <Button className="mt-4" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Mapa Completo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Action Center */}
      <Card className="mt-8 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Centro de Control de Farmacia</h3>
              <p className="text-green-100">
                Gestiona órdenes, inventario y entregas desde un solo lugar
              </p>
            </div>
            <div className="flex gap-4">
              <Button className="bg-white text-green-600 hover:bg-gray-100">
                <Package className="h-4 w-4 mr-2" />
                Nueva Orden
              </Button>
              <Button className="bg-white/10 text-white border border-white/20 hover:bg-white/20">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Alertas de Stock
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}