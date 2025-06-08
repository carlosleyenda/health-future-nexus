
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface UseAsyncOperationOptions {
  successMessage?: string;
  errorMessage?: string;
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
}

export const useAsyncOperation = <T = any>(
  options: UseAsyncOperationOptions = {}
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  const {
    successMessage = 'Operación completada exitosamente',
    errorMessage = 'Ha ocurrido un error',
    showSuccessToast = true,
    showErrorToast = true,
  } = options;

  const execute = useCallback(
    async (asyncFunction: () => Promise<T>) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await asyncFunction();
        setData(result);
        
        if (showSuccessToast) {
          toast.success(successMessage);
        }
        
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Error desconocido');
        setError(error);
        
        if (showErrorToast) {
          toast.error(errorMessage, {
            description: error.message
          });
        }
        
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [successMessage, errorMessage, showSuccessToast, showErrorToast]
  );

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setData(null);
  }, []);

  const retry = useCallback(
    (asyncFunction: () => Promise<T>) => {
      return execute(asyncFunction);
    },
    [execute]
  );

  return {
    isLoading,
    error,
    data,
    execute,
    reset,
    retry,
  };
};
