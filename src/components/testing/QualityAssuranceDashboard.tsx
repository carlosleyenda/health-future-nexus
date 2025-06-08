
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  TestTube, Shield, Zap, Eye, Play, Download, 
  CheckCircle, XCircle, AlertTriangle, Clock,
  BarChart3, TrendingUp, Target, Settings
} from 'lucide-react';
import { qaService } from '@/services/testing/qaService';

export default function QualityAssuranceDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isRunningTests, setIsRunningTests] = useState(false);

  const runAllTests = async () => {
    setIsRunningTests(true);
    try {
      // Mock test execution
      await new Promise(resolve => setTimeout(resolve, 3000));
    } catch (error) {
      console.error('Error running tests:', error);
    } finally {
      setIsRunningTests(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <TestTube className="h-8 w-8 text-green-600" />
            Centro de Calidad y Testing
          </h1>
          <p className="text-muted-foreground">Garantía de calidad y testing automatizado</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={runAllTests} 
            disabled={isRunningTests}
            className="flex items-center gap-2"
          >
            {isRunningTests ? (
              <Clock className="h-4 w-4 animate-spin" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            {isRunningTests ? 'Ejecutando...' : 'Ejecutar Tests'}
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Reportes
          </Button>
        </div>
      </div>

      {/* Quality Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Puntuación General</p>
                <p className="text-2xl font-bold">94%</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+2% esta semana</span>
                </div>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tests E2E</p>
                <p className="text-2xl font-bold">156/160</p>
                <p className="text-sm text-green-600">97.5% exitosos</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Accesibilidad</p>
                <p className="text-2xl font-bold">AA</p>
                <p className="text-sm text-blue-600">WCAG 2.1 Compliant</p>
              </div>
              <Eye className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Seguridad</p>
                <p className="text-2xl font-bold">A+</p>
                <p className="text-sm text-purple-600">0 vulnerabilidades críticas</p>
              </div>
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="e2e">Tests E2E</TabsTrigger>
          <TabsTrigger value="accessibility">Accesibilidad</TabsTrigger>
          <TabsTrigger value="performance">Rendimiento</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Estado de los Tests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Tests Pasados
                  </span>
                  <span className="font-semibold">892</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-600" />
                    Tests Fallidos
                  </span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    Tests Omitidos
                  </span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="pt-2">
                  <Progress value={98.9} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-1">98.9% de éxito general</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Métricas de Calidad</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Cobertura de Código</span>
                    <span className="text-sm font-medium">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Cobertura de Funcionalidad</span>
                    <span className="text-sm font-medium">94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Fiabilidad</span>
                    <span className="text-sm font-medium">96%</span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Mantenibilidad</span>
                    <span className="text-sm font-medium">91%</span>
                  </div>
                  <Progress value={91} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Alertas de Calidad</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  <div className="flex-1">
                    <p className="font-medium">Rendimiento degradado en login</p>
                    <p className="text-sm text-muted-foreground">
                      Tiempo de respuesta incrementado en 200ms en las últimas 24h
                    </p>
                  </div>
                  <Badge variant="secondary">Performance</Badge>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <XCircle className="h-5 w-5 text-red-500" />
                  <div className="flex-1">
                    <p className="font-medium">Test E2E fallando en Chrome</p>
                    <p className="text-sm text-muted-foreground">
                      Test de checkout falló en las últimas 3 ejecuciones
                    </p>
                  </div>
                  <Badge variant="destructive">E2E</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="e2e" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Tests End-to-End (Playwright)</CardTitle>
                <Button variant="outline" size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  Ejecutar Suite
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Auth Flow', status: 'passed', duration: '2.3s', browser: 'Chrome' },
                  { name: 'Patient Registration', status: 'passed', duration: '4.1s', browser: 'Firefox' },
                  { name: 'Appointment Booking', status: 'failed', duration: '1.8s', browser: 'Safari' },
                  { name: 'Video Consultation', status: 'passed', duration: '6.2s', browser: 'Edge' },
                  { name: 'Payment Processing', status: 'passed', duration: '3.5s', browser: 'Chrome' },
                ].map((test, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {test.status === 'passed' ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                      <div>
                        <p className="font-medium">{test.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {test.browser} • {test.duration}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={test.status === 'passed' ? 'default' : 'destructive'}>
                        {test.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Ver Log
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accessibility" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Evaluación de Accesibilidad WCAG</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">AA</div>
                  <div className="text-sm text-muted-foreground">Nivel Actual</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">2</div>
                  <div className="text-sm text-muted-foreground">Violaciones Menores</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">98%</div>
                  <div className="text-sm text-muted-foreground">Puntuación</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Issues Detectados</h4>
                {[
                  { rule: 'color-contrast', impact: 'minor', description: 'Contraste insuficiente en botones secundarios' },
                  { rule: 'label', impact: 'moderate', description: 'Campo de búsqueda sin label asociado' },
                ].map((issue, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{issue.rule}</p>
                      <p className="text-sm text-muted-foreground">{issue.description}</p>
                    </div>
                    <Badge variant={issue.impact === 'minor' ? 'outline' : 'secondary'}>
                      {issue.impact}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Métricas de Rendimiento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">1.2s</div>
                  <div className="text-sm text-muted-foreground">First Contentful Paint</div>
                  <Badge variant="default" className="mt-1">Bueno</Badge>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">2.1s</div>
                  <div className="text-sm text-muted-foreground">Largest Contentful Paint</div>
                  <Badge variant="default" className="mt-1">Bueno</Badge>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">89ms</div>
                  <div className="text-sm text-muted-foreground">First Input Delay</div>
                  <Badge variant="default" className="mt-1">Bueno</Badge>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">0.05</div>
                  <div className="text-sm text-muted-foreground">Cumulative Layout Shift</div>
                  <Badge variant="default" className="mt-1">Bueno</Badge>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Recomendaciones de Optimización</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    <span>Optimizar imágenes para reducir tiempo de carga</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    <span>Implementar lazy loading en componentes pesados</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    <span>Minimizar JavaScript no utilizado</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análisis de Seguridad</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">A+</div>
                  <div className="text-sm text-muted-foreground">Puntuación Seguridad</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-red-600">0</div>
                  <div className="text-sm text-muted-foreground">Vulnerabilidades Críticas</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">2</div>
                  <div className="text-sm text-muted-foreground">Advertencias Menores</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Resultados del Scan</h4>
                {[
                  { 
                    type: 'SSL/TLS', 
                    status: 'passed', 
                    description: 'Configuración SSL correcta y actualizada' 
                  },
                  { 
                    type: 'Headers', 
                    status: 'warning', 
                    description: 'Header X-Frame-Options podría ser más restrictivo' 
                  },
                  { 
                    type: 'Authentication', 
                    status: 'passed', 
                    description: 'Implementación segura de autenticación' 
                  },
                  { 
                    type: 'CORS', 
                    status: 'passed', 
                    description: 'Políticas CORS configuradas correctamente' 
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {item.status === 'passed' ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      )}
                      <div>
                        <p className="font-medium">{item.type}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    <Badge variant={item.status === 'passed' ? 'default' : 'secondary'}>
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
