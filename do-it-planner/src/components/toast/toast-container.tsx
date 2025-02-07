import { useContext } from 'react';
import { createPortal } from 'react-dom';

import { ToastContext } from './toast-provider';
import ToastsList from '../toasts/toasts-list/toasts-list';

import { Toast } from './types/index';
import './toast-container.scss';

interface ToastContainerProps {
  toasts: Toast[];
  removeToast: (id: number) => void;
}

const toastRoot = document.querySelector('#toast-root') as HTMLElement;
const ToastContainer = () => {
  const { toasts, removeToast }: ToastContainerProps = useContext(ToastContext);

  return toastRoot
    ? createPortal(
        <div className='toasts'>
          <ToastsList toasts={toasts} removeToast={removeToast} />
        </div>,
        toastRoot
      )
    : null;
};

export default ToastContainer;
