import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, Shield, Star, CheckCircle, Heart, Brain, Baby, Users, Phone, Video, MapPin } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import TopNavigation from '@/components/layout/TopNavigation';

const ConsultasMedicas = () => {
  const navigate = useNavigate();
  const [selectedSpecialty, setSelectedSpecialty] = useState('general');

  const specialties = [
    {
      id: 'general',
      name: 'Medicina General',
      icon: <Heart className="h-6 w-6" />,
      description: 'Consultas médicas integrales para todas las edades',
      price: '$45.000',
      duration: '30 min',
      availability: 'Disponible 24/7',
      services: [
        'Chequeos médicos generales',
        'Diagnóstico de síntomas',
        'Seguimiento de tratamientos',
        'Prescripción de medicamentos',
        'Certificados médicos',
        'Orientación preventiva'
      ]
    },
    {
      id: 'cardiology',
      name: 'Cardiología',
      icon: <Heart className="h-6 w-6" />,
      description: 'Especialistas del corazón y sistema cardiovascular',
      price: '$85.000',
      duration: '45 min',
      availability: 'Lun-Vie 8AM-6PM',
      services: [
        'Electrocardiogramas',
        'Ecocardiografías',
        'Pruebas de esfuerzo',
        'Monitoreo Holter',
        'Tratamiento de arritmias',
        'Prevención cardiovascular'
      ]
    },
    {
      id: 'neurology',
      name: 'Neurología',
      icon: <Brain className="h-6 w-6" />,
      description: 'Diagnóstico y tratamiento del sistema nervioso',
      price: '$95.000',
      duration: '50 min',
      availability: 'Lun-Vie 9AM-5PM',
      services: [
        'Evaluación neurológica',
        'Electroencefalogramas',
        'Tratamiento de migrañas',
        'Manejo de epilepsia',
        'Trastornos del sueño',
        'Rehabilitación neurológica'
      ]
    },
    {
      id: 'pediatrics',
      name: 'Pediatría',
      icon: <Baby className="h-6 w-6" />,
      description: 'Atención médica especializada para niños',
      price: '$55.000',
      duration: '35 min',
      availability: 'Disponible 24/7',
      services: [
        'Control de crecimiento',
        'Vacunación infantil',
        'Diagnóstico pediátrico',
        'Orientación nutricional',
        'Desarrollo psicomotor',
        'Emergencias pediátricas'
      ]
    }
  ];

  const consultationTypes = [
    {
      type: 'Presencial',
      icon: <MapPin className="h-8 w-8" />,
      description: 'Consulta en nuestras modernas instalaciones',
      price: 'Desde $45.000',
      benefits: [
        'Examen físico completo',
        'Acceso a equipos especializados',
        'Laboratorio en sitio',
        'Atención personalizada',
        'Historia clínica digital'
      ],
      duration: '30-60 minutos',
      available: true
    },
    {
      type: 'Telemedicina',
      icon: <Video className="h-8 w-8" />,
      description: 'Consulta médica desde la comodidad de tu hogar',
      price: 'Desde $35.000',
      benefits: [
        'Sin desplazamientos',
        'Consulta inmediata',
        'Recetas digitales',
        'Seguimiento continuo',
        'Grabación de sesiones'
      ],
      duration: '20-45 minutos',
      available: true
    },
    {
      type: 'Domiciliaria',
      icon: <Users className="h-8 w-8" />,
      description: 'Médico especialista en tu domicilio',
      price: 'Desde $120.000',
      benefits: [
        'Atención en casa',
        'Ideal para adultos mayores',
        'Equipos portátiles',
        'Cuidado familiar',
        'Horarios flexibles'
      ],
      duration: '45-90 minutos',
      available: true
    },
    {
      type: 'Urgencias',
      icon: <Phone className="h-8 w-8" />,
      description: 'Atención médica de emergencia 24/7',
      price: 'Desde $75.000',
      benefits: [
        'Respuesta inmediata',
        'Disponible 24/7',
        'Triaje telefónico',
        'Ambulancia incluida',
        'Estabilización inicial'
      ],
      duration: 'Variable',
      available: true
    }
  ];

  const testimonials = [
    {
      name: "María González",
      age: 45,
      specialty: "Cardiología",
      rating: 5,
      comment: "Excelente atención. El Dr. Rodríguez fue muy detallado en explicar mi condición cardíaca y el plan de tratamiento. Me siento muy segura con el seguimiento.",
      date: "Hace 2 semanas"
    },
    {
      name: "Carlos Mendoza",
      age: 38,
      specialty: "Medicina General",
      rating: 5,
      comment: "La telemedicina funcionó perfectamente. Pude consultar desde mi oficina y recibir la receta digital inmediatamente. Muy conveniente.",
      date: "Hace 1 mes"
    },
    {
      name: "Ana Martínez",
      age: 32,
      specialty: "Pediatría",
      rating: 5,
      comment: "La pediatra fue increíble con mi hijo de 3 años. Muy paciente y profesional. Las instalaciones son muy limpias y modernas.",
      date: "Hace 3 días"
    }
  ];

  const process = [
    {
      step: 1,
      title: "Agenda tu Cita",
      description: "Selecciona especialidad, fecha y hora que mejor te convenga",
      icon: <Calendar className="h-6 w-6" />,
      duration: "2 minutos"
    },
    {
      step: 2,
      title: "Confirma tus Datos",
      description: "Completa tu información médica y preferencias de consulta",
      icon: <User className="h-6 w-6" />,
      duration: "3 minutos"
    },
    {
      step: 3,
      title: "Consulta Médica",
      description: "Recibe atención profesional según la modalidad elegida",
      icon: <Heart className="h-6 w-6" />,
      duration: "30-60 minutos"
    },
    {
      step: 4,
      title: "Seguimiento",
      description: "Accede a tu historia clínica y recibe seguimiento continuo",
      icon: <CheckCircle className="h-6 w-6" />,
      duration: "Continuo"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <TopNavigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Consultas Médicas
            <span className="text-medical-primary block">Profesionales</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Atención médica de calidad con especialistas certificados. Presencial, virtual o domiciliaria, 
            adaptándonos a tus necesidades y horarios.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-medical-primary hover:bg-medical-dark">
              Agendar Consulta Ahora
            </Button>
            <Button size="lg" variant="outline">
              Ver Especialidades
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-medical-primary text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-lg opacity-90">Médicos Especialistas</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-lg opacity-90">Satisfacción del Paciente</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-lg opacity-90">Disponibilidad</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-lg opacity-90">Consultas Mensuales</div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Types */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Modalidades de Consulta
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {consultationTypes.map((type, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300 h-full">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-medical-primary text-white rounded-full w-fit">
                    {type.icon}
                  </div>
                  <CardTitle className="text-xl">{type.type}</CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-medical-primary">{type.price}</div>
                    <div className="text-sm text-slate-500">{type.duration}</div>
                  </div>
                  <ul className="space-y-2">
                    {type.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={index === 0 ? "default" : "outline"}>
                    {type.available ? "Agendar Ahora" : "Próximamente"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Especialidades Médicas
          </h2>
          
          {/* Specialty Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {specialties.map((specialty) => (
              <Button
                key={specialty.id}
                variant={selectedSpecialty === specialty.id ? "default" : "outline"}
                onClick={() => setSelectedSpecialty(specialty.id)}
                className="flex items-center gap-2"
              >
                {specialty.icon}
                {specialty.name}
              </Button>
            ))}
          </div>

          {/* Selected Specialty Details */}
          {specialties.map((specialty) => (
            selectedSpecialty === specialty.id && (
              <Card key={specialty.id} className="max-w-4xl mx-auto">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-medical-primary text-white rounded-full w-fit">
                    {specialty.icon}
                  </div>
                  <CardTitle className="text-2xl">{specialty.name}</CardTitle>
                  <CardDescription className="text-lg">{specialty.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-medical-primary">{specialty.price}</div>
                      <div className="text-sm text-slate-500">Por consulta</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{specialty.duration}</div>
                      <div className="text-sm text-slate-500">Duración</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">Disponible</div>
                      <div className="text-sm text-slate-500">{specialty.availability}</div>
                    </div>
                  </div>
                  
                  <h4 className="font-semibold text-lg mb-4">Servicios Incluidos:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {specialty.services.map((service, i) => (
                      <div key={i} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-4 mt-6 justify-center">
                    <Button className="bg-medical-primary hover:bg-medical-dark">
                      Agendar {specialty.name}
                    </Button>
                    <Button variant="outline">
                      Ver Médicos Especialistas
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Cómo Funciona
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 p-4 bg-medical-primary text-white rounded-full w-fit">
                  {step.icon}
                </div>
                <div className="text-sm font-medium text-medical-primary mb-2">
                  PASO {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-slate-600 mb-2">{step.description}</p>
                <div className="text-sm text-slate-500">{step.duration}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Lo que Dicen Nuestros Pacientes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-slate-500">{testimonial.age} años • {testimonial.specialty}</div>
                    </div>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">"{testimonial.comment}"</p>
                  <div className="text-sm text-slate-500">{testimonial.date}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance & Payment */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Seguros y Formas de Pago
              </h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Shield className="h-6 w-6 text-green-500 mr-3" />
                  <span>Aceptamos más de 20 seguros médicos</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                  <span>Pagos con tarjeta de crédito y débito</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                  <span>Financiamiento disponible</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                  <span>Planes corporativos para empresas</span>
                </div>
              </div>
            </div>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Seguros Afiliados</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>• Colsanitas</div>
                <div>• Sura</div>
                <div>• Sanitas</div>
                <div>• Compensar</div>
                <div>• Famisanar</div>
                <div>• Coomeva</div>
                <div>• Y muchos más...</div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-medical-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            ¿Listo para tu Consulta Médica?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Agenda tu cita con nuestros especialistas certificados. Disponible presencial, 
            virtual o domiciliaria según tu preferencia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-medical-primary hover:bg-slate-100">
              Agendar Consulta
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-medical-primary">
              Llamar Ahora: (601) 123-4567
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Qué necesito para agendar una consulta?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Solo necesitas tu documento de identidad, información de tu seguro médico (si aplica) 
                  y completar un breve formulario médico al momento de agendar.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Puedo cancelar o reprogramar mi cita?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Sí, puedes cancelar o reprogramar tu cita hasta 2 horas antes sin costo adicional. 
                  Puedes hacerlo desde nuestra app o llamando a nuestro centro de atención.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Las recetas digitales son válidas?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Absolutamente. Nuestras recetas digitales cumplen con todas las regulaciones 
                  nacionales y son aceptadas en cualquier farmacia del país.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConsultasMedicas;