
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

interface LegacyDocumentViewerProps {
  document: MedicalDocument;
  onClose: () => void;
  userRole: 'patient' | 'doctor' | 'admin';
}

type CombinedProps = DocumentViewerProps | LegacyDocumentViewerProps;

export default function DocumentViewer(props: CombinedProps) {
  const [zoom, setZoom] = React.useState(100);
  
  const document = 'document' in props ? props.document : null;
  const documentId = 'documentId' in props ? props.documentId : props.document?.id;
  
  const mockDocument: MedicalDocument = document || {
    id: documentId || '',
    patientId: 'patient-1',
    doctorId: 'doctor-1',
    category: 'consultation',
    type: 'pdf',
    title: 'Documento Médico',
    description: 'Descripción del documento',
    fileName: 'documento.pdf',
    fileUrl: '/placeholder.svg',
    fileSize: 1024000,
    mimeType: 'application/pdf',
    uploadedAt: new Date().toISOString(),
    uploadedBy: 'Dr. Sistema',
    tags: [],
    isShared: false,
    sharedWith: [],
    accessHistory: [],
    date: new Date().toISOString().split('T')[0],
    doctor: 'Dr. Sistema',
    fileType: 'PDF',
    url: '/placeholder.svg'
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));

  const isImage = mockDocument.mimeType.startsWith('image/');

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Dialog open onOpenChange={props.onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0" role="dialog" aria-labelledby="document-title">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <DialogTitle id="document-title" className="text-lg font-semibold mb-2 truncate">
                {mockDocument.title}
              </DialogTitle>
              <div className="flex items-center space-x-2 flex-wrap">
                <Badge>{mockDocument.category}</Badge>
                <span className="text-sm text-gray-500">
                  {formatFileSize(mockDocument.fileSize)}
                </span>
                <time className="text-sm text-gray-500" dateTime={mockDocument.uploadedAt}>
                  {new Date(mockDocument.uploadedAt).toLocaleDateString('es-ES')}
                </time>
                <span className="text-sm text-gray-500">
                  por {mockDocument.uploadedBy}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              {isImage && (
                <>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleZoomOut}
                    disabled={zoom <= 50}
                    aria-label="Reducir zoom"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-gray-600 min-w-[3rem] text-center">
                    {zoom}%
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleZoomIn}
                    disabled={zoom >= 200}
                    aria-label="Aumentar zoom"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </>
              )}
              
              <Button variant="outline" size="sm" aria-label="Descargar documento">
                <Download className="h-4 w-4" />
              </Button>
              
              {props.userRole !== 'patient' && (
                <Button variant="outline" size="sm" aria-label="Compartir documento">
                  <Share2 className="h-4 w-4" />
                </Button>
              )}
              
              <Button variant="ghost" size="sm" onClick={props.onClose} aria-label="Cerrar">
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
              <div className="text-center p-8">
                <div className="text-6xl mb-4" role="img" aria-label="Documento">📄</div>
                <p className="text-gray-500 text-lg mb-2">Vista previa del documento</p>
                <p className="text-sm text-gray-400">
                  Tipo: {mockDocument.mimeType}
                </p>
                <Button variant="outline" className="mt-4">
                  <Download className="h-4 w-4 mr-2" />
                  Descargar para ver completo
                </Button>
              </div>
            )}
          </div>
          
          {mockDocument.tags && mockDocument.tags.length > 0 && (
            <div className="mt-4" role="region" aria-label="Etiquetas del documento">
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
