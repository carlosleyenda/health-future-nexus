import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Upload, Filter, Clock } from 'lucide-react';
import DocumentsGrid from './DocumentsGrid';
import DocumentViewer from './DocumentViewer';
import MedicalTimeline from './MedicalTimeline';
import DocumentUpload from './DocumentUpload';
import AccessAuditLog from './AccessAuditLog';
import { usePatientDocuments, usePatientTimeline, useSearchDocuments } from '@/hooks/useMedicalRecords';
import type { MedicalDocument } from '@/types/medical-records';

interface MedicalRecordsSystemProps {
  patientId: string;
  userRole: 'patient' | 'doctor' | 'admin';
}

export default function MedicalRecordsSystem({ patientId, userRole }: MedicalRecordsSystemProps) {
  const [selectedDocument, setSelectedDocument] = useState<MedicalDocument | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [activeTab, setActiveTab] = useState('documents');

  const { data: documents, isLoading: documentsLoading } = usePatientDocuments(patientId);
  const { data: timeline, isLoading: timelineLoading } = usePatientTimeline(patientId);
  
  const { data: searchResults } = useSearchDocuments(
    patientId,
    searchQuery,
    selectedCategory ? { category: selectedCategory } : undefined
  );

  const displayDocuments = searchQuery || selectedCategory ? searchResults : documents;

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Expediente Médico Digital</h1>
          <p className="text-muted-foreground">Gestión completa de documentos médicos</p>
        </div>
        {userRole !== 'patient' && (
          <Button onClick={() => setShowUploadModal(true)} className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Subir Documento
          </Button>
        )}
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar documentos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todas las categorías</SelectItem>
                <SelectItem value="consultation">Consultas</SelectItem>
                <SelectItem value="lab_results">Análisis</SelectItem>
                <SelectItem value="imaging">Estudios</SelectItem>
                <SelectItem value="prescription">Recetas</SelectItem>
                <SelectItem value="vaccination">Vacunas</SelectItem>
                <SelectItem value="surgery">Cirugías</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
          <TabsTrigger value="timeline">Timeline Médico</TabsTrigger>
          {userRole !== 'patient' && <TabsTrigger value="audit">Registro de Acceso</TabsTrigger>}
        </TabsList>

        <TabsContent value="documents" className="space-y-4">
          {documentsLoading ? (
            <div>Cargando documentos...</div>
          ) : (
            <DocumentsGrid
              documents={displayDocuments || []}
              onDocumentSelect={setSelectedDocument}
              userRole={userRole}
            />
          )}
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          {timelineLoading ? (
            <div>Cargando timeline...</div>
          ) : (
            <MedicalTimeline
              events={timeline || []}
              onDocumentSelect={setSelectedDocument}
            />
          )}
        </TabsContent>

        {userRole !== 'patient' && (
          <TabsContent value="audit" className="space-y-4">
            <AccessAuditLog patientId={patientId} />
          </TabsContent>
        )}
      </Tabs>

      {selectedDocument && (
        <DocumentViewer
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
          userRole={userRole}
        />
      )}

      {showUploadModal && (
        <DocumentUpload
          patientId={patientId}
          onClose={() => setShowUploadModal(false)}
          onSuccess={() => {
            setShowUploadModal(false);
          }}
        />
      )}
    </div>
  );
}
