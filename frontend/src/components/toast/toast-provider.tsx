import React from 'react';
import { useToast } from '../../services/hooks/use-toast';

import ToastContainer from './toast-container';

let ToastContext: any;

const { Provider } = (ToastContext = React.createContext<any>(null));

const ToastProvider = ({ children }: any) => {
  const { toasts, removeToast, addToast } = useToast();
  return (
    <Provider
      value={{
        toasts,
        removeToast,
        addToast,
      }}
    >
      <ToastContainer />
      {children}
    </Provider>
  );
};

export { ToastContext, ToastProvider };
