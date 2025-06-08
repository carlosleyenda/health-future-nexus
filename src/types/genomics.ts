
export interface GenomicProfile {
  id: string;
  patientId: string;
  sequenceType: SequenceType;
  sequenceData: GenomeSequence;
  pharmacogenomics: PharmacogenomicProfile;
  diseasePredisposition: DiseasePredisposition[];
  ancestry: AncestryAnalysis;
  carrierScreening: CarrierScreeningResult[];
  somaticMutations: SomaticMutation[];
  epigeneticMarkers: EpigeneticMarker[];
  qualityMetrics: SequenceQualityMetrics;
  processingDate: string;
  labProvider: string;
  consentStatus: ConsentStatus;
  privacy: PrivacySettings;
}

export type SequenceType = 'whole_genome' | 'whole_exome' | 'targeted_panel' | 'pharmacogenomic' | 'ancestry';

export interface GenomeSequence {
  chromosomes: ChromosomeData[];
  variants: GeneticVariant[];
  coverage: CoverageData;
  qualityScores: QualityScore[];
  rawDataUrl?: string;
  vcfFileUrl?: string;
}

export interface ChromosomeData {
  chromosome: string;
  length: number;
  variants: GeneticVariant[];
  coverage: number;
}

export interface GeneticVariant {
  id: string;
  chromosome: string;
  position: number;
  refAllele: string;
  altAllele: string;
  genotype: string;
  quality: number;
  depth: number;
  frequency: number;
  dbsnpId?: string;
  clinvarId?: string;
  consequence: VariantConsequence;
  geneSymbol?: string;
  transcript?: string;
  proteinChange?: string;
  pathogenicity: PathogenicityPrediction;
}

export interface VariantConsequence {
  type: ConsequenceType;
  severity: SeverityLevel;
  description: string;
  impact: ImpactLevel;
}

export type ConsequenceType = 
  | 'missense'
  | 'nonsense'
  | 'frameshift'
  | 'splice_site'
  | 'synonymous'
  | 'intronic'
  | 'regulatory'
  | 'intergenic';

export type SeverityLevel = 'benign' | 'likely_benign' | 'uncertain' | 'likely_pathogenic' | 'pathogenic';
export type ImpactLevel = 'low' | 'moderate' | 'high' | 'critical';

export interface PathogenicityPrediction {
  sift: number;
  polyphen: number;
  cadd: number;
  clinvarSignificance?: string;
  acmgClassification?: string;
  confidence: number;
}

export interface PharmacogenomicProfile {
  metabolizerStatus: MetabolizerStatus;
  drugResponses: DrugResponse[];
  adverseReactions: AdverseReactionRisk[];
  dosageRecommendations: DosageRecommendation[];
  cyp450Variants: CYP450Variant[];
  hlaAlleles: HLAAllele[];
}

export interface MetabolizerStatus {
  cyp2d6: MetabolizerType;
  cyp2c19: MetabolizerType;
  cyp2c9: MetabolizerType;
  cyp3a4: MetabolizerType;
  cyp1a2: MetabolizerType;
}

export type MetabolizerType = 'poor' | 'intermediate' | 'normal' | 'rapid' | 'ultrarapid';

export interface DrugResponse {
  drugName: string;
  expectedResponse: ResponseType;
  confidence: number;
  mechanism: string;
  evidence: string[];
  clinicalRecommendation: string;
  alternativeDrugs: string[];
  monitoring: string[];
}

export type ResponseType = 'poor' | 'reduced' | 'normal' | 'increased' | 'toxic';

export interface AdverseReactionRisk {
  drugName: string;
  reactionType: string;
  riskLevel: RiskLevel;
  probability: number;
  severity: SeverityLevel;
  mechanism: string;
  preventionStrategies: string[];
}

export type RiskLevel = 'very_low' | 'low' | 'moderate' | 'high' | 'very_high';

export interface DosageRecommendation {
  drugName: string;
  recommendedDose: string;
  adjustmentReason: string;
  monitoringRequired: boolean;
  titrationGuidance: string;
  maxDose?: string;
  contraindications: string[];
}

export interface CYP450Variant {
  gene: string;
  allele: string;
  phenotype: string;
  functionality: string;
  frequency: number;
}

export interface HLAAllele {
  allele: string;
  drugAssociations: string[];
  riskLevel: RiskLevel;
}

export interface DiseasePredisposition {
  condition: string;
  riskScore: number;
  relativeRisk: number;
  populationFrequency: number;
  confidence: number;
  associatedVariants: GeneticVariant[];
  evidenceLevel: EvidenceLevel;
  riskFactors: RiskFactor[];
  recommendations: string[];
  screeningGuidelines: ScreeningGuideline[];
}

export type EvidenceLevel = 'limited' | 'moderate' | 'strong' | 'definitive';

export interface RiskFactor {
  factor: string;
  contribution: number;
  modifiable: boolean;
  interventions: string[];
}

export interface ScreeningGuideline {
  test: string;
  frequency: string;
  startAge: number;
  endAge?: number;
  indication: string;
}

export interface AncestryAnalysis {
  populations: PopulationComponent[];
  migrationPaths: MigrationPath[];
  haplogroups: Haplogroup[];
  medicalRelevance: MedicalAncestryInsight[];
}

export interface PopulationComponent {
  population: string;
  percentage: number;
  confidence: number;
  region: string;
  medicalImplications: string[];
}

export interface MigrationPath {
  timeframe: string;
  regions: string[];
  confidence: number;
}

export interface Haplogroup {
  type: 'maternal' | 'paternal';
  haplogroup: string;
  description: string;
  frequency: number;
  medicalAssociations: string[];
}

export interface MedicalAncestryInsight {
  condition: string;
  populationRisk: number;
  ancestryContribution: number;
  recommendations: string[];
}

export interface CarrierScreeningResult {
  condition: string;
  carrierStatus: CarrierStatus;
  variants: GeneticVariant[];
  reproductiveRisk: ReproductiveRisk;
  counselingRecommended: boolean;
  partnerScreeningAdvised: boolean;
}

export type CarrierStatus = 'carrier' | 'non_carrier' | 'affected' | 'unknown';

export interface ReproductiveRisk {
  affectedChildRisk: number;
  carrierChildRisk: number;
  recommendedTesting: string[];
  reproductiveOptions: string[];
}

export interface SomaticMutation {
  tumorType?: string;
  mutation: GeneticVariant;
  therapeuticImplications: TherapeuticImplication[];
  prognosticValue: PrognosticValue;
  targetedTherapies: TargetedTherapy[];
}

export interface TherapeuticImplication {
  therapy: string;
  response: ResponseType;
  evidence: string;
  approvalStatus: string;
}

export interface PrognosticValue {
  outcome: string;
  impact: ImpactLevel;
  survival: SurvivalData;
}

export interface SurvivalData {
  medianSurvival: number;
  fiveYearSurvival: number;
  confidence: number;
}

export interface TargetedTherapy {
  drugName: string;
  targetGene: string;
  mechanism: string;
  approvalStatus: string;
  clinicalTrials: ClinicalTrial[];
}

export interface ClinicalTrial {
  nctId: string;
  title: string;
  phase: string;
  status: string;
  eligibilityCriteria: string[];
  locations: string[];
}

export interface EpigeneticMarker {
  type: EpigeneticType;
  gene: string;
  position: number;
  methylationLevel: number;
  expression: ExpressionLevel;
  clinicalSignificance: string;
}

export type EpigeneticType = 'dna_methylation' | 'histone_modification' | 'chromatin_accessibility';
export type ExpressionLevel = 'silenced' | 'reduced' | 'normal' | 'increased' | 'overexpressed';

export interface SequenceQualityMetrics {
  totalReads: number;
  mappedReads: number;
  averageCoverage: number;
  coverageUniformity: number;
  q30Percentage: number;
  duplicateRate: number;
  errorRate: number;
  qualityPassed: boolean;
}

