
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  Wallet, 
  CreditCard, 
  TrendingUp, 
  Shield, 
  Star,
  Bitcoin,
  DollarSign,
  Euro,
  Plus,
  Send,
  Receive,
  History,
  Settings,
  Award,
  Target
} from 'lucide-react';
import { PaymentService } from '@/services/financial/paymentService';
import { useAuthStore } from '@/store/auth';
import { toast } from 'sonner';
import type { Transaction } from '@/types/financial';

export default function AdvancedDigitalWallet() {
  const { user } = useAuthStore();
  const [wallet, setWallet] = useState<any>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [exchangeRates, setExchangeRates] = useState<any[]>([]);
  const [savingsGoals, setSavingsGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWalletData = async () => {
      if (!user) return;
      
      try {
        const [walletData, transactionsData, ratesData, goalsData] = await Promise.all([
          PaymentService.getHealthWallet(user.id),
          PaymentService.getTransactions(user.id),
          PaymentService.getExchangeRates(),
          PaymentService.getHealthSavingsGoals(user.id)
        ]);
        
        setWallet(walletData);
        setTransactions(transactionsData);
        setExchangeRates(ratesData);
        setSavingsGoals(goalsData);
      } catch (error) {
        toast.error('Error loading wallet data');
      } finally {
        setLoading(false);
      }
    };

    loadWalletData();
  }, [user]);

  const getLoyaltyTierColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return 'text-orange-600';
      case 'silver': return 'text-gray-600';
      case 'gold': return 'text-yellow-600';
      case 'platinum': return 'text-purple-600';
      case 'diamond': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getLoyaltyTierIcon = (tier: string) => {
    switch (tier) {
      case 'diamond': return '💎';
      case 'platinum': return '🏆';
      case 'gold': return '🥇';
      case 'silver': return '🥈';
      case 'bronze': return '🥉';
      default: return '⭐';
    }
  };

  if (loading) {
    return <div className="p-6">Loading wallet...</div>;
  }

  if (!wallet) {
    return <div className="p-6">No wallet data available</div>;
  }

  const balanceData = [
    { name: 'Ene', balance: 1000 },
    { name: 'Feb', balance: 1100 },
    { name: 'Mar', balance: 950 },
    { name: 'Abr', balance: 1200 },
    { name: 'May', balance: 1250 },
  ];

  const spendingData = [
    { name: 'Consultas', value: 45, color: '#3b82f6' },
    { name: 'Medicamentos', value: 30, color: '#10b981' },
    { name: 'Laboratorios', value: 15, color: '#f59e0b' },
    { name: 'Otros', value: 10, color: '#ef4444' },
  ];

  return (
    <div className="space-y-6">
      {/* Wallet Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Main Balance */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Balance Principal
              </span>
              <Badge className={getLoyaltyTierColor(wallet.loyaltyTier)}>
                {getLoyaltyTierIcon(wallet.loyaltyTier)} {wallet.loyaltyTier.toUpperCase()}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-3xl font-bold">${wallet.balance.toFixed(2)}</div>
                <div className="text-sm text-gray-500">{wallet.currency}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">HealthCoins</div>
                  <div className="text-xl font-semibold text-purple-600">
                    {wallet.healthCoins.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Cashback</div>
                  <div className="text-xl font-semibold text-green-600">
                    ${wallet.cashbackEarned.toFixed(2)}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button className="flex-1">
                  <Send className="h-4 w-4 mr-2" />
                  Enviar
                </Button>
                <Button variant="outline" className="flex-1">
                  <Receive className="h-4 w-4 mr-2" />
                  Recibir
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Gasto Mensual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$543.50</div>
            <div className="text-sm text-green-600">+12% vs mes anterior</div>
            <Progress value={65} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-purple-500" />
              Recompensas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Este mes</span>
                <span className="font-medium">+120 HC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Cashback</span>
                <span className="font-medium">$3.50</span>
              </div>
              <Progress value={75} className="mt-2" />
              <div className="text-xs text-gray-500">75% to next tier</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="transactions">Transacciones</TabsTrigger>
          <TabsTrigger value="goals">Metas</TabsTrigger>
          <TabsTrigger value="cards">Tarjetas</TabsTrigger>
          <TabsTrigger value="crypto">Crypto</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Balance Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Tendencia de Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={balanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Balance']} />
                    <Line type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Spending Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Distribución de Gastos</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={spendingData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {spendingData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Porcentaje']} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {spendingData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Exchange Rates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Tipos de Cambio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {exchangeRates.map((rate) => (
                  <div key={rate.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      {rate.targetCurrency === 'EUR' && <Euro className="h-4 w-4" />}
                      {rate.targetCurrency === 'BTC' && <Bitcoin className="h-4 w-4" />}
                      <span className="font-medium">{rate.baseCurrency}/{rate.targetCurrency}</span>
                    </div>
                    <span className="text-lg font-bold">{rate.rate}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Historial de Transacciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">{transaction.description}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(transaction.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${transaction.amount}</div>
                      <Badge variant={
                        transaction.status === 'completed' ? 'default' : 
                        transaction.status === 'pending' ? 'secondary' : 'destructive'
                      }>
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Metas de Ahorro</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nueva Meta
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savingsGoals.map((goal) => (
                <Card key={goal.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        {goal.goalName}
                      </span>
                      <Badge variant={goal.isActive ? 'default' : 'secondary'}>
                        {goal.isActive ? 'Activa' : 'Pausada'}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Progreso</span>
                          <span>{Math.round((goal.currentAmount / goal.targetAmount) * 100)}%</span>
                        </div>
                        <Progress 
                          value={(goal.currentAmount / goal.targetAmount) * 100} 
                          className="mt-1"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">Actual</div>
                          <div className="font-semibold">${goal.currentAmount}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Meta</div>
                          <div className="font-semibold">${goal.targetAmount}</div>
                        </div>
                      </div>
                      
                      {goal.autoContributeAmount && (
                        <div className="text-sm text-green-600">
                          Auto-ahorro: ${goal.autoContributeAmount} {goal.autoContributeFrequency}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="cards">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Métodos de Pago
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-sm opacity-90">HealthCard Premium</div>
                      <div className="text-2xl font-bold">•••• •••• •••• 4242</div>
                    </div>
                    <Shield className="h-6 w-6" />
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-sm opacity-90">John Doe</div>
                      <div className="text-sm">12/27</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm opacity-90">Balance</div>
                      <div className="text-lg font-bold">${wallet.balance}</div>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Nueva Tarjeta
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="crypto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bitcoin className="h-5 w-5" />
                Criptomonedas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Bitcoin className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium mb-2">Crypto Wallet Próximamente</h3>
                <p className="text-gray-600 mb-4">
                  Podrás gestionar Bitcoin, Ethereum y otras criptomonedas directamente desde tu wallet.
                </p>
                <Button disabled>
                  <Settings className="h-4 w-4 mr-2" />
                  Habilitar Crypto
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
