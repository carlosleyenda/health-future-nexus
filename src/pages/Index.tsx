
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Video, Calendar, Shield, Users, Clock } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Video,
      title: "Consultas Virtuales",
      description: "Conéctate con médicos especialistas desde la comodidad de tu hogar"
    },
    {
      icon: Calendar,
      title: "Citas 24/7",
      description: "Agenda tu cita médica en cualquier momento del día"
    },
    {
      icon: Heart,
      title: "Monitoreo de Salud",
      description: "Seguimiento continuo de tus signos vitales con dispositivos IoT"
    },
    {
      icon: Shield,
      title: "Datos Seguros",
      description: "Tu información médica protegida con los más altos estándares de seguridad"
    },
    {
      icon: Users,
      title: "Red de Especialistas",
      description: "Acceso a más de 15 especialidades médicas certificadas"
    },
    {
      icon: Clock,
      title: "Respuesta Rápida",
      description: "Atención médica de emergencia disponible las 24 horas"
    }
  ];

  const specialties = [
    "Medicina General", "Cardiología", "Dermatología", "Endocrinología",
    "Ginecología", "Neurología", "Pediatría", "Psiquiatría"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="px-4 py-20 text-center">
        <div className="max-w-6xl mx-auto">
          <Badge variant="outline" className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
            🏥 Clínica Virtual Premium
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Tu Salud, Nuestra Prioridad
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Plataforma integral de telemedicina que conecta pacientes con médicos especialistas, 
            monitoreo de salud IoT y servicios médicos a domicilio.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
              Comenzar como Paciente
            </Button>
            <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg">
              Portal Médicos
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">50K+</div>
              <div className="text-gray-600">Pacientes Activos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">1,200+</div>
              <div className="text-gray-600">Médicos Certificados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">98%</div>
              <div className="text-gray-600">Satisfacción</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">24/7</div>
              <div className="text-gray-600">Disponibilidad</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Servicios de Salud Innovadores
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-blue-500">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="px-4 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-800">
            Especialidades Médicas Disponibles
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Accede a una amplia red de especialistas certificados
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {specialties.map((specialty, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="py-3 px-6 text-sm bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors cursor-pointer"
              >
                {specialty}
              </Badge>
            ))}
          </div>
          
          <Button className="mt-8 bg-green-600 hover:bg-green-700 text-white">
            Ver Todas las Especialidades
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            ¿Listo para Transformar tu Experiencia de Salud?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Únete a miles de pacientes que ya confían en nuestra plataforma
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4">
              Crear Cuenta Gratis
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4">
              Conocer Más
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
