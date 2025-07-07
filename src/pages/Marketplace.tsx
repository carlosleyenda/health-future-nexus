import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Star, MapPin, Clock, DollarSign, TrendingUp, Users, 
  Award, Verified, Search, Filter, SortAsc 
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
    earnings: 284750,
    patients: 890,
    availability: 'Disponible ahora',
    languages: ['Español', 'Inglés'],
    verified: true,
    topPerformer: true,
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
    earnings: 312450,
    patients: 654,
    availability: '15 min',
    languages: ['Español', 'Francés'],
    verified: true,
    topPerformer: true,
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
    earnings: 198350,
    patients: 423,
    availability: 'Mañana 9:00',
    languages: ['Español'],
    verified: true,
    topPerformer: false,
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
  'Endocrinología'
];

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('Todas las especialidades');
  const [sortBy, setSortBy] = useState('rating');
  const [doctors] = useState(mockDoctors);

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'Todas las especialidades' || 
                            doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    switch (sortBy) {
      case 'rating': return b.rating - a.rating;
      case 'price': return a.price - b.price;
      case 'earnings': return b.earnings - a.earnings;
      case 'experience': return b.experience - a.experience;
      default: return 0;
    }
  });

  const handleBookConsultation = (doctorId: string) => {
    console.log(`Booking consultation with doctor ${doctorId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold">
              Marketplace Médico Elite
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Conecta con los mejores doctores del mundo. Ganancia promedio: <span className="font-bold text-yellow-300">$284,750/año</span>
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="bg-white/10 px-4 py-2 rounded-full">
                <span className="font-semibold">15,000+</span> Doctores Elite
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-full">
                <span className="font-semibold">98.7%</span> Satisfacción
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-full">
                <span className="font-semibold">$2.1B+</span> Ingresos generados
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Buscar doctores, especialidades..."
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
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-48 h-12">
                  <SortAsc className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Mejor calificados</SelectItem>
                  <SelectItem value="price">Precio menor</SelectItem>
                  <SelectItem value="earnings">Mayor ganancia</SelectItem>
                  <SelectItem value="experience">Más experiencia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Top Performers Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Award className="h-8 w-8 text-yellow-500" />
            <h2 className="text-3xl font-bold text-gray-900">Top Performers - Elite Revenue</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedDoctors.filter(doctor => doctor.topPerformer).map((doctor) => (
              <Card key={doctor.id} className="relative overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-amber-50">
                <div className="absolute top-0 right-0 bg-gradient-to-l from-yellow-500 to-amber-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                  TOP EARNER
                </div>
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-16 h-16 rounded-full object-cover border-3 border-yellow-400"
                      />
                      {doctor.verified && (
                        <Verified className="absolute -bottom-1 -right-1 h-6 w-6 text-blue-500 bg-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl text-gray-900 mb-1">
                        {doctor.name}
                      </CardTitle>
                      <p className="text-purple-600 font-semibold">{doctor.specialty}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-bold text-gray-900">{doctor.rating}</span>
                          <span className="text-gray-500 text-sm">({doctor.reviews})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-green-600">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-bold">${doctor.earnings.toLocaleString()}/año</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-600">
                      <Users className="h-4 w-4" />
                      <span>{doctor.patients} pacientes</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{doctor.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{doctor.experience} años exp.</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">${doctor.price}</div>
                      <div className="text-sm text-gray-500">por consulta</div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        className={`mb-2 ${
                          doctor.availability === 'Disponible ahora' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {doctor.availability}
                      </Badge>
                      <Button 
                        onClick={() => handleBookConsultation(doctor.id)}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      >
                        Consultar ahora
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Doctors Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Todos los Doctores ({filteredDoctors.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedDoctors.map((doctor) => (
              <Card key={doctor.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      {doctor.verified && (
                        <Verified className="absolute -bottom-1 -right-1 h-5 w-5 text-blue-500 bg-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg text-gray-900 mb-1">
                        {doctor.name}
                      </CardTitle>
                      <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                      <div className="flex items-center gap-2 mt-2">
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
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-green-600">
                      <TrendingUp className="h-4 w-4" />
                      <span>${(doctor.earnings/1000).toFixed(0)}K/año</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-600">
                      <Users className="h-4 w-4" />
                      <span>{doctor.patients} pacientes</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{doctor.location.split(',')[0]}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{doctor.experience}a exp.</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <div className="text-xl font-bold text-gray-900">${doctor.price}</div>
                      <div className="text-xs text-gray-500">por consulta</div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        className={`mb-2 text-xs ${
                          doctor.availability === 'Disponible ahora' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {doctor.availability}
                      </Badge>
                      <Button 
                        onClick={() => handleBookConsultation(doctor.id)}
                        size="sm"
                        className="w-full"
                      >
                        Consultar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">
            ¿Eres Doctor? Únete al Marketplace #1
          </h3>
          <p className="text-xl mb-6 text-purple-100">
            Genera hasta <span className="font-bold text-yellow-300">$500K+ anuales</span> con nuestra plataforma
          </p>
          <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
            Aplicar como Doctor Elite
          </Button>
        </div>
      </div>
    </div>
  );
}