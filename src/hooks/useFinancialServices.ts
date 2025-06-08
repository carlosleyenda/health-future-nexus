
import { useState, useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AdvancedPaymentService } from '@/services/financial/paymentService';
import { HealthWallet, FinancialTransaction, PaymentMethod } from '@/types/financial';
import { toast } from 'sonner';

export const useHealthWallet = (userId: string) => {
  return useQuery({
    queryKey: ['health-wallet', userId],
    queryFn: () => AdvancedPaymentService.getHealthWallet(userId),
    enabled: !!userId,
  });
};

export const useFinancialTransactions = (userId: string, limit: number = 50) => {
  return useQuery({
    queryKey: ['financial-transactions', userId, limit],
    queryFn: () => AdvancedPaymentService.getUserTransactions(userId, limit),
    enabled: !!userId,
  });
};

export const useCreatePaymentIntent = () => {
  return useMutation({
    mutationFn: ({ amount, currency, metadata }: { 
      amount: number; 
      currency?: string; 
      metadata?: any 
    }) => AdvancedPaymentService.createStripePaymentIntent(amount, currency, metadata),
    onSuccess: () => {
      toast.success('Payment intent created successfully');
    },
    onError: (error) => {
      console.error('Payment intent error:', error);
      toast.error('Failed to create payment intent');
    },
  });
};

export const useUpdateWalletBalance = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, amount, type }: { 
      userId: string; 
      amount: number; 
      type: 'add' | 'subtract' 
    }) => AdvancedPaymentService.updateWalletBalance(userId, amount, type),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['health-wallet', variables.userId] });
      queryClient.invalidateQueries({ queryKey: ['financial-transactions', variables.userId] });
      toast.success('Wallet balance updated successfully');
    },
    onError: (error) => {
      console.error('Wallet update error:', error);
      toast.error('Failed to update wallet balance');
    },
  });
};

export const useAwardHealthCoins = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, coins, reason }: { 
      userId: string; 
      coins: number; 
      reason: string 
    }) => AdvancedPaymentService.awardHealthCoins(userId, coins, reason),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['health-wallet', variables.userId] });
      toast.success(`${variables.coins} HealthCoins awarded!`);
    },
    onError: (error) => {
      console.error('HealthCoins award error:', error);
      toast.error('Failed to award HealthCoins');
    },
  });
};

export const useProcessCashback = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, transactionAmount, percentage }: { 
      userId: string; 
      transactionAmount: number; 
      percentage?: number 
    }) => AdvancedPaymentService.processCashback(userId, transactionAmount, percentage),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['health-wallet', variables.userId] });
      toast.success('Cashback processed successfully!');
    },
    onError: (error) => {
      console.error('Cashback processing error:', error);
      toast.error('Failed to process cashback');
    },
  });
};

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (transaction: Omit<FinancialTransaction, 'id' | 'createdAt'>) => 
      AdvancedPaymentService.createTransaction(transaction),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['financial-transactions', variables.userId] });
      toast.success('Transaction created successfully');
    },
    onError: (error) => {
      console.error('Transaction creation error:', error);
      toast.error('Failed to create transaction');
    },
  });
};

export const useAddPaymentMethod = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (paymentMethod: Omit<PaymentMethod, 'id' | 'createdAt' | 'updatedAt'>) => 
      AdvancedPaymentService.addPaymentMethod(paymentMethod),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['payment-methods', variables.userId] });
      toast.success('Payment method added successfully');
    },
    onError: (error) => {
      console.error('Payment method addition error:', error);
      toast.error('Failed to add payment method');
    },
  });
};

export const useExchangeRate = (from: string, to: string) => {
  return useQuery({
    queryKey: ['exchange-rate', from, to],
    queryFn: () => AdvancedPaymentService.getExchangeRate(from, to),
    enabled: !!from && !!to,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useSubmitInsuranceClaim = () => {
  return useMutation({
    mutationFn: (claim: any) => AdvancedPaymentService.submitInsuranceClaim(claim),
    onSuccess: () => {
      toast.success('Insurance claim submitted successfully');
    },
    onError: (error) => {
      console.error('Insurance claim error:', error);
      toast.error('Failed to submit insurance claim');
    },
  });
};

export const useFraudCheck = () => {
  return useMutation({
    mutationFn: (transaction: any) => AdvancedPaymentService.checkForFraud(transaction),
    onSuccess: (result) => {
      if (result.isHighRisk) {
        toast.warning('Transaction flagged for review due to high risk score');
      }
    },
    onError: (error) => {
      console.error('Fraud check error:', error);
    },
  });
};

// Cryptocurrency payment hooks
export const useCryptoPayment = () => {
  return useMutation({
    mutationFn: ({ amount, currency }: { amount: number; currency?: string }) => 
      AdvancedPaymentService.createCryptoPayment(amount, currency),
    onSuccess: () => {
      toast.success('Crypto payment initiated');
    },
    onError: (error) => {
      console.error('Crypto payment error:', error);
      toast.error('Failed to initiate crypto payment');
    },
  });
};

// PayPal payment hooks
export const usePayPalPayment = () => {
  return useMutation({
    mutationFn: ({ amount, currency }: { amount: number; currency?: string }) => 
      AdvancedPaymentService.createPayPalOrder(amount, currency),
    onSuccess: () => {
      toast.success('PayPal payment initiated');
    },
    onError: (error) => {
      console.error('PayPal payment error:', error);
      toast.error('Failed to initiate PayPal payment');
    },
  });
};
