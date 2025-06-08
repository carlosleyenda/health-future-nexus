
// Servicio para integración con FHIR

import type { FHIR_Patient, FHIR_Identifier } from '@/types/medical-integrations';

export class FHIRService {
  private baseUrl: string;
  private apiKey: string;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  async getPatient(patientId: string): Promise<FHIR_Patient> {
    const response = await fetch(`${this.baseUrl}/Patient/${patientId}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/fhir+json',
        'Accept': 'application/fhir+json'
      }
    });

    if (!response.ok) {
      throw new Error(`FHIR API error: ${response.status}`);
    }

    return response.json();
  }

  async createPatient(patient: FHIR_Patient): Promise<FHIR_Patient> {
    const response = await fetch(`${this.baseUrl}/Patient`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/fhir+json',
        'Accept': 'application/fhir+json'
      },
      body: JSON.stringify(patient)
    });

    if (!response.ok) {
      throw new Error(`FHIR API error: ${response.status}`);
    }

    return response.json();
  }

  async searchPatients(params: Record<string, string>): Promise<FHIR_Patient[]> {
    const searchParams = new URLSearchParams(params);
    const response = await fetch(`${this.baseUrl}/Patient?${searchParams}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/fhir+json',
        'Accept': 'application/fhir+json'
      }
    });

    if (!response.ok) {
      throw new Error(`FHIR API error: ${response.status}`);
    }

    const bundle = await response.json();
    return bundle.entry?.map((entry: any) => entry.resource) || [];
  }

  async updatePatient(patientId: string, patient: FHIR_Patient): Promise<FHIR_Patient> {
    const response = await fetch(`${this.baseUrl}/Patient/${patientId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/fhir+json',
        'Accept': 'application/fhir+json'
      },
      body: JSON.stringify(patient)
    });

    if (!response.ok) {
      throw new Error(`FHIR API error: ${response.status}`);
    }

    return response.json();
  }

  // Convertir datos internos a formato FHIR
  convertToFHIR(internalPatient: any): FHIR_Patient {
    return {
      resourceType: 'Patient',
      id: internalPatient.id,
      identifier: [
        {
          use: 'official',
          system: 'https://clinica-virtual.com/patient-id',
          value: internalPatient.id
        }
      ],
      name: [
        {
          use: 'official',
          family: internalPatient.lastName,
          given: [internalPatient.firstName]
        }
      ],
      telecom: [
        {
          system: 'email',
          value: internalPatient.email,
          use: 'home'
        },
        {
          system: 'phone',
          value: internalPatient.phone,
          use: 'home'
        }
      ],
      gender: internalPatient.gender as any,
      birthDate: internalPatient.dateOfBirth,
      address: [
        {
          use: 'home',
          line: [internalPatient.address?.street],
          city: internalPatient.address?.city,
          state: internalPatient.address?.state,
          postalCode: internalPatient.address?.zipCode,
          country: internalPatient.address?.country
        }
      ]
    };
  }

  // Convertir datos FHIR a formato interno
  convertFromFHIR(fhirPatient: FHIR_Patient): any {
    const name = fhirPatient.name?.[0];
    const telecom = fhirPatient.telecom || [];
    const address = fhirPatient.address?.[0];

    return {
      id: fhirPatient.id,
      firstName: name?.given?.[0] || '',
      lastName: name?.family || '',
      email: telecom.find(t => t.system === 'email')?.value || '',
      phone: telecom.find(t => t.system === 'phone')?.value || '',
      gender: fhirPatient.gender,
      dateOfBirth: fhirPatient.birthDate,
      address: {
        street: address?.line?.[0] || '',
        city: address?.city || '',
        state: address?.state || '',
        zipCode: address?.postalCode || '',
        country: address?.country || ''
      }
    };
  }
}

export const fhirService = new FHIRService(
  process.env.FHIR_BASE_URL || 'https://hapi.fhir.org/baseR4',
  process.env.FHIR_API_KEY || ''
);
