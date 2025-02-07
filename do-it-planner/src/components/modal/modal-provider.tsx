import React from 'react';
import { useModal } from '../../services/hooks/use-modal';
import Modal from './modal';

let ModalContext: any;

const { Provider } = (ModalContext = React.createContext<any>(null));

const ModalProvider = ({ children }: any) => {
  const { showModal, openModal, closeModal, modalContent } = useModal();

  return (
    <Provider value={{ showModal, openModal, closeModal, modalContent }}>
      <Modal />
      {children}
    </Provider>
  );
};

export { ModalProvider, ModalContext };
