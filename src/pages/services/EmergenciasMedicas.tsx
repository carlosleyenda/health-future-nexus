import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Ambulance, Clock, MapPin, Heart, AlertTriangle, Shield, Users, Activity, Stethoscope, CheckCircle, Star, Truck, Hospital } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import TopNavigation from '@/components/layout/TopNavigation';

const EmergenciasMedicas = () => {
  const navigate = useNavigate();
  const [emergencyType, setEmergencyType] = useState('medical');

  const emergencyTypes = [
    {
      id: 'medical',
      name: 'Emergencia Médica',
      icon: <Heart className="h-8 w-8" />,
      examples: ['Dolor de pecho', 'Dificultad respiratoria', 'Convulsiones', 'Pérdida de conciencia'],
      responseTime: '8-12 minutos',
      priority: 'ALTA',
      color: 'red'
    },
    {
      id: 'trauma',
      name: 'Trauma y Accidentes',
      icon: <AlertTriangle className="h-8 w-8" />,
      examples: ['Accidentes de tráfico', 'Caídas graves', 'Heridas profundas', 'Fracturas'],
      responseTime: '6-10 minutos',
      priority: 'CRÍTICA',
      color: 'orange'
    },
    {
      id: 'psychological',
      name: 'Crisis Psicológica',
      icon: <Users className="h-8 w-8" />,
      examples: ['Crisis de pánico', 'Ideas suicidas', 'Episodios psicóticos', 'Alteraciones graves'],
      responseTime: '15-20 minutos',
      priority: 'URGENTE',
      color: 'purple'
    }
  ];

  const services = [
    {
      type: 'Ambulancia Básica',
      icon: <Ambulance className="h-8 w-8" />,
      description: 'Transporte médico con soporte vital básico',
      price: '$180.000',
      features: [
        'Técnico en emergencias médicas',
        'Equipos de soporte vital básico',
        'Oxígeno y desfibrilador',
        'Monitoreo de signos vitales',
        'Comunicación con hospital'
      ],
      responseTime: '8-12 min',
      coverage: 'Ciudad'
    },
    {
      type: 'Ambulancia Medicalizada',
      icon: <Hospital className="h-8 w-8" />,
      description: 'Unidad de cuidados intensivos móvil',
      price: '$350.000',
      features: [
        'Médico y enfermero especializado',
        'Ventilador mecánico',
        'Monitor multiparámetros',
        'Medicamentos de emergencia',
        'Capacidad de cirugía menor'
      ],
      responseTime: '10-15 min',
      coverage: 'Metropolitana',
      popular: true
    },
    {
      type: 'Helicóptero Médico',
      icon: <Activity className="h-8 w-8" />,
      description: 'Transporte aéreo para emergencias críticas',
      price: '$2.500.000',
      features: [
        'Equipo médico completo',
        'Acceso a zonas remotas',
        'Transporte ultrarrápido',
        'UCI aérea completa',
        'Coordinación hospitalaria'
      ],
      responseTime: '15-25 min',
      coverage: 'Nacional'
    }
  ];

  const responseProcess = [
    {
      step: 1,
      title: 'Llamada de Emergencia',
      description: 'Marca 123 o usa la app de emergencias',
      time: '< 30 segundos',
      icon: <Phone className="h-6 w-6" />
    },
    {
      step: 2,
      title: 'Evaluación y Despacho',
      description: 'Triaje telefónico y asignación de recursos',
      time: '1-2 minutos',
      icon: <Activity className="h-6 w-6" />
    },
    {
      step: 3,
      title: 'Respuesta en Ruta',
      description: 'Ambulancia en camino con GPS en tiempo real',
      time: '6-15 minutos',
      icon: <Truck className="h-6 w-6" />
    },
    {
      step: 4,
      title: 'Atención Pre-hospitalaria',
      description: 'Estabilización y tratamiento en el lugar',
      time: '10-30 minutos',
      icon: <Stethoscope className="h-6 w-6" />
    },
    {
      step: 5,
      title: 'Transporte y Entrega',
      description: 'Traslado al hospital más apropiado',
      time: '15-45 minutos',
      icon: <Hospital className="h-6 w-6" />
    }
  ];

  const coverage = [
    {
      zone: 'Zona Centro',
      areas: ['Chapinero', 'La Candelaria', 'Santa Fe', 'Teusaquillo'],
      hospitals: 4,
      responseTime: '6-10 min',
      ambulances: 12
    },
    {
      zone: 'Zona Norte',
      areas: ['Usaquén', 'Suba', 'Engativá', 'Barrios Unidos'],
      hospitals: 6,
      responseTime: '8-12 min',
      ambulances: 15
    },
    {
      zone: 'Zona Sur',
      areas: ['Kennedy', 'Bosa', 'Ciudad Bolívar', 'Tunjuelito'],
      hospitals: 5,
      responseTime: '10-15 min',
      ambulances: 10
    },
    {
      zone: 'Zona Oriente',
      areas: ['San Cristóbal', 'Rafael Uribe', 'Usme', 'Sumapaz'],
      hospitals: 3,
      responseTime: '12-18 min',
      ambulances: 8
    }
  ];

  const protocols = [
    {
      category: 'Cardiopulmonar',
      protocols: [
        'Paro cardiorrespiratorio',
        'Infarto agudo de miocardio',
        'Arritmias malignas',
        'Edema pulmonar agudo'
      ],
      certification: 'AHA BLS/ACLS'
    },
    {
      category: 'Trauma',
      protocols: [
        'Politraumatismo',
        'Trauma craneoencefálico',
        'Trauma de tórax',
        'Hemorragias masivas'
      ],
      certification: 'ATLS/PHTLS'
    },
    {
      category: 'Pediátrico',
      protocols: [
        'Paro pediátrico',
        'Crisis asmática severa',
        'Convulsiones febriles',
        'Deshidratación grave'
      ],
      certification: 'PALS'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <TopNavigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Emergencias Médicas
            <span className="text-red-600 block">24/7</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Atención médica de emergencia inmediata. Ambulancias equipadas, personal certificado 
            y respuesta rápida en toda la ciudad las 24 horas del día.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
              <Phone className="h-5 w-5 mr-2" />
              LLAMAR 123
            </Button>
            <Button size="lg" variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
              <MapPin className="h-5 w-5 mr-2" />
              Localizar Ambulancia
            </Button>
          </div>
        </div>
      </section>

      {/* Emergency Contact Banner */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">¿Necesitas Ayuda Inmediata?</h2>
              <p className="text-lg opacity-90">Líneas de emergencia disponibles 24/7</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold">123</div>
                <div className="text-sm opacity-75">Emergencias Generales</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">125</div>
                <div className="text-sm opacity-75">Cruz Roja</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">132</div>
                <div className="text-sm opacity-75">Defensa Civil</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Types */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Tipos de Emergencias que Atendemos
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {emergencyTypes.map((emergency, index) => (
              <Card key={index} className={`h-full hover:shadow-xl transition-shadow border-l-4 ${
                emergency.color === 'red' ? 'border-red-500' : 
                emergency.color === 'orange' ? 'border-orange-500' : 'border-purple-500'
              }`}>
                <CardHeader className="text-center">
                  <div className={`mx-auto mb-4 p-3 rounded-full w-fit ${
                    emergency.color === 'red' ? 'bg-red-100 text-red-600' : 
                    emergency.color === 'orange' ? 'bg-orange-100 text-orange-600' : 'bg-purple-100 text-purple-600'
                  }`}>
                    {emergency.icon}
                  </div>
                  <CardTitle className="text-xl">{emergency.name}</CardTitle>
                  <Badge className={`${
                    emergency.color === 'red' ? 'bg-red-100 text-red-800' : 
                    emergency.color === 'orange' ? 'bg-orange-100 text-orange-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {emergency.priority}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="text-sm font-medium mb-2">Ejemplos:</div>
                    <ul className="space-y-1">
                      {emergency.examples.map((example, i) => (
                        <li key={i} className="text-sm text-slate-600 flex items-center">
                          <AlertTriangle className="h-3 w-3 text-orange-500 mr-2" />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{emergency.responseTime}</div>
                    <div className="text-sm text-slate-500">Tiempo de respuesta</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Servicios de Emergencia Disponibles
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className={`h-full hover:shadow-xl transition-shadow ${service.popular ? 'ring-2 ring-red-500' : ''}`}>
                {service.popular && (
                  <div className="bg-red-500 text-white text-center py-2 text-sm font-medium">
                    MÁS UTILIZADO
                  </div>
                )}
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-red-100 text-red-600 rounded-full w-fit">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl">{service.type}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                  <div className="text-2xl font-bold text-red-600">{service.price}</div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="font-medium">Tiempo:</span>
                      <div className="text-green-600">{service.responseTime}</div>
                    </div>
                    <div>
                      <span className="font-medium">Cobertura:</span>
                      <div className="text-blue-600">{service.coverage}</div>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={service.popular ? "default" : "outline"}>
                    Solicitar Servicio
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Response Process */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Proceso de Respuesta de Emergencia
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {responseProcess.map((step, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 p-4 bg-red-100 text-red-600 rounded-full w-fit">
                  {step.icon}
                </div>
                <div className="text-sm font-medium text-red-600 mb-2">
                  PASO {step.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-slate-600 text-sm mb-2">{step.description}</p>
                <div className="text-xs text-green-600 font-medium">{step.time}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Areas */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Cobertura de Emergencias
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coverage.map((zone, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">{zone.zone}</CardTitle>
                  <div className="text-2xl font-bold text-green-600">{zone.responseTime}</div>
                  <div className="text-sm text-slate-500">Tiempo promedio</div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="font-medium text-sm mb-1">Localidades:</div>
                      <div className="flex flex-wrap gap-1">
                        {zone.areas.map((area, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium">Hospitales:</div>
                        <div className="text-blue-600">{zone.hospitals}</div>
                      </div>
                      <div>
                        <div className="font-medium">Ambulancias:</div>
                        <div className="text-red-600">{zone.ambulances}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Protocols */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Protocolos Médicos Certificados
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {protocols.map((protocol, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl">{protocol.category}</CardTitle>
                  <Badge className="w-fit bg-blue-100 text-blue-800">
                    {protocol.certification}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {protocol.protocols.map((item, i) => (
                      <li key={i} className="flex items-center text-sm">
                        <Shield className="h-4 w-4 text-green-500 mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">45</div>
              <div className="text-lg opacity-90">Ambulancias Activas</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">8 min</div>
              <div className="text-lg opacity-90">Tiempo Promedio Respuesta</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98.5%</div>
              <div className="text-lg opacity-90">Tasa de Supervivencia</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-lg opacity-90">Disponibilidad</div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency App Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                App de Emergencias MediCare
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-red-500 mr-3 mt-1" />
                  <div>
                    <div className="font-semibold">Localización Automática</div>
                    <div className="text-slate-600 text-sm">GPS preciso para respuesta rápida</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-red-500 mr-3 mt-1" />
                  <div>
                    <div className="font-semibold">Llamada de Emergencia</div>
                    <div className="text-slate-600 text-sm">Conexión directa con central de emergencias</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Activity className="h-6 w-6 text-red-500 mr-3 mt-1" />
                  <div>
                    <div className="font-semibold">Seguimiento en Tiempo Real</div>
                    <div className="text-slate-600 text-sm">Ve la ubicación de la ambulancia en camino</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="h-6 w-6 text-red-500 mr-3 mt-1" />
                  <div>
                    <div className="font-semibold">Notificación a Contactos</div>
                    <div className="text-slate-600 text-sm">Alerta automática a familiares</div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <Button className="bg-slate-900 hover:bg-slate-800">
                  Descargar para iOS
                </Button>
                <Button variant="outline">
                  Descargar para Android
                </Button>
              </div>
            </div>
            <Card className="p-8">
              <div className="text-center">
                <Phone className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Descargas y Calificaciones</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-2xl font-bold text-red-600">50K+</div>
                    <div className="text-sm text-slate-600">Descargas</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-2xl font-bold ml-1">4.9</span>
                    </div>
                    <div className="text-sm text-slate-600">Calificación</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            En Emergencias, Cada Segundo Cuenta
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Tenemos 45 ambulancias disponibles 24/7 con personal certificado y equipos de última 
            generación. Respuesta promedio en menos de 8 minutos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-red-600 hover:bg-slate-100 text-lg px-8 py-4">
              <Phone className="h-6 w-6 mr-2" />
              LLAMAR 123 AHORA
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600 text-lg px-8 py-4">
              <MapPin className="h-6 w-6 mr-2" />
              Descargar App
            </Button>
          </div>
          
          <div className="flex justify-center items-center space-x-8 mt-8 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold">8 min</div>
              <div className="opacity-75">Respuesta promedio</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">24/7</div>
              <div className="opacity-75">Disponibilidad</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">98.5%</div>
              <div className="opacity-75">Tasa de éxito</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmergenciasMedicas;