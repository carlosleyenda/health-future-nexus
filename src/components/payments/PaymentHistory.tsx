
import React from 'react';
import { CreditCard, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePatientTransactions } from '@/hooks/usePatient';

interface PaymentHistoryProps {
  patientId: string;
}

export default function PaymentHistory({ patientId }: PaymentHistoryProps) {
  const { data: transactions, isLoading } = usePatientTransactions(patientId);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'credit_card': return 'Tarjeta de Crédito';
      case 'debit_card': return 'Tarjeta de Débito';
      case 'bank_transfer': return 'Transferencia';
      case 'cash': return 'Efectivo';
      case 'insurance': return 'Seguro Médico';
      default: return method;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (!transactions?.length) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <CreditCard className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Sin historial de pagos</h3>
          <p className="text-gray-500">Tus transacciones aparecerán aquí después de realizar pagos</p>
        </CardContent>
      </Card>
    );
  }

  const totalPaid = transactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      {/* Resumen */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Resumen de Pagos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">Total Pagado</p>
              <p className="text-2xl font-bold text-green-600">${totalPaid.toLocaleString()} MXN</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Transacciones</p>
              <p className="text-2xl font-bold">{transactions.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Último Pago</p>
              <p className="text-lg font-medium">
                {transactions[0] ? 
                  new Date(transactions[0].createdAt).toLocaleDateString('es-MX') : 
                  'N/A'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de transacciones */}
      <div className="space-y-4">
        {transactions
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .map((transaction) => (
          <Card key={transaction.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  {getStatusIcon(transaction.status)}
                  <div>
                    <h3 className="font-medium">
                      {transaction.appointmentId ? 'Consulta Médica' : 'Pago de Servicios'}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {getPaymentMethodLabel(transaction.paymentMethod)}
                    </p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                      <Calendar className="h-3 w-3" />
                      {new Date(transaction.createdAt).toLocaleDateString('es-MX')} - {' '}
                      {new Date(transaction.createdAt).toLocaleTimeString('es-MX', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-semibold">
                    ${transaction.amount.toLocaleString()} {transaction.currency}
                  </p>
                  <Badge className={getStatusColor(transaction.status)}>
                    {transaction.status.toUpperCase()}
                  </Badge>
                </div>
              </div>

              {transaction.completedAt && (
                <div className="mt-3 pt-3 border-t text-xs text-gray-500">
                  Completado el: {new Date(transaction.completedAt).toLocaleDateString('es-MX')} a las {' '}
                  {new Date(transaction.completedAt).toLocaleTimeString('es-MX', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
