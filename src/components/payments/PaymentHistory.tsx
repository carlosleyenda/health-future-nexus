
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Search, Filter } from 'lucide-react';

interface PaymentHistoryProps {
  userId: string;
  patientId?: string;
}

export default function PaymentHistory({ userId, patientId }: PaymentHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Mock payment data
  const payments = [
    {
      id: 'pay1',
      date: '2024-06-07',
      amount: 800,
      type: 'consultation',
      status: 'completed',
      description: 'Consulta virtual - Dr. García'
    },
    {
      id: 'pay2',
      date: '2024-06-05',
      amount: 150,
      type: 'medication',
      status: 'completed',
      description: 'Medicamentos - Omeprazol'
    },
    {
      id: 'pay3',
      date: '2024-06-01',
      amount: 1200,
      type: 'consultation',
      status: 'pending',
      description: 'Consulta presencial - Dr. López'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'pending': return 'secondary';
      case 'failed': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historial de Pagos</CardTitle>
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar pagos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="consultation">Consultas</SelectItem>
              <SelectItem value="medication">Medicamentos</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {payments.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-medium">{payment.description}</p>
                    <p className="text-sm text-gray-500">{payment.date}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">${payment.amount}</p>
                <Badge variant={getStatusColor(payment.status)}>
                  {payment.status === 'completed' ? 'Completado' : 
                   payment.status === 'pending' ? 'Pendiente' : 'Fallido'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
