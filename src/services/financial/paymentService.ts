import { supabase } from '@/integrations/supabase/client';
import type { 
  PaymentMethod, 
  Transaction, 
  HealthWallet, 
  Invoice, 
  InsuranceClaim,
  Subscription,
  CurrencyRate,
  KycVerification,
  FraudAlert,
  TaxDocument,
  HealthSavingsGoal
} from '@/types/financial';

export class PaymentService {
  // Health Wallet Management
  static async getHealthWallet(userId: string): Promise<HealthWallet | null> {
    const { data, error } = await supabase
      .from('health_wallets')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // No rows found
      throw error;
    }

    return {
      id: data.id,
      userId: data.user_id,
      balance: parseFloat(data.balance),
      currency: data.currency,
      healthCoins: data.health_coins,
      cashbackEarned: parseFloat(data.cashback_earned),
      loyaltyTier: data.loyalty_tier,
      hsaConnected: data.hsa_connected,
      cryptoEnabled: data.crypto_enabled,
      autoPayEnabled: data.auto_pay_enabled,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  }

  static async createHealthWallet(userId: string): Promise<HealthWallet> {
    const { data, error } = await supabase
      .from('health_wallets')
      .insert({
        user_id: userId,
        balance: 0.00,
        currency: 'USD',
        health_coins: 0,
        cashback_earned: 0.00,
        loyalty_tier: 'bronze'
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      userId: data.user_id,
      balance: parseFloat(data.balance),
      currency: data.currency,
      healthCoins: data.health_coins,
      cashbackEarned: parseFloat(data.cashback_earned),
      loyaltyTier: data.loyalty_tier,
      hsaConnected: data.hsa_connected,
      cryptoEnabled: data.crypto_enabled,
      autoPayEnabled: data.auto_pay_enabled,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  }

  // Transaction Management
  static async getTransactions(userId: string): Promise<Transaction[]> {
    const { data, error } = await supabase
      .from('financial_transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(tx => ({
      id: tx.id,
      userId: tx.user_id,
      type: tx.type,
      amount: parseFloat(tx.amount),
      currency: tx.currency,
      status: tx.status,
      description: tx.description,
      appointmentId: tx.appointment_id,
      deliveryServiceId: tx.delivery_service_id,
      pharmacyOrderId: tx.pharmacy_order_id,
      paymentMethod: tx.payment_method,
      paymentProvider: tx.payment_provider,
      externalTransactionId: tx.external_transaction_id,
      healthCoinsEarned: tx.health_coins_earned || 0,
      cashbackAmount: parseFloat(tx.cashback_amount || '0'),
      taxAmount: parseFloat(tx.tax_amount || '0'),
      insuranceCoveredAmount: parseFloat(tx.insurance_covered_amount || '0'),
      metadata: tx.metadata || {},
      createdAt: tx.created_at,
      completedAt: tx.completed_at
    }));
  }

  static async createTransaction(transaction: Omit<Transaction, 'id' | 'createdAt' | 'completedAt'>): Promise<Transaction> {
    const { data, error } = await supabase
      .from('financial_transactions')
      .insert({
        user_id: transaction.userId,
        type: transaction.type,
        amount: transaction.amount,
        currency: transaction.currency,
        status: transaction.status,
        description: transaction.description,
        appointment_id: transaction.appointmentId,
        delivery_service_id: transaction.deliveryServiceId,
        pharmacy_order_id: transaction.pharmacyOrderId,
        payment_method: transaction.paymentMethod,
        payment_provider: transaction.paymentProvider,
        external_transaction_id: transaction.externalTransactionId,
        health_coins_earned: transaction.healthCoinsEarned,
        cashback_amount: transaction.cashbackAmount,
        tax_amount: transaction.taxAmount,
        insurance_covered_amount: transaction.insuranceCoveredAmount,
        metadata: transaction.metadata
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      userId: data.user_id,
      type: data.type,
      amount: parseFloat(data.amount),
      currency: data.currency,
      status: data.status,
      description: data.description,
      appointmentId: data.appointment_id,
      deliveryServiceId: data.delivery_service_id,
      pharmacyOrderId: data.pharmacy_order_id,
      paymentMethod: data.payment_method,
      paymentProvider: data.payment_provider,
      externalTransactionId: data.external_transaction_id,
      healthCoinsEarned: data.health_coins_earned || 0,
      cashbackAmount: parseFloat(data.cashback_amount || '0'),
      taxAmount: parseFloat(data.tax_amount || '0'),
      insuranceCoveredAmount: parseFloat(data.insurance_covered_amount || '0'),
      metadata: data.metadata || {},
      createdAt: data.created_at,
      completedAt: data.completed_at
    };
  }

  // Payment Methods
  static async getPaymentMethods(userId: string): Promise<PaymentMethod[]> {
    const { data, error } = await supabase
      .from('payment_methods')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(pm => ({
      id: pm.id,
      userId: pm.user_id,
      type: pm.type,
      provider: pm.provider,
      externalId: pm.external_id,
      isDefault: pm.is_default,
      lastFour: pm.last_four,
      brand: pm.brand,
      expiryMonth: pm.expiry_month,
      expiryYear: pm.expiry_year,
      country: pm.country,
      currency: pm.currency,
      billingAddress: pm.billing_address,
      isVerified: pm.is_verified,
      isActive: pm.is_active,
      createdAt: pm.created_at,
      updatedAt: pm.updated_at
    }));
  }

  static async addPaymentMethod(paymentMethod: Omit<PaymentMethod, 'id' | 'createdAt' | 'updatedAt'>): Promise<PaymentMethod> {
    const { data, error } = await supabase
      .from('payment_methods')
      .insert({
        user_id: paymentMethod.userId,
        type: paymentMethod.type,
        provider: paymentMethod.provider,
        external_id: paymentMethod.externalId,
        is_default: paymentMethod.isDefault,
        last_four: paymentMethod.lastFour,
        brand: paymentMethod.brand,
        expiry_month: paymentMethod.expiryMonth,
        expiry_year: paymentMethod.expiryYear,
        country: paymentMethod.country,
        currency: paymentMethod.currency,
        billing_address: paymentMethod.billingAddress,
        is_verified: paymentMethod.isVerified,
        is_active: paymentMethod.isActive
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      userId: data.user_id,
      type: data.type,
      provider: data.provider,
      externalId: data.external_id,
      isDefault: data.is_default,
      lastFour: data.last_four,
      brand: data.brand,
      expiryMonth: data.expiry_month,
      expiryYear: data.expiry_year,
      country: data.country,
      currency: data.currency,
      billingAddress: data.billing_address,
      isVerified: data.is_verified,
      isActive: data.is_active,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  }

  // Invoices
  static async getInvoices(userId: string): Promise<Invoice[]> {
    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(inv => ({
      id: inv.id,
      invoiceNumber: inv.invoice_number,
      userId: inv.user_id,
      doctorId: inv.doctor_id,
      appointmentId: inv.appointment_id,
      status: inv.status,
      subtotal: parseFloat(inv.subtotal),
      taxAmount: parseFloat(inv.tax_amount),
      discountAmount: parseFloat(inv.discount_amount || '0'),
      totalAmount: parseFloat(inv.total_amount),
      currency: inv.currency,
      dueDate: inv.due_date,
      paidAt: inv.paid_at,
      paymentTerms: inv.payment_terms,
      notes: inv.notes,
      billingAddress: inv.billing_address,
      lineItems: inv.line_items as Array<{
        description: string;
        quantity: number;
        unitPrice: number;
        totalPrice: number;
      }>,
      metadata: inv.metadata || {},
      createdAt: inv.created_at,
      updatedAt: inv.updated_at
    }));
  }

  static async createInvoice(invoice: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>): Promise<Invoice> {
    const { data, error } = await supabase
      .from('invoices')
      .insert({
        invoice_number: invoice.invoiceNumber,
        user_id: invoice.userId,
        doctor_id: invoice.doctorId,
        appointment_id: invoice.appointmentId,
        status: invoice.status,
        subtotal: invoice.subtotal,
        tax_amount: invoice.taxAmount,
        discount_amount: invoice.discountAmount,
        total_amount: invoice.totalAmount,
        currency: invoice.currency,
        due_date: invoice.dueDate,
        paid_at: invoice.paidAt,
        payment_terms: invoice.paymentTerms,
        notes: invoice.notes,
        billing_address: invoice.billingAddress,
        line_items: invoice.lineItems,
        metadata: invoice.metadata
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      invoiceNumber: data.invoice_number,
      userId: data.user_id,
      doctorId: data.doctor_id,
      appointmentId: data.appointment_id,
      status: data.status,
      subtotal: parseFloat(data.subtotal),
      taxAmount: parseFloat(data.tax_amount),
      discountAmount: parseFloat(data.discount_amount || '0'),
      totalAmount: parseFloat(data.total_amount),
      currency: data.currency,
      dueDate: data.due_date,
      paidAt: data.paid_at,
      paymentTerms: data.payment_terms,
      notes: data.notes,
      billingAddress: data.billing_address,
      lineItems: data.line_items as Array<{
        description: string;
        quantity: number;
        unitPrice: number;
        totalPrice: number;
      }>,
      metadata: data.metadata || {},
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  }

  // Insurance Claims
  static async getInsuranceClaims(userId: string): Promise<InsuranceClaim[]> {
    const { data, error } = await supabase
      .from('insurance_claims')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(claim => ({
      id: claim.id,
      userId: claim.user_id,
      invoiceId: claim.invoice_id,
      claimNumber: claim.claim_number,
      insuranceProvider: claim.insurance_provider,
      policyNumber: claim.policy_number,
      status: claim.status,
      claimAmount: parseFloat(claim.claim_amount),
      approvedAmount: claim.approved_amount ? parseFloat(claim.approved_amount) : undefined,
      diagnosisCodes: claim.diagnosis_codes || [],
      procedureCodes: claim.procedure_codes || [],
      submittedAt: claim.submitted_at,
      processedAt: claim.processed_at,
      denialReason: claim.denial_reason,
      metadata: claim.metadata || {},
      createdAt: claim.created_at,
      updatedAt: claim.updated_at
    }));
  }

  static async submitInsuranceClaim(claim: Omit<InsuranceClaim, 'id' | 'createdAt' | 'updatedAt'>): Promise<InsuranceClaim> {
    const { data, error } = await supabase
      .from('insurance_claims')
      .insert({
        user_id: claim.userId,
        invoice_id: claim.invoiceId,
        claim_number: claim.claimNumber,
        insurance_provider: claim.insuranceProvider,
        policy_number: claim.policyNumber,
        status: claim.status,
        claim_amount: claim.claimAmount,
        approved_amount: claim.approvedAmount,
        diagnosis_codes: claim.diagnosisCodes,
        procedure_codes: claim.procedureCodes,
        submitted_at: claim.submittedAt,
        processed_at: claim.processedAt,
        denial_reason: claim.denialReason,
        metadata: claim.metadata
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      userId: data.user_id,
      invoiceId: data.invoice_id,
      claimNumber: data.claim_number,
      insuranceProvider: data.insurance_provider,
      policyNumber: data.policy_number,
      status: data.status,
      claimAmount: parseFloat(data.claim_amount),
      approvedAmount: data.approved_amount ? parseFloat(data.approved_amount) : undefined,
      diagnosisCodes: data.diagnosis_codes || [],
      procedureCodes: data.procedure_codes || [],
      submittedAt: data.submitted_at,
      processedAt: data.processed_at,
      denialReason: data.denial_reason,
      metadata: data.metadata || {},
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  }

  // Subscriptions
  static async getSubscriptions(userId: string): Promise<Subscription[]> {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(sub => ({
      id: sub.id,
      userId: sub.user_id,
      planName: sub.plan_name,
      status: sub.status,
      billingCycle: sub.billing_cycle,
      amount: parseFloat(sub.amount),
      currency: sub.currency,
      trialEndsAt: sub.trial_ends_at,
      currentPeriodStart: sub.current_period_start,
      currentPeriodEnd: sub.current_period_end,
      cancelledAt: sub.cancelled_at,
      provider: sub.provider,
      externalSubscriptionId: sub.external_subscription_id,
      paymentMethodId: sub.payment_method_id,
      metadata: sub.metadata || {},
      createdAt: sub.created_at,
      updatedAt: sub.updated_at
    }));
  }

  static async createSubscription(subscription: Omit<Subscription, 'id' | 'createdAt' | 'updatedAt'>): Promise<Subscription> {
    const { data, error } = await supabase
      .from('subscriptions')
      .insert({
        user_id: subscription.userId,
        plan_name: subscription.planName,
        status: subscription.status,
        billing_cycle: subscription.billingCycle,
        amount: subscription.amount,
        currency: subscription.currency,
        trial_ends_at: subscription.trialEndsAt,
        current_period_start: subscription.currentPeriodStart,
        current_period_end: subscription.currentPeriodEnd,
        cancelled_at: subscription.cancelledAt,
        provider: subscription.provider,
        external_subscription_id: subscription.externalSubscriptionId,
        payment_method_id: subscription.paymentMethodId,
        metadata: subscription.metadata
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      userId: data.user_id,
      planName: data.plan_name,
      status: data.status,
      billingCycle: data.billing_cycle,
      amount: parseFloat(data.amount),
      currency: data.currency,
      trialEndsAt: data.trial_ends_at,
      currentPeriodStart: data.current_period_start,
      currentPeriodEnd: data.current_period_end,
      cancelledAt: data.cancelled_at,
      provider: data.provider,
      externalSubscriptionId: data.external_subscription_id,
      paymentMethodId: data.payment_method_id,
      metadata: data.metadata || {},
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  }

  // Exchange Rates
  static async getExchangeRates(): Promise<CurrencyRate[]> {
    const { data, error } = await supabase
      .from('currency_rates')
      .select('*')
      .order('valid_at', { ascending: false });

    if (error) throw error;

    return data.map(rate => ({
      id: rate.id,
      baseCurrency: rate.base_currency,
      targetCurrency: rate.target_currency,
      rate: parseFloat(rate.rate),
      provider: rate.provider,
      validAt: rate.valid_at,
      createdAt: rate.created_at
    }));
  }

  // KYC Verification
  static async getKycVerification(userId: string): Promise<KycVerification | null> {
    const { data, error } = await supabase
      .from('kyc_verifications')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return {
      id: data.id,
      userId: data.user_id,
      status: data.status,
      verificationLevel: data.verification_level,
      identityVerified: data.identity_verified,
      addressVerified: data.address_verified,
      phoneVerified: data.phone_verified,
      documentType: data.document_type,
      documentNumber: data.document_number,
      documentExpiry: data.document_expiry,
      verificationProvider: data.verification_provider,
      riskScore: data.risk_score,
      verificationDate: data.verification_date,
      rejectionReason: data.rejection_reason,
      metadata: data.metadata || {},
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  }

  // Fraud Alerts
  static async getFraudAlerts(): Promise<FraudAlert[]> {
    const { data, error } = await supabase
      .from('fraud_alerts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(alert => ({
      id: alert.id,
      userId: alert.user_id,
      transactionId: alert.transaction_id,
      alertType: alert.alert_type,
      riskScore: alert.risk_score,
      status: alert.status,
      description: alert.description,
      triggeredRules: alert.triggered_rules || [],
      ipAddress: alert.ip_address,
      deviceInfo: alert.device_info,
      reviewedBy: alert.reviewed_by,
      reviewedAt: alert.reviewed_at,
      resolutionNotes: alert.resolution_notes,
      createdAt: alert.created_at
    }));
  }

  // Tax Documents
  static async getTaxDocuments(userId: string): Promise<TaxDocument[]> {
    const { data, error } = await supabase
      .from('tax_documents')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(doc => ({
      id: doc.id,
      userId: doc.user_id,
      documentType: doc.document_type,
      taxYear: doc.tax_year,
      totalAmount: parseFloat(doc.total_amount),
      taxAmount: parseFloat(doc.tax_amount),
      currency: doc.currency,
      jurisdiction: doc.jurisdiction,
      documentUrl: doc.document_url,
      status: doc.status,
      metadata: doc.metadata || {},
      createdAt: doc.created_at,
      updatedAt: doc.updated_at
    }));
  }

  // Health Savings Goals
  static async getHealthSavingsGoals(userId: string): Promise<HealthSavingsGoal[]> {
    const { data, error } = await supabase
      .from('health_savings_goals')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(goal => ({
      id: goal.id,
      userId: goal.user_id,
      goalName: goal.goal_name,
      targetAmount: parseFloat(goal.target_amount),
      currentAmount: parseFloat(goal.current_amount),
      currency: goal.currency,
      targetDate: goal.target_date,
      category: goal.category,
      isActive: goal.is_active,
      autoContributeAmount: goal.auto_contribute_amount ? parseFloat(goal.auto_contribute_amount) : undefined,
      autoContributeFrequency: goal.auto_contribute_frequency,
      createdAt: goal.created_at,
      updatedAt: goal.updated_at
    }));
  }

  static async createHealthSavingsGoal(goal: Omit<HealthSavingsGoal, 'id' | 'createdAt' | 'updatedAt'>): Promise<HealthSavingsGoal> {
    const { data, error } = await supabase
      .from('health_savings_goals')
      .insert({
        user_id: goal.userId,
        goal_name: goal.goalName,
        target_amount: goal.targetAmount,
        current_amount: goal.currentAmount,
        currency: goal.currency,
        target_date: goal.targetDate,
        category: goal.category,
        is_active: goal.isActive,
        auto_contribute_amount: goal.autoContributeAmount,
        auto_contribute_frequency: goal.autoContributeFrequency
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      userId: data.user_id,
      goalName: data.goal_name,
      targetAmount: parseFloat(data.target_amount),
      currentAmount: parseFloat(data.current_amount),
      currency: data.currency,
      targetDate: data.target_date,
      category: data.category,
      isActive: data.is_active,
      autoContributeAmount: data.auto_contribute_amount ? parseFloat(data.auto_contribute_amount) : undefined,
      autoContributeFrequency: data.auto_contribute_frequency,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  }
}
