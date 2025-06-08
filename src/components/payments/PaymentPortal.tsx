
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Wallet, FileText, TrendingUp, Receipt } from 'lucide-react';
import DigitalWallet from './DigitalWallet';
import PaymentMethods from './PaymentMethods';
import PaymentHistory from './PaymentHistory';
import InvoiceGenerator from './InvoiceGenerator';
import FinancialDashboard from './FinancialDashboard';
import { useAuthStore } from '@/store/auth';

export default function PaymentPortal() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('wallet');

  const userTabs = [
    { value: 'wallet', label: 'Mi Wallet', icon: Wallet, component: DigitalWallet },
    { value: 'methods', label: 'Métodos de Pago', icon: CreditCard, component: PaymentMethods },
    { value: 'history', label: 'Historial', icon: Receipt, component: PaymentHistory },
    { value: 'invoices', label: 'Facturas', icon: FileText, component: InvoiceGenerator }
  ];

  const doctorAdminTabs = [
    { value: 'dashboard', label: 'Dashboard Financiero', icon: TrendingUp, component: FinancialDashboard },
    { value: 'invoices', label: 'Facturas', icon: FileText, component: InvoiceGenerator }
  ];

  const tabs = user?.role === 'patient' ? userTabs : 
               user?.role === 'doctor' || user?.role === 'admin' ? [...doctorAdminTabs, ...userTabs] : userTabs;

  const renderTabContent = () => {
    const currentTab = tabs.find(tab => tab.value === activeTab);
    if (!currentTab) return null;

    const Component = currentTab.component;
    return <Component userId={user?.id || ''} />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Portal de Pagos</h1>
          <p className="text-muted-foreground">
            {user?.role === 'patient' && 'Gestiona tus pagos y métodos de pago'}
            {user?.role === 'doctor' && 'Administra tus ingresos y facturación'}
            {user?.role === 'admin' && 'Supervisión financiera de la plataforma'}
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-2">
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {renderTabContent()}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
