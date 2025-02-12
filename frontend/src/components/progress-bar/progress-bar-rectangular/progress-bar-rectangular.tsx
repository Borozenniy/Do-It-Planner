import './progress-bar-rectangular.scss';

type ProgressBarRectangularProps = {
  value: number;
  maxValue: number;
};

const ProgressBarRectangular = ({
  value,
  maxValue,
}: ProgressBarRectangularProps) => {
  return (
    <div className='progress-bar-rectangular'>
      <progress value={value} max={maxValue}></progress>
    </div>
  );
};

export { ProgressBarRectangular };
