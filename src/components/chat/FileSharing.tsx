
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  X, 
  FileText, 
  Image, 
  File,
  Camera,
  Scan,
  Heart
} from 'lucide-react';

interface FileSharingProps {
  onClose: () => void;
  onFileSelect: (files: File[]) => void;
}

export default function FileSharing({ onClose, onFileSelect }: FileSharingProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);

  const allowedFileTypes = [
    { type: 'image/*', label: 'Imágenes médicas', icon: Image, examples: 'JPG, PNG, DICOM' },
    { type: '.pdf,.doc,.docx', label: 'Documentos', icon: FileText, examples: 'PDF, DOC, DOCX' },
    { type: '.txt,.rtf', label: 'Notas médicas', icon: File, examples: 'TXT, RTF' }
  ];

  const quickActions = [
    { icon: Camera, label: 'Tomar Foto', action: () => console.log('Camera') },
    { icon: Scan, label: 'Escanear Documento', action: () => console.log('Scan') },
    { icon: Heart, label: 'Datos de Dispositivos', action: () => console.log('Devices') }
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(false);
    const files = Array.from(event.dataTransfer.files);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    // Simular subida de archivos
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          onFileSelect(selectedFiles);
          onClose();
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <Image className="h-4 w-4" />;
    if (file.type.includes('pdf') || file.type.includes('document')) return <FileText className="h-4 w-4" />;
    return <File className="h-4 w-4" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="border-t-0 rounded-t-none">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-sm">Compartir Archivos Médicos</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Acciones rápidas */}
        <div className="grid grid-cols-3 gap-2">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="flex flex-col gap-1 h-auto p-3"
              onClick={action.action}
            >
              <action.icon className="h-5 w-5" />
              <span className="text-xs">{action.label}</span>
            </Button>
          ))}
        </div>

        {/* Área de drop */}
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
          <p className="text-sm text-gray-600 mb-2">
            Arrastra archivos aquí o haz clic para seleccionar
          </p>
          <Input
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
            accept="image/*,.pdf,.doc,.docx,.txt,.rtf"
          />
          <Button variant="outline" size="sm" asChild>
            <label htmlFor="file-upload" className="cursor-pointer">
              Seleccionar Archivos
            </label>
          </Button>
        </div>

        {/* Tipos de archivo permitidos */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-700">Tipos de archivo permitidos:</p>
          <div className="grid grid-cols-1 gap-2">
            {allowedFileTypes.map((type, index) => (
              <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
                <type.icon className="h-3 w-3" />
                <span className="font-medium">{type.label}:</span>
                <span>{type.examples}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Archivos seleccionados */}
        {selectedFiles.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Archivos seleccionados:</p>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                  {getFileIcon(file)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      <Badge variant="outline" className="text-xs">
                        Médico
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progreso de subida */}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subiendo archivos...</span>
              <span>{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} />
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancelar
          </Button>
          <Button 
            onClick={handleUpload} 
            disabled={selectedFiles.length === 0 || uploadProgress > 0}
            className="flex-1"
          >
            Enviar {selectedFiles.length > 0 && `(${selectedFiles.length})`}
          </Button>
        </div>

        {/* Nota de privacidad */}
        <div className="text-xs text-gray-500 bg-blue-50 p-2 rounded">
          🔒 Todos los archivos son encriptados y cumplen con normativas médicas de privacidad.
        </div>
      </CardContent>
    </Card>
  );
}
