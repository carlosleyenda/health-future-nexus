
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Download, FileText, Search, Eye, Mail } from 'lucide-react';
import { toast } from 'sonner';

interface Invoice {
  id: string;
  number: string;
  patient: string;
  doctor: string;
  service: string;
  amount: number;
  tax: number;
  total: number;
  date: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  paymentMethod: string;
}

export default function InvoiceGenerator() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const invoices: Invoice[] = [
    {
      id: '1',
      number: 'INV-2024-001',
      patient: 'Ana García López',
      doctor: 'Dr. Carlos Mendoza',
      service: 'Consulta General',
      amount: 800,
      tax: 128,
      total: 928,
      date: '2024-01-15',
      dueDate: '2024-01-30',
      status: 'paid',
      paymentMethod: 'Tarjeta de Crédito'
    },
    {
      id: '2',
      number: 'INV-2024-002',
      patient: 'Roberto Silva',
      doctor: 'Dra. María Fernández',
      service: 'Consulta Especializada',
      amount: 1200,
      tax: 192,
      total: 1392,
      date: '2024-01-14',
      dueDate: '2024-01-29',
      status: 'pending',
      paymentMethod: 'Transferencia'
    },
    {
      id: '3',
      number: 'INV-2024-003',
      patient: 'Carmen Jiménez',
      doctor: 'Dr. Luis Rodríguez',
      service: 'Consulta de Seguimiento',
      amount: 600,
      tax: 96,
      total: 696,
      date: '2024-01-13',
      dueDate: '2024-01-20',
      status: 'overdue',
      paymentMethod: 'Efectivo'
    }
  ];

  const filteredInvoices = invoices.filter(invoice =>
    invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'Pagada';
      case 'pending': return 'Pendiente';
      case 'overdue': return 'Vencida';
      default: return status;
    }
  };

  const downloadPDF = (invoice: Invoice) => {
    toast.success(`Descargando factura ${invoice.number} en PDF`);
    // Simulate PDF download
    console.log('Generating PDF for invoice:', invoice.id);
  };

  const sendEmail = (invoice: Invoice) => {
    toast.success(`Enviando factura ${invoice.number} por email`);
    // Simulate email sending
    console.log('Sending email for invoice:', invoice.id);
  };

  const viewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
  };

  const InvoiceDetailModal = ({ invoice }: { invoice: Invoice }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Factura {invoice.number}</CardTitle>
          <Button variant="ghost" onClick={() => setSelectedInvoice(null)}>
            ✕
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Invoice Header */}
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-semibold">Clínica Virtual Salud+</h3>
              <p className="text-sm text-muted-foreground">
                Av. Principal 123, CDMX<br/>
                RFC: CVS123456789<br/>
                Tel: +52 55 1234 5678
              </p>
            </div>
            <div className="text-right">
              <h3 className="text-lg font-semibold">{invoice.number}</h3>
              <p className="text-sm text-muted-foreground">
                Fecha: {new Date(invoice.date).toLocaleDateString('es-MX')}<br/>
                Vencimiento: {new Date(invoice.dueDate).toLocaleDateString('es-MX')}
              </p>
            </div>
          </div>

          {/* Patient Info */}
          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Facturar a:</h4>
            <p className="text-sm">
              {invoice.patient}<br/>
              Cliente desde 2023
            </p>
          </div>

          {/* Service Details */}
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">Detalles del Servicio</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium">{invoice.service}</p>
                  <p className="text-sm text-muted-foreground">Atendido por: {invoice.doctor}</p>
                  <p className="text-sm text-muted-foreground">Fecha de consulta: {new Date(invoice.date).toLocaleDateString('es-MX')}</p>
                </div>
                <p className="font-medium">${invoice.amount.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Totals */}
          <div className="border-t pt-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${invoice.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>IVA (16%):</span>
                <span>${invoice.tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total:</span>
                <span>${invoice.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Información de Pago</h4>
            <div className="flex items-center justify-between">
              <span>Método de pago: {invoice.paymentMethod}</span>
              <Badge className={getStatusColor(invoice.status)}>
                {getStatusText(invoice.status)}
              </Badge>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button onClick={() => downloadPDF(invoice)} className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Descargar PDF
            </Button>
            <Button onClick={() => sendEmail(invoice)} variant="outline" className="flex-1">
              <Mail className="h-4 w-4 mr-2" />
              Enviar por Email
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Facturas y Recibos
            </CardTitle>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Exportar Todo
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar facturas..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredInvoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className="font-medium">{invoice.number}</div>
                    <div className="text-sm text-muted-foreground">
                      {invoice.patient} • {invoice.service}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(invoice.date).toLocaleDateString('es-MX')}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${invoice.total.toLocaleString()}</div>
                  <Badge className={getStatusColor(invoice.status)}>
                    {getStatusText(invoice.status)}
                  </Badge>
                  <div className="flex items-center gap-1 mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => viewInvoice(invoice)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => downloadPDF(invoice)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => sendEmail(invoice)}
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedInvoice && <InvoiceDetailModal invoice={selectedInvoice} />}
    </div>
  );
}
