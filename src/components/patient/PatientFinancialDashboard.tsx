
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Wallet, CreditCard, Receipt, Coins, Gift, 
  TrendingUp, Calendar, FileText, Shield, 
  Heart, Pill, Stethoscope, Plus
} from 'lucide-react';
import AIChat from '@/components/ai/AIChat';

export default function PatientFinancialDashboard() {
  const [selectedTab, setSelectedTab] = useState('wallet');

  const walletData = {
    balance: 1250.75,
    healthCoins: 2840,
    pendingRefunds: 125.00,
    loyaltyTier: 'Gold',
    nextTierPoints: 160
  };

  const recentTransactions = [
    {
      id: '1',
      type: 'consultation',
      description: 'Consulta con Dr. García - Cardiología',
      amount: -150.00,
      date: '2024-06-08',
      status: 'completed',
      healthCoinsEarned: 15
    },
    {
      id: '2',
      type: 'pharmacy',
      description: 'Medicamentos recetados',
      amount: -45.50,
      date: '2024-06-07',
      status: 'completed',
      healthCoinsEarned: 5
    },
    {
      id: '3',
      type: 'refund',
      description: 'Reembolso consulta cancelada',
      amount: 120.00,
      date: '2024-06-06',
      status: 'pending',
      healthCoinsEarned: 0
    },
    {
      id: '4',
      type: 'subscription',
      description: 'Plan Premium mensual',
      amount: -89.99,
      date: '2024-06-01',
      status: 'completed',
      healthCoinsEarned: 90
    }
  ];

  const healthSavings = [
    {
      goal: 'Cirugía programada',
      target: 5000,
      current: 3200,
      dueDate: '2024-12-01'
    },
    {
      goal: 'Emergencias médicas',
      target: 2000,
      current: 1450,
      dueDate: 'Sin fecha límite'
    }
  ];

  const loyaltyBenefits = [
    { tier: 'Bronze', discount: '5%', healthCoins: '1x', perks: ['Descuentos básicos'] },
    { tier: 'Silver', discount: '10%', healthCoins: '1.5x', perks: ['Consultas express', 'Descuentos farmacia'] },
    { tier: 'Gold', discount: '15%', healthCoins: '2x', perks: ['Consultas prioritarias', 'Descuentos premium', 'Telemedicina 24/7'] },
    { tier: 'Platinum', discount: '20%', healthCoins: '3x', perks: ['Consultas VIP', 'Concierge médico', 'Chequeos gratuitos'] }
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'consultation': return <Stethoscope className="h-4 w-4" />;
      case 'pharmacy': return <Pill className="h-4 w-4" />;
      case 'refund': return <TrendingUp className="h-4 w-4" />;
      case 'subscription': return <Heart className="h-4 w-4" />;
      default: return <Receipt className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Mi Cartera de Salud</h1>
          <p className="text-muted-foreground">
            Gestiona tus gastos médicos, ahorros y beneficios de manera inteligente
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Agregar Fondos
        </Button>
      </div>

      {/* Resumen de cartera */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Balance Principal</p>
                <p className="text-2xl font-bold">${walletData.balance.toFixed(2)}</p>
                <p className="text-blue-100 text-xs">USD disponible</p>
              </div>
              <Wallet className="h-8 w-8 text-blue-100" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Health Coins</p>
                <p className="text-2xl font-bold">{walletData.healthCoins.toLocaleString()}</p>
                <p className="text-green-100 text-xs">Puntos acumulados</p>
              </div>
              <Coins className="h-8 w-8 text-green-100" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Nivel de Lealtad</p>
                <p className="text-2xl font-bold">{walletData.loyaltyTier}</p>
                <p className="text-purple-100 text-xs">{walletData.nextTierPoints} pts para Platinum</p>
              </div>
              <Gift className="h-8 w-8 text-purple-100" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Reembolsos Pendientes</p>
                <p className="text-2xl font-bold">${walletData.pendingRefunds.toFixed(2)}</p>
                <p className="text-orange-100 text-xs">En procesamiento</p>
              </div>
              <Receipt className="h-8 w-8 text-orange-100" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel principal */}
        <div className="lg:col-span-2">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="wallet">Mi Cartera</TabsTrigger>
              <TabsTrigger value="transactions">Historial</TabsTrigger>
              <TabsTrigger value="savings">Ahorros</TabsTrigger>
              <TabsTrigger value="benefits">Beneficios</TabsTrigger>
            </TabsList>

            <TabsContent value="wallet" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Métodos de Pago
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-4 border rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-6 bg-blue-600 rounded"></div>
                      <div>
                        <p className="font-medium">•••• 4242</p>
                        <p className="text-sm text-gray-500">Expires 12/26</p>
                      </div>
                    </div>
                    <Badge>Principal</Badge>
                  </div>
                  <div className="p-4 border rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-6 bg-red-600 rounded"></div>
                      <div>
                        <p className="font-medium">•••• 8888</p>
                        <p className="text-sm text-gray-500">Expires 08/27</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Verificar</Button>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Método de Pago
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Historial de Transacciones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentTransactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 rounded">
                            {getTransactionIcon(transaction.type)}
                          </div>
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-sm text-gray-500">{transaction.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${transaction.amount > 0 ? 'text-green-600' : 'text-gray-900'}`}>
                            ${Math.abs(transaction.amount).toFixed(2)}
                          </p>
                          {transaction.healthCoinsEarned > 0 && (
                            <p className="text-xs text-green-600">+{transaction.healthCoinsEarned} HC</p>
                          )}
                          <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="savings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Metas de Ahorro para Salud
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {healthSavings.map((goal, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold">{goal.goal}</h4>
                          <p className="text-sm text-gray-500">Meta para: {goal.dueDate}</p>
                        </div>
                        <p className="text-lg font-bold">${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${(goal.current / goal.target) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-500">
                          {Math.round((goal.current / goal.target) * 100)}% completado
                        </span>
                        <Button variant="outline" size="sm">Contribuir</Button>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva Meta de Ahorro
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="benefits" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Programa de Lealtad y Beneficios</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {loyaltyBenefits.map((tier, index) => (
                      <div key={index} className={`p-4 border rounded-lg ${
                        tier.tier === walletData.loyaltyTier ? 'border-blue-500 bg-blue-50' : ''
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{tier.tier}</h4>
                          {tier.tier === walletData.loyaltyTier && (
                            <Badge>Actual</Badge>
                          )}
                        </div>
                        <div className="space-y-1 text-sm">
                          <p><strong>Descuento:</strong> {tier.discount}</p>
                          <p><strong>Health Coins:</strong> {tier.healthCoins} multiplicador</p>
                          <div>
                            <strong>Beneficios:</strong>
                            <ul className="list-disc list-inside ml-2">
                              {tier.perks.map((perk, perkIndex) => (
                                <li key={perkIndex}>{perk}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Panel lateral para pacientes */}
        <div className="space-y-6">
          {/* Quick Actions para pacientes */}
          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Programar Consulta
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Pill className="h-4 w-4 mr-2" />
                Ordenar Medicamentos
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Ver Facturas
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Gift className="h-4 w-4 mr-2" />
                Canjear Health Coins
              </Button>
            </CardContent>
          </Card>

          {/* AI Chat personalizado para pacientes */}
          <AIChat
            context="general"
            title="Asistente Personal de Salud"
            placeholder="Pregunta sobre tus gastos médicos, ahorros, beneficios..."
          />
        </div>
      </div>
    </div>
  );
}
