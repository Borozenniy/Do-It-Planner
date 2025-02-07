import { useEffect, useState, useContext } from 'react';
import { ModalContext } from '../../modal/modal-provider';
import { DeleteGoal } from '../../modals/delete-goal/delete-goal';
import { ProgressBarRectangular } from '../../progress-bar/progress-bar-rectangular/progress-bar-rectangular';
import { SubtaskPriority } from '../../subtask-priority/subtask-priority';
import { Button } from '../../buttons/button';
import { Tooltip } from '../../tooltip/tooltip';

import { capitalizeFirstLetter } from '../../../services/utils/text';
import { getDate } from '../../../services/utils/date';

import DeleteIcon from '../../../assets/icons/recycle-bin.svg';
import SubtaskIcon from '../../../assets/icons/tasks.svg';
import HorizontalDotsIcon from '../../../assets/icons/dots-horizontal.svg';

import './goal.scss';

type GoalProps = {
  goal: any;
  removeGoal?: any;
  onClick?: any;
  highPriority: boolean;
  isActive?: boolean;
  hasProgressBar: boolean;
};
const Goal = ({
  goal,
  removeGoal,
  onClick,
  highPriority = false,
  isActive = false,
  hasProgressBar = false,
}: GoalProps) => {
  const { openModal, closeModal } = useContext(ModalContext) as any;
  const deleteGoal = () => {
    removeGoal(goal.id);
    closeModal();
  };

  const handleDeleteGoal = () => {
    openModal(<DeleteGoal onConfirm={deleteGoal} onCancel={closeModal} />);
  };

  const progressBarMaxValue = () => {
    if (goal.subgoals.length === 0) {
      return 1;
    }

    return goal.subgoals.length;
  };

  const progressBarValue = () => {
    if (goal.subgoals.length === 0) {
      return 0;
    }

    return goal.subgoals.filter((subgoal) => subgoal.phase === 'done').length;
  };

  const progressBarValueInPercent = () => {
    if (goal.subgoals.length === 0) {
      return 0;
    }

    return ((progressBarValue() / progressBarMaxValue()) * 100).toFixed(0);
  };

  return (
    <div
      className={[
        'goal',
        onClick ? 'goal-clickable' : '',
        highPriority ? 'goal--hight-priority' : 'goal--no-priority',
        isActive && highPriority ? 'goal--active-hight-priority' : '',
        isActive && !highPriority ? 'goal--active-no-priority' : '',
      ].join(' ')}
      onClick={onClick}
    >
      <div className='goal__content'>
        {hasProgressBar && (
          <div className='goal__progress-bar'>
            <Tooltip
              label={`${progressBarValueInPercent()}%`}
              position='bottom'
            >
              <ProgressBarRectangular
                value={progressBarValue()}
                maxValue={progressBarMaxValue()}
              />
            </Tooltip>
          </div>
        )}
        <div className='goal__title'>
          <p className='goal__text'>{goal.name}</p>
        </div>
        <div className='goal__info'>
          <div className='goal__indicators'>
            <div className='goal__date'>
              <p>{getDate(goal.id).day + ' ' + getDate(goal.id).month} </p>{' '}
            </div>
            {goal.mode !== 'none' && (
              <Tooltip
                label={capitalizeFirstLetter(goal.mode)}
                position='bottom'
              >
                <div className='goal__sign'>{goal.mode[0].toUpperCase()}</div>
              </Tooltip>
            )}
            {goal.subgoals.length > 0 && (
              <Tooltip
                label={`${goal.subgoals.length} ${
                  goal.subgoals.length > 1 ? 'subgoals' : 'subgoal'
                }`}
                position='bottom'
              >
                <div className='goal__sign goal__sign--no-border'>
                  <img src={SubtaskIcon} alt='' />
                </div>
              </Tooltip>
            )}
            {/*{hasProgressBar && (
              <div>
                <div>
                  <Tooltip
                    label={`${progressBarValueInPercent()}%`}
                    position='bottom'
                  >
                    <ProgressBarRectangular
                      value={progressBarValue()}
                      maxValue={progressBarMaxValue()}
                    />
                  </Tooltip>
                </div>
              </div>
            )}*/}
          </div>
          {/*{goal.priority}*/}
          {removeGoal && (
            <div className='goal__buttons'>
              <Tooltip label='Delete goal' position='bottom'>
                <Button
                  isTransparent={true}
                  mode='danger'
                  img={DeleteIcon}
                  onClick={handleDeleteGoal}
                />
              </Tooltip>
            </div>
          )}
        </div>
      </div>
      {/*<div className='goal__additional-info'>
        <Button
          img={HorizontalDotsIcon}
          size='small'
          isTransparent={true}
          disabled={true}
          onClick={() => console.log('')}
        />
      </div>*/}
    </div>
  );
};

export { Goal };
