
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PaymentService } from '@/services/financial/paymentService';
import { useAuthStore } from '@/store/auth';
import { toast } from 'sonner';
import type { 
  PaymentMethod, 
  Transaction, 
  HealthWallet, 
  Invoice, 
  InsuranceClaim,
  Subscription,
  HealthSavingsGoal
} from '@/types/financial';

export const useHealthWallet = () => {
  const { user } = useAuthStore();
  
  return useQuery({
    queryKey: ['health-wallet', user?.id],
    queryFn: () => PaymentService.getHealthWallet(user?.id || ''),
    enabled: !!user,
  });
};

export const useTransactions = (userId?: string) => {
  return useQuery({
    queryKey: ['transactions', userId],
    queryFn: () => PaymentService.getTransactions(userId || ''),
    enabled: !!userId,
  });
};

export const usePaymentMethods = (userId?: string) => {
  return useQuery({
    queryKey: ['payment-methods', userId],
    queryFn: () => PaymentService.getPaymentMethods(userId || ''),
    enabled: !!userId,
  });
};

export const useInvoices = (userId?: string) => {
  return useQuery({
    queryKey: ['invoices', userId],
    queryFn: () => PaymentService.getInvoices(userId || ''),
    enabled: !!userId,
  });
};

export const useInsuranceClaims = (userId?: string) => {
  return useQuery({
    queryKey: ['insurance-claims', userId],
    queryFn: () => PaymentService.getInsuranceClaims(userId || ''),
    enabled: !!userId,
  });
};

export const useSubscriptions = (userId?: string) => {
  return useQuery({
    queryKey: ['subscriptions', userId],
    queryFn: () => PaymentService.getSubscriptions(userId || ''),
    enabled: !!userId,
  });
};

export const useHealthSavingsGoals = (userId?: string) => {
  return useQuery({
    queryKey: ['health-savings-goals', userId],
    queryFn: () => PaymentService.getHealthSavingsGoals(userId || ''),
    enabled: !!userId,
  });
};

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (transaction: Omit<Transaction, 'id' | 'createdAt' | 'completedAt'>) =>
      PaymentService.createTransaction(transaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['health-wallet'] });
      toast.success('Transacción creada exitosamente');
    },
    onError: () => {
      toast.error('Error al crear la transacción');
    },
  });
};

export const useAddPaymentMethod = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (paymentMethod: Omit<PaymentMethod, 'id' | 'createdAt' | 'updatedAt'>) =>
      PaymentService.addPaymentMethod(paymentMethod),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-methods'] });
      toast.success('Método de pago agregado exitosamente');
    },
    onError: () => {
      toast.error('Error al agregar método de pago');
    },
  });
};

export const useCreateInvoice = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (invoice: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>) =>
      PaymentService.createInvoice(invoice),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast.success('Factura creada exitosamente');
    },
    onError: () => {
      toast.error('Error al crear la factura');
    },
  });
};

export const useSubmitInsuranceClaim = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (claim: Omit<InsuranceClaim, 'id' | 'createdAt' | 'updatedAt'>) =>
      PaymentService.submitInsuranceClaim(claim),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['insurance-claims'] });
      toast.success('Reclamo de seguro enviado exitosamente');
    },
    onError: () => {
      toast.error('Error al enviar el reclamo de seguro');
    },
  });
};

export const useCreateSubscription = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (subscription: Omit<Subscription, 'id' | 'createdAt' | 'updatedAt'>) =>
      PaymentService.createSubscription(subscription),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      toast.success('Suscripción creada exitosamente');
    },
    onError: () => {
      toast.error('Error al crear la suscripción');
    },
  });
};

export const useCreateHealthSavingsGoal = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (goal: Omit<HealthSavingsGoal, 'id' | 'createdAt' | 'updatedAt'>) =>
      PaymentService.createHealthSavingsGoal(goal),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['health-savings-goals'] });
      toast.success('Meta de ahorro creada exitosamente');
    },
    onError: () => {
      toast.error('Error al crear la meta de ahorro');
    },
  });
};

export const useExchangeRates = () => {
  return useQuery({
    queryKey: ['exchange-rates'],
    queryFn: () => PaymentService.getExchangeRates(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000,
  });
};

export const useKycVerification = (userId?: string) => {
  return useQuery({
    queryKey: ['kyc-verification', userId],
    queryFn: () => PaymentService.getKycVerification(userId || ''),
    enabled: !!userId,
  });
};

export const useFraudAlerts = () => {
  return useQuery({
    queryKey: ['fraud-alerts'],
    queryFn: () => PaymentService.getFraudAlerts(),
  });
};

export const useTaxDocuments = (userId?: string) => {
  return useQuery({
    queryKey: ['tax-documents', userId],
    queryFn: () => PaymentService.getTaxDocuments(userId || ''),
    enabled: !!userId,
  });
};
