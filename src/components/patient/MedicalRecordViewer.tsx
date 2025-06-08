
import React from 'react';
import { FileText, Download, Share2, Eye, Calendar, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePatientMedicalHistory } from '@/hooks/usePatient';

interface MedicalRecordViewerProps {
  patientId: string;
  searchTerm: string;
  dateFilter: string;
  recordType: string;
  onShare: (recordId: string) => void;
}

export default function MedicalRecordViewer({ 
  patientId, 
  searchTerm, 
  dateFilter, 
  recordType, 
  onShare 
}: MedicalRecordViewerProps) {
  const { data: medicalHistory } = usePatientMedicalHistory(patientId);

  // Filtrar registros según los criterios
  const filteredRecords = medicalHistory?.filter(record => {
    // Filtro de búsqueda
    if (searchTerm && !record.chiefComplaint.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !record.diagnosis.some(d => d.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return false;
    }

    // Filtro de fecha
    if (dateFilter !== 'all') {
      const recordDate = new Date(record.date);
      const now = new Date();
      const diffTime = now.getTime() - recordDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      switch (dateFilter) {
        case 'week':
          if (diffDays > 7) return false;
          break;
        case 'month':
          if (diffDays > 30) return false;
          break;
        case 'year':
          if (diffDays > 365) return false;
          break;
      }
    }

    return true;
  }) || [];

  const handleDownload = (recordId: string) => {
    console.log('Downloading record:', recordId);
    // Implementar descarga de registro
  };

  const handleView = (recordId: string) => {
    console.log('Viewing record:', recordId);
    // Implementar vista detallada
  };

  return (
    <div className="space-y-4">
      {filteredRecords.length > 0 ? (
        filteredRecords.map((record) => (
          <Card key={record.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{record.chiefComplaint}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(record.date).toLocaleDateString('es-MX', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        Dr. {record.doctorId}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleView(record.id)}>
                    <Eye className="h-4 w-4 mr-1" />
                    Ver
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDownload(record.id)}>
                    <Download className="h-4 w-4 mr-1" />
                    Descargar
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onShare(record.id)}>
                    <Share2 className="h-4 w-4 mr-1" />
                    Compartir
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {/* Diagnósticos */}
                <div>
                  <h4 className="font-medium mb-2">Diagnósticos:</h4>
                  <div className="flex flex-wrap gap-2">
                    {record.diagnosis.map((diag, index) => (
                      <Badge key={index} variant="secondary">{diag}</Badge>
                    ))}
                  </div>
                </div>

                {/* Plan de tratamiento */}
                <div>
                  <h4 className="font-medium mb-1">Plan de tratamiento:</h4>
                  <p className="text-gray-700 text-sm">{record.treatmentPlan}</p>
                </div>

                {/* Signos vitales */}
                <div>
                  <h4 className="font-medium mb-2">Signos vitales:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div className="bg-gray-50 p-2 rounded">
                      <span className="font-medium">Presión:</span>
                      <p>{record.vitalSigns.bloodPressure}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <span className="font-medium">Pulso:</span>
                      <p>{record.vitalSigns.heartRate} bpm</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <span className="font-medium">Temp:</span>
                      <p>{record.vitalSigns.temperature}°C</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <span className="font-medium">Peso:</span>
                      <p>{record.vitalSigns.weight} kg</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <span className="font-medium">Altura:</span>
                      <p>{record.vitalSigns.height} cm</p>
                    </div>
                  </div>
                </div>

                {/* Prescripciones */}
                {record.prescriptions && record.prescriptions.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Prescripciones:</h4>
                    <div className="space-y-2">
                      {record.prescriptions.map((prescription, index) => (
                        <div key={index} className="bg-blue-50 p-3 rounded-lg">
                          <p className="font-medium">{prescription.medicationName}</p>
                          <p className="text-sm text-gray-600">
                            {prescription.dosage} - {prescription.frequency} por {prescription.duration} días
                          </p>
                          {prescription.instructions && (
                            <p className="text-sm text-gray-600 mt-1">
                              Instrucciones: {prescription.instructions}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No se encontraron registros
            </h3>
            <p className="text-gray-500 mb-6">
              Intenta ajustar los filtros de búsqueda o el rango de fechas
            </p>
            <Button variant="outline">Limpiar Filtros</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
