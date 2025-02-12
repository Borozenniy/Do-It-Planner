import './button.scss';

type ButtonProps = {
  mode?: 'primary' | 'danger';
  label?: string;
  img?: string;
  isActive?: boolean;
  isTransparent?: boolean;
  imgPosition?: 'left' | 'right';
  isRounded?: boolean;
  onClick: (e: any) => void;
  disabled?: boolean;
  withoutPaddings?: boolean;
  size?: 'tiny' | 'small' | 'medium' | 'large';
};

export const Button = ({
  label,
  img,
  onClick,
  size = 'medium',
  mode = 'primary',
  isActive = false,
  isTransparent = false,
  withoutPaddings = false,
  isRounded = false,
  imgPosition = 'right',
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      className={[
        'button',
        `${isActive ? 'button--active' : ''}`,
        `button--size-${size}`,
        `${isTransparent ? 'button--transparent' : ''}`,
        `button--mode-${mode}`,
        `${disabled ? 'button--disabled' : ''}`,
        `${isRounded ? 'button--rounded' : ''}`,
        `${withoutPaddings ? 'button--without-paddings' : ''}`,
        `${imgPosition === 'left' ? 'button--img-left' : ''}`,
      ].join(' ')}
      onClick={onClick}
      disabled={disabled}
    >
      {label && <span className='button__label'>{label}</span>}
      {img && (
        <img
          className={`${label && img ? 'image-padding-left' : ''}   `}
          src={img}
          alt=''
        />
      )}
    </button>
  );
};
