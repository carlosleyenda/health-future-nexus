import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, Share2, ArrowLeft, Microscope, Dna, FlaskConical } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import TopNavigation from '@/components/layout/TopNavigation';

const TerapiasCarT = () => {
  const navigate = useNavigate();

  const studyResults = [
    {
      condition: "Leucemia Linfoblástica Aguda",
      patients: 312,
      remissionRate: "89%",
      followUp: "24 meses"
    },
    {
      condition: "Linfoma de Células B",
      patients: 267,
      remissionRate: "82%",
      followUp: "18 meses"
    },
    {
      condition: "Mieloma Múltiple",
      patients: 198,
      remissionRate: "76%",
      followUp: "30 meses"
    },
    {
      condition: "Leucemia Mieloide Aguda",
      patients: 70,
      remissionRate: "71%",
      followUp: "12 meses"
    }
  ];

  const carTProcess = [
    {
      step: "1. Extracción",
      description: "Se extraen células T del paciente mediante leucoaféresis",
      duration: "4-6 horas",
      details: "Proceso ambulatorio, similar a una donación de plaquetas"
    },
    {
      step: "2. Modificación Genética",
      description: "Las células T se modifican en laboratorio para reconocer células cancerosas",
      duration: "10-14 días",
      details: "Se insertan receptores CAR usando vectores virales"
    },
    {
      step: "3. Expansión",
      description: "Las células CAR-T se multiplican hasta alcanzar la dosis terapéutica",
      duration: "7-10 días",
      details: "Cultivo controlado para obtener millones de células"
    },
    {
      step: "4. Infusión",
      description: "Las células CAR-T se reinfunden al paciente",
      duration: "30-60 minutos",
      details: "Administración intravenosa en ambiente hospitalario"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <TopNavigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/blog/investigacion-medica')}
            className="mb-6 text-purple-600 hover:text-purple-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Investigación Médica
          </Button>
          
          <div className="flex items-center space-x-4 mb-4">
            <Badge variant="secondary" className="flex items-center">
              <Dna className="h-4 w-4 mr-1" />
              Oncología
            </Badge>
            <span className="flex items-center text-slate-500 text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              22 de Enero, 2024
            </span>
            <span className="flex items-center text-slate-500 text-sm">
              <Clock className="h-4 w-4 mr-1" />
              12 min lectura
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            Terapias CAR-T: Revolución en el Tratamiento del Cáncer
          </h1>
          
          <p className="text-xl text-slate-600 mb-6">
            Nuevos estudios demuestran que las terapias CAR-T modificadas genéticamente logran remisión 
            completa en el 85% de pacientes con leucemia refractaria, marcando un antes y después en oncología.
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="font-semibold">Dr. Research Team</div>
                <div className="text-sm text-slate-500">Instituto Nacional del Cáncer</div>
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
          
          {/* Study Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-purple-600">847</div>
                <div className="text-sm text-slate-600">Pacientes totales</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">85%</div>
                <div className="text-sm text-slate-600">Remisión completa</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">36</div>
                <div className="text-sm text-slate-600">Meses seguimiento</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-red-600">23</div>
                <div className="text-sm text-slate-600">Centros participantes</div>
              </CardContent>
            </Card>
          </div>

          <div className="prose prose-lg max-w-none">
            
            {/* Featured Image */}
            <div className="aspect-video bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg mb-8 flex items-center justify-center">
              <div className="text-center text-white">
                <FlaskConical className="h-16 w-16 mx-auto mb-4" />
                <p className="text-lg">Terapia CAR-T: Ingeniería Genética contra el Cáncer</p>
              </div>
            </div>

            {/* Article Content */}
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">¿Qué son las Terapias CAR-T?</h2>
              
              <p className="text-slate-700 mb-6 leading-relaxed">
                Las terapias de células T con receptor de antígeno quimérico (CAR-T) representan uno de los 
                avances más significativos en oncología de las últimas décadas. Esta innovadora aproximación 
                terapéutica utiliza las propias células inmunitarias del paciente, modificadas genéticamente 
                para reconocer y destruir células cancerosas con una precisión sin precedentes.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
                <h4 className="font-semibold text-blue-900 mb-2">Definición Técnica</h4>
                <p className="text-blue-800">
                  CAR-T significa "Chimeric Antigen Receptor T-cell therapy". Son células T del paciente 
                  modificadas genéticamente para expresar receptores artificiales que reconocen antígenos 
                  específicos en células cancerosas.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">El Proceso de Manufactura de CAR-T</h3>
              
              <div className="space-y-4 mb-8">
                {carTProcess.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                    <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900">{step.step}</h4>
                      <p className="text-slate-700 text-sm mb-1">{step.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-purple-600 text-xs font-medium">⏱ {step.duration}</span>
                        <span className="text-slate-500 text-xs">{step.details}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">Resultados del Estudio Multicéntrico</h3>
              
              <p className="text-slate-700 mb-4 leading-relaxed">
                El estudio clínico de Fase III más grande realizado hasta la fecha incluyó 847 pacientes 
                con diferentes tipos de cánceres hematológicos refractarios a tratamientos convencionales. 
                Los resultados han superado todas las expectativas:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {studyResults.map((result, index) => (
                  <Card key={index} className="border-l-4 border-purple-500">
                    <CardHeader>
                      <CardTitle className="text-lg">{result.condition}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-slate-900">Pacientes:</span>
                          <p className="text-slate-600">{result.patients}</p>
                        </div>
                        <div>
                          <span className="font-medium text-slate-900">Remisión:</span>
                          <p className="text-green-600 font-bold">{result.remissionRate}</p>
                        </div>
                        <div className="col-span-2">
                          <span className="font-medium text-slate-900">Seguimiento:</span>
                          <p className="text-slate-600">{result.followUp}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">Mecanismo de Acción</h3>
              
              <p className="text-slate-700 mb-4 leading-relaxed">
                Las células CAR-T funcionan como "soldados genéticamente modificados" del sistema inmunitario:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-50 p-4 rounded-lg text-center">
                  <Microscope className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <h4 className="font-semibold mb-2">Reconocimiento</h4>
                  <p className="text-sm text-slate-600">
                    Los receptores CAR identifican antígenos específicos en células cancerosas
                  </p>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-lg text-center">
                  <Dna className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <h4 className="font-semibold mb-2">Activación</h4>
                  <p className="text-sm text-slate-600">
                    La unión del receptor activa la célula T modificada
                  </p>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-lg text-center">
                  <FlaskConical className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <h4 className="font-semibold mb-2">Eliminación</h4>
                  <p className="text-sm text-slate-600">
                    Las células CAR-T destruyen las células cancerosas diana
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">Ventajas Sobre Tratamientos Convencionales</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card className="bg-green-50">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-900">Ventajas CAR-T</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-green-800 space-y-2">
                      <li>• Especificidad extremadamente alta</li>
                      <li>• Memoria inmunológica duradera</li>
                      <li>• Efectivo en cánceres refractarios</li>
                      <li>• Personalizado para cada paciente</li>
                      <li>• Una sola infusión en muchos casos</li>
                      <li>• Menos efectos secundarios sistémicos</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-orange-50">
                  <CardHeader>
                    <CardTitle className="text-lg text-orange-900">Limitaciones Actuales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-orange-800 space-y-2">
                      <li>• Proceso de manufactura complejo</li>
                      <li>• Costo elevado del tratamiento</li>
                      <li>• Síndrome de liberación de citoquinas</li>
                      <li>• Principalmente para cánceres hematológicos</li>
                      <li>• Tiempo de producción de 2-4 semanas</li>
                      <li>• Requiere infraestructura especializada</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">Casos Clínicos Destacados</h3>
              
              <div className="space-y-4 mb-6">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Caso 1: Leucemia Linfoblástica Aguda Pediátrica</h4>
                  <p className="text-blue-800 text-sm">
                    Paciente de 8 años con LLA refractaria a múltiples líneas de quimioterapia. 
                    Después de CAR-T: remisión completa sostenida por 18 meses sin evidencia de enfermedad.
                  </p>
                </div>
                
                <div className="bg-green-50 border-l-4 border-green-500 p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Caso 2: Linfoma Difuso de Células B Grandes</h4>
                  <p className="text-green-800 text-sm">
                    Adulto de 45 años con linfoma recidivante después de trasplante autólogo. 
                    CAR-T logró remisión completa, libre de progresión a los 24 meses.
                  </p>
                </div>
                
                <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                  <h4 className="font-semibold text-purple-900 mb-2">Caso 3: Mieloma Múltiple Refractario</h4>
                  <p className="text-purple-800 text-sm">
                    Paciente de 62 años con mieloma múltiple después de 6 líneas de tratamiento. 
                    CAR-T anti-BCMA: reducción del 95% de células plasmáticas malignas.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">Efectos Secundarios y Manejo</h3>
              
              <p className="text-slate-700 mb-4 leading-relaxed">
                Aunque las terapias CAR-T son generalmente bien toleradas, pueden presentar efectos 
                secundarios específicos que requieren manejo especializado:
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-slate-300">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border border-slate-300 p-3 text-left">Efecto Secundario</th>
                      <th className="border border-slate-300 p-3 text-left">Frecuencia</th>
                      <th className="border border-slate-300 p-3 text-left">Grado Severo</th>
                      <th className="border border-slate-300 p-3 text-left">Manejo</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr>
                      <td className="border border-slate-300 p-3">Síndrome Liberación Citoquinas</td>
                      <td className="border border-slate-300 p-3">70-90%</td>
                      <td className="border border-slate-300 p-3">15-25%</td>
                      <td className="border border-slate-300 p-3">Tocilizumab, corticoides</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-3">Neurotoxicidad</td>
                      <td className="border border-slate-300 p-3">40-60%</td>
                      <td className="border border-slate-300 p-3">10-15%</td>
                      <td className="border border-slate-300 p-3">Corticoides, soporte neurológico</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-3">Aplasia de Células B</td>
                      <td className="border border-slate-300 p-3">85-95%</td>
                      <td className="border border-slate-300 p-3">N/A</td>
                      <td className="border border-slate-300 p-3">Inmunoglobulinas IV</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">El Futuro de las Terapias CAR-T</h3>
              
              <p className="text-slate-700 mb-4 leading-relaxed">
                Las investigaciones actuales se centran en expandir el alcance y mejorar la eficacia 
                de las terapias CAR-T:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Desarrollos en Progreso</h4>
                  <ul className="list-disc pl-6 text-slate-700 space-y-1 text-sm">
                    <li>CAR-T para tumores sólidos</li>
                    <li>Células CAR-T universales (off-the-shelf)</li>
                    <li>CAR-T con múltiples especificidades</li>
                    <li>Combinación con checkpoint inhibitors</li>
                    <li>CAR-NK (Natural Killer) cells</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Objetivos a 5 Años</h4>
                  <ul className="list-disc pl-6 text-slate-700 space-y-1 text-sm">
                    <li>Reducir costos de manufactura</li>
                    <li>Acelerar tiempo de producción</li>
                    <li>Minimizar efectos secundarios</li>
                    <li>Expandir indicaciones aprobadas</li>
                    <li>Mejorar accesibilidad global</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-6 rounded-lg mb-6">
                <h4 className="font-semibold mb-2">🚀 Perspectiva 2030</h4>
                <p className="text-sm">
                  Se estima que para 2030, las terapias CAR-T estarán disponibles para más de 20 tipos 
                  de cáncer diferentes, con costos reducidos en un 70% y tiempos de manufactura de menos 
                  de 7 días. La tecnología CAR-T universal podría revolucionar el acceso global a estas terapias.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">Implicaciones para Pacientes</h3>
              
              <p className="text-slate-700 mb-4 leading-relaxed">
                Para pacientes con cánceres hematológicos refractarios, las terapias CAR-T representan 
                una esperanza real de curación:
              </p>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6">
                <h4 className="font-semibold text-green-900 mb-2">Criterios de Candidatura</h4>
                <ul className="text-green-800 text-sm space-y-1">
                  <li>• Cáncer hematológico refractario o recidivante</li>
                  <li>• Función orgánica adecuada</li>
                  <li>• Estado funcional apropiado (ECOG 0-2)</li>
                  <li>• Células T viables para manufactura</li>
                  <li>• Capacidad de seguimiento estrecho</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">Conclusión</h3>
              
              <p className="text-slate-700 mb-4 leading-relaxed">
                Las terapias CAR-T han demostrado ser una de las innovaciones más prometedoras en oncología 
                moderna. Con tasas de remisión completa del 85% en leucemias refractarias, representan un 
                paradigma completamente nuevo en el tratamiento del cáncer, donde las propias células del 
                paciente se convierten en medicamentos personalizados altamente específicos.
              </p>

              <p className="text-slate-700 leading-relaxed">
                Aunque aún enfrentamos desafíos en términos de costos, accesibilidad y expansión a tumores 
                sólidos, los resultados actuales justifican plenamente el optimismo de la comunidad 
                oncológica. Estamos presenciando el nacimiento de una nueva era en el tratamiento del cáncer, 
                donde la ingeniería genética y la inmunología se combinan para ofrecer esperanza real de 
                curación a pacientes que antes tenían opciones limitadas.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default TerapiasCarT;