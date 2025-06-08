
import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/store/auth';
import { businessIntelligenceService } from '@/services/analytics/businessIntelligenceService';
import { toast } from 'sonner';

interface FinancialAIQuery {
  query: string;
  context: 'revenue' | 'costs' | 'predictions' | 'optimization' | 'general';
  filters?: Record<string, any>;
}

interface FinancialAIResponse {
  analysis: string;
  metrics?: Record<string, number>;
  recommendations: string[];
  confidence: number;
  visualizations?: any[];
}

export const useFinancialAI = () => {
  const { user } = useAuthStore();
  const [currentQuery, setCurrentQuery] = useState<string>('');

  // Get executive dashboard data
  const { data: executiveDashboard, isLoading: dashboardLoading } = useQuery({
    queryKey: ['executive-dashboard', user?.id],
    queryFn: () => businessIntelligenceService.generateExecutiveDashboard(
      user?.id || '', 
      'monthly'
    ),
    enabled: !!user,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // AI Financial Analysis
  const analyzeFinancialData = useMutation({
    mutationFn: async ({ query, context, filters }: FinancialAIQuery): Promise<FinancialAIResponse> => {
      // Simulate AI processing with realistic financial analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const analysisMap: Record<string, FinancialAIResponse> = {
        revenue: {
          analysis: `Análisis de ingresos: Los ingresos han mostrado un crecimiento sostenido del 15.2% mensual. 
                    Las consultas virtuales representan el 60% del total, seguidas por servicios de farmacia (24%). 
                    Se detecta una oportunidad de crecimiento en suscripciones premium (+300% potencial).`,
          metrics: {
            monthlyGrowth: 15.2,
            virtualConsultationShare: 60,
            pharmacyShare: 24,
            subscriptionPotential: 300
          },
          recommendations: [
            'Expandir capacidad de teleconsulta en horarios pico',
            'Lanzar programa de suscripción familiar',
            'Implementar pricing dinámico basado en demanda',
            'Desarrollar especialidades de alta demanda'
          ],
          confidence: 0.89
        },
        costs: {
          analysis: `Optimización de costos: Se identificaron oportunidades de ahorro del 23% en fees de transacción 
                    y 31% en eficiencia operativa. Los costos de adquisición de clientes están 15% por encima del benchmark.`,
          metrics: {
            transactionFeesSavings: 23,
            operationalEfficiencyGain: 31,
            customerAcquisitionCostGap: 15,
            potentialMonthlySavings: 8400
          },
          recommendations: [
            'Migrar a procesadores de pago con fees más bajos',
            'Automatizar procesos administrativos',
            'Implementar referral program para reducir CAC',
            'Optimizar marketing digital con IA'
          ],
          confidence: 0.92
        },
        predictions: {
          analysis: `Predicciones para los próximos 6 meses: Revenue esperado de $780K con 87% de confianza. 
                    Factores clave: crecimiento estacional +12%, expansión de servicios +25%, retención mejorada +8%.`,
          metrics: {
            sixMonthRevenue: 780000,
            seasonalGrowth: 12,
            serviceExpansion: 25,
            retentionImprovement: 8
          },
          recommendations: [
            'Preparar infraestructura para picos estacionales',
            'Acelerar desarrollo de nuevos servicios',
            'Implementar programa de loyalty avanzado',
            'Diversificar fuentes de ingresos'
          ],
          confidence: 0.87
        },
        optimization: {
          analysis: `Oportunidades de optimización identificadas: Automatización de procesos puede reducir costos 
                    operativos en 35%. IA predictiva puede mejorar utilización de recursos en 28%.`,
          metrics: {
            automationSavings: 35,
            resourceUtilizationGain: 28,
            customerSatisfactionIncrease: 22,
            timeToMarketReduction: 40
          },
          recommendations: [
            'Implementar RPA para procesos repetitivos',
            'Desarrollar algoritmos de scheduling inteligente',
            'Usar ML para personalización de servicios',
            'Automatizar follow-ups post-consulta'
          ],
          confidence: 0.85
        },
        general: {
          analysis: `Resumen ejecutivo: La plataforma muestra signos sólidos de crecimiento con oportunidades 
                    claras de optimización. ROI actual 3.2x, con potencial de mejora a 4.8x mediante implementación 
                    de tecnologías AI/ML.`,
          metrics: {
            currentROI: 3.2,
            potentialROI: 4.8,
            marketShareGrowth: 18,
            customerLifetimeValue: 850
          },
          recommendations: [
            'Priorizar inversión en tecnologías AI/ML',
            'Expandir a mercados adyacentes',
            'Desarrollar alianzas estratégicas',
            'Implementar programa de innovación continua'
          ],
          confidence: 0.91
        }
      };

      const response = analysisMap[context] || analysisMap.general;
      
      // Add query-specific insights
      if (query.toLowerCase().includes('blockchain')) {
        response.recommendations.push('Explorar integración blockchain para records médicos');
      }
      if (query.toLowerCase().includes('crypto')) {
        response.recommendations.push('Implementar pagos en criptomonedas para mercados internacionales');
      }
      if (query.toLowerCase().includes('ai') || query.toLowerCase().includes('inteligencia')) {
        response.recommendations.push('Acelerar implementación de IA diagnóstica');
      }

      return response;
    },
    onSuccess: () => {
      toast.success('Análisis completado');
    },
    onError: () => {
      toast.error('Error en el análisis financiero');
    },
  });

  // Get business alerts
  const { data: businessAlerts } = useQuery({
    queryKey: ['business-alerts', user?.id],
    queryFn: () => businessIntelligenceService.getBusinessAlerts(user?.id || ''),
    enabled: !!user,
    refetchInterval: 30000, // 30 seconds
  });

  // Generate automated insights
  const generateInsights = async (type: 'revenue' | 'costs' | 'growth' | 'risks') => {
    const queries = {
      revenue: 'Analiza las tendencias de ingresos y oportunidades de crecimiento',
      costs: 'Identifica oportunidades de optimización de costos y eficiencia',
      growth: 'Evalúa estrategias de crecimiento y expansión de mercado',
      risks: 'Analiza factores de riesgo financiero y medidas de mitigación'
    };

    return analyzeFinancialData.mutateAsync({
      query: queries[type],
      context: type === 'revenue' ? 'revenue' : type === 'costs' ? 'costs' : 'general'
    });
  };

  return {
    executiveDashboard,
    dashboardLoading,
    businessAlerts,
    analyzeFinancialData,
    generateInsights,
    currentQuery,
    setCurrentQuery,
    isAnalyzing: analyzeFinancialData.isPending
  };
};

export default useFinancialAI;
