import { Button } from '../../buttons/button';

import './delete-goal.scss';

type DeleteGoalProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

const DeleteGoal = ({ onConfirm, onCancel }: DeleteGoalProps) => {
  return (
    <div className='delete-goal'>
      <div className='delete-goal__title'>
        <p>Are you sure you want to delete this goal?</p>
      </div>
      <div className='delete-goal__buttons'>
        <Button label='Cancel' mode='danger' onClick={onCancel} />
        <Button label='Delete goal' onClick={onConfirm} />
      </div>
    </div>
  );
};

export { DeleteGoal };
