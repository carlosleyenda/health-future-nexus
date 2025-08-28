import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FlaskConical, Microscope, Clock, MapPin, FileText, Shield, Truck, Calendar, CheckCircle, Star, Download, Home, Building2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import TopNavigation from '@/components/layout/TopNavigation';

const Laboratorio = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('general');

  const testCategories = [
    {
      id: 'general',
      name: 'Análisis Generales',
      icon: <FlaskConical className="h-6 w-6" />,
      tests: [
        { name: 'Hemograma Completo', price: '$25.000', preparation: 'No requiere ayuno', time: '2-4 horas' },
        { name: 'Química Sanguínea', price: '$35.000', preparation: 'Ayuno 8-12 horas', time: '4-6 horas' },
        { name: 'Perfil Lipídico', price: '$30.000', preparation: 'Ayuno 12 horas', time: '4-6 horas' },
        { name: 'Glucosa', price: '$15.000', preparation: 'Ayuno 8-10 horas', time: '2-3 horas' },
        { name: 'Hemoglobina Glicosilada', price: '$40.000', preparation: 'No requiere ayuno', time: '6-8 horas' }
      ]
    },
    {
      id: 'specialized',
      name: 'Análisis Especializados',
      icon: <Microscope className="h-6 w-6" />,
      tests: [
        { name: 'Perfil Tiroideo Completo', price: '$85.000', preparation: 'No requiere ayuno', time: '24-48 horas' },
        { name: 'Marcadores Tumorales', price: '$120.000', preparation: 'Según indicación', time: '48-72 horas' },
        { name: 'Perfil Hormonal', price: '$95.000', preparation: 'Según ciclo menstrual', time: '24-48 horas' },
        { name: 'Análisis Genético', price: '$250.000', preparation: 'Consulta previa', time: '5-10 días' },
        { name: 'Toxicología', price: '$75.000', preparation: 'Según sustancia', time: '24-48 horas' }
      ]
    },
    {
      id: 'microbiologia',
      name: 'Microbiología',
      icon: <FileText className="h-6 w-6" />,
      tests: [
        { name: 'Urocultivo', price: '$35.000', preparation: 'Higiene genital', time: '48-72 horas' },
        { name: 'Coprocultivo', price: '$40.000', preparation: 'Muestra fresca', time: '72-96 horas' },
        { name: 'Cultivo de Garganta', price: '$30.000', preparation: 'No antibióticos 72h', time: '48-72 horas' },
        { name: 'Antibiograma', price: '$45.000', preparation: 'Con cultivo positivo', time: '24-48 horas' },
        { name: 'PCR COVID-19', price: '$80.000', preparation: 'No comer 30 min antes', time: '4-6 horas' }
      ]
    }
  ];

  const services = [
    {
      type: 'Laboratorio en Casa',
      icon: <Home className="h-8 w-8" />,
      description: 'Toma de muestras en la comodidad de tu hogar',
      price: 'Desde $15.000 adicional',
      features: [
        'Flebotomista certificado',
        'Horarios flexibles 6AM-8PM',
        'Equipos estériles',
        'Resultados digitales',
        'Cobertura en toda la ciudad'
      ],
      available: true,
      popular: true
    },
    {
      type: 'Laboratorio Express',
      icon: <Clock className="h-8 w-8" />,
      description: 'Resultados en menos de 2 horas',
      price: 'Desde $10.000 adicional',
      features: [
        'Análisis urgentes',
        'Disponible 24/7',
        'Resultados inmediatos',
        'Sin cita previa',
        'Emergencias médicas'
      ],
      available: true,
      popular: false
    },
    {
      type: 'Empresarial',
      icon: <Building2 className="h-8 w-8" />,
      description: 'Servicios de laboratorio para empresas',
      price: 'Cotización personalizada',
      features: [
        'Exámenes ocupacionales',
        'Programas preventivos',
        'Descuentos corporativos',
        'Reportes grupales',
        'Convenios empresariales'
      ],
      available: true,
      popular: false
    }
  ];

  const process = [
    {
      step: 1,
      title: 'Solicita tu Examen',
      description: 'Online, por teléfono o presencial',
      icon: <Calendar className="h-6 w-6" />
    },
    {
      step: 2,
      title: 'Preparación',
      description: 'Sigue las indicaciones de preparación',
      icon: <FileText className="h-6 w-6" />
    },
    {
      step: 3,
      title: 'Toma de Muestra',
      description: 'En sede o domicilio con personal calificado',
      icon: <FlaskConical className="h-6 w-6" />
    },
    {
      step: 4,
      title: 'Procesamiento',
      description: 'Análisis con tecnología de última generación',
      icon: <Microscope className="h-6 w-6" />
    },
    {
      step: 5,
      title: 'Resultados',
      description: 'Entrega digital segura y consulta médica incluida',
      icon: <Download className="h-6 w-6" />
    }
  ];

  const locations = [
    {
      name: 'Sede Principal',
      address: 'Carrera 15 #93-48, Chapinero',
      hours: 'Lun-Vie: 6:00AM - 8:00PM, Sáb: 7:00AM - 4:00PM',
      phone: '(601) 123-4567',
      services: ['Todos los análisis', 'Toma de muestras', 'Resultados inmediatos'],
      parking: true
    },
    {
      name: 'Sede Norte',
      address: 'Calle 140 #15-35, Usaquén',
      hours: 'Lun-Vie: 7:00AM - 6:00PM, Sáb: 8:00AM - 2:00PM',
      phone: '(601) 123-4568',
      services: ['Análisis generales', 'Microbiología', 'Express'],
      parking: true
    },
    {
      name: 'Sede Sur',
      address: 'Carrera 30 #45-12, Kennedy',
      hours: 'Lun-Vie: 6:30AM - 7:00PM, Sáb: 7:00AM - 3:00PM',
      phone: '(601) 123-4569',
      services: ['Análisis básicos', 'Domicilios', 'Empresarial'],
      parking: false
    }
  ];

  const packages = [
    {
      name: 'Chequeo Básico',
      price: '$150.000',
      original: '$200.000',
      tests: [
        'Hemograma completo',
        'Química sanguínea',
        'Parcial de orina',
        'Coprológico',
        'Consulta médica incluida'
      ],
      ideal: 'Revisión anual de rutina',
      popular: false
    },
    {
      name: 'Chequeo Ejecutivo',
      price: '$350.000',
      original: '$450.000',
      tests: [
        'Perfil básico completo',
        'Perfil cardiovascular',
        'Perfil hepático',
        'Marcadores inflamatorios',
        'Electrocardiograma',
        'Consulta especializada'
      ],
      ideal: 'Profesionales 35-55 años',
      popular: true
    },
    {
      name: 'Chequeo Premium',
      price: '$650.000',
      original: '$850.000',
      tests: [
        'Todos los anteriores',
        'Perfil tiroideo',
        'Marcadores tumorales',
        'Análisis hormonales',
        'Ecografía abdominal',
        'Seguimiento 3 meses'
      ],
      ideal: 'Adultos 50+ o factores de riesgo',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <TopNavigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Laboratorio Clínico
            <span className="text-green-600 block">Certificado</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Análisis clínicos precisos con tecnología de última generación. Más de 300 tipos de 
            exámenes con resultados confiables y entrega rápida.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              <FlaskConical className="h-5 w-5 mr-2" />
              Solicitar Análisis
            </Button>
            <Button size="lg" variant="outline">
              <MapPin className="h-5 w-5 mr-2" />
              Ver Ubicaciones
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Modalidades de Servicio
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className={`h-full hover:shadow-xl transition-shadow ${service.popular ? 'ring-2 ring-green-500' : ''}`}>
                {service.popular && (
                  <div className="bg-green-500 text-white text-center py-2 text-sm font-medium">
                    MÁS POPULAR
                  </div>
                )}
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-green-100 text-green-600 rounded-full w-fit">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl">{service.type}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                  <div className="text-2xl font-bold text-green-600">{service.price}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={service.popular ? "default" : "outline"}>
                    {service.available ? "Solicitar Servicio" : "Próximamente"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Test Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Catálogo de Análisis
          </h2>
          
          {/* Category Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {testCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                {category.icon}
                {category.name}
              </Button>
            ))}
          </div>

          {/* Selected Category Tests */}
          {testCategories.map((category) => (
            selectedCategory === category.id && (
              <div key={category.id} className="space-y-4">
                {category.tests.map((test, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">{test.name}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600">
                            <div>
                              <span className="font-medium">Preparación:</span> {test.preparation}
                            </div>
                            <div>
                              <span className="font-medium">Tiempo de resultado:</span> {test.time}
                            </div>
                            <div>
                              <span className="font-medium text-green-600">Precio:</span> {test.price}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 md:ml-6">
                          <Button size="sm">
                            Solicitar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )
          ))}
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">
            Paquetes de Chequeo
          </h2>
          <p className="text-center text-slate-600 mb-12">
            Ahorra hasta 30% con nuestros paquetes integrales de análisis
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card key={index} className={`h-full ${pkg.popular ? 'ring-2 ring-green-500 scale-105' : ''}`}>
                {pkg.popular && (
                  <div className="bg-green-500 text-white text-center py-2 text-sm font-medium">
                    RECOMENDADO
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <div className="text-3xl font-bold text-green-600">{pkg.price}</div>
                  <div className="text-sm text-slate-500 line-through">{pkg.original}</div>
                  <CardDescription className="text-base">{pkg.ideal}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {pkg.tests.map((test, i) => (
                      <li key={i} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {test}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={pkg.popular ? "default" : "outline"}>
                    Agendar Chequeo
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Proceso Simple en 5 Pasos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 p-4 bg-green-100 text-green-600 rounded-full w-fit">
                  {step.icon}
                </div>
                <div className="text-sm font-medium text-green-600 mb-2">
                  PASO {step.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-slate-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Nuestras Sedes
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 text-green-600 mr-2" />
                    {location.name}
                  </CardTitle>
                  <CardDescription>{location.address}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="font-medium text-sm mb-1">Horarios:</div>
                    <div className="text-sm text-slate-600">{location.hours}</div>
                  </div>
                  <div>
                    <div className="font-medium text-sm mb-1">Teléfono:</div>
                    <div className="text-sm text-green-600">{location.phone}</div>
                  </div>
                  <div>
                    <div className="font-medium text-sm mb-2">Servicios:</div>
                    <div className="space-y-1">
                      {location.services.map((service, i) => (
                        <div key={i} className="flex items-center text-sm">
                          <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                          {service}
                        </div>
                      ))}
                    </div>
                  </div>
                  {location.parking && (
                    <div className="flex items-center text-sm text-green-600">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Parqueadero disponible
                    </div>
                  )}
                  <Button className="w-full" variant="outline">
                    Ver en Mapa
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quality & Certifications */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Calidad y Certificaciones
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Shield className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <div className="font-semibold">Certificación ISO 15189</div>
                    <div className="text-slate-600 text-sm">Estándar internacional para laboratorios médicos</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <div className="font-semibold">Acreditación ONAC</div>
                    <div className="text-slate-600 text-sm">Organismo Nacional de Acreditación de Colombia</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <div className="font-semibold">Control de Calidad Diario</div>
                    <div className="text-slate-600 text-sm">Verificación constante de equipos y procedimientos</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <div className="font-semibold">Personal Certificado</div>
                    <div className="text-slate-600 text-sm">Bacteriólogos y técnicos con certificación vigente</div>
                  </div>
                </div>
              </div>
            </div>
            <Card className="p-8">
              <div className="text-center">
                <Microscope className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Tecnología Avanzada</h3>
                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                  <div>Analizadores automatizados</div>
                  <div>PCR en tiempo real</div>
                  <div>Citometría de flujo</div>
                  <div>Espectrometría de masas</div>
                  <div>Inmunofluorescencia</div>
                  <div>Secuenciación genética</div>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  Precisión superior al 99.5%
                </Badge>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">300+</div>
              <div className="text-lg opacity-90">Tipos de Análisis</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25,000+</div>
              <div className="text-lg opacity-90">Análisis Mensuales</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.5%</div>
              <div className="text-lg opacity-90">Precisión</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24h</div>
              <div className="text-lg opacity-90">Resultados Promedio</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Programa tu Análisis de Laboratorio
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Más de 300 tipos de análisis disponibles. Resultados precisos, entrega rápida 
            y atención personalizada. ¿Prefieres en sede o domicilio?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              <FlaskConical className="h-5 w-5 mr-2" />
              Solicitar Análisis
            </Button>
            <Button size="lg" variant="outline">
              <Home className="h-5 w-5 mr-2" />
              Servicio a Domicilio
            </Button>
          </div>
          <div className="flex justify-center items-center space-x-6 mt-8 text-sm text-slate-600">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              4.9/5 en satisfacción
            </div>
            <div className="flex items-center">
              <Truck className="h-4 w-4 text-green-600 mr-1" />
              Domicilios disponibles
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-blue-600 mr-1" />
              Resultados en 24h
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Laboratorio;