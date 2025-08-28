import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock, Microscope, Beaker, Dna, Brain } from "lucide-react";
import TopNavigation from '@/components/layout/TopNavigation';

const InvestigacionMedica = () => {
  const navigate = useNavigate();
  const researchArticles = [
    {
      id: 1,
      title: "Terapias CAR-T: Revolución en el Tratamiento del Cáncer",
      excerpt: "Nuevos estudios demuestran que las terapias CAR-T modificadas genéticamente logran remisión completa en el 85% de pacientes con leucemia refractaria.",
      content: "Las terapias de células T con receptor de antígeno quimérico (CAR-T) representan uno de los avances más significativos en oncología...",
      author: "Dr. Research Team",
      institution: "Instituto Nacional del Cáncer",
      date: "2024-01-22",
      readTime: "12 min",
      category: "Oncología",
      icon: <Dna className="h-6 w-6" />,
      tags: ["CAR-T", "Inmunoterapia", "Leucemia"],
      studyType: "Ensayo Clínico Fase III",
      participants: "847 pacientes",
      duration: "36 meses"
    },
    {
      id: 2,
      title: "Inteligencia Artificial en Diagnóstico de Alzheimer Temprano",
      excerpt: "Algoritmos de deep learning pueden detectar signos de Alzheimer hasta 10 años antes de los síntomas clínicos con 94% de precisión.",
      content: "Un breakthrough en neurociencia computacional permite identificar patrones sutiles en resonancias magnéticas que predicen el desarrollo de Alzheimer...",
      author: "Dra. neuroscience Team",
      institution: "Universidad Stanford",
      date: "2024-01-20",
      readTime: "10 min",
      category: "Neurología",
      icon: <Brain className="h-6 w-6" />,
      tags: ["IA", "Alzheimer", "Diagnóstico Temprano"],
      studyType: "Estudio Retrospectivo",
      participants: "2,341 participantes",
      duration: "15 años de seguimiento"
    },
    {
      id: 3,
      title: "Medicina Regenerativa: Órganos Bioartificiales Funcionales",
      excerpt: "Científicos logran crear corazones bioartificiales que laten de forma autónoma utilizando células madre del propio paciente.",
      content: "El campo de la medicina regenerativa ha alcanzado un hito histórico con la creación exitosa de órganos bioartificiales completamente funcionales...",
      author: "Dr. Regenerative Medicine Lab",
      institution: "Harvard Medical School",
      date: "2024-01-18",
      readTime: "15 min",
      category: "Medicina Regenerativa",
      icon: <Beaker className="h-6 w-6" />,
      tags: ["Bioingeniería", "Células Madre", "Órganos Artificiales"],
      studyType: "Investigación Experimental",
      participants: "Modelos preclínicos",
      duration: "5 años de desarrollo"
    },
    {
      id: 4,
      title: "Microbioma y Enfermedades Neurológicas: Nuevas Conexiones",
      excerpt: "Estudios revelan que la diversidad del microbioma intestinal está directamente relacionada con la progresión del Parkinson.",
      content: "La conexión intestino-cerebro ha demostrado ser más compleja de lo que se pensaba. Nuevas investigaciones revelan cómo las bacterias intestinales...",
      author: "Dr. Microbiome Research Center",
      institution: "Mayo Clinic",
      date: "2024-01-15",
      readTime: "8 min",
      category: "Microbiología",
      icon: <Microscope className="h-6 w-6" />,
      tags: ["Microbioma", "Parkinson", "Eje Intestino-Cerebro"],
      studyType: "Estudio de Cohorte",
      participants: "1,200 pacientes",
      duration: "7 años de seguimiento"
    },
    {
      id: 5,
      title: "Edición Genética CRISPR: Tratamiento de Enfermedades Hereditarias",
      excerpt: "Primera terapia CRISPR aprobada para anemia falciforme muestra resultados prometedores con 98% de efectividad.",
      content: "La tecnología CRISPR-Cas9 ha revolucionado el tratamiento de enfermedades genéticas. Los últimos ensayos clínicos demuestran...",
      author: "Dr. Gene Therapy Institute",
      institution: "MIT - Broad Institute",
      date: "2024-01-12",
      readTime: "11 min",
      category: "Genética",
      icon: <Dna className="h-6 w-6" />,
      tags: ["CRISPR", "Anemia Falciforme", "Terapia Génica"],
      studyType: "Ensayo Clínico Fase II",
      participants: "45 pacientes",
      duration: "24 meses"
    },
    {
      id: 6,
      title: "Vacunas de ARNm: Más Allá del COVID-19",
      excerpt: "Investigadores desarrollan vacunas de ARNm para cáncer personalizado que estimulan respuesta inmune específica contra tumores.",
      content: "La tecnología de ARNm mensajero que revolucionó las vacunas contra COVID-19 ahora se aplica al tratamiento del cáncer...",
      author: "Dr. mRNA Research Lab",
      institution: "Universidad de Pennsylvania",
      date: "2024-01-10",
      readTime: "9 min",
      category: "Inmunología",
      icon: <Beaker className="h-6 w-6" />,
      tags: ["ARNm", "Vacunas", "Cáncer Personalizado"],
      studyType: "Ensayo Clínico Fase I",
      participants: "120 pacientes",
      duration: "18 meses"
    }
  ];

  const researchCategories = [
    { name: "Oncología", count: 156, color: "bg-red-500" },
    { name: "Neurología", count: 89, color: "bg-purple-500" },
    { name: "Cardiología", count: 124, color: "bg-blue-500" },
    { name: "Genética", count: 67, color: "bg-green-500" },
    { name: "Inmunología", count: 95, color: "bg-yellow-500" },
    { name: "Medicina Regenerativa", count: 43, color: "bg-pink-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <TopNavigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Microscope className="h-16 w-16 text-purple-600 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Investigación Médica
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Los últimos avances y descubrimientos científicos que están transformando la medicina moderna
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="outline">Investigación</Badge>
            <Badge variant="outline">Estudios Clínicos</Badge>
            <Badge variant="outline">Innovación</Badge>
            <Badge variant="outline">Ciencia Médica</Badge>
          </div>
        </div>
      </section>

      {/* Research Categories */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Áreas de Investigación</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {researchCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className={`w-8 h-8 ${category.color} rounded-full mx-auto mb-2`}></div>
                  <div className="font-semibold text-sm">{category.name}</div>
                  <div className="text-xs text-slate-500">{category.count} estudios</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Research Articles Grid */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {researchArticles.map((article) => (
              <Card key={article.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer h-full" onClick={() => {
                if (article.id === 1) navigate('/blog/terapias-car-t');
                // Add more research article links as needed
              }}>
                <CardHeader>
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
                    <Badge variant="secondary" className="flex items-center">
                      {article.icon}
                      <span className="ml-1">{article.category}</span>
                    </Badge>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(article.date).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                  <CardTitle className="group-hover:text-purple-600 transition-colors text-lg leading-tight">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    {article.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Study Details */}
                  <div className="bg-slate-50 rounded-lg p-4 mb-4">
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">Tipo de Estudio:</span> 
                        <span className="text-purple-600">{article.studyType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Participantes:</span> 
                        <span>{article.participants}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Duración:</span> 
                        <span>{article.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Institución:</span> 
                        <span className="text-xs">{article.institution}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {article.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {article.author}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {article.readTime}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Research Impact */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Impacto de la Investigación</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">2,847</div>
                <div className="text-sm text-slate-600">Estudios Publicados</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">156</div>
                <div className="text-sm text-slate-600">Ensayos Clínicos Activos</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">89%</div>
                <div className="text-sm text-slate-600">Tasa de Éxito</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-red-600 mb-2">45+</div>
                <div className="text-sm text-slate-600">Colaboraciones Internacionales</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Beaker className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Participa en Investigación Clínica</h2>
          <p className="text-xl mb-8">
            Forma parte del futuro de la medicina y accede a tratamientos innovadores
          </p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors">
            Conocer Estudios Disponibles
          </button>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Investigación Médica de Vanguardia
          </h3>
          <p className="text-slate-600 leading-relaxed">
            Nuestro compromiso con la investigación médica nos posiciona a la vanguardia de los 
            avances científicos. Colaboramos con las principales instituciones de investigación 
            mundial para desarrollar tratamientos innovadores que transformen la práctica médica. 
            Desde terapias génicas hasta inteligencia artificial en diagnóstico, cada estudio 
            representa un paso hacia un futuro donde las enfermedades que hoy son incurables 
            tengan solución.
          </p>
        </div>
      </section>
    </div>
  );
};

export default InvestigacionMedica;