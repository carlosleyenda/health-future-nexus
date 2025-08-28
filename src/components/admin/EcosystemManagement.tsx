import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Building2, 
  Pill, 
  Hospital, 
  Truck, 
  Ambulance,
  Users,
  MapPin,
  Phone,
  Mail,
  Star,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Activity
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

type EntityType = 'companies' | 'pharmacies' | 'hospitals' | 'deliveries' | 'ambulances';

interface EcosystemEntity {
  id: string;
  name: string;
  type: string;
  location: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  rating: number;
  contact: {
    phone: string;
    email: string;
  };
  services: string[];
  lastActivity: string;
  metrics: {
    totalOrders?: number;
    completedOrders?: number;
    averageResponse?: string;
    revenue?: number;
  };
}

export default function EcosystemManagement() {
  const [activeEntity, setActiveEntity] = useState<EntityType>('companies');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data para diferentes entidades
  const entities: Record<EntityType, EcosystemEntity[]> = {
    companies: [
      {
        id: '1',
        name: 'MediCorp Healthcare',
        type: 'Empresa Farmacéutica',
        location: 'CDMX',
        status: 'active',
        rating: 4.8,
        contact: { phone: '+52 55 1234 5678', email: 'contact@medicorp.mx' },
        services: ['Medicamentos', 'Dispositivos Médicos', 'Consultoría'],
        lastActivity: '2024-01-15',
        metrics: { totalOrders: 2450, revenue: 850000 }
      },
      {
        id: '2',
        name: 'HealthTech Solutions',
        type: 'Tecnología Médica',
        location: 'Guadalajara',
        status: 'active',
        rating: 4.6,
        contact: { phone: '+52 33 9876 5432', email: 'info@healthtech.mx' },
        services: ['Software Médico', 'Telemedicina', 'IoT'],
        lastActivity: '2024-01-14',
        metrics: { totalOrders: 1200, revenue: 650000 }
      }
    ],
    pharmacies: [
      {
        id: '1',
        name: 'Farmacia del Ahorro Centro',
        type: 'Farmacia Partner',
        location: 'Centro CDMX',
        status: 'active',
        rating: 4.5,
        contact: { phone: '+52 55 2345 6789', email: 'centro@farmacia.mx' },
        services: ['Medicamentos', 'Entrega a Domicilio', 'Consulta Farmacéutica'],
        lastActivity: '2024-01-15',
        metrics: { totalOrders: 5600, completedOrders: 5400, averageResponse: '15 min' }
      },
      {
        id: '2',
        name: 'Benavides Express',
        type: 'Cadena Farmacéutica',
        location: 'Polanco',
        status: 'active',
        rating: 4.7,
        contact: { phone: '+52 55 3456 7890', email: 'polanco@benavides.mx' },
        services: ['Medicamentos', 'Productos de Salud', '24/7'],
        lastActivity: '2024-01-15',
        metrics: { totalOrders: 8900, completedOrders: 8750, averageResponse: '12 min' }
      }
    ],
    hospitals: [
      {
        id: '1',
        name: 'Hospital ABC Santa Fe',
        type: 'Hospital Privado',
        location: 'Santa Fe, CDMX',
        status: 'active',
        rating: 4.9,
        contact: { phone: '+52 55 1230 4567', email: 'contacto@abc.mx' },
        services: ['Emergencias', 'Cirugías', 'Especialidades', 'UCI'],
        lastActivity: '2024-01-15',
        metrics: { totalOrders: 1200, completedOrders: 1180, averageResponse: '5 min' }
      },
      {
        id: '2',
        name: 'Hospital Ángeles Pedregal',
        type: 'Hospital de Especialidades',
        location: 'Pedregal, CDMX',
        status: 'active',
        rating: 4.8,
        contact: { phone: '+52 55 5678 9012', email: 'info@angeles.mx' },
        services: ['Cardiología', 'Neurología', 'Oncología', 'Pediatría'],
        lastActivity: '2024-01-15',
        metrics: { totalOrders: 950, completedOrders: 940, averageResponse: '8 min' }
      }
    ],
    deliveries: [
      {
        id: '1',
        name: 'MedExpress Delivery',
        type: 'Servicio de Entrega',
        location: 'CDMX - Zona Norte',
        status: 'active',
        rating: 4.6,
        contact: { phone: '+52 55 4567 8901', email: 'dispatch@medexpress.mx' },
        services: ['Entrega Medicamentos', 'Urgente', 'Programado', 'Refrigerado'],
        lastActivity: '2024-01-15',
        metrics: { totalOrders: 3400, completedOrders: 3250, averageResponse: '25 min' }
      },
      {
        id: '2',
        name: 'Pharma Logistics',
        type: 'Logística Farmacéutica',
        location: 'CDMX - Zona Sur',
        status: 'active',
        rating: 4.4,
        contact: { phone: '+52 55 6789 0123', email: 'ops@pharmalog.mx' },
        services: ['Cadena de Frío', 'Tracking GPS', 'Entrega Certificada'],
        lastActivity: '2024-01-15',
        metrics: { totalOrders: 2100, completedOrders: 2000, averageResponse: '30 min' }
      }
    ],
    ambulances: [
      {
        id: '1',
        name: 'Cruz Roja Mexicana',
        type: 'Servicio de Emergencia',
        location: 'CDMX - Cobertura Total',
        status: 'active',
        rating: 4.9,
        contact: { phone: '065', email: 'emergencias@cruzroja.mx' },
        services: ['Emergencias', 'Traslados', 'Soporte Vital', 'UTI Móvil'],
        lastActivity: '2024-01-15',
        metrics: { totalOrders: 890, completedOrders: 885, averageResponse: '8 min' }
      },
      {
        id: '2',
        name: 'Ambulancias Plus',
        type: 'Servicio Privado',
        location: 'CDMX - Zona Metropolitana',
        status: 'active',
        rating: 4.7,
        contact: { phone: '+52 55 9999 0000', email: 'servicios@ambulanciaplus.mx' },
        services: ['Traslados Programados', 'Emergencias', 'Eventos'],
        lastActivity: '2024-01-15',
        metrics: { totalOrders: 450, completedOrders: 445, averageResponse: '12 min' }
      }
    ]
  };

  const getEntityIcon = (entityType: EntityType) => {
    const icons = {
      companies: Building2,
      pharmacies: Pill,
      hospitals: Hospital,
      deliveries: Truck,
      ambulances: Ambulance
    };
    return icons[entityType];
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: { color: 'text-green-700 bg-green-100', icon: CheckCircle },
      inactive: { color: 'text-gray-700 bg-gray-100', icon: Clock },
      pending: { color: 'text-yellow-700 bg-yellow-100', icon: Clock },
      suspended: { color: 'text-red-700 bg-red-100', icon: AlertTriangle }
    };
    const variant = variants[status as keyof typeof variants] || variants.inactive;
    const IconComponent = variant.icon;
    
    return (
      <Badge className={variant.color}>
        <IconComponent className="h-3 w-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const filteredEntities = entities[activeEntity].filter(entity => {
    const matchesSearch = entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entity.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entity.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || entity.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const entityStats = {
    companies: { 
      total: entities.companies.length, 
      active: entities.companies.filter(e => e.status === 'active').length,
      title: 'Empresas Afiliadas',
      description: 'Farmacéuticas y tech partners'
    },
    pharmacies: { 
      total: entities.pharmacies.length, 
      active: entities.pharmacies.filter(e => e.status === 'active').length,
      title: 'Farmacias Partner',
      description: 'Red de farmacias asociadas'
    },
    hospitals: { 
      total: entities.hospitals.length, 
      active: entities.hospitals.filter(e => e.status === 'active').length,
      title: 'Hospitales y Clínicas',
      description: 'Instituciones médicas'
    },
    deliveries: { 
      total: entities.deliveries.length, 
      active: entities.deliveries.filter(e => e.status === 'active').length,
      title: 'Servicios de Entrega',
      description: 'Logística y distribución'
    },
    ambulances: { 
      total: entities.ambulances.length, 
      active: entities.ambulances.filter(e => e.status === 'active').length,
      title: 'Servicios de Ambulancia',
      description: 'Emergencias y traslados'
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {(Object.keys(entityStats) as EntityType[]).map((key) => {
          const stat = entityStats[key];
          const Icon = getEntityIcon(key);
          const isActive = activeEntity === key;
          
          return (
            <Card 
              key={key} 
              className={`cursor-pointer transition-all hover:shadow-md ${isActive ? 'ring-2 ring-primary border-primary' : ''}`}
              onClick={() => setActiveEntity(key)}
            >
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.active}/{stat.total}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${isActive ? 'bg-primary/10' : 'bg-muted'}`}>
                    <Icon className={`h-6 w-6 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Entity Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{entityStats[activeEntity].title}</span>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Agregar {entityStats[activeEntity].title.slice(0, -1)}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar entidades..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="active">Activo</SelectItem>
                <SelectItem value="inactive">Inactivo</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="suspended">Suspendido</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Entities Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Entidad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Tipo/Servicios
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Métricas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Contacto
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-background divide-y divide-border">
                {filteredEntities.map((entity) => (
                  <tr key={entity.id} className="hover:bg-muted/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            {React.createElement(getEntityIcon(activeEntity), { 
                              className: "h-5 w-5 text-primary" 
                            })}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-foreground">
                            {entity.name}
                          </div>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {entity.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-foreground">{entity.type}</div>
                      <div className="text-xs text-muted-foreground">
                        {entity.services.slice(0, 2).join(', ')}
                        {entity.services.length > 2 && '...'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        {getStatusBadge(entity.status)}
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                          {entity.rating}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      <div className="space-y-1">
                        {entity.metrics.totalOrders && (
                          <div>Total: {entity.metrics.totalOrders}</div>
                        )}
                        {entity.metrics.completedOrders && (
                          <div>Completadas: {entity.metrics.completedOrders}</div>
                        )}
                        {entity.metrics.averageResponse && (
                          <div>Respuesta: {entity.metrics.averageResponse}</div>
                        )}
                        {entity.metrics.revenue && (
                          <div>Ingresos: ${entity.metrics.revenue.toLocaleString()}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <Phone className="h-3 w-3 mr-2" />
                          {entity.contact.phone}
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-3 w-3 mr-2" />
                          {entity.contact.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Activity className="h-4 w-4 mr-2" />
                            Ver Actividad
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredEntities.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No se encontraron entidades que coincidan con los filtros.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}