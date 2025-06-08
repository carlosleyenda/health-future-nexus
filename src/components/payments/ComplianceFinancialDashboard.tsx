
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  AlertTriangle, 
  FileText, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Eye,
  Download,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { AdvancedPaymentService } from '@/services/financial/paymentService';

export default function ComplianceFinancialDashboard() {
  const [fraudAlerts, setFraudAlerts] = useState([]);
  const [complianceStatus, setComplianceStatus] = useState({
    pciCompliance: true,
    amlChecks: true,
    kycVerification: 85,
    taxReporting: true
  });
  const [auditLogs, setAuditLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadComplianceData();
  }, []);

  const loadComplianceData = async () => {
    try {
      setIsLoading(true);
      // Load fraud alerts, audit logs, etc.
      // This would integrate with the actual services
      
      // Mock data for demonstration
      setFraudAlerts([
        {
          id: '1',
          type: 'suspicious_activity',
          riskScore: 85,
          description: 'Multiple transactions from different locations',
          status: 'investigating',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          type: 'velocity_check',
          riskScore: 72,
          description: 'High transaction velocity detected',
          status: 'resolved',
          createdAt: new Date().toISOString()
        }
      ]);

      setAuditLogs([
        {
          id: '1',
          action: 'payment_processed',
          userId: 'user123',
          amount: 800,
          timestamp: new Date().toISOString()
        },
        {
          id: '2',
          action: 'kyc_verification',
          userId: 'user456',
          timestamp: new Date().toISOString()
        }
      ]);
    } catch (error) {
      console.error('Error loading compliance data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAlertSeverity = (riskScore: number) => {
    if (riskScore >= 80) return { color: 'destructive', label: 'Alto' };
    if (riskScore >= 60) return { color: 'secondary', label: 'Medio' };
    return { color: 'default', label: 'Bajo' };
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-gray-200 rounded-lg"></div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Compliance Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">PCI DSS</p>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span className="text-lg font-semibold">Level 1</span>
                </div>
              </div>
              <Badge variant="default" className="bg-green-100 text-green-800">
                Compliant
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">AML/KYC</p>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-lg font-semibold">{complianceStatus.kycVerification}%</span>
                </div>
              </div>
              <Badge variant="default" className="bg-blue-100 text-blue-800">
                Active
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Fraud Score</p>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <span className="text-lg font-semibold">2.3%</span>
                </div>
              </div>
              <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                Low Risk
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tax Reports</p>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-purple-600" />
                  <span className="text-lg font-semibold">Up to Date</span>
                </div>
              </div>
              <Badge variant="default" className="bg-purple-100 text-purple-800">
                Current
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Compliance Dashboard */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl flex items-center gap-2">
              <Shield className="h-6 w-6 text-blue-600" />
              Dashboard de Compliance Financiero
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={loadComplianceData}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualizar
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar Reporte
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="fraud" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="fraud">Detección de Fraude</TabsTrigger>
              <TabsTrigger value="kyc">Verificación KYC</TabsTrigger>
              <TabsTrigger value="audit">Audit Trail</TabsTrigger>
              <TabsTrigger value="reports">Reportes</TabsTrigger>
            </TabsList>

            <TabsContent value="fraud" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Alertas de Fraude</h3>
                <Badge variant="secondary">{fraudAlerts.length} alertas activas</Badge>
              </div>
              
              <div className="space-y-3">
                {fraudAlerts.map((alert: any) => (
                  <div key={alert.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        <div>
                          <div className="font-medium">{alert.description}</div>
                          <div className="text-sm text-gray-500">
                            {alert.type.replace('_', ' ').toUpperCase()} • 
                            {new Date(alert.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant={getAlertSeverity(alert.riskScore).color}>
                          Riesgo {getAlertSeverity(alert.riskScore).label}
                        </Badge>
                        <Badge variant={alert.status === 'resolved' ? 'default' : 'secondary'}>
                          {alert.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Revisar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="kyc" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">1,247</div>
                      <div className="text-sm text-gray-600">Usuarios Verificados</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-amber-600">156</div>
                      <div className="text-sm text-gray-600">Pendientes</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">23</div>
                      <div className="text-sm text-gray-600">Rechazados</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Verificaciones Recientes</h4>
                <div className="space-y-2">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <div className="font-medium">Usuario {item}</div>
                        <div className="text-sm text-gray-500">
                          Documento: Pasaporte • Nivel: Premium
                        </div>
                      </div>
                      <Badge variant="default">Verificado</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="audit" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Registro de Auditoría</h3>
                <Button variant="outline" size="sm">
                  Filtrar por Fecha
                </Button>
              </div>
              
              <div className="space-y-2">
                {auditLogs.map((log: any) => (
                  <div key={log.id} className="flex items-center justify-between p-3 border rounded text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="font-medium">{log.action.replace('_', ' ').toUpperCase()}</span>
                      <span className="text-gray-500">Usuario: {log.userId}</span>
                      {log.amount && <span className="text-gray-500">Monto: ${log.amount}</span>}
                    </div>
                    <span className="text-gray-500">
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Reporte PCI DSS</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Reporte de compliance PCI DSS trimestral
                    </p>
                    <Button size="sm" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Descargar PDF
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Reporte AML</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Actividades de anti-lavado de dinero
                    </p>
                    <Button size="sm" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Generar Reporte
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <DollarSign className="h-5 w-5 text-purple-600" />
                      <span className="font-medium">Reporte Fiscal</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Documentos fiscales y 1099 forms
                    </p>
                    <Button size="sm" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Ver Documentos
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Shield className="h-5 w-5 text-red-600" />
                      <span className="font-medium">Reporte de Fraude</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Análisis de detección de fraude mensual
                    </p>
                    <Button size="sm" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Exportar Datos
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
