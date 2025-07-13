import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard, 
  Wallet, 
  Shield, 
  Calendar, 
  CheckCircle,
  Clock,
  AlertTriangle,
  Download,
  Receipt,
  Star,
  Gift,
  Coins,
  TrendingUp
} from 'lucide-react';

interface PaymentMethod {
  id: string;
  type: 'card' | 'wallet' | 'insurance';
  name: string;
  details: string;
  isDefault: boolean;
  expiry?: string;
  logo?: string;
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'payment' | 'refund' | 'insurance';
  status: 'completed' | 'pending' | 'failed';
  method: string;
  invoice?: string;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  period: 'monthly' | 'yearly';
  features: string[];
  isPopular?: boolean;
  savings?: number;
}

// Datos simulados
const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 'pm-001',
    type: 'card',
    name: 'Visa **** 4532',
    details: 'Tarjeta principal',
    isDefault: true,
    expiry: '12/26'
  },
  {
    id: 'pm-002', 
    type: 'wallet',
    name: 'Billetera Digital',
    details: 'Saldo disponible: $125.50',
    isDefault: false
  },
  {
    id: 'pm-003',
    type: 'insurance',
    name: 'Seguro Médico Plus',
    details: 'Cobertura 80%',
    isDefault: false
  }
];

const mockTransactions: Transaction[] = [
  {
    id: 'tx-001',
    date: '2024-01-15',
    description: 'Consulta con Dr. María García',
    amount: 75.00,
    type: 'payment',
    status: 'completed',
    method: 'Visa **** 4532',
    invoice: 'INV-001'
  },
  {
    id: 'tx-002',
    date: '2024-01-10',
    description: 'Análisis de laboratorio',
    amount: 120.00,
    type: 'payment',
    status: 'completed',
    method: 'Seguro Médico Plus',
    invoice: 'INV-002'
  },
  {
    id: 'tx-003',
    date: '2024-01-05',
    description: 'Reembolso - Cita cancelada',
    amount: 50.00,
    type: 'refund',
    status: 'completed',
    method: 'Billetera Digital'
  }
];

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Básico',
    description: 'Acceso esencial a servicios médicos',
    price: 19.99,
    period: 'monthly',
    features: [
      'Hasta 3 consultas al mes',
      'Recetas digitales',
      'Historial médico básico',
      'Soporte por chat'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Plan completo para familias',
    price: 39.99,
    period: 'monthly',
    features: [
      'Consultas ilimitadas',
      'Videoconsultas 24/7',
      'Análisis de laboratorio incluidos',
      'Seguimiento personalizado',
      'Soporte prioritario',
      'Descuentos en medicamentos'
    ],
    isPopular: true
  },
  {
    id: 'enterprise',
    name: 'Empresarial',
    description: 'Solución para empresas',
    price: 99.99,
    period: 'monthly',
    features: [
      'Todo lo del plan Premium',
      'Dashboard de salud empresarial',
      'Gestión de empleados',
      'Reportes de salud',
      'API personalizada',
      'Soporte dedicado'
    ]
  }
];

