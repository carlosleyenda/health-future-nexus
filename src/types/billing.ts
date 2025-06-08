
// Medical Billing and Revenue Cycle Management Types

export interface MedicalCode {
  id: string;
  code: string;
  description: string;
  category: 'ICD10' | 'CPT' | 'DRG' | 'HCPCS';
  effectiveDate: string;
  endDate?: string;
  isActive: boolean;
  reimbursementRate?: number;
  modifier?: string;
  rvu?: number; // Relative Value Unit
}

export interface CodingAssignment {
  id: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  primaryDiagnosisCode: string;
  secondaryDiagnosisCodes: string[];
  procedureCodes: string[];
  drgCode?: string;
  codingAccuracy: number; // 0-100%
  aiSuggested: boolean;
  reviewedBy?: string;
  reviewDate?: string;
  status: 'draft' | 'pending_review' | 'approved' | 'rejected';
  complianceFlags: string[];
  documentation: DocumentationRequirement[];
  createdAt: string;
  updatedAt: string;
}

export interface DocumentationRequirement {
  id: string;
  type: 'history' | 'examination' | 'decision_making' | 'time' | 'counseling';
  description: string;
  required: boolean;
  completed: boolean;
  evidenceText?: string;
  improvementSuggestion?: string;
}

export interface InsuranceEligibility {
  id: string;
  patientId: string;
  insuranceProvider: string;
  policyNumber: string;
  groupNumber?: string;
  eligibilityStatus: 'active' | 'inactive' | 'pending' | 'terminated';
  effectiveDate: string;
  terminationDate?: string;
  copay?: number;
  deductible?: number;
  deductibleMet?: number;
  outOfPocketMax?: number;
  outOfPocketMet?: number;
  coverageLimits: CoverageLimits[];
  preAuthRequired: boolean;
  verifiedAt: string;
  verificationSource: 'realtime' | 'batch' | 'manual';
  lastVerified: string;
}

export interface CoverageLimits {
  serviceType: string;
  annualLimit?: number;
  visitLimit?: number;
  remainingVisits?: number;
  coveragePercentage: number;
  notes?: string;
}

export interface PriorAuthorization {
  id: string;
  patientId: string;
  insuranceProvider: string;
  serviceRequested: string;
  procedureCodes: string[];
  diagnosisCodes: string[];
  status: 'pending' | 'approved' | 'denied' | 'expired';
  requestDate: string;
  approvalDate?: string;
  expirationDate?: string;
  authorizationNumber?: string;
  approvedUnits?: number;
  denialReason?: string;
  appealStatus?: 'none' | 'filed' | 'pending' | 'approved' | 'denied';
  priority: 'routine' | 'urgent' | 'emergency';
  workflowStage: 'intake' | 'clinical_review' | 'peer_review' | 'final_decision';
}

