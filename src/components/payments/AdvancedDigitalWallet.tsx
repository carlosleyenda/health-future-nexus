
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Wallet, 
  CreditCard, 
  Coins, 
  TrendingUp, 
  Shield, 
  Gift, 
  Target,
  ExternalLink,
  Plus,
  ArrowUp,
  ArrowDown,
  DollarSign
} from 'lucide-react';
import { AdvancedPaymentService } from '@/services/financial/paymentService';
import { HealthWallet, FinancialTransaction } from '@/types/financial';

interface AdvancedDigitalWalletProps {
  userId: string;
}

export default function AdvancedDigitalWallet({ userId }: AdvancedDigitalWalletProps) {
  const [wallet, setWallet] = useState<HealthWallet | null>(null);
  const [transactions, setTransactions] = useState<FinancialTransaction[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [isLoading, setIsLoading] = useState(true);

  const currencies = ['USD', 'EUR', 'GBP', 'MXN', 'CAD', 'BTC', 'ETH'];
  
  useEffect(() => {
    loadWalletData();
  }, [userId]);

  const loadWalletData = async () => {
    try {
      setIsLoading(true);
      
      let walletData = await AdvancedPaymentService.getHealthWallet(userId);
      if (!walletData) {
        walletData = await AdvancedPaymentService.createHealthWallet(userId, selectedCurrency);
      }
      
      const transactionData = await AdvancedPaymentService.getUserTransactions(userId, 10);
      
      setWallet(walletData);
      setTransactions(transactionData);
    } catch (error) {
      console.error('Error loading wallet data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddFunds = async (amount: number) => {
    try {
      await AdvancedPaymentService.updateWalletBalance(userId, amount, 'add');
      loadWalletData();
    } catch (error) {
      console.error('Error adding funds:', error);
    }
  };

  const handleCurrencyExchange = async (fromCurrency: string, toCurrency: string, amount: number) => {
    try {
      const exchangeRate = await AdvancedPaymentService.getExchangeRate(fromCurrency, toCurrency);
      const convertedAmount = amount * exchangeRate;
      
      // Update wallet with converted amount
      await AdvancedPaymentService.updateWalletBalance(userId, convertedAmount, 'add');
      loadWalletData();
    } catch (error) {
      console.error('Error exchanging currency:', error);
    }
  };

  const getLoyaltyTierColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return 'bg-amber-100 text-amber-800';
      case 'silver': return 'bg-gray-100 text-gray-800';
      case 'gold': return 'bg-yellow-100 text-yellow-800';
      case 'platinum': return 'bg-blue-100 text-blue-800';
      case 'diamond': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLoyaltyProgress = (tier: string) => {
    const tierProgress = {
      bronze: 20,
      silver: 40,
      gold: 60,
      platinum: 80,
      diamond: 100
    };
    return tierProgress[tier as keyof typeof tierProgress] || 0;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-gray-200 rounded-lg"></div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Wallet Header with Multi-Currency Balance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Wallet className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Mi Wallet Digital</CardTitle>
                  <p className="text-sm text-gray-600">Balance principal</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-50 border-green-200">
                  <Shield className="h-3 w-3 mr-1 text-green-600" />
                  Seguro
                </Badge>
                <Badge className={getLoyaltyTierColor(wallet?.loyaltyTier || 'bronze')}>
                  {wallet?.loyaltyTier?.toUpperCase()}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-gray-900">
                  ${wallet?.balance.toLocaleString() || '0.00'}
                </span>
                <span className="text-lg text-gray-500 mb-1">{wallet?.currency}</span>
              </div>
              
              {/* Multi-currency display */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-sm text-gray-500">HealthCoins</div>
                  <div className="flex items-center justify-center gap-1">
                    <Coins className="h-4 w-4 text-amber-500" />
                    <span className="font-semibold">{wallet?.healthCoins || 0}</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500">Cashback</div>
                  <div className="flex items-center justify-center gap-1">
                    <Gift className="h-4 w-4 text-green-500" />
                    <span className="font-semibold">${wallet?.cashbackEarned || 0}</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500">Ahorros HSA</div>
                  <div className="flex items-center justify-center gap-1">
                    <Target className="h-4 w-4 text-blue-500" />
                    <span className="font-semibold">$2,450</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loyalty Tier Progress */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Programa de Lealtad
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Nivel {wallet?.loyaltyTier?.toUpperCase()}</span>
                  <span>{getLoyaltyProgress(wallet?.loyaltyTier || 'bronze')}%</span>
                </div>
                <Progress value={getLoyaltyProgress(wallet?.loyaltyTier || 'bronze')} className="h-2" />
              </div>
              
              <div className="text-center pt-2">
                <div className="text-2xl font-bold text-blue-600 mb-1">2,150</div>
                <div className="text-xs text-gray-500">puntos para siguiente nivel</div>
              </div>
              
              <Button variant="outline" size="sm" className="w-full">
                Ver Beneficios
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              onClick={() => handleAddFunds(100)} 
              className="flex flex-col gap-2 h-20"
            >
              <Plus className="h-5 w-5" />
              <span className="text-sm">Agregar Fondos</span>
            </Button>
            
            <Button variant="outline" className="flex flex-col gap-2 h-20">
              <ArrowUp className="h-5 w-5" />
              <span className="text-sm">Enviar Dinero</span>
            </Button>
            
            <Button variant="outline" className="flex flex-col gap-2 h-20">
              <CreditCard className="h-5 w-5" />
              <span className="text-sm">Pagar Cita</span>
            </Button>
            
            <Button variant="outline" className="flex flex-col gap-2 h-20">
              <DollarSign className="h-5 w-5" />
              <span className="text-sm">Cambiar Divisa</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Multi-Currency Exchange */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <ArrowUp className="h-5 w-5 text-green-600" />
            Intercambio de Divisas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {currencies.map((currency) => (
              <div key={currency} className="text-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="font-semibold">{currency}</div>
                <div className="text-sm text-gray-500">
                  {currency === 'USD' ? '$1.00' : 
                   currency === 'EUR' ? '€0.85' :
                   currency === 'GBP' ? '£0.73' :
                   currency === 'MXN' ? '$17.50' :
                   currency === 'BTC' ? '₿0.000025' :
                   currency === 'ETH' ? 'Ξ0.0004' : '$1.25'}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Transacciones Recientes</CardTitle>
            <Button variant="outline" size="sm">
              Ver Todas
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.length > 0 ? transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'consultation' ? 'bg-blue-100' :
                    transaction.type === 'cashback' ? 'bg-green-100' :
                    transaction.type === 'health_coins' ? 'bg-amber-100' :
                    'bg-gray-100'
                  }`}>
                    {transaction.type === 'consultation' ? <CreditCard className="h-4 w-4 text-blue-600" /> :
                     transaction.type === 'cashback' ? <Gift className="h-4 w-4 text-green-600" /> :
                     transaction.type === 'health_coins' ? <Coins className="h-4 w-4 text-amber-600" /> :
                     <DollarSign className="h-4 w-4 text-gray-600" />}
                  </div>
                  <div>
                    <div className="font-medium">{transaction.description}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`font-semibold ${
                    transaction.type === 'cashback' || transaction.type === 'health_coins' 
                      ? 'text-green-600' 
                      : 'text-gray-900'
                  }`}>
                    {transaction.type === 'cashback' || transaction.type === 'health_coins' ? '+' : '-'}
                    ${transaction.amount.toLocaleString()}
                  </div>
                  <Badge variant={
                    transaction.status === 'completed' ? 'default' :
                    transaction.status === 'pending' ? 'secondary' :
                    'destructive'
                  }>
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            )) : (
              <div className="text-center py-8 text-gray-500">
                No hay transacciones recientes
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Health Savings Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-600" />
            Metas de Ahorro para Salud
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Cirugía Dental</span>
                <span className="text-sm text-gray-500">$2,500 / $5,000</span>
              </div>
              <Progress value={50} className="h-2 mb-2" />
              <div className="flex justify-between text-sm text-gray-500">
                <span>50% completado</span>
                <span>Meta: Dic 2024</span>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Fondo de Emergencia</span>
                <span className="text-sm text-gray-500">$1,200 / $2,000</span>
              </div>
              <Progress value={60} className="h-2 mb-2" />
              <div className="flex justify-between text-sm text-gray-500">
                <span>60% completado</span>
                <span>Meta: Jun 2024</span>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Crear Nueva Meta
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
