
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, FileSpreadsheet, FileText, Calendar } from 'lucide-react';
import { toast } from 'sonner';

interface ReportGeneratorProps {}

export function ReportsGenerator({}: ReportGeneratorProps) {
  const [reportType, setReportType] = useState<string>('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [format, setFormat] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const reportTypes = [
    { value: 'appointments', label: 'Reporte de Citas' },
    { value: 'financial', label: 'Reporte Financiero' },
    { value: 'patients', label: 'Reporte de Pacientes' },
    { value: 'doctors', label: 'Reporte de Doctores' },
    { value: 'prescriptions', label: 'Reporte de Prescripciones' },
    { value: 'system', label: 'Reporte del Sistema' }
  ];

  const formats = [
    { value: 'pdf', label: 'PDF', icon: FileText },
    { value: 'excel', label: 'Excel', icon: FileSpreadsheet },
    { value: 'csv', label: 'CSV', icon: Download }
  ];

  const generateReport = async () => {
    if (!reportType || !format || !dateRange.start || !dateRange.end) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    setIsGenerating(true);
    
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate file download
      const fileName = `reporte_${reportType}_${dateRange.start}_${dateRange.end}.${format}`;
      toast.success(`Reporte generado: ${fileName}`);
      
      // In a real implementation, this would trigger a file download
      console.log('Generating report:', { reportType, format, dateRange });
      
    } catch (error) {
      toast.error('Error al generar el reporte');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Generador de Reportes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="reportType">Tipo de Reporte</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="format">Formato</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar formato" />
                </SelectTrigger>
                <SelectContent>
                  {formats.map((fmt) => (
                    <SelectItem key={fmt.value} value={fmt.value}>
                      <div className="flex items-center gap-2">
                        <fmt.icon className="h-4 w-4" />
                        {fmt.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Fecha de Inicio</Label>
              <Input
                id="startDate"
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="endDate">Fecha de Fin</Label>
              <Input
                id="endDate"
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              />
            </div>
          </div>

          <Button 
            onClick={generateReport} 
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Calendar className="h-4 w-4 mr-2 animate-spin" />
                Generando Reporte...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Generar Reporte
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Reportes Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'Reporte Financiero Diciembre', date: '2024-01-15', format: 'PDF', size: '2.4 MB' },
              { name: 'Reporte de Citas Semanal', date: '2024-01-14', format: 'Excel', size: '1.8 MB' },
              { name: 'Reporte de Pacientes Mensual', date: '2024-01-10', format: 'CSV', size: '856 KB' }
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{report.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {report.date} • {report.format} • {report.size}
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ReportsGenerator;
