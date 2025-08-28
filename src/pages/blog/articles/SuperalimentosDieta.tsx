import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, Share2, ArrowLeft, Apple, Leaf } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import TopNavigation from '@/components/layout/TopNavigation';

const SuperalimentosDieta = () => {
  const navigate = useNavigate();

  const superfoods = [
    {
      name: "Arándanos",
      benefits: "Antioxidantes, memoria, salud cardiovascular",
      nutrients: "Vitamina C, K, manganeso, antocianinas",
      howToEat: "En batidos, yogurt, cereales o como snack"
    },
    {
      name: "Quinoa",
      benefits: "Proteína completa, fibra, sin gluten",
      nutrients: "Proteínas, magnesio, hierro, lisina",
      howToEat: "En ensaladas, como base de platos, en sopas"
    },
    {
      name: "Aguacate",
      benefits: "Grasas saludables, potasio, folato",
      nutrients: "Grasas monoinsaturadas, vitamina K, E",
      howToEat: "En tostadas, ensaladas, guacamole, batidos"
    },
    {
      name: "Salmón",
      benefits: "Omega-3, proteína de calidad, vitamina D",
      nutrients: "EPA, DHA, proteínas, vitamina B12",
      howToEat: "A la parrilla, al horno, en ensaladas"
    },
    {
      name: "Espinacas",
      benefits: "Hierro, folato, antioxidantes",
      nutrients: "Vitamina A, K, C, magnesio, hierro",
      howToEat: "En ensaladas, batidos verdes, salteadas"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <TopNavigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/blog/consejos-salud')}
            className="mb-6 text-green-600 hover:text-green-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Consejos de Salud
          </Button>
          
          <div className="flex items-center space-x-4 mb-4">
            <Badge variant="secondary" className="flex items-center">
              <Apple className="h-4 w-4 mr-1" />
              Nutrición
            </Badge>
            <span className="flex items-center text-slate-500 text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              22 de Enero, 2024
            </span>
            <span className="flex items-center text-slate-500 text-sm">
              <Clock className="h-4 w-4 mr-1" />
              6 min lectura
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            15 Superalimentos que Debes Incluir en tu Dieta Diaria
          </h1>
          
          <p className="text-xl text-slate-600 mb-6">
            Descubre los alimentos más nutritivos del planeta y cómo incorporarlos fácilmente en tus 
            comidas para mejorar tu salud de forma natural y sostenible.
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="font-semibold">Nutricionista Ana García</div>
                <div className="text-sm text-slate-500">Especialista en Nutrición Clínica</div>
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
            <div className="aspect-video bg-gradient-to-br from-green-500 to-blue-500 rounded-lg mb-8 flex items-center justify-center">
              <div className="text-center text-white">
                <Apple className="h-16 w-16 mx-auto mb-4" />
                <p className="text-lg">Superalimentos para una Vida Saludable</p>
              </div>
            </div>

            {/* Article Content */}
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">¿Qué Son los Superalimentos?</h2>
              
              <p className="text-slate-700 mb-6 leading-relaxed">
                Los superalimentos son alimentos naturales que destacan por su excepcional densidad nutricional. 
                Estos alimentos contienen una concentración particularmente alta de vitaminas, minerales, 
                antioxidantes, grasas saludables y otros compuestos beneficiosos que pueden ayudar a mejorar 
                la salud y prevenir enfermedades.
              </p>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6">
                <h4 className="font-semibold text-green-900 mb-2">Importante</h4>
                <p className="text-green-800">
                  Aunque el término "superalimento" es popular en el marketing, la clave está en incluir 
                  una variedad de alimentos nutritivos en tu dieta regular, no en depender de un solo alimento "milagroso".
                </p>
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">Los Top 15 Superalimentos</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {superfoods.map((food, index) => (
                  <Card key={index} className="border-l-4 border-green-500 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <Leaf className="h-5 w-5 text-green-500 mr-2" />
                        {food.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium text-slate-900">Beneficios:</span>
                          <p className="text-slate-600">{food.benefits}</p>
                        </div>
                        <div>
                          <span className="font-medium text-slate-900">Nutrientes clave:</span>
                          <p className="text-slate-600">{food.nutrients}</p>
                        </div>
                        <div>
                          <span className="font-medium text-slate-900">Cómo consumir:</span>
                          <p className="text-slate-600">{food.howToEat}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">Más Superalimentos Esenciales</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Frutos Secos</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Nueces: Omega-3, vitamina E</li>
                    <li>• Almendras: Magnesio, proteína</li>
                    <li>• Pistachos: Potasio, antioxidantes</li>
                  </ul>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Semillas</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Chía: Fibra, omega-3, calcio</li>
                    <li>• Linaza: Lignanos, fibra</li>
                    <li>• Calabaza: Zinc, magnesio</li>
                  </ul>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Vegetales Verdes</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Kale: Vitamina K, antioxidantes</li>
                    <li>• Brócoli: Sulforafano, vitamina C</li>
                    <li>• Col rizada: Betacarotenos</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">Cómo Incorporar Superalimentos en tu Dieta</h3>
              
              <div className="space-y-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Desayuno Poderoso</h4>
                  <p className="text-blue-800 text-sm">
                    Batido verde con espinacas, arándanos, semillas de chía y aguacate. 
                    Agrega yogurt griego para proteína extra.
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Almuerzo Nutritivo</h4>
                  <p className="text-green-800 text-sm">
                    Ensalada de quinoa con salmón, espinacas frescas, aguacate y nueces. 
                    Adereza con aceite de oliva y limón.
                  </p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Cena Balanceada</h4>
                  <p className="text-purple-800 text-sm">
                    Salmón al horno con batata asada y brócoli al vapor. 
                    Espolvorea semillas de calabaza tostadas.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">Plan de Comidas Semanal con Superalimentos</h3>
              
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-slate-300">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border border-slate-300 p-2 text-left">Día</th>
                      <th className="border border-slate-300 p-2 text-left">Desayuno</th>
                      <th className="border border-slate-300 p-2 text-left">Almuerzo</th>
                      <th className="border border-slate-300 p-2 text-left">Cena</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr>
                      <td className="border border-slate-300 p-2 font-medium">Lunes</td>
                      <td className="border border-slate-300 p-2">Batido de arándanos y chía</td>
                      <td className="border border-slate-300 p-2">Bowl de quinoa con aguacate</td>
                      <td className="border border-slate-300 p-2">Salmón con espinacas</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-2 font-medium">Martes</td>
                      <td className="border border-slate-300 p-2">Avena con nueces y frutos rojos</td>
                      <td className="border border-slate-300 p-2">Ensalada de kale con semillas</td>
                      <td className="border border-slate-300 p-2">Pollo con brócoli</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-2 font-medium">Miércoles</td>
                      <td className="border border-slate-300 p-2">Yogurt con granola y arándanos</td>
                      <td className="border border-slate-300 p-2">Sopa de lentejas con espinacas</td>
                      <td className="border border-slate-300 p-2">Pescado con quinoa</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">Mitos y Realidades sobre los Superalimentos</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                  <h4 className="font-semibold text-red-900 mb-2">❌ Mito</h4>
                  <p className="text-red-800 text-sm">
                    "Un solo superalimento puede resolver todos los problemas de salud"
                  </p>
                </div>
                
                <div className="bg-green-50 border-l-4 border-green-500 p-4">
                  <h4 className="font-semibold text-green-900 mb-2">✅ Realidad</h4>
                  <p className="text-green-800 text-sm">
                    "La variedad y el equilibrio en la dieta son más importantes que cualquier alimento individual"
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">Consejos Prácticos para Empezar</h3>
              
              <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-2">
                <li>Comienza agregando un superalimento nuevo cada semana a tu dieta</li>
                <li>Prepara batidos con 2-3 superalimentos combinados</li>
                <li>Mantén frutos secos y semillas a mano para snacks saludables</li>
                <li>Incluye vegetales de hoja verde en al menos una comida diaria</li>
                <li>Experimenta con recetas nuevas para no aburrirte</li>
                <li>Compra productos de temporada y locales cuando sea posible</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">Conclusión</h3>
              
              <p className="text-slate-700 mb-4 leading-relaxed">
                Los superalimentos son una excelente adición a cualquier dieta saludable, pero recuerda 
                que no existen alimentos milagrosos. La clave está en mantener una alimentación variada, 
                equilibrada y sostenible a largo plazo.
              </p>

              <p className="text-slate-700 leading-relaxed">
                Incorpora estos superalimentos gradualmente en tu rutina diaria y observa cómo tu 
                energía, digestión y bienestar general mejoran. Tu cuerpo te lo agradecerá con una 
                salud óptima y vitalidad renovada.
              </p>
            </div>

            {/* Nutritional Calculator */}
            <div className="mt-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Calculadora Nutricional</h3>
              <p className="mb-6">¿Quieres saber cuántos superalimentos necesitas según tu peso y actividad física?</p>
              <Button className="bg-white text-green-600 hover:bg-slate-100">
                Calcular mis Necesidades
              </Button>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default SuperalimentosDieta;