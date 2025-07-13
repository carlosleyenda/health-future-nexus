import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Pill, 
  Calendar, 
  Clock, 
  Download, 
  Share2, 
  AlertTriangle,
  Check,
  RefreshCw,
  Search,
  Filter,
  QrCode,
  MapPin,
  Phone
} from 'lucide-react';

interface Prescription {
  id: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  doctor: string;
  prescribedDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'completed' | 'cancelled';
  refillsRemaining: number;
  totalRefills: number;
  pharmacy?: string;
  cost?: number;
  insurance?: boolean;
}

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone: string;
  distance: number;
  rating: number;
  isOpen: boolean;
  deliveryAvailable: boolean;
}

// Datos simulados
const mockPrescriptions: Prescription[] = [
  {
    id: 'rx-001',
    medicationName: 'Ibuprofeno 400mg',
    dosage: '400mg',
    frequency: 'Cada 8 horas',
    duration: '7 días',
    instructions: 'Tomar con alimentos para evitar molestias estomacales',
    doctor: 'Dr. María García',
    prescribedDate: '2024-01-15',
    expiryDate: '2024-07-15',
    status: 'active',
    refillsRemaining: 2,
    totalRefills: 3,
    pharmacy: 'Farmacia Central',
    cost: 15.50,
    insurance: true
  },
  {
    id: 'rx-002',
    medicationName: 'Omeprazol 20mg',
    dosage: '20mg',
    frequency: 'Una vez al día',
    duration: '30 días',
    instructions: 'Tomar 30 minutos antes del desayuno',
    doctor: 'Dr. Carlos López',
    prescribedDate: '2024-01-10',
    expiryDate: '2024-07-10',
    status: 'active',
    refillsRemaining: 1,
    totalRefills: 2,
    cost: 28.75,
    insurance: true
  },
  {
    id: 'rx-003',
    medicationName: 'Vitamina D3 1000 UI',
    dosage: '1000 UI',
    frequency: 'Una vez al día',
    duration: '90 días',
    instructions: 'Tomar con una comida que contenga grasa',
    doctor: 'Dr. Ana Mendoza',
    prescribedDate: '2023-12-20',
    expiryDate: '2024-06-20',
    status: 'expired',
    refillsRemaining: 0,
    totalRefills: 1,
    cost: 12.30,
    insurance: false
  }
];

const mockPharmacies: Pharmacy[] = [
  {
    id: 'ph-001',
    name: 'Farmacia Central',
    address: 'Calle Principal 123, Centro',
    phone: '+34 912 345 678',
    distance: 0.8,
    rating: 4.8,
    isOpen: true,
    deliveryAvailable: true
  },
  {
    id: 'ph-002', 
    name: 'Farmacia del Sol',
    address: 'Avenida del Sol 456, Norte',
    phone: '+34 912 345 679',
    distance: 1.2,
    rating: 4.6,
    isOpen: true,
    deliveryAvailable: false
  },
  {
    id: 'ph-003',
    name: 'Farmacia 24h',
    address: 'Plaza Mayor 789, Centro',
    phone: '+34 912 345 680',
    distance: 2.1,
    rating: 4.5,
    isOpen: true,
    deliveryAvailable: true
  }
];

export function DigitalPrescriptions() {
  const [selectedTab, setSelectedTab] = useState('prescriptions');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);

  const filteredPrescriptions = mockPrescriptions.filter(prescription => {
    const matchesSearch = prescription.medicationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || prescription.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const requestRefill = (prescriptionId: string) => {
    // Lógica para solicitar renovación
    console.log('Solicitando renovación para:', prescriptionId);
  };

  const downloadPrescription = (prescriptionId: string) => {
    // Lógica para descargar receta
    console.log('Descargando receta:', prescriptionId);
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Recetas Digitales</h1>
          <p className="text-muted-foreground">
            Gestiona tus prescripciones médicas de forma digital
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <QrCode className="h-4 w-4 mr-2" />
            Escanear QR
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Exportar Todo
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="prescriptions">Mis Recetas</TabsTrigger>
          <TabsTrigger value="pharmacies">Farmacias</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
        </TabsList>

        <TabsContent value="prescriptions" className="space-y-6">
          {/* Filtros y búsqueda */}
          <Card>
            <CardHeader>
              <CardTitle>Filtros y Búsqueda</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Buscar medicamento o doctor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">Todos los estados</option>
                  <option value="active">Activas</option>
                  <option value="expired">Expiradas</option>
                  <option value="completed">Completadas</option>
                  <option value="cancelled">Canceladas</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Lista de recetas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrescriptions.map((prescription) => (
              <Card key={prescription.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <Pill className="h-5 w-5 text-blue-600" />
                        {prescription.medicationName}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Prescrito por {prescription.doctor}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(prescription.status)}>
                      {prescription.status === 'active' && 'Activa'}
                      {prescription.status === 'expired' && 'Expirada'}
                      {prescription.status === 'completed' && 'Completada'}
                      {prescription.status === 'cancelled' && 'Cancelada'}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Dosis</p>
                      <p className="font-medium">{prescription.dosage}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Frecuencia</p>
                      <p className="font-medium">{prescription.frequency}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Duración</p>
                      <p className="font-medium">{prescription.duration}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Renovaciones</p>
                      <p className="font-medium">{prescription.refillsRemaining}/{prescription.totalRefills}</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-blue-900">Instrucciones:</p>
                    <p className="text-sm text-blue-800">{prescription.instructions}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Expira: {new Date(prescription.expiryDate).toLocaleDateString()}
                    </div>
                    {prescription.cost && (
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">${prescription.cost}</span>
                        {prescription.insurance && (
                          <Badge variant="outline" className="text-xs">Seguro</Badge>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => downloadPrescription(prescription.id)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Descargar
                    </Button>
                    
                    {prescription.status === 'active' && prescription.refillsRemaining > 0 && (
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => requestRefill(prescription.id)}
                      >
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Renovar
                      </Button>
                    )}
                  </div>

                  {prescription.status === 'expired' && (
                    <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded-lg">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm text-yellow-800">
                        Receta expirada - Contacta a tu médico
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pharmacies" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Farmacias Cercanas</CardTitle>
              <CardDescription>
                Encuentra farmacias cerca de ti y verifica disponibilidad
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPharmacies.map((pharmacy) => (
                  <div key={pharmacy.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{pharmacy.name}</h3>
                        <Badge variant={pharmacy.isOpen ? "default" : "secondary"}>
                          {pharmacy.isOpen ? 'Abierta' : 'Cerrada'}
                        </Badge>
                        {pharmacy.deliveryAvailable && (
                          <Badge variant="outline">Delivery</Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {pharmacy.distance} km • {pharmacy.address}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {pharmacy.phone}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1 mt-1">
                        <div className="flex text-yellow-400">
                          {'★'.repeat(Math.floor(pharmacy.rating))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {pharmacy.rating}/5.0
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Ver Disponibilidad
                      </Button>
                      <Button size="sm">
                        Seleccionar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Medicamentos</CardTitle>
              <CardDescription>
                Registro completo de todas tus prescripciones anteriores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Pill className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Historial en desarrollo</h3>
                <p className="text-muted-foreground">
                  Esta sección mostrará el historial completo de medicamentos
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}