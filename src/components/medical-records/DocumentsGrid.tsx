
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Image, 
  FileType, 
  Download, 
  Share2, 
  Eye,
  Clock,
  User,
  Tag,
  Shield
} from 'lucide-react';
import type { MedicalDocument } from '@/types/medical-records';

interface DocumentsGridProps {
  documents: MedicalDocument[];
  onSelectDocument: (documentId: string) => void;
  userRole: 'patient' | 'doctor' | 'admin';
}

export default function DocumentsGrid({ documents, onSelectDocument, userRole }: DocumentsGridProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'imaging': return <Image className="h-5 w-5" />;
      case 'lab_results': return <FileType className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'consultation': return 'bg-blue-100 text-blue-800';
      case 'lab_results': return 'bg-green-100 text-green-800';
      case 'imaging': return 'bg-purple-100 text-purple-800';
      case 'prescription': return 'bg-orange-100 text-orange-800';
      case 'vaccination': return 'bg-pink-100 text-pink-800';
      case 'surgery': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
      <Card>
        <CardContent className="text-center py-12">
          <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No se encontraron documentos
          </h3>
          <p className="text-gray-500">
            No hay documentos que coincidan con los criterios de búsqueda
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {documents.map((document) => (
        <Card key={document.id} className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${getCategoryColor(document.category)}`}>
                  {getCategoryIcon(document.category)}
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-sm font-medium truncate">
                    {document.title}
                  </CardTitle>
                  <p className="text-xs text-gray-500 truncate">
                    {document.fileName}
                  </p>
                </div>
              </div>
              
              {document.digitalSignature && (
                <Shield className="h-4 w-4 text-green-600" />
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Description */}
            {document.description && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {document.description}
              </p>
            )}

            {/* Tags */}
            {document.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {document.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    <Tag className="h-2 w-2 mr-1" />
                    {tag}
                  </Badge>
                ))}
                {document.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{document.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}

            {/* Metadata */}
            <div className="space-y-2 text-xs text-gray-500">
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {new Date(document.uploadedAt).toLocaleDateString('es-MX', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </div>
              <div className="flex items-center">
                <User className="h-3 w-3 mr-1" />
                Subido por: {document.uploadedBy}
              </div>
              <div className="text-gray-400">
                {formatFileSize(document.fileSize)}
              </div>
            </div>

            {/* Shared Status */}
            {document.isShared && (
              <div className="flex items-center text-xs text-blue-600">
                <Share2 className="h-3 w-3 mr-1" />
                Compartido con {document.sharedWith.length} profesional(es)
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-2 pt-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onSelectDocument(document.id)}
                className="flex-1"
              >
                <Eye className="h-3 w-3 mr-1" />
                Ver
              </Button>
              
              <Button size="sm" variant="outline">
                <Download className="h-3 w-3 mr-1" />
                Descargar
              </Button>
              
              {userRole === 'doctor' && (
                <Button size="sm" variant="outline">
                  <Share2 className="h-3 w-3 mr-1" />
                  Compartir
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
