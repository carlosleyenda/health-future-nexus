
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, Search, Star, MapPin, Calendar, Clock, 
  Languages, Shield, Plane, Users, MessageSquare
} from 'lucide-react';
import { globalHealthcareService } from '@/services/global-marketplace/globalHealthcareService';

export default function GlobalHealthcareDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [activeTab, setActiveTab] = useState('doctors');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Globe className="h-8 w-8 text-blue-600" />
            Mercado Global de Salud
          </h1>
          <p className="text-muted-foreground">Acceso a profesionales médicos internacionales</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Globe className="h-3 w-3" />
            195 países
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            25,000+ médicos
          </Badge>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar médicos, procedimientos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger>
                <SelectValue placeholder="País" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">Estados Unidos</SelectItem>
                <SelectItem value="ca">Canadá</SelectItem>
                <SelectItem value="uk">Reino Unido</SelectItem>
                <SelectItem value="de">Alemania</SelectItem>
                <SelectItem value="sg">Singapur</SelectItem>
                <SelectItem value="jp">Japón</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger>
                <SelectValue placeholder="Especialidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cardiology">Cardiología</SelectItem>
                <SelectItem value="oncology">Oncología</SelectItem>
                <SelectItem value="neurology">Neurología</SelectItem>
                <SelectItem value="orthopedics">Traumatología</SelectItem>
                <SelectItem value="dermatology">Dermatología</SelectItem>
              </SelectContent>
            </Select>
            <Button className="w-full">
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="doctors">Médicos Globales</TabsTrigger>
          <TabsTrigger value="tourism">Turismo Médico</TabsTrigger>
          <TabsTrigger value="exchange">Intercambio Especialistas</TabsTrigger>
          <TabsTrigger value="consultations">Consultas Globales</TabsTrigger>
        </TabsList>

        <TabsContent value="doctors" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Mock Doctor Cards */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">Dr. John Smith</CardTitle>
                      <p className="text-sm text-muted-foreground">Cardiólogo</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">4.9</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>Nueva York, Estados Unidos</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Languages className="h-4 w-4 text-muted-foreground" />
                    <span>Inglés, Español</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="text-green-600">Licencia Verificada</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">$150/consulta</span>
                    <Badge variant="outline">Disponible</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      Agendar
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tourism" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Mock Tourism Packages */}
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Plane className="h-5 w-5 text-blue-600" />
                        Cirugía Cardíaca en Singapur
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">Hospital Mount Elizabeth</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">4.8</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">$25,000</span>
                    <Badge variant="secondary">7-10 días</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Incluye:</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Cirugía completa</li>
                      <li>• 5 noches hospitalización</li>
                      <li>• Alojamiento acompañante</li>
                      <li>• Traslados aeropuerto</li>
                      <li>• Seguimiento post-operatorio</li>
                    </ul>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Languages className="h-4 w-4 text-muted-foreground" />
                    <span>Servicio en Español</span>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">
                      Solicitar Información
                    </Button>
                    <Button variant="outline">
                      Comparar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="exchange" className="space-y-4">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Solicitar Intercambio de Especialistas</CardTitle>
                <p className="text-muted-foreground">
                  Conecta con especialistas internacionales para casos complejos
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Tipo de Intercambio</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consultation">Consulta</SelectItem>
                        <SelectItem value="second_opinion">Segunda Opinión</SelectItem>
                        <SelectItem value="collaboration">Colaboración</SelectItem>
                        <SelectItem value="referral">Referencia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Urgencia</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar urgencia" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emergency">Emergencia</SelectItem>
                        <SelectItem value="high">Alta</SelectItem>
                        <SelectItem value="medium">Media</SelectItem>
                        <SelectItem value="low">Baja</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Descripción del Caso</label>
                  <textarea 
                    className="w-full mt-1 p-3 border rounded-md"
                    rows={4}
                    placeholder="Describe el caso médico y el tipo de consulta necesaria..."
                  />
                </div>
                <Button className="w-full">
                  Enviar Solicitud de Intercambio
                </Button>
              </CardContent>
            </Card>

            {/* Active Exchanges */}
            <Card>
              <CardHeader>
                <CardTitle>Intercambios Activos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Caso Neurológico Complejo</p>
                        <p className="text-sm text-muted-foreground">
                          Dr. Sarah Johnson - Mayo Clinic, EE.UU.
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">En Progreso</Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          <Clock className="h-3 w-3 inline mr-1" />
                          Programado para mañana
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="consultations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Consultas Globales Programadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Dr. Maria Rodriguez</p>
                        <p className="text-sm text-muted-foreground">Dermatóloga - Barcelona, España</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            15 Jun, 2024
                          </span>
                          <span className="text-sm flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            14:00 (UTC-5)
                          </span>
                          <Badge variant="outline">Video</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Languages className="h-4 w-4 mr-1" />
                        Traducción
                      </Button>
                      <Button size="sm">
                        Unirse
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
