
import { supabase } from '@/integrations/supabase/client';
import type { 
  PaymentMethod, 
  Transaction, 
  HealthWallet, 
  Invoice, 
  InsuranceClaim,
  Subscription,
  HealthSavingsGoal,
  CurrencyRate,
  KycVerification,
  FraudAlert,
  TaxDocument
} from '@/types/financial';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class PaymentService {
  static async getHealthWallet(userId: string): Promise<HealthWallet | null> {
    await delay(300);
    
    // Mock data for development
    return {
      id: crypto.randomUUID(),
      userId: userId,
      balance: 1250.75,
      currency: 'USD',
      healthCoins: 2840,
      cashbackEarned: 127.50,
      loyaltyTier: 'gold',
      hsaConnected: true,
      cryptoEnabled: false,
      autoPayEnabled: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  static async getTransactions(userId: string): Promise<Transaction[]> {
    await delay(400);
    
    return [
      {
        id: crypto.randomUUID(),
        userId: userId,
        type: 'consultation' as const,
        amount: 150.00,
        currency: 'USD',
        status: 'completed' as const,
        description: 'Consulta médica virtual',
        appointmentId: crypto.randomUUID(),
        deliveryServiceId: undefined,
        pharmacyOrderId: undefined,
        paymentMethod: 'credit_card',
        paymentProvider: 'stripe',
        externalTransactionId: 'txn_' + crypto.randomUUID(),
        healthCoinsEarned: 15,
        cashbackAmount: 3.00,
        taxAmount: 12.00,
        insuranceCoveredAmount: 120.00,
        metadata: { consulta_tipo: 'virtual' },
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      }
    ];
  }

  static async getPaymentMethods(userId: string): Promise<PaymentMethod[]> {
    await delay(300);
    
    return [
      {
        id: crypto.randomUUID(),
        userId: userId,
        type: 'credit_card' as const,
        provider: 'stripe',
        externalId: 'pm_' + crypto.randomUUID(),
        isDefault: true,
        lastFour: '4242',
        brand: 'visa',
        expiryMonth: 12,
        expiryYear: 2027,
        country: 'US',
        currency: 'USD',
        billingAddress: {
          line1: '123 Main St',
          city: 'New York',
          state: 'NY',
          postal_code: '10001',
          country: 'US'
        },
        isVerified: true,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }

  static async createTransaction(transaction: Omit<Transaction, 'id' | 'createdAt' | 'completedAt'>): Promise<Transaction> {
    await delay(500);
    
    return {
      ...transaction,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      completedAt: transaction.status === 'completed' ? new Date().toISOString() : undefined
    };
  }

  static async addPaymentMethod(paymentMethod: Omit<PaymentMethod, 'id' | 'createdAt' | 'updatedAt'>): Promise<PaymentMethod> {
    await delay(600);
    
    return {
      ...paymentMethod,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  static async getInvoices(userId: string): Promise<Invoice[]> {
    await delay(400);
    
    return [
      {
        id: crypto.randomUUID(),
        invoiceNumber: 'INV-2024-001',
        userId: userId,
        doctorId: crypto.randomUUID(),
        appointmentId: crypto.randomUUID(),
        status: 'paid' as const,
        subtotal: 150.00,
        taxAmount: 12.00,
        discountAmount: 0.00,
        totalAmount: 162.00,
        currency: 'USD',
        dueDate: '2024-07-15',
        paidAt: new Date().toISOString(),
        paymentTerms: 'Due on receipt',
        notes: 'Consulta médica virtual',
        billingAddress: {
          name: 'John Doe',
          line1: '123 Main St',
          city: 'New York',
          state: 'NY',
          postal_code: '10001',
          country: 'US'
        },
        lineItems: [
          {
            description: 'Consulta médica virtual',
            quantity: 1,
            unitPrice: 150.00,
            totalPrice: 150.00
          }
        ],
        metadata: { tipo_consulta: 'virtual' },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }

  static async createInvoice(invoice: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>): Promise<Invoice> {
    await delay(500);
    
    return {
      ...invoice,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  static async getInsuranceClaims(userId: string): Promise<InsuranceClaim[]> {
    await delay(400);
    
    return [
      {
        id: crypto.randomUUID(),
        userId: userId,
        invoiceId: crypto.randomUUID(),
        claimNumber: 'CLM-2024-001',
        insuranceProvider: 'Blue Cross Blue Shield',
        policyNumber: 'BCBS123456789',
        status: 'approved' as const,
        claimAmount: 150.00,
        approvedAmount: 120.00,
        diagnosisCodes: ['Z00.00'],
        procedureCodes: ['99213'],
        submittedAt: new Date().toISOString(),
        processedAt: new Date().toISOString(),
        denialReason: undefined,
        metadata: { tipo_reclamo: 'consulta' },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }

  static async submitInsuranceClaim(claim: Omit<InsuranceClaim, 'id' | 'createdAt' | 'updatedAt'>): Promise<InsuranceClaim> {
    await delay(600);
    
    return {
      ...claim,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  static async getSubscriptions(userId: string): Promise<Subscription[]> {
    await delay(300);
    
    return [
      {
        id: crypto.randomUUID(),
        userId: userId,
        planName: 'Premium Health Plan',
        status: 'active' as const,
        billingCycle: 'monthly' as const,
        amount: 29.99,
        currency: 'USD',
        trialEndsAt: undefined,
        currentPeriodStart: new Date().toISOString(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        cancelledAt: undefined,
        provider: 'stripe',
        externalSubscriptionId: 'sub_' + crypto.randomUUID(),
        paymentMethodId: crypto.randomUUID(),
        metadata: { plan_type: 'premium' },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }

  static async createSubscription(subscription: Omit<Subscription, 'id' | 'createdAt' | 'updatedAt'>): Promise<Subscription> {
    await delay(500);
    
    return {
      ...subscription,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  static async getHealthSavingsGoals(userId: string): Promise<HealthSavingsGoal[]> {
    await delay(300);
    
    return [
      {
        id: crypto.randomUUID(),
        userId: userId,
        goalName: 'Emergency Medical Fund',
        targetAmount: 5000.00,
        currentAmount: 1250.75,
        currency: 'USD',
        targetDate: '2024-12-31',
        category: 'emergency',
        isActive: true,
        autoContributeAmount: 100.00,
        autoContributeFrequency: 'monthly' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }

  static async createHealthSavingsGoal(goal: Omit<HealthSavingsGoal, 'id' | 'createdAt' | 'updatedAt'>): Promise<HealthSavingsGoal> {
    await delay(500);
    
    return {
      ...goal,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  static async getExchangeRates(): Promise<CurrencyRate[]> {
    await delay(200);
    
    return [
      {
        id: crypto.randomUUID(),
        baseCurrency: 'USD',
        targetCurrency: 'EUR',
        rate: 0.85,
        provider: 'xe.com',
        validAt: new Date().toISOString(),
        createdAt: new Date().toISOString()
      },
      {
        id: crypto.randomUUID(),
        baseCurrency: 'USD',
        targetCurrency: 'MXN',
        rate: 17.50,
        provider: 'xe.com',
        validAt: new Date().toISOString(),
        createdAt: new Date().toISOString()
      }
    ];
  }

  static async getKycVerification(userId: string): Promise<KycVerification | null> {
    await delay(300);
    
    return {
      id: crypto.randomUUID(),
      userId: userId,
      status: 'verified' as const,
      verificationLevel: 'enhanced' as const,
      identityVerified: true,
      addressVerified: true,
      phoneVerified: true,
      documentType: 'passport',
      documentNumber: 'P123456789',
      documentExpiry: '2029-12-31',
      verificationProvider: 'jumio',
      riskScore: 15,
      verificationDate: new Date().toISOString(),
      rejectionReason: undefined,
      metadata: { verification_method: 'automated' },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  static async getFraudAlerts(): Promise<FraudAlert[]> {
    await delay(300);
    
    return [
      {
        id: crypto.randomUUID(),
        userId: crypto.randomUUID(),
        transactionId: crypto.randomUUID(),
        alertType: 'velocity_check' as const,
        riskScore: 75,
        status: 'investigating' as const,
        description: 'Multiple transactions in short time period',
        triggeredRules: ['velocity_rule_1', 'amount_threshold_rule'],
        ipAddress: '192.168.1.1',
        deviceInfo: { browser: 'Chrome', os: 'Windows' },
        reviewedBy: undefined,
        reviewedAt: undefined,
        resolutionNotes: undefined,
        createdAt: new Date().toISOString()
      }
    ];
  }

  static async getTaxDocuments(userId: string): Promise<TaxDocument[]> {
    await delay(300);
    
    return [
      {
        id: crypto.randomUUID(),
        userId: userId,
        documentType: '1099' as const,
        taxYear: 2024,
        totalAmount: 1500.00,
        taxAmount: 120.00,
        currency: 'USD',
        jurisdiction: 'US',
        documentUrl: 'https://example.com/tax-doc.pdf',
        status: 'generated' as const,
        metadata: { form_type: '1099-MISC' },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }
}

// Export individual service classes for specific functionality
export class AdvancedPaymentService extends PaymentService {
  static async processMultiCurrencyPayment(amount: number, fromCurrency: string, toCurrency: string) {
    await delay(800);
    const rates = await this.getExchangeRates();
    const rate = rates.find(r => r.baseCurrency === fromCurrency && r.targetCurrency === toCurrency);
    
    if (!rate) {
      throw new Error(`Exchange rate not found for ${fromCurrency} to ${toCurrency}`);
    }
    
    return {
      originalAmount: amount,
      convertedAmount: amount * rate.rate,
      exchangeRate: rate.rate,
      fees: amount * 0.029, // 2.9% processing fee
      totalCost: amount + (amount * 0.029)
    };
  }

  static async validatePaymentCompliance(paymentData: any) {
    await delay(400);
    
    return {
      isCompliant: true,
      checks: {
        amlCompliant: true,
        kycVerified: true,
        sanctionsChecked: true,
        riskAssessment: 'low'
      },
      requiredActions: []
    };
  }
}
