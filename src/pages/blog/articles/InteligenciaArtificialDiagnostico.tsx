import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, Share2, ArrowLeft, Brain, Stethoscope } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import TopNavigation from '@/components/layout/TopNavigation';

const InteligenciaArtificialDiagnostico = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <TopNavigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/blog/noticias-medicas')}
            className="mb-6 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Noticias Médicas
          </Button>
          
          <div className="flex items-center space-x-4 mb-4">
            <Badge variant="secondary" className="flex items-center">
              <Brain className="h-4 w-4 mr-1" />
              Tecnología Médica
            </Badge>
            <span className="flex items-center text-slate-500 text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              20 de Enero, 2024
            </span>
            <span className="flex items-center text-slate-500 text-sm">
              <Clock className="h-4 w-4 mr-1" />
              8 min lectura
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            Inteligencia Artificial en Diagnóstico Médico: Una Revolución en Marcha
          </h1>
          
          <p className="text-xl text-slate-600 mb-6">
            Los algoritmos de IA están alcanzando una precisión del 95% en diagnósticos de cáncer de piel, 
            superando en algunos casos a dermatólogos experimentados y transformando la medicina moderna.
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-medical-primary rounded-full flex items-center justify-center mr-4">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="font-semibold">Dr. Carlos Mendoza</div>
                <div className="text-sm text-slate-500">Especialista en Tecnología Médica</div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Compartir
            </Button>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            
            {/* Featured Image */}
            <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-8 flex items-center justify-center">
              <div className="text-center text-white">
                <Stethoscope className="h-16 w-16 mx-auto mb-4" />
                <p className="text-lg">Inteligencia Artificial en Medicina</p>
              </div>
            </div>

            {/* Article Content */}
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">La Revolución Digital en el Diagnóstico Médico</h2>
              
              <p className="text-slate-700 mb-6 leading-relaxed">
                La inteligencia artificial está transformando el panorama del diagnóstico médico de maneras que parecían 
                imposibles hace apenas una década. Los sistemas de IA ahora pueden analizar imágenes médicas, desde 
                radiografías hasta resonancias magnéticas, con una precisión que rivaliza e incluso supera la de 
                especialistas humanos en ciertos casos.
              </p>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">Precisión Sin Precedentes</h3>
              
              <p className="text-slate-700 mb-6 leading-relaxed">
                En el campo de la dermatología, los algoritmos de deep learning han demostrado una capacidad 
                extraordinaria para detectar melanomas y otros tipos de cáncer de piel. Un estudio reciente 
                publicado en Nature Medicine mostró que el sistema de IA desarrollado por Google Health alcanzó 
                una precisión del 95.1% en la detección de cáncer de piel, comparado con el 91.3% de precisión 
                promedio de dermatólogos certificados.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
                <h4 className="font-semibold text-blue-900 mb-2">Dato Clave</h4>
                <p className="text-blue-800">
                  Los sistemas de IA pueden procesar y analizar más de 100,000 imágenes médicas en el tiempo 
                  que le tomaría a un radiólogo revisar apenas 100 casos.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">Aplicaciones Actuales</h3>
              
              <p className="text-slate-700 mb-4 leading-relaxed">
                Las aplicaciones de la IA en diagnóstico médico se extienden far beyond dermatología:
              </p>

              <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-2">
                <li><strong>Radiología:</strong> Detección temprana de tumores en mamografías y TC</li>
                <li><strong>Oftalmología:</strong> Diagnóstico de retinopatía diabética y degeneración macular</li>
                <li><strong>Cardiología:</strong> Análisis de ECG y detección de arritmias</li>
                <li><strong>Patología:</strong> Análisis de biopsias y detección de células cancerosas</li>
                <li><strong>Neurología:</strong> Detección temprana de Alzheimer en resonancias magnéticas</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">El Impacto en la Práctica Médica</h3>
              
              <p className="text-slate-700 mb-6 leading-relaxed">
                La implementación de sistemas de IA no busca reemplazar a los médicos, sino potenciar sus 
                capacidades diagnósticas. Los algoritmos actúan como una "segunda opinión" altamente especializada, 
                ayudando a los profesionales a detectar casos que podrían pasar desapercibidos y reduciendo 
                significativamente los errores diagnósticos.
              </p>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">Desafíos y Consideraciones Éticas</h3>
              
              <p className="text-slate-700 mb-4 leading-relaxed">
                A pesar de los avances prometedores, la implementación de IA en diagnóstico médico enfrenta 
                varios desafíos importantes:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Desafíos Técnicos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• Sesgo en datos de entrenamiento</li>
                      <li>• Interpretabilidad de algoritmos</li>
                      <li>• Integración con sistemas existentes</li>
                      <li>• Validación clínica continua</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Consideraciones Éticas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• Privacidad de datos médicos</li>
                      <li>• Responsabilidad médico-legal</li>
                      <li>• Acceso equitativo a la tecnología</li>
                      <li>• Transparencia en decisiones</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">El Futuro de la IA en Medicina</h3>
              
              <p className="text-slate-700 mb-6 leading-relaxed">
                Los próximos años prometen avances aún más significativos. Se espera que los sistemas de IA 
                puedan realizar diagnósticos multimodales, combinando imágenes médicas, datos de laboratorio, 
                historial clínico y hasta información genética para proporcionar diagnósticos más precisos y 
                personalizados.
              </p>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6">
                <h4 className="font-semibold text-green-900 mb-2">Perspectiva Futura</h4>
                <p className="text-green-800">
                  Para 2030, se estima que el 80% de los hospitales principales utilizarán sistemas de IA 
                  para diagnóstico médico, reduciendo errores diagnósticos en un 30% y mejorando los 
                  resultados de los pacientes significativamente.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">Conclusión</h3>
              
              <p className="text-slate-700 mb-6 leading-relaxed">
                La inteligencia artificial en diagnóstico médico representa una de las innovaciones más 
                prometedoras de nuestro tiempo. Aunque aún enfrentamos desafíos importantes en términos de 
                implementación, ética y regulación, el potencial para mejorar la precisión diagnóstica, 
                reducir costos y, más importante aún, salvar vidas, es extraordinario.
              </p>

              <p className="text-slate-700 leading-relaxed">
                La clave del éxito estará en la colaboración entre tecnólogos, médicos, reguladores y 
                pacientes para asegurar que esta tecnología se implemente de manera responsable y beneficie 
                a toda la sociedad.
              </p>
            </div>

            {/* Related Articles */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Artículos Relacionados</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <Badge variant="outline" className="w-fit mb-2">Tecnología</Badge>
                    <CardTitle className="text-lg">Machine Learning en Radiología: Casos de Uso Prácticos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 text-sm">Explora cómo el aprendizaje automático está transformando la interpretación de imágenes médicas...</p>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <Badge variant="outline" className="w-fit mb-2">Investigación</Badge>
                    <CardTitle className="text-lg">Algoritmos Predictivos en Medicina de Emergencia</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 text-sm">Descubre cómo la IA está ayudando a predecir complicaciones médicas antes de que ocurran...</p>
                  </CardContent>
                </Card>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default InteligenciaArtificialDiagnostico;