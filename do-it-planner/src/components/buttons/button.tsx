import './button.scss';

type ButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
};

export const Button = ({ label, onClick, disabled = false }: ButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};
