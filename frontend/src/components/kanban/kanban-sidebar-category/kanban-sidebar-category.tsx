import { useState, useEffect, useContext, Suspense } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { ModalContext } from '../../modal/modal-provider';
import { ToastContext } from '../../toast/toast-provider';
import { AddToastType } from '../../toasts/types';
import { Subtask } from '../../subtask/subtask';
import { Button } from '../../buttons/button';
import { Tooltip } from '../../tooltip/tooltip';
import { AddSubtask } from '../../modals/add-subtask/add-subtask';
import { GoalProps } from '../../goals/goal/goal';
import { subTaskProps } from '../kanban';

import { getGoals } from '../../../services/api/user';
import {
  changeSubtaskPhase,
  removeSubtask,
  getTasks,
} from '../../../services/api/subtask';

import ArrowDownIcon from '../../../assets/icons/arrow-down.png';
import ArrowUpIcon from '../../../assets/icons/arrow-up.png';
import AddIcon from '../../../assets/icons/add-circle.svg';

import './kanban-sidebar-category.scss';

//type subTask = {
//  title: string;
//  phase: 'to do' | 'in progress' | 'done';
//  priority: 'no priority' | 'low' | 'medium' | 'high';
//  id: number;
//};

interface KanbanSidebarCategoryProps {
  selectedGoal: any;
  setSelectedGoal: any;
  label: string;
  tasks: subTaskProps[];
}

function KanbanSidebarCategory({
  selectedGoal,
  setSelectedGoal,
  label,
  tasks,
}: KanbanSidebarCategoryProps) {
  const { user, getAccessTokenSilently } = useAuth0();
  const { openModal, closeModal } = useContext(ModalContext) as any;
  const { addToast } = useContext(ToastContext) as AddToastType;
  const [isOpen, setIsOpen] = useState(false);
  const [subTasks, setSubTasks] = useState<subTaskProps[]>([]);
  //console.log(tasks);

  const updateGoal = async () => {
    const token = await getAccessTokenSilently({
      detailedResponse: false,
    });
    const goalsData = await getGoals(token);
    const goal = goalsData.find((goal) => goal.id === selectedGoal.id);
    if (goal) setSelectedGoal(goal);
  };

  const fetchTasks = async () => {
    const token = await getAccessTokenSilently({
      detailedResponse: false,
    });

    const result = await getTasks(token, selectedGoal.id);
    if (result.status === 'success') {
      console.log('success');
      //setSubTasks(result.subgoal);
      setSubTasks(result.tasks);
      //console.log(result.tasks);
    }
  };

  const handleRaisePhase = (subTask: subTaskProps) => {
    const subtaskRaisedPhase = raisePhase(subTask.phase);
    handleChangeSubtaskPhase(subTask.id, subtaskRaisedPhase);
  };

  const handleDecreasePhase = (subTask: subTaskProps) => {
    const subtaskDecreasedPhase = decreasePhase(subTask.phase);
    handleChangeSubtaskPhase(subTask.id, subtaskDecreasedPhase);
  };

  const handleChangeSubtaskPhase = async (
    subtaskId: string,
    phase: subTaskProps['phase']
  ) => {
    const token = await getAccessTokenSilently({
      detailedResponse: false,
    });
    const taskData = {
      id: subtaskId,
      phase: phase,
    };
    const result = await changeSubtaskPhase(token, selectedGoal.id, taskData);
    if (result.status === 'success') {
      //console.log(result);
      updateGoal();
      //fetchTasks();
    } else {
      //console.log(result.status);
      //updateGoal();
    }
  };

  const deleteSubTask = async (subTask: subTaskProps) => {
    const token = await getAccessTokenSilently({
      detailedResponse: false,
    });

    const result = await removeSubtask(token, selectedGoal.id, subTask.id);
    if (result.status === 'success') {
      updateGoal();
      removeSubtaskSuccessToast();
      closeModal();
    } else {
      removeSubtaskErrorToast(result.message);
    }
  };

  const decreasePhase = (phase: subTaskProps['phase']) => {
    if (phase === 'done') {
      return 'in progress';
    } else {
      return 'to do';
    }
  };

  const raisePhase = (phase: subTaskProps['phase']) => {
    if (phase === 'to do') {
      return 'in progress';
    } else {
      return 'done';
    }
  };

  const addNewSubgoal = (e: any) => {
    e.stopPropagation();
    openModal(
      <AddSubtask setSelectedGoal={setSelectedGoal} goalId={selectedGoal.id} />
    );
  };

  const removeSubtaskSuccessToast = () => {
    addToast({
      type: 'success',
      message: 'Subtask removed successfully',
    });
  };

  const removeSubtaskErrorToast = (message: string) => {
    addToast({
      type: 'error',
      message: message,
      additionalMessage: 'Subtask not removed, pleast try again',
    });
  };

  useEffect(() => {
    //fetchTasks();
    setSubTasks(tasks);
  }, [selectedGoal, tasks]);

  return (
    <div className='kanban-sidebar-category'>
      <div
        className='kanban-sidebar-category__header'
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className='kanban-sidebar-category__title'>
          <div className='kanban-sidebar-category__icon'>
            <img src={isOpen ? ArrowUpIcon : ArrowDownIcon} alt='' />
          </div>
          <p>
            {label.toLocaleUpperCase()} {subTasks.length}
          </p>
        </div>
        {/*<div className='kanban-sidebar-category__buttons'>*/}
        {label === 'to do' && (
          <div>
            <Tooltip label='Add a new subgoal' position='bottom'>
              <Button
                size='small'
                isRounded
                img={AddIcon}
                onClick={addNewSubgoal}
              />
            </Tooltip>
          </div>
        )}
        {/*</div>*/}
      </div>
      <div
        className={`kanban-sidebar-category__subtasks ${
          isOpen ? 'kanban-sidebar-category__subtasks--open' : ''
        }`}
      >
        {subTasks
          .filter((tasks) => tasks.phase === label)
          .map((task) => (
            <Subtask
              key={task.id}
              subtask={task}
              decreasePhase={handleDecreasePhase}
              raisePhase={handleRaisePhase}
              deleteSubtask={deleteSubTask}
            />
          ))}
      </div>
    </div>
  );
}

export { KanbanSidebarCategory };
