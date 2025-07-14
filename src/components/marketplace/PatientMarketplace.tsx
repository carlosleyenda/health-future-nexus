import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Star, MapPin, Clock, DollarSign, Search, Filter, 
  Calendar, MessageCircle, Video, Stethoscope,
  Shield, Award, Globe, Heart
} from 'lucide-react';

const mockDoctors = [
  {
    id: '1',
    name: 'Dr. María González',
    specialty: 'Cardiología',
    rating: 4.9,
    reviews: 1247,
    experience: 15,
    location: 'Madrid, España',
    price: 85,
    nextAvailable: 'Hoy 14:30',
    consultationType: ['Video', 'Presencial'],
    languages: ['Español', 'Inglés'],
    verified: true,
    responseTime: '< 5 min',
    image: '/api/placeholder/150/150'
  },
  {
    id: '2',
    name: 'Dr. Carlos Ruiz',
    specialty: 'Neurología',
    rating: 4.8,
    reviews: 892,
    experience: 12,
    location: 'Barcelona, España',
    price: 95,
    nextAvailable: 'Mañana 09:00',
    consultationType: ['Video', 'Chat'],
    languages: ['Español', 'Francés'],
    verified: true,
    responseTime: '< 10 min',
    image: '/api/placeholder/150/150'
  },
  {
    id: '3',
    name: 'Dra. Ana Martín',
    specialty: 'Dermatología',
    rating: 4.7,
    reviews: 634,
    experience: 8,
    location: 'Valencia, España',
    price: 70,
    nextAvailable: 'Hoy 16:00',
    consultationType: ['Video', 'Presencial', 'Chat'],
    languages: ['Español'],
    verified: true,
    responseTime: '< 3 min',
    image: '/api/placeholder/150/150'
  }
];

const specialties = [
  'Todas las especialidades',
  'Cardiología',
  'Neurología', 
  'Dermatología',
  'Pediatría',
  'Ginecología',
  'Traumatología',
  'Psiquiatría',
  'Endocrinología',
  'Medicina General'
];

const urgentSpecialties = [
  { name: 'Urgencias', icon: Heart, description: 'Atención inmediata' },
  { name: 'Medicina General', icon: Stethoscope, description: 'Consulta general' },
  { name: 'Pediatría', icon: Shield, description: 'Cuidado infantil' },
  { name: 'Psicología', icon: MessageCircle, description: 'Salud mental' }
];

export default function PatientMarketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('Todas las especialidades');
  const [consultationType, setConsultationType] = useState('Todos');

  const filteredDoctors = mockDoctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'Todas las especialidades' || 
                            doctor.specialty === selectedSpecialty;
    const matchesType = consultationType === 'Todos' || 
                       doctor.consultationType.includes(consultationType);
    return matchesSearch && matchesSpecialty && matchesType;
  });

  const handleBookConsultation = (doctorId: string) => {
    console.log(`Reservando consulta con doctor ${doctorId}`);
  };

  const handleSpecialtyRequest = (specialty: string) => {
    console.log(`Solicitando especialista en ${specialty}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-4">
            <h1 className="text-3xl lg:text-4xl font-bold">
              Encuentra tu Doctor Ideal
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Conecta con especialistas verificados para consultas inmediatas o programadas
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Access - Urgencias */}
        <Card className="mb-8 bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-700 flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Consulta Urgente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {urgentSpecialties.map((spec) => (
                <Button
                  key={spec.name}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-red-50 border-red-200"
                  onClick={() => handleSpecialtyRequest(spec.name)}
                >
                  <spec.icon className="h-6 w-6 text-red-600" />
                  <span className="font-medium text-sm">{spec.name}</span>
                  <span className="text-xs text-muted-foreground">{spec.description}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Buscar por nombre, especialidad o síntoma..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger className="w-full lg:w-64 h-12">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map(specialty => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={consultationType} onValueChange={setConsultationType}>
                <SelectTrigger className="w-full lg:w-48 h-12">
                  <Video className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos">Todos los tipos</SelectItem>
                  <SelectItem value="Video">Video consulta</SelectItem>
                  <SelectItem value="Presencial">Presencial</SelectItem>
                  <SelectItem value="Chat">Chat médico</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Doctores Disponibles */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Doctores Disponibles ({filteredDoctors.length})
            </h2>
            <Badge className="bg-green-100 text-green-800">
              {filteredDoctors.filter(d => d.nextAvailable.includes('Hoy')).length} disponibles hoy
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <Card key={doctor.id} className="hover:shadow-lg transition-all duration-300 border hover:border-blue-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
                      />
                      {doctor.verified && (
                        <Award className="absolute -bottom-1 -right-1 h-5 w-5 text-blue-500 bg-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg text-gray-900 mb-1">
                        {doctor.name}
                      </CardTitle>
                      <p className="text-blue-600 font-medium mb-2">{doctor.specialty}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-medium text-gray-900">{doctor.rating}</span>
                          <span className="text-gray-500 text-sm">({doctor.reviews})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Próxima cita:</span>
                      <Badge 
                        className={`${
                          doctor.nextAvailable.includes('Hoy') 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {doctor.nextAvailable}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Responde en:</span>
                      <span className="text-green-600 font-medium">{doctor.responseTime}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Ubicación:</span>
                      <span className="text-gray-800">{doctor.location.split(',')[0]}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {doctor.consultationType.map((type) => (
                      <Badge key={type} variant="outline" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <div className="text-xl font-bold text-gray-900">${doctor.price}</div>
                      <div className="text-sm text-gray-500">por consulta</div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => handleBookConsultation(doctor.id)}
                      >
                        <Calendar className="h-4 w-4 mr-1" />
                        Agendar
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleBookConsultation(doctor.id)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Video className="h-4 w-4 mr-1" />
                        Consultar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Solicitar Especialista */}
        <Card className="mt-12 bg-gradient-to-r from-purple-50 to-indigo-50">
          <CardContent className="p-8 text-center">
            <div className="max-w-2xl mx-auto space-y-4">
              <Globe className="h-12 w-12 text-purple-600 mx-auto" />
              <h3 className="text-2xl font-bold text-gray-900">
                ¿No encuentras el especialista que necesitas?
              </h3>
              <p className="text-gray-600">
                Solicita una consulta con cualquier especialidad médica. 
                Te conectaremos con el mejor doctor disponible.
              </p>
              <Button 
                className="bg-purple-600 hover:bg-purple-700 px-8 py-3"
                onClick={() => handleSpecialtyRequest('Solicitud personalizada')}
              >
                Solicitar Especialista
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}