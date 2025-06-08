
// Tipos para integraciones médicas estándar

export interface FHIR_Patient {
  resourceType: 'Patient';
  id: string;
  identifier: FHIR_Identifier[];
  name: FHIR_HumanName[];
  telecom: FHIR_ContactPoint[];
  gender: 'male' | 'female' | 'other' | 'unknown';
  birthDate: string;
  address: FHIR_Address[];
}

export interface FHIR_Identifier {
  use?: 'usual' | 'official' | 'temp' | 'secondary';
  type?: FHIR_CodeableConcept;
  system?: string;
  value?: string;
}

export interface FHIR_HumanName {
  use?: 'usual' | 'official' | 'temp' | 'nickname' | 'anonymous' | 'old' | 'maiden';
  family?: string;
  given?: string[];
  prefix?: string[];
  suffix?: string[];
}

export interface FHIR_ContactPoint {
  system?: 'phone' | 'fax' | 'email' | 'pager' | 'url' | 'sms' | 'other';
  value?: string;
  use?: 'home' | 'work' | 'temp' | 'old' | 'mobile';
}

export interface FHIR_Address {
  use?: 'home' | 'work' | 'temp' | 'old' | 'billing';
  line?: string[];
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface FHIR_CodeableConcept {
  coding?: FHIR_Coding[];
  text?: string;
}

export interface FHIR_Coding {
  system?: string;
  version?: string;
  code?: string;
  display?: string;
}

// ICD-10 Codes
export interface ICD10_Code {
  code: string;
  description: string;
  category: string;
  subcategory?: string;
  severity?: 'mild' | 'moderate' | 'severe';
}

// SNOMED CT
export interface SNOMED_Concept {
  conceptId: string;
  term: string;
  semanticTag: string;
  active: boolean;
  definitionStatus: 'primitive' | 'fully_defined';
}

// LOINC Codes
export interface LOINC_Code {
  loincCode: string;
  component: string;
  property: string;
  timeAspect: string;
  system: string;
  scale: string;
  method?: string;
  class: string;
  shortName: string;
}

export interface MedicalCoding {
  icd10?: ICD10_Code[];
  snomed?: SNOMED_Concept[];
  loinc?: LOINC_Code[];
  custom?: string[];
}
