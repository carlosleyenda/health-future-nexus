
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Share2, ZoomIn, ZoomOut, X } from 'lucide-react';
import type { MedicalDocument } from '@/types/medical-records';

interface DocumentViewerProps {
  documentId: string;
  onClose: () => void;
  userRole: 'patient' | 'doctor' | 'admin';
}

// For backward compatibility, we'll accept both props
interface LegacyDocumentViewerProps {
  document: MedicalDocument;
  onClose: () => void;
  userRole: 'patient' | 'doctor' | 'admin';
}

type CombinedProps = DocumentViewerProps | LegacyDocumentViewerProps;

export default function DocumentViewer(props: CombinedProps) {
  const [zoom, setZoom] = React.useState(100);
  
  // Handle both new and legacy prop formats
  const document = 'document' in props ? props.document : null;
  const documentId = 'documentId' in props ? props.documentId : props.document?.id;
  
  // Mock document if only ID is provided
  const mockDocument: MedicalDocument = document || {
    id: documentId || '',
    title: 'Documento Médico',
    description: 'Descripción del documento',
    category: 'consultation',
    fileType: 'application/pdf',
    fileSize: 1024000,
    fileUrl: '/placeholder.svg',
    patientId: '',
    uploadedBy: 'Dr. Sistema',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: [],
    version: 1,
    isActive: true
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));

  const isImage = mockDocument.fileType.startsWith('image/');

  return (
    <Dialog open onOpenChange={props.onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-lg font-semibold mb-2">
                {mockDocument.title}
              </DialogTitle>
              <div className="flex items-center space-x-2">
                <Badge>{mockDocument.category}</Badge>
                <span className="text-sm text-gray-500">
                  {new Date(mockDocument.createdAt).toLocaleDateString()}
                </span>
                <span className="text-sm text-gray-500">
                  por {mockDocument.uploadedBy}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {isImage && (
                <>
                  <Button variant="outline" size="sm" onClick={handleZoomOut}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-gray-600">{zoom}%</span>
                  <Button variant="outline" size="sm" onClick={handleZoomIn}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </>
              )}
              
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4" />
              </Button>
              
              {props.userRole !== 'patient' && (
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              )}
              
              <Button variant="ghost" size="sm" onClick={props.onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="p-6 pt-4 flex-1 overflow-auto">
          {mockDocument.description && (
            <p className="text-gray-600 mb-4">{mockDocument.description}</p>
          )}
          
          <div className="bg-gray-50 rounded-lg min-h-[400px] flex items-center justify-center">
            {isImage ? (
              <img
                src={mockDocument.fileUrl || '/placeholder.svg'}
                alt={mockDocument.title}
                style={{ transform: `scale(${zoom / 100})` }}
                className="max-w-full max-h-full object-contain transition-transform"
              />
            ) : (
              <div className="text-center">
                <div className="text-6xl mb-4">📄</div>
                <p className="text-gray-500">Vista previa del documento</p>
                <p className="text-sm text-gray-400 mt-2">
                  Tipo: {mockDocument.fileType}
                </p>
              </div>
            )}
          </div>
          
          {mockDocument.tags && mockDocument.tags.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Etiquetas:</h4>
              <div className="flex flex-wrap gap-2">
                {mockDocument.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">{tag}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
