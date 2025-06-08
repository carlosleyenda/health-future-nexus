
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Wallet, Coins, Gift, CreditCard, TrendingUp, Star } from 'lucide-react';

interface DigitalWalletProps {
  userId: string;
}

export default function DigitalWallet({ userId }: DigitalWalletProps) {
  const walletData = {
    balance: 2580.50,
    healthCoins: 1250,
    cashbackEarned: 125.75,
    loyaltyTier: 'gold' as const,
    nextTierProgress: 65,
    monthlySpent: 850,
    monthlyTarget: 1200
  };

  const recentTransactions = [
    { id: '1', type: 'consultation', amount: -800, coins: 40, date: '2024-01-15', description: 'Consulta con Dr. García' },
    { id: '2', type: 'cashback', amount: 24, coins: 0, date: '2024-01-14', description: 'Cashback de consulta' },
    { id: '3', type: 'pharmacy', amount: -245, coins: 12, date: '2024-01-12', description: 'Medicamentos' },
    { id: '4', type: 'deposit', amount: 1000, coins: 0, date: '2024-01-10', description: 'Recarga de saldo' }
  ];

  const promotions = [
    { id: '1', title: '10% de descuento', description: 'En tu próxima consulta', expires: '31 Ene', color: 'bg-blue-100 text-blue-800' },
    { id: '2', title: 'Envío gratis', description: 'En pedidos de farmacia', expires: '15 Feb', color: 'bg-green-100 text-green-800' },
    { id: '3', title: 'Doble HealthCoins', description: 'En consultas especializadas', expires: '28 Ene', color: 'bg-purple-100 text-purple-800' }
  ];

  const getTierBadge = (tier: string) => {
    const colors = {
      bronze: 'bg-amber-100 text-amber-800',
      silver: 'bg-gray-100 text-gray-800', 
      gold: 'bg-yellow-100 text-yellow-800',
      platinum: 'bg-purple-100 text-purple-800',
      diamond: 'bg-blue-100 text-blue-800'
    };
    return colors[tier as keyof typeof colors] || colors.bronze;
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'consultation': return '🩺';
      case 'pharmacy': return '💊';
      case 'cashback': return '💰';
      case 'deposit': return '💳';
      default: return '📄';
    }
  };

  return (
    <div className="space-y-6">
      {/* Wallet Balance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Mi Wallet Digital
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <CreditCard className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-blue-900">${walletData.balance.toLocaleString()}</div>
              <div className="text-sm text-blue-600">Saldo Disponible</div>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
              <Coins className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold text-purple-900">{walletData.healthCoins.toLocaleString()}</div>
              <div className="text-sm text-purple-600">HealthCoins</div>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
              <Gift className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-green-900">${walletData.cashbackEarned}</div>
              <div className="text-sm text-green-600">Cashback Acumulado</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loyalty Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Estado de Lealtad
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Badge className={getTierBadge(walletData.loyaltyTier)}>
                {walletData.loyaltyTier.toUpperCase()}
              </Badge>
              <span className="text-sm text-muted-foreground">Nivel actual</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">Progreso al siguiente nivel</div>
              <div className="text-xs text-muted-foreground">{walletData.nextTierProgress}% completado</div>
            </div>
          </div>
          <Progress value={walletData.nextTierProgress} className="mb-3" />
          <div className="text-xs text-muted-foreground">
            Gasta ${(walletData.monthlyTarget - walletData.monthlySpent).toLocaleString()} más este mes para alcanzar el nivel Platinum
          </div>
        </CardContent>
      </Card>

      {/* Active Promotions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Promociones Activas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {promotions.map((promo) => (
              <div key={promo.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{promo.title}</div>
                  <div className="text-sm text-muted-foreground">{promo.description}</div>
                </div>
                <div className="text-right">
                  <Badge className={promo.color}>
                    Vence {promo.expires}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Movimientos Recientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{getTransactionIcon(transaction.type)}</div>
                  <div>
                    <div className="font-medium">{transaction.description}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString('es-MX')}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-gray-900'}`}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                  </div>
                  {transaction.coins > 0 && (
                    <div className="text-xs text-purple-600">+{transaction.coins} coins</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-auto flex-col py-4">
              <CreditCard className="h-6 w-6 mb-2" />
              <span className="text-xs">Recargar Saldo</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4">
              <Coins className="h-6 w-6 mb-2" />
              <span className="text-xs">Canjear Coins</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4">
              <Gift className="h-6 w-6 mb-2" />
              <span className="text-xs">Ver Ofertas</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4">
              <TrendingUp className="h-6 w-6 mb-2" />
              <span className="text-xs">Historial</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
