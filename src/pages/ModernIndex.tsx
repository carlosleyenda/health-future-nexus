import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  MapPin
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import medicalTeamHero from "@/assets/medical-team-hero.jpg";
import doctorPortrait1 from "@/assets/doctor-portrait-1.jpg";
import doctorPortrait2 from "@/assets/doctor-portrait-2.jpg";
import medicalSpecialists from "@/assets/medical-specialists.jpg";

const ModernIndex = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();

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