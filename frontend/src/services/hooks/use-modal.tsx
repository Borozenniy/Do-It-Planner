import { useState } from 'react';

export function useModal() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const openModal = (content: any) => {
    setShowModal(true);
    if (content) {
      setModalContent(content);
    }
  };

  const closeModal = () => {
    //history.replaceState({}, document.title, window.location.href.split('#')[0]);
    setShowModal(false);
  };

  return {
    showModal,
    openModal,
    closeModal,
    modalContent,
  };
}
