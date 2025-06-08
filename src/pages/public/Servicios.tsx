
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Video, 
  Calendar, 
  Heart, 
  Shield, 
  Truck, 
  Clock,
  Users,
  Smartphone,
  Monitor,
  FileText,
  MessageCircle,
  Star
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import PublicBreadcrumbs from "@/components/ui/public-breadcrumbs";

const Servicios = () => {
  const navigate = useNavigate();

  const mainServices = [
    {
      icon: Video,
      title: "Consultas Virtuales",
      description: "Consultas médicas por videollamada HD con especialistas certificados",
      features: ["Videollamada HD", "Chat en tiempo real", "Grabación de consulta", "Recetas digitales"],
      price: "Desde $100",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Calendar,
      title: "Citas Presenciales",
      description: "Agenda citas en nuestras clínicas físicas con doctores especialistas",
      features: ["Múltiples ubicaciones", "Horarios flexibles", "Confirmación automática", "Recordatorios"],
      price: "Desde $150",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Heart,
      title: "Monitoreo de Salud",
      description: "Seguimiento continuo con dispositivos IoT conectados",
      features: ["Dispositivos IoT", "Alertas automáticas", "Reportes mensuales", "Análisis predictivo"],
      price: "Desde $200/mes",
      color: "bg-red-100 text-red-600"
    },
    {
      icon: Truck,
      title: "Servicios a Domicilio",
      description: "Atención médica profesional en la comodidad de tu hogar",
      features: ["Consultas a domicilio", "Toma de muestras", "Enfermería", "Urgencias"],
      price: "Desde $300",
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const additionalServices = [
    {
      icon: FileText,
      title: "Recetas Digitales",
      description: "Recetas médicas digitales verificadas y seguras"
    },
    {
      icon: MessageCircle,
      title: "Chat Médico 24/7",
      description: "Consultas rápidas por chat con médicos de guardia"
    },
    {
      icon: Monitor,
      title: "Segunda Opinión",
      description: "Consulta con múltiples especialistas para casos complejos"
    },
    {
      icon: Smartphone,
      title: "App Móvil",
      description: "Acceso completo desde tu smartphone o tablet"
    },
    {
      icon: Shield,
      title: "Seguro Médico",
      description: "Cobertura integral con múltiples planes"
    },
    {
      icon: Users,
      title: "Medicina Familiar",
      description: "Planes especiales para toda la familia"
    }
  ];

  const plans = [
    {
      name: "Básico",
      price: "$99",
      period: "/mes",
      features: [
        "2 consultas virtuales",
        "Chat médico limitado",
        "Recetas digitales",
        "Recordatorios básicos"
      ],
      popular: false
    },
    {
      name: "Premium",
      price: "$199",
      period: "/mes",
      features: [
        "Consultas virtuales ilimitadas",
        "Chat médico 24/7",
        "Monitoreo de salud IoT",
        "1 consulta a domicilio",
        "Segunda opinión",
        "Reportes detallados"
      ],
      popular: true
    },
    {
      name: "Familiar",
      price: "$349",
      period: "/mes",
      features: [
        "Todo lo del plan Premium",
        "Hasta 5 miembros",
        "Pediatría especializada",
        "Consultas familiares",
        "Descuentos en medicamentos",
        "Coordinador de salud personal"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PublicBreadcrumbs 
          items={[
            { label: 'Inicio', href: '/' },
            { label: 'Servicios', href: '/servicios' }
          ]} 
        />
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Nuestros Servicios
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tecnología médica avanzada y atención personalizada para cuidar tu salud 
            desde cualquier lugar, en cualquier momento
          </p>
        </div>

        {/* Main Services */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {mainServices.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${service.color}`}>
                    <service.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <Badge variant="outline" className="mt-1">{service.price}</Badge>
                  </div>
                </div>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Services */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Servicios Adicionales
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <service.icon className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </div>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Planes de Membresía
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative hover:shadow-lg transition-shadow duration-300 ${plan.popular ? 'border-blue-500 border-2' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">
                      Más Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-blue-600">{plan.price}</span>
                    <span className="text-gray-500">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-green-600 fill-current" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-800 hover:bg-gray-900'} text-white`}
                    onClick={() => navigate('/auth')}
                  >
                    Comenzar Ahora
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className="bg-white rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            ¿Cómo Funciona?
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold mb-2">Regístrate</h3>
              <p className="text-sm text-gray-600">Crea tu cuenta en menos de 2 minutos</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="font-semibold mb-2">Agenda</h3>
              <p className="text-sm text-gray-600">Selecciona especialista y horario</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-semibold mb-2">Consulta</h3>
              <p className="text-sm text-gray-600">Conéctate con tu médico</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="font-semibold mb-2">Seguimiento</h3>
              <p className="text-sm text-gray-600">Recibe tu tratamiento y seguimiento</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para comenzar?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Únete a miles de pacientes que ya confían en nuestra plataforma
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => navigate('/auth')}
            >
              Comenzar Gratis
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600"
              onClick={() => navigate('/contacto')}
            >
              Contactar Ventas
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Servicios;
