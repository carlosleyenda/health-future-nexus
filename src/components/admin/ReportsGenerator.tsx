
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useGenerateReport } from '@/hooks/useAdminManagement';
import { useToast } from '@/hooks/use-toast';
import { BarChart3, Download, Calendar, FileText, Loader2 } from 'lucide-react';

export const ReportsGenerator = () => {
  const [reportData, setReportData] = useState<any>(null);
  const { toast } = useToast();
  const generateReportMutation = useGenerateReport();

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      type: '',
      format: '',
      startDate: '',
      endDate: '',
    },
  });

  const reportType = watch('type');

  const onSubmit = async (data: any) => {
    try {
      const result = await generateReportMutation.mutateAsync({
        type: data.type,
        dateRange: {
          start: data.startDate,
          end: data.endDate,
        },
        format: data.format,
      });
      
      setReportData(result);
      toast({
        title: 'Reporte generado exitosamente',
        description: `Reporte de ${getReportTypeLabel(data.type)} generado en formato ${data.format.toUpperCase()}.`,
      });
    } catch (error) {
      toast({
        title: 'Error al generar reporte',
        description: 'Hubo un problema al generar el reporte.',
        variant: 'destructive',
      });
    }
  };

  const getReportTypeLabel = (type: string) => {
    switch (type) {
      case 'users': return 'Usuarios';
      case 'appointments': return 'Citas';
      case 'revenue': return 'Ingresos';
      case 'medications': return 'Medicamentos';
      default: return type;
    }
  };

  const downloadReport = () => {
    if (!reportData) return;
    
    const dataStr = JSON.stringify(reportData.data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `reporte_${reportData.type}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: 'Reporte descargado',
      description: 'El archivo ha sido descargado exitosamente.',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Generador de Reportes</h2>
        <p className="text-muted-foreground">Genera reportes detallados del sistema</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Configuración del Reporte
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo de Reporte</label>
                <Select onValueChange={(value) => register('type').onChange({ target: { value } })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tipo de reporte" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="users">Usuarios</SelectItem>
                    <SelectItem value="appointments">Citas</SelectItem>
                    <SelectItem value="revenue">Ingresos</SelectItem>
                    <SelectItem value="medications">Medicamentos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Formato</label>
                <Select onValueChange={(value) => register('format').onChange({ target: { value } })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el formato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Fecha de Inicio</label>
                <Input type="date" {...register('startDate')} />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Fecha de Fin</label>
                <Input type="date" {...register('endDate')} />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={generateReportMutation.isPending}
            >
              {generateReportMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generando reporte...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Generar Reporte
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {reportData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Reporte Generado</span>
              <Button onClick={downloadReport} variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Descargar
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <Badge variant="outline">
                  Tipo: {getReportTypeLabel(reportData.type)}
                </Badge>
                <Badge variant="outline">
                  Formato: {reportData.format.toUpperCase()}
                </Badge>
                <Badge variant="outline">
                  Registros: {reportData.data.length}
                </Badge>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Vista Previa de Datos:</h4>
                <pre className="text-sm overflow-x-auto">
                  {JSON.stringify(reportData.data.slice(0, 3), null, 2)}
                </pre>
                {reportData.data.length > 3 && (
                  <p className="text-sm text-gray-500 mt-2">
                    ... y {reportData.data.length - 3} registros más
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
