import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock, Share2, BookOpen } from "lucide-react";
import TopNavigation from '@/components/layout/TopNavigation';

const NoticiasMedicas = () => {
  const navigate = useNavigate();
  const articles = [
    {
      id: 1,
      title: "Inteligencia Artificial en Diagnóstico Médico: Una Revolución en Marcha",
      excerpt: "Los algoritmos de IA están alcanzando una precisión del 95% en diagnósticos de cáncer de piel, superando en algunos casos a dermatólogos experimentados.",
      content: "La inteligencia artificial está transformando el panorama del diagnóstico médico de maneras que parecían imposibles hace apenas una década. Los sistemas de IA ahora pueden analizar imágenes médicas, desde radiografías hasta resonancias magnéticas, con una precisión que rivaliza e incluso supera la de especialistas humanos en ciertos casos...",
      author: "Dr. Carlos Mendoza",
      date: "2024-01-20",
      readTime: "8 min",
      category: "Tecnología Médica",
      tags: ["IA", "Diagnóstico", "Innovación"]
    },
    {
      id: 2,
      title: "Terapia Génica: Nuevos Tratamientos para Enfermedades Raras",
      excerpt: "La FDA aprueba tres nuevas terapias génicas para tratar enfermedades hereditarias que antes no tenían cura.",
      content: "El campo de la terapia génica ha experimentado avances extraordinarios en los últimos años. Recientemente, la FDA ha aprobado tres nuevas terapias génicas que prometen cambiar la vida de pacientes con enfermedades hereditarias raras...",
      author: "Dra. Elena Rodríguez",
      date: "2024-01-18",
      readTime: "6 min",
      category: "Genética",
      tags: ["Terapia Génica", "FDA", "Enfermedades Raras"]
    },
    {
      id: 3,
      title: "Medicina Personalizada: El Futuro de los Tratamientos Oncológicos",
      excerpt: "Los biomarcadores tumorales permiten personalizar tratamientos de quimioterapia, aumentando la eficacia hasta un 40%.",
      content: "La medicina personalizada está revolucionando el tratamiento del cáncer. Mediante el análisis de biomarcadores específicos del tumor de cada paciente, los oncólogos pueden ahora seleccionar tratamientos más efectivos y con menos efectos secundarios...",
      author: "Dr. Miguel Santos",
      date: "2024-01-15",
      readTime: "7 min",
      category: "Oncología",
      tags: ["Medicina Personalizada", "Cáncer", "Biomarcadores"]
    },
    {
      id: 4,
      title: "Telemedicina Post-Pandemia: Adoption y Nuevos Horizontes",
      excerpt: "El 78% de los pacientes prefiere mantener consultas híbridas, combinando atención presencial y virtual.",
      content: "La pandemia de COVID-19 aceleró la adopción de la telemedicina de manera sin precedentes. Ahora, con más de dos años de experiencia, podemos evaluar su impacto real en la atención médica...",
      author: "Dra. Patricia López",
      date: "2024-01-12",
      readTime: "5 min",
      category: "Telemedicina",
      tags: ["Telemedicina", "COVID-19", "Atención Virtual"]
    },
    {
      id: 5,
      title: "Avances en Medicina Regenerativa: Impresión 3D de Órganos",
      excerpt: "Científicos logran imprimir tejido cardíaco funcional que late de forma sincronizada in vitro.",
      content: "La medicina regenerativa ha alcanzado un hito histórico con la impresión 3D exitosa de tejido cardíaco que muestra actividad eléctrica coordenada. Este avance podría revolucionar el tratamiento de enfermedades cardíacas...",
      author: "Dr. Fernando García",
      date: "2024-01-10",
      readTime: "9 min",
      category: "Medicina Regenerativa",
      tags: ["Impresión 3D", "Medicina Regenerativa", "Cardiología"]
    },
    {
      id: 6,
      title: "Microbioma Intestinal: Nueva Frontera en el Tratamiento de Enfermedades",
      excerpt: "Estudios revelan la conexión entre la microbiota intestinal y enfermedades neurológicas como el Alzheimer.",
      content: "La investigación sobre el microbioma intestinal está revelando conexiones sorprendentes entre las bacterias de nuestro intestino y nuestra salud general, incluyendo enfermedades neurológicas...",
      author: "Dra. Carmen Ruiz",
      date: "2024-01-08",
      readTime: "6 min",
      category: "Microbiología",
      tags: ["Microbioma", "Neurología", "Alzheimer"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <TopNavigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Noticias Médicas
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Mantente al día con los últimos avances y descubrimientos en el mundo de la medicina
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="outline">Últimas Noticias</Badge>
            <Badge variant="outline">Investigación</Badge>
            <Badge variant="outline">Innovación</Badge>
            <Badge variant="outline">Tecnología Médica</Badge>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <Card key={article.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer h-full" onClick={() => {
                if (article.id === 1) navigate('/blog/inteligencia-artificial-diagnostico');
                if (article.id === 2) navigate('/blog/terapia-genica');
                // Add more article links as needed
              }}>
                <CardHeader>
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
                    <Badge variant="secondary">{article.category}</Badge>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(article.date).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                  <CardTitle className="group-hover:text-medical-primary transition-colors text-lg leading-tight">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    {article.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <div className="flex flex-wrap gap-1 mb-4">
                    {article.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {article.author}
                    </span>
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {article.readTime}
                      </span>
                      <Share2 className="h-4 w-4 hover:text-medical-primary cursor-pointer" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-medical-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <BookOpen className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Suscríbete a Nuestro Newsletter</h2>
          <p className="text-xl mb-8">
            Recibe las últimas noticias médicas directamente en tu correo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="tu@email.com" 
              className="flex-1 px-4 py-2 rounded-lg text-slate-900"
            />
            <button className="px-6 py-2 bg-white text-medical-primary rounded-lg font-semibold hover:bg-slate-100 transition-colors">
              Suscribirse
            </button>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Noticias Médicas Confiables y Actualizadas
          </h3>
          <p className="text-slate-600 leading-relaxed">
            En MediCare, nos comprometemos a proporcionar información médica precisa y actualizada. 
            Nuestro equipo de profesionales médicos revisa cada artículo para garantizar que recibas 
            las noticias más importantes del mundo de la medicina, desde avances en investigación 
            hasta nuevos tratamientos y tecnologías que están transformando la atención sanitaria.
          </p>
        </div>
      </section>
    </div>
  );
};

export default NoticiasMedicas;