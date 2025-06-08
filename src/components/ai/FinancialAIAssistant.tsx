
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Brain, TrendingUp, DollarSign, PieChart, BarChart3, 
  Target, Lightbulb, AlertTriangle, Zap, Calculator,
  ArrowUpRight, ArrowDownRight, Equal, Wallet, CreditCard
} from 'lucide-react';
import { useHealthWallet, useTransactions } from '@/hooks/useFinancialServices';
import { businessIntelligenceService } from '@/services/analytics/businessIntelligenceService';
import { useAuthStore } from '@/store/auth';
import AIChat from './AIChat';

interface FinancialInsight {
  type: 'opportunity' | 'risk' | 'optimization' | 'trend';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  actionItems: string[];
  metrics?: Record<string, number>;
}

interface PredictiveAnalysis {
  revenueProjection: {
    nextMonth: number;
    nextQuarter: number;
    confidence: number;
  };
  riskFactors: string[];
  opportunities: string[];
  recommendations: string[];
}

export default function FinancialAIAssistant() {
  const { user } = useAuthStore();
  const { data: wallet } = useHealthWallet();
  const { data: transactions } = useTransactions(user?.id);
  
  const [insights, setInsights] = useState<FinancialInsight[]>([]);
  const [predictiveAnalysis, setPredictiveAnalysis] = useState<PredictiveAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('insights');

  useEffect(() => {
    if (user && wallet && transactions) {
      generateFinancialInsights();
    }
  }, [user, wallet, transactions]);

  const generateFinancialInsights = async () => {
    setIsAnalyzing(true);
    
    try {
      // Simulated AI analysis - in real implementation, this would call AI services
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockInsights: FinancialInsight[] = [
        {
          type: 'opportunity',
          title: 'Optimización de Costos de Transacción',
          description: 'Detectamos que el 35% de sus transacciones podrían beneficiarse de métodos de pago más eficientes',
          impact: 'high',
          actionItems: [
            'Implementar pagos con criptomonedas para reducir fees en un 60%',
            'Negociar tarifas preferenciales con procesadores de pago',
            'Ofrecer descuentos por pagos con Health Coins'
          ],
          metrics: { potentialSavings: 2400, currentFees: 856 }
        },
        {
          type: 'trend',
          title: 'Crecimiento Exponencial en Consultas Digitales',
          description: 'Las consultas virtuales han aumentado 180% en los últimos 3 meses',
          impact: 'high',
          actionItems: [
            'Expandir capacidad de teleconsulta',
            'Desarrollar paquetes de suscripción premium',
            'Implementar IA para diagnósticos preliminares'
          ],
          metrics: { growthRate: 180, monthlyRevenue: 45000 }
        },
        {
          type: 'optimization',
          title: 'Predicción de Demanda con Machine Learning',
          description: 'Implementar algoritmos predictivos puede reducir tiempos de espera en 40%',
          impact: 'medium',
          actionItems: [
            'Desarrollar modelo de predicción de demanda',
            'Integrar con sistema de citas automáticas',
            'Optimizar asignación de recursos médicos'
          ],
          metrics: { efficiencyGain: 40, satisfactionIncrease: 25 }
        },
        {
          type: 'risk',
          title: 'Concentración de Ingresos en Pocas Especialidades',
          description: 'El 70% de los ingresos provienen de solo 3 especialidades médicas',
          impact: 'medium',
          actionItems: [
            'Diversificar oferta de especialidades',
            'Desarrollar programas de medicina preventiva',
            'Expandir servicios de telemedicina especializados'
          ],
          metrics: { concentrationRisk: 70, diversificationOpportunity: 30 }
        }
      ];

      const mockPredictive: PredictiveAnalysis = {
        revenueProjection: {
          nextMonth: 152000,
          nextQuarter: 480000,
          confidence: 0.87
        },
        riskFactors: [
          'Competencia aumentando en telemedicina',
          'Cambios regulatorios en seguros médicos',
          'Fluctuaciones estacionales en consultas'
        ],
        opportunities: [
          'Mercado de medicina personalizada en crecimiento',
          'Integración con wearables y IoT médico',
          'Expansión a mercados internacionales',
          'Servicios de IA diagnóstica premium'
        ],
        recommendations: [
          'Invertir en tecnologías de IA diagnóstica',
          'Desarrollar alianzas estratégicas con tech companies',
          'Implementar blockchain para historial médico',
          'Crear programa de medicina preventiva basado en datos'
        ]
      };

      setInsights(mockInsights);
      setPredictiveAnalysis(mockPredictive);
    } catch (error) {
      console.error('Error generating insights:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <Target className="h-5 w-5 text-green-600" />;
      case 'risk': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'optimization': return <Zap className="h-5 w-5 text-blue-600" />;
      case 'trend': return <TrendingUp className="h-5 w-5 text-purple-600" />;
      default: return <Brain className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Brain className="h-8 w-8 text-blue-600" />
            Asistente Financiero IA
          </h1>
          <p className="text-muted-foreground">
            Análisis inteligente, predicciones y optimizaciones para tu plataforma de salud
          </p>
        </div>
        <Button onClick={generateFinancialInsights} disabled={isAnalyzing}>
          {isAnalyzing ? (
            <>
              <Brain className="h-4 w-4 mr-2 animate-pulse" />
              Analizando...
            </>
          ) : (
            <>
              <Zap className="h-4 w-4 mr-2" />
              Actualizar Análisis
            </>
          )}
        </Button>
      </div>

      {/* Executive Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Revenue Potencial</p>
                <p className="text-2xl font-bold text-blue-800">
                  {predictiveAnalysis ? `$${(predictiveAnalysis.revenueProjection.nextMonth / 1000).toFixed(0)}K` : '--'}
                </p>
                <p className="text-xs text-blue-600">Próximo mes</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Oportunidades</p>
                <p className="text-2xl font-bold text-green-800">{insights.filter(i => i.type === 'opportunity').length}</p>
                <p className="text-xs text-green-600">Identificadas</p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Precisión IA</p>
                <p className="text-2xl font-bold text-purple-800">
                  {predictiveAnalysis ? `${Math.round(predictiveAnalysis.revenueProjection.confidence * 100)}%` : '--'}
                </p>
                <p className="text-xs text-purple-600">Confianza</p>
              </div>
              <Brain className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Health Coins</p>
                <p className="text-2xl font-bold text-orange-800">{wallet?.healthCoins || 0}</p>
                <p className="text-xs text-orange-600">En cartera</p>
              </div>
              <Wallet className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Analysis Panel */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="insights">Insights IA</TabsTrigger>
              <TabsTrigger value="predictions">Predicciones</TabsTrigger>
              <TabsTrigger value="optimizations">Optimizaciones</TabsTrigger>
            </TabsList>

            <TabsContent value="insights" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    Insights Financieros Inteligentes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {insights.map((insight, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getTypeIcon(insight.type)}
                          <h3 className="font-semibold">{insight.title}</h3>
                        </div>
                        <Badge className={getImpactColor(insight.impact)}>
                          {insight.impact} impact
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                      
                      {insight.metrics && (
                        <div className="flex gap-4 text-sm">
                          {Object.entries(insight.metrics).map(([key, value]) => (
                            <div key={key} className="flex items-center gap-1">
                              <span className="font-medium">{key}:</span>
                              <span className="text-blue-600">{typeof value === 'number' ? value.toLocaleString() : value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Acciones recomendadas:</p>
                        <ul className="text-sm space-y-1">
                          {insight.actionItems.map((action, actionIndex) => (
                            <li key={actionIndex} className="flex items-start gap-2">
                              <ArrowUpRight className="h-3 w-3 mt-0.5 text-blue-500 flex-shrink-0" />
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="predictions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-500" />
                    Análisis Predictivo Avanzado
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {predictiveAnalysis && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">Proyección de Ingresos</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">Próximo mes:</span>
                              <span className="font-bold">${predictiveAnalysis.revenueProjection.nextMonth.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Próximo trimestre:</span>
                              <span className="font-bold">${predictiveAnalysis.revenueProjection.nextQuarter.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Confianza:</span>
                              <span className="font-bold text-green-600">
                                {Math.round(predictiveAnalysis.revenueProjection.confidence * 100)}%
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">Factores de Riesgo</h4>
                          <ul className="space-y-1">
                            {predictiveAnalysis.riskFactors.map((risk, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <AlertTriangle className="h-3 w-3 mt-0.5 text-red-500 flex-shrink-0" />
                                {risk}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Target className="h-4 w-4 text-green-500" />
                            Oportunidades de Mercado
                          </h4>
                          <ul className="space-y-1">
                            {predictiveAnalysis.opportunities.map((opportunity, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <ArrowUpRight className="h-3 w-3 mt-0.5 text-green-500 flex-shrink-0" />
                                {opportunity}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Zap className="h-4 w-4 text-blue-500" />
                            Recomendaciones Estratégicas
                          </h4>
                          <ul className="space-y-1">
                            {predictiveAnalysis.recommendations.map((recommendation, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <Lightbulb className="h-3 w-3 mt-0.5 text-blue-500 flex-shrink-0" />
                                {recommendation}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="optimizations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-purple-500" />
                    Optimizaciones Automáticas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Alert>
                      <Zap className="h-4 w-4" />
                      <AlertDescription>
                        <strong>IA Activa:</strong> El sistema está optimizando automáticamente 
                        las rutas de pago, asignación de recursos y predicción de demanda.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">Optimización de Costos</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Reducción de fees:</span>
                            <span className="text-green-600 font-medium">-23%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Eficiencia operativa:</span>
                            <span className="text-green-600 font-medium">+31%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tiempo de procesamiento:</span>
                            <span className="text-green-600 font-medium">-45%</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">Automatización IA</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Routing de pagos inteligente</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Detección de fraude en tiempo real</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Predicción de demanda médica</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>Optimización de citas automática</span>
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

        {/* AI Chat Assistant */}
        <div>
          <AIChat
            context="financial"
            title="Consultor Financiero IA"
            placeholder="Pregunta sobre análisis financieros, predicciones, optimizaciones, métricas de negocio..."
          />
        </div>
      </div>
    </div>
  );
}
