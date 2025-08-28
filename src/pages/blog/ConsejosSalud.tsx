import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock, Heart, Apple, Dumbbell, Moon } from "lucide-react";
import TopNavigation from '@/components/layout/TopNavigation';

const ConsejosSalud = () => {
  const healthTips = [
    {
      id: 1,
      title: "15 Superalimentos que Debes Incluir en tu Dieta Diaria",
      excerpt: "Descubre los alimentos más nutritivos del planeta y cómo incorporarlos fácilmente en tus comidas para mejorar tu salud de forma natural.",
      content: "Una alimentación equilibrada es la base de una vida saludable. Los superalimentos son aquellos que destacan por su excepcional densidad nutritional...",
      author: "Nutricionista Ana García",
      date: "2024-01-22",
      readTime: "6 min",
      category: "Nutrición",
      icon: <Apple className="h-6 w-6" />,
      tags: ["Nutrición", "Superalimentos", "Dieta Saludable"]
    },
    {
      id: 2,
      title: "Rutina de Ejercicios en Casa: 20 Minutos para Transformar tu Día",
      excerpt: "Una rutina completa que puedes hacer en casa sin equipamiento especial, diseñada para fortalecer todo tu cuerpo y mejorar tu bienestar.",
      content: "No necesitas un gimnasio costoso para mantenerte en forma. Con esta rutina de 20 minutos puedes trabajar todos los grupos musculares...",
      author: "Entrenador Personal Luis Morales",
      date: "2024-01-20",
      readTime: "8 min",
      category: "Ejercicio",
      icon: <Dumbbell className="h-6 w-6" />,
      tags: ["Ejercicio", "Fitness en Casa", "Rutina"]
    },
    {
      id: 3,
      title: "La Importancia del Sueño: Cómo Dormir Mejor para Vivir Mejor",
      excerpt: "Consejos científicamente probados para mejorar la calidad de tu sueño y despertar cada día con más energía y claridad mental.",
      content: "El sueño es uno de los pilares fundamentales de la salud, junto con la alimentación y el ejercicio. Durante el sueño, nuestro cuerpo se repara...",
      author: "Dr. Pedro Sánchez, Especialista en Sueño",
      date: "2024-01-18",
      readTime: "7 min",
      category: "Bienestar",
      icon: <Moon className="h-6 w-6" />,
      tags: ["Sueño", "Descanso", "Bienestar"]
    },
    {
      id: 4,
      title: "Manejo del Estrés: Técnicas Efectivas para la Vida Moderna",
      excerpt: "Estrategias prácticas para reducir el estrés diario y mejorar tu salud mental en un mundo cada vez más acelerado.",
      content: "El estrés crónico es uno de los mayores enemigos de la salud moderna. Afecta tanto nuestra salud física como mental...",
      author: "Psicóloga María Fernández",
      date: "2024-01-15",
      readTime: "5 min",
      category: "Salud Mental",
      icon: <Heart className="h-6 w-6" />,
      tags: ["Estrés", "Salud Mental", "Bienestar"]
    },
    {
      id: 5,
      title: "Hidratación Inteligente: Más Allá de los 8 Vasos de Agua",
      excerpt: "Todo lo que necesitas saber sobre hidratación, cuánta agua realmente necesitas y cómo optimizar tu consumo de líquidos.",
      content: "La hidratación adecuada es fundamental para el funcionamiento óptimo de nuestro organismo, pero las necesidades varían según cada persona...",
      author: "Dra. Carmen Silva, Medicina Deportiva",
      date: "2024-01-12",
      readTime: "4 min",
      category: "Hidratación",
      icon: <Apple className="h-6 w-6" />,
      tags: ["Hidratación", "Salud", "Bienestar"]
    },
    {
      id: 6,
      title: "Vitamina D: El Nutriente del Sol que Transformará tu Salud",
      excerpt: "Por qué la vitamina D es crucial para tu salud, cómo obtenerla naturalmente y cuándo considerar suplementos.",
      content: "La vitamina D, conocida como la 'vitamina del sol', es esencial para la salud ósea, el sistema inmunológico y mucho más...",
      author: "Dr. Roberto Jiménez, Endocrinólogo",
      date: "2024-01-10",
      readTime: "6 min",
      category: "Vitaminas",
      icon: <Heart className="h-6 w-6" />,
      tags: ["Vitamina D", "Suplementos", "Salud Ósea"]
    }
  ];

  const quickTips = [
    "Camina al menos 10,000 pasos al día",
    "Incluye proteína en cada comida",
    "Duerme 7-9 horas por noche",
    "Bebe agua antes de cada comida",
    "Practica la respiración profunda",
    "Come 5 porciones de frutas y verduras diarias"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <TopNavigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Consejos de Salud
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Tips prácticos y científicamente respaldados para mejorar tu bienestar diario
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="outline">Nutrición</Badge>
            <Badge variant="outline">Ejercicio</Badge>
            <Badge variant="outline">Bienestar</Badge>
            <Badge variant="outline">Salud Mental</Badge>
          </div>
        </div>
      </section>

      {/* Quick Tips Bar */}
      <section className="pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-green-500 text-white border-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <Heart className="h-5 w-5 mr-2" />
                Tips Rápidos del Día
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {quickTips.map((tip, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">{tip}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {healthTips.map((tip) => (
              <Card key={tip.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
                    <Badge variant="secondary" className="flex items-center">
                      {tip.icon}
                      <span className="ml-1">{tip.category}</span>
                    </Badge>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(tip.date).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                  <CardTitle className="group-hover:text-green-600 transition-colors text-lg leading-tight">
                    {tip.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    {tip.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <div className="flex flex-wrap gap-1 mb-4">
                    {tip.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {tip.author}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {tip.readTime}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Health Calculator Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Calculadoras de Salud</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">IMC</CardTitle>
                <CardDescription>Calcula tu Índice de Masa Corporal</CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">Calorías Diarias</CardTitle>
                <CardDescription>Descubre cuántas calorías necesitas</CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">Hidratación</CardTitle>
                <CardDescription>Calcula tu necesidad de agua diaria</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Consejos de Salud Respaldados por la Ciencia
          </h3>
          <p className="text-slate-600 leading-relaxed">
            Nuestros consejos de salud están basados en investigación científica actual y son revisados 
            por profesionales médicos. Desde nutrición y ejercicio hasta bienestar mental y hábitos 
            saludables, te proporcionamos información práctica que puedes aplicar inmediatamente para 
            mejorar tu calidad de vida y alcanzar tus objetivos de salud de manera sostenible.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ConsejosSalud;