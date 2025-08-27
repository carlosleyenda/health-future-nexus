
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, FileText, Calendar } from 'lucide-react';
import { useMedicalHistory } from '@/hooks/useMedicalHistory';

interface SimpleMedicalHistoryProps {
  patientId: string;
}

export default function SimpleMedicalHistory({ patientId }: SimpleMedicalHistoryProps) {
  const { data: medicalHistory, isLoading, error } = useMedicalHistory(patientId);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Historial Médico
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Historial Médico
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600">Error al cargar el historial médico</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Historial Médico
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {medicalHistory && medicalHistory.length > 0 ? (
          medicalHistory.slice(0, 3).map((record) => (
            <div key={record.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <FileText className="h-5 w-5 text-blue-600 mt-1" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {record.chief_complaint || 'Consulta médica'}
                  </h4>
                  <Badge variant="outline" className="ml-2 shrink-0">
                    {record.record_type || 'Consulta'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {record.diagnosis || 'Sin diagnóstico registrado'}
                </p>
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(record.visit_date).toLocaleDateString('es-MX')}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6">
            <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Sin historial médico</h3>
            <p className="text-gray-500">Aún no tienes registros médicos</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
