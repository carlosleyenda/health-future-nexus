
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard, 
  Wallet, 
  FileText, 
  TrendingUp, 
  Receipt, 
  Shield,
  Coins,
  Bitcoin,
  DollarSign,
  Globe
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import AdvancedDigitalWallet from './AdvancedDigitalWallet';
import ComplianceFinancialDashboard from './ComplianceFinancialDashboard';

export default function EnhancedPaymentPortal() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('wallet');

  // Quick stats for header
  const quickStats = {
    balance: 2450,
    pendingPayments: 3,
    monthlySpent: 1200,
    savingsEarned: 85,
    healthCoins: 1250,
    loyaltyTier: 'gold'
  };

  const paymentMethods = [
    { type: 'stripe', name: 'Stripe', enabled: true },
    { type: 'paypal', name: 'PayPal', enabled: true },
    { type: 'square', name: 'Square', enabled: false },
    { type: 'adyen', name: 'Adyen', enabled: false },
    { type: 'coinbase', name: 'Coinbase Commerce', enabled: true },
    { type: 'apple_pay', name: 'Apple Pay', enabled: true },
    { type: 'google_pay', name: 'Google Pay', enabled: true }
  ];

  const supportedCurrencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'BTC', name: 'Bitcoin', symbol: '₿' },
    { code: 'ETH', name: 'Ethereum', symbol: 'Ξ' }
  ];

  if (user?.role === 'admin') {
    return <ComplianceFinancialDashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Enhanced Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                  <Wallet className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    Sistema de Pagos Avanzado
                  </h1>
                  <p className="text-sm lg:text-base text-gray-600">
                    Multi-currency wallet con compliance financiero completo
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border border-green-200">
                <div className="text-lg lg:text-xl font-bold text-green-700">
                  ${quickStats.balance.toLocaleString()}
                </div>
                <div className="text-xs text-green-600">Balance Total</div>
              </div>
              
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-3 rounded-lg border border-amber-200">
                <div className="flex items-center gap-1">
                  <Coins className="h-4 w-4 text-amber-600" />
                  <div className="text-lg lg:text-xl font-bold text-amber-700">
                    {quickStats.healthCoins}
                  </div>
                </div>
                <div className="text-xs text-amber-600">HealthCoins</div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-3 rounded-lg border border-purple-200">
                <div className="text-lg lg:text-xl font-bold text-purple-700">
                  {quickStats.loyaltyTier.toUpperCase()}
                </div>
                <div className="text-xs text-purple-600">Tier Lealtad</div>
              </div>
              
              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-3 rounded-lg border border-orange-200">
                <div className="text-lg lg:text-xl font-bold text-orange-700">
                  {quickStats.pendingPayments}
                </div>
                <div className="text-xs text-orange-600">Pendientes</div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-lg border border-blue-200">
                <div className="text-lg lg:text-xl font-bold text-blue-700">
                  ${quickStats.savingsEarned}
                </div>
                <div className="text-xs text-blue-600">Ahorros</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Payment Methods Status */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Métodos de Pago Soportados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {paymentMethods.map((method) => (
                <div key={method.type} className="text-center p-3 border rounded-lg">
                  <div className="font-medium text-sm">{method.name}</div>
                  <Badge 
                    variant={method.enabled ? 'default' : 'secondary'}
                    className="mt-1"
                  >
                    {method.enabled ? 'Activo' : 'Próximamente'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Multi-Currency Support */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Divisas Soportadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {supportedCurrencies.map((currency) => (
                <div key={currency.code} className="text-center p-3 border rounded-lg hover:bg-gray-50">
                  <div className="font-bold text-lg">{currency.symbol}</div>
                  <div className="text-sm font-medium">{currency.code}</div>
                  <div className="text-xs text-gray-500">{currency.name}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Card>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="border-b px-6 pt-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="wallet" className="flex items-center gap-2">
                    <Wallet className="h-4 w-4" />
                    Wallet Digital
                  </TabsTrigger>
                  <TabsTrigger value="crypto" className="flex items-center gap-2">
                    <Bitcoin className="h-4 w-4" />
                    Crypto Payments
                  </TabsTrigger>
                  <TabsTrigger value="insurance" className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Seguros
                  </TabsTrigger>
                  <TabsTrigger value="reports" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Reportes
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="p-6">
                <TabsContent value="wallet" className="space-y-6 mt-0">
                  <AdvancedDigitalWallet userId={user?.id || ''} />
                </TabsContent>

                <TabsContent value="crypto" className="space-y-6 mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Bitcoin className="h-5 w-5 text-orange-500" />
                          Bitcoin Wallet
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold">₿0.00245</div>
                            <div className="text-sm text-gray-500">~$1,250 USD</div>
                          </div>
                          <Button className="w-full">
                            <DollarSign className="h-4 w-4 mr-2" />
                            Comprar Bitcoin
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <div className="w-5 h-5 bg-blue-600 rounded"></div>
                          Ethereum Wallet
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold">Ξ0.8924</div>
                            <div className="text-sm text-gray-500">~$2,145 USD</div>
                          </div>
                          <Button className="w-full">
                            <DollarSign className="h-4 w-4 mr-2" />
                            Comprar Ethereum
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>DeFi Staking</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">8.5%</div>
                            <div className="text-sm text-gray-500">APY Anual</div>
                          </div>
                          <Button variant="outline" className="w-full">
                            Explorar Staking
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="insurance" className="space-y-6 mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Procesamiento de Seguros</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span>Claims Enviados</span>
                            <Badge>12</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Claims Aprobados</span>
                            <Badge variant="secondary">8</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Monto Cubierto</span>
                            <span className="font-semibold">$8,450</span>
                          </div>
                          <Button className="w-full">
                            Nuevo Claim
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>HSA/FSA Integration</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold">$3,245</div>
                            <div className="text-sm text-gray-500">Saldo disponible HSA</div>
                          </div>
                          <Button variant="outline" className="w-full">
                            Conectar HSA
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="reports" className="space-y-6 mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <FileText className="h-8 w-8 text-blue-600" />
                          <div>
                            <h3 className="font-semibold">Reporte Fiscal</h3>
                            <p className="text-sm text-gray-600">Documentos 1099 y facturas</p>
                          </div>
                        </div>
                        <Button className="w-full">Generar Reporte</Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <TrendingUp className="h-8 w-8 text-green-600" />
                          <div>
                            <h3 className="font-semibold">Análisis de Gastos</h3>
                            <p className="text-sm text-gray-600">Tendencias y patrones</p>
                          </div>
                        </div>
                        <Button className="w-full">Ver Análisis</Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Receipt className="h-8 w-8 text-purple-600" />
                          <div>
                            <h3 className="font-semibold">Historial Completo</h3>
                            <p className="text-sm text-gray-600">Todas las transacciones</p>
                          </div>
                        </div>
                        <Button className="w-full">Exportar CSV</Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
