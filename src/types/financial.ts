
export interface HealthWallet {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  healthCoins: number;
  cashbackEarned: number;
  loyaltyTier: LoyaltyTier;
  hsaConnected?: boolean;
  cryptoEnabled?: boolean;
  autoPayEnabled?: boolean;
}

export type LoyaltyTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

export interface FinancialTransaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  currency: string;
  status: PaymentStatus;
  description: string;
  appointmentId?: string;
  deliveryServiceId?: string;
  pharmacyOrderId?: string;
  createdAt: string;
  completedAt?: string;
  paymentMethod: PaymentMethod;
  healthCoinsEarned?: number;
}

export type TransactionType = 
  | 'consultation'
  | 'prescription'
  | 'delivery_service'
  | 'pharmacy_order'
  | 'insurance_claim'
  | 'refund'
  | 'cashback'
  | 'health_coins'
  | 'subscription'
  | 'medical_loan';

export type PaymentMethod = 
  | 'credit_card'
  | 'debit_card'
  | 'bank_transfer'
  | 'digital_wallet'
  | 'cryptocurrency'
  | 'health_coins'
  | 'insurance'
  | 'hsa_fsa'
  | 'medical_financing';

export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
