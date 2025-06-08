
// Servicio para Mercado Global de Salud

import type { 
  GlobalDoctor, 
  MedicalTourismPackage, 
  SpecialistExchange, 
  GlobalConsultation 
} from '@/types/global-marketplace';

export class GlobalHealthcareService {
  private apiKey: string;

  constructor(apiKey: string = process.env.GLOBAL_HEALTHCARE_API_KEY || '') {
    this.apiKey = apiKey;
  }

  async searchGlobalDoctors(criteria: {
    specialty?: string;
    country?: string;
    language?: string;
    rating?: number;
    availability?: string;
  }): Promise<GlobalDoctor[]> {
    const searchParams = new URLSearchParams();
    Object.entries(criteria).forEach(([key, value]) => {
      if (value) searchParams.append(key, value.toString());
    });

    const response = await fetch(`/api/global/doctors/search?${searchParams}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
      }
    });

    if (!response.ok) {
      throw new Error(`Global Doctor Search error: ${response.status}`);
    }

    return response.json();
  }

  async requestSpecialistExchange(exchange: Partial<SpecialistExchange>): Promise<SpecialistExchange> {
    const response = await fetch('/api/global/specialist-exchange', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(exchange)
    });

    if (!response.ok) {
      throw new Error(`Specialist Exchange error: ${response.status}`);
    }

    return response.json();
  }

  async searchMedicalTourism(criteria: {
    procedure?: string;
    destination?: string;
    budget?: { min: number; max: number };
    duration?: number;
  }): Promise<MedicalTourismPackage[]> {
    const response = await fetch('/api/global/medical-tourism/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(criteria)
    });

    if (!response.ok) {
      throw new Error(`Medical Tourism Search error: ${response.status}`);
    }

    return response.json();
  }

  async scheduleGlobalConsultation(consultation: Partial<GlobalConsultation>): Promise<GlobalConsultation> {
    const response = await fetch('/api/global/consultations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(consultation)
    });

    if (!response.ok) {
      throw new Error(`Global Consultation error: ${response.status}`);
    }

    return response.json();
  }

  async validateDoctorLicense(
    doctorId: string, 
    country: string
  ): Promise<{ valid: boolean; details: any }> {
    const response = await fetch(`/api/global/license-validation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({ doctorId, country })
    });

    if (!response.ok) {
      throw new Error(`License Validation error: ${response.status}`);
    }

    return response.json();
  }

  async getTranslationServices(): Promise<{ languages: string[]; services: string[] }> {
    const response = await fetch('/api/global/translation-services', {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
      }
    });

    if (!response.ok) {
      throw new Error(`Translation Services error: ${response.status}`);
    }

    return response.json();
  }

  async checkRegulationsCompliance(
    sourceCountry: string,
    targetCountry: string,
    serviceType: string
  ): Promise<{ compliant: boolean; requirements: string[]; restrictions: string[] }> {
    const response = await fetch('/api/global/compliance-check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({ sourceCountry, targetCountry, serviceType })
    });

    if (!response.ok) {
      throw new Error(`Compliance Check error: ${response.status}`);
    }

    return response.json();
  }
}

export const globalHealthcareService = new GlobalHealthcareService();
