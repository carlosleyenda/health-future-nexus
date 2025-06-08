
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Bot, Truck, Brain, Settings, Play, Pause, RotateCcw,
  Battery, MapPin, Clock, CheckCircle, AlertTriangle,
  Activity, Zap, Target
} from 'lucide-react';
import { automationService } from '@/services/automation/automationService';

export default function AutomationDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Bot className="h-8 w-8 text-purple-600" />
            Centro de Automatización
          </h1>
          <p className="text-muted-foreground">Control de sistemas automatizados de salud</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Zap className="h-3 w-3" />
            Sistema Activo
          </Badge>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Configuración
          </Button>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Drones Activos</p>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-green-600">8 en entrega</p>
              </div>
              <Truck className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Robots Farmacia</p>
                <p className="text-2xl font-bold">6</p>
                <p className="text-sm text-purple-600">5 operando</p>
              </div>
              <Bot className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">IA Triaje</p>
                <p className="text-2xl font-bold">94%</p>
                <p className="text-sm text-orange-600">Precisión</p>
              </div>
              <Brain className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="drones">Drones Médicos</TabsTrigger>
          <TabsTrigger value="robots">Robots Farmacia</TabsTrigger>
          <TabsTrigger value="triage">IA Triaje</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Eficiencia del Sistema</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Entregas Completadas</span>
                    <span className="text-sm font-medium">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Dispensación Automática</span>
                    <span className="text-sm font-medium">94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Precisión IA Triaje</span>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alertas del Sistema</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    <div className="flex-1">
                      <p className="font-medium">Drone #DRN-003</p>
                      <p className="text-sm text-muted-foreground">Batería baja (15%)</p>
                    </div>
                    <Badge variant="secondary">Media</Badge>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div className="flex-1">
                      <p className="font-medium">Robot PH-002</p>
                      <p className="text-sm text-muted-foreground">Mantenimiento completado</p>
                    </div>
                    <Badge variant="outline">Info</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="drones" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Mock Drone Cards */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Drone #{String(i).padStart(3, '0')}</CardTitle>
                    <Badge variant={i <= 2 ? 'default' : i <= 4 ? 'secondary' : 'outline'}>
                      {i <= 2 ? 'En Vuelo' : i <= 4 ? 'Cargando' : 'Disponible'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Battery className="h-4 w-4" />
                    <span>Batería: {95 - i * 10}%</span>
                    <Progress value={95 - i * 10} className="h-1 flex-1" />
                  </div>
                  
                  {i <= 2 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        <span>Entregando medicamentos</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>ETA: 12 minutos</span>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      Rastrear
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="robots" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Mock Robot Cards */}
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Bot className="h-5 w-5 text-purple-600" />
                        Robot PH-{String(i).padStart(3, '0')}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {i === 1 ? 'Dispensación' : i === 2 ? 'Empaquetado' : i === 3 ? 'Inventario' : 'Calidad'}
                      </p>
                    </div>
                    <Badge variant={i <= 3 ? 'default' : 'secondary'}>
                      {i <= 3 ? 'Operando' : 'Mantenimiento'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Tareas Completadas</p>
                      <p className="font-semibold">{120 + i * 15}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Tiempo Activo</p>
                      <p className="font-semibold">{98 - i}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Eficiencia</p>
                      <p className="font-semibold">{95 + i}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Errores</p>
                      <p className="font-semibold">{i}</p>
                    </div>
                  </div>

                  {i <= 3 && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium">Tarea Actual:</p>
                      <p className="text-sm text-muted-foreground">
                        Dispensando Paracetamol 500mg (Lote: PCT-2024-001)
                      </p>
                      <Progress value={65} className="mt-2 h-1" />
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Activity className="h-4 w-4 mr-1" />
                      Monitor
                    </Button>
                    <Button variant="outline" size="sm">
                      <Pause className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="triage" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-orange-600" />
                  Sistema de IA para Triaje
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">94%</div>
                    <div className="text-sm text-muted-foreground">Precisión</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">2.3s</div>
                    <div className="text-sm text-muted-foreground">Tiempo Promedio</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">1,247</div>
                    <div className="text-sm text-muted-foreground">Evaluaciones Hoy</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Clasificaciones Recientes</h4>
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Paciente #{String(i + 100).padStart(4, '0')}</p>
                        <p className="text-sm text-muted-foreground">
                          {i === 1 ? 'Dolor torácico' : i === 2 ? 'Fiebre alta' : i === 3 ? 'Dolor abdominal' : 'Cefalea'}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={
                          i === 1 ? 'destructive' : 
                          i === 2 ? 'secondary' : 
                          i === 3 ? 'default' : 'outline'
                        }>
                          {i === 1 ? 'Urgente' : i === 2 ? 'Medio' : i === 3 ? 'Bajo' : 'Rutina'}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          Confianza: {95 - i * 2}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Métricas del Modelo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Sensibilidad</span>
                    <span className="text-sm font-medium">96%</span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Especificidad</span>
                    <span className="text-sm font-medium">91%</span>
                  </div>
                  <Progress value={91} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Valor Predictivo +</span>
                    <span className="text-sm font-medium">93%</span>
                  </div>
                  <Progress value={93} className="h-2" />
                </div>
                
                <Button className="w-full" variant="outline">
                  <Target className="h-4 w-4 mr-2" />
                  Entrenar Modelo
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
