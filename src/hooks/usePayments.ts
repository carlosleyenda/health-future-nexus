
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PaymentService } from '@/services/api';
import { toast } from 'sonner';

export const useCreatePaymentIntent = () => {
  return useMutation({
    mutationFn: ({ amount, appointmentId }: { amount: number; appointmentId?: string }) =>
      PaymentService.createPaymentIntent(amount, appointmentId),
    onError: () => {
      toast.error('Error al procesar el pago');
    },
  });
};

export const useConfirmPayment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ paymentIntentId, patientId, appointmentId }: { 
      paymentIntentId: string; 
      patientId: string; 
      appointmentId?: string 
    }) => PaymentService.confirmPayment(paymentIntentId, patientId, appointmentId),
    onSuccess: (transaction) => {
      queryClient.invalidateQueries({ queryKey: ['patient-transactions', transaction.patientId] });
      if (transaction.appointmentId) {
        queryClient.invalidateQueries({ queryKey: ['appointment', transaction.appointmentId] });
      }
      toast.success('Pago procesado correctamente');
    },
    onError: () => {
      toast.error('Error al confirmar el pago');
    },
  });
};
