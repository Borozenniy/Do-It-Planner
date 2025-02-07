import { Button } from '../../buttons/button';

import './delete-subtask.scss';

const DeleteSubtask = ({ onConfirm, onCancel }: any) => {
  return (
    <div className='delete-subtask'>
      <div className='delete-subtask__title'>
        <p>Are you sure you want to delete this subtask ?</p>
      </div>
      <div className='delete-subtask__buttons'>
        <Button label='Cancel' mode='danger' onClick={onCancel} />
        <Button label='Delete subtask' onClick={onConfirm} />
      </div>
    </div>
  );
};

export { DeleteSubtask };
