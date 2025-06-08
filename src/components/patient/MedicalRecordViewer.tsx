
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Share2 } from 'lucide-react';
import { usePatientDocuments } from '@/hooks/useMedicalRecords';
import type { MedicalDocument } from '@/types/medical-records';

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
  const { data: documents, isLoading } = usePatientDocuments(patientId);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse">Cargando documentos...</div>
        </CardContent>
      </Card>
    );
  }

  const filteredDocuments = documents?.filter((doc: MedicalDocument) => {
    const matchesSearch = !searchTerm || doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = recordType === 'all' || doc.category === recordType;
    return matchesSearch && matchesType;
  }) || [];

  return (
    <div className="space-y-4">
      {filteredDocuments.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">No se encontraron documentos</h3>
            <p className="text-gray-500">
              {searchTerm ? 'Intenta ajustar tu búsqueda' : 'Aún no hay documentos disponibles'}
            </p>
          </CardContent>
        </Card>
      ) : (
        filteredDocuments.map((document) => (
          <Card key={document.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    {document.title}
                  </CardTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    Dr. {document.doctor} • {new Date(document.date).toLocaleDateString('es-MX')}
                  </p>
                </div>
                <Badge variant="outline">{document.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  {document.fileType} • {document.fileSize}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Descargar
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onShare(document.id)}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Compartir
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
