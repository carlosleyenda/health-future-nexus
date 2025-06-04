
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AppointmentService, NotificationService } from '@/services/api';
import { toast } from 'sonner';
import type { Appointment } from '@/lib/database';

export const useAppointment = (appointmentId: string) => {
  return useQuery({
    queryKey: ['appointment', appointmentId],
    queryFn: () => AppointmentService.getAppointment(appointmentId),
    enabled: !!appointmentId,
  });
};

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>) =>
      AppointmentService.createAppointment(appointmentData),
    onSuccess: async (newAppointment) => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['patient-appointments', newAppointment.patientId] });
      queryClient.invalidateQueries({ queryKey: ['doctor-appointments', newAppointment.doctorId] });
      
      // Enviar notificación
      await NotificationService.sendAppointmentConfirmation(newAppointment.id);
      
      toast.success('Cita agendada correctamente');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Error al agendar la cita');
    },
  });
};

export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ appointmentId, updates }: { appointmentId: string; updates: Partial<Appointment> }) =>
      AppointmentService.updateAppointment(appointmentId, updates),
    onSuccess: (updatedAppointment) => {
      if (updatedAppointment) {
        queryClient.setQueryData(['appointment', updatedAppointment.id], updatedAppointment);
        queryClient.invalidateQueries({ queryKey: ['patient-appointments', updatedAppointment.patientId] });
        queryClient.invalidateQueries({ queryKey: ['doctor-appointments', updatedAppointment.doctorId] });
        toast.success('Cita actualizada correctamente');
      }
    },
    onError: () => {
      toast.error('Error al actualizar la cita');
    },
  });
};

export const useCancelAppointment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ appointmentId, reason }: { appointmentId: string; reason: string }) =>
      AppointmentService.cancelAppointment(appointmentId, reason),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['appointment', variables.appointmentId] });
      toast.success('Cita cancelada correctamente');
    },
    onError: () => {
      toast.error('Error al cancelar la cita');
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
