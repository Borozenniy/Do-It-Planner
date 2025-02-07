import { useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalContext } from './modal-provider';
import { Button } from '../buttons/button';

import CloseIcon from '../../assets/icons/close.png';

import './modal.scss';

const modalRoot = document.querySelector('#modal-root');

const Modal = () => {
  const { showModal, closeModal, modalContent } = useContext(
    ModalContext
  ) as any;

  const closeOnEscape = (e: any) => {
    if (e.charCode || e.keyCode === 27) {
      closeModal();
    }
  };

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscape);

    return function cleanup() {
      document.body.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add('body-no-scroll');
    } else {
      document.body.classList.remove('body-no-scroll');
    }
  }, [showModal]);

  return modalRoot
    ? createPortal(
        <div className={showModal ? 'modal show' : 'modal'}>
          <div className='modal__content' onClick={(e) => e.stopPropagation()}>
            <div className='modal__close'>
              <Button
                img={CloseIcon}
                isTransparent={true}
                mode='danger'
                size='small'
                onClick={closeModal}
              />
            </div>
            <div className='modal__body'>{modalContent}</div>
          </div>
        </div>,
        modalRoot
      )
    : null;
};

export default Modal;
