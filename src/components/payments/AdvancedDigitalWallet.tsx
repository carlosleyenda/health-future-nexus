import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  Wallet, 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Shield,
  Plus,
  Send,
  ArrowDownToLine,
  AlertTriangle,
  Users,
  Smartphone,
  Globe,
  Lock
} from 'lucide-react';

interface AdvancedDigitalWalletProps {
  userId: string;
}

export default function AdvancedDigitalWallet({ userId }: AdvancedDigitalWalletProps) {
  const [walletData, setWalletData] = useState({
    balance: 1250.75,
    currency: 'USD',
    healthCoins: 2840,
    cashbackEarned: 127.50,
    loyaltyTier: 'gold',
    hsaConnected: true,
    cryptoEnabled: false,
    autoPayEnabled: true
  });

  const [transactions, setTransactions] = useState([
    {
      id: '1',
      type: 'consultation',
      amount: 150.00,
      date: '2024-06-05',
      provider: 'Dr. Smith',
      status: 'completed',
      healthCoinsEarned: 15
    },
    {
      id: '2',
      type: 'pharmacy',
      amount: 45.75,
      date: '2024-06-03',
      provider: 'MedPharm',
      status: 'completed',
      healthCoinsEarned: 5
    },
    {
      id: '3',
      type: 'lab_test',
      amount: 210.25,
      date: '2024-05-28',
      provider: 'LabCorp',
      status: 'completed',
      healthCoinsEarned: 21
    },
    {
      id: '4',
      type: 'subscription',
      amount: 29.99,
      date: '2024-05-25',
      provider: 'Health Premium Plan',
      status: 'completed',
      healthCoinsEarned: 3
    }
  ]);

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: '1',
      type: 'credit_card',
      lastFour: '4242',
      brand: 'visa',
      expiryMonth: 12,
      expiryYear: 2027,
      isDefault: true
    },
    {
      id: '2',
      type: 'hsa',
      lastFour: '7890',
      brand: 'mastercard',
      expiryMonth: 9,
      expiryYear: 2026,
      isDefault: false
    }
  ]);

  const [spendingAnalytics, setSpendingAnalytics] = useState([
    { category: 'Consultas', amount: 450, fill: '#3b82f6' },
    { category: 'Medicamentos', amount: 275, fill: '#10b981' },
    { category: 'Laboratorios', amount: 320, fill: '#f59e0b' },
    { category: 'Suscripciones', amount: 90, fill: '#8b5cf6' },
    { category: 'Otros', amount: 65, fill: '#ef4444' }
  ]);

  const [monthlySpending, setMonthlySpending] = useState([
    { month: 'Ene', amount: 850 },
    { month: 'Feb', amount: 920 },
    { month: 'Mar', amount: 780 },
    { month: 'Abr', amount: 850 },
    { month: 'May', amount: 1200 },
    { month: 'Jun', amount: 950 }
  ]);

  const [insuranceClaims, setInsuranceClaims] = useState([
    {
      id: '1',
      provider: 'Blue Cross',
      amount: 450.00,
      status: 'approved',
      submittedDate: '2024-05-15',
      approvedDate: '2024-05-22',
      reimbursementDate: '2024-05-25'
    },
    {
      id: '2',
      provider: 'Aetna',
      amount: 210.25,
      status: 'pending',
      submittedDate: '2024-06-01',
      approvedDate: null,
      reimbursementDate: null
    }
  ]);

  const [healthSavingsGoals, setHealthSavingsGoals] = useState([
    {
      id: '1',
      name: 'Fondo de Emergencia Médica',
      targetAmount: 5000.00,
      currentAmount: 1250.75,
      targetDate: '2024-12-31',
      autoContribute: true,
      autoAmount: 100.00,
      frequency: 'monthly'
    },
    {
      id: '2',
      name: 'Cirugía Electiva',
      targetAmount: 3500.00,
      currentAmount: 500.00,
      targetDate: '2025-06-30',
      autoContribute: false,
      autoAmount: 0,
      frequency: 'none'
    }
  ]);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'consultation': return <Users className="h-4 w-4 text-blue-500" />;
      case 'pharmacy': return <Pill className="h-4 w-4 text-green-500" />;
      case 'lab_test': return <Flask className="h-4 w-4 text-yellow-500" />;
      case 'subscription': return <Calendar className="h-4 w-4 text-purple-500" />;
      default: return <DollarSign className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPaymentMethodIcon = (type: string) => {
    switch (type) {
      case 'credit_card': return <CreditCard className="h-4 w-4 text-blue-500" />;
      case 'hsa': return <Heart className="h-4 w-4 text-green-500" />;
      case 'bank_account': return <Building className="h-4 w-4 text-gray-500" />;
      case 'crypto': return <Bitcoin className="h-4 w-4 text-yellow-500" />;
      default: return <Wallet className="h-4 w-4 text-gray-500" />;
    }
  };

  const getClaimStatusBadge = (status: string) => {
    switch (status) {
      case 'approved': return <Badge variant="default">Aprobado</Badge>;
      case 'pending': return <Badge variant="secondary">Pendiente</Badge>;
      case 'rejected': return <Badge variant="destructive">Rechazado</Badge>;
      default: return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Wallet Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Balance Disponible</CardTitle>
            <Wallet className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${walletData.balance.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">{walletData.currency}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Health Coins</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{walletData.healthCoins}</div>
            <p className="text-xs text-muted-foreground">Valor: ~${(walletData.healthCoins * 0.01).toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cashback Ganado</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${walletData.cashbackEarned.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Nivel {walletData.loyaltyTier}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conexiones</CardTitle>
            <Shield className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">HSA + Tarjeta</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button variant="outline" className="flex flex-col items-center justify-center h-24">
          <Send className="h-6 w-6 mb-2" />
          <span>Transferir</span>
        </Button>
        <Button variant="outline" className="flex flex-col items-center justify-center h-24">
          <ArrowDownToLine className="h-6 w-6 mb-2" />
          <span>Depositar</span>
        </Button>
        <Button variant="outline" className="flex flex-col items-center justify-center h-24">
          <CreditCard className="h-6 w-6 mb-2" />
          <span>Pagar</span>
        </Button>
        <Button variant="outline" className="flex flex-col items-center justify-center h-24">
          <Plus className="h-6 w-6 mb-2" />
          <span>Agregar Método</span>
        </Button>
      </div>

      {/* Spending Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Análisis de Gastos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-4">Distribución por Categoría</h4>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={spendingAnalytics}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="amount"
                    nameKey="category"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {spendingAnalytics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value}`, 'Gasto']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Tendencia Mensual</h4>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlySpending}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Gasto']} />
                  <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Métodos de Pago</CardTitle>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Agregar
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getPaymentMethodIcon(method.type)}
                  <div>
                    <div className="font-medium">
                      {method.brand.charAt(0).toUpperCase() + method.brand.slice(1)} •••• {method.lastFour}
                    </div>
                    <div className="text-sm text-gray-600">
                      Expira: {method.expiryMonth}/{method.expiryYear}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {method.isDefault && <Badge variant="outline">Predeterminado</Badge>}
                  <Button variant="ghost" size="sm">Editar</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Transacciones Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getTransactionIcon(transaction.type)}
                  <div>
                    <div className="font-medium">{transaction.provider}</div>
                    <div className="text-sm text-gray-600">{transaction.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${transaction.amount.toFixed(2)}</div>
                  <div className="text-sm text-green-600">+{transaction.healthCoinsEarned} coins</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insurance Claims */}
      <Card>
        <CardHeader>
          <CardTitle>Reclamos de Seguro</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insuranceClaims.map((claim) => (
              <div key={claim.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium">{claim.provider}</div>
                    <div className="text-sm text-gray-600">Enviado: {claim.submittedDate}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getClaimStatusBadge(claim.status)}
                    <div className="font-medium">${claim.amount.toFixed(2)}</div>
                  </div>
                </div>
                
                <div className="mt-2">
                  <div className="text-sm text-gray-600">
                    {claim.status === 'approved' ? (
                      <span>Reembolso: {claim.reimbursementDate}</span>
                    ) : claim.status === 'pending' ? (
                      <span>En revisión</span>
                    ) : (
                      <span>Rechazado: Contacte a su aseguradora</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Health Savings Goals */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Metas de Ahorro</CardTitle>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Meta
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {healthSavingsGoals.map((goal) => (
              <div key={goal.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{goal.name}</h4>
                  <Badge variant="outline">
                    Meta: ${goal.targetAmount.toFixed(2)}
                  </Badge>
                </div>
                
                <Progress 
                  value={(goal.currentAmount / goal.targetAmount) * 100} 
                  className="h-2 mb-2" 
                />
                
                <div className="flex items-center justify-between text-sm">
                  <span>${goal.currentAmount.toFixed(2)} ahorrados</span>
                  <span>{((goal.currentAmount / goal.targetAmount) * 100).toFixed(0)}%</span>
                </div>
                
                <div className="mt-3 text-sm text-gray-600">
                  <div>Fecha objetivo: {goal.targetDate}</div>
                  {goal.autoContribute && (
                    <div>Auto-contribución: ${goal.autoAmount.toFixed(2)}/{goal.frequency}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Pagos Móviles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                <Smartphone className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-medium mb-2">Pago sin contacto</h4>
              <p className="text-sm text-gray-600 mb-4">
                Usa tu teléfono para pagos rápidos y seguros en consultorios y farmacias.
              </p>
              <Button variant="outline" size="sm">Configurar</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Multi-Divisa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <Globe className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-medium mb-2">Pagos Internacionales</h4>
              <p className="text-sm text-gray-600 mb-4">
                Paga servicios médicos en el extranjero con tasas de cambio favorables.
              </p>
              <Button variant="outline" size="sm">Activar</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Seguridad Avanzada
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-4">
                <Lock className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-medium mb-2">Protección Biométrica</h4>
              <p className="text-sm text-gray-600 mb-4">
                Autoriza pagos con huella digital o reconocimiento facial.
              </p>
              <Button variant="outline" size="sm">Habilitar</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fraud Alert */}
      <Alert className="border-l-4 border-l-red-500">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <div className="flex items-center justify-between">
            <div>
              <strong>Alerta de Seguridad:</strong> Hemos detectado un intento de acceso inusual desde una ubicación desconocida.
            </div>
            <Button variant="outline" size="sm">Revisar</Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
}

function Pill({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
      <path d="m8.5 8.5 7 7" />
    </svg>
  );
}

function Flask({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 3h6m-6 0v6L3 19h18L15 9V3M9 3h6" />
      <path d="M8 14h8" />
    </svg>
  );
}

function Calendar({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function Heart({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function Building({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M8 10h.01" />
      <path d="M16 10h.01" />
      <path d="M12 14h.01" />
      <path d="M8 14h.01" />
      <path d="M16 14h.01" />
    </svg>
  );
}

function Bitcoin({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727" />
    </svg>
  );
}
