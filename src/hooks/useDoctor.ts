
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DoctorService, AppointmentService } from '@/services/api';
import { toast } from 'sonner';
import type { Doctor } from '@/lib/database';

export const useDoctorProfile = (doctorId: string) => {
  return useQuery({
    queryKey: ['doctor', doctorId],
    queryFn: () => DoctorService.getProfile(doctorId),
    enabled: !!doctorId,
  });
};

export const useAllDoctors = () => {
  return useQuery({
    queryKey: ['doctors'],
    queryFn: () => DoctorService.getAllDoctors(),
  });
};

export const useDoctorsBySpecialty = (specialty: string) => {
  return useQuery({
    queryKey: ['doctors', 'specialty', specialty],
    queryFn: () => DoctorService.getDoctorsBySpecialty(specialty),
    enabled: !!specialty,
  });
};

export const useDoctorAppointments = (doctorId: string) => {
  return useQuery({
    queryKey: ['doctor-appointments', doctorId],
    queryFn: () => AppointmentService.getUserAppointments(doctorId, 'doctor'),
    enabled: !!doctorId,
  });
};

export const useDoctorPatients = (doctorId: string) => {
  return useQuery({
    queryKey: ['doctor-patients', doctorId],
    queryFn: () => DoctorService.getPatients(doctorId),
    enabled: !!doctorId,
  });
};

export const useUpdateDoctorAvailability = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ doctorId, availability }: { doctorId: string; availability: any }) =>
      DoctorService.updateAvailability(doctorId, availability),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['doctor', variables.doctorId] });
      toast.success('Disponibilidad actualizada correctamente');
    },
    onError: () => {
      toast.error('Error al actualizar la disponibilidad');
    },
  });
};
