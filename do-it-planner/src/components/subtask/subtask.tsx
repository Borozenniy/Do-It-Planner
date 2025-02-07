import { useContext } from 'react';
import { ModalContext } from '../modal/modal-provider';
import { DeleteSubtask } from '../modals/delete-subtask/delete-subtask';
import { SubtaskPriority } from '../subtask-priority/subtask-priority';
import { Button } from '../buttons/button';
import { Tooltip } from '../tooltip/tooltip';
import { subTaskProps } from '../kanban/kanban';

import { getDate } from '../../services/utils/date';
import { convertSubtaskPhasetoCSS } from '../../services/utils/text';

import DeleteIcon from '../../assets/icons/recycle-bin.svg';
import ArrowUp from '../../assets/icons/arrow-up.svg';
import ArrowDown from '../../assets/icons/arrow-down.svg';
import './subtask.scss';

const Subtask = ({ subtask, decreasePhase, raisePhase, deleteSubtask }) => {
  const { openModal, closeModal } = useContext(ModalContext) as any;

  const handleDeleteSubtask = (subtask: subTaskProps) => {
    openModal(
      <DeleteSubtask
        onConfirm={() => deleteSubtask(subtask as subTaskProps)}
        onCancel={closeModal}
      />
    );
  };
  return (
    <div
      className={`subtask subtask--${convertSubtaskPhasetoCSS(subtask.phase)} ${
        subtask.priority !== 'no priority' ? `subtask--${subtask.priority}` : ''
      }`}
      key={subtask.id}
      draggable
      onDragStart={(e) => handleDragStart(e, subtask.id)}
    >
      <div className='subtask__title'>{subtask.title}</div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {subtask.priority && SubtaskPriority({ priority: subtask.priority })}
        <div>{getDate(subtask.id).day + ' ' + getDate(subtask.id).month}</div>
        <div className='subtask__buttons'>
          {subtask.phase !== 'to do' && (
            <Button
              size='small'
              isRounded
              isTransparent={true}
              img={ArrowUp}
              onClick={() => decreasePhase(subtask)}
              disabled={subtask.phase === 'to do'}
            />
          )}
          {subtask.phase !== 'done' && (
            <Button
              size='small'
              isRounded
              isTransparent={true}
              img={ArrowDown}
              onClick={() => raisePhase(subtask)}
              disabled={subtask.phase === 'done'}
            />
          )}
          <Tooltip label='Delete subgoal' position='bottom-center'>
            <Button
              mode='danger'
              size='small'
              imgPosition='left'
              isRounded
              isTransparent={true}
              img={DeleteIcon}
              onClick={() => handleDeleteSubtask(subtask)}
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export { Subtask };
