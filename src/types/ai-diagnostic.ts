
export interface AIModel {
  id: string;
  name: string;
  type: 'nlp' | 'computer_vision' | 'predictive' | 'multimodal';
  specialty: string[];
  version: string;
  accuracy: number;
  trainingData: {
    size: number;
    sources: string[];
    lastUpdated: string;
  };
  clinicalValidation: {
    status: 'pending' | 'approved' | 'rejected';
    validationStudy?: string;
    evidenceLevel: string;
  };
  regulatoryApproval: {
    fda: boolean;
    ce: boolean;
    other: string[];
  };
}

export interface ClinicalDecisionSupport {
  id: string;
  condition: string;
  decisionTree: DecisionNode[];
  evidenceBase: ClinicalEvidence[];
  guidelines: ClinicalGuideline[];
  contraindications: string[];
  warnings: string[];
}

export interface DecisionNode {
  id: string;
  question: string;
  answers: DecisionAnswer[];
  followUpNodes?: string[];
  recommendation?: string;
}

export interface DecisionAnswer {
  value: string;
  weight: number;
  nextNodeId?: string;
}

export interface ClinicalEvidence {
  id: string;
  title: string;
  source: string;
  evidenceLevel: string;
  studyType: string;
  populationSize: number;
  findings: string;
  relevanceScore: number;
}

export interface ClinicalGuideline {
  id: string;
  organization: string;
  title: string;
  version: string;
  lastUpdated: string;
  recommendations: GuidelineRecommendation[];
}

export interface GuidelineRecommendation {
  recommendation: string;
  strengthOfRecommendation: 'A' | 'B' | 'C' | 'D';
  qualityOfEvidence: 'High' | 'Moderate' | 'Low' | 'Very Low';
  applicability: string[];
}

export interface MedicalImageAnalysis {
  id: string;
  imageType: 'x-ray' | 'ct' | 'mri' | 'ultrasound' | 'dermatoscopy' | 'fundoscopy' | 'ecg';
  findings: ImageFinding[];
  measurements: ImageMeasurement[];
  annotations: ImageAnnotation[];
  aiConfidence: number;
  radiologistReview?: {
    reviewed: boolean;
    reviewedBy: string;
    reviewDate: string;
    agreement: 'complete' | 'partial' | 'disagreement';
    comments: string;
  };
}

export interface ImageFinding {
  finding: string;
  location: string;
  severity: 'normal' | 'mild' | 'moderate' | 'severe';
  confidence: number;
  boundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface ImageMeasurement {
  parameter: string;
  value: number;
  unit: string;
  normalRange: {
    min: number;
    max: number;
  };
  isAbnormal: boolean;
}

export interface ImageAnnotation {
  type: 'arrow' | 'circle' | 'rectangle' | 'text';
  coordinates: number[];
  label: string;
  color: string;
}

export interface NaturalLanguageProcessing {
  id: string;
  inputText: string;
  processedText: string;
  extractedEntities: MedicalEntity[];
  clinicalConcepts: ClinicalConcept[];
  sentiment: {
    score: number;
    magnitude: number;
    classification: 'positive' | 'negative' | 'neutral';
  };
  icd10Codes: ICD10Code[];
  drugMentions: DrugMention[];
}

export interface MedicalEntity {
  text: string;
  type: 'symptom' | 'disease' | 'medication' | 'procedure' | 'anatomy' | 'test';
  confidence: number;
  startIndex: number;
  endIndex: number;
  umls?: string; // UMLS concept identifier
}

export interface ClinicalConcept {
  concept: string;
  category: string;
  relevance: number;
  relationships: string[];
}

export interface ICD10Code {
  code: string;
  description: string;
  confidence: number;
  billable: boolean;
}

export interface DrugMention {
  drugName: string;
  genericName?: string;
  dosage?: string;
  frequency?: string;
  route?: string;
  confidence: number;
  interactions?: string[];
}

export interface PrecisionMedicine {
  patientId: string;
  geneticProfile: GeneticProfile;
  biomarkers: Biomarker[];
  pharmacogenomics: PharmacogenomicProfile;
  personalizedRecommendations: PersonalizedRecommendation[];
  clinicalTrialEligibility: ClinicalTrialEligibility[];
}

export interface GeneticProfile {
  variants: GeneticVariant[];
  riskAlleles: RiskAllele[];
  pharmacogeneticMarkers: PharmacogeneticMarker[];
  heritabilityScores: HeritabilityScore[];
}

export interface GeneticVariant {
  gene: string;
  variant: string;
  zygosity: 'homozygous' | 'heterozygous';
  pathogenicity: 'pathogenic' | 'likely_pathogenic' | 'uncertain' | 'likely_benign' | 'benign';
  clinicalSignificance: string;
}

export interface RiskAllele {
  condition: string;
  riskScore: number;
  populationFrequency: number;
  oddsRatio: number;
}

export interface PharmacogeneticMarker {
  gene: string;
  phenotype: string;
  medications: string[];
  recommendations: string[];
}

export interface HeritabilityScore {
  trait: string;
  score: number;
  confidence: number;
}

export interface Biomarker {
  name: string;
  value: number;
  unit: string;
  normalRange: {
    min: number;
    max: number;
  };
  clinicalSignificance: string;
  trend: 'increasing' | 'decreasing' | 'stable';
}

export interface PharmacogenomicProfile {
  cyp2d6: string;
  cyp2c19: string;
  cyp2c9: string;
  slco1b1: string;
  dpyd: string;
  tpmt: string;
  ugt1a1: string;
  hla_b5701: boolean;
  hla_b1502: boolean;
}

export interface PersonalizedRecommendation {
  category: 'medication' | 'lifestyle' | 'screening' | 'prevention';
  recommendation: string;
  evidence: string;
  strength: 'strong' | 'moderate' | 'weak';
  applicability: number; // 0-1 score
}

export interface ClinicalTrialEligibility {
  trialId: string;
  title: string;
  phase: string;
  sponsor: string;
  condition: string;
  eligibilityScore: number;
  inclusionCriteria: string[];
  exclusionCriteria: string[];
  location: string;
  contactInfo: string;
}
