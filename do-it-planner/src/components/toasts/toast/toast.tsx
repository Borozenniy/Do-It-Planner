import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Toast as ToastType } from '../types';
import Confetti from './confetti/confetti';
import { Button } from '../../buttons/button';

import CloseIcon from '../../../assets/icons/close.png';
import './toast.scss';

export interface ToastItemProps {
  toast: ToastType;
  onClose: () => void;
}

//const toastIcons: { [key: string]: string } = {
//  success: Success,
//  warning: Warning,
//  error: Error,
//  info: Info,
//  quest: RocketIconPurple,
//  completed: RocketIconBlack,
//};

const TOAST_CLOSING_ANIMATION_DURATION = 630;

const Toast = ({ toast, onClose }: ToastItemProps) => {
  const [isActive, setIsActive] = useState(true);
  const parentRef = useRef(null);
  const navigate = useNavigate();
  const handleOnClose = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsActive(false);
    setTimeout(() => {
      onClose();
    }, TOAST_CLOSING_ANIMATION_DURATION);
  };

  const redirectToDashboard = () => {
    if (
      toast.redirectTo &&
      toast.redirectTo !== '' &&
      typeof window !== 'undefined'
    ) {
      navigate(toast.redirectTo);
    }
  };

  return (
    <div
      className={`toast ${isActive ? 'toast--active' : ''} ${
        toast.type === 'completed' || toast.type === 'quest'
          ? 'toast--clickable'
          : ''
      }`}
      ref={parentRef}
      onClick={redirectToDashboard}
    >
      {toast.type === 'completed' && <Confetti parentRef={parentRef} />}
      <div className='toast__button-close'>
        <Button
          size='tiny'
          mode='danger'
          isTransparent={true}
          img={CloseIcon}
          onClick={handleOnClose}
        />
        {/*&times;*/}
      </div>
      <div className='toast__message'>
        {/*{toast.type in toastIcons && (
          <img
            className='toast__icon'
            src={toastIcons[toast.type]}
            alt={toast.type}
          />
        )}*/}
        <p className='toast__title'>{toast.message}</p>
        {toast.additionalMessage && (
          <div className='toast__additional-message'>
            <p>{toast.additionalMessage}</p>
          </div>
        )}
      </div>
      <div
        className={`toast__progress-bar ${
          toast.autoClose
            ? `toast__progress-bar--active toast__progress-bar--mode-${toast.type}`
            : ''
        }`}
      />
    </div>
  );
};

export default Toast;
