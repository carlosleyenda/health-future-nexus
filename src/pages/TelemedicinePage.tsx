import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Video, 
  Calendar, 
  Clock, 
  Users, 
  Shield, 
  Star,
  MapPin,
  Phone,
  Heart,
  Stethoscope,
  Activity,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRegionalSettings } from '@/hooks/useRegionalSettings';
import { DemoDataService } from '@/services/demo/demoDataService';
import CountrySelector from '@/components/regional/CountrySelector';
import AppointmentBooking from '@/components/appointments/AppointmentBooking';

export default function TelemedicinePage() {
  const navigate = useNavigate();
  const { selectedCountry, setCountry, getLocalizedPrice, emergencyNumber } = useRegionalSettings();
  const [showBooking, setShowBooking] = useState(false);
  
  const countryDoctors = DemoDataService.getDoctorsByCountry(selectedCountry);
  const emergencyContacts = DemoDataService.getEmergencyContacts(selectedCountry);

  const services = [
    {
      icon: Video,
      title: 'Consulta Virtual',
      description: 'Videoconsulta en tiempo real con médicos certificados',
      features: ['HD Video & Audio', 'Compartir archivos', 'Recetas digitales'],
      price: getLocalizedPrice(50)
    },
    {
      icon: Calendar,
      title: 'Cita Rápida',
      description: 'Agenda y confirma tu cita en menos de 2 minutos',
      features: ['Disponibilidad inmediata', 'Confirmación automática', 'Recordatorios'],
      price: getLocalizedPrice(30)
    },
    {
      icon: Heart,
      title: 'Seguimiento',
      description: 'Monitoreo continuo y seguimiento personalizado',
      features: ['Historial completo', 'Alertas automáticas', 'Reportes'],
      price: getLocalizedPrice(20)
    }
  ];

  const countryStats = {
    peru: { doctors: 45, patients: '12,500+', rating: 4.7 },
    chile: { doctors: 38, patients: '8,200+', rating: 4.8 },
    colombia: { doctors: 52, patients: '15,800+', rating: 4.6 },
    venezuela: { doctors: 28, patients: '6,400+', rating: 4.5 }
  };

  const currentStats = countryStats[selectedCountry as keyof typeof countryStats] || countryStats.peru;

  if (showBooking) {
    return (
      <div className="min-h-screen bg-gradient-subtle py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => setShowBooking(false)}
              className="mb-4"
            >
              ← Volver a Telemedicina
            </Button>
          </div>
          <AppointmentBooking onClose={() => setShowBooking(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <section className="py-16 bg-gradient-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl lg:text-5xl font-bold mb-6">
              Telemedicina en América Latina
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Conecta con médicos certificados desde la comodidad de tu hogar. 
              Atención médica de calidad sin fronteras.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Selecciona tu País</h3>
              <CountrySelector
                selectedCountry={selectedCountry}
                onCountryChange={setCountry}
                showEmergencyInfo={true}
              />
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Estadísticas en tu País</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{currentStats.doctors}</div>
                  <div className="text-sm opacity-80">Médicos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{currentStats.patients}</div>
                  <div className="text-sm opacity-80">Pacientes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{currentStats.rating}</div>
                  <div className="text-sm opacity-80">Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-professional mb-4">
              Servicios de Telemedicina
            </h2>
            <p className="text-lg text-muted-foreground">
              Elige el servicio que mejor se adapte a tus necesidades
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="border-0 shadow-soft hover:shadow-medical transition-all">
                <CardHeader>
                  <div className="w-16 h-16 bg-medical-lighter rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <service.icon className="h-8 w-8 text-medical-primary" />
                  </div>
                  <CardTitle className="text-center text-xl">
                    {service.title}
                  </CardTitle>
                  <div className="text-center">
                    <span className="text-2xl font-bold text-medical-primary">
                      {service.price.symbol} {service.price.amount}
                    </span>
                    <span className="text-sm text-muted-foreground ml-2">
                      {service.price.currency}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full bg-medical-primary hover:bg-medical-dark"
                    onClick={() => setShowBooking(true)}
                  >
                    Seleccionar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Available Doctors */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-professional mb-4">
              Médicos Disponibles en {selectedCountry.charAt(0).toUpperCase() + selectedCountry.slice(1)}
            </h2>
            <p className="text-lg text-muted-foreground">
              {countryDoctors.length} médicos certificados listos para atenderte
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {countryDoctors.map((doctor, index) => (
              <Card key={index} className="border-0 shadow-soft hover:shadow-medical transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {doctor.name}
                      </CardTitle>
                      <p className="text-medical-primary font-medium">
                        {doctor.specialty}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {doctor.experience} años de experiencia
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {doctor.available ? 'Disponible' : 'Ocupado'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{doctor.rating}</span>
                    </div>
                    <div className="flex gap-1">
                      {doctor.languages.map((lang, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {doctor.bio}
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Consulta:</span>
                      <span className="font-bold text-medical-primary">
                        {getLocalizedPrice(doctor.consultationFee / 100).symbol} {getLocalizedPrice(doctor.consultationFee / 100).amount}
                      </span>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => setShowBooking(true)}
                      disabled={!doctor.available}
                    >
                      {doctor.available ? 'Agendar Cita' : 'No Disponible'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-soft border border-red-200">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-professional">
                    ¿Emergencia Médica?
                  </h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Si tienes una emergencia médica, contacta inmediatamente a los servicios de emergencia de tu país.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-red-600 text-white">
                      Emergencias: {emergencyContacts.ambulance}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Clínicas Recomendadas:</h4>
                    {emergencyContacts.clinics.map((clinic, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm font-medium">{clinic.name}</span>
                        <span className="text-sm text-muted-foreground">{clinic.phone}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-6xl mb-4">🚨</div>
                <Button 
                  size="lg" 
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => window.open(`tel:${emergencyContacts.ambulance}`, '_self')}
                >
                  Llamar Emergencia
                  <Phone className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold mb-6">
            ¿Listo para tu Primera Consulta Virtual?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Más de {currentStats.patients} pacientes ya confían en nuestros servicios de telemedicina.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-medical-primary hover:bg-gray-100"
            onClick={() => setShowBooking(true)}
          >
            Agendar Consulta Ahora
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}