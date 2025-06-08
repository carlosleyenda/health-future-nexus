
import type { 
  Medication,
  PatientMedication,
  SmartDispenser,
  AdherenceReport,
  MedicationInteraction,
  AdverseEventReport,
  TherapeuticMonitoring,
  SmartPackaging,
  IoTSensor,
  MedicationAIInsight
} from '@/types/medication';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class MedicationService {
  // Medication Database Operations
  static async searchMedications(query: string): Promise<Medication[]> {
    await delay(300);
    
    // Mock medication database
    const medications = [
      {
        id: '1',
        name: 'Metformina',
        genericName: 'Metformina',
        brandName: 'Glucophage',
        ndcCode: '0087-6060-01',
        dosage: '500mg',
        form: 'tablet' as const,
        strength: '500mg',
        manufacturer: 'Bristol-Myers Squibb',
        category: 'prescription' as const,
        pregnancyCategory: 'B' as const,
        isGenericAvailable: true,
        averagePrice: 25.50,
        currency: 'USD',
        interactions: ['Contraste yodado', 'Alcohol'],
        contraindications: ['Insuficiencia renal severa', 'Acidosis metabólica'],
        sideEffects: ['Molestias gastrointestinales', 'Náuseas', 'Diarrea'],
        warnings: ['Riesgo de acidosis láctica'],
        storageInstructions: 'Almacenar a temperatura ambiente',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    
    return medications.filter(med => 
      med.name.toLowerCase().includes(query.toLowerCase()) ||
      med.genericName?.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Patient Medication Management
  static async getPatientMedications(patientId: string): Promise<PatientMedication[]> {
    await delay(400);
    
    return [
      {
        id: '1',
        patientId,
        medicationId: '1',
        prescriptionId: 'RX-001',
        doctorId: 'doc-1',
        dosage: '500mg',
        frequency: '2 veces al día',
        duration: '90 días',
        instructions: 'Tomar con alimentos para reducir molestias gástricas',
        startDate: '2024-01-15',
        endDate: '2024-04-15',
        isActive: true,
        adherenceScore: 87,
        lastTaken: '2024-06-08T08:30:00Z',
        nextDue: '2024-06-08T20:30:00Z',
        totalDoses: 180,
        takenDoses: 156,
        missedDoses: 24,
        sideEffectsReported: ['Molestias gastrointestinales leves'],
        effectivenessRating: 4,
        notes: 'Paciente tolera bien el medicamento',
        autoRefill: true,
        refillsRemaining: 2,
        pharmacy: 'Farmacia Central',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }

  // Smart Dispenser Management
  static async getSmartDispensers(patientId: string): Promise<SmartDispenser[]> {
    await delay(300);
    
    return [
      {
        id: '1',
        patientId,
        deviceId: 'SPD-001',
        name: 'Smart Pill Dispenser Pro',
        model: 'SPD-2024-V3',
        manufacturer: 'MedTech Solutions',
        serialNumber: 'SPD-001-2024',
        firmwareVersion: '3.2.1',
        batteryLevel: 85,
        connectivity: 'wifi' as const,
        isOnline: true,
        location: 'Sala de estar',
        compartments: [
          {
            id: '1',
            compartmentNumber: 1,
            medicationId: '1',
            pillCount: 45,
            capacity: 60,
            nextDispenseTime: '2024-06-08T20:30:00Z',
            dosesPerDispense: 1,
            isLocked: false,
            sensorStatus: 'working' as const,
            lastRefilled: '2024-06-01',
            expirationDate: '2025-01-15'
          }
        ],
        lastSync: new Date().toISOString(),
        alerts: [
          {
            id: '1',
            type: 'low_stock' as const,
            severity: 'medium' as const,
            message: 'Stock bajo en compartimento 3',
            isRead: false,
            isResolved: false,
            createdAt: new Date().toISOString()
          }
        ],
        settings: {
          soundAlerts: true,
          visualAlerts: true,
          dosageReminders: true,
          lowStockWarnings: true,
          tamperAlerts: true
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }

  // Adherence Monitoring
  static async generateAdherenceReport(patientId: string, startDate: string, endDate: string): Promise<AdherenceReport> {
    await delay(500);
    
    return {
      id: crypto.randomUUID(),
      patientId,
      reportPeriod: { start: startDate, end: endDate },
      overallScore: 87,
      medicationScores: [
        {
          medicationId: '1',
          score: 94,
          totalDoses: 60,
          takenDoses: 56,
          missedDoses: 4,
          onTimeDoses: 52,
          lateDoses: 4
        }
      ],
      insights: [
        'Mejor adherencia en días laborales vs fines de semana',
        'Tendencia a olvidar dosis nocturnas'
      ],
      recommendations: [
        'Configurar recordatorios adicionales para fines de semana',
        'Considerar cambio de horario para dosis nocturna'
      ],
      riskFactors: ['Polifarmacia', 'Horario laboral variable'],
      interventions: ['Educación del paciente', 'Simplificación del régimen'],
      doctorNotified: true,
      caregiverNotified: true,
      insuranceReported: false,
      createdAt: new Date().toISOString()
    };
  }

  // Drug Interaction Checking
  static async checkDrugInteractions(medicationIds: string[]): Promise<MedicationInteraction[]> {
    await delay(400);
    
    if (medicationIds.length < 2) return [];
    
    return [
      {
        id: '1',
        medication1Id: medicationIds[0],
        medication2Id: medicationIds[1],
        interactionType: 'major' as const,
        severity: 'serious' as const,
        description: 'Interacción significativa detectada',
        mechanism: 'Inhibición enzimática',
        clinicalEffects: ['Aumento de toxicidad', 'Reducción de eficacia'],
        management: 'Monitorear niveles plasmáticos',
        monitoring: ['Función renal', 'Niveles séricos'],
        alternatives: ['Medicamento alternativo X'],
        evidenceLevel: 'established' as const,
        sources: ['FDA Drug Interactions Database', 'Clinical Studies'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }

  // Adverse Event Reporting
  static async reportAdverseEvent(event: Omit<AdverseEventReport, 'id' | 'createdAt' | 'updatedAt'>): Promise<AdverseEventReport> {
    await delay(600);
    
    return {
      ...event,
      id: crypto.randomUUID(),
      fdaReportNumber: 'FDA-2024-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  // AI-Powered Insights
  static async generateAIInsights(patientId: string): Promise<MedicationAIInsight[]> {
    await delay(800);
    
    return [
      {
        id: crypto.randomUUID(),
        type: 'adherence_prediction' as const,
        patientId,
        medicationId: '1',
        confidence: 0.87,
        prediction: {
          nextWeekAdherence: 0.92,
          riskFactors: ['weekend pattern', 'evening doses'],
          interventionRecommended: true
        },
        reasoning: [
          'Historial de menor adherencia en fines de semana',
          'Patrón de olvido en dosis nocturnas',
          'Alta adherencia general sugiere motivación del paciente'
        ],
        dataPoints: [
          'Adherencia últimos 30 días: 87%',
          'Horarios de toma más consistentes',
          'Uso regular de verificación por foto'
        ],
        recommendations: [
          'Configurar recordatorios adicionales para fines de semana',
          'Considerar cambiar dosis nocturna a matutina',
          'Implementar sistema de recompensas por adherencia'
        ],
        riskFactors: ['Polifarmacia', 'Complejidad del régimen'],
        followUpActions: [
          'Revisar régimen con médico tratante',
          'Evaluar simplificación de horarios',
          'Programar seguimiento en 2 semanas'
        ],
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        modelVersion: 'v2.1.0',
        createdAt: new Date().toISOString()
      }
    ];
  }

  // Smart Packaging Integration
  static async getSmartPackagingData(medicationId: string): Promise<SmartPackaging | null> {
    await delay(300);
    
    return {
      id: crypto.randomUUID(),
      medicationId,
      packageType: 'bottle' as const,
      rfidTag: 'RFID-001-MTF',
      qrCode: 'QR-001-MTF-2024',
      nfcEnabled: true,
      tamperEvident: true,
      childResistant: true,
      isAuthentic: true,
      manufacturingDate: '2024-01-15',
      expirationDate: '2025-01-15',
      batchNumber: 'BTH-24-001',
      serialNumber: 'SN-MTF-001-2024',
      temperature: {
        current: 22.5,
        min: 15,
        max: 30,
        breaches: 0
      },
      humidity: {
        current: 45,
        breaches: 0
      },
      lightExposure: {
        current: 150,
        breaches: 1
      },
      openingHistory: [
        {
          timestamp: '2024-06-08T08:30:00Z',
          duration: 15
        }
      ],
      locationHistory: [
        {
          timestamp: '2024-06-08T08:30:00Z',
          location: 'Casa - Sala de estar',
          gps: {
            latitude: 40.7128,
            longitude: -74.0060
          }
        }
      ],
      isDisposed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  // IoT Sensor Management
  static async getIoTSensors(patientId: string): Promise<IoTSensor[]> {
    await delay(400);
    
    return [
      {
        id: '1',
        deviceType: 'wearable' as const,
        patientId,
        name: 'HealthWatch Vital Monitor',
        model: 'HWV-2024',
        firmwareVersion: '2.1.0',
        batteryLevel: 42,
        signalStrength: 88,
        isOnline: true,
        lastHeartbeat: new Date().toISOString(),
        metrics: [
          {
            timestamp: new Date().toISOString(),
            data: {
              heartRate: 73,
              bloodPressure: { systolic: 122, diastolic: 82 },
              oxygenSaturation: 98,
              temperature: 36.7
            }
          }
        ],
        alerts: [],
        configuration: {
          monitoringInterval: 300, // 5 minutes
          alertThresholds: {
            heartRateMin: 60,
            heartRateMax: 100,
            systolicBPMax: 140,
            diastolicBPMax: 90
          }
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }

  // Wearable Integration for Side Effect Monitoring
  static async analyzeWearableData(sensorId: string, timeRange: { start: string; end: string }) {
    await delay(600);
    
    return {
      sensorId,
      analysisPeriod: timeRange,
      patterns: [
        {
          type: 'heart_rate_elevation',
          detected: true,
          correlation: 'Post-medication timing',
          significance: 0.75,
          recommendation: 'Monitor for cardiovascular side effects'
        },
        {
          type: 'sleep_disruption',
          detected: false,
          correlation: null,
          significance: 0.12,
          recommendation: null
        }
      ],
      aiInsights: [
        'Elevated heart rate detected 2-3 hours post-dose',
        'Pattern consistent with medication absorption peak',
        'Recommend cardiovascular monitoring'
      ],
      recommendedActions: [
        'Consult with cardiologist',
        'Consider dose adjustment',
        'Increase monitoring frequency'
      ]
    };
  }
}

export class AdvancedMedicationService extends MedicationService {
  // Predictive Analytics
  static async predictAdherenceRisk(patientId: string): Promise<{
    riskScore: number;
    riskLevel: 'low' | 'medium' | 'high';
    factors: string[];
    interventions: string[];
  }> {
    await delay(700);
    
    return {
      riskScore: 0.35,
      riskLevel: 'medium',
      factors: [
        'Polifarmacia (5+ medicamentos)',
        'Horario laboral variable',
        'Historial de olvidos de fin de semana'
      ],
      interventions: [
        'Simplificar régimen de dosificación',
        'Implementar recordatorios inteligentes',
        'Programa de educación personalizada'
      ]
    };
  }

  // Personalized Dosing Recommendations
  static async getPersonalizedDosing(patientId: string, medicationId: string): Promise<{
    currentDose: string;
    recommendedDose: string;
    reasoning: string[];
    confidence: number;
    monitoring: string[];
  }> {
    await delay(500);
    
    return {
      currentDose: '500mg BID',
      recommendedDose: '750mg BID',
      reasoning: [
        'Subóptimo control glucémico con dosis actual',
        'Buena tolerancia sin efectos adversos',
        'Función renal normal permite aumento'
      ],
      confidence: 0.82,
      monitoring: [
        'Función renal cada 3 meses',
        'Glucosa en ayunas semanal',
        'HbA1c en 3 meses'
      ]
    };
  }

  // Clinical Trial Matching
  static async findClinicalTrials(patientId: string, condition: string): Promise<{
    trials: Array<{
      id: string;
      title: string;
      phase: string;
      eligibility: string[];
      location: string;
      matchScore: number;
    }>;
  }> {
    await delay(800);
    
    return {
      trials: [
        {
          id: 'NCT00000001',
          title: 'Novel Diabetes Treatment with AI-Guided Dosing',
          phase: 'Phase III',
          eligibility: ['Type 2 Diabetes', 'Age 18-75', 'HbA1c 7-10%'],
          location: 'University Hospital',
          matchScore: 0.89
        }
      ]
    };
  }
}
