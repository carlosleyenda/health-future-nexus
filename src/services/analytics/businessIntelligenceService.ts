
// Servicio para Analytics e Inteligencia Empresarial

import type { 
  ExecutiveDashboard, 
  RegulatoryReport, 
  ProfitabilityAnalysis, 
  DemandPrediction 
} from '@/types/analytics';

export class BusinessIntelligenceService {
  private apiKey: string;

  constructor(apiKey: string = process.env.BI_API_KEY || '') {
    this.apiKey = apiKey;
  }

  async generateExecutiveDashboard(
    organizationId: string, 
    period: string
  ): Promise<ExecutiveDashboard> {
    const response = await fetch('/api/analytics/executive-dashboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({ organizationId, period })
    });

    if (!response.ok) {
      throw new Error(`BI API error: ${response.status}`);
    }

    return response.json();
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
