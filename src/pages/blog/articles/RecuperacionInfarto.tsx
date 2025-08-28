import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, Share2, ArrowLeft, Heart, Trophy, Target } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import TopNavigation from '@/components/layout/TopNavigation';

const RecuperacionInfarto = () => {
  const navigate = useNavigate();

  const timelineEvents = [
    {
      phase: "Día 0 - El Infarto",
      description: "Roberto sufre un infarto masivo durante una reunión de trabajo",
      details: "Arteria coronaria principal bloqueada al 95%"
    },
    {
      phase: "Semana 1-2 - Estabilización",
      description: "Cirugía de emergencia y cuidados intensivos",
      details: "Colocación de 2 stents, inicio de medicación"
    },
    {
      phase: "Mes 1-3 - Rehabilitación Inicial",
      description: "Programa de rehabilitación cardíaca supervisada",
      details: "Ejercicios de bajo impacto, educación sobre el corazón"
    },
    {
      phase: "Mes 4-6 - Progreso Acelerado",
      description: "Aumento gradual de la intensidad del ejercicio",
      details: "Caminatas de 30 min, ejercicios de resistencia ligera"
    },
    {
      phase: "Mes 7-12 - Transformación",
      description: "Entrenamiento para el maratón bajo supervisión médica",
      details: "Corridas de larga distancia, monitoreo cardíaco continuo"
    },
    {
      phase: "Mes 12 - El Maratón",
      description: "Completa su primer maratón en 4 horas y 15 minutos",
      details: "42.195 km completados sin complicaciones"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <TopNavigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/blog/casos-exito')}
            className="mb-6 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Casos de Éxito
          </Button>
          
          <div className="flex items-center space-x-4 mb-4">
            <Badge variant="secondary" className="flex items-center">
              <Heart className="h-4 w-4 mr-1" />
              Cardiología
            </Badge>
            <span className="flex items-center text-slate-500 text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              18 de Enero, 2024
            </span>
            <span className="flex items-center text-slate-500 text-sm">
              <Clock className="h-4 w-4 mr-1" />
              8 min lectura
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            Recuperación Total Después de un Infarto: La Historia de Roberto
          </h1>
          
          <p className="text-xl text-slate-600 mb-6">
            Roberto superó un infarto masivo y ahora, un año después, ha completado su primer maratón 
            gracias a un programa integral de rehabilitación cardíaca que transformó completamente su vida.
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="font-semibold">Dra. Elena Rodríguez</div>
                <div className="text-sm text-slate-500">Cardióloga y Especialista en Rehabilitación</div>
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
          
          {/* Patient Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">52</div>
                <div className="text-sm text-slate-600">Años de edad</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-red-600">95%</div>
                <div className="text-sm text-slate-600">Bloqueo arterial</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">12</div>
                <div className="text-sm text-slate-600">Meses recuperación</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-purple-600">42km</div>
                <div className="text-sm text-slate-600">Maratón completado</div>
              </CardContent>
            </Card>
          </div>

          <div className="prose prose-lg max-w-none">
            
            {/* Featured Image */}
            <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-8 flex items-center justify-center">
              <div className="text-center text-white">
                <Trophy className="h-16 w-16 mx-auto mb-4" />
                <p className="text-lg">Del Infarto al Maratón</p>
              </div>
            </div>

            {/* Article Content */}
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Un Martes que Cambió Todo</h2>
              
              <p className="text-slate-700 mb-6 leading-relaxed">
                Era un martes cualquiera cuando Roberto Silva, ejecutivo de 52 años, sintió un dolor punzante 
                en el pecho durante una reunión de trabajo. Lo que comenzó como una molestia se transformó 
                rápidamente en una emergencia médica que cambiaría su vida para siempre. Roberto estaba 
                sufriendo un infarto masivo con un 95% de bloqueo en su arteria coronaria principal.
              </p>

              <blockquote className="border-l-4 border-blue-500 pl-6 italic text-slate-600 mb-6 bg-blue-50 p-4 rounded-r-lg">
                "En ese momento pensé que mi vida había terminado. Tenía miedo de no volver a ver crecer 
                a mis hijos, de no cumplir mis sueños. Pero ese día también comenzó la aventura más 
                extraordinaria de mi vida." - Roberto Silva
              </blockquote>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">La Respuesta Médica Inmediata</h3>
              
              <p className="text-slate-700 mb-6 leading-relaxed">
                El equipo de emergencias actuó con precisión quirúrgica. En menos de 90 minutos desde el 
                inicio del dolor, Roberto estaba en el quirófano. Los cardiólogos intervencionistas 
                colocaron dos stents para restablecer el flujo sanguíneo y salvar el músculo cardíaco 
                que aún era viable.
              </p>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6">
                <h4 className="font-semibold text-green-900 mb-2">Factor Clave del Éxito</h4>
                <p className="text-green-800">
                  La rapidez en la respuesta fue crucial. Estudios demuestran que por cada minuto de retraso 
                  en la reperfusión durante un infarto, se pierden aproximadamente 20 células del músculo cardíaco.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">El Programa de Rehabilitación Integral</h3>
              
              <p className="text-slate-700 mb-4 leading-relaxed">
                La verdadera transformación de Roberto comenzó en la Unidad de Rehabilitación Cardíaca. 
                Nuestro enfoque multidisciplinario incluía:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Heart className="h-5 w-5 text-red-500 mr-2" />
                      Rehabilitación Física
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• Ejercicios cardiovasculares progresivos</li>
                      <li>• Entrenamiento de fuerza supervisado</li>
                      <li>• Monitoreo cardíaco continuo</li>
                      <li>• Fisioterapia especializada</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Target className="h-5 w-5 text-blue-500 mr-2" />
                      Soporte Integral
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• Asesoramiento nutricional personalizado</li>
                      <li>• Apoyo psicológico especializado</li>
                      <li>• Educación sobre salud cardíaca</li>
                      <li>• Manejo del estrés y meditación</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">Cronología de la Recuperación</h3>
              
              <div className="space-y-4 mb-8">
                {timelineEvents.map((event, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-slate-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900">{event.phase}</h4>
                      <p className="text-slate-700 text-sm mb-1">{event.description}</p>
                      <p className="text-slate-500 text-xs">{event.details}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">Los Desafíos del Camino</h3>
              
              <p className="text-slate-700 mb-4 leading-relaxed">
                La recuperación no fue un camino fácil. Roberto enfrentó múltiples desafíos que 
                pusieron a prueba su determinación:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-semibold text-red-900 mb-2">Desafíos Físicos</h4>
                  <ul className="text-red-800 text-sm space-y-1">
                    <li>• Fatiga extrema inicial</li>
                    <li>• Dolor en el pecho durante ejercicio</li>
                    <li>• Pérdida de condición física</li>
                    <li>• Efectos secundarios de medicamentos</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-orange-900 mb-2">Desafíos Emocionales</h4>
                  <ul className="text-orange-800 text-sm space-y-1">
                    <li>• Miedo a hacer ejercicio</li>
                    <li>• Ansiedad sobre otro infarto</li>
                    <li>• Depresión post-infarto</li>
                    <li>• Cambios en el estilo de vida</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">El Momento Decisivo</h3>
              
              <p className="text-slate-700 mb-6 leading-relaxed">
                A los seis meses de su infarto, Roberto tomó una decisión que sorprendió a su familia 
                y al equipo médico: quería correr un maratón. "Necesitaba demostrarme a mí mismo que 
                podía superar cualquier límite", recuerda Roberto. Con la aprobación médica y un plan 
                de entrenamiento meticulosamente diseñado, comenzó su preparación para el maratón.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
                <h4 className="font-semibold text-blue-900 mb-2">Plan de Entrenamiento Personalizado</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-blue-900">Meses 7-8:</span>
                    <p className="text-blue-800">Base aeróbica, carreras cortas de 5-10km</p>
                  </div>
                  <div>
                    <span className="font-medium text-blue-900">Meses 9-10:</span>
                    <p className="text-blue-800">Aumento de distancia, carreras de 15-25km</p>
                  </div>
                  <div>
                    <span className="font-medium text-blue-900">Meses 11-12:</span>
                    <p className="text-blue-800">Carreras largas, simulacros de maratón</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">El Día del Maratón</h3>
              
              <p className="text-slate-700 mb-6 leading-relaxed">
                El 15 de octubre de 2023, exactamente 12 meses después de su infarto, Roberto se encontraba 
                en la línea de salida del Maratón de la Ciudad. Con un dispositivo de monitoreo cardíaco 
                y el apoyo de su equipo médico, comenzó los 42.195 kilómetros que representaban mucho más 
                que una carrera: era la demostración definitiva de su recuperación total.
              </p>

              <blockquote className="border-l-4 border-green-500 pl-6 italic text-slate-600 mb-6 bg-green-50 p-4 rounded-r-lg">
                "Cuando crucé la meta en 4 horas y 15 minutos, no solo terminé un maratón. Demostré que 
                un infarto no es el final, puede ser el comienzo de la mejor versión de ti mismo." - Roberto Silva
              </blockquote>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">Resultados Médicos Extraordinarios</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Antes del Infarto</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-slate-600 space-y-2">
                      <li>• Sedentario, 0 ejercicio regular</li>
                      <li>• Peso: 85kg, IMC: 28.5</li>
                      <li>• Colesterol: 280 mg/dl</li>
                      <li>• Presión: 150/95 mmHg</li>
                      <li>• Fumador social</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">12 Meses Después</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-slate-600 space-y-2">
                      <li>• Corredor de maratón</li>
                      <li>• Peso: 72kg, IMC: 23.8</li>
                      <li>• Colesterol: 165 mg/dl</li>
                      <li>• Presión: 120/75 mmHg</li>
                      <li>• No fumador, estilo de vida saludable</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">Lecciones Aprendidas</h3>
              
              <p className="text-slate-700 mb-4 leading-relaxed">
                La historia de Roberto nos enseña valiosas lecciones sobre la recuperación post-infarto:
              </p>

              <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-2">
                <li>La rehabilitación cardíaca supervisada es fundamental para una recuperación óptima</li>
                <li>El apoyo emocional y psicológico es tan importante como la rehabilitación física</li>
                <li>Establecer metas ambiciosas pero realistas puede ser tremendamente motivador</li>
                <li>El seguimiento médico continuo permite detectar y prevenir complicaciones</li>
                <li>Los cambios en el estilo de vida deben ser sostenibles a largo plazo</li>
                <li>El apoyo familiar y del equipo médico es crucial para el éxito</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">Roberto Hoy: Embajador de la Salud Cardíaca</h3>
              
              <p className="text-slate-700 mb-6 leading-relaxed">
                Hoy, Roberto no solo ha mantenido su excelente condición física, sino que se ha convertido 
                en un embajador de la salud cardíaca. Participa en conferencias, grupos de apoyo y ha 
                completado tres maratones adicionales. Su historia ha inspirado a cientos de pacientes 
                cardíacos a no rendirse y buscar la mejor versión de ellos mismos.
              </p>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 mb-6">
                <h4 className="font-semibold text-purple-900 mb-2">Mensaje de Roberto para Otros Pacientes</h4>
                <p className="text-purple-800 italic">
                  "Un infarto no es una sentencia de muerte, es una oportunidad de renacer. Con el equipo médico 
                  correcto, determinación personal y el apoyo de tu familia, puedes lograr cosas que nunca 
                  imaginaste posibles. Mi corazón hoy es más fuerte que antes del infarto, y mi vida tiene 
                  más propósito que nunca."
                </p>
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">Conclusión</h3>
              
              <p className="text-slate-700 mb-4 leading-relaxed">
                La historia de Roberto Silva demuestra que con el tratamiento médico adecuado, un programa 
                de rehabilitación integral y una determinación inquebrantable, es posible no solo recuperarse 
                completamente de un infarto, sino alcanzar niveles de salud y fitness superiores a los previos 
                al evento cardíaco.
              </p>

              <p className="text-slate-700 leading-relaxed">
                Su transformación de ejecutivo sedentario a maratonista en solo 12 meses es un testimonio 
                del poder de la medicina moderna combinada con la capacidad humana de superación. Roberto 
                no solo salvó su vida, la transformó completamente.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default RecuperacionInfarto;