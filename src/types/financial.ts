
// Financial system types

export interface PaymentMethod {
  id: string;
  userId: string;
  type: 'credit_card' | 'debit_card' | 'bank_account' | 'digital_wallet' | 'crypto_wallet' | 'hsa_fsa';
  provider: string;
  externalId: string;
  isDefault: boolean;
  lastFour?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  country?: string;
  currency: string;
  billingAddress?: Record<string, any>;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'consultation' | 'prescription' | 'delivery_service' | 'pharmacy_order' | 'insurance_claim' | 'refund' | 'cashback' | 'health_coins' | 'subscription' | 'medical_loan';
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  description: string;
  appointmentId?: string;
  deliveryServiceId?: string;
  pharmacyOrderId?: string;
  paymentMethod: string;
  paymentProvider?: string;
  externalTransactionId?: string;
  healthCoinsEarned: number;
  cashbackAmount: number;
  taxAmount: number;
  insuranceCoveredAmount: number;
  metadata: Record<string, any>;
  createdAt: string;
  completedAt?: string;
}

export interface HealthWallet {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  healthCoins: number;
  cashbackEarned: number;
  loyaltyTier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  hsaConnected: boolean;
  cryptoEnabled: boolean;
  autoPayEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  userId: string;
  doctorId?: string;
  appointmentId?: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled' | 'refunded';
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  currency: string;
  dueDate?: string;
  paidAt?: string;
  paymentTerms: string;
  notes?: string;
  billingAddress?: Record<string, any>;
  lineItems: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }>;
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface InsuranceClaim {
  id: string;
  userId: string;
  invoiceId?: string;
  claimNumber: string;
  insuranceProvider: string;
  policyNumber: string;
  status: 'draft' | 'submitted' | 'processing' | 'approved' | 'denied' | 'paid';
  claimAmount: number;
  approvedAmount?: number;
  diagnosisCodes: string[];
  procedureCodes: string[];
  submittedAt?: string;
  processedAt?: string;
  denialReason?: string;
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  planName: string;
  status: 'active' | 'past_due' | 'cancelled' | 'paused' | 'trial';
  billingCycle: 'monthly' | 'quarterly' | 'yearly';
  amount: number;
  currency: string;
  trialEndsAt?: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelledAt?: string;
  provider: string;
  externalSubscriptionId: string;
  paymentMethodId: string;
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface CurrencyRate {
  id: string;
  baseCurrency: string;
  targetCurrency: string;
  rate: number;
  provider: string;
  validAt: string;
  createdAt: string;
}

export interface KycVerification {
  id: string;
  userId: string;
  status: 'pending' | 'verified' | 'rejected' | 'expired';
  verificationLevel: 'basic' | 'enhanced' | 'premium';
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
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface FraudAlert {
  id: string;
  userId?: string;
  transactionId?: string;
  alertType: 'suspicious_activity' | 'velocity_check' | 'geolocation' | 'device_fingerprint' | 'amount_threshold';
  riskScore: number;
  status: 'open' | 'investigating' | 'resolved' | 'false_positive';
  description: string;
  triggeredRules: string[];
  ipAddress?: string;
  deviceInfo?: Record<string, any>;
  reviewedBy?: string;
  reviewedAt?: string;
  resolutionNotes?: string;
  createdAt: string;
}

export interface TaxDocument {
  id: string;
  userId: string;
  documentType: '1099' | 'invoice' | 'receipt' | 'statement';
  taxYear: number;
  totalAmount: number;
  taxAmount: number;
  currency: string;
  jurisdiction: string;
  documentUrl?: string;
  status: 'draft' | 'generated' | 'sent' | 'filed';
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

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
  autoContributeFrequency?: 'weekly' | 'monthly' | 'quarterly';
  createdAt: string;
  updatedAt: string;
}
