
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Upload, 
  Search, 
  Filter, 
  Timeline,
  Shield,
  Share2,
  Download,
  Eye
} from 'lucide-react';
import DocumentsGrid from './DocumentsGrid';
import DocumentViewer from './DocumentViewer';
import MedicalTimeline from './MedicalTimeline';
import DocumentUpload from './DocumentUpload';
import AccessAuditLog from './AccessAuditLog';
import { usePatientDocuments, usePatientTimeline } from '@/hooks/useMedicalRecords';

interface MedicalRecordsSystemProps {
  patientId: string;
  userRole: 'patient' | 'doctor' | 'admin';
}

export default function MedicalRecordsSystem({ patientId, userRole }: MedicalRecordsSystemProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);

  const { data: documents } = usePatientDocuments(patientId);
  const { data: timeline } = usePatientTimeline(patientId);

  const categories = [
    { value: 'all', label: 'Todos', count: documents?.length || 0 },
    { value: 'consultation', label: 'Consultas', count: documents?.filter(d => d.category === 'consultation').length || 0 },
    { value: 'lab_results', label: 'Estudios', count: documents?.filter(d => d.category === 'lab_results').length || 0 },
    { value: 'imaging', label: 'Imagenología', count: documents?.filter(d => d.category === 'imaging').length || 0 },
    { value: 'prescription', label: 'Recetas', count: documents?.filter(d => d.category === 'prescription').length || 0 },
    { value: 'vaccination', label: 'Vacunas', count: documents?.filter(d => d.category === 'vaccination').length || 0 },
    { value: 'surgery', label: 'Cirugías', count: documents?.filter(d => d.category === 'surgery').length || 0 }
  ];

  const filteredDocuments = documents?.filter(doc => {
    const matchesSearch = !searchTerm || 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Expediente Digital</h1>
                <p className="text-gray-600">Sistema de gestión de documentos médicos</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="text-green-600 border-green-600">
                <Shield className="h-3 w-3 mr-1" />
                Seguro HIPAA
              </Badge>
              
              {userRole === 'doctor' && (
                <Button onClick={() => setShowUpload(true)}>
                  <Upload className="h-4 w-4 mr-2" />
                  Subir Documento
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs defaultValue="documents" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="documents">Documentos</TabsTrigger>
            <TabsTrigger value="timeline">Línea de Tiempo</TabsTrigger>
            <TabsTrigger value="viewer">Visualizador</TabsTrigger>
            <TabsTrigger value="audit">Auditoría</TabsTrigger>
          </TabsList>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Buscar documentos, diagnósticos, etiquetas..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros Avanzados
                  </Button>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {categories.map((category) => (
                    <Button
                      key={category.value}
                      variant={selectedCategory === category.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.value)}
                      className="text-xs"
                    >
                      {category.label}
                      <Badge variant="secondary" className="ml-2">
                        {category.count}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Documents Grid */}
            <DocumentsGrid
              documents={filteredDocuments}
              onSelectDocument={setSelectedDocumentId}
              userRole={userRole}
            />
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline">
            <MedicalTimeline
              events={timeline || []}
              onSelectDocument={setSelectedDocumentId}
            />
          </TabsContent>

          {/* Document Viewer Tab */}
          <TabsContent value="viewer">
            {selectedDocumentId ? (
              <DocumentViewer
                documentId={selectedDocumentId}
                userRole={userRole}
              />
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Eye className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    Selecciona un documento
                  </h3>
                  <p className="text-gray-500">
                    Elige un documento de la lista para visualizarlo aquí
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Audit Tab */}
          <TabsContent value="audit">
            <AccessAuditLog patientId={patientId} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <DocumentUpload
          patientId={patientId}
          onClose={() => setShowUpload(false)}
          onSuccess={() => setShowUpload(false)}
        />
      )}
    </div>
  );
}
