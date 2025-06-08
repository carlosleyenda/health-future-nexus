import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Video, Calendar, Shield, Users, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();

  // Si el usuario está autenticado, redirigir al dashboard apropiado
  React.useEffect(() => {
    if (isAuthenticated && user) {
      // No redirigir automáticamente, dejar que el usuario explore
    }
  }, [isAuthenticated, user]);

  const features = [
    {
      icon: Video,
      title: "Consultas Virtuales",
      description: "Conéctate con médicos especialistas desde la comodidad de tu hogar",
      color: "text-blue-600"
    },
    {
      icon: Calendar,
      title: "Citas 24/7",
      description: "Agenda tu cita médica en cualquier momento del día",
      color: "text-green-600"
    },
    {
      icon: Heart,
      title: "Monitoreo de Salud",
      description: "Seguimiento continuo de tus signos vitales con dispositivos IoT",
      color: "text-red-600"
    },
    {
      icon: Shield,
      title: "Datos Seguros",
      description: "Tu información médica protegida con los más altos estándares de seguridad",
      color: "text-purple-600"
    },
    {
      icon: Users,
      title: "Red de Especialistas",
      description: "Acceso a más de 15 especialidades médicas certificadas",
      color: "text-orange-600"
    },
    {
      icon: Clock,
      title: "Respuesta Rápida",
      description: "Atención médica de emergencia disponible las 24 horas",
      color: "text-indigo-600"
    }
  ];

  const specialties = [
    "Medicina General", "Cardiología", "Dermatología", "Endocrinología",
    "Ginecología", "Neurología", "Pediatría", "Psiquiatría"
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
      {/* Hero Section mejorado */}
      <section className="px-4 py-16 lg:py-20 text-center">
        <div className="max-w-6xl mx-auto">
          <Badge variant="outline" className="mb-6 bg-blue-100 text-blue-800 border-blue-200 text-sm">
            🏥 Plataforma Médica Premium
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent leading-tight">
            Tu Salud, Nuestra Prioridad
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Plataforma integral de telemedicina que conecta pacientes con médicos especialistas, 
            monitoreo de salud IoT y servicios médicos a domicilio.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 max-w-md sm:max-w-none mx-auto">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg group"
              onClick={handleGetStarted}
            >
              {isAuthenticated ? 'Ir al Dashboard' : 'Comenzar Ahora'}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg"
              onClick={handleLearnMore}
            >
              Conocer Más
            </Button>
          </div>

          {/* Stats mejoradas */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-4xl mx-auto">
            <div className="text-center p-4">
              <div className="text-2xl lg:text-3xl font-bold text-blue-600 mb-1">50K+</div>
              <div className="text-sm lg:text-base text-gray-600">Pacientes Activos</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl lg:text-3xl font-bold text-green-600 mb-1">1,200+</div>
              <div className="text-sm lg:text-base text-gray-600">Médicos Certificados</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl lg:text-3xl font-bold text-purple-600 mb-1">98%</div>
              <div className="text-sm lg:text-base text-gray-600">Satisfacción</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl lg:text-3xl font-bold text-orange-600 mb-1">24/7</div>
              <div className="text-sm lg:text-base text-gray-600">Disponibilidad</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section mejorado */}
      <section className="px-4 py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
              Servicios de Salud Innovadores
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubre todas las herramientas que tenemos para cuidar tu salud
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500 group">
                <CardHeader className="pb-4">
                  <feature.icon className={`h-12 w-12 ${feature.color} mb-4 group-hover:scale-110 transition-transform`} />
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties Section mejorado */}
      <section className="px-4 py-16 lg:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-800">
            Especialidades Médicas Disponibles
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Accede a una amplia red de especialistas certificados
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4 mb-8">
            {specialties.map((specialty, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="py-3 px-4 lg:px-6 text-sm bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors cursor-pointer"
              >
                {specialty}
              </Badge>
            ))}
          </div>
          
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={handleGetStarted}
          >
            Ver Todas las Especialidades
          </Button>
        </div>
      </section>

      {/* CTA Section mejorado */}
      <section className="px-4 py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            ¿Listo para Transformar tu Experiencia de Salud?
          </h2>
          <p className="text-lg lg:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Únete a miles de pacientes que ya confían en nuestra plataforma
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 transition-colors"
              onClick={handleGetStarted}
            >
              {isAuthenticated ? 'Acceder' : 'Crear Cuenta Gratis'}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 transition-colors"
              onClick={handleLearnMore}
            >
              Conocer Más
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