export interface Claim {
  id: string;
  claimNumber: string;
  patientId: string;
  providerId: string;
  insuranceProvider: string;
  serviceDate: string;
  submissionDate: string;
  claimType: 'professional' | 'institutional' | 'dental' | 'vision';
  totalCharges: number;
  allowedAmount?: number;
  paidAmount?: number;
  patientResponsibility?: number;
  status: ClaimStatus;
  clearinghouse: 'change_healthcare' | 'availity' | 'trizetto' | 'direct';
  transactionControlNumber?: string;
  electronicRemittance?: ERATData;
  denialCodes: string[];
  remarks: string[];
  appealHistory: ClaimAppeal[];
  resubmissionCount: number;
  lineItems: ClaimLineItem[];
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export type ClaimStatus = 
  | 'draft'
  | 'ready_to_submit'
  | 'submitted'
  | 'acknowledged'
  | 'accepted'
  | 'rejected'
  | 'paid'
  | 'partially_paid'
  | 'denied'
  | 'appeal_filed'
  | 'appeal_approved'
  | 'appeal_denied'
  | 'written_off';

export interface ClaimLineItem {
  id: string;
  serviceDate: string;
  procedureCode: string;
  modifier?: string;
  diagnosisPointer: number;
  chargeAmount: number;
  units: number;
  placeOfService: string;
  allowedAmount?: number;
  paidAmount?: number;
  adjustmentCodes: string[];
  remarkCodes: string[];
  status: 'pending' | 'paid' | 'denied' | 'adjusted';
}

export interface ERATData {
  id: string;
  claimId: string;
  remittanceNumber: string;
  paymentMethod: 'check' | 'eft' | 'virtual_card';
  paymentAmount: number;
  paymentDate: string;
  adjustments: ClaimAdjustment[];
  receivedAt: string;
}

export interface ClaimAdjustment {
  code: string;
  amount: number;
  description: string;
  category: 'contractual' | 'deductible' | 'copay' | 'coinsurance' | 'other';
}

export interface ClaimAppeal {
  id: string;
  claimId: string;
  appealLevel: 1 | 2 | 3;
  filedDate: string;
  reason: string;
  supportingDocuments: string[];
  status: 'filed' | 'under_review' | 'approved' | 'denied';
  responseDate?: string;
  outcome?: string;
  additionalPayment?: number;
  nextSteps?: string;
}

export interface RevenueAnalytics {
  id: string;
  reportDate: string;
  totalCharges: number;
  totalCollections: number;
  netCollectionRate: number;
  grossCollectionRate: number;
  daysInAR: number;
  denialRate: number;
  cleanClaimRate: number;
  costToCollect: number;
  payerMix: PayerPerformance[];
  procedurePerformance: ProcedureAnalytics[];
  providerPerformance: ProviderAnalytics[];
  revenueByService: ServiceRevenueAnalytics[];
}

export interface PayerPerformance {
  payerName: string;
  totalClaims: number;
  paidClaims: number;
  deniedClaims: number;
  averagePaymentTime: number;
  netCollectionRate: number;
  averageReimbursementRate: number;
  denialReasons: DenialAnalytics[];
}

export interface DenialAnalytics {
  code: string;
  description: string;
  count: number;
  totalAmount: number;
  appealsWon: number;
  appealsLost: number;
  preventable: boolean;
}

export interface ProcedureAnalytics {
  cptCode: string;
  description: string;
  volume: number;
  totalCharges: number;
  averageReimbursement: number;
  denialRate: number;
  profitability: number;
  trend: 'increasing' | 'decreasing' | 'stable';
}

export interface ProviderAnalytics {
  providerId: string;
  providerName: string;
  totalCharges: number;
  collections: number;
  averageChargePerVisit: number;
  codingAccuracy: number;
  denialRate: number;
  productivityScore: number;
}

export interface ServiceRevenueAnalytics {
  serviceCategory: string;
  revenue: number;
  volume: number;
  growthRate: number;
  marginPercentage: number;
  seasonalityFactor: number;
}

export interface AccountsReceivable {
  id: string;
  patientId: string;
  accountNumber: string;
  balance: number;
  originalBalance: number;
  lastPaymentDate?: string;
  lastPaymentAmount?: number;
  agingBucket: '0-30' | '31-60' | '61-90' | '91-120' | '120+';
  daysPastDue: number;
  collectionStatus: 'current' | 'follow_up' | 'collections' | 'legal' | 'write_off';
  paymentPlan?: PaymentPlan;
  collectionActions: CollectionAction[];
  financialClass: 'commercial' | 'medicare' | 'medicaid' | 'self_pay' | 'workers_comp';
  creditScore?: number;
  riskScore: number;
  estimatedCollectability: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentPlan {
  id: string;
  patientId: string;
  totalAmount: number;
  monthlyPayment: number;
  numberOfPayments: number;
  startDate: string;
  status: 'active' | 'completed' | 'defaulted' | 'cancelled';
  paymentHistory: PaymentPlanPayment[];
  automatedPayment: boolean;
  paymentMethodId?: string;
}

export interface PaymentPlanPayment {
  id: string;
  paymentPlanId: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'scheduled' | 'paid' | 'late' | 'failed';
  paymentMethod: string;
  transactionId?: string;
}

export interface CollectionAction {
  id: string;
  accountId: string;
  actionType: 'statement' | 'phone_call' | 'email' | 'letter' | 'collection_agency';
  actionDate: string;
  performedBy: string;
  outcome?: string;
  nextActionDate?: string;
  notes?: string;
  cost?: number;
  successful: boolean;
}

export interface PricingEstimate {
  id: string;
  patientId?: string;
  procedureCodes: string[];
  diagnosisCodes: string[];
  estimatedCharges: number;
  estimatedInsurancePayment: number;
  estimatedPatientResponsibility: number;
  deductibleApplied: number;
  copayAmount: number;
  coinsuranceAmount: number;
  outOfNetworkPenalty: number;
  priorAuthRequired: boolean;
  estimateAccuracy: number;
  validUntil: string;
  assumptions: string[];
  breakdown: PricingBreakdown[];
  createdAt: string;
}

export interface PricingBreakdown {
  service: string;
  cptCode: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  insuranceCoverage: number;
  patientPortion: number;
  notes?: string;
}

export interface FinancialAssistance {
  id: string;
  patientId: string;
  applicationDate: string;
  householdSize: number;
  annualIncome: number;
  povertyLevel: number;
  assetsValue: number;
  applicationStatus: 'pending' | 'approved' | 'denied' | 'expired';
  assistanceType: 'charity_care' | 'payment_plan' | 'discount' | 'medicaid_referral';
  approvedAmount?: number;
  discountPercentage?: number;
  expirationDate?: string;
  reviewDate?: string;
  supportingDocuments: string[];
  reviewNotes?: string;
  appealHistory: FinancialAssistanceAppeal[];
}

export interface FinancialAssistanceAppeal {
  id: string;
  applicationId: string;
  appealDate: string;
  reason: string;
  additionalDocuments: string[];
  status: 'pending' | 'approved' | 'denied';
  responseDate?: string;
  outcome?: string;
}

export interface ComplianceAlert {
  id: string;
  type: 'coding' | 'billing' | 'documentation' | 'fraud' | 'abuse';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  entity: string; // provider, claim, patient, etc.
  entityId: string;
  ruleViolated: string;
  recommendedAction: string;
  status: 'open' | 'investigating' | 'resolved' | 'false_positive';
  assignedTo?: string;
  dueDate?: string;
  createdAt: string;
  resolvedAt?: string;
  resolutionNotes?: string;
}

export interface AuditTrail {
  id: string;
  entityType: string;
  entityId: string;
  action: string;
  userId: string;
  userRole: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  changes: Record<string, any>;
  reason?: string;
  complianceRelevant: boolean;
}
