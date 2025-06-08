
export interface HealthcareProvider {
  id: string;
  name: string;
  type: 'hospital' | 'clinic' | 'specialist' | 'research_center';
  tier: 'premium' | 'standard' | 'basic';
  location: {
    country: string;
    city: string;
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  specialties: string[];
  accreditations: Accreditation[];
  ratings: ProviderRatings;
  languages: string[];
  partnerships: Partnership[];
  pricing: PricingStructure;
  availability: ProviderAvailability;
  certifications: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PremiumService {
  id: string;
  name: string;
  category: 'second_opinion' | 'concierge' | 'executive_health' | 'preventive_care' | 'wellness_coaching' | 'mental_health' | 'aesthetic';
  description: string;
  providerId: string;
  pricing: ServicePricing;
  inclusions: string[];
  duration: string;
  deliveryMethod: 'in_person' | 'virtual' | 'hybrid';
  languages: string[];
  prerequisites?: string[];
  isActive: boolean;
}

export interface GlobalCoordination {
  id: string;
  patientId: string;
  coordinatorId: string;
  services: CoordinatedService[];
  carePathway: CarePathway;
  insuranceNavigation: InsuranceSupport;
  languageSupport: LanguageSupport;
  culturalConsiderations: CulturalSupport;
  status: 'planning' | 'active' | 'completed' | 'cancelled';
  timeline: CareTimeline;
  budget: BudgetManagement;
  createdAt: string;
  updatedAt: string;
}

export interface QualityAssurance {
  id: string;
  providerId: string;
  credentialingStatus: CredentialingStatus;
  outcomeMetrics: OutcomeMetrics;
  patientSatisfaction: SatisfactionMetrics;
  costTransparency: CostMetrics;
  valueBasedMetrics: ValueMetrics;
  continuousImprovement: ImprovementPlan;
  accreditationStatus: AccreditationStatus;
  lastAudit: string;
  nextAudit: string;
}

export interface FinancialService {
  id: string;
  type: 'financing' | 'insurance_assistance' | 'hsa_integration' | 'international_payment' | 'currency_exchange' | 'travel_insurance' | 'expense_tracking';
  providerId: string;
  description: string;
  terms: FinancialTerms;
  eligibility: EligibilityRequirements;
  supportedCurrencies: string[];
  processingTime: string;
  fees: FeeStructure;
  isActive: boolean;
}

export interface MedicalTourism {
  id: string;
  destination: TourismDestination;
  packages: TourismPackage[];
  travelSupport: TravelSupport;
  accommodationOptions: AccommodationOption[];
  localSupport: LocalSupport;
  followUpCare: FollowUpPlan;
  qualityAssurance: TourismQuality;
  pricing: TourismPricing;
  testimonials: PatientTestimonial[];
}

// Sub-interfaces
export interface Accreditation {
  name: string;
  body: string;
  validUntil: string;
  score?: number;
}

export interface ProviderRatings {
  overall: number;
  clinical: number;
  service: number;
  facilities: number;
  communication: number;
  totalReviews: number;
}

export interface Partnership {
  partnerName: string;
  type: 'telemedicine' | 'research' | 'technology' | 'insurance';
  description: string;
  startDate: string;
}

export interface PricingStructure {
  currency: string;
  consultationFee: number;
  procedureFees: Record<string, number>;
  packageDeals: ServicePackage[];
  insuranceAccepted: string[];
  paymentMethods: string[];
}

export interface ServicePackage {
  name: string;
  price: number;
  inclusions: string[];
  duration: string;
}

export interface ProviderAvailability {
  timezone: string;
  workingHours: WorkingHours;
  emergencyAvailability: boolean;
  bookingLeadTime: string;
  cancellationPolicy: string;
}

export interface WorkingHours {
  monday: TimeSlot[];
  tuesday: TimeSlot[];
  wednesday: TimeSlot[];
  thursday: TimeSlot[];
  friday: TimeSlot[];
  saturday: TimeSlot[];
  sunday: TimeSlot[];
}

export interface TimeSlot {
  start: string;
  end: string;
}

export interface ServicePricing {
  currency: string;
  basePrice: number;
  additionalFees: Record<string, number>;
  packages: ServicePackage[];
  discounts: Discount[];
}

export interface Discount {
  type: 'early_bird' | 'loyalty' | 'volume' | 'insurance';
  percentage: number;
  conditions: string[];
}

export interface CoordinatedService {
  serviceId: string;
  providerId: string;
  scheduledDate: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  priority: 'high' | 'medium' | 'low';
  dependencies: string[];
}

export interface CarePathway {
  steps: CareStep[];
  criticalPath: string[];
  alternatives: AlternativePath[];
  milestones: Milestone[];
}

export interface CareStep {
  id: string;
  name: string;
  description: string;
  providerId: string;
  estimatedDuration: string;
  prerequisites: string[];
  outcomes: string[];
}

export interface AlternativePath {
  condition: string;
  steps: string[];
  rationale: string;
}

export interface Milestone {
  name: string;
  targetDate: string;
  criteria: string[];
  importance: 'critical' | 'important' | 'nice-to-have';
}

export interface InsuranceSupport {
  navigatorId: string;
  supportedInsurers: string[];
  preAuthServices: string[];
  claimsAssistance: boolean;
  appealSupport: boolean;
  costEstimates: CostEstimate[];
}

export interface CostEstimate {
  serviceId: string;
  estimatedCost: number;
  insuranceCoverage: number;
  patientResponsibility: number;
  confidence: number;
}

export interface LanguageSupport {
  interpreterId?: string;
  languages: string[];
  methods: ('in_person' | 'video' | 'phone')[];
  availability: string;
  certifiedInterpreters: boolean;
}

export interface CulturalSupport {
  advisorId?: string;
  culturalConsiderations: string[];
  dietaryRequirements: string[];
  religiousAccommodations: string[];
  customPractices: string[];
}

export interface CareTimeline {
  startDate: string;
  endDate: string;
  milestones: TimelineMilestone[];
  criticalDates: CriticalDate[];
  flexibility: string;
}

export interface TimelineMilestone {
  date: string;
  event: string;
  importance: 'critical' | 'important' | 'informational';
  status: 'pending' | 'completed' | 'delayed';
}

export interface CriticalDate {
  date: string;
  description: string;
  consequence: string;
  mitigation: string;
}

export interface BudgetManagement {
  totalBudget: number;
  currency: string;
  allocations: BudgetAllocation[];
  contingency: number;
  tracking: ExpenseTracking;
  approvals: BudgetApproval[];
}

export interface BudgetAllocation {
  category: string;
  allocated: number;
  spent: number;
  remaining: number;
}

export interface ExpenseTracking {
  totalSpent: number;
  byCategory: Record<string, number>;
  byProvider: Record<string, number>;
  projectedTotal: number;
}

export interface BudgetApproval {
  amount: number;
  reason: string;
  approvedBy: string;
  date: string;
}

export interface CredentialingStatus {
  primaryCredentials: Credential[];
  boardCertifications: BoardCertification[];
  licenses: MedicalLicense[];
  malpracticeHistory: MalpracticeRecord[];
  backgroundCheck: BackgroundCheck;
  lastVerification: string;
  nextVerification: string;
}

export interface Credential {
  type: string;
  institution: string;
  dateObtained: string;
  validUntil?: string;
  verified: boolean;
}

export interface BoardCertification {
  board: string;
  specialty: string;
  dateObtained: string;
  validUntil: string;
  maintenanceRequirements: string[];
}

export interface MedicalLicense {
  jurisdiction: string;
  licenseNumber: string;
  dateIssued: string;
  validUntil: string;
  restrictions?: string[];
}

export interface MalpracticeRecord {
  caseId: string;
  year: string;
  outcome: string;
  amount?: number;
  description: string;
}

export interface BackgroundCheck {
  criminalHistory: boolean;
  educationVerified: boolean;
  employmentVerified: boolean;
  referencesChecked: boolean;
  dateCompleted: string;
}

export interface OutcomeMetrics {
  clinicalOutcomes: ClinicalOutcome[];
  readmissionRates: number;
  complicationRates: number;
  mortalityRates: number;
  recoveryTimes: RecoveryMetric[];
  benchmarkComparisons: BenchmarkData[];
}

export interface ClinicalOutcome {
  procedure: string;
  successRate: number;
  averageRecoveryTime: number;
  complicationRate: number;
  patientSatisfaction: number;
  sampleSize: number;
}

export interface RecoveryMetric {
  condition: string;
  averageDays: number;
  percentile25: number;
  percentile75: number;
  factorsInfluencing: string[];
}

export interface BenchmarkData {
  metric: string;
  providerValue: number;
  industryAverage: number;
  percentileRank: number;
  trend: 'improving' | 'stable' | 'declining';
}

export interface SatisfactionMetrics {
  overallSatisfaction: number;
  communicationRating: number;
  timeliness: number;
  facilities: number;
  likelihoodTorecommend: number;
  responseRate: number;
  totalResponses: number;
  trends: SatisfactionTrend[];
}

export interface SatisfactionTrend {
  period: string;
  rating: number;
  change: number;
  significantFeedback: string[];
}

export interface CostMetrics {
  procedureCosts: ProcedureCost[];
  bundlePackages: BundlePackage[];
  financialAssistance: AssistanceProgram[];
  insuranceAcceptance: InsuranceAcceptance[];
  priceComparisons: PriceComparison[];
  transparencyScore: number;
}

export interface ProcedureCost {
  procedure: string;
  averageCost: number;
  range: {
    minimum: number;
    maximum: number;
  };
  factorsAffectingCost: string[];
  inclusions: string[];
  exclusions: string[];
}

export interface BundlePackage {
  name: string;
  procedures: string[];
  totalCost: number;
  savings: number;
  validUntil: string;
}

export interface AssistanceProgram {
  name: string;
  eligibilityRequirements: string[];
  maxDiscount: number;
  applicationProcess: string;
  processingTime: string;
}

export interface InsuranceAcceptance {
  insurerName: string;
  networkStatus: 'in-network' | 'out-of-network' | 'preferred';
  coveragePercentage: number;
  preAuthRequired: boolean;
  estimatedPatientCost: number;
}

export interface PriceComparison {
  procedure: string;
  competitors: CompetitorPrice[];
  marketPosition: 'below_average' | 'average' | 'above_average' | 'premium';
  valueProposition: string[];
}

export interface CompetitorPrice {
  providerName: string;
  price: number;
  qualityRating: number;
  distance: number;
}

export interface ValueMetrics {
  costEffectiveness: number;
  qualityAdjustedOutcomes: number;
  patientReportedOutcomes: PatientOutcome[];
  costPerQualityPoint: number;
  valueBasedContracts: ValueContract[];
  riskAdjustments: RiskAdjustment[];
}

export interface PatientOutcome {
  metric: string;
  baseline: number;
  postTreatment: number;
  improvement: number;
  significance: number;
}

export interface ValueContract {
  payerName: string;
  contractType: string;
  qualityTargets: QualityTarget[];
  financialTerms: ContractTerms;
  performanceToDate: PerformanceData;
}

export interface QualityTarget {
  metric: string;
  target: number;
  current: number;
  weight: number;
}

export interface ContractTerms {
  basePayment: number;
  bonusStructure: BonusStructure[];
  penaltyStructure: PenaltyStructure[];
  riskSharing: number;
}

export interface BonusStructure {
  trigger: string;
  amount: number;
  maxBonus: number;
}

export interface PenaltyStructure {
  trigger: string;
  amount: number;
  maxPenalty: number;
}

export interface PerformanceData {
  metricsAchieved: number;
  bonusesEarned: number;
  penaltiesIncurred: number;
  netAdjustment: number;
}

export interface RiskAdjustment {
  factor: string;
  coefficient: number;
  patientPopulation: string;
  justification: string;
}

export interface ImprovementPlan {
  initiatives: ImprovementInitiative[];
  timeline: string;
  responsibleParties: string[];
  budget: number;
  expectedOutcomes: string[];
  measurementPlan: MeasurementPlan;
}

export interface ImprovementInitiative {
  name: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  startDate: string;
  endDate: string;
  budget: number;
  expectedImpact: string;
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold';
}

export interface MeasurementPlan {
  metrics: string[];
  measurementFrequency: string;
  reportingSchedule: string;
  stakeholders: string[];
}

export interface AccreditationStatus {
  currentAccreditations: Accreditation[];
  pendingApplications: PendingAccreditation[];
  expiringAccreditations: ExpiringAccreditation[];
  accreditationHistory: AccreditationHistory[];
}

export interface PendingAccreditation {
  name: string;
  body: string;
  applicationDate: string;
  expectedDecision: string;
  status: string;
}

export interface ExpiringAccreditation {
  name: string;
  body: string;
  expirationDate: string;
  renewalStatus: string;
  actionRequired: string[];
}

export interface AccreditationHistory {
  name: string;
  body: string;
  dateObtained: string;
  dateExpired: string;
  reason: string;
}

export interface FinancialTerms {
  interestRate?: number;
  repaymentPeriod?: string;
  minimumPayment?: number;
  fees: Record<string, number>;
  collateralRequired?: boolean;
  creditRequirements?: string[];
}

export interface EligibilityRequirements {
  minimumIncome?: number;
  maximumIncome?: number;
  creditScore?: number;
  employment?: string[];
  residency?: string[];
  other?: string[];
}

export interface FeeStructure {
  processingFee: number;
  transactionFee: number;
  currencyConversionFee: number;
  expediteFee?: number;
  cancelationFee?: number;
}

export interface TourismDestination {
  country: string;
  city: string;
  medicalDistrict?: string;
  description: string;
  advantages: string[];
  considerations: string[];
  entryRequirements: EntryRequirement[];
}

export interface EntryRequirement {
  type: 'visa' | 'vaccination' | 'medical_clearance' | 'insurance';
  description: string;
  processingTime: string;
  cost?: number;
}

export interface TourismPackage {
  id: string;
  name: string;
  description: string;
  duration: string;
  inclusions: PackageInclusion[];
  pricing: TourismPricing;
  eligibility: string[];
}

export interface PackageInclusion {
  category: 'medical' | 'accommodation' | 'transportation' | 'meals' | 'activities';
  item: string;
  description: string;
  optional: boolean;
}

export interface TravelSupport {
  visaAssistance: boolean;
  flightBooking: boolean;
  airportTransfer: boolean;
  localTransportation: boolean;
  travelInsurance: boolean;
  emergencySupport: boolean;
  companionSupport: boolean;
}

export interface AccommodationOption {
  type: 'hospital_room' | 'recovery_facility' | 'hotel' | 'apartment' | 'family_housing';
  name: string;
  description: string;
  amenities: string[];
  proximityToHospital: string;
  pricing: AccommodationPricing;
  availability: string;
}

export interface AccommodationPricing {
  currency: string;
  pricePerNight: number;
  minimumStay: number;
  discounts: Discount[];
}

export interface LocalSupport {
  coordinatorId: string;
  languageSupport: LanguageSupport;
  culturalLiaison: boolean;
  emergencyContacts: EmergencyContact[];
  localServicesGuide: LocalService[];
}

export interface EmergencyContact {
  name: string;
  role: string;
  phone: string;
  email: string;
  availability: string;
}

export interface LocalService {
  category: 'pharmacy' | 'grocery' | 'transportation' | 'entertainment' | 'religious';
  name: string;
  address: string;
  distance: string;
  description: string;
}

export interface FollowUpPlan {
  localFollowUp: FollowUpProvider[];
  remoteMonitoring: boolean;
  telemedicineSupport: boolean;
  homeCountryIntegration: boolean;
  emergencyProtocol: string;
  duration: string;
}

export interface FollowUpProvider {
  name: string;
  specialty: string;
  location: string;
  partnership: boolean;
  credentials: string[];
}

export interface TourismQuality {
  hospitalAccreditation: string[];
  physicianCredentials: string[];
  outcomeStatistics: OutcomeMetrics;
  patientTestimonials: PatientTestimonial[];
  thirdPartyValidation: string[];
}

export interface TourismPricing {
  currency: string;
  medicalCosts: number;
  accommodationCosts: number;
  travelCosts: number;
  supportServicesCosts: number;
  totalPackageCost: number;
  potentialSavings: number;
}

export interface PatientTestimonial {
  patientId: string;
  treatmentType: string;
  rating: number;
  testimonial: string;
  outcome: string;
  date: string;
  verified: boolean;
}
