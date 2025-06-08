
import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface FormErrorDisplayProps {
  errors: string[];
  onDismiss?: () => void;
  title?: string;
}

export const FormErrorDisplay: React.FC<FormErrorDisplayProps> = ({
  errors,
  onDismiss,
  title = 'Errores de Validación'
}) => {
  if (!errors.length) return null;

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertTriangle className="h-4 w-4" />
      <div className="flex-1">
        <AlertDescription>
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium mb-2">{title}</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
            {onDismiss && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onDismiss}
                className="h-auto p-1 hover:bg-transparent"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </AlertDescription>
      </div>
    </Alert>
  );
};