export function PaymentSystem() {
  const [selectedTab, setSelectedTab] = useState('methods');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case 'card':
        return <CreditCard className="h-5 w-5" />;
      case 'wallet':
        return <Wallet className="h-5 w-5" />;
      case 'insurance':
        return <Shield className="h-5 w-5" />;
      default:
        return <CreditCard className="h-5 w-5" />;
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Sistema de Pagos</h1>
          <p className="text-muted-foreground">
            Gestiona tus métodos de pago y suscripciones
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button>
            <CreditCard className="h-4 w-4 mr-2" />
            Añadir Método
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="methods">Métodos de Pago</TabsTrigger>
          <TabsTrigger value="transactions">Transacciones</TabsTrigger>
          <TabsTrigger value="subscriptions">Suscripciones</TabsTrigger>
          <TabsTrigger value="wallet">Billetera</TabsTrigger>
        </TabsList>

        <TabsContent value="methods" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPaymentMethods.map((method) => (
              <Card key={method.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getPaymentIcon(method.type)}
                      <CardTitle className="text-lg">{method.name}</CardTitle>
                    </div>
                    {method.isDefault && (
                      <Badge>Por defecto</Badge>
                    )}
                  </div>
                  <CardDescription>{method.details}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {method.expiry && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Expira: {method.expiry}
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Eliminar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Tarjeta para añadir nuevo método */}
            <Card className="border-dashed border-2 hover:border-primary transition-colors cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center h-full p-6">
                <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">Añadir Método de Pago</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Añade una nueva tarjeta o método de pago
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Transacciones</CardTitle>
              <CardDescription>
                Registro completo de todos tus pagos y reembolsos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        ${transaction.type === 'payment' ? 'bg-blue-100' : 
                          transaction.type === 'refund' ? 'bg-green-100' : 'bg-purple-100'}
                      `}>
                        {transaction.type === 'payment' && <CreditCard className="h-5 w-5 text-blue-600" />}
                        {transaction.type === 'refund' && <CheckCircle className="h-5 w-5 text-green-600" />}
                        {transaction.type === 'insurance' && <Shield className="h-5 w-5 text-purple-600" />}
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-semibold">{transaction.description}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{new Date(transaction.date).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{transaction.method}</span>
                          {transaction.invoice && (
                            <>
                              <span>•</span>
                              <span>{transaction.invoice}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`
                        text-lg font-semibold
                        ${transaction.type === 'refund' ? 'text-green-600' : 'text-gray-900'}
                      `}>
                        {transaction.type === 'refund' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </div>
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status === 'completed' && 'Completado'}
                        {transaction.status === 'pending' && 'Pendiente'}
                        {transaction.status === 'failed' && 'Fallido'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscriptions" className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Elige tu Plan</h2>
            <p className="text-muted-foreground">
              Selecciona el plan que mejor se adapte a tus necesidades
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subscriptionPlans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`
                  relative hover:shadow-lg transition-all cursor-pointer
                  ${plan.isPopular ? 'ring-2 ring-primary scale-105' : ''}
                  ${selectedPlan === plan.id ? 'ring-2 ring-blue-500' : ''}
                `}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary">
                      <Star className="h-3 w-3 mr-1" />
                      Más Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription className="mb-4">{plan.description}</CardDescription>
                  <div className="space-y-1">
                    <div className="text-3xl font-bold">
                      ${plan.price}
                      <span className="text-lg text-muted-foreground font-normal">
                        /{plan.period === 'monthly' ? 'mes' : 'año'}
                      </span>
                    </div>
                    {plan.savings && (
                      <div className="text-sm text-green-600">
                        Ahorra ${plan.savings} al año
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className="w-full" 
                    variant={selectedPlan === plan.id ? "default" : "outline"}
                  >
                    {selectedPlan === plan.id ? 'Seleccionado' : 'Seleccionar Plan'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {selectedPlan && (
            <Card className="bg-blue-50">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Plan Seleccionado</h3>
                  <p className="text-muted-foreground mb-4">
                    Confirma tu suscripción al plan {subscriptionPlans.find(p => p.id === selectedPlan)?.name}
                  </p>
                  <Button size="lg">
                    Continuar con el Pago
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="wallet" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Wallet className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Saldo Disponible</h3>
                <div className="text-2xl font-bold text-blue-600">$125.50</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Coins className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Health Coins</h3>
                <div className="text-2xl font-bold text-green-600">350</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Gift className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Cashback</h3>
                <div className="text-2xl font-bold text-purple-600">$12.75</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Ahorros</h3>
                <div className="text-2xl font-bold text-orange-600">$89.20</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recargar Billetera</CardTitle>
                <CardDescription>
                  Añade fondos a tu billetera digital
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline">$25</Button>
                  <Button variant="outline">$50</Button>
                  <Button variant="outline">$100</Button>
                </div>
                <Input placeholder="Cantidad personalizada" type="number" />
                <Button className="w-full">Recargar</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Health Coins</CardTitle>
                <CardDescription>
                  Gana puntos con cada consulta y canjéalos por descuentos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Consulta completada</span>
                    <span className="text-green-600">+10 coins</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Análisis de laboratorio</span>
                    <span className="text-green-600">+25 coins</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Referir un amigo</span>
                    <span className="text-green-600">+50 coins</span>
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  Ver Recompensas
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}