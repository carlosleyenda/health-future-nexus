
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AppointmentService } from '@/services/api';
import { toast } from 'sonner';
import type { Appointment } from '@/lib/database';

export const useAppointment = (appointmentId: string) => {
  return useQuery({
    queryKey: ['appointment', appointmentId],
    queryFn: () => AppointmentService.getAppointment(appointmentId),
    enabled: !!appointmentId,
  });
};

export const usePatientAppointments = (patientId: string) => {
  return useQuery({
    queryKey: ['appointments', 'patient', patientId],
    queryFn: async () => {
      const appointments = await AppointmentService.getPatientAppointments(patientId);
      return appointments;
    },
    enabled: !!patientId,
  });
};

export const useDoctorAppointments = (doctorId: string) => {
  return useQuery({
    queryKey: ['appointments', 'doctor', doctorId],
    queryFn: async () => {
      const appointments = await AppointmentService.getDoctorAppointments(doctorId);
      return appointments;
    },
    enabled: !!doctorId,
  });
};

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AppointmentService.createAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast.success('Cita creada exitosamente');
    },
    onError: () => {
      toast.error('Error al crear la cita');
    },
  });
};

export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Appointment> }) =>
      AppointmentService.updateAppointment(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast.success('Cita actualizada');
    },
  });
};

export const useCancelAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ appointmentId, reason }: { appointmentId: string; reason: string }) =>
      AppointmentService.cancelAppointment(appointmentId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast.success('Cita cancelada');
    },
  });
};

export const useAvailableSlots = (doctorId: string, date: string) => {
  return useQuery({
    queryKey: ['available-slots', doctorId, date],
    queryFn: () => AppointmentService.getAvailableSlots(doctorId, date),
    enabled: !!doctorId && !!date,
  });
};
