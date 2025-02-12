export type ToastType =
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'quest'
  | 'completed';

export type Toast = {
  id: number;
  message: string;
  type: ToastType;
  autoClose?: boolean;
  additionalMessage?: string;
  redirectTo?: string;
};

export type AddToastFunction = (toast: Omit<Toast, 'id'>) => void;

export type AddToastType = {
  addToast: AddToastFunction;
};
