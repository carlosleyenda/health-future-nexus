
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Shield, 
  Users, 
  Award,
  Target,
  Eye,
  Globe,
  Lightbulb,
  Star,
  Calendar,
  CheckCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import PublicBreadcrumbs from "@/components/ui/public-breadcrumbs";

const Nosotros = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: Heart,
      title: "Compromiso con el Paciente",
      description: "Ponemos al paciente en el centro de todo lo que hacemos, priorizando su bienestar y satisfacción.",
      color: "bg-red-100 text-red-600"
    },
    {
      icon: Shield,
      title: "Seguridad y Privacidad",
      description: "Protegemos la información médica con los más altos estándares de seguridad y cumplimiento normativo.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Lightbulb,
      title: "Innovación Tecnológica",
      description: "Utilizamos la tecnología más avanzada para mejorar continuamente la atención médica.",
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      icon: Users,
      title: "Trabajo en Equipo",
      description: "Creemos en la colaboración entre médicos, pacientes y tecnología para mejores resultados.",
      color: "bg-green-100 text-green-600"
    }
  ];

  const stats = [
    { number: "2018", label: "Año de Fundación" },
    { number: "50K+", label: "Pacientes Activos" },
    { number: "1,200+", label: "Médicos Certificados" },
    { number: "15+", label: "Especialidades" },
    { number: "24/7", label: "Disponibilidad" },
    { number: "98%", label: "Satisfacción" }
  ];

  const team = [
    {
      name: "Dr. María González",
      role: "Directora Médica",
      specialty: "Cardiología",
      experience: "15+ años de experiencia",
      description: "Especialista en telemedicina cardiovascular con certificaciones internacionales."
    },
    {
      name: "Ing. Carlos Rodríguez",
      role: "CTO",
      specialty: "Tecnología Médica",
      experience: "12+ años en HealthTech",
      description: "Experto en sistemas de salud digital y seguridad de datos médicos."
    },
    {
      name: "Dra. Ana Martínez",
      role: "Jefa de Calidad",
      specialty: "Medicina Interna",
      experience: "18+ años de experiencia",
      description: "Líder en protocolos de calidad y mejores prácticas en telemedicina."
    }
  ];

  const milestones = [
    {
      year: "2018",
      title: "Fundación",
      description: "Inicio de operaciones con 5 médicos especialistas"
    },
    {
      year: "2019",
      title: "Primera Expansión",
      description: "Alcanzamos 1,000 pacientes y 50 médicos en la plataforma"
    },
    {
      year: "2020",
      title: "Crecimiento Acelerado",
      description: "Triplicamos usuarios durante la pandemia, llegando a 15,000 pacientes"
    },
    {
      year: "2021",
      title: "Innovación IoT",
      description: "Lanzamiento del sistema de monitoreo de salud con dispositivos conectados"
    },
    {
      year: "2022",
      title: "Certificaciones",
      description: "Obtención de certificaciones internacionales de calidad y seguridad"
    },
    {
      year: "2023",
      title: "Liderazgo Regional",
      description: "Nos convertimos en la plataforma líder de telemedicina con 50K+ usuarios"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PublicBreadcrumbs 
          items={[
            { label: 'Inicio', href: '/' },
            { label: 'Nosotros', href: '/nosotros' }
          ]} 
        />
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Sobre Clínica Virtual
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Somos pioneros en telemedicina, transformando la atención médica através de la tecnología 
            para hacer la salud más accesible, eficiente y personalizada para todos.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center bg-white rounded-lg p-6 shadow-sm">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Target className="h-6 w-6 text-blue-600" />
                <CardTitle className="text-2xl">Nuestra Misión</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                Democratizar el acceso a la atención médica de calidad através de la tecnología, 
                conectando pacientes con especialistas certificados en cualquier momento y lugar, 
                para mejorar la salud y calidad de vida de las personas.
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Eye className="h-6 w-6 text-green-600" />
                <CardTitle className="text-2xl">Nuestra Visión</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                Ser la plataforma líder en telemedicina a nivel global, reconocida por la excelencia 
                en atención médica digital, innovación tecnológica y por transformar positivamente 
                la experiencia de salud de millones de personas.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Nuestros Valores
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className={`mx-auto p-3 rounded-full ${value.color} w-fit mb-4`}>
                    <value.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Nuestra Historia
          </h2>
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start gap-6 bg-white rounded-lg p-6 shadow-sm">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-blue-600">{milestone.year}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Nuestro Equipo Directivo
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription className="font-medium text-blue-600">
                    {member.role}
                  </CardDescription>
                  <Badge variant="outline">{member.specialty}</Badge>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-gray-600 mb-2">{member.experience}</p>
                  <p className="text-sm text-gray-700">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Certificaciones y Reconocimientos
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <Award className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">ISO 27001</h3>
              <p className="text-sm text-gray-600">Seguridad de la información</p>
            </div>
            <div className="text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">HIPAA Compliant</h3>
              <p className="text-sm text-gray-600">Protección de datos médicos</p>
            </div>
            <div className="text-center">
              <Globe className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">FDA Registered</h3>
              <p className="text-sm text-gray-600">Dispositivos médicos certificados</p>
            </div>
            <div className="text-center">
              <Star className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Top Healthcare</h3>
              <p className="text-sm text-gray-600">Premio a la innovación 2023</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Quieres ser parte de nuestro equipo?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Únete a nosotros y ayuda a transformar el futuro de la medicina
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => navigate('/contacto')}
            >
              Trabajar con Nosotros
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600"
              onClick={() => navigate('/auth')}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Agendar Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nosotros;
