import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MedicalRecordsService } from '@/services/api/medicalRecordsService';
import type { MedicalRecord, Prescription, MedicalTranscription, DoctorProfile, PatientProfile } from '@/services/api/medicalRecordsService';
import { toast } from 'sonner';

// Medical Records
export const useMedicalRecords = (patientId: string) => {
  return useQuery({
    queryKey: ['medical-records', patientId],
    queryFn: () => MedicalRecordsService.getPatientMedicalRecords(patientId),
    enabled: !!patientId,
  });
};

export const useCreateMedicalRecord = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (record: Omit<MedicalRecord, 'id' | 'created_at' | 'updated_at'>) =>
      MedicalRecordsService.createMedicalRecord(record),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['medical-records', variables.patient_id] });
      toast.success('Historial médico actualizado correctamente');
    },
    onError: () => {
      toast.error('Error al crear el registro médico');
    },
  });
};

// Prescriptions
export const usePatientPrescriptions = (patientId: string) => {
  return useQuery({
    queryKey: ['prescriptions', 'patient', patientId],
    queryFn: () => MedicalRecordsService.getPatientPrescriptions(patientId),
    enabled: !!patientId,
  });
};

export const useDoctorPrescriptions = (doctorId: string) => {
  return useQuery({
    queryKey: ['prescriptions', 'doctor', doctorId],
    queryFn: () => MedicalRecordsService.getDoctorPrescriptions(doctorId),
    enabled: !!doctorId,
  });
};

export const useCreatePrescription = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (prescription: Omit<Prescription, 'id' | 'created_at' | 'updated_at'>) =>
      MedicalRecordsService.createPrescription(prescription),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['prescriptions', 'patient', data.patient_id] });
      queryClient.invalidateQueries({ queryKey: ['prescriptions', 'doctor', data.doctor_id] });
      toast.success('Receta creada correctamente');
    },
    onError: () => {
      toast.error('Error al crear la receta');
    },
  });
};

export const useUpdatePrescriptionStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ prescriptionId, status }: { prescriptionId: string; status: Prescription['status'] }) =>
      MedicalRecordsService.updatePrescriptionStatus(prescriptionId, status),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['prescriptions'] });
      toast.success('Estado de la receta actualizado');
    },
    onError: () => {
      toast.error('Error al actualizar el estado de la receta');
    },
  });
};

// Medical Transcriptions
export const useSessionTranscriptions = (sessionId: string) => {
  return useQuery({
    queryKey: ['transcriptions', 'session', sessionId],
    queryFn: () => MedicalRecordsService.getSessionTranscriptions(sessionId),
    enabled: !!sessionId,
  });
};

export const usePatientTranscriptions = (patientId: string) => {
  return useQuery({
    queryKey: ['transcriptions', 'patient', patientId],
    queryFn: () => MedicalRecordsService.getPatientTranscriptions(patientId),
    enabled: !!patientId,
  });
};

export const useCreateTranscription = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (transcription: Omit<MedicalTranscription, 'id' | 'processed_at'>) =>
      MedicalRecordsService.createTranscription(transcription),
    onSuccess: (data) => {
      if (data.session_id) {
        queryClient.invalidateQueries({ queryKey: ['transcriptions', 'session', data.session_id] });
      }
      queryClient.invalidateQueries({ queryKey: ['transcriptions', 'patient', data.patient_id] });
      toast.success('Transcripción guardada correctamente');
    },
    onError: () => {
      toast.error('Error al guardar la transcripción');
    },
  });
};

// Doctor Profiles
export const useAllDoctors = () => {
  return useQuery({
    queryKey: ['doctors', 'all'],
    queryFn: () => MedicalRecordsService.getAllDoctors(),
  });
};

export const useDoctorsBySpecialty = (specialty: string) => {
  return useQuery({
    queryKey: ['doctors', 'specialty', specialty],
    queryFn: () => MedicalRecordsService.getDoctorsBySpecialty(specialty),
    enabled: !!specialty,
  });
};

export const useDoctorProfile = (userId: string) => {
  return useQuery({
    queryKey: ['doctor-profile', userId],
    queryFn: () => MedicalRecordsService.getDoctorProfile(userId),
    enabled: !!userId,
  });
};

export const useCreateDoctorProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (profile: Omit<DoctorProfile, 'id' | 'created_at' | 'updated_at'>) =>
      MedicalRecordsService.createDoctorProfile(profile),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['doctor-profile', data.user_id] });
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
      toast.success('Perfil de doctor creado correctamente');
    },
    onError: () => {
      toast.error('Error al crear el perfil de doctor');
    },
  });
};

// Patient Profiles
export const usePatientProfile = (userId: string) => {
  return useQuery({
    queryKey: ['patient-profile', userId],
    queryFn: () => MedicalRecordsService.getPatientProfile(userId),
    enabled: !!userId,
  });
};

export const useCreatePatientProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (profile: Omit<PatientProfile, 'id' | 'created_at' | 'updated_at'>) =>
      MedicalRecordsService.createPatientProfile(profile),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['patient-profile', data.user_id] });
      toast.success('Perfil de paciente creado correctamente');
    },
    onError: () => {
      toast.error('Error al crear el perfil de paciente');
    },
  });
};

export const useUpdatePatientProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, updates }: { userId: string; updates: Partial<PatientProfile> }) =>
      MedicalRecordsService.updatePatientProfile(userId, updates),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['patient-profile', data.user_id] });
      toast.success('Perfil actualizado correctamente');
    },
    onError: () => {
      toast.error('Error al actualizar el perfil');
    },
  });
};