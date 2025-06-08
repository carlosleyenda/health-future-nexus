
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Download, 
  Share2, 
  Maximize,
  Eye,
  FileText,
  Image as ImageIcon,
  Shield,
  Clock,
  User
} from 'lucide-react';
import { useDocument, useAddAccessRecord } from '@/hooks/useMedicalRecords';
import { useAuthStore } from '@/store/auth';

interface DocumentViewerProps {
  documentId: string;
  userRole: 'patient' | 'doctor' | 'admin';
}

export default function DocumentViewer({ documentId, userRole }: DocumentViewerProps) {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  
  const { user } = useAuthStore();
  const { data: document } = useDocument(documentId);
  const addAccessRecord = useAddAccessRecord();

  React.useEffect(() => {
    if (document && user) {
      // Log access
      addAccessRecord.mutate({
        documentId: document.id,
        accessRecord: {
          userId: user.id,
          userName: `${user.firstName} ${user.lastName}`,
          userRole: user.role,
          action: 'view'
        }
      });
    }
  }, [document, user]);

  if (!document) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            Documento no encontrado
          </h3>
          <p className="text-gray-500">
            El documento seleccionado no está disponible
          </p>
        </CardContent>
      </Card>
    );
  }

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 500));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 25));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);
  const handleDownload = () => {
    console.log('Downloading document:', document.id);
    // Log download action
    addAccessRecord.mutate({
      documentId: document.id,
      accessRecord: {
        userId: user?.id || '',
        userName: user ? `${user.firstName} ${user.lastName}` : 'Unknown',
        userRole: user?.role || 'patient',
        action: 'download'
      }
    });
  };

  const isImage = document.type === 'image' || document.mimeType.startsWith('image/');
  const isPDF = document.type === 'pdf' || document.mimeType === 'application/pdf';

  return (
    <div className="space-y-6">
      {/* Document Info */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                {isImage ? (
                  <ImageIcon className="h-6 w-6 text-blue-600" />
                ) : (
                  <FileText className="h-6 w-6 text-blue-600" />
                )}
              </div>
              <div>
                <CardTitle className="text-xl">{document.title}</CardTitle>
                <p className="text-gray-600">{document.description}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {new Date(document.uploadedAt).toLocaleDateString('es-MX')}
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {document.uploadedBy}
                  </div>
                  {document.digitalSignature && (
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      <Shield className="h-3 w-3 mr-1" />
                      Firmado digitalmente
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-1" />
                Descargar
              </Button>
              {userRole === 'doctor' && (
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-1" />
                  Compartir
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Viewer */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center">
              <Eye className="h-5 w-5 mr-2" />
              Visualizador de Documento
            </CardTitle>
            
            {isImage && (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={handleZoomOut}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">{zoom}%</span>
                <Button variant="outline" size="sm" onClick={handleZoomIn}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <Button variant="outline" size="sm" onClick={handleRotate}>
                  <RotateCw className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setIsFullscreen(!isFullscreen)}>
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent>
          <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'relative'}`}>
            {isFullscreen && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
                onClick={() => setIsFullscreen(false)}
              >
                Cerrar
              </Button>
            )}
            
            <div className={`flex items-center justify-center ${isFullscreen ? 'h-full p-8' : 'min-h-[400px] bg-gray-50 rounded-lg'}`}>
              {isImage ? (
                <img
                  ref={imageRef}
                  src={document.fileUrl}
                  alt={document.title}
                  className="max-w-full max-h-full object-contain cursor-zoom-in"
                  style={{
                    transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                    transition: 'transform 0.3s ease'
                  }}
                  onClick={handleZoomIn}
                />
              ) : isPDF ? (
                <div className="text-center">
                  <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Documento PDF
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Haz clic en descargar para ver el documento completo
                  </p>
                  <Button onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" />
                    Descargar PDF
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Archivo no visualizable
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Este tipo de archivo no se puede visualizar en el navegador
                  </p>
                  <Button onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" />
                    Descargar Archivo
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Metadata */}
      {document.metadata && (
        <Card>
          <CardHeader>
            <CardTitle>Información Médica</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {document.metadata.studyDate && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Fecha del Estudio</label>
                  <p className="text-sm">{new Date(document.metadata.studyDate).toLocaleDateString('es-MX')}</p>
                </div>
              )}
              {document.metadata.modality && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Modalidad</label>
                  <p className="text-sm">{document.metadata.modality}</p>
                </div>
              )}
              {document.metadata.bodyPart && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Parte del Cuerpo</label>
                  <p className="text-sm">{document.metadata.bodyPart}</p>
                </div>
              )}
              {document.metadata.findings && (
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-500">Hallazgos</label>
                  <p className="text-sm">{document.metadata.findings}</p>
                </div>
              )}
              {document.metadata.diagnosis && (
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-500">Diagnóstico</label>
                  <p className="text-sm">{document.metadata.diagnosis}</p>
                </div>
              )}
              {document.metadata.recommendations && (
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-500">Recomendaciones</label>
                  <p className="text-sm">{document.metadata.recommendations}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
