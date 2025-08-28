import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock, Trophy, Heart, Star } from "lucide-react";
import TopNavigation from '@/components/layout/TopNavigation';

const CasosExito = () => {
  const successStories = [
    {
      id: 1,
      title: "De la Diabetes Tipo 2 a una Vida Completamente Saludable",
      excerpt: "María, de 45 años, logró revertir su diabetes tipo 2 en 8 meses a través de cambios en su estilo de vida y el apoyo de nuestro equipo médico.",
      patientName: "María González",
      age: 45,
      condition: "Diabetes Tipo 2",
      duration: "8 meses",
      result: "Reversión completa",
      doctor: "Dr. Carlos Mendoza",
      date: "2024-01-20",
      readTime: "6 min",
      category: "Endocrinología",
      tags: ["Diabetes", "Nutrición", "Estilo de Vida"],
      testimonial: "Nunca pensé que podría volver a sentirme tan bien. El equipo de MediCare me dio las herramientas y el apoyo que necesitaba para cambiar mi vida por completo."
    },
    {
      id: 2,
      title: "Recuperación Total Después de un Infarto: La Historia de Roberto",
      excerpt: "Roberto superó un infarto masivo y ahora, un año después, ha completado su primer maratón gracias a un programa integral de rehabilitación cardíaca.",
      patientName: "Roberto Silva",
      age: 52,
      condition: "Infarto de Miocardio",
      duration: "12 meses",
      result: "Maratonista",
      doctor: "Dra. Elena Rodríguez",
      date: "2024-01-18",
      readTime: "8 min",
      category: "Cardiología",
      tags: ["Infarto", "Rehabilitación", "Maratón"],
      testimonial: "Mi vida cambió completamente después del infarto, pero el programa de rehabilitación me devolvió no solo la salud, sino también la confianza para superar mis límites."
    },
    {
      id: 3,
      title: "Venciendo la Depresión: El Camino de Lucía hacia la Recuperación",
      excerpt: "Lucía superó una depresión mayor que la mantuvo incapacitada durante dos años, utilizando un enfoque integral que combina terapia, medicación y apoyo familiar.",
      patientName: "Lucía Martínez",
      age: 38,
      condition: "Depresión Mayor",
      duration: "18 meses",
      result: "Recuperación completa",
      doctor: "Dr. Miguel Santos",
      date: "2024-01-15",
      readTime: "7 min",
      category: "Salud Mental",
      tags: ["Depresión", "Terapia", "Recuperación"],
      testimonial: "Pensé que nunca volvería a ser yo misma. Gracias al tratamiento integral y al apoyo constante, he recuperado no solo mi salud mental, sino también mi pasión por la vida."
    },
    {
      id: 4,
      title: "Una Segunda Oportunidad: Transplante de Riñón Exitoso",
      excerpt: "Después de 3 años en diálisis, Juan recibió un trasplante de riñón de donante vivo. Hoy, 2 años después, lleva una vida completamente normal.",
      patientName: "Juan Pérez",
      age: 41,
      condition: "Insuficiencia Renal",
      duration: "24 meses post-trasplante",
      result: "Función renal normal",
      doctor: "Dr. Patricia López",
      date: "2024-01-12",
      readTime: "9 min",
      category: "Nefrología",
      tags: ["Trasplante", "Riñón", "Donante Vivo"],
      testimonial: "El trasplante me devolvió la vida. Ahora puedo disfrutar tiempo con mi familia sin las limitaciones de la diálisis. Estoy eternamente agradecido."
    },
    {
      id: 5,
      title: "Superando el Cáncer de Mama: La Fortaleza de Carmen",
      excerpt: "Carmen fue diagnosticada con cáncer de mama en estadio III. Después de un tratamiento multidisciplinario, está libre de cáncer desde hace 3 años.",
      patientName: "Carmen Ruiz",
      age: 49,
      condition: "Cáncer de Mama Estadio III",
      duration: "3 años libre de cáncer",
      result: "Remisión completa",
      doctor: "Dr. Fernando García",
      date: "2024-01-10",
      readTime: "8 min",
      category: "Oncología",
      tags: ["Cáncer", "Mama", "Remisión"],
      testimonial: "El diagnóstico fue devastador, pero el equipo oncológico me guió paso a paso. Hoy celebro tres años libre de cáncer y valoro cada momento de la vida."
    },
    {
      id: 6,
      title: "Recuperación Neurológica Extraordinaria: El Milagro de Pedro",
      excerpt: "Pedro sufrió un accidente cerebrovascular severo que lo dejó con parálisis del lado derecho. Hoy camina y ha recuperado el 90% de su movilidad.",
      patientName: "Pedro Torres",
      age: 56,
      condition: "ACV Isquémico",
      duration: "14 meses",
      result: "90% recuperación motora",
      doctor: "Dra. Ana Jiménez",
      date: "2024-01-08",
      readTime: "7 min",
      category: "Neurología",
      tags: ["ACV", "Rehabilitación", "Neuroplasticidad"],
      testimonial: "Los médicos me dijeron que probablemente no volvería a caminar. Hoy no solo camino, sino que he vuelto a trabajar. La neuroplasticidad es increíble."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <TopNavigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Casos de Éxito
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Historias reales de recuperación, superación y esperanza que inspiran y motivan
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="outline">Recuperación</Badge>
            <Badge variant="outline">Inspiración</Badge>
            <Badge variant="outline">Testimonio Real</Badge>
            <Badge variant="outline">Superación</Badge>
          </div>
        </div>
      </section>

      {/* Success Stats */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
            <CardContent className="py-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold mb-2">98%</div>
                  <div className="text-sm opacity-90">Tasa de Satisfacción</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">15,000+</div>
                  <div className="text-sm opacity-90">Pacientes Tratados</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">95%</div>
                  <div className="text-sm opacity-90">Casos Exitosos</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">24/7</div>
                  <div className="text-sm opacity-90">Soporte Médico</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Success Stories Grid */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {successStories.map((story) => (
              <Card key={story.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
                    <Badge variant="secondary">{story.category}</Badge>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(story.date).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                  <CardTitle className="group-hover:text-blue-600 transition-colors text-lg leading-tight">
                    {story.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    {story.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Patient Info */}
                  <div className="bg-slate-50 rounded-lg p-4 mb-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Paciente:</span> {story.patientName}, {story.age} años
                      </div>
                      <div>
                        <span className="font-medium">Condición:</span> {story.condition}
                      </div>
                      <div>
                        <span className="font-medium">Duración:</span> {story.duration}
                      </div>
                      <div>
                        <span className="font-medium text-green-600">Resultado:</span> {story.result}
                      </div>
                    </div>
                  </div>

                  {/* Testimonial */}
                  <blockquote className="border-l-4 border-blue-500 pl-4 italic text-slate-600 mb-4">
                    "{story.testimonial}"
                  </blockquote>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {story.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {story.doctor}
                    </span>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{story.readTime}</span>
                      <div className="flex">
                        {[1,2,3,4,5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-medical-primary to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Heart className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Tu Historia de Éxito Podría Ser la Siguiente</h2>
          <p className="text-xl mb-8">
            Únete a miles de pacientes que han transformado sus vidas con nuestro cuidado médico integral
          </p>
          <button className="bg-white text-medical-primary px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors">
            Programa tu Consulta
          </button>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Casos de Éxito Reales en MediCare
          </h3>
          <p className="text-slate-600 leading-relaxed">
            Estas historias representan casos reales de pacientes que han superado condiciones médicas 
            complejas gracias a nuestro enfoque integral de atención médica. Cada caso demuestra el 
            poder de la medicina personalizada, el trabajo en equipo multidisciplinario y la 
            importancia del apoyo continuo en el proceso de recuperación. Nuestros casos de éxito 
            abarcan todas las especialidades médicas y reflejan nuestro compromiso con la excelencia 
            en el cuidado de la salud.
          </p>
        </div>
      </section>
    </div>
  );
};

export default CasosExito;