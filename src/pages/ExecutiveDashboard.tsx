import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, DollarSign, Users, Activity, Crown, 
  Target, Zap, Globe, Brain, Rocket, ChartBar,
  ArrowUp, ArrowDown, Eye, BarChart3
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const revenueData = [
  { month: 'Ene', revenue: 2.4, patients: 12500, doctors: 850 },
  { month: 'Feb', revenue: 3.1, patients: 15800, doctors: 920 },
  { month: 'Mar', revenue: 4.2, patients: 19200, doctors: 1050 },
  { month: 'Abr', revenue: 5.8, patients: 23400, doctors: 1180 },
  { month: 'May', revenue: 7.3, patients: 28900, doctors: 1320 },
  { month: 'Jun', revenue: 9.1, patients: 35200, doctors: 1480 },
  { month: 'Jul', revenue: 11.4, patients: 42800, doctors: 1650 },
  { month: 'Ago', revenue: 14.2, patients: 51200, doctors: 1820 },
  { month: 'Sep', revenue: 17.8, patients: 61500, doctors: 2010 },
  { month: 'Oct', revenue: 22.1, patients: 73800, doctors: 2250 },
  { month: 'Nov', revenue: 27.3, patients: 88200, doctors: 2480 },
  { month: 'Dic', revenue: 33.8, patients: 105000, doctors: 2750 }
];

const marketData = [
  { segment: 'Pacientes Premium', value: 45, color: '#8B5CF6' },
  { segment: 'Doctores Elite', value: 35, color: '#06B6D4' },
  { segment: 'Farmacia Digital', value: 12, color: '#10B981' },
  { segment: 'IA & Analytics', value: 8, color: '#F59E0B' }
];

const kpiData = [
  {
    title: 'Ingresos Mensuales',
    value: '$33.8M',
    change: '+127%',
    trend: 'up',
    icon: DollarSign,
    color: 'green',
    subtitle: 'vs mes anterior'
  },
  {
    title: 'Usuarios Activos',
    value: '105K',
    change: '+89%',
    trend: 'up', 
    icon: Users,
    color: 'blue',
    subtitle: 'pacientes registrados'
  },
  {
    title: 'Doctores Elite',
    value: '2,750',
    change: '+67%',
    trend: 'up',
    icon: Crown,
    color: 'purple',
    subtitle: 'profesionales verificados'
  },
  {
    title: 'Consultas/Mes',
    value: '847K',
    change: '+234%',
    trend: 'up',
    icon: Activity,
    color: 'orange',
    subtitle: 'sesiones completadas'
  }
];

const conversionMetrics = [
  { stage: 'Visitantes Web', value: 2450000, rate: 100 },
  { stage: 'Registros', value: 367500, rate: 15 },
  { stage: 'Usuarios Activos', value: 147000, rate: 40 },
  { stage: 'Suscriptores Premium', value: 44100, rate: 30 },
  { stage: 'Usuarios Enterprise', value: 8820, rate: 20 }
];

