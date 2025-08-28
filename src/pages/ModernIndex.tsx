import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Heart, 
  Video, 
  Calendar, 
  Shield, 
  Users, 
  Clock, 
  ArrowRight,
  Star,
  CheckCircle,
  Stethoscope,
  Activity,
  Brain,
  Smartphone,
  Globe,
  Award,
  TrendingUp,
  MessageCircle,
  FileText,
  Zap,
  UserCheck,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Building2,
  Ambulance,
  CreditCard,
  BookOpen,
  CircuitBoard,
  TrendingDown,
  Newspaper,
  Send,
  CheckSquare,
  AlertTriangle,
  HeartHandshake,
  GraduationCap,
  Microscope,
  Network
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import medicalTeamHero from "@/assets/medical-team-hero.jpg";
import doctorPortrait1 from "@/assets/doctor-portrait-1.jpg";
import doctorPortrait2 from "@/assets/doctor-portrait-2.jpg";
import medicalSpecialists from "@/assets/medical-specialists.jpg";
import hospitalBuilding from "@/assets/hospital-building.jpg";
import medicalTechnology from "@/assets/medical-technology.jpg";
import emergencyServices from "@/assets/emergency-services.jpg";
import successStory from "@/assets/success-story.jpg";

const ModernIndex = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();

  const quickServices = [
    {
      icon: Calendar,
      title: "Reserva una Cita",
      description: "Agenda tu consulta médica en línea de forma rápida y segura",
      action: "Reservar",
      color: "text-medical-primary",
      bg: "bg-medical-lighter"
    },
    {
      icon: Users,
      title: "Portal del Paciente",
      description: "Accede a tu historial médico y resultados de exámenes",
      action: "Ingresar",
      color: "text-medical-primary",
      bg: "bg-medical-lighter"
    },
    {
      icon: Stethoscope,
      title: "Staff Médico",
      description: "Conoce a nuestros especialistas y sus horarios disponibles",
      action: "Ver Doctores",
      color: "text-medical-primary",
      bg: "bg-medical-lighter"
    },
    {
      icon: Ambulance,
      title: "Emergencias 24/7",
      description: "Servicio de emergencias disponible las 24 horas del día",
      action: "Llamar",
      color: "text-red-600",
      bg: "bg-red-50"
    }
  ];

  const insurancePartners = [
    { name: "Rimac Seguros", logo: "/api/placeholder/120/60" },
    { name: "Pacífico Seguros", logo: "/api/placeholder/120/60" },
    { name: "La Positiva", logo: "/api/placeholder/120/60" },
    { name: "Interseguro", logo: "/api/placeholder/120/60" },
    { name: "Sanitas", logo: "/api/placeholder/120/60" },
    { name: "EsSalud", logo: "/api/placeholder/120/60" }
  ];

  const newsArticles = [
    {
      title: "Nueva Sala de Operaciones Inteligente",
      description: "Inauguramos la primera sala de operaciones con tecnología de última generación",
      image: medicalTechnology,
      date: "15 Enero 2025",
      category: "Tecnología"
    },
    {
      title: "Acreditación JCI Renovada",
      description: "Por tercer año consecutivo obtenemos la certificación internacional de calidad",
      image: hospitalBuilding,
      date: "10 Enero 2025",
      category: "Certificaciones"
    },
    {
      title: "Historia de Éxito: Recuperación Total",
      description: "María logró una recuperación completa gracias a nuestro equipo médico",
      image: successStory,
      date: "5 Enero 2025",
      category: "Casos de Éxito"
    }
  ];

  const featuredDoctors = [
    {
      name: "Dra. María Rodríguez",
      specialty: "Cardiología",
      experience: "15 años de experiencia",
      rating: 4.9,
      patients: "2,500+",
      image: doctorPortrait1,
      availability: "Disponible hoy",
      languages: ["Español", "Inglés"]
    },
    {
      name: "Dr. Carlos Mendoza",
      specialty: "Medicina General",
      experience: "12 años de experiencia",
      rating: 4.8,
      patients: "3,200+",
      image: doctorPortrait2,
      availability: "Disponible ahora",
      languages: ["Español", "Francés"]
    }
  ];

  const services = [
    {
      icon: Video,
      title: "Consultas Virtuales",
      description: "Conéctate con especialistas certificados desde casa",
      color: "text-medical-primary",
      bg: "bg-medical-lighter"
    },
    {
      icon: Calendar,
      title: "Citas Inmediatas",
      description: "Agenda en segundos, confirmación instantánea",
      color: "text-medical-primary",
      bg: "bg-medical-lighter"
    },
    {
      icon: Activity,
      title: "Monitoreo 24/7",
      description: "Seguimiento continuo de tu salud con IoT",
      color: "text-medical-primary",
      bg: "bg-medical-lighter"
    },
    {
      icon: Brain,
      title: "IA Médica",
      description: "Diagnósticos asistidos por inteligencia artificial",
      color: "text-medical-primary",
      bg: "bg-medical-lighter"
    }
  ];

  const stats = [
    { number: "50K+", label: "Pacientes Activos", icon: Users },
    { number: "1,200+", label: "Médicos Certificados", icon: Stethoscope },
    { number: "98%", label: "Satisfacción", icon: Star },
    { number: "24/7", label: "Disponibilidad", icon: Clock }
  ];

  const specialties = [
    "Medicina General", "Cardiología", "Dermatología", "Endocrinología",
    "Ginecología", "Neurología", "Pediatría", "Psiquiatría", 
    "Oftalmología", "Traumatología", "Oncología", "Psicología"
  ];

  const testimonials = [
    {
      name: "María González",
      role: "Paciente",
      comment: "La atención fue excepcional. Los doctores son muy profesionales y la plataforma es muy fácil de usar.",
      rating: 5,
      image: "/api/placeholder/64/64"
    },
    {
      name: "Dr. Roberto Silva",
      role: "Cardiólogo",
      comment: "Como médico, esta plataforma me permite brindar mejor atención con herramientas avanzadas.",
      rating: 5,
      image: "/api/placeholder/64/64"
    },
    {
      name: "Ana Martínez",
      role: "Enfermera",
      comment: "El sistema es intuitivo y nos ayuda a coordinar mejor la atención integral de los pacientes.",
      rating: 5,
      image: "/api/placeholder/64/64"
    }
  ];

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/');
    } else {
      navigate('/auth');
    }
  };

  const handleBookConsultation = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <Badge className="mb-6 bg-medical-primary text-white px-4 py-2 text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                Plataforma Médica de Confianza
              </Badge>
              
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-professional mb-6 leading-tight">
                Tu Salud en las 
                <span className="text-medical-primary"> Mejores Manos</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl">
                Conectamos pacientes con médicos especialistas certificados. 
                Consultas virtuales, diagnósticos precisos y seguimiento continuo 
                con la tecnología más avanzada.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button 
                  size="lg" 
                  className="bg-medical-primary hover:bg-medical-dark text-white px-8 py-4 text-lg font-semibold shadow-medical group"
                  onClick={handleGetStarted}
                >
                  {isAuthenticated ? 'Ir al Dashboard' : 'Comenzar Ahora'}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-medical-primary text-medical-primary hover:bg-medical-lighter px-8 py-4 text-lg font-semibold"
                  onClick={handleBookConsultation}
                >
                  <Video className="mr-2 h-5 w-5" />
                  Consulta Virtual
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-medical-primary" />
                  <span>Certificado HIPAA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-medical-primary" />
                  <span>ISO 27001</span>
                </div>
                <div className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-medical-primary" />
                  <span>Médicos Verificados</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-elevated">
                <img 
                  src={medicalTeamHero} 
                  alt="Equipo médico profesional" 
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-medical-primary/20 to-transparent"></div>
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -top-4 -left-4 bg-white rounded-2xl p-4 shadow-medical">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-medical-lighter rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-medical-primary" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-professional">50K+</div>
                    <div className="text-sm text-muted-foreground">Pacientes</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-medical">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-medical-lighter rounded-full flex items-center justify-center">
                    <Stethoscope className="h-6 w-6 text-medical-primary" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-professional">1,200+</div>
                    <div className="text-sm text-muted-foreground">Médicos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Services Section - Inspired by San Pablo's "¿En qué podemos ayudarte hoy?" */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-professional mb-6">
              ¿En qué podemos ayudarte hoy?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Accede rápidamente a nuestros servicios más solicitados
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {quickServices.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-medical transition-all duration-300 border-0 shadow-soft bg-white group cursor-pointer">
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 ${service.bg} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                    <service.icon className={`h-8 w-8 ${service.color}`} />
                  </div>
                  <CardTitle className="text-xl font-semibold text-professional mb-3">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed mb-4">
                    {service.description}
                  </CardDescription>
                  <Button 
                    variant="outline" 
                    className="w-full border-medical-primary text-medical-primary hover:bg-medical-lighter"
                    onClick={handleGetStarted}
                  >
                    {service.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section - Trust and Experience */}
      <section className="py-16 lg:py-24 bg-gradient-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4 px-4 py-2 bg-medical-lighter text-medical-primary">
                Siempre cerca de ti
              </Badge>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-professional mb-6">
                Más de 30 años cuidando tu salud y la de tu familia
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Con más de tres décadas de experiencia en el cuidado de la salud, trabajamos día a día 
                para ofrecer el servicio de calidad y seguridad que tu familia merece.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Somos una institución acreditada internacionalmente, con un staff de reconocidos médicos 
                especialistas y la infraestructura más moderna del país.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-4 bg-white rounded-xl shadow-soft">
                  <div className="text-2xl font-bold text-medical-primary mb-1">30+</div>
                  <div className="text-sm text-muted-foreground">Años de Experiencia</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-soft">
                  <div className="text-2xl font-bold text-medical-primary mb-1">JCI</div>
                  <div className="text-sm text-muted-foreground">Acreditación Internacional</div>
                </div>
              </div>
              
              <Button 
                size="lg"
                className="bg-medical-primary hover:bg-medical-dark text-white shadow-medical"
                onClick={handleGetStarted}
              >
                Conoce Más Sobre Nosotros
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="relative">
              <img 
                src={hospitalBuilding} 
                alt="Clínica moderna" 
                className="w-full h-[500px] object-cover rounded-3xl shadow-elevated"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-medical-primary/10 to-transparent rounded-3xl"></div>
              
              {/* Floating accreditation badge */}
              <div className="absolute top-6 right-6 bg-white rounded-xl p-4 shadow-medical">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-medical-lighter rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-medical-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-professional">JCI Certified</div>
                    <div className="text-sm text-muted-foreground">Calidad Internacional</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Technology Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 px-4 py-2 bg-medical-lighter text-medical-primary">
              Tecnología de Vanguardia
            </Badge>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-professional mb-6">
              Inauguramos la Primera Sala de Operaciones Inteligente
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Equipada con la tecnología médica más avanzada para garantizar los mejores resultados
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img 
                src={medicalTechnology} 
                alt="Tecnología médica avanzada" 
                className="w-full h-[400px] object-cover rounded-3xl shadow-elevated"
              />
            </div>
            <div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-medical-lighter rounded-xl flex items-center justify-center flex-shrink-0">
                    <CircuitBoard className="h-6 w-6 text-medical-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-professional mb-2">Cirugía Robótica</h3>
                    <p className="text-muted-foreground">Procedimientos mínimamente invasivos con precisión milimétrica</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-medical-lighter rounded-xl flex items-center justify-center flex-shrink-0">
                    <Microscope className="h-6 w-6 text-medical-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-professional mb-2">Diagnóstico por Imágenes</h3>
                    <p className="text-muted-foreground">Resonancia magnética y tomografía de última generación</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-medical-lighter rounded-xl flex items-center justify-center flex-shrink-0">
                    <Network className="h-6 w-6 text-medical-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-professional mb-2">Conectividad Total</h3>
                    <p className="text-muted-foreground">Sistemas integrados para un seguimiento completo del paciente</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Doctors Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 px-4 py-2 bg-medical-lighter text-medical-primary">
              Médicos Destacados
            </Badge>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-professional mb-6">
              Conoce a Nuestros Especialistas
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Médicos certificados con años de experiencia, listos para brindarte la mejor atención médica
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {featuredDoctors.map((doctor, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-medical transition-all duration-300 border-0 shadow-soft">
                <div className="relative">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      {doctor.availability}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold text-professional mb-1">
                        {doctor.name}
                      </CardTitle>
                      <p className="text-medical-primary font-semibold">{doctor.specialty}</p>
                      <p className="text-sm text-muted-foreground">{doctor.experience}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 pt-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{doctor.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{doctor.patients} pacientes</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    {doctor.languages.map((lang, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button 
                    className="w-full bg-medical-primary hover:bg-medical-dark text-white"
                    onClick={handleBookConsultation}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Agendar Consulta
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-medical-primary text-medical-primary hover:bg-medical-lighter"
              onClick={handleGetStarted}
            >
              Ver Todos los Especialistas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 lg:py-24 bg-gradient-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 px-4 py-2 bg-white text-medical-primary">
              Servicios Innovadores
            </Badge>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-professional mb-6">
              Tecnología Médica Avanzada
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Descubre todas las herramientas que revolucionan tu experiencia de salud
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-medical transition-all duration-300 border-0 shadow-soft bg-white">
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 ${service.bg} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <service.icon className={`h-8 w-8 ${service.color}`} />
                  </div>
                  <CardTitle className="text-xl font-semibold text-professional mb-3">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4 px-4 py-2 bg-medical-lighter text-medical-primary">
                Especialidades Médicas
              </Badge>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-professional mb-6">
                Amplia Red de Especialistas Certificados
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Contamos con médicos especializados en todas las áreas de la salud, 
                con certificaciones vigentes y años de experiencia comprobada.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {specialties.map((specialty, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-trust rounded-lg">
                    <CheckCircle className="h-5 w-5 text-medical-primary flex-shrink-0" />
                    <span className="text-professional font-medium">{specialty}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                size="lg"
                className="bg-medical-primary hover:bg-medical-dark text-white shadow-medical"
                onClick={handleGetStarted}
              >
                Explorar Especialidades
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="relative">
              <img 
                src={medicalSpecialists} 
                alt="Especialistas médicos" 
                className="w-full h-[500px] object-cover rounded-3xl shadow-elevated"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-medical-primary/10 to-transparent rounded-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-24 bg-gradient-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-6">
              Números que Nos Respaldan
            </h2>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              La confianza de miles de pacientes y médicos nos motiva a seguir innovando
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm lg:text-base opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Partners Section */}
      <section className="py-16 lg:py-24 bg-gradient-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 px-4 py-2 bg-white text-medical-primary">
              Convenios de Seguros
            </Badge>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-professional mb-6">
              Trabajamos con las Principales Aseguradoras
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Facilitamos tu atención médica con convenios directos
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {insurancePartners.map((partner, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-soft hover:shadow-medical transition-all duration-300">
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="w-full h-12 object-contain mx-auto mb-3"
                />
                <p className="text-sm text-muted-foreground">{partner.name}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              variant="outline"
              size="lg"
              className="border-medical-primary text-medical-primary hover:bg-medical-lighter"
              onClick={handleGetStarted}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Ver Todos los Convenios
            </Button>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 px-4 py-2 bg-medical-lighter text-medical-primary">
              Casos de Éxito
            </Badge>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-professional mb-6">
              Historias que Nos Inspiran
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Cada recuperación es una nueva historia de esperanza y dedicación médica
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img 
                src={successStory} 
                alt="Historia de éxito médico" 
                className="w-full h-[400px] object-cover rounded-3xl shadow-elevated"
              />
            </div>
            <div>
              <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
                Historia Destacada
              </Badge>
              <h3 className="font-display text-2xl lg:text-3xl font-bold text-professional mb-4">
                María González: Una Recuperación Extraordinaria
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                "Después de meses de tratamiento, hoy puedo decir que mi vida cambió completamente. 
                El equipo médico no solo me curó, sino que me devolvió la esperanza."
              </p>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">Paciente desde 2023</span>
              </div>
              <Button 
                variant="outline"
                className="border-medical-primary text-medical-primary hover:bg-medical-lighter"
                onClick={handleGetStarted}
              >
                <HeartHandshake className="mr-2 h-4 w-4" />
                Ver Más Historias
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* News and Blog Section */}
      <section className="py-16 lg:py-24 bg-gradient-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 px-4 py-2 bg-white text-medical-primary">
              Buenas Noticias
            </Badge>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-professional mb-6">
              Últimas Noticias y Avances Médicos
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Mantente informado sobre nuestros logros y las últimas innovaciones en salud
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {newsArticles.map((article, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-medical transition-all duration-300 border-0 shadow-soft bg-white">
                <div className="relative">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-medical-primary text-white">
                      {article.category}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{article.date}</span>
                  </div>
                  <CardTitle className="text-xl font-bold text-professional mb-3">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {article.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="ghost" 
                    className="w-full text-medical-primary hover:bg-medical-lighter"
                    onClick={handleGetStarted}
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Leer Más
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              size="lg"
              variant="outline"
              className="border-medical-primary text-medical-primary hover:bg-medical-lighter"
              onClick={handleGetStarted}
            >
              <Newspaper className="mr-2 h-4 w-4" />
              Visitar Blog Completo
            </Button>
          </div>
        </div>
      </section>

      {/* Emergency Services Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-red-100 text-red-800 border-red-200">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Servicio de Emergencias
              </Badge>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-professional mb-6">
                Atención de Emergencias 24/7
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Nuestro servicio de emergencias cuenta con ambulancias equipadas con tecnología avanzada 
                y personal médico especializado, disponible las 24 horas del día, los 365 días del año.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-professional">Respuesta en menos de 15 minutos</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-professional">Ambulancias con equipo de cuidados intensivos</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-professional">Personal médico certificado en emergencias</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white shadow-medical"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Llamar Emergencias
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-medical-primary text-medical-primary hover:bg-medical-lighter"
                  onClick={handleGetStarted}
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Ver Ubicaciones
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={emergencyServices} 
                alt="Servicios de emergencia" 
                className="w-full h-[500px] object-cover rounded-3xl shadow-elevated"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-600/10 to-transparent rounded-3xl"></div>
              
              {/* Emergency contact floating card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white rounded-xl p-4 shadow-medical">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600 mb-1">106</div>
                  <div className="text-sm text-muted-foreground">Línea de Emergencias</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 lg:py-24 bg-gradient-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-6">
            ¡Nos Importa tu Bienestar!
          </h2>
          <p className="text-lg lg:text-xl mb-8 opacity-90">
            Suscríbete y recibe promociones exclusivas, consejos de salud y las últimas noticias médicas
          </p>
          
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-professional">Nombres *</Label>
                    <Input id="firstName" placeholder="Ingresa tu nombre" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-professional">Apellidos *</Label>
                    <Input id="lastName" placeholder="Ingresa tus apellidos" className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-professional">Correo Electrónico *</Label>
                  <Input id="email" type="email" placeholder="tu@email.com" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-professional">Teléfono</Label>
                  <Input id="phone" type="tel" placeholder="+51 999 999 999" className="mt-1" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <input type="checkbox" id="privacy" className="mt-1" />
                    <Label htmlFor="privacy" className="text-sm text-muted-foreground">
                      Acepto la <a href="#" className="text-medical-primary hover:underline">Política de Privacidad</a> *
                    </Label>
                  </div>
                  <div className="flex items-start gap-3">
                    <input type="checkbox" id="marketing" className="mt-1" />
                    <Label htmlFor="marketing" className="text-sm text-muted-foreground">
                      Acepto recibir comunicaciones con <a href="#" className="text-medical-primary hover:underline">Fines Comerciales</a>
                    </Label>
                  </div>
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-medical-primary hover:bg-medical-dark text-white"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Suscribirme
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 px-4 py-2 bg-medical-lighter text-medical-primary">
              Testimonios
            </Badge>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-professional mb-6">
              Experiencias que Transforman Vidas
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Conoce las historias de quienes ya confían en nuestra plataforma
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-soft hover:shadow-medical transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback className="bg-medical-lighter text-medical-primary">
                        {testimonial.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-professional">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic leading-relaxed">
                    "{testimonial.comment}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-primary text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-display text-3xl lg:text-5xl font-bold mb-6">
            ¿Listo para Cuidar tu Salud de Manera Inteligente?
          </h2>
          <p className="text-lg lg:text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Únete a la revolución de la salud digital. Médicos certificados, tecnología avanzada 
            y atención personalizada al alcance de tus manos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-md sm:max-w-none mx-auto mb-12">
            <Button 
              size="lg" 
              className="bg-white text-medical-primary hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-elevated hover:shadow-medical transition-all"
              onClick={handleGetStarted}
            >
              {isAuthenticated ? 'Acceder al Dashboard' : 'Comenzar Gratis'}
              <CheckCircle className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-medical-primary px-8 py-4 text-lg font-semibold transition-all"
              onClick={handleBookConsultation}
            >
              <Phone className="mr-2 h-5 w-5" />
              Contactar Ahora
            </Button>
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm opacity-80">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>soporte@mediccare.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Disponible 24/7</span>
            </div>
          </div>
        </div>

        {/* Background decorations */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
      </section>
    </div>
  );
};

export default ModernIndex;