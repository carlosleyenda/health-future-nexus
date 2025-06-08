
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();

  const features = [
    {
      icon: Video,
      title: "Consultas Virtuales",
      description: "Conéctate con médicos especialistas desde la comodidad de tu hogar con tecnología HD",
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      icon: Calendar,
      title: "Citas 24/7",
      description: "Agenda tu cita médica en cualquier momento del día con confirmación instantánea",
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      icon: Activity,
      title: "Monitoreo IoT",
      description: "Seguimiento continuo de tus signos vitales con dispositivos inteligentes conectados",
      color: "text-red-600",
      bg: "bg-red-50"
    },
    {
      icon: Brain,
      title: "IA Médica",
      description: "Asistente de inteligencia artificial para diagnósticos precisos y recomendaciones",
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      icon: Shield,
      title: "Datos Seguros",
      description: "Tu información médica protegida con encriptación de grado militar y compliance HIPAA",
      color: "text-indigo-600",
      bg: "bg-indigo-50"
    },
    {
      icon: Smartphone,
      title: "App Móvil",
      description: "Accede a todos los servicios desde tu smartphone con notificaciones inteligentes",
      color: "text-orange-600",
      bg: "bg-orange-50"
    }
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
      content: "La plataforma me ha permitido acceder a atención médica de calidad sin salir de casa. Los doctores son excelentes.",
      rating: 5,
      avatar: "M"
    },
    {
      name: "Dr. Carlos López",
      role: "Cardiólogo",
      content: "Como médico, esta plataforma me permite brindar mejor atención a mis pacientes con herramientas avanzadas.",
      rating: 5,
      avatar: "C"
    },
    {
      name: "Ana Martínez",
      role: "Enfermera",
      content: "El sistema de gestión es intuitivo y nos ayuda a coordinar mejor el cuidado de los pacientes.",
      rating: 5,
      avatar: "A"
    }
  ];

  const stats = [
    { number: "50K+", label: "Pacientes Activos", icon: Users },
    { number: "1,200+", label: "Médicos Certificados", icon: Stethoscope },
    { number: "98%", label: "Satisfacción", icon: Star },
    { number: "24/7", label: "Disponibilidad", icon: Clock }
  ];

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/');
    } else {
      navigate('/auth');
    }
  };

  const handleLearnMore = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="px-4 py-16 lg:py-24 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <Badge variant="outline" className="mb-6 bg-blue-100 text-blue-800 border-blue-200 text-sm px-4 py-2">
            🏥 Plataforma Médica Premium
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent leading-tight">
            Tu Salud, Nuestra Prioridad
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Plataforma integral de telemedicina que conecta pacientes con médicos especialistas, 
            monitoreo de salud IoT, IA médica avanzada y servicios médicos a domicilio.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 max-w-md sm:max-w-none mx-auto">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg group shadow-xl"
              onClick={handleGetStarted}
            >
              {isAuthenticated ? 'Ir al Dashboard' : 'Comenzar Ahora'}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg"
              onClick={handleLearnMore}
            >
              Ver Demo
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
                <stat.icon className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-sm lg:text-base text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-green-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 px-4 py-2">Servicios Innovadores</Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-gray-900">
              Tecnología Médica de Vanguardia
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre todas las herramientas avanzadas que tenemos para revolucionar tu experiencia de salud
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-2xl transition-all duration-300 border-0 shadow-lg group hover:scale-105 bg-gradient-to-br from-white to-gray-50">
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl mb-3">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="px-4 py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4 px-4 py-2">Red Médica</Badge>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-gray-900">
            Especialidades Médicas Certificadas
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Accede a una amplia red de especialistas certificados y experimentados
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
            {specialties.map((specialty, index) => (
              <div 
                key={index} 
                className="bg-white py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105 border border-gray-100"
              >
                <span className="text-sm lg:text-base font-medium text-gray-800">{specialty}</span>
              </div>
            ))}
          </div>
          
          <Button 
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 shadow-lg"
            onClick={handleGetStarted}
          >
            Ver Todos los Especialistas
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 px-4 py-2">Testimonios</Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-gray-900">
              Lo Que Dicen Nuestros Usuarios
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Conoce las experiencias de quienes ya confían en nuestra plataforma
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-gray-50">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 py-16 lg:py-24 bg-gradient-to-br from-blue-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 px-4 py-2 bg-white/20 text-white border-white/30">
              Beneficios
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              ¿Por Qué Elegir Nuestra Plataforma?
            </h2>
            <p className="text-lg lg:text-xl opacity-90 max-w-3xl mx-auto">
              Ventajas exclusivas que nos convierten en la mejor opción para tu salud
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Respuesta Inmediata",
                description: "Conecta con médicos en menos de 2 minutos, disponibles 24/7 para emergencias"
              },
              {
                icon: TrendingUp,
                title: "Ahorro Comprobado",
                description: "Hasta 70% menos costoso que consultas tradicionales, sin comprometer la calidad"
              },
              {
                icon: Globe,
                title: "Alcance Global",
                description: "Accede a especialistas internacionales desde cualquier lugar del mundo"
              },
              {
                icon: Award,
                title: "Certificación Premium",
                description: "Médicos verificados con más de 10 años de experiencia y certificaciones vigentes"
              },
              {
                icon: MessageCircle,
                title: "Comunicación Continua",
                description: "Chat médico 24/7 para seguimiento post-consulta y dudas menores"
              },
              {
                icon: FileText,
                title: "Historial Completo",
                description: "Expediente médico digital completo, accesible desde cualquier dispositivo"
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
                <p className="opacity-90 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 lg:py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            ¿Listo para Transformar tu Experiencia de Salud?
          </h2>
          <p className="text-lg lg:text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Únete a miles de pacientes que ya confían en nuestra plataforma para cuidar su salud de manera inteligente
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-md sm:max-w-none mx-auto">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
              onClick={handleGetStarted}
            >
              {isAuthenticated ? 'Acceder Ahora' : 'Crear Cuenta Gratis'}
              <CheckCircle className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold transition-all"
              onClick={handleLearnMore}
            >
              Agendar Demo
              <Calendar className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-sm opacity-80 mb-4">Certificados y respaldados por:</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span className="text-sm">HIPAA Compliant</span>
              </div>
              <Separator orientation="vertical" className="h-6 bg-white/30" />
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                <span className="text-sm">FDA Approved</span>
              </div>
              <Separator orientation="vertical" className="h-6 bg-white/30" />
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                <span className="text-sm">ISO 27001</span>
              </div>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
      </section>
    </div>
  );
};

export default Index;
