import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Play, Pause, RotateCcw, CheckCircle, XCircle, Clock,
  Bug, Shield, Zap, Activity, Code, Users, Database,
  TrendingUp, AlertTriangle, Target, FileText, Settings
} from 'lucide-react';
import { toast } from 'sonner';

interface TestSuite {
  id: string;
  name: string;
  type: 'unit' | 'integration' | 'e2e' | 'security' | 'performance' | 'accessibility';
  status: 'idle' | 'running' | 'passed' | 'failed' | 'error';
  progress: number;
  tests: Test[];
  lastRun: string;
  duration: number;
  coverage: number;
}

interface Test {
  id: string;
  name: string;
  status: 'passed' | 'failed' | 'skipped' | 'running';
  duration: number;
  error?: string;
  screenshot?: string;
}

interface SecurityScan {
  id: string;
  type: 'vulnerability' | 'penetration' | 'compliance';
  status: 'completed' | 'running' | 'failed';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  findings: SecurityFinding[];
  timestamp: string;
}

interface SecurityFinding {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  description: string;
  location: string;
  recommendation: string;
}

interface PerformanceMetric {
  metric: string;
  value: number;
  unit: string;
  threshold: number;
  status: 'good' | 'warning' | 'critical';
}

export default function AutomatedTestingDashboard() {
  const [testSuites, setTestSuites] = useState<TestSuite[]>([]);
  const [isRunningAll, setIsRunningAll] = useState(false);
  const [securityScans, setSecurityScans] = useState<SecurityScan[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);
  const [selectedSuite, setSelectedSuite] = useState<string | null>(null);

  useEffect(() => {
    // Initialize mock test suites
    const mockSuites: TestSuite[] = [
      {
        id: 'unit-tests',
        name: 'Pruebas Unitarias',
        type: 'unit',
        status: 'passed',
        progress: 100,
        tests: [
          { id: '1', name: 'User Authentication', status: 'passed', duration: 1200 },
          { id: '2', name: 'Appointment Booking', status: 'passed', duration: 890 },
          { id: '3', name: 'Payment Processing', status: 'failed', duration: 1500, error: 'Assertion failed: expected 200, got 400' },
          { id: '4', name: 'Medical Records', status: 'passed', duration: 750 }
        ],
        lastRun: new Date().toISOString(),
        duration: 4340,
        coverage: 87
      },
      {
        id: 'integration-tests',
        name: 'Pruebas de Integración',
        type: 'integration',
        status: 'running',
        progress: 65,
        tests: [
          { id: '5', name: 'API Integration', status: 'passed', duration: 2100 },
          { id: '6', name: 'Database Operations', status: 'running', duration: 0 },
          { id: '7', name: 'External Services', status: 'passed', duration: 1800 }
        ],
        lastRun: new Date().toISOString(),
        duration: 0,
        coverage: 73
      },
      {
        id: 'e2e-tests',
        name: 'Pruebas End-to-End',
        type: 'e2e',
        status: 'idle',
        progress: 0,
        tests: [
          { id: '8', name: 'Complete User Journey', status: 'skipped', duration: 0 },
          { id: '9', name: 'Doctor Workflow', status: 'skipped', duration: 0 },
          { id: '10', name: 'Emergency Scenarios', status: 'skipped', duration: 0 }
        ],
        lastRun: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        duration: 12500,
        coverage: 92
      },
      {
        id: 'security-tests',
        name: 'Pruebas de Seguridad',
        type: 'security',
        status: 'passed',
        progress: 100,
        tests: [
          { id: '11', name: 'SQL Injection', status: 'passed', duration: 3200 },
          { id: '12', name: 'XSS Vulnerabilities', status: 'passed', duration: 2800 },
          { id: '13', name: 'Authentication Bypass', status: 'passed', duration: 4100 }
        ],
        lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        duration: 10100,
        coverage: 95
      }
    ];

    setTestSuites(mockSuites);

    // Mock security scans
    setSecurityScans([
      {
        id: 'scan-1',
        type: 'vulnerability',
        status: 'completed',
        riskLevel: 'medium',
        findings: [
          {
            id: 'f1',
            severity: 'medium',
            category: 'Authentication',
            description: 'Session timeout could be longer than recommended',
            location: '/auth/login',
            recommendation: 'Reduce session timeout to 30 minutes'
          },
          {
            id: 'f2',
            severity: 'low',
            category: 'Headers',
            description: 'Missing security headers',
            location: 'Global',
            recommendation: 'Add Content-Security-Policy and X-Frame-Options headers'
          }
        ],
        timestamp: new Date().toISOString()
      }
    ]);

    // Mock performance metrics
    setPerformanceMetrics([
      { metric: 'Time to First Byte', value: 420, unit: 'ms', threshold: 500, status: 'good' },
      { metric: 'First Contentful Paint', value: 1.2, unit: 's', threshold: 1.5, status: 'good' },
      { metric: 'Largest Contentful Paint', value: 2.8, unit: 's', threshold: 2.5, status: 'warning' },
      { metric: 'Cumulative Layout Shift', value: 0.05, unit: '', threshold: 0.1, status: 'good' },
      { metric: 'Total Blocking Time', value: 180, unit: 'ms', threshold: 200, status: 'good' }
    ]);
  }, []);

  const runTestSuite = async (suiteId: string) => {
    setTestSuites(prev => prev.map(suite => 
      suite.id === suiteId 
        ? { ...suite, status: 'running', progress: 0 }
        : suite
    ));

    // Simulate test execution
    const totalTests = testSuites.find(s => s.id === suiteId)?.tests.length || 0;
    
    for (let i = 0; i <= totalTests; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setTestSuites(prev => prev.map(suite => 
        suite.id === suiteId 
          ? { 
              ...suite, 
              progress: (i / totalTests) * 100,
              status: i === totalTests ? 'passed' : 'running'
            }
          : suite
      ));
    }

    toast.success('Suite de pruebas completada');
  };

  const runAllTests = async () => {
    setIsRunningAll(true);
    
    for (const suite of testSuites) {
      if (suite.status !== 'running') {
        await runTestSuite(suite.id);
      }
    }
    
    setIsRunningAll(false);
    toast.success('Todas las pruebas completadas');
  };

  const runSecurityScan = async (type: SecurityScan['type']) => {
    const newScan: SecurityScan = {
      id: `scan-${Date.now()}`,
      type,
      status: 'running',
      riskLevel: 'low',
      findings: [],
      timestamp: new Date().toISOString()
    };

    setSecurityScans(prev => [newScan, ...prev]);

    // Simulate scan
    await new Promise(resolve => setTimeout(resolve, 5000));

    setSecurityScans(prev => prev.map(scan => 
      scan.id === newScan.id 
        ? { ...scan, status: 'completed', riskLevel: 'low' }
        : scan
    ));

    toast.success(`Escaneo de ${type} completado`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'running': return <Clock className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'unit': return Code;
      case 'integration': return Database;
      case 'e2e': return Users;
      case 'security': return Shield;
      case 'performance': return Zap;
      case 'accessibility': return Target;
      default: return Bug;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMetricStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const totalTests = testSuites.reduce((acc, suite) => acc + suite.tests.length, 0);
  const passedTests = testSuites.reduce((acc, suite) => 
    acc + suite.tests.filter(test => test.status === 'passed').length, 0
  );
  const failedTests = testSuites.reduce((acc, suite) => 
    acc + suite.tests.filter(test => test.status === 'failed').length, 0
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Testing Automatizado</h2>
        <div className="flex gap-2">
          <Button onClick={runAllTests} disabled={isRunningAll}>
            {isRunningAll ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Ejecutando...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Ejecutar Todo
              </>
            )}
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Configurar
          </Button>
        </div>
      </div>

      {/* Resumen General */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">{passedTests}</p>
                <p className="text-sm text-gray-500">Pruebas Exitosas</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-red-600">{failedTests}</p>
                <p className="text-sm text-gray-500">Pruebas Fallidas</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-600">{Math.round((passedTests / totalTests) * 100)}%</p>
                <p className="text-sm text-gray-500">Tasa de Éxito</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round(testSuites.reduce((acc, s) => acc + s.coverage, 0) / testSuites.length)}%
                </p>
                <p className="text-sm text-gray-500">Cobertura Promedio</p>
              </div>
              <Target className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="suites" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="suites">Suites de Prueba</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
          <TabsTrigger value="performance">Rendimiento</TabsTrigger>
          <TabsTrigger value="reports">Reportes</TabsTrigger>
        </TabsList>

        <TabsContent value="suites" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {testSuites.map((suite) => {
              const TypeIcon = getTypeIcon(suite.type);
              
              return (
                <Card key={suite.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <TypeIcon className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">{suite.name}</CardTitle>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(suite.status)}
                        <Badge variant="outline">{suite.type.toUpperCase()}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {suite.status === 'running' && (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progreso</span>
                          <span>{Math.round(suite.progress)}%</span>
                        </div>
                        <Progress value={suite.progress} />
                      </div>
                    )}

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-lg font-semibold text-green-600">
                          {suite.tests.filter(t => t.status === 'passed').length}
                        </p>
                        <p className="text-xs text-gray-500">Exitosas</p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-red-600">
                          {suite.tests.filter(t => t.status === 'failed').length}
                        </p>
                        <p className="text-xs text-gray-500">Fallidas</p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-blue-600">{suite.coverage}%</p>
                        <p className="text-xs text-gray-500">Cobertura</p>
                      </div>
                    </div>

                    <div className="text-sm text-gray-500">
                      <p>Última ejecución: {new Date(suite.lastRun).toLocaleString('es-MX')}</p>
                      {suite.duration > 0 && (
                        <p>Duración: {Math.round(suite.duration / 1000)}s</p>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => runTestSuite(suite.id)}
                        disabled={suite.status === 'running'}
                        className="flex-1"
                      >
                        {suite.status === 'running' ? (
                          <>
                            <Clock className="h-3 w-3 mr-1 animate-spin" />
                            Ejecutando
                          </>
                        ) : (
                          <>
                            <Play className="h-3 w-3 mr-1" />
                            Ejecutar
                          </>
                        )}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedSuite(selectedSuite === suite.id ? null : suite.id)}
                      >
                        <FileText className="h-3 w-3 mr-1" />
                        Detalles
                      </Button>
                    </div>

                    {selectedSuite === suite.id && (
                      <div className="border-t pt-4 space-y-2">
                        <h4 className="font-medium">Pruebas individuales:</h4>
                        {suite.tests.map((test) => (
                          <div key={test.id} className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(test.status)}
                              <span>{test.name}</span>
                            </div>
                            <div className="text-gray-500">
                              {test.duration > 0 && `${test.duration}ms`}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Escaneos de Seguridad</h3>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => runSecurityScan('vulnerability')}>
                <Shield className="h-3 w-3 mr-1" />
                Vulnerabilidades
              </Button>
              <Button size="sm" variant="outline" onClick={() => runSecurityScan('penetration')}>
                <Bug className="h-3 w-3 mr-1" />
                Penetración
              </Button>
              <Button size="sm" variant="outline" onClick={() => runSecurityScan('compliance')}>
                <FileText className="h-3 w-3 mr-1" />
                Cumplimiento
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {securityScans.map((scan) => (
              <Card key={scan.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg capitalize">
                      Escaneo de {scan.type.replace('_', ' ')}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      {scan.status === 'running' ? (
                        <Badge className="bg-blue-100 text-blue-800">
                          <Clock className="h-3 w-3 mr-1 animate-spin" />
                          Ejecutando
                        </Badge>
                      ) : (
                        <Badge className={getSeverityColor(scan.riskLevel)}>
                          {scan.riskLevel.toUpperCase()}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {scan.findings.length > 0 ? (
                    <div className="space-y-3">
                      {scan.findings.map((finding) => (
                        <div key={finding.id} className="border rounded p-3">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{finding.category}</h4>
                            <Badge className={getSeverityColor(finding.severity)}>
                              {finding.severity.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{finding.description}</p>
                          <p className="text-xs text-gray-500 mb-2">Ubicación: {finding.location}</p>
                          <div className="bg-blue-50 p-2 rounded text-sm">
                            <strong>Recomendación:</strong> {finding.recommendation}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : scan.status === 'completed' ? (
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        No se encontraron problemas de seguridad en este escaneo.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <div className="text-center py-4">
                      <Clock className="h-8 w-8 animate-spin mx-auto text-blue-500 mb-2" />
                      <p className="text-gray-500">Ejecutando escaneo de seguridad...</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Métricas de Rendimiento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{metric.metric}</p>
                      <p className="text-sm text-gray-500">
                        Umbral: {metric.threshold}{metric.unit}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-semibold ${getMetricStatusColor(metric.status)}`}>
                        {metric.value}{metric.unit}
                      </p>
                      <Badge variant={metric.status === 'good' ? 'default' : 'destructive'}>
                        {metric.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pruebas de Carga</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Activity className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Configurar y ejecutar pruebas de carga</p>
                <Button className="mt-4">
                  <Zap className="h-4 w-4 mr-2" />
                  Iniciar Prueba de Carga
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reportes de Testing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex-col">
                  <FileText className="h-6 w-6 mb-2" />
                  Reporte de Cobertura
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Shield className="h-6 w-6 mb-2" />
                  Reporte de Seguridad
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <TrendingUp className="h-6 w-6 mb-2" />
                  Tendencias de Calidad
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Activity className="h-6 w-6 mb-2" />
                  Métricas de Rendimiento
                </Button>
              </div>

              <div className="mt-6 text-center">
                <h3 className="text-lg font-semibold mb-4">Exportar Reportes</h3>
                <div className="flex justify-center gap-2">
                  <Button size="sm">PDF</Button>
                  <Button size="sm" variant="outline">Excel</Button>
                  <Button size="sm" variant="outline">JSON</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}