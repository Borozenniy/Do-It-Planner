import { InfoIcon } from '../icon/info-icon/info-icon';
import './eisenhower-matrix.scss';

const einsenhowerMatrixBlocks = [
  'urgent-important',
  'urgent-non-important',
  'non-urgent-important',
  'non-urgent-non-important',
];

const EisenhowerMatrix = () => {
  const showBlockTitle = (block: string) => {
    switch (block) {
      case 'urgent-important':
        return (
          <>
            <span>Urgent / Important</span>
            <InfoIcon
              titleLabel='Do it now'
              label='These tasks have the highest priority and should be done immediately. Сritical cases requiring immediate attention (crises, deadlines).'
            />
          </>
        );
      case 'urgent-non-important':
        return (
          <>
            <span>Urgent / Non important</span>
            <InfoIcon
              titleLabel='Long / medium term. Planning'
              label='Strategically important tasks that should be done in advance to avoid delays and disruptions.'
            />
          </>
        );
      case 'non-urgent-important':
        return (
          <>
            <span>Non urgent / important</span>
            <InfoIcon
              titleLabel='Routine tasks'
              label='Tasks that can be done at any time and do not require immediate attention. They are not time-sensitive or require a specific order.'
            />
          </>
        );
      case 'non-urgent-non-important':
        return (
          <>
            <span>Non urgent / Non important</span>
            <InfoIcon
              titleLabel='Irrelevant or tasks with minimal effect'
              label='Tasks that are not important or have no impact on the project or goals. What can be eliminated or minimized.'
            />
          </>
        );
    }
  };
  return (
    <div className='eisenhower-matrix'>
      <div className='eisenhower-matrix__container'>
        <div className='eisenhower-matrix__board'>
          {einsenhowerMatrixBlocks.map((block) => (
            <div
              className={`eisenhower-matrix__block eisenhower-matrix__block--${block}`}
            >
              <div className='eisenhower-matrix__title'>
                {showBlockTitle(block)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { EisenhowerMatrix };
