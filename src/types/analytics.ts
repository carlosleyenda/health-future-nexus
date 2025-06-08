
// Tipos para Analytics e Inteligencia Empresarial

export interface ExecutiveDashboard {
  id: string;
  organizationId: string;
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  metrics: ExecutiveMetrics;
  trends: TrendAnalysis[];
  alerts: BusinessAlert[];
  generatedAt: string;
}

export interface ExecutiveMetrics {
  revenue: {
    total: number;
    growth: number;
    currency: string;
    breakdown: RevenueBreakdown[];
  };
  patients: {
    total: number;
    newPatients: number;
    retention: number;
    satisfaction: number;
  };
  operations: {
    consultations: number;
    appointments: number;
    cancellationRate: number;
    averageWaitTime: number;
  };
  financial: {
    profitMargin: number;
    costPerAcquisition: number;
    lifetimeValue: number;
    cashFlow: number;
  };
}

export interface RevenueBreakdown {
  category: 'consultations' | 'pharmacy' | 'delivery' | 'subscriptions' | 'devices';
  amount: number;
  percentage: number;
  growth: number;
}

export interface TrendAnalysis {
  metric: string;
  current: number;
  previous: number;
  trend: 'up' | 'down' | 'stable';
  forecast: number[];
  confidence: number;
}

export interface BusinessAlert {
  id: string;
  type: 'revenue' | 'operational' | 'compliance' | 'quality';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  recommendation: string;
  createdAt: string;
  resolved: boolean;
}

export interface RegulatoryReport {
  id: string;
  type: 'hipaa' | 'gdpr' | 'fda' | 'sox' | 'custom';
  period: string;
  status: 'draft' | 'pending' | 'submitted' | 'approved';
  data: Record<string, any>;
  generatedAt: string;
  submittedAt?: string;
  approvedAt?: string;
}

export interface ProfitabilityAnalysis {
  doctorId?: string;
  specialty?: string;
  serviceType?: string;
  revenue: number;
  costs: number;
  profit: number;
  margin: number;
  patientVolume: number;
  averageRevenue: number;
  period: string;
}

export interface DemandPrediction {
  service: string;
  specialty?: string;
  location?: string;
  currentDemand: number;
  predictedDemand: number;
  confidence: number;
  factors: DemandFactor[];
  recommendations: string[];
  timeframe: string;
}

export interface DemandFactor {
  factor: string;
  impact: number;
  description: string;
}
