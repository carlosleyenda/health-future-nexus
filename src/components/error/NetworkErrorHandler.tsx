
import React from 'react';
import { AlertTriangle, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';

interface NetworkErrorHandlerProps {
  error: Error | null;
  isLoading?: boolean;
  onRetry: () => void;
  showToast?: boolean;
}

export const NetworkErrorHandler: React.FC<NetworkErrorHandlerProps> = ({
  error,
  isLoading = false,
  onRetry,
  showToast = true
}) => {
  const handleRetry = () => {
    if (showToast) {
      toast.loading('Reintentando...', {
        id: 'network-retry'
      });
    }
    onRetry();
  };

  if (!error) return null;

  const isNetworkError = error.message.includes('fetch') || 
                        error.message.includes('network') ||
                        error.message.includes('Failed to fetch');

  return (
    <Alert variant="destructive" className="my-4">
      <div className="flex items-start gap-3">
        {isNetworkError ? (
          <WifiOff className="h-4 w-4 mt-0.5" />
        ) : (
          <AlertTriangle className="h-4 w-4 mt-0.5" />
        )}
        <div className="flex-1">
          <AlertTitle>
            {isNetworkError ? 'Error de Conexión' : 'Error'}
          </AlertTitle>
          <AlertDescription className="mt-1">
            {isNetworkError 
              ? 'No se pudo conectar al servidor. Verifica tu conexión a internet.'
              : error.message || 'Ha ocurrido un error inesperado'
            }
          </AlertDescription>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRetry}
            disabled={isLoading}
            className="mt-3"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Reintentando...' : 'Reintentar'}
          </Button>
        </div>
      </div>
    </Alert>
  );
};
