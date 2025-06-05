import { useState, useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { ModalContext } from '../../modal/modal-provider';
import { ToastContext } from '../../toast/toast-provider';
import { Button } from '../../buttons/button';

import { AddToastType } from '../../toasts/types';
import { GoalProps } from '../../goals/goal/goal';
import { subTaskProps } from '../../kanban/kanban';

import { getGoals } from '../../../services/api/user';
import { createSubtask } from '../../../services/api/subtask';

import CloseIcon from '../../../assets/icons/close.png';
import './add-subtask.scss';

type taskType = {
  //goalId: number;
  mode: 'kanban' | 'eisenhower';
  taskData: {
    title: string;
    phase: 'to do' | 'in progress' | 'done';
    priority: PriorityType;
  };
};

type AddSubtaskProps = {
  goalId: string;
  setSelectedGoal: any;
  mode: 'kanban' | 'eisenhower';
};

type KanbanTaskProps = {
  mode: 'kanban';
  taskData: {
    title: string;
    phase: 'to do' | 'in progress' | 'done';
    priority: 'no priority' | 'low' | 'medium' | 'high';
  };
};

type EisenhowerTaskProps = {
  mode: 'eisenhower';
  taskData: {
    title: string;
    phase?: KanbanTaskProps['taskData']['phase'];
    priority:
      | 'urgent-important'
      | 'urgent-non-important'
      | 'non-urgent-important'
      | 'non-urgent-non-important';
  };
};

type PriorityType =
  | KanbanTaskProps['taskData']['priority']
  | EisenhowerTaskProps['taskData']['priority'];

const AddSubtask = ({ goalId, setSelectedGoal, mode }: any) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const { closeModal } = useContext(ModalContext) as any;
  const { addToast } = useContext(ToastContext) as AddToastType;
  const [title, setTitle] = useState<taskType['taskData']['title']>('');
  const [phase, setPhase] = useState<taskType['taskData']['phase']>('to do');
  const [priority, setPriority] = useState<PriorityType>(
    mode === 'kanban' ? 'no priority' : 'urgent-important'
  );

  const addSubtask = async () => {
    if (!title) return;
    const token = await getAccessTokenSilently({
      detailedResponse: false,
    });
    const newTask: taskType = {
      mode: mode,
      taskData: {
        title: title,
        phase: phase,
        priority: priority,
      },
    };

    const result = await createSubtask(token, goalId, newTask);
    if (result.status === 'success') {
      closeModal();
      addSubtaskSuccessToast();
      updateGoal();
      cleanForm();
    } else {
      addSubtaskErrorToast(result.message);
      console.log(result);
    }
  };

  const updateGoal = async () => {
    const token = await getAccessTokenSilently({
      detailedResponse: false,
    });
    const goalsData = await getGoals(token);
    const goal = goalsData.filter((goal: GoalProps) => goal.id === goalId);
    if (goal.length > 0) {
      setSelectedGoal(goal[0]);
      console.log('new goal', goal);
    }
  };

  const addSubtaskSuccessToast = () => {
    addToast({
      type: 'success',
      message: 'Subtask added successfully',
    });
  };

  const addSubtaskErrorToast = (message: string) => {
    addToast({
      type: 'error',
      message: message,
      additionalMessage: 'Subtask not added, pleast try again',
    });
  };

  const cleanForm = () => {
    setTitle('');
    setPhase('to do');
    setPriority(mode === 'kanban' ? 'no priority' : 'urgent-important');
  };

  useEffect(() => {
    cleanForm();
  }, []);

  return (
    <div className='add-subtask'>
      <div className='add-subtask__container'>
        <div className='subtask-form'>
          <div className='subtask-form__option subtask-form__option--title'>
            <div className='subtask-form__option-title'>
              <span>Task title</span>
            </div>
            <div className='subtask-form__input-bar'>
              <input
                type='text'
                placeholder='Enter your goal'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <Button
                img={CloseIcon}
                mode='danger'
                onClick={() => setTitle('')}
              />
            </div>
          </div>
          <div>
            {mode === 'kanban' && (
              <div className='subtask-form__option subtask-form__option--phase'>
                <div className='subtask-form__option-title'>
                  <span>Phase</span>
                </div>
                <select
                  value={phase}
                  onChange={(e) =>
                    setPhase(
                      e.target.value as KanbanTaskProps['taskData']['phase']
                    )
                  }
                >
                  <option value='to do'>To do</option>
                  <option value='in progress'>In progress</option>
                  <option value='done'>Done</option>
                </select>
              </div>
            )}
            <div className='subtask-form__option subtask-form__option--priority'>
              <div className='subtask-form__option-title'>
                <span>Priority</span>
              </div>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as PriorityType)}
              >
                {mode === 'kanban' && (
                  <>
                    <option value='No priority'>No priority</option>
                    <option value='low'>Low</option>
                    <option value='medium'>Medium</option>
                    <option value='high'>High</option>
                  </>
                )}
                {mode === 'eisenhower' && (
                  <>
                    <option value='urgent-important'>Urgent | Important</option>
                    <option value='urgent-non-important'>
                      Urgent | Not Importand
                    </option>
                    <option value='non-urgent-important'>
                      Non urgent | Important
                    </option>
                    <option value='non-urgent-non-important'>
                      Non urgent | Not Important
                    </option>
                  </>
                )}
              </select>
            </div>
          </div>
        </div>
        {/*<div>
          <span>Subtask description</span>
          <textarea></textarea>
        </div>*/}
        <div className='add-subtask__buttons'>
          <Button label='Add task' onClick={addSubtask} disabled={!title} />
        </div>
      </div>
    </div>
  );
};

export { AddSubtask };
