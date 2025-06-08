
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  MapPin, 
  Star, 
  Users, 
  Shield, 
  TrendingUp,
  Calendar,
  DollarSign,
  Globe,
  Plane,
  Heart,
  Award
} from 'lucide-react';
import { 
  useHealthcareProviders,
  usePremiumServices,
  useSearchProviders,
  useBookAppointment,
  useMedicalTourismPackages
} from '@/hooks/useGlobalHealthcare';
import { useAuthStore } from '@/store/auth';

export default function GlobalHealthcareMarketplace() {
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    type: 'all',
    tier: 'all',
    specialty: 'all',
    location: 'all'
  });
  const [selectedTab, setSelectedTab] = useState('providers');

  const { data: providers, isLoading: providersLoading } = useHealthcareProviders(
    selectedFilters.type !== 'all' ? selectedFilters : undefined
  );
  const { data: premiumServices } = usePremiumServices();
  const { data: searchResults } = useSearchProviders(searchQuery, selectedFilters);
  const { data: tourismPackages } = useMedicalTourismPackages();
  const { mutate: bookAppointment } = useBookAppointment();

  const displayProviders = searchQuery.length > 2 ? searchResults : providers;

  const handleBookAppointment = (providerId: string, serviceId: string) => {
    if (!user) {
      alert('Por favor inicia sesión para reservar una cita');
      return;
    }

    bookAppointment({
      providerId,
      serviceId,
      patientId: user.id,
      preferredDate: new Date().toISOString(),
      type: 'consultation'
    });
  };

  if (providersLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2">Cargando marketplace global de salud...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Marketplace Global de Servicios de Salud</h2>
          <p className="text-gray-600">
            Accede a los mejores proveedores médicos del mundo
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Globe className="h-4 w-4 mr-2" />
            Explorar por País
          </Button>
          <Button variant="outline" size="sm">
            <Plane className="h-4 w-4 mr-2" />
            Turismo Médico
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <Input
                  placeholder="Buscar proveedores, especialidades, ubicaciones..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button>
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select value={selectedFilters.type} onValueChange={(value) => 
                setSelectedFilters(prev => ({ ...prev, type: value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de Proveedor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los Tipos</SelectItem>
                  <SelectItem value="hospital">Hospitales</SelectItem>
                  <SelectItem value="clinic">Clínicas</SelectItem>
                  <SelectItem value="specialist">Especialistas</SelectItem>
                  <SelectItem value="research_center">Centros de Investigación</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedFilters.tier} onValueChange={(value) => 
                setSelectedFilters(prev => ({ ...prev, tier: value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Nivel de Servicio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los Niveles</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="standard">Estándar</SelectItem>
                  <SelectItem value="basic">Básico</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedFilters.specialty} onValueChange={(value) => 
                setSelectedFilters(prev => ({ ...prev, specialty: value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Especialidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las Especialidades</SelectItem>
                  <SelectItem value="cardiology">Cardiología</SelectItem>
                  <SelectItem value="oncology">Oncología</SelectItem>
                  <SelectItem value="neurology">Neurología</SelectItem>
                  <SelectItem value="orthopedics">Ortopedia</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedFilters.location} onValueChange={(value) => 
                setSelectedFilters(prev => ({ ...prev, location: value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Ubicación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las Ubicaciones</SelectItem>
                  <SelectItem value="usa">Estados Unidos</SelectItem>
                  <SelectItem value="singapore">Singapur</SelectItem>
                  <SelectItem value="germany">Alemania</SelectItem>
                  <SelectItem value="thailand">Tailandia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="providers">Proveedores</TabsTrigger>
          <TabsTrigger value="premium">Servicios Premium</TabsTrigger>
          <TabsTrigger value="tourism">Turismo Médico</TabsTrigger>
          <TabsTrigger value="coordination">Coordinación Global</TabsTrigger>
        </TabsList>

        <TabsContent value="providers" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {displayProviders?.map((provider) => (
              <Card key={provider.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        {provider.name}
                        {provider.tier === 'premium' && (
                          <Badge variant="default" className="ml-2">Premium</Badge>
                        )}
                      </CardTitle>
                      <div className="flex items-center mt-2">
                        <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                        <span className="text-sm text-gray-600">
                          {provider.location.city}, {provider.location.country}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="font-medium">{provider.ratings.overall}</span>
                        <span className="text-gray-500 text-sm ml-1">
                          ({provider.ratings.totalReviews})
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Especialidades:</p>
                      <div className="flex flex-wrap gap-2">
                        {provider.specialties.slice(0, 3).map((specialty, index) => (
                          <Badge key={index} variant="outline">{specialty}</Badge>
                        ))}
                        {provider.specialties.length > 3 && (
                          <Badge variant="outline">+{provider.specialties.length - 3} más</Badge>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Consulta desde:</p>
                        <p className="font-medium">
                          {provider.pricing.currency} ${provider.pricing.consultationFee}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Tiempo de reserva:</p>
                        <p className="font-medium">{provider.availability.bookingLeadTime}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {provider.accreditations.slice(0, 2).map((acc, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          <Award className="h-3 w-3 mr-1" />
                          {acc.name}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleBookAppointment(provider.id, 'consultation')}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Reservar Cita
                      </Button>
                      <Button size="sm" variant="outline">
                        Ver Detalles
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="premium" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {premiumServices?.map((service) => (
              <Card key={service.id} className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{service.name}</CardTitle>
                      <Badge variant="outline" className="mt-2">
                        {service.category.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-purple-600">
                        ${service.pricing.basePrice}
                      </p>
                      <p className="text-sm text-gray-500">{service.pricing.currency}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-600">{service.description}</p>
                    
                    <div>
                      <p className="font-medium mb-2">Incluye:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {service.inclusions.slice(0, 4).map((inclusion, index) => (
                          <li key={index} className="flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            {inclusion}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Duración:</p>
                        <p className="font-medium">{service.duration}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Modalidad:</p>
                        <p className="font-medium capitalize">
                          {service.deliveryMethod.replace('_', ' ')}
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Solicitar Servicio
                      </Button>
                      <Button size="sm" variant="outline">
                        Más Información
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tourism" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {tourismPackages?.map((package_) => (
              <Card key={package_.id} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <Plane className="h-5 w-5 mr-2" />
                        {package_.destination.city}, {package_.destination.country}
                      </CardTitle>
                      <p className="text-gray-600 mt-1">{package_.destination.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium mb-2">Ventajas:</p>
                      <div className="flex flex-wrap gap-2">
                        {package_.destination.advantages.slice(0, 3).map((advantage, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {advantage}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      {package_.packages.slice(0, 2).map((pkg) => (
                        <div key={pkg.id} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{pkg.name}</h4>
                            <div className="text-right">
                              <p className="font-bold text-blue-600">
                                ${pkg.pricing.totalPackageCost.toLocaleString()}
                              </p>
                              <p className="text-sm text-green-600">
                                Ahorro: ${pkg.pricing.potentialSavings.toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{pkg.description}</p>
                          <p className="text-sm text-gray-500 mt-1">Duración: {pkg.duration}</p>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Shield className="h-4 w-4 text-green-500 mr-2" />
                          <span>Soporte 24/7</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-blue-500 mr-2" />
                          <span>Coordinador local</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 text-red-500 mr-2" />
                          <span>Seguimiento médico</span>
                        </div>
                        <div className="flex items-center">
                          <Award className="h-4 w-4 text-purple-500 mr-2" />
                          <span>Hospitales acreditados</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        <Plane className="h-4 w-4 mr-2" />
                        Consultar Paquete
                      </Button>
                      <Button size="sm" variant="outline">
                        Ver Testimonios
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="coordination" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Coordinación Global de Cuidados</CardTitle>
              <p className="text-gray-600">
                Planificación integral de tratamientos con múltiples proveedores internacionales
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      Coordinador Personal
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-2">
                      <li>• Gestión de citas múltiples</li>
                      <li>• Coordinación de viajes</li>
                      <li>• Comunicación con proveedores</li>
                      <li>• Seguimiento continuo</li>
                    </ul>
                    <Button size="sm" className="w-full mt-4">
                      Asignar Coordinador
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Shield className="h-5 w-5 mr-2" />
                      Navegación de Seguros
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-2">
                      <li>• Verificación de cobertura</li>
                      <li>• Autorización previa</li>
                      <li>• Gestión de reclamos</li>
                      <li>• Asistencia en apelaciones</li>
                    </ul>
                    <Button size="sm" className="w-full mt-4">
                      Verificar Cobertura
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Globe className="h-5 w-5 mr-2" />
                      Soporte Cultural
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-2">
                      <li>• Interpretación médica</li>
                      <li>• Consideraciones culturales</li>
                      <li>• Asistencia religiosa</li>
                      <li>• Adaptación dietaria</li>
                    </ul>
                    <Button size="sm" className="w-full mt-4">
                      Solicitar Soporte
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">¿Necesitas coordinación integral?</h4>
                <p className="text-sm text-blue-600 mb-3">
                  Nuestros especialistas pueden crear un plan personalizado que incluya múltiples proveedores, 
                  gestión de seguros y soporte completo durante todo tu tratamiento.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Iniciar Planificación Integral
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
