import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, Share2, ArrowLeft, Dumbbell, Play, Pause, RotateCcw } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import TopNavigation from '@/components/layout/TopNavigation';

const RutinaEjercicios = () => {
  const navigate = useNavigate();
  const [activeTimer, setActiveTimer] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const exercises = [
    {
      name: "Sentadillas",
      duration: "45 segundos",
      rest: "15 segundos",
      description: "Mantén la espalda recta, baja como si te fueras a sentar en una silla",
      targetMuscles: "Cuádriceps, glúteos, core",
      difficulty: "Principiante",
      calories: "8-12 por minuto"
    },
    {
      name: "Flexiones",
      duration: "30 segundos",
      rest: "30 segundos",
      description: "Mantén el cuerpo recto, baja hasta que el pecho casi toque el suelo",
      targetMuscles: "Pectorales, tríceps, hombros",
      difficulty: "Intermedio",
      calories: "6-10 por minuto"
    },
    {
      name: "Plancha",
      duration: "30 segundos",
      rest: "30 segundos",
      description: "Mantén el cuerpo en línea recta, contrae el abdomen",
      targetMuscles: "Core, hombros, espalda",
      difficulty: "Principiante",
      calories: "5-8 por minuto"
    },
    {
      name: "Burpees",
      duration: "30 segundos",
      rest: "30 segundos",
      description: "Combina sentadilla, plancha, flexión y salto vertical",
      targetMuscles: "Cuerpo completo",
      difficulty: "Avanzado",
      calories: "12-15 por minuto"
    },
    {
      name: "Mountain Climbers",
      duration: "45 segundos",
      rest: "15 segundos",
      description: "En posición de plancha, alterna llevando las rodillas al pecho",
      targetMuscles: "Core, cardiovascular",
      difficulty: "Intermedio",
      calories: "10-14 por minuto"
    },
    {
      name: "Lunges",
      duration: "45 segundos",
      rest: "15 segundos",
      description: "Da un paso largo hacia adelante, baja la rodilla trasera",
      targetMuscles: "Cuádriceps, glúteos, isquiotibiales",
      difficulty: "Principiante",
      calories: "7-11 por minuto"
    }
  ];

  const weeklyPlan = [
    {
      day: "Lunes",
      focus: "Fuerza Superior",
      exercises: ["Flexiones", "Plancha", "Burpees"],
      duration: "20 min"
    },
    {
      day: "Martes",
      focus: "Cardio HIIT",
      exercises: ["Mountain Climbers", "Burpees", "Sentadillas"],
      duration: "15 min"
    },
    {
      day: "Miércoles",
      focus: "Descanso Activo",
      exercises: ["Estiramientos", "Yoga", "Caminata"],
      duration: "30 min"
    },
    {
      day: "Jueves",
      focus: "Fuerza Inferior",
      exercises: ["Sentadillas", "Lunges", "Plancha"],
      duration: "20 min"
    },
    {
      day: "Viernes",
      focus: "Cuerpo Completo",
      exercises: ["Todos los ejercicios"],
      duration: "25 min"
    },
    {
      day: "Sábado",
      focus: "Cardio Moderado",
      exercises: ["Caminata rápida", "Bicicleta", "Natación"],
      duration: "45 min"
    },
    {
      day: "Domingo",
      focus: "Descanso Total",
      exercises: ["Relajación", "Meditación"],
      duration: "Libre"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <TopNavigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/blog/consejos-salud')}
            className="mb-6 text-orange-600 hover:text-orange-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Consejos de Salud
          </Button>
          
          <div className="flex items-center space-x-4 mb-4">
            <Badge variant="secondary" className="flex items-center">
              <Dumbbell className="h-4 w-4 mr-1" />
              Ejercicio
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
            Rutina de Ejercicios en Casa: 20 Minutos para Transformar tu Día
          </h1>
          
          <p className="text-xl text-slate-600 mb-6">
            Una rutina completa que puedes hacer en casa sin equipamiento especial, diseñada para 
            fortalecer todo tu cuerpo y mejorar tu bienestar en solo 20 minutos diarios.
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="font-semibold">Entrenador Personal Luis Morales</div>
                <div className="text-sm text-slate-500">Certificado ACSM, 10+ años experiencia</div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Compartir
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-orange-600">20</div>
                <div className="text-sm text-slate-600">Minutos</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-red-600">6</div>
                <div className="text-sm text-slate-600">Ejercicios</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">0</div>
                <div className="text-sm text-slate-600">Equipamiento</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">200+</div>
                <div className="text-sm text-slate-600">Calorías</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Featured Image */}
          <div className="aspect-video bg-gradient-to-br from-orange-500 to-red-500 rounded-lg mb-8 flex items-center justify-center">
            <div className="text-center text-white">
              <Dumbbell className="h-16 w-16 mx-auto mb-4" />
              <p className="text-lg">Rutina de Ejercicios Sin Equipamiento</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">¿Por Qué Solo 20 Minutos?</h2>
            
            <p className="text-slate-700 mb-6 leading-relaxed">
              La vida moderna nos presenta múltiples desafíos para mantener una rutina de ejercicio 
              consistente. Entre el trabajo, la familia y las responsabilidades diarias, encontrar 
              tiempo para el gimnasio puede parecer imposible. Sin embargo, la ciencia ha demostrado 
              que entrenamientos cortos e intensos pueden ser tan efectivos como sesiones más largas.
            </p>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mb-6">
              <h4 className="font-semibold text-orange-900 mb-2">Beneficios de los Entrenamientos Cortos</h4>
              <ul className="text-orange-800 text-sm space-y-1">
                <li>• Mayor adherencia y consistencia</li>
                <li>• Menos excusas para no entrenar</li>
                <li>• Mantiene el metabolismo elevado hasta 24 horas</li>
                <li>• Mejora la capacidad cardiovascular eficientemente</li>
                <li>• Puede realizarse en cualquier lugar</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">Los 6 Ejercicios Fundamentales</h3>
            
            <div className="space-y-6 mb-8">
              {exercises.map((exercise, index) => (
                <Card key={index} className="border-l-4 border-orange-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center text-lg">
                        <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                          {index + 1}
                        </div>
                        {exercise.name}
                      </CardTitle>
                      <Badge variant="outline">{exercise.difficulty}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="font-medium text-slate-900">Duración:</span>
                        <p className="text-orange-600 font-semibold">{exercise.duration}</p>
                      </div>
                      <div>
                        <span className="font-medium text-slate-900">Descanso:</span>
                        <p className="text-slate-600">{exercise.rest}</p>
                      </div>
                      <div>
                        <span className="font-medium text-slate-900">Músculos:</span>
                        <p className="text-slate-600">{exercise.targetMuscles}</p>
                      </div>
                      <div>
                        <span className="font-medium text-slate-900">Calorías:</span>
                        <p className="text-green-600">{exercise.calories}</p>
                      </div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <span className="font-medium text-slate-900">Técnica:</span>
                      <p className="text-slate-700 text-sm mt-1">{exercise.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">Cómo Estructurar tu Entrenamiento</h3>
            
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-lg mb-6">
              <h4 className="font-bold text-lg mb-4">Estructura del Entrenamiento (20 minutos)</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">5 min</div>
                  <div className="text-sm opacity-90">Calentamiento</div>
                  <div className="text-xs opacity-75 mt-1">Movilidad articular</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">12 min</div>
                  <div className="text-sm opacity-90">Entrenamiento Principal</div>
                  <div className="text-xs opacity-75 mt-1">6 ejercicios × 2 rondas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">3 min</div>
                  <div className="text-sm opacity-90">Enfriamiento</div>
                  <div className="text-xs opacity-75 mt-1">Estiramientos</div>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">Plan Semanal Completo</h3>
            
            <div className="grid grid-cols-1 gap-4 mb-8">
              {weeklyPlan.map((day, index) => (
                <Card key={index} className={`${index === 2 || index === 6 ? 'bg-blue-50' : 'bg-white'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-slate-900">{day.day}</h4>
                      <Badge variant={index === 2 || index === 6 ? "secondary" : "default"}>
                        {day.duration}
                      </Badge>
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      <span className="font-medium">Enfoque:</span> {day.focus}
                    </div>
                    <div className="text-sm text-slate-700">
                      {day.exercises.join(", ")}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">Progresión y Adaptaciones</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Semana 1-2: Adaptación</h4>
                <ul className="text-slate-700 space-y-1 text-sm">
                  <li>• Enfócate en la técnica correcta</li>
                  <li>• Completa 1 ronda de cada ejercicio</li>
                  <li>• Descansa según necesites</li>
                  <li>• Escucha a tu cuerpo</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Semana 3-4: Intensificación</h4>
                <ul className="text-slate-700 space-y-1 text-sm">
                  <li>• Completa 2 rondas completas</li>
                  <li>• Reduce los tiempos de descanso</li>
                  <li>• Aumenta la velocidad de ejecución</li>
                  <li>• Agrega variaciones más difíciles</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">Modificaciones por Nivel</h3>
            
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-300 p-3 text-left">Ejercicio</th>
                    <th className="border border-slate-300 p-3 text-left">Principiante</th>
                    <th className="border border-slate-300 p-3 text-left">Intermedio</th>
                    <th className="border border-slate-300 p-3 text-left">Avanzado</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr>
                    <td className="border border-slate-300 p-3 font-medium">Flexiones</td>
                    <td className="border border-slate-300 p-3">Rodillas en el suelo</td>
                    <td className="border border-slate-300 p-3">Flexiones regulares</td>
                    <td className="border border-slate-300 p-3">Flexiones diamante</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-3 font-medium">Sentadillas</td>
                    <td className="border border-slate-300 p-3">Con silla de apoyo</td>
                    <td className="border border-slate-300 p-3">Sentadillas regulares</td>
                    <td className="border border-slate-300 p-3">Sentadillas con salto</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-3 font-medium">Plancha</td>
                    <td className="border border-slate-300 p-3">Plancha en rodillas</td>
                    <td className="border border-slate-300 p-3">Plancha completa</td>
                    <td className="border border-slate-300 p-3">Plancha con elevaciones</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">Consejos para el Éxito</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-green-900 mb-2">Antes del Entrenamiento</h4>
                <ul className="text-green-800 text-sm space-y-1">
                  <li>• Hidrátate adecuadamente</li>
                  <li>• Come ligero 1-2 horas antes</li>
                  <li>• Prepara el espacio de ejercicio</li>
                  <li>• Usa ropa cómoda y transpirable</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-900 mb-2">Durante el Entrenamiento</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Mantén una respiración controlada</li>
                  <li>• Concéntrate en la forma correcta</li>
                  <li>• Escucha música motivadora</li>
                  <li>• Mantén la intensidad alta</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">Seguimiento y Progreso</h3>
            
            <p className="text-slate-700 mb-4 leading-relaxed">
              Para maximizar los resultados de tu rutina de 20 minutos, es fundamental llevar un 
              registro de tu progreso. Esto te ayudará a mantener la motivación y ajustar la 
              intensidad según sea necesario.
            </p>

            <div className="bg-slate-50 p-6 rounded-lg mb-6">
              <h4 className="font-semibold text-slate-900 mb-3">Qué Registrar Semanalmente:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium mb-2">Métricas de Rendimiento:</h5>
                  <ul className="text-slate-600 space-y-1">
                    <li>• Repeticiones completadas por ejercicio</li>
                    <li>• Tiempo total de entrenamiento</li>
                    <li>• Nivel de intensidad percibida (1-10)</li>
                    <li>• Días completados vs. planificados</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Métricas Corporales:</h5>
                  <ul className="text-slate-600 space-y-1">
                    <li>• Peso corporal (semanal)</li>
                    <li>• Medidas corporales (quincenal)</li>
                    <li>• Nivel de energía diario</li>
                    <li>• Calidad del sueño</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">Errores Comunes a Evitar</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <h4 className="font-semibold text-red-900 mb-2">❌ Error #1: Saltarse el Calentamiento</h4>
                <p className="text-red-800 text-sm">
                  Ir directo a los ejercicios intensos aumenta el riesgo de lesiones. 
                  Siempre dedica 5 minutos al calentamiento.
                </p>
              </div>
              
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <h4 className="font-semibold text-red-900 mb-2">❌ Error #2: Sacrificar Técnica por Velocidad</h4>
                <p className="text-red-800 text-sm">
                  La forma correcta es más importante que la velocidad. Una mala técnica 
                  puede causar lesiones y reducir la efectividad.
                </p>
              </div>
              
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <h4 className="font-semibold text-red-900 mb-2">❌ Error #3: No Adaptar la Intensidad</h4>
                <p className="text-red-800 text-sm">
                  Mantener siempre la misma intensidad limita el progreso. 
                  Aumenta gradualmente la dificultad cada semana.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">Conclusión</h3>
            
            <p className="text-slate-700 mb-4 leading-relaxed">
              Esta rutina de 20 minutos está diseñada para adaptarse a cualquier estilo de vida, 
              sin importar qué tan ocupado estés. La clave del éxito no está en entrenar horas 
              en el gimnasio, sino en la consistencia y la intensidad de estos breves pero 
              efectivos entrenamientos.
            </p>

            <p className="text-slate-700 leading-relaxed">
              Recuerda que los cambios significativos en tu condición física y salud se logran 
              con el tiempo. Mantén la consistencia, escucha a tu cuerpo, y celebra cada pequeño 
              progreso. En pocas semanas notarás mejoras en tu fuerza, resistencia y energía diaria.
            </p>
          </div>

          {/* Interactive Timer Section */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-8 text-white mb-8">
            <h3 className="text-2xl font-bold mb-4 text-center">🏃‍♂️ ¡Inicia tu Entrenamiento Ahora!</h3>
            <p className="text-center mb-6">Usa nuestro temporizador integrado para seguir la rutina</p>
            <div className="flex justify-center">
              <Button className="bg-white text-orange-600 hover:bg-slate-100 mr-4">
                <Play className="h-4 w-4 mr-2" />
                Comenzar Rutina
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
                <RotateCcw className="h-4 w-4 mr-2" />
                Ver Video Tutorial
              </Button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default RutinaEjercicios;