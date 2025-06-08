
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Wallet, FileText, TrendingUp, Receipt, ArrowRight, Plus } from 'lucide-react';
import DigitalWallet from './DigitalWallet';
import PaymentMethods from './PaymentMethods';
import PaymentHistory from './PaymentHistory';
import InvoiceGenerator from './InvoiceGenerator';
import FinancialDashboard from './FinancialDashboard';
import { useAuthStore } from '@/store/auth';

export default function PaymentPortal() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');

  // Quick stats for header
  const quickStats = {
    balance: 2450,
    pendingPayments: 3,
    monthlySpent: 1200,
    savingsEarned: 85
  };

  const navigationItems = [
    { 
      id: 'overview', 
      label: 'Resumen', 
      icon: TrendingUp, 
      component: user?.role === 'patient' ? DigitalWallet : FinancialDashboard,
      description: 'Vista general de tu actividad financiera'
    },
    { 
      id: 'wallet', 
      label: 'Mi Wallet', 
      icon: Wallet, 
      component: DigitalWallet,
      description: 'Gestiona tu monedero digital'
    },
    { 
      id: 'methods', 
      label: 'Métodos de Pago', 
      icon: CreditCard, 
      component: PaymentMethods,
      description: 'Administra tus tarjetas y métodos'
    },
    { 
      id: 'history', 
      label: 'Historial', 
      icon: Receipt, 
      component: PaymentHistory,
      description: 'Revisa todas tus transacciones'
    },
    { 
      id: 'invoices', 
      label: 'Facturas', 
      icon: FileText, 
      component: InvoiceGenerator,
      description: 'Genera y descarga facturas'
    }
  ];

  // Filter navigation based on user role
  const availableNavigation = user?.role === 'doctor' || user?.role === 'admin' 
    ? navigationItems.filter(item => ['overview', 'history', 'invoices'].includes(item.id))
    : navigationItems;

  const renderContent = () => {
    const currentItem = availableNavigation.find(item => item.id === activeTab);
    if (!currentItem) return null;

    const Component = currentItem.component;
    return <Component userId={user?.id || ''} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Enhanced Header with Quick Stats */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    Portal de Pagos
                  </h1>
                  <p className="text-sm lg:text-base text-gray-600">
                    {user?.role === 'patient' && 'Gestiona tus pagos y métodos de forma segura'}
                    {user?.role === 'doctor' && 'Administra tus ingresos y facturación'}
                    {user?.role === 'admin' && 'Supervisión financiera de la plataforma'}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats Cards - Only for patients */}
            {user?.role === 'patient' && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <div className="text-lg lg:text-xl font-bold text-green-700">
                    ${quickStats.balance.toLocaleString()}
                  </div>
                  <div className="text-xs text-green-600">Saldo disponible</div>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                  <div className="text-lg lg:text-xl font-bold text-orange-700">
                    {quickStats.pendingPayments}
                  </div>
                  <div className="text-xs text-orange-600">Pagos pendientes</div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <div className="text-lg lg:text-xl font-bold text-blue-700">
                    ${quickStats.monthlySpent.toLocaleString()}
                  </div>
                  <div className="text-xs text-blue-600">Gasto mensual</div>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                  <div className="text-lg lg:text-xl font-bold text-purple-700">
                    ${quickStats.savingsEarned}
                  </div>
                  <div className="text-xs text-purple-600">Ahorros ganados</div>
                </div>
              </div>
            )}

            {/* Quick Action Button */}
            <Button size="lg" className="shadow-lg hover:shadow-xl transition-all duration-200">
              <Plus className="h-4 w-4 mr-2" />
              {user?.role === 'patient' ? 'Agregar Método' : 'Generar Reporte'}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Improved Sidebar Navigation */}
          <div className="lg:w-80 space-y-2">
            <div className="bg-white rounded-xl shadow-sm border p-2">
              {availableNavigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-200 group ${
                    activeTab === item.id
                      ? 'bg-blue-50 border-2 border-blue-200 shadow-sm'
                      : 'hover:bg-gray-50 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg transition-colors ${
                        activeTab === item.id 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'
                      }`}>
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className={`font-medium ${
                          activeTab === item.id ? 'text-blue-900' : 'text-gray-900'
                        }`}>
                          {item.label}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {item.description}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className={`h-4 w-4 transition-transform ${
                      activeTab === item.id 
                        ? 'text-blue-600 transform translate-x-1' 
                        : 'text-gray-400 group-hover:text-blue-600 group-hover:transform group-hover:translate-x-1'
                    }`} />
                  </div>
                </button>
              ))}
            </div>

            {/* Quick Tips Card */}
            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-blue-900 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Consejo del día
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-blue-700">
                  {user?.role === 'patient' 
                    ? 'Configura pagos automáticos para nunca perderte una consulta.'
                    : 'Revisa tus reportes mensuales para optimizar tus ingresos.'
                  }
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border min-h-[600px]">
              <div className="p-6">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                  <span>Portal de Pagos</span>
                  <span>/</span>
                  <span className="text-gray-900 font-medium">
                    {availableNavigation.find(item => item.id === activeTab)?.label}
                  </span>
                </div>

                {/* Content */}
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