export default function ExecutiveDashboard() {
  const [realTimeMetrics, setRealTimeMetrics] = useState({
    liveUsers: 15847,
    activeConsultations: 1284,
    revenueToday: 89750,
    newSignups: 342
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeMetrics(prev => ({
        liveUsers: prev.liveUsers + Math.floor(Math.random() * 20 - 10),
        activeConsultations: prev.activeConsultations + Math.floor(Math.random() * 10 - 5),
        revenueToday: prev.revenueToday + Math.floor(Math.random() * 1000),
        newSignups: prev.newSignups + Math.floor(Math.random() * 3)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      {/* Executive Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Executive Command Center
            </h1>
            <p className="text-lg text-gray-600">
              Real-time business intelligence for market domination
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-green-100 text-green-800 px-4 py-2 text-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              LIVE
            </Badge>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3">
              <Eye className="h-5 w-5 mr-2" />
              Board View
            </Button>
          </div>
        </div>
      </div>

      {/* Real-time Metrics Bar */}
      <div className="mb-8 bg-gradient-to-r from-gray-900 to-blue-900 rounded-xl p-6 text-white">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">
              {realTimeMetrics.liveUsers.toLocaleString()}
            </div>
            <div className="text-sm text-gray-300">Usuarios en línea</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">
              {realTimeMetrics.activeConsultations.toLocaleString()}
            </div>
            <div className="text-sm text-gray-300">Consultas activas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400">
              ${realTimeMetrics.revenueToday.toLocaleString()}
            </div>
            <div className="text-sm text-gray-300">Ingresos hoy</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400">
              {realTimeMetrics.newSignups}
            </div>
            <div className="text-sm text-gray-300">Registros hoy</div>
          </div>
        </div>
      </div>

      {/* Main KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiData.map((kpi, index) => {
          const IconComponent = kpi.icon;
          return (
            <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-all">
              <div className={`absolute top-0 right-0 w-20 h-20 bg-${kpi.color}-100 rounded-full -translate-y-6 translate-x-6`}>
                <IconComponent className={`h-8 w-8 text-${kpi.color}-600 absolute bottom-4 left-4`} />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {kpi.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-gray-900">
                    {kpi.value}
                  </div>
                  <div className="flex items-center gap-2">
                    {kpi.trend === 'up' ? (
                      <ArrowUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${
                      kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {kpi.change}
                    </span>
                    <span className="text-sm text-gray-500">
                      {kpi.subtitle}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-white p-1 rounded-lg shadow-sm">
          <TabsTrigger value="revenue" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Revenue
          </TabsTrigger>
          <TabsTrigger value="growth" className="flex items-center gap-2">
            <Rocket className="h-4 w-4" />
            Growth
          </TabsTrigger>
          <TabsTrigger value="market" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Market
          </TabsTrigger>
          <TabsTrigger value="conversion" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Conversion
          </TabsTrigger>
          <TabsTrigger value="intelligence" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  Revenue Growth Trajectory
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [`$${value}M`, name]} />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#8B5CF6" 
                      fill="url(#colorRevenue)" 
                    />
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={marketData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {marketData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`]} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {marketData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm">{item.segment}</span>
                      </div>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="growth" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Growth Trajectory</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="patients" 
                      stroke="#06B6D4" 
                      strokeWidth={3}
                      name="Patients"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="doctors" 
                      stroke="#8B5CF6" 
                      strokeWidth={3}
                      name="Doctors"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Growth Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Monthly Recurring Revenue</span>
                    <span className="text-lg font-bold text-green-600">$33.8M</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <div className="text-xs text-gray-500 mt-1">Target: $40M</div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">User Acquisition Rate</span>
                    <span className="text-lg font-bold text-blue-600">127%</span>
                  </div>
                  <Progress value={89} className="h-2" />
                  <div className="text-xs text-gray-500 mt-1">Target: 150%</div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Market Penetration</span>
                    <span className="text-lg font-bold text-purple-600">23.4%</span>
                  </div>
                  <Progress value={47} className="h-2" />
                  <div className="text-xs text-gray-500 mt-1">Target: 50%</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="conversion" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales Funnel Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversionMetrics.map((stage, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{stage.stage}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-bold">
                          {stage.value.toLocaleString()}
                        </span>
                        <Badge className="bg-blue-100 text-blue-800">
                          {stage.rate}%
                        </Badge>
                      </div>
                    </div>
                    <div className="h-8 bg-gray-200 rounded-lg overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-1000"
                        style={{ width: `${(stage.value / conversionMetrics[0].value) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="intelligence" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-800">
                  <Brain className="h-5 w-5" />
                  AI Revenue Predictions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <div className="text-2xl font-bold text-purple-600 mb-2">
                    $127.5M
                  </div>
                  <div className="text-sm text-gray-600">
                    Predicted Q1 2024 Revenue (94.7% confidence)
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Market Expansion Opportunity</span>
                    <span className="font-bold text-green-600">+284%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Churn Risk Assessment</span>
                    <span className="font-bold text-yellow-600">Low (2.3%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Optimal Pricing Point</span>
                    <span className="font-bold text-blue-600">$89/consultation</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <Target className="h-5 w-5" />
                  Strategic Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-white p-3 rounded-lg border border-green-200">
                  <div className="font-medium text-green-800 mb-1">
                    Immediate Action Required
                  </div>
                  <div className="text-sm text-gray-600">
                    Launch Enterprise tier - potential $45M ARR increase
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-lg border border-green-200">
                  <div className="font-medium text-green-800 mb-1">
                    Market Opportunity
                  </div>
                  <div className="text-sm text-gray-600">
                    Expand to LATAM markets - 12M potential users
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-lg border border-green-200">
                  <div className="font-medium text-green-800 mb-1">
                    Technology Investment
                  </div>
                  <div className="text-sm text-gray-600">
                    AI diagnostic upgrade - 340% ROI in 18 months
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}