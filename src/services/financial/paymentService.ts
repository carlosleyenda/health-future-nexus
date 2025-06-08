
import { supabase } from '@/integrations/supabase/client';
import { FinancialTransaction, HealthWallet, PaymentMethod } from '@/types/financial';

export class AdvancedPaymentService {
  // Stripe integration
  static async createStripePaymentIntent(amount: number, currency: string = 'USD', metadata: any = {}) {
    try {
      const response = await fetch('/api/stripe/payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency, metadata })
      });
      
      if (!response.ok) throw new Error('Payment intent creation failed');
      return await response.json();
    } catch (error) {
      console.error('Stripe payment intent error:', error);
      throw error;
    }
  }

  // PayPal integration
  static async createPayPalOrder(amount: number, currency: string = 'USD') {
    try {
      const response = await fetch('/api/paypal/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency })
      });
      
      if (!response.ok) throw new Error('PayPal order creation failed');
      return await response.json();
    } catch (error) {
      console.error('PayPal order error:', error);
      throw error;
    }
  }

  // Cryptocurrency payment with Coinbase Commerce
  static async createCryptoPayment(amount: number, currency: string = 'USD') {
    try {
      const response = await fetch('/api/coinbase/charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency })
      });
      
      if (!response.ok) throw new Error('Crypto payment creation failed');
      return await response.json();
    } catch (error) {
      console.error('Crypto payment error:', error);
      throw error;
    }
  }

  // Multi-currency exchange rates
  static async getExchangeRate(from: string, to: string): Promise<number> {
    try {
      const { data, error } = await supabase
        .from('currency_rates')
        .select('rate')
        .eq('base_currency', from)
        .eq('target_currency', to)
        .order('valid_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        // Fallback to external API
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
        const rates = await response.json();
        return rates.rates[to];
      }

      return data.rate;
    } catch (error) {
      console.error('Exchange rate error:', error);
      return 1;
    }
  }

  // Health wallet operations
  static async getHealthWallet(userId: string): Promise<HealthWallet | null> {
    try {
      const { data, error } = await supabase
        .from('health_wallets')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data ? this.mapHealthWalletFromDb(data) : null;
    } catch (error) {
      console.error('Error fetching health wallet:', error);
      return null;
    }
  }

  static async createHealthWallet(userId: string, currency: string = 'USD'): Promise<HealthWallet> {
    try {
      const { data, error } = await supabase
        .from('health_wallets')
        .insert({
          user_id: userId,
          currency: currency,
          balance: 0,
          health_coins: 0,
          cashback_earned: 0,
          loyalty_tier: 'bronze'
        })
        .select()
        .single();

      if (error) throw error;
      return this.mapHealthWalletFromDb(data);
    } catch (error) {
      console.error('Error creating health wallet:', error);
      throw error;
    }
  }

  static async updateWalletBalance(userId: string, amount: number, type: 'add' | 'subtract' = 'add'): Promise<HealthWallet> {
    try {
      const wallet = await this.getHealthWallet(userId);
      if (!wallet) throw new Error('Wallet not found');

      const newBalance = type === 'add' ? wallet.balance + amount : wallet.balance - amount;
      
      const { data, error } = await supabase
        .from('health_wallets')
        .update({ balance: newBalance })
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;
      return this.mapHealthWalletFromDb(data);
    } catch (error) {
      console.error('Error updating wallet balance:', error);
      throw error;
    }
  }

  // HealthCoins rewards system
  static async awardHealthCoins(userId: string, coins: number, reason: string): Promise<void> {
    try {
      const wallet = await this.getHealthWallet(userId);
      if (!wallet) throw new Error('Wallet not found');

      const { error } = await supabase
        .from('health_wallets')
        .update({ health_coins: wallet.healthCoins + coins })
        .eq('user_id', userId);

      if (error) throw error;

      // Log the transaction
      await this.createTransaction({
        userId,
        type: 'health_coins',
        amount: coins,
        currency: 'HC', // HealthCoins
        status: 'completed',
        description: reason,
        paymentMethod: 'health_coins',
        healthCoinsEarned: coins
      });
    } catch (error) {
      console.error('Error awarding HealthCoins:', error);
      throw error;
    }
  }

  // Cashback system
  static async processCashback(userId: string, transactionAmount: number, percentage: number = 0.02): Promise<void> {
    try {
      const cashbackAmount = transactionAmount * percentage;
      
      const wallet = await this.getHealthWallet(userId);
      if (!wallet) throw new Error('Wallet not found');

      const { error } = await supabase
        .from('health_wallets')
        .update({ 
          cashback_earned: wallet.cashbackEarned + cashbackAmount,
          balance: wallet.balance + cashbackAmount
        })
        .eq('user_id', userId);

      if (error) throw error;

      // Log cashback transaction
      await this.createTransaction({
        userId,
        type: 'cashback',
        amount: cashbackAmount,
        currency: wallet.currency,
        status: 'completed',
        description: `Cashback (${percentage * 100}%) from transaction`,
        paymentMethod: 'digital_wallet',
        cashbackAmount
      });
    } catch (error) {
      console.error('Error processing cashback:', error);
      throw error;
    }
  }

  // Transaction management
  static async createTransaction(transaction: Omit<FinancialTransaction, 'id' | 'createdAt'>): Promise<FinancialTransaction> {
    try {
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
          health_coins_earned: transaction.healthCoinsEarned,
          cashback_amount: transaction.cashbackAmount
        })
        .select()
        .single();

      if (error) throw error;
      return this.mapTransactionFromDb(data);
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  }

  static async getUserTransactions(userId: string, limit: number = 50): Promise<FinancialTransaction[]> {
    try {
      const { data, error } = await supabase
        .from('financial_transactions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data.map(this.mapTransactionFromDb);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return [];
    }
  }

  // Payment methods management
  static async addPaymentMethod(paymentMethod: Omit<PaymentMethod, 'id' | 'createdAt' | 'updatedAt'>): Promise<PaymentMethod> {
    try {
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
      return this.mapPaymentMethodFromDb(data);
    } catch (error) {
      console.error('Error adding payment method:', error);
      throw error;
    }
  }

  // Insurance claims processing
  static async submitInsuranceClaim(claim: any): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('insurance_claims')
        .insert({
          user_id: claim.userId,
          invoice_id: claim.invoiceId,
          claim_number: claim.claimNumber,
          insurance_provider: claim.insuranceProvider,
          policy_number: claim.policyNumber,
          claim_amount: claim.claimAmount,
          diagnosis_codes: claim.diagnosisCodes,
          procedure_codes: claim.procedureCodes,
          status: 'submitted',
          submitted_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error submitting insurance claim:', error);
      throw error;
    }
  }

  // Fraud detection
  static async checkForFraud(transaction: any): Promise<{ riskScore: number; isHighRisk: boolean }> {
    // Implement fraud detection logic
    const riskScore = Math.random() * 100; // Simplified for demo
    const isHighRisk = riskScore > 75;

    if (isHighRisk) {
      await supabase
        .from('fraud_alerts')
        .insert({
          user_id: transaction.userId,
          transaction_id: transaction.id,
          alert_type: 'suspicious_activity',
          risk_score: Math.floor(riskScore),
          description: 'High-risk transaction detected',
          triggered_rules: ['amount_threshold', 'velocity_check']
        });
    }

    return { riskScore, isHighRisk };
  }

  // Helper mapping methods
  private static mapHealthWalletFromDb(data: any): HealthWallet {
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
      autoPayEnabled: data.auto_pay_enabled
    };
  }

  private static mapTransactionFromDb(data: any): FinancialTransaction {
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
      healthCoinsEarned: data.health_coins_earned,
      cashbackAmount: data.cashback_amount ? parseFloat(data.cashback_amount) : undefined,
      createdAt: data.created_at,
      completedAt: data.completed_at
    };
  }

  private static mapPaymentMethodFromDb(data: any): PaymentMethod {
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
}
