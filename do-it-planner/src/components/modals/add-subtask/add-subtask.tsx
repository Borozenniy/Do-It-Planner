import { useState, useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { ModalContext } from '../../modal/modal-provider';
import { ToastContext } from '../../toast/toast-provider';
import { AddToastType } from '../../toasts/types';

import CloseIcon from '../../../assets/icons/close.png';

import { getGoals } from '../../../services/api/user';
import { createSubtask } from '../../../services/api/subtask';

import './add-subtask.scss';
import { Button } from '../../buttons/button';

type SubtaskType = {
  email: string | undefined;
  goalId: number;
  mode: 'kanban' | 'eisenhower';
  subgoalData: {
    title: string;
    phase: 'to do' | 'in progress' | 'done';
    priority: 'no priority' | 'low' | 'medium' | 'high';
    id: number;
  };
};

const AddSubtask = ({ goalId, setSelectedGoal }: any) => {
  const { user } = useAuth0();
  const { closeModal } = useContext(ModalContext) as any;
  const { addToast } = useContext(ToastContext) as AddToastType;
  const [title, setTitle] = useState<SubtaskType['subgoalData']['title']>('');
  const [phase, setPhase] =
    useState<SubtaskType['subgoalData']['phase']>('to do');
  const [priority, setPriority] =
    useState<SubtaskType['subgoalData']['priority']>('no priority');

  const addSubtask = async () => {
    if (!title) return;
    const newSubtask: SubtaskType = {
      email: user?.email,
      goalId: goalId,
      mode: 'kanban',
      subgoalData: {
        title: title,
        phase: phase,
        priority: priority,
        id: Date.now(),
      },
    };

    const result = await createSubtask(newSubtask);
    if (result.status === 'success') {
      console.log(result);
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
    const goalsData = await getGoals(user);
    const goal = goalsData.filter((goal) => goal.id === goalId);
    if (goal.length > 0) {
      setSelectedGoal(goal[0]);
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
    setPriority('no priority');
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
              <span>Subtask title</span>
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
            <div className='subtask-form__option subtask-form__option--phase'>
              <div className='subtask-form__option-title'>
                <span>Subtask phase</span>
              </div>
              <select
                value={phase}
                onChange={(e) => setPhase(e.target.value as phaseType)}
              >
                <option value='to do'>To do</option>
                <option value='in progress'>In progress</option>
                <option value='done'>Done</option>
              </select>
            </div>
            <div className='subtask-form__option subtask-form__option--priority'>
              <div className='subtask-form__option-title'>
                <span>Subtask priority</span>
              </div>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as priorityType)}
              >
                <option value='No priority'>No priority</option>
                <option value='low'>Low</option>
                <option value='medium'>Medium</option>
                <option value='high'>High</option>
              </select>
            </div>
          </div>
        </div>
        {/*<div>
          <span>Subtask description</span>
          <textarea></textarea>
        </div>*/}
        <div className='add-subtask__buttons'>
          <Button label='Add subtask' onClick={addSubtask} disabled={!title} />
        </div>
      </div>
    </div>
  );
};

export { AddSubtask };
