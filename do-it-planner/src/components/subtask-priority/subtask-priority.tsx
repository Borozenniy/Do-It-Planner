import { Tooltip } from '../tooltip/tooltip';

import { capitalizeFirstLetter } from '../../services/utils/text';

import LowPriority from '../../assets/icons/priority-low.png';
import MediumPriority from '../../assets/icons/priority-medium.png';
import HighPriority from '../../assets/icons/priority-high.png';

import './subtask-priority.scss';

type PriorityProps = {
  priority: 'no priority' | 'low' | 'medium' | 'high';
};

const prioritySelect = (priority: PriorityProps['priority']) => {
  switch (priority) {
    case 'no priority':
      return (
        <div className='priority-indicator priority-indicator--no-priority'></div>
      );
      break;
    case 'low':
      return (
        <div className='priority-indicator priority-indicator--low'>
          <img src={LowPriority} alt='' />
        </div>
      );
      break;
    case 'medium':
      return (
        <div className='priority-indicator priority-indicator--medium'>
          <img src={MediumPriority} alt='' />
        </div>
      );
      break;
    case 'high':
      return (
        <div className='priority-indicator priority-indicator--high'>
          <img src={HighPriority} alt='' />
        </div>
      );
      break;
    default:
      return (
        <div className='priority-indicator priority-indicator--no-priority'></div>
      );
  }
};

const SubtaskPriority = ({ priority }: PriorityProps) => {
  return (
    <Tooltip
      label={`${
        priority !== 'no priority'
          ? capitalizeFirstLetter(priority) + ' priority'
          : 'No priority'
      }`}
      position='bottom-center'
    >
      <div className='priority'>{prioritySelect(priority)}</div>
    </Tooltip>
  );
};

export { SubtaskPriority };
