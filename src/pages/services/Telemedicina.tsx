import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Video, Smartphone, Monitor, Wifi, Clock, Shield, Star, CheckCircle, Download, Users, Globe, Headphones } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import TopNavigation from '@/components/layout/TopNavigation';

const Telemedicina = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState('video');

  const platforms = [
    {
      name: 'Aplicación Móvil',
      icon: <Smartphone className="h-8 w-8" />,
      description: 'iOS y Android',
      features: [
        'Videollamadas HD',
        'Chat en tiempo real',
        'Compartir archivos',
        'Notificaciones push',
        'Historial médico',
        'Recordatorios de citas'
      ],
      rating: 4.8,
      downloads: '100K+'
    },
    {
      name: 'Plataforma Web',
      icon: <Monitor className="h-8 w-8" />,
      description: 'Acceso desde cualquier navegador',
      features: [
        'Sin instalación',
        'Multiplataforma',
        'Pantalla compartida',
        'Grabación de sesiones',
        'Integración con EHR',
        'Reportes detallados'
      ],
      rating: 4.9,
      downloads: 'Web'
    },
    {
      name: 'Llamada Tradicional',
      icon: <Headphones className="h-8 w-8" />,
      description: 'Para consultas básicas',
      features: [
        'Sin internet requerido',
        'Disponible 24/7',
        'Grabación opcional',
        'Triaje telefónico',
        'Seguimiento SMS',
        'Bajo costo'
      ],
      rating: 4.6,
      downloads: 'Tradicional'
    }
  ];

  const specialties = [
    {
      name: 'Medicina General',
      availability: 'Disponible 24/7',
      price: '$35.000',
      duration: '20-30 min',
      suitable: [
        'Consultas de rutina',
        'Síntomas generales',
        'Seguimiento de tratamientos',
        'Certificados médicos',
        'Segunda opinión'
      ],
      rating: 4.9
    },
    {
      name: 'Psicología',
      availability: 'Lun-Dom 7AM-10PM',
      price: '$65.000',
      duration: '45-60 min',
      suitable: [
        'Terapia individual',
        'Manejo de ansiedad',
        'Depresión',
        'Terapia de pareja',
        'Apoyo emocional'
      ],
      rating: 4.8
    },
    {
      name: 'Nutrición',
      availability: 'Lun-Vie 8AM-6PM',
      price: '$45.000',
      duration: '30-45 min',
      suitable: [
        'Planes nutricionales',
        'Pérdida de peso',
        'Diabetes',
        'Alergias alimentarias',
        'Nutrición deportiva'
      ],
      rating: 4.7
    },
    {
      name: 'Dermatología',
      availability: 'Lun-Vie 9AM-5PM',
      price: '$75.000',
      duration: '25-35 min',
      suitable: [
        'Evaluación de lesiones',
        'Acné',
        'Problemas de piel',
        'Consultas estéticas',
        'Seguimiento post-tratamiento'
      ],
      rating: 4.6
    }
  ];

  const benefits = [
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Inmediato',
      description: 'Consulta en menos de 15 minutos',
      stat: '< 15 min'
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: 'Desde Cualquier Lugar',
      description: 'Casa, oficina, viaje - donde estés',
      stat: '100% remoto'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Seguro y Privado',
      description: 'Cifrado end-to-end certificado',
      stat: 'HIPAA compliant'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Especialistas Certificados',
      description: 'Médicos licenciados y verificados',
      stat: '500+ médicos'
    }
  ];

  const techSpecs = [
    {
      requirement: 'Conexión a Internet',
      minimum: '1 Mbps',
      recommended: '5+ Mbps',
      icon: <Wifi className="h-5 w-5" />
    },
    {
      requirement: 'Dispositivo',
      minimum: 'Smartphone/Tablet/PC',
      recommended: 'Cámara HD + Micrófono',
      icon: <Video className="h-5 w-5" />
    },
    {
      requirement: 'Navegador',
      minimum: 'Chrome, Safari, Firefox',
      recommended: 'Última versión',
      icon: <Monitor className="h-5 w-5" />
    }
  ];

  const process = [
    {
      step: 1,
      title: 'Descarga la App',
      description: 'Disponible en App Store y Google Play',
      time: '2 min'
    },
    {
      step: 2,
      title: 'Crea tu Perfil',
      description: 'Información básica y médica',
      time: '5 min'
    },
    {
      step: 3,
      title: 'Selecciona Especialista',
      description: 'Filtra por especialidad y disponibilidad',
      time: '1 min'
    },
    {
      step: 4,
      title: 'Inicia Consulta',
      description: 'Videollamada HD segura',
      time: '20-45 min'
    },
    {
      step: 5,
      title: 'Recibe Resultados',
      description: 'Recetas digitales y seguimiento',
      time: 'Inmediato'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <TopNavigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
                Telemedicina
                <span className="text-blue-600 block">Avanzada</span>
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                Consulta médica profesional desde cualquier lugar. Videollamadas HD, 
                recetas digitales y seguimiento continuo con especialistas certificados.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Video className="h-5 w-5 mr-2" />
                  Iniciar Consulta
                </Button>
                <Button size="lg" variant="outline">
                  <Download className="h-5 w-5 mr-2" />
                  Descargar App
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white">
                <div className="text-center">
                  <Video className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-lg">Demo Interactivo</p>
                  <p className="text-sm opacity-75">Click para ver cómo funciona</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Ventajas de la Telemedicina
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-blue-100 text-blue-600 rounded-full w-fit">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  <div className="text-2xl font-bold text-blue-600">{benefit.stat}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Múltiples Plataformas Disponibles
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {platforms.map((platform, index) => (
              <Card key={index} className="h-full hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-blue-600 text-white rounded-full w-fit">
                    {platform.icon}
                  </div>
                  <CardTitle className="text-xl">{platform.name}</CardTitle>
                  <CardDescription className="text-lg">{platform.description}</CardDescription>
                  <div className="flex items-center justify-center mt-2">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(platform.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-sm text-slate-600">{platform.rating} • {platform.downloads}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {platform.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant={index === 0 ? "default" : "outline"}>
                    {index === 0 ? "Descargar Gratis" : index === 1 ? "Acceder Web" : "Llamar Ahora"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Especialidades Disponibles
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {specialties.map((specialty, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{specialty.name}</CardTitle>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{specialty.rating}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="font-semibold text-blue-600">{specialty.price}</div>
                      <div className="text-slate-500">Precio</div>
                    </div>
                    <div>
                      <div className="font-semibold text-green-600">{specialty.duration}</div>
                      <div className="text-slate-500">Duración</div>
                    </div>
                    <div>
                      <div className="font-semibold text-purple-600">Disponible</div>
                      <div className="text-slate-500 text-xs">{specialty.availability}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Ideal para:</h4>
                    <ul className="space-y-1">
                      {specialty.suitable.map((item, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button className="w-full">
                    Consultar {specialty.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Requirements */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Requisitos Técnicos
          </h2>
          <div className="space-y-6">
            {techSpecs.map((spec, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 text-blue-600 rounded-lg mr-4">
                        {spec.icon}
                      </div>
                      <div>
                        <div className="font-semibold">{spec.requirement}</div>
                        <div className="text-sm text-slate-600">Mínimo: {spec.minimum}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">Recomendado</div>
                      <div className="text-sm text-slate-600">{spec.recommended}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <h3 className="font-semibold text-blue-900 mb-2">¿Necesitas ayuda técnica?</h3>
            <p className="text-blue-800 text-sm mb-4">
              Nuestro equipo de soporte técnico está disponible 24/7 para ayudarte con la 
              configuración y resolver cualquier problema técnico.
            </p>
            <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white">
              Contactar Soporte Técnico
            </Button>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Cómo Empezar en 5 Pasos
          </h2>
          <div className="relative">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              {process.map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center max-w-xs mb-8 lg:mb-0">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-slate-600 text-sm mb-2">{step.description}</p>
                  <div className="text-xs text-blue-600 font-medium">{step.time}</div>
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-6 w-24 h-0.5 bg-blue-200" 
                         style={{left: `${20 + (index * 20)}%`}} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Estadísticas de Impacto
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">2M+</div>
              <div className="text-lg opacity-90">Consultas Realizadas</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98.5%</div>
              <div className="text-lg opacity-90">Satisfacción del Paciente</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15 min</div>
              <div className="text-lg opacity-90">Tiempo Promedio de Espera</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">45%</div>
              <div className="text-lg opacity-90">Ahorro en Costos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Privacy */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Seguridad y Privacidad Garantizada
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Shield className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <div className="font-semibold">Cifrado End-to-End</div>
                    <div className="text-slate-600 text-sm">Todas las comunicaciones están protegidas con cifrado AES-256</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <div className="font-semibold">Cumplimiento HIPAA</div>
                    <div className="text-slate-600 text-sm">Certificados bajo los más altos estándares de privacidad médica</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <div className="font-semibold">Servidores Seguros</div>
                    <div className="text-slate-600 text-sm">Infraestructura en la nube con certificación ISO 27001</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <div className="font-semibold">Acceso Controlado</div>
                    <div className="text-slate-600 text-sm">Autenticación multifactor y logs de acceso completos</div>
                  </div>
                </div>
              </div>
            </div>
            <Card className="p-8">
              <div className="text-center">
                <Shield className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Certificaciones de Seguridad</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <Badge variant="outline">ISO 27001</Badge>
                  <Badge variant="outline">HIPAA</Badge>
                  <Badge variant="outline">SOC 2 Type II</Badge>
                  <Badge variant="outline">FDA Approved</Badge>
                </div>
                <p className="text-slate-600 text-sm mt-4">
                  Tu información médica está protegida con los más altos estándares de seguridad.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Comienza tu Consulta Médica Virtual
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Más de 500 especialistas disponibles 24/7. Descarga la app y conecta 
            con un médico en menos de 15 minutos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
              <Video className="h-5 w-5 mr-2" />
              Iniciar Consulta Virtual
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Download className="h-5 w-5 mr-2" />
              Descargar App Gratis
            </Button>
          </div>
          
          <div className="flex justify-center space-x-6 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold">4.8★</div>
              <div className="text-sm opacity-75">App Store</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">4.9★</div>
              <div className="text-sm opacity-75">Google Play</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">100K+</div>
              <div className="text-sm opacity-75">Descargas</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Telemedicina;