
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Brain, 
  Stethoscope, 
  Baby, 
  Eye, 
  Bone,
  Microscope,
  Activity,
  Users,
  Clock,
  Star,
  Calendar
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import PublicBreadcrumbs from "@/components/ui/public-breadcrumbs";

const Especialidades = () => {
  const navigate = useNavigate();

  const specialties = [
    {
      icon: Heart,
      name: "Cardiología",
      description: "Diagnóstico y tratamiento de enfermedades del corazón y sistema cardiovascular",
      doctors: 45,
      rating: 4.9,
      consultationPrice: 150,
      color: "bg-red-100 text-red-600",
      features: ["Electrocardiogramas", "Ecocardiogramas", "Monitoreo 24h", "Consultas virtuales"]
    },
    {
      icon: Brain,
      name: "Neurología",
      description: "Tratamiento de trastornos del sistema nervioso y cerebro",
      doctors: 32,
      rating: 4.8,
      consultationPrice: 180,
      color: "bg-purple-100 text-purple-600",
      features: ["Electroencefalogramas", "Estudios del sueño", "Evaluación cognitiva", "Telemedicina"]
    },
    {
      icon: Stethoscope,
      name: "Medicina General",
      description: "Atención médica integral y preventiva para toda la familia",
      doctors: 78,
      rating: 4.7,
      consultationPrice: 100,
      color: "bg-blue-100 text-blue-600",
      features: ["Consultas virtuales", "Medicina preventiva", "Seguimiento crónico", "Urgencias menores"]
    },
    {
      icon: Baby,
      name: "Pediatría",
      description: "Cuidado médico especializado para bebés, niños y adolescentes",
      doctors: 56,
      rating: 4.9,
      consultationPrice: 120,
      color: "bg-green-100 text-green-600",
      features: ["Controles de crecimiento", "Vacunación", "Consultas familiares", "Emergencias pediátricas"]
    },
    {
      icon: Eye,
      name: "Oftalmología",
      description: "Diagnóstico y tratamiento de enfermedades oculares",
      doctors: 28,
      rating: 4.8,
      consultationPrice: 140,
      color: "bg-indigo-100 text-indigo-600",
      features: ["Exámenes de vista", "Cirugía láser", "Glaucoma", "Cataratas"]
    },
    {
      icon: Bone,
      name: "Traumatología",
      description: "Tratamiento de lesiones del sistema musculoesquelético",
      doctors: 34,
      rating: 4.6,
      consultationPrice: 160,
      color: "bg-orange-100 text-orange-600",
      features: ["Fracturas", "Lesiones deportivas", "Artroscopia", "Rehabilitación"]
    },
    {
      icon: Microscope,
      name: "Dermatología",
      description: "Cuidado de la piel, cabello y uñas",
      doctors: 25,
      rating: 4.8,
      consultationPrice: 130,
      color: "bg-pink-100 text-pink-600",
      features: ["Teledermatología", "Análisis de lunares", "Tratamientos estéticos", "Dermatitis"]
    },
    {
      icon: Activity,
      name: "Endocrinología",
      description: "Tratamiento de trastornos hormonales y metabólicos",
      doctors: 22,
      rating: 4.7,
      consultationPrice: 170,
      color: "bg-teal-100 text-teal-600",
      features: ["Diabetes", "Tiroides", "Obesidad", "Osteoporosis"]
    }
  ];

  const handleBookAppointment = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PublicBreadcrumbs 
          items={[
            { label: 'Inicio', href: '/' },
            { label: 'Especialidades', href: '/especialidades' }
          ]} 
        />
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Especialidades Médicas
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Accede a más de 15 especialidades médicas con doctores certificados disponibles 24/7 
            para consultas virtuales y presenciales
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">320+</div>
            <div className="text-gray-600">Especialistas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">15+</div>
            <div className="text-gray-600">Especialidades</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">4.8★</div>
            <div className="text-gray-600">Calificación</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">24h</div>
            <div className="text-gray-600">Disponibilidad</div>
          </div>
        </div>

        {/* Specialties Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {specialties.map((specialty, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-3 rounded-full ${specialty.color}`}>
                    <specialty.icon className="h-6 w-6" />
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{specialty.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-xl">{specialty.name}</CardTitle>
                <CardDescription>{specialty.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{specialty.doctors} doctores</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Desde ${specialty.consultationPrice}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Servicios disponibles:</h4>
                    <div className="flex flex-wrap gap-1">
                      {specialty.features.map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={handleBookAppointment}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Agendar Consulta
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿No encuentras tu especialidad?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Contáctanos y te ayudaremos a encontrar el especialista que necesitas
          </p>
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100"
            onClick={() => navigate('/contacto')}
          >
            Contactar Ahora
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Especialidades;
