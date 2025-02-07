import {
  ReactElement,
  useEffect,
  useRef,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import ReactDOM from 'react-dom';
import './tooltip.scss';

export interface TooltipProps {
  children: ReactElement | string;
  titleLabel?: string;
  label?: string;
  withArrow?: boolean;
  position?: 'top' | 'bottom' | 'right' | 'bottom-center';
  size?: 'large' | 'medium' | 'small';
  disableHoverListener?: boolean;
}

export const Tooltip = ({
  children,
  label,
  position = 'bottom',
  withArrow = false,
  disableHoverListener = false,
  size = 'medium',
  titleLabel,
}: TooltipProps) => {
  const [isActive, setIsActive] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isTooltipWithArrow = withArrow ? 'tooltip--with-arrow' : '';
  const isTooltipActive = isActive ? 'tooltip--active' : '';

  const showTip = () => {
    if (disableHoverListener) {
      return;
    }
    setIsActive(true);
  };

  const hideTip = () => {
    setIsActive(false);
  };

  const updateTooltipPosition = useCallback(() => {
    if (isActive && tooltipRef.current && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      const tooltipWidth = tooltipRef.current.offsetWidth;

      switch (position) {
        case 'top':
          tooltipRef.current.style.top = `${rect.top - 15}px`;
          tooltipRef.current.style.left = `${rect.left + rect.width / 2}px`;
          break;
        case 'right':
          tooltipRef.current.style.top = `${rect.top + rect.height / 2}px`;
          tooltipRef.current.style.left = `${rect.right - 5}px`;
          break;
        case 'bottom':
          tooltipRef.current.style.top = `${rect.bottom}px`;
          tooltipRef.current.style.left = `${
            rect.left + rect.width / 2 - 40
          }px`;
          break;
        case 'bottom-center':
          tooltipRef.current.style.top = `${rect.bottom}px`;
          tooltipRef.current.style.left = `${
            rect.left + rect.width / 2 - 40
          }px`;
          break;
        default:
          break;
      }

      const tooltiVisibleWidth = window.innerWidth - rect.x;
      //  const tooltipOverflow = tooltipWidth - tooltiVisibleWidth;
      //  if (tooltipOverflow > 0) {
      //    tooltipRef.current.style.width = `${
      //      Math.floor(tooltiVisibleWidth) - 100
      //    }px`;
      //  }
      //}

      const tooltipOverflow = tooltipWidth - tooltiVisibleWidth;
      if (tooltipOverflow > 0) {
        tooltipRef.current.style.marginRight = `${40}px`;
      }
    }
  }, [isActive, position]);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      updateTooltipPosition();
    });
    return () => {
      window.removeEventListener('scroll', updateTooltipPosition);
    };
  }, [isActive, position]);

  useEffect(() => {
    updateTooltipPosition();
  }, [isActive]);

  const createTooltip = (): ReactNode => (
    <div
      ref={tooltipRef}
      className={`tooltip ${isTooltipWithArrow} ${isTooltipActive} tooltip--${position}`}
      style={{ left: '0px', top: '0px' }}
    >
      {withArrow && (
        <div className={`tooltip__arrow tooltip__arrow--${position}`} />
      )}
      <div className={`tooltip__tip tooltip__tip--${size}`}>
        {titleLabel && <h3>{titleLabel}</h3>}
        {label}
      </div>
    </div>
  );

  return (
    <div
      ref={wrapperRef}
      className='tooltip-wrapper'
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {children}
      {isActive &&
        ReactDOM.createPortal(
          createTooltip(),
          document.querySelector('#root') as HTMLElement
        )}
    </div>
  );
};
