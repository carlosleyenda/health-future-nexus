import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  AlertTriangle, 
  Zap, 
  Heart,
  Activity,
  FileText,
  Users,
  Baby,
  Calculator,
  TestTube,
  Clock,
  TrendingUp,
  Camera,
  Pill,
  Check
} from 'lucide-react';

interface DrugSafetyMonitoringProps {
  patientId: string;
}

export default function DrugSafetyMonitoring({ patientId }: DrugSafetyMonitoringProps) {
  const [interactions, setInteractions] = useState([
    {
      id: '1',
      medication1: 'Metformina',
      medication2: 'Contraste yodado',
      severity: 'major',
      type: 'contraindicated',
      description: 'Riesgo de acidosis láctica. Suspender metformina 48h antes y después del contraste.',
      clinicalEffects: ['Acidosis láctica', 'Insuficiencia renal'],
      management: 'Suspender metformina, monitorear función renal',
      evidenceLevel: 'established'
    },
    {
      id: '2',
      medication1: 'Lisinopril',
      medication2: 'Ibuprofeno',
      severity: 'moderate',
      type: 'significant',
      description: 'NSAIDs pueden reducir efectividad antihipertensiva y aumentar riesgo renal.',
      clinicalEffects: ['Reducción efecto hipotensor', 'Daño renal'],
      management: 'Monitorear presión arterial y función renal',
      evidenceLevel: 'probable'
    }
  ]);

  const [adverseEvents, setAdverseEvents] = useState([
    {
      id: '1',
      medication: 'Metformina',
      event: 'Molestias gastrointestinales',
      severity: 'mild',
      onset: '2024-06-05',
      status: 'ongoing',
      action: 'none',
      reported: false
    },
    {
      id: '2',
      medication: 'Lisinopril',
      event: 'Tos seca',
      severity: 'moderate',
      onset: '2024-06-01',
      status: 'ongoing',
      action: 'dose_reduced',
      reported: true
    }
  ]);

  const [contraindications, setContraindications] = useState([
    {
      medication: 'Metformina',
      condition: 'Insuficiencia renal severa',
      risk: 'high',
      reason: 'Clearance creatinina < 30 mL/min'
    },
    {
      medication: 'Lisinopril',
      condition: 'Embarazo',
      risk: 'critical',
      reason: 'Teratogenicidad confirmada'
    }
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'major':
      case 'critical':
        return 'text-red-600';
      case 'moderate':
      case 'significant':
        return 'text-yellow-600';
      case 'minor':
      case 'mild':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'major':
      case 'critical':
        return 'destructive';
      case 'moderate':
      case 'significant':
        return 'secondary';
      case 'minor':
      case 'mild':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Safety Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interacciones</CardTitle>
            <Zap className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">1 mayor, 1 moderada</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eventos Adversos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">1 reportado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contraindicaciones</CardTitle>
            <Shield className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">1 crítica</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Score de Seguridad</CardTitle>
            <Heart className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">78</div>
            <p className="text-xs text-muted-foreground">Aceptable</p>
          </CardContent>
        </Card>
      </div>

      {/* Safety Tabs */}
      <Tabs defaultValue="interactions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="interactions">Interacciones</TabsTrigger>
          <TabsTrigger value="adverse">Eventos Adversos</TabsTrigger>
          <TabsTrigger value="contraindications">Contraindicaciones</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoreo</TabsTrigger>
          <TabsTrigger value="adjustments">Ajustes</TabsTrigger>
        </TabsList>

        <TabsContent value="interactions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Interacciones Medicamentosas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {interactions.map((interaction) => (
                  <Alert key={interaction.id} className={`border-l-4 ${
                    interaction.severity === 'major' ? 'border-l-red-500' : 'border-l-yellow-500'
                  }`}>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">
                            {interaction.medication1} + {interaction.medication2}
                          </h4>
                          <Badge variant={getSeverityBadge(interaction.severity)}>
                            {interaction.severity.toUpperCase()}
                          </Badge>
                        </div>
                        
                        <p className="text-sm">{interaction.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <strong>Efectos clínicos:</strong>
                            <ul className="list-disc list-inside mt-1">
                              {interaction.clinicalEffects.map((effect, idx) => (
                                <li key={idx}>{effect}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <strong>Manejo:</strong>
                            <p className="mt-1">{interaction.management}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            Evidencia: {interaction.evidenceLevel}
                          </Badge>
                          <Button variant="outline" size="sm">
                            Ver Detalles
                          </Button>
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-1" />
                            Reportar
                          </Button>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="adverse">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Eventos Adversos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {adverseEvents.map((event) => (
                  <div key={event.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{event.medication}</h4>
                        <p className="text-sm text-gray-600">{event.event}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getSeverityBadge(event.severity)}>
                          {event.severity}
                        </Badge>
                        {event.reported && <Badge variant="outline">Reportado</Badge>}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500">Inicio</div>
                        <div className="font-medium">
                          {new Date(event.onset).toLocaleDateString('es-MX')}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Estado</div>
                        <div className="font-medium">{event.status}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Acción</div>
                        <div className="font-medium">{event.action}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Reportado</div>
                        <div className="font-medium">{event.reported ? 'Sí' : 'No'}</div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Reportar FDA
                      </Button>
                      <Button variant="outline" size="sm">
                        Actualizar Estado
                      </Button>
                      <Button variant="outline" size="sm">
                        <Users className="h-4 w-4 mr-1" />
                        Notificar Médico
                      </Button>
                      <Button variant="outline" size="sm">
                        <Check className="h-4 w-4 mr-1" />
                        Marcar como Revisado
                      </Button>
                    </div>
                  </div>
                ))}

                <Button className="w-full">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Reportar Nuevo Evento Adverso
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contraindications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Contraindicaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contraindications.map((contraindication, index) => (
                  <Alert key={index} className={`border-l-4 ${
                    contraindication.risk === 'critical' ? 'border-l-red-500' : 'border-l-yellow-500'
                  }`}>
                    <Shield className="h-4 w-4" />
                    <AlertDescription>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{contraindication.medication}</h4>
                          <Badge variant={contraindication.risk === 'critical' ? 'destructive' : 'secondary'}>
                            {contraindication.risk}
                          </Badge>
                        </div>
                        <div>
                          <strong>Condición:</strong> {contraindication.condition}
                        </div>
                        <div>
                          <strong>Razón:</strong> {contraindication.reason}
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring">
          <div className="space-y-6">
            {/* Pregnancy Category Monitoring */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Baby className="h-5 w-5" />
                  Categoría de Embarazo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium">Metformina</div>
                    <Badge variant="default">Categoría B</Badge>
                    <p className="text-sm text-gray-600 mt-1">Seguro en embarazo</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium">Lisinopril</div>
                    <Badge variant="destructive">Categoría D</Badge>
                    <p className="text-sm text-gray-600 mt-1">Contraindicado en embarazo</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium">Vitamina D</div>
                    <Badge variant="default">Categoría A</Badge>
                    <p className="text-sm text-gray-600 mt-1">Seguro en embarazo</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Age-Specific Dosing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Dosificación por Edad
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert>
                    <Calculator className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Ajuste renal recomendado:</strong> Metformina dosis reducida a 500mg/día 
                      debido a clearance de creatinina de 45 mL/min.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium">Función Renal</div>
                      <div className="text-sm text-gray-600">CrCl: 45 mL/min</div>
                      <Progress value={45} className="mt-2" />
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-medium">Función Hepática</div>
                      <div className="text-sm text-gray-600">Normal</div>
                      <Progress value={100} className="mt-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="adjustments">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="h-5 w-5" />
                Ajustes Renales y Hepáticos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Renal Adjustments */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Ajustes Renales</h3>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Metformina</span>
                        <Badge variant="secondary">Ajuste Requerido</Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">Dosis Actual</div>
                          <div className="font-medium">1000mg BID</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Dosis Ajustada</div>
                          <div className="font-medium">500mg BID</div>
                        </div>
                        <div>
                          <div className="text-gray-500">CrCl Requerido</div>
                          <div className="font-medium">≥30 mL/min</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hepatic Adjustments */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Ajustes Hepáticos</h3>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium">No se requieren ajustes hepáticos</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Función hepática normal - todas las dosis son apropiadas
                    </p>
                  </div>
                </div>

                {/* Monitoring Schedule */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Cronograma de Monitoreo</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Función Renal</div>
                        <div className="text-sm text-gray-600">Creatinina, BUN, CrCl</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">Cada 3 meses</div>
                        <div className="text-sm text-gray-600">Próximo: 15 Jul</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Función Hepática</div>
                        <div className="text-sm text-gray-600">ALT, AST, Bilirrubina</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">Cada 6 meses</div>
                        <div className="text-sm text-gray-600">Próximo: 1 Ago</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
