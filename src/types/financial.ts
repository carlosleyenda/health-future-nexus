
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
  cashbackAmount?: number;
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

export interface PaymentMethod {
  id: string;
  userId: string;
  type: PaymentMethodType;
  provider: string;
  externalId: string;
  isDefault: boolean;
  lastFour?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  country?: string;
  currency: string;
  billingAddress?: any;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type PaymentMethodType = 
  | 'credit_card'
  | 'debit_card'
  | 'bank_account'
  | 'digital_wallet'
  | 'crypto_wallet'
  | 'hsa_fsa';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  userId: string;
  doctorId?: string;
  appointmentId?: string;
  status: InvoiceStatus;
  subtotal: number;
  taxAmount: number;
  discountAmount?: number;
  totalAmount: number;
  currency: string;
  dueDate?: string;
  paidAt?: string;
  paymentTerms: string;
  notes?: string;
  billingAddress?: any;
  lineItems: InvoiceLineItem[];
  metadata?: any;
  createdAt: string;
  updatedAt: string;
}

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled' | 'refunded';

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface InsuranceClaim {
  id: string;
  userId: string;
  invoiceId?: string;
  claimNumber: string;
  insuranceProvider: string;
  policyNumber: string;
  status: ClaimStatus;
  claimAmount: number;
  approvedAmount?: number;
  diagnosisCodes: string[];
  procedureCodes: string[];
  submittedAt?: string;
  processedAt?: string;
  denialReason?: string;
  metadata?: any;
  createdAt: string;
  updatedAt: string;
}

export type ClaimStatus = 'draft' | 'submitted' | 'processing' | 'approved' | 'denied' | 'paid';

export interface Subscription {
  id: string;
  userId: string;
  planName: string;
  status: SubscriptionStatus;
  billingCycle: BillingCycle;
  amount: number;
  currency: string;
  trialEndsAt?: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelledAt?: string;
  provider: string;
  externalSubscriptionId: string;
  paymentMethodId?: string;
  metadata?: any;
  createdAt: string;
  updatedAt: string;
}

export type SubscriptionStatus = 'active' | 'past_due' | 'cancelled' | 'paused' | 'trial';
export type BillingCycle = 'monthly' | 'quarterly' | 'yearly';

export interface CurrencyRate {
  id: string;
  baseCurrency: string;
  targetCurrency: string;
  rate: number;
  provider: string;
  validAt: string;
  createdAt: string;
}

export interface KYCVerification {
  id: string;
  userId: string;
  status: KYCStatus;
  verificationLevel: VerificationLevel;
  identityVerified: boolean;
  addressVerified: boolean;
  phoneVerified: boolean;
  documentType?: string;
  documentNumber?: string;
  documentExpiry?: string;
  verificationProvider?: string;
  riskScore?: number;
  verificationDate?: string;
  rejectionReason?: string;
  metadata?: any;
  createdAt: string;
  updatedAt: string;
}

export type KYCStatus = 'pending' | 'verified' | 'rejected' | 'expired';
export type VerificationLevel = 'basic' | 'enhanced' | 'premium';

export interface FraudAlert {
  id: string;
  userId?: string;
  transactionId?: string;
  alertType: FraudAlertType;
  riskScore: number;
  status: FraudStatus;
  description: string;
  triggeredRules: string[];
  ipAddress?: string;
  deviceInfo?: any;
  reviewedBy?: string;
  reviewedAt?: string;
  resolutionNotes?: string;
  createdAt: string;
}

export type FraudAlertType = 
  | 'suspicious_activity'
  | 'velocity_check'
  | 'geolocation'
  | 'device_fingerprint'
  | 'amount_threshold';

export type FraudStatus = 'open' | 'investigating' | 'resolved' | 'false_positive';

export interface HealthSavingsGoal {
  id: string;
  userId: string;
  goalName: string;
  targetAmount: number;
  currentAmount: number;
  currency: string;
  targetDate?: string;
  category?: string;
  isActive: boolean;
  autoContributeAmount?: number;
  autoContributeFrequency?: ContributionFrequency;
  createdAt: string;
  updatedAt: string;
}

export type ContributionFrequency = 'weekly' | 'monthly' | 'quarterly';
