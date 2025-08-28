import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, Share2, ArrowLeft, Dna, Zap, Target } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import TopNavigation from '@/components/layout/TopNavigation';

const TerapiaGenica = () => {
  const navigate = useNavigate();

  const approvedTherapies = [
    {
      name: "Luxturna",
      condition: "Distrofia Retinal Hereditaria",
      mechanism: "Reemplazo del gen RPE65",
      approval: "FDA 2017",
      success: "90% mejora en visión",
      cost: "$425,000 por ojo"
    },
    {
      name: "Zolgensma",
      condition: "Atrofia Muscular Espinal",
      mechanism: "Reemplazo del gen SMN1",
      approval: "FDA 2019",
      success: "95% supervivencia sin ventilación",
      cost: "$2.1 millones (dosis única)"
    },
    {
      name: "Casgevy",
      condition: "Anemia Falciforme",
      mechanism: "Edición génica CRISPR",
      approval: "FDA 2023",
      success: "85% libres de crisis",
      cost: "$2.2 millones"
    }
  ];

  const diseasesInDevelopment = [
    {
      disease: "Hemofilia B",
      stage: "Fase III",
      therapy: "Factor IX génico",
      timeline: "2024-2025"
    },
    {
      disease: "Distrofia Muscular Duchenne",
      stage: "Fase II",
      therapy: "Micro-distrofina",
      timeline: "2025-2026"
    },
    {
      disease: "Enfermedad de Huntington",
      stage: "Fase I/II",
      therapy: "Silenciamiento génico",
      timeline: "2026-2027"
    },
    {
      disease: "Parkinson Hereditario",
      stage: "Preclínico",
      therapy: "GDNF génico",
      timeline: "2027+"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <TopNavigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/blog/noticias-medicas')}
            className="mb-6 text-purple-600 hover:text-purple-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Noticias Médicas
          </Button>
          
          <div className="flex items-center space-x-4 mb-4">
            <Badge variant="secondary" className="flex items-center">
              <Dna className="h-4 w-4 mr-1" />
              Genética
            </Badge>
            <span className="flex items-center text-slate-500 text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              18 de Enero, 2024
            </span>
            <span className="flex items-center text-slate-500 text-sm">
              <Clock className="h-4 w-4 mr-1" />
              6 min lectura
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            Terapia Génica: Nuevos Tratamientos para Enfermedades Raras
          </h1>
          
          <p className="text-xl text-slate-600 mb-6">
            La FDA aprueba tres nuevas terapias génicas revolucionarias para tratar enfermedades 
            hereditarias que antes no tenían cura, abriendo una nueva era en medicina personalizada.
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="font-semibold">Dra. Elena Rodríguez</div>
                <div className="text-sm text-slate-500">Especialista en Genética Médica</div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Compartir
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-purple-600">25+</div>
                <div className="text-sm text-slate-600">Terapias aprobadas</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">300+</div>
                <div className="text-sm text-slate-600">En desarrollo</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">95%</div>
                <div className="text-sm text-slate-600">Tasa de éxito</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-red-600">7000</div>
                <div className="text-sm text-slate-600">Enfermedades raras</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Featured Image */}
          <div className="aspect-video bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg mb-8 flex items-center justify-center">
            <div className="text-center text-white">
              <Dna className="h-16 w-16 mx-auto mb-4" />
              <p className="text-lg">Terapia Génica: Curando desde el ADN</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">La Revolución de la Terapia Génica</h2>
            
            <p className="text-slate-700 mb-6 leading-relaxed">
              El campo de la terapia génica ha experimentado avances extraordinarios en los últimos años. 
              Recientemente, la FDA ha aprobado tres nuevas terapias génicas que prometen cambiar la vida 
              de pacientes con enfermedades hereditarias raras. Estas innovadoras terapias representan 
              décadas de investigación científica y ofrecen esperanza real para condiciones que 
              anteriormente eran consideradas incurables.
            </p>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 mb-6">
              <h4 className="font-semibold text-purple-900 mb-2">¿Qué es la Terapia Génica?</h4>
              <p className="text-purple-800">
                La terapia génica es una técnica experimental que introduce material genético en las 
                células de un paciente para corregir genes defectuosos o proporcionar una nueva 
                función celular. Puede reemplazar genes mutados, inactivar genes que funcionan mal, 
                o introducir nuevos genes para ayudar a combatir enfermedades.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">Tres Nuevas Terapias Aprobadas</h3>
            
            <div className="space-y-6 mb-8">
              {approvedTherapies.map((therapy, index) => (
                <Card key={index} className="border-l-4 border-purple-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center text-lg">
                        <Target className="h-5 w-5 text-purple-500 mr-2" />
                        {therapy.name}
                      </CardTitle>
                      <Badge variant="outline" className="bg-green-50">{therapy.approval}</Badge>
                    </div>
                    <CardDescription className="text-base font-medium">
                      {therapy.condition}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <span className="font-medium text-slate-900">Mecanismo:</span>
                        <p className="text-slate-600 text-sm">{therapy.mechanism}</p>
                      </div>
                      <div>
                        <span className="font-medium text-slate-900">Eficacia:</span>
                        <p className="text-green-600 text-sm font-semibold">{therapy.success}</p>
                      </div>
                      <div>
                        <span className="font-medium text-slate-900">Costo:</span>
                        <p className="text-orange-600 text-sm font-semibold">{therapy.cost}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">Cómo Funciona la Terapia Génica</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="text-center">
                <CardHeader>
                  <Zap className="h-10 w-10 text-blue-500 mx-auto mb-2" />
                  <CardTitle className="text-lg">1. Identificación</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600">
                    Se identifica el gen defectuoso responsable de la enfermedad y se crea una versión 
                    funcional del gen.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <Target className="h-10 w-10 text-green-500 mx-auto mb-2" />
                  <CardTitle className="text-lg">2. Entrega</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600">
                    El gen se empaqueta en un vector (generalmente un virus modificado) y se 
                    administra al paciente.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <Dna className="h-10 w-10 text-purple-500 mx-auto mb-2" />
                  <CardTitle className="text-lg">3. Integración</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600">
                    El gen funcional se integra en las células objetivo y comienza a producir 
                    la proteína necesaria.
                  </p>
                </CardContent>
              </Card>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">Casos de Éxito Destacados</h3>
            
            <div className="space-y-4 mb-8">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
                <h4 className="font-semibold text-blue-900 mb-2">Luxturna: Devolviendo la Vista</h4>
                <p className="text-blue-800 text-sm mb-3">
                  Esta terapia trata la distrofia retinal hereditaria, una causa de ceguera en niños. 
                  Los pacientes tratados han mostrado mejoras dramáticas en su capacidad visual.
                </p>
                <div className="bg-white p-3 rounded text-xs">
                  <strong>Caso destacado:</strong> Sophie, de 8 años, recuperó suficiente visión 
                  para caminar sin ayuda después del tratamiento.
                </div>
              </div>
              
              <div className="bg-green-50 border-l-4 border-green-500 p-6">
                <h4 className="font-semibold text-green-900 mb-2">Zolgensma: Salvando Vidas</h4>
                <p className="text-green-800 text-sm mb-3">
                  Para la atrofia muscular espinal, esta terapia de una sola dosis ha transformado 
                  el pronóstico de bebés con esta condición fatal.
                </p>
                <div className="bg-white p-3 rounded text-xs">
                  <strong>Caso destacado:</strong> Marcus, tratado a los 6 meses, ahora camina 
                  normalmente a los 3 años.
                </div>
              </div>
              
              <div className="bg-purple-50 border-l-4 border-purple-500 p-6">
                <h4 className="font-semibold text-purple-900 mb-2">Casgevy: Editando el Futuro</h4>
                <p className="text-purple-800 text-sm mb-3">
                  Primera terapia CRISPR aprobada para anemia falciforme, editando directamente 
                  el ADN del paciente para curar la enfermedad.
                </p>
                <div className="bg-white p-3 rounded text-xs">
                  <strong>Caso destacado:</strong> Victoria, de 16 años, no ha tenido crisis de dolor 
                  en 18 meses después del tratamiento.
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">Enfermedades en Pipeline</h3>
            
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-300 p-3 text-left">Enfermedad</th>
                    <th className="border border-slate-300 p-3 text-left">Fase</th>
                    <th className="border border-slate-300 p-3 text-left">Terapia</th>
                    <th className="border border-slate-300 p-3 text-left">Timeline</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {diseasesInDevelopment.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-slate-300 p-3 font-medium">{item.disease}</td>
                      <td className="border border-slate-300 p-3">
                        <Badge variant="outline">{item.stage}</Badge>
                      </td>
                      <td className="border border-slate-300 p-3">{item.therapy}</td>
                      <td className="border border-slate-300 p-3 text-purple-600">{item.timeline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">Desafíos y Limitaciones</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-orange-50">
                <CardHeader>
                  <CardTitle className="text-lg text-orange-900">Desafíos Técnicos</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-orange-800 space-y-2">
                    <li>• Entrega eficiente a células objetivo</li>
                    <li>• Control de la expresión génica</li>
                    <li>• Durabilidad del tratamiento</li>
                    <li>• Respuestas inmunitarias al vector</li>
                    <li>• Efectos fuera del objetivo</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-red-50">
                <CardHeader>
                  <CardTitle className="text-lg text-red-900">Desafíos Económicos</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-red-800 space-y-2">
                    <li>• Costos de desarrollo extremadamente altos</li>
                    <li>• Precios de tratamiento prohibitivos</li>
                    <li>• Acceso limitado para pacientes</li>
                    <li>• Presión en sistemas de salud</li>
                    <li>• Necesidad de modelos de pago innovadores</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">El Futuro de la Terapia Génica</h3>
            
            <p className="text-slate-700 mb-4 leading-relaxed">
              Los próximos años prometen avances aún más emocionantes. La combinación de terapia 
              génica con otras tecnologías emergentes como la edición génica CRISPR, la medicina 
              regenerativa y la inteligencia artificial está abriendo posibilidades que antes 
              eran ciencia ficción.
            </p>

            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 rounded-lg mb-6">
              <h4 className="font-semibold text-lg mb-3">🚀 Perspectivas 2025-2030</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium mb-2">Innovaciones Técnicas:</h5>
                  <ul className="space-y-1 opacity-90">
                    <li>• Vectores más seguros y eficientes</li>
                    <li>• Terapias génicas in vivo más precisas</li>
                    <li>• Edición génica sin cortes (base editing)</li>
                    <li>• Terapias génicas para cáncer</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Acceso y Costo:</h5>
                  <ul className="space-y-1 opacity-90">
                    <li>• Reducción de costos de manufactura</li>
                    <li>• Modelos de pago basados en resultados</li>
                    <li>• Mayor acceso global</li>
                    <li>• Plataformas de producción escalables</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">Impacto en Pacientes y Familias</h3>
            
            <p className="text-slate-700 mb-6 leading-relaxed">
              Más allá de los avances técnicos, el verdadero impacto de la terapia génica se mide 
              en las vidas transformadas. Para familias que han vivido con el diagnóstico de una 
              enfermedad rara "incurable", estas terapias representan esperanza real y tangible.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
              <h4 className="font-semibold text-blue-900 mb-2">Testimonio de Familia</h4>
              <p className="text-blue-800 italic">
                "Cuando nos dijeron que nuestra hija tenía una enfermedad genética rara, pensamos 
                que no había esperanza. Hoy, gracias a la terapia génica, ella lleva una vida normal. 
                Es un milagro de la ciencia moderna." - María González, madre de paciente tratada
              </p>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">Conclusión</h3>
            
            <p className="text-slate-700 mb-4 leading-relaxed">
              La aprobación de estas tres nuevas terapias génicas marca un momento histórico en 
              la medicina. Estamos presenciando la transición de la terapia génica desde el reino 
              experimental hacia tratamientos rutinarios que salvan vidas reales.
            </p>

            <p className="text-slate-700 leading-relaxed">
              Aunque desafíos significativos permanecen, especialmente en términos de costo y 
              acceso, el progreso es innegable. Para las aproximadamente 300 millones de personas 
              en el mundo que viven con enfermedades raras, la terapia génica ofrece algo que no 
              tenían antes: esperanza real de curación.
            </p>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4 text-center">¿Tienes una Enfermedad Genética Rara?</h3>
            <p className="text-center mb-6 opacity-90">
              Consulta con nuestros especialistas en genética médica sobre las opciones de 
              terapia génica disponibles para tu condición.
            </p>
            <div className="flex justify-center">
              <Button className="bg-white text-purple-600 hover:bg-slate-100">
                Programa una Consulta Genética
              </Button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default TerapiaGenica;