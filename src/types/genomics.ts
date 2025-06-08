
export interface GenomicProfile {
  id: string;
  patientId: string;
  processedAt: string;
  sequenceType?: string;
  sequenceData?: any;
  qualityMetrics: {
    overallQuality: number;
    coverage: number;
    mappingRate: number;
    errorRate: number;
    q30Percentage?: number;
    totalReads?: number;
  };
  variants?: Variant[];
  riskFactors?: RiskFactor[];
  pharmacogenomicProfile?: PharmacogenomicProfile;
  ancestryAnalysis?: AncestryAnalysis;
  carrierScreening?: CarrierScreening;
  somaticMutations?: SomaticMutation[];
  tumorMarkers?: TumorMarker[];
  methylationPatterns?: MethylationPattern[];
  copyNumberVariations?: CopyNumberVariation[];
  immuneResponseMarkers?: ImmuneResponseMarker[];
  metabolomicProfile?: MetabolomicProfile;
  proteomicProfile?: ProteomicProfile;
  transcriptomicProfile?: TranscriptomicProfile;
  epigeneticMarkers?: EpigeneticMarker[];
  microbiomeAnalysis?: MicrobiomeAnalysis;
  clinicalTrials?: ClinicalTrial[];
  researchStudies?: ResearchStudy[];
  privacySettings?: GenomicPrivacySettings;
  labIntegration?: LabIntegration;
  dataExport?: GenomicDataExport;
  familyHistory?: FamilyHistory;
  lifestyleFactors?: LifestyleFactors;
  environmentalExposures?: EnvironmentalExposures;
  createdAt: string;
  updatedAt: string;
}

export interface DiseasePredisposition {
  id: string;
  disease: string;
  riskScore: number;
  confidence: number;
  genes: string[];
  description: string;
}

export interface CarrierScreeningResult {
  id: string;
  diseaseName: string;
  carrierStatus: 'carrier' | 'non-carrier' | 'inconclusive';
  gene: string;
  variant: string;
  description: string;
}

export interface ExternalLabIntegration {
  id: string;
  provider: string;
  status: string;
  lastSync: string;
}

export interface GeneticVariant {
  id: string;
  gene: string;
  variant: string;
  significance: string;
}

export interface TargetedTherapy {
  id: string;
  therapy: string;
  indication: string;
  genes: string[];
  efficacy: number;
}

export interface Variant {
  id: string;
  gene: string;
  chromosome: string;
  position: number;
  ref: string;
  alt: string;
  rsId: string;
  alleleFrequency: number;
  zygosity: 'homozygous' | 'heterozygous';
  impact: 'high' | 'moderate' | 'low' | 'modifier';
  consequence: string;
  pathogenicity: 'pathogenic' | 'likely_pathogenic' | 'benign' | 'likely_benign' | 'uncertain_significance';
  clinicalSignificance?: string;
  populations: PopulationFrequency[];
  conservationScores: ConservationScore[];
  predictions: PredictionScores;
  annotations: string[];
  references: string[];
}

export interface RiskFactor {
  id: string;
  condition: string;
  gene: string;
  riskScore: number;
  oddsRatio: number;
  confidenceInterval: {
    lower: number;
    upper: number;
  };
  associatedGenes: string[];
  description: string;
  recommendations: string[];
  evidenceLevel: string;
  populations: PopulationRisk[];
  references: string[];
}

export interface PharmacogenomicProfile {
  id: string;
  drugResponses: DrugResponse[];
  geneVariants: GeneVariant[];
  enzymeActivity: EnzymeActivity[];
  metabolizerStatus: string;
  recommendations: string[];
  references: string[];
}

export interface AncestryAnalysis {
  id: string;
  populationGroups: PopulationGroup[];
  geographicOrigins: GeographicOrigin[];
  haplogroups: {
    maternal: string;
    paternal: string;
  };
  migrationPatterns: MigrationPattern[];
  neanderthalAdmixture: number;
  references: string[];
}

export interface CarrierScreening {
  id: string;
  diseases: CarrierDisease[];
  reportSummary: string;
  recommendations: string[];
  references: string[];
}

export interface SomaticMutation {
  id: string;
  gene: string;
  mutation: string;
  chromosome: string;
  position: number;
  ref: string;
  alt: string;
  effect: string;
  aminoAcidChange: string;
  alleleFrequency: number;
  tumorType: string;
  clinicalSignificance: string;
  drugResponse: string;
  references: string[];
}

export interface TumorMarker {
  id: string;
  markerName: string;
  value: number;
  unit: string;
  normalRange: {
    min: number;
    max: number;
  };
  interpretation: string;
  tumorType: string;
  clinicalSignificance: string;
  references: string[];
}

export interface MethylationPattern {
  id: string;
  gene: string;
  chromosome: string;
  position: number;
  methylationLevel: number;
  regionType: string;
  clinicalSignificance: string;
  references: string[];
}

export interface CopyNumberVariation {
  id: string;
  gene: string;
  chromosome: string;
  start: number;
  end: number;
  copyNumber: number;
  type: 'duplication' | 'deletion';
  clinicalSignificance: string;
  references: string[];
}

export interface ImmuneResponseMarker {
  id: string;
  markerName: string;
  value: number;
  unit: string;
  normalRange: {
    min: number;
    max: number;
  };
  cellType: string;
  clinicalSignificance: string;
  references: string[];
}

export interface MetabolomicProfile {
  id: string;
  metabolites: Metabolite[];
  pathways: Pathway[];
  diseaseAssociations: DiseaseAssociation[];
  recommendations: string[];
  references: string[];
}

export interface ProteomicProfile {
  id: string;
  proteins: Protein[];
  pathways: Pathway[];
  diseaseAssociations: DiseaseAssociation[];
  recommendations: string[];
  references: string[];
}

export interface TranscriptomicProfile {
  id: string;
  genes: GeneExpression[];
  pathways: Pathway[];
  diseaseAssociations: DiseaseAssociation[];
  recommendations: string[];
  references: string[];
}

export interface EpigeneticMarker {
  id: string;
  markerName: string;
  chromosome: string;
  position: number;
  value: number;
  cellType: string;
  clinicalSignificance: string;
  references: string[];
}

export interface MicrobiomeAnalysis {
  id: string;
  bacteria: Bacteria[];
  fungi: Fungi[];
  viruses: Virus[];
  gutHealthScore: number;
  recommendations: string[];
  references: string[];
}

export interface ClinicalTrial {
  id: string;
  nctId?: string;
  trialName: string;
  description: string;
  status: string;
  phase: string;
  conditions: string[];
  sponsor: string;
  location: string;
  contact: string;
  eligibilityCriteria: string[];
  url: string;
  references: string[];
}

export interface ResearchStudy {
  id: string;
  studyName: string;
  description: string;
  status: string;
  sponsor: string;
  location: string;
  contact: string;
  eligibilityCriteria: string[];
  url: string;
  references: string[];
}

export interface FamilyHistory {
  id: string;
  familyId: string;
  relationship: string;
  conditions: string[];
  ageOfOnset: number;
  geneticDataAvailable: boolean;
  notes: string;
}

export interface LifestyleFactors {
  id: string;
  diet: string;
  exercise: string;
  smoking: boolean;
  alcoholConsumption: string;
  sleepPatterns: string;
  stressLevels: string;
  environmentalExposures: string[];
  medications: string[];
  supplements: string[];
}

export interface EnvironmentalExposures {
  id: string;
  exposureType: string;
  level: number;
  unit: string;
  duration: string;
  frequency: string;
  location: string;
  mitigationStrategies: string[];
}

// Sub-interfaces
export interface PopulationFrequency {
  population: string;
  frequency: number;
}

export interface ConservationScore {
  algorithm: string;
  score: number;
}

export interface PredictionScores {
  sift: number;
  polyphen: number;
  cadd: number;
}

export interface PopulationRisk {
  population: string;
  riskScore: number;
}

export interface DrugResponse {
  medication: string;
  drugName?: string;
  gene: string;
  variant: string;
  enzyme?: string;
  metabolizerStatus: string;
  efficacyPrediction: string;
  expectedResponse?: string;
  adverseReactionRisk: string;
  dosageRecommendation?: string;
  mechanism?: string;
  clinicalRecommendation?: string;
  references: string[];
}

export interface GeneVariant {
  gene: string;
  variant: string;
  allele: string;
  function: string;
}

export interface EnzymeActivity {
  enzyme: string;
  activityLevel: number;
  unit: string;
}

export interface PopulationGroup {
  population: string;
  percentage: number;
}

export interface GeographicOrigin {
  region: string;
  percentage: number;
}

export interface MigrationPattern {
  region: string;
  timeframe: string;
  description: string;
}

export interface CarrierDisease {
  diseaseName: string;
  gene: string;
  carrierRisk: number;
  inheritancePattern: string;
  recommendations: string[];
}

export interface Metabolite {
  name: string;
  level: number;
  unit: string;
  normalRange: {
    min: number;
    max: number;
  };
  clinicalSignificance: string;
}

export interface Pathway {
  name: string;
  genes: string[];
  description: string;
}

export interface DiseaseAssociation {
  disease: string;
  genes: string[];
  riskScore: number;
}

export interface GeneExpression {
  gene: string;
  expressionLevel: number;
  unit: string;
  clinicalSignificance: string;
}

export interface Protein {
  name: string;
  level: number;
  unit: string;
  function: string;
  clinicalSignificance: string;
}

export interface Bacteria {
  name: string;
  abundance: number;
  role: string;
  healthImpact: string;
}

export interface Fungi {
  name: string;
  abundance: number;
  pathogenic: boolean;
}

export interface Virus {
  name: string;
  detected: boolean;
  strain?: string;
}

export interface FamilyHealthPlan {
  id: string;
  familyId: string;
  generations?: number;
  members: FamilyMember[];
  sharedConditions: string[];
  geneticCounselingRecommended: boolean;
  lifestyleRecommendations: string[];
  createdAt: string;
  updatedAt: string;
}

export interface FamilyMember {
  id: string;
  patientId: string;
  relationship: string;
  conditions: string[];
  geneticDataAvailable: boolean;
  notes: string;
}

export interface ResearchParticipation {
  id: string;
  studyId: string;
  studies?: any[];
  patientId: string;
  consentDate: string;
  withdrawalDate?: string;
  dataSharingAgreement: string;
  studyData: any;
  notes: string;
}

// Lab Integration Types
export interface LabIntegration {
  id: string;
  provider: '23andme' | 'ancestrydna' | 'labcorp' | 'quest' | 'helix' | 'dante_labs';
  status: 'connected' | 'pending' | 'failed' | 'expired';
  lastSync: string;
  dataTypes: string[];
  apiVersion: string;
  credentials?: {
    accessToken?: string;
    refreshToken?: string;
    apiKey?: string;
    clientId?: string;
  };
  syncSettings: {
    autoSync: boolean;
    frequency: 'daily' | 'weekly' | 'monthly';
    lastSyncDate?: string;
    nextSyncDate?: string;
  };
  dataMapping: {
    sourceField: string;
    targetField: string;
    transformFunction?: string;
  }[];
  qualityChecks: {
    passed: boolean;
    issues: string[];
    confidence: number;
  };
  privacy: {
    dataRetention: number; // days
    shareWithResearch: boolean;
    anonymizeData: boolean;
    consentLevel: 'basic' | 'research' | 'commercial';
  };
}

// Privacy and Security Types
export interface GenomicPrivacySettings {
  id: string;
  patientId: string;
  encryptionLevel: 'standard' | 'high' | 'quantum';
  dataLocalization: 'local' | 'cloud' | 'hybrid';
  accessControls: {
    doctorAccess: boolean;
    researchAccess: boolean;
    familyAccess: boolean;
    emergencyAccess: boolean;
  };
  consentSettings: {
    diagnosticUse: boolean;
    researchParticipation: boolean;
    commercialUse: boolean;
    dataSharing: boolean;
    internationTransfer: boolean;
  };
  retentionPolicy: {
    retentionPeriod: number; // years
    automaticDeletion: boolean;
    backupRetention: number; // years
  };
  auditLog: {
    accessDate: string;
    accessType: 'view' | 'download' | 'share' | 'delete';
    userId: string;
    purpose: string;
    approved: boolean;
  }[];
  rightToPortability: {
    exportFormats: string[];
    lastExport?: string;
    exportHistory: string[];
  };
  gdprCompliance: {
    lawfulBasis: string;
    dataSubjectRights: string[];
    processingPurposes: string[];
    thirdPartySharing: boolean;
  };
}

export interface GenomicDataExport {
  id: string;
  format: 'vcf' | 'json' | 'csv' | 'pdf' | 'fhir';
  includeRawData: boolean;
  includeInterpretations: boolean;
  includeReports: boolean;
  anonymizeData: boolean;
  passwordProtected: boolean;
  expirationDate: string;
  downloadUrl?: string;
  createdAt: string;
  downloadedAt?: string;
  downloadCount: number;
}
