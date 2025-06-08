
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Stethoscope,
  CreditCard,
  Users,
  Calculator
} from 'lucide-react';

interface DashboardMetrics {
  totalRevenue: number;
  monthlyRevenue: number;
  revenueGrowth: number;
  outstandingAR: number;
  daysInAR: number;
  cleanClaimRate: number;
  denialRate: number;
  collectionRate: number;
  totalClaims: number;
  pendingClaims: number;
  deniedClaims: number;
  paidClaims: number;
}

export default function MedicalBillingDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const metrics: DashboardMetrics = {
    totalRevenue: 2450000,
    monthlyRevenue: 245000,
    revenueGrowth: 12.5,
    outstandingAR: 180000,
    daysInAR: 42,
    cleanClaimRate: 94.5,
    denialRate: 8.2,
    collectionRate: 96.8,
    totalClaims: 1245,
    pendingClaims: 89,
    deniedClaims: 102,
    paidClaims: 1054
  };

  const recentAlerts = [
    {
      id: '1',
      type: 'coding',
      severity: 'high' as const,
      description: 'ICD-10 code mismatch detected in claim #CLM-2024-001',
      entity: 'Claim',
      timestamp: '2024-01-15 14:30:00'
    },
    {
      id: '2',
      type: 'billing' as const,
      severity: 'medium' as const,
      description: 'Prior authorization expired for procedure',
      entity: 'Authorization',
      timestamp: '2024-01-15 13:45:00'
    },
    {
      id: '3',
      type: 'documentation' as const,
      severity: 'low' as const,
      description: 'Incomplete documentation for E&M coding',
      entity: 'Documentation',
      timestamp: '2024-01-15 12:15:00'
    }
  ];

  const agingBuckets = [
    { range: '0-30 days', amount: 45000, percentage: 25 },
    { range: '31-60 days', amount: 54000, percentage: 30 },
    { range: '61-90 days', amount: 36000, percentage: 20 },
    { range: '91-120 days', amount: 27000, percentage: 15 },
    { range: '120+ days', amount: 18000, percentage: 10 }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Medical Billing & Revenue Cycle</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Calculator className="h-4 w-4 mr-2" />
            New Claim
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">{formatCurrency(metrics.totalRevenue)}</p>
                <div className="flex items-center text-sm text-green-600">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  {formatPercentage(metrics.revenueGrowth)} vs last month
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Days in A/R</p>
                <p className="text-2xl font-bold">{metrics.daysInAR}</p>
                <div className="flex items-center text-sm text-orange-600">
                  <Clock className="h-4 w-4 mr-1" />
                  Target: 35 days
                </div>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Clean Claim Rate</p>
                <p className="text-2xl font-bold">{formatPercentage(metrics.cleanClaimRate)}</p>
                <div className="flex items-center text-sm text-blue-600">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Excellent performance
                </div>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Denial Rate</p>
                <p className="text-2xl font-bold">{formatPercentage(metrics.denialRate)}</p>
                <div className="flex items-center text-sm text-red-600">
                  <XCircle className="h-4 w-4 mr-1" />
                  Above industry avg
                </div>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="claims">Claims</TabsTrigger>
          <TabsTrigger value="coding">Coding</TabsTrigger>
          <TabsTrigger value="ar">A/R Management</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Revenue Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Revenue trend chart would appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* A/R Aging */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  A/R Aging Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agingBuckets.map((bucket, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded ${
                          index === 0 ? 'bg-green-500' :
                          index === 1 ? 'bg-blue-500' :
                          index === 2 ? 'bg-yellow-500' :
                          index === 3 ? 'bg-orange-500' : 'bg-red-500'
                        }`} />
                        <span className="text-sm font-medium">{bucket.range}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{formatCurrency(bucket.amount)}</div>
                        <div className="text-sm text-muted-foreground">{bucket.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Recent Compliance Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      <div>
                        <p className="font-medium">{alert.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {alert.entity} • {alert.timestamp}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="claims">
          <Card>
            <CardHeader>
              <CardTitle>Claims Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Claims management interface coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="coding">
          <Card>
            <CardHeader>
              <CardTitle>Medical Coding</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Stethoscope className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Medical coding interface coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ar">
          <Card>
            <CardHeader>
              <CardTitle>Accounts Receivable</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">A/R management interface coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Advanced analytics coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Compliance monitoring interface coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
