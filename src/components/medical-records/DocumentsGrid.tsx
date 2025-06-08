
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Image, Download, Share2 } from 'lucide-react';
import type { MedicalDocument } from '@/types/medical-records';

interface DocumentsGridProps {
  documents: MedicalDocument[];
  onDocumentSelect: (document: MedicalDocument) => void;
  userRole: 'patient' | 'doctor' | 'admin';
}

export default function DocumentsGrid({ documents, onDocumentSelect, userRole }: DocumentsGridProps) {
  const getCategoryColor = (category: string) => {
    const colors = {
      consultation: 'bg-blue-100 text-blue-800',
      lab_results: 'bg-green-100 text-green-800',
      imaging: 'bg-purple-100 text-purple-800',
      prescription: 'bg-orange-100 text-orange-800',
      vaccination: 'bg-pink-100 text-pink-800',
      surgery: 'bg-red-100 text-red-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes('image')) return Image;
    return FileText;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (documents.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-500">No se encontraron documentos</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4" role="grid">
      {documents.map((document) => {
        const FileIcon = getFileIcon(document.mimeType);
        
        return (
          <Card 
            key={document.id} 
            className="hover:shadow-md transition-shadow cursor-pointer focus-within:ring-2 focus-within:ring-blue-500"
            role="gridcell"
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <FileIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                  <Badge className={getCategoryColor(document.category)}>
                    {document.category}
                  </Badge>
                </div>
                <time className="text-xs text-gray-500" dateTime={document.uploadedAt}>
                  {new Date(document.uploadedAt).toLocaleDateString('es-ES')}
                </time>
              </div>
              
              <h3 className="font-medium text-sm mb-2 line-clamp-2" title={document.title}>
                {document.title}
              </h3>
              
              {document.description && (
                <p className="text-xs text-gray-600 mb-3 line-clamp-2" title={document.description}>
                  {document.description}
                </p>
              )}
              
              <div className="text-xs text-gray-500 mb-3">
                <span>{formatFileSize(document.fileSize)}</span>
                {document.uploadedBy && (
                  <span className="ml-2">• Por {document.uploadedBy}</span>
                )}
              </div>
              
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDocumentSelect(document)}
                  aria-label={`Ver documento: ${document.title}`}
                >
                  Ver
                </Button>
                
                <div className="flex space-x-1">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    aria-label={`Descargar ${document.title}`}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  {userRole !== 'patient' && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      aria-label={`Compartir ${document.title}`}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
