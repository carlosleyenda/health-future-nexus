
// Servicio para Analytics e Inteligencia Empresarial

import type { 
  ExecutiveDashboard, 
  RegulatoryReport, 
  ProfitabilityAnalysis, 
  DemandPrediction 
} from '@/types/analytics';

export class BusinessIntelligenceService {
  private apiKey: string;

  constructor(apiKey: string = '') {
    this.apiKey = apiKey;
  }

  async generateExecutiveDashboard(
    organizationId: string, 
    period: string
  ): Promise<ExecutiveDashboard> {
    // Mock data for development - replace with actual API call when backend is ready
    const mockDashboard: ExecutiveDashboard = {
      id: 'exec-dashboard-1',
      organizationId,
      period: period as any,
      metrics: {
        revenue: {
          total: 125000,
          growth: 15.2,
          currency: 'USD',
          breakdown: [
            { category: 'consultations', amount: 75000, percentage: 60, growth: 12 },
            { category: 'pharmacy', amount: 30000, percentage: 24, growth: 18 },
            { category: 'delivery', amount: 15000, percentage: 12, growth: 25 },
            { category: 'subscriptions', amount: 5000, percentage: 4, growth: 5 }
          ]
        },
        patients: {
          total: 1250,
          newPatients: 85,
          retention: 92,
          satisfaction: 4.6
        },
        operations: {
          consultations: 450,
          appointments: 380,
          cancellationRate: 8.5,
          averageWaitTime: 12
        },
        financial: {
          profitMargin: 35.5,
          costPerAcquisition: 45,
          lifetimeValue: 850,
          cashFlow: 95000
        }
      },
      trends: [
        {
          metric: 'Ingresos Mensuales',
          current: 125000,
          previous: 108500,
          trend: 'up',
          forecast: [130000, 135000, 140000],
          confidence: 0.85
        },
        {
          metric: 'Nuevos Pacientes',
          current: 85,
          previous: 72,
          trend: 'up',
          forecast: [90, 95, 100],
          confidence: 0.78
        }
      ],
      alerts: [
        {
          id: 'alert-1',
          type: 'operational',
          severity: 'medium',
          message: 'Tiempo de espera promedio aumentó 15%',
          recommendation: 'Considerar agregar más personal médico en horarios pico',
          createdAt: new Date().toISOString(),
          resolved: false
        }
      ],
      generatedAt: new Date().toISOString()
    };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockDashboard;
  }

  async generateRegulatoryReport(
    type: string,
    period: string,
    data: Record<string, any>
  ): Promise<RegulatoryReport> {
    const response = await fetch('/api/analytics/regulatory-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({ type, period, data })
    });

    if (!response.ok) {
      throw new Error(`Regulatory API error: ${response.status}`);
    }

    return response.json();
  }

  async analyzeProfitability(
    filters: {
      doctorId?: string;
      specialty?: string;
      serviceType?: string;
      dateRange: { start: string; end: string };
    }
  ): Promise<ProfitabilityAnalysis[]> {
    const response = await fetch('/api/analytics/profitability', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(filters)
    });

    if (!response.ok) {
      throw new Error(`Profitability API error: ${response.status}`);
    }

    return response.json();
  }

  async predictDemand(
    service: string,
    location?: string,
    timeframe: string = '30d'
  ): Promise<DemandPrediction> {
    const response = await fetch('/api/analytics/demand-prediction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({ service, location, timeframe })
    });

    if (!response.ok) {
      throw new Error(`Demand Prediction API error: ${response.status}`);
    }

    return response.json();
  }

  async getBusinessAlerts(organizationId: string) {
    const response = await fetch(`/api/analytics/alerts/${organizationId}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
      }
    });

    if (!response.ok) {
      throw new Error(`Alerts API error: ${response.status}`);
    }

    return response.json();
  }

  async exportReport(reportId: string, format: 'pdf' | 'excel' | 'csv') {
    const response = await fetch(`/api/analytics/export/${reportId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({ format })
    });

    if (!response.ok) {
      throw new Error(`Export API error: ${response.status}`);
    }

    return response.blob();
  }
}

export const businessIntelligenceService = new BusinessIntelligenceService();
