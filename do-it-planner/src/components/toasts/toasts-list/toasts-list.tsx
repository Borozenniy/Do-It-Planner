import Toast from '../toast/toast';
import { Toast as ToastType } from '../types';

interface ToastsListProps {
  toasts: ToastType[];
  removeToast: (id: number) => void;
}

function ToastsList({ toasts, removeToast }: ToastsListProps) {
  return (
    <>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </>
  );
}

export default ToastsList;