export interface CoverageData {
  averageCoverage: number;
  medianCoverage: number;
  percentageCovered: number;
  lowCoverageRegions: CoverageRegion[];
}

export interface CoverageRegion {
  chromosome: string;
  start: number;
  end: number;
  coverage: number;
  geneSymbol?: string;
}

export interface QualityScore {
  position: number;
  quality: number;
  confidence: number;
}

export interface ConsentStatus {
  clinicalUse: boolean;
  research: boolean;
  dataSharing: boolean;
  commercialUse: boolean;
  familySharing: boolean;
  consentDate: string;
  withdrawalDate?: string;
  granularPermissions: GranularPermission[];
}

export interface GranularPermission {
  category: string;
  permitted: boolean;
  restrictions: string[];
}

export interface PrivacySettings {
  encryption: EncryptionSettings;
  accessControls: AccessControl[];
  auditLog: AuditEntry[];
  dataRetention: DataRetentionPolicy;
  anonymization: AnonymizationSettings;
  portability: DataPortabilitySettings;
}

export interface EncryptionSettings {
  algorithm: string;
  keyId: string;
  encryptedAt: string;
  integrityHash: string;
}

export interface AccessControl {
  userId: string;
  role: string;
  permissions: Permission[];
  accessLevel: AccessLevel;
  expiresAt?: string;
}

export type Permission = 'read' | 'write' | 'delete' | 'share' | 'export';
export type AccessLevel = 'none' | 'limited' | 'standard' | 'full' | 'admin';

export interface AuditEntry {
  id: string;
  userId: string;
  action: AuditAction;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  details: Record<string, any>;
}

export type AuditAction = 'access' | 'view' | 'download' | 'share' | 'modify' | 'delete' | 'consent_change';

export interface DataRetentionPolicy {
  retentionPeriod: number; // years
  autoDeleteEnabled: boolean;
  backupRetention: number; // years
  archivalDate?: string;
}

export interface AnonymizationSettings {
  method: AnonymizationMethod;
  kValue: number;
  lDiversity: number;
  tCloseness: number;
  appliedAt?: string;
}

export type AnonymizationMethod = 'k_anonymity' | 'l_diversity' | 't_closeness' | 'differential_privacy';

export interface DataPortabilitySettings {
  formats: ExportFormat[];
  includeRawData: boolean;
  includeAnalysis: boolean;
  encryptExport: boolean;
}

export type ExportFormat = 'vcf' | 'json' | 'xml' | 'csv' | 'fhir' | 'hl7';

// Family Health Planning Types
export interface FamilyHealthPlan {
  id: string;
  familyId: string;
  generations: FamilyGeneration[];
  riskAssessment: FamilyRiskAssessment;
  reproductiveGuidance: ReproductiveGuidance;
  pediatricScreening: PediatricScreeningPlan;
  geneticCounseling: GeneticCounselingPlan;
  coordination: TestingCoordination;
}

export interface FamilyGeneration {
  generation: number;
  members: FamilyMember[];
  sharedRisks: string[];
  recommendedActions: string[];
}

export interface FamilyMember {
  id: string;
  relationship: string;
  age: number;
  genomicProfile?: GenomicProfile;
  healthStatus: HealthStatus;
  riskFactors: RiskFactor[];
}

export interface HealthStatus {
  conditions: string[];
  medications: string[];
  lifestyle: LifestyleFactors;
}

export interface LifestyleFactors {
  smoking: boolean;
  alcohol: string;
  exercise: string;
  diet: string;
  stress: string;
}

export interface FamilyRiskAssessment {
  heritableConditions: HeritableCondition[];
  familyHistory: FamilyHistoryAnalysis;
  penetrance: PenetranceAnalysis;
  recommendations: FamilyRecommendation[];
}

