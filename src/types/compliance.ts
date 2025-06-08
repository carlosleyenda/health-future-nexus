
// Tipos para compliance y auditoría

export interface HIPAACompliance {
  id: string;
  organizationId: string;
  assessmentDate: string;
  complianceScore: number;
  requirements: HIPAARequirement[];
  violations: ComplianceViolation[];
  remedyActions: RemedyAction[];
  nextAssessmentDue: string;
  certificationStatus: 'compliant' | 'non_compliant' | 'under_review';
}

export interface HIPAARequirement {
  section: string;
  requirement: string;
  status: 'compliant' | 'non_compliant' | 'in_progress';
  evidence: string[];
  lastReviewed: string;
  notes?: string;
}

export interface GDPRCompliance {
  id: string;
  userId: string;
  consentGiven: boolean;
  consentDate: string;
  purposes: DataProcessingPurpose[];
  dataRetentionPeriod: number;
  dataSubjectRights: DataSubjectRight[];
  dataProcessingActivities: DataProcessingActivity[];
  privacyNoticeAccepted: boolean;
  cookieConsent: CookieConsent;
}

export interface DataProcessingPurpose {
  purpose: string;
  legalBasis: 'consent' | 'contract' | 'legal_obligation' | 'vital_interests' | 'public_task' | 'legitimate_interests';
  consentGiven: boolean;
  canWithdraw: boolean;
}

export interface DataSubjectRight {
  right: 'access' | 'rectification' | 'erasure' | 'portability' | 'restriction' | 'objection';
  requested: boolean;
  requestDate?: string;
  fulfilled: boolean;
  fulfillmentDate?: string;
}

export interface DataProcessingActivity {
  activity: string;
  dataCategories: string[];
  purposes: string[];
  recipients: string[];
  retentionPeriod: string;
  securityMeasures: string[];
}

export interface CookieConsent {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  consentDate: string;
}

export interface ComplianceViolation {
  id: string;
  type: 'HIPAA' | 'GDPR' | 'FDA' | 'SOX' | 'PCI_DSS';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  detectedAt: string;
  reportedBy: string;
  affectedRecords: number;
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  resolution?: string;
  resolvedAt?: string;
}

export interface RemedyAction {
  id: string;
  violationId: string;
  action: string;
  assignedTo: string;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  completedAt?: string;
  evidence?: string[];
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  success: boolean;
  details: Record<string, any>;
  riskScore: number;
  geolocation?: {
    country: string;
    city: string;
    coordinates: [number, number];
  };
}
