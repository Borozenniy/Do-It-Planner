import './progress-bar.scss';

interface ProgressBarProps {
  maxValue?: number;
  value?: number;
  size?: 'medium' | 'large';
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  maxValue = 100,
  value = 1,
  size = 'medium',
}) => {
  const percentage = Math.round((value / maxValue) * 100);
  const progressBarSizeInPx = (size === 'large' ? 300 : 100) + 'px';

  return (
    <div
      className='progress-bar'
      role='progressbar'
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={maxValue}
      style={
        {
          '--value': percentage,
          '--size': progressBarSizeInPx,
        } as React.CSSProperties
      }
    ></div>
  );
};

export { ProgressBar };