export interface HeritableCondition {
  condition: string;
  inheritancePattern: InheritancePattern;
  familyRisk: number;
  population

export interface GeneticCounselingPlan {
  sessions: CounselingSession[];
  materials: EducationalMaterial[];
  followUpSchedule: FollowUpSchedule[];
}

export interface CounselingSession {
  type: SessionType;
  duration: number;
  topics: string[];
  scheduledDate?: string;
  provider: string;
}

export type SessionType = 'pre_test' | 'post_test' | 'family_planning' | 'results_disclosure' | 'follow_up';

// Research Integration Types
export interface ResearchParticipation {
  id: string;
  patientId: string;
  studies: ResearchStudy[];
  dataContributions: DataContribution[];
  biobank: BiobankParticipation;
  outcomes: ResearchOutcome[];
  consent: ResearchConsent;
}

export interface ResearchStudy {
  studyId: string;
  title: string;
  type: StudyType;
  phase?: string;
  eligibilityCriteria: string[];
  participationLevel: ParticipationLevel;
  dataShared: string[];
  compensation?: string;
}

export type StudyType = 'genomic' | 'clinical_trial' | 'observational' | 'population' | 'rare_disease';
export type ParticipationLevel = 'data_only' | 'biosamples' | 'follow_up' | 'intervention';

export interface DataContribution {
  studyId: string;
  dataTypes: string[];
  contributionDate: string;
  anonymized: boolean;
  value: ResearchValue;
}

export interface ResearchValue {
  scientificImpact: number;
  populationBenefit: string[];
  personalBenefit: string[];
}

export interface BiobankParticipation {
  biobankId: string;
  samplesStored: BiobankSample[];
  accessPolicy: string;
  storageConsent: boolean;
  futureUseConsent: boolean;
}

export interface BiobankSample {
  sampleId: string;
  type: SampleType;
  collectionDate: string;
  storageLocation: string;
  quality: SampleQuality;
}

export type SampleType = 'blood' | 'saliva' | 'tissue' | 'urine' | 'dna' | 'rna' | 'protein';

export interface SampleQuality {
  integrity: number;
  purity: number;
  concentration: number;
  suitableFor: string[];
}

export interface ResearchOutcome {
  studyId: string;
  findings: ResearchFinding[];
  publications: Publication[];
  clinicalRelevance: string[];
}

export interface ResearchFinding {
  discovery: string;
  relevance: RelevanceLevel;
  impact: ImpactLevel;
  actionable: boolean;
}

export type RelevanceLevel = 'personal' | 'family' | 'population' | 'global';

export interface Publication {
  title: string;
  journal: string;
  doi: string;
  publicationDate: string;
  contribution: string;
}

export interface ResearchConsent {
  dataSharing: boolean;
  commercialUse: boolean;
  internationalTransfer: boolean;
  futureStudies: boolean;
  recontact: boolean;
  resultsReturn: boolean;
}

// API Integration Types
export interface ExternalLabIntegration {
  provider: LabProvider;
  apiEndpoint: string;
  authentication: LabAuthentication;
  dataMapping: LabDataMapping;
  qualityControls: QualityControl[];
}

export type LabProvider = 'labcorp' | 'quest' | '23andme' | 'ancestry' | 'color' | 'invitae' | 'myriad';

export interface LabAuthentication {
  method: AuthMethod;
  credentials: AuthCredentials;
  tokenExpiry?: string;
}

export type AuthMethod = 'oauth2' | 'api_key' | 'jwt' | 'mtls';

export interface AuthCredentials {
  clientId?: string;
  clientSecret?: string;
  apiKey?: string;
  token?: string;
}

export interface LabDataMapping {
  variantFormat: string;
  referenceGenome: string;
  qualityThresholds: QualityThreshold[];
  fieldMappings: FieldMapping[];
}

export interface QualityThreshold {
  metric: string;
  minimumValue: number;
  action: string;
}

export interface FieldMapping {
  sourceField: string;
  targetField: string;
  transformation?: string;
}

export interface QualityControl {
  test: string;
  passed: boolean;
  value: number;
  threshold: number;
  notes?: string;
}
