
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  AlertTriangle, 
  FileText, 
  Users, 
  TrendingUp, 
  Eye,
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

export default function ComplianceFinancialDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const fraudAlerts = [
    {
      id: '1',
      type: 'suspicious_activity',
      severity: 'high',
      user: 'user@example.com',
      amount: 5000,
      description: 'Unusual transaction pattern detected',
      timestamp: '2024-01-15 14:30:00',
      status: 'open'
    },
    {
      id: '2',
      type: 'velocity_check',
      severity: 'medium',
      user: 'another@example.com',
      amount: 1200,
      description: 'Multiple rapid transactions',
      timestamp: '2024-01-15 13:45:00',
      status: 'investigating'
    }
  ];

  const kycVerifications = [
    {
      id: '1',
      user: 'user1@example.com',
      status: 'verified',
      level: 'enhanced',
      verifiedAt: '2024-01-10',
      riskScore: 15
    },
    {
      id: '2',
      user: 'user2@example.com',
      status: 'pending',
      level: 'basic',
      verifiedAt: null,
      riskScore: null
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Compliance & Financial Dashboard</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Fraud Alerts</p>
                <p className="text-2xl font-bold text-red-600">12</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">KYC Verified Users</p>
                <p className="text-2xl font-bold text-green-600">1,234</p>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Compliance Score</p>
                <p className="text-2xl font-bold text-blue-600">98.5%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly AML Checks</p>
                <p className="text-2xl font-bold text-purple-600">2,567</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="fraud">Fraud Detection</TabsTrigger>
          <TabsTrigger value="kyc">KYC Management</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
          <TabsTrigger value="reports">Compliance Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Risk Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">High Risk Transactions</span>
                    <span className="text-sm font-medium text-red-600">↑ 12%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">KYC Completion Rate</span>
                    <span className="text-sm font-medium text-green-600">↑ 8%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">False Positive Rate</span>
                    <span className="text-sm font-medium text-blue-600">↓ 5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">PCI DSS Compliance</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Data Encryption</span>
                    <Badge className="bg-green-100 text-green-800">AES-256</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Last Security Audit</span>
                    <span className="text-sm text-muted-foreground">2024-01-01</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="fraud" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Fraud Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fraudAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      <div>
                        <p className="font-medium">{alert.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {alert.user} • ${alert.amount.toLocaleString()} • {alert.timestamp}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kyc" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                KYC Verifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {kycVerifications.map((kyc) => (
                  <div key={kyc.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Shield className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">{kyc.user}</p>
                        <p className="text-sm text-muted-foreground">
                          Level: {kyc.level} • Risk Score: {kyc.riskScore || 'N/A'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(kyc.status)}>
                        {kyc.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Audit Trail
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Payment Method Added</p>
                      <p className="text-sm text-muted-foreground">
                        user@example.com • 2024-01-15 14:30:00
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">KYC Verification Completed</p>
                      <p className="text-sm text-muted-foreground">
                        another@example.com • 2024-01-15 13:45:00
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Compliance Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                  <FileText className="h-6 w-6 mb-2" />
                  Monthly AML Report
                </Button>
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                  <Shield className="h-6 w-6 mb-2" />
                  KYC Status Report
                </Button>
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                  <AlertTriangle className="h-6 w-6 mb-2" />
                  Fraud Summary
                </Button>
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                  <TrendingUp className="h-6 w-6 mb-2" />
                  Risk Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
