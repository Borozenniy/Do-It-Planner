import { useCallback, useState } from 'react';
import { Toast } from '../../components/toast/types';

interface UseToastReturn {
  toasts: Toast[];
  addToast: (toast: Toast) => void;
  removeToast: (id: number) => void;
}

const AUTOCLOSE_TIME_DURATION = 5000;

export function useToast(): UseToastReturn {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const addToast = useCallback(
    ({ autoClose = true, ...toast }: Omit<Toast, 'id'>) => {
      const newToast: Toast = {
        id: Date.now(),
        autoClose,
        ...toast,
      };
      setToasts((prevToasts) => [...prevToasts, newToast]);

      if (autoClose) {
        setTimeout(() => {
          setToasts((currentToasts) =>
            currentToasts.filter(
              (toastToDelete) => toastToDelete.id !== newToast.id
            )
          );
        }, AUTOCLOSE_TIME_DURATION);
      }
    },
    []
  );

  const removeToast = useCallback((id: number): void => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );
  }, []);

  return {
    toasts,
    removeToast,
    addToast,
  };
}
