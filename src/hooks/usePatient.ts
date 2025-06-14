
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Mock patient data - replace with actual API calls
export const usePatientProfile = (patientId: string) => {
  return useQuery({
    queryKey: ['patient-profile', patientId],
    queryFn: async () => ({
      id: patientId,
      firstName: 'Juan',
      lastName: 'Pérez',
      bloodType: 'O+',
      allergies: [
        {
          id: 'allergy-1',
          allergen: 'Penicilina',
          severity: 'severe' as const,
          reaction: 'Erupción cutánea severa',
          diagnosedDate: '2020-03-15'
        }
      ],
      currentMedications: [
        {
          id: 'med-1',
          name: 'Aspirina',
          dosage: '100mg',
          frequency: 'Diario'
        }
      ]
    }),
    enabled: !!patientId,
  });
};

export const usePatientMedicalHistory = (patientId: string) => {
  return useQuery({
    queryKey: ['patient-medical-history', patientId],
    queryFn: async () => [
      {
        id: 'record-1',
        date: '2024-01-15',
        chiefComplaint: 'Dolor de cabeza persistente',
        diagnosis: ['Migraña', 'Tensión muscular'],
        treatmentPlan: 'Analgésicos y descanso',
        vitalSigns: {
          bloodPressure: '120/80',
          heartRate: 72,
          temperature: 36.5,
          weight: 70,
          height: 175
        }
      }
    ],
    enabled: !!patientId,
  });
};

export const usePatientHealthMetrics = (patientId: string, metricType?: string) => {
  return useQuery({
    queryKey: ['patient-health-metrics', patientId, metricType],
    queryFn: async () => {
      // Always return array format for consistent typing
      if (metricType) {
        return [
          {
            id: '1',
            value: metricType === 'heart_rate' ? 72 : metricType === 'blood_pressure' ? 120 : metricType === 'weight' ? 70 : 36.5,
            unit: metricType === 'heart_rate' ? 'bpm' : metricType === 'blood_pressure' ? 'mmHg' : metricType === 'weight' ? 'kg' : '°C',
            recordedAt: new Date().toISOString()
          },
          {
            id: '2',
            value: metricType === 'heart_rate' ? 75 : metricType === 'blood_pressure' ? 118 : metricType === 'weight' ? 69.5 : 36.3,
            unit: metricType === 'heart_rate' ? 'bpm' : metricType === 'blood_pressure' ? 'mmHg' : metricType === 'weight' ? 'kg' : '°C',
            recordedAt: new Date(Date.now() - 86400000).toISOString()
          }
        ];
      }
      
      // Return empty array for consistent typing when no metric type specified
      return [];
    },
    enabled: !!patientId,
  });
};

export const usePatientAllergies = (patientId: string) => {
  return useQuery({
    queryKey: ['patient-allergies', patientId],
    queryFn: async () => [
      {
        id: 'allergy-1',
        allergen: 'Penicilina',
        severity: 'severe' as const,
        reaction: 'Erupción cutánea severa',
        diagnosedDate: '2020-03-15'
      }
    ],
    enabled: !!patientId,
  });
};

export const usePatientPrescriptions = (patientId: string) => {
  return useQuery({
    queryKey: ['patient-prescriptions', patientId],
    queryFn: async () => [
      {
        id: 'prescription-1',
        medicationName: 'Aspirina',
        dosage: '100mg',
        quantity: '30 tabletas',
        frequency: 'Una vez al día',
        duration: 30,
        instructions: 'Tomar con alimentos',
        status: 'delivered' as const,
        createdAt: '2024-01-15'
      }
    ],
    enabled: !!patientId,
  });
};

export const useAddHealthMetric = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: {
      patientId: string;
      type: string;
      value: number;
      unit: string;
      recordedAt: string;
    }) => {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { id: crypto.randomUUID(), ...data };
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['patient-health-metrics', variables.patientId]
      });
    }
  });
};
