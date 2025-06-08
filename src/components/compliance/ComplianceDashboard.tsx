
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  FileCheck, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Download,
  Eye,
  Lock,
  Globe
} from 'lucide-react';
import type { HIPAACompliance, GDPRCompliance, ComplianceViolation } from '@/types/compliance';

interface ComplianceDashboardProps {
  organizationId: string;
}

export default function ComplianceDashboard({ organizationId }: ComplianceDashboardProps) {
  const [hipaaCompliance, setHipaaCompliance] = useState<HIPAACompliance | null>(null);
  const [gdprCompliance, setGdprCompliance] = useState<GDPRCompliance | null>(null);
  const [violations, setViolations] = useState<ComplianceViolation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadComplianceData();
  }, [organizationId]);

  const loadComplianceData = async () => {
    try {
      // Mock data - reemplazar con llamadas reales a la API
      const mockHIPAA: HIPAACompliance = {
        id: 'hipaa-1',
        organizationId,
        assessmentDate: '2024-06-01T00:00:00Z',
        complianceScore: 92,
        requirements: [
          {
            section: '164.502',
            requirement: 'Minimum necessary standard',
            status: 'compliant',
            evidence: ['Policy documentation', 'Staff training records'],
            lastReviewed: '2024-05-15T00:00:00Z'
          },
          {
            section: '164.308',
            requirement: 'Administrative safeguards',
            status: 'compliant',
            evidence: ['Access control policies', 'Audit logs'],
            lastReviewed: '2024-05-20T00:00:00Z'
          },
          {
            section: '164.312',
            requirement: 'Technical safeguards',
            status: 'in_progress',
            evidence: ['Encryption protocols'],
            lastReviewed: '2024-06-01T00:00:00Z',
            notes: 'Implementing additional access controls'
          }
        ],
        violations: [],
        remedyActions: [],
        nextAssessmentDue: '2024-12-01T00:00:00Z',
        certificationStatus: 'compliant'
      };

      const mockGDPR: GDPRCompliance = {
        id: 'gdpr-1',
        userId: 'user-123',
        consentGiven: true,
        consentDate: '2024-01-15T00:00:00Z',
        purposes: [
          {
            purpose: 'Medical treatment',
            legalBasis: 'consent',
            consentGiven: true,
            canWithdraw: true
          },
          {
            purpose: 'Analytics and improvement',
            legalBasis: 'legitimate_interests',
            consentGiven: true,
            canWithdraw: true
          }
        ],
        dataRetentionPeriod: 7,
        dataSubjectRights: [
          {
            right: 'access',
            requested: false,
            fulfilled: false
          },
          {
            right: 'portability',
            requested: false,
            fulfilled: false
          }
        ],
        dataProcessingActivities: [
          {
            activity: 'Patient data processing',
            dataCategories: ['Health data', 'Contact information'],
            purposes: ['Medical treatment', 'Appointment scheduling'],
            recipients: ['Healthcare providers', 'Payment processors'],
            retentionPeriod: '7 years',
            securityMeasures: ['Encryption', 'Access controls', 'Audit logging']
          }
        ],
        privacyNoticeAccepted: true,
        cookieConsent: {
          necessary: true,
          functional: true,
          analytics: true,
          marketing: false,
          consentDate: '2024-01-15T00:00:00Z'
        }
      };

      const mockViolations: ComplianceViolation[] = [
        {
          id: 'violation-1',
          type: 'HIPAA',
          severity: 'medium',
          description: 'Unauthorized access to patient records detected',
          detectedAt: '2024-05-25T14:30:00Z',
          reportedBy: 'Automated system',
          affectedRecords: 1,
          status: 'resolved',
          resolution: 'Access permissions updated, additional training provided',
          resolvedAt: '2024-05-26T10:00:00Z'
        }
      ];

      setHipaaCompliance(mockHIPAA);
      setGdprCompliance(mockGDPR);
      setViolations(mockViolations);
    } catch (error) {
      console.error('Error loading compliance data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getComplianceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'default';
      case 'in_progress': return 'secondary';
      case 'non_compliant': return 'destructive';
      default: return 'outline';
    }
  };

  const generateReport = () => {
    console.log('Generating compliance report...');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center">
          <Shield className="h-6 w-6 mr-2" />
          Panel de Compliance
        </h2>
        <Button onClick={generateReport}>
          <Download className="h-4 w-4 mr-2" />
          Generar Reporte
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">HIPAA Compliance</p>
                <p className={`text-2xl font-bold ${getComplianceColor(hipaaCompliance?.complianceScore || 0)}`}>
                  {hipaaCompliance?.complianceScore}%
                </p>
              </div>
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <Progress value={hipaaCompliance?.complianceScore || 0} className="mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">GDPR Status</p>
                <p className="text-2xl font-bold text-green-600">Activo</p>
              </div>
              <Globe className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Consentimiento otorgado: {gdprCompliance?.consentDate ? 
                new Date(gdprCompliance.consentDate).toLocaleDateString() : 'N/A'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Violaciones Activas</p>
                <p className="text-2xl font-bold text-green-600">
                  {violations.filter(v => v.status === 'open').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Total resueltas: {violations.filter(v => v.status === 'resolved').length}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="hipaa" className="space-y-4">
        <TabsList>
          <TabsTrigger value="hipaa">HIPAA</TabsTrigger>
          <TabsTrigger value="gdpr">GDPR</TabsTrigger>
          <TabsTrigger value="violations">Violaciones</TabsTrigger>
          <TabsTrigger value="audit">Auditoría</TabsTrigger>
        </TabsList>

        <TabsContent value="hipaa" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cumplimiento HIPAA</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {hipaaCompliance?.requirements.map((req, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <Badge variant={getStatusColor(req.status)}>
                        {req.status === 'compliant' ? <CheckCircle className="h-3 w-3 mr-1" /> :
                         req.status === 'in_progress' ? <Clock className="h-3 w-3 mr-1" /> :
                         <AlertTriangle className="h-3 w-3 mr-1" />}
                        {req.status}
                      </Badge>
                      <div>
                        <h4 className="font-medium">Sección {req.section}</h4>
                        <p className="text-sm text-gray-600">{req.requirement}</p>
                      </div>
                    </div>
                    {req.notes && (
                      <p className="text-sm text-blue-600 mt-2">{req.notes}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      Revisado: {new Date(req.lastReviewed).toLocaleDateString()}
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Eye className="h-3 w-3 mr-1" />
                      Ver Evidencia
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gdpr" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Propósitos de Procesamiento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {gdprCompliance?.purposes.map((purpose, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{purpose.purpose}</h4>
                      <p className="text-sm text-gray-600">Base legal: {purpose.legalBasis}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {purpose.consentGiven ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      )}
                      {purpose.canWithdraw && (
                        <Button variant="outline" size="sm">Retirar</Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Derechos del Titular</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {gdprCompliance?.dataSubjectRights.map((right, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium capitalize">{right.right.replace('_', ' ')}</h4>
                      <p className="text-sm text-gray-600">
                        {right.requested ? 'Solicitado' : 'No solicitado'}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Solicitar
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="violations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Violaciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {violations.length > 0 ? (
                violations.map((violation) => (
                  <div key={violation.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Badge variant={violation.severity === 'high' ? 'destructive' : 'secondary'}>
                          {violation.type}
                        </Badge>
                        <Badge variant={violation.status === 'resolved' ? 'default' : 'destructive'}>
                          {violation.status}
                        </Badge>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(violation.detectedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h4 className="font-medium mb-2">{violation.description}</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Registros afectados: {violation.affectedRecords}
                    </p>
                    {violation.resolution && (
                      <div className="mt-3 p-3 bg-green-50 rounded-lg">
                        <h5 className="font-medium text-green-800 mb-1">Resolución:</h5>
                        <p className="text-sm text-green-700">{violation.resolution}</p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-4" />
                  <p className="text-gray-600">No hay violaciones registradas</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileCheck className="h-5 w-5 mr-2" />
                Registro de Auditoría
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Lock className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Registros de auditoría detallados</p>
                <p className="text-sm text-gray-500 mt-2">
                  Acceso completo a logs de actividad y cambios del sistema
                </p>
                <Button className="mt-4">
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Logs Completos
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
