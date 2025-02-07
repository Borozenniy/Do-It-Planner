import { useState, useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { ModalContext } from '../../modal/modal-provider';
import { ToastContext } from '../../toast/toast-provider';
import { AddToastType } from '../../toasts/types';
import { Subtask } from '../../subtask/subtask';
import { Button } from '../../buttons/button';
import { Tooltip } from '../../tooltip/tooltip';
import { AddSubtask } from '../../modals/add-subtask/add-subTask';
import { GoalProps } from '../../goals/goal/goal';
import { subTaskProps } from '../kanban';

import { getGoals } from '../../../services/api/user';
import {
  changeSubtaskPhase,
  removeSubtask,
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
  subgoals: subTaskProps[];
}

function KanbanSidebarCategory({
  selectedGoal,
  setSelectedGoal,
  label,
  subgoals,
}: KanbanSidebarCategoryProps) {
  const { user } = useAuth0();
  const { openModal, closeModal } = useContext(ModalContext) as any;
  const { addToast } = useContext(ToastContext) as AddToastType;
  const [isOpen, setIsOpen] = useState(false);
  const [subTasks, setSubTasks] = useState<subTaskProps[]>([]);

  //const updateGoal = async () => {
  //  const goalsData = await getGoals(user);
  //  //const goal = goalsData.filter((goal) => goal.id === selectedGoal.id);
  //  //if (goal.length > 0) {
  //  //  setSelectedGoal(goal[0]);
  //  //}
  //  const goal = goalsData.find((goal) => goal.id === selectedGoal.id);
  //  if (goal) {
  //    setSelectedGoal({ ...goal });
  //  }
  //};

  const handleRaisePhase = (subTask: subTaskProps) => {
    const subtaskRaisedPhase = raisePhase(subTask.phase);
    handleChangeSubtaskPhase(subTask.id, subtaskRaisedPhase);
    setSubTasks((prevSubTasks) =>
      prevSubTasks.map((task) => {
        if (task.id === subTask.id) {
          let nextPhase: subTaskProps['phase'];
          if (task.phase === 'to do') nextPhase = 'in progress';
          else if (task.phase === 'in progress') nextPhase = 'done';
          else nextPhase = 'done';
          return { ...task, phase: nextPhase };
        }
        return task;
      })
    );
  };

  const handleDecreasePhase = (subTask: subTaskProps) => {
    const subtaskDecreasedPhase = decreasePhase(subTask.phase);
    handleChangeSubtaskPhase(subTask.id, subtaskDecreasedPhase);
    setSubTasks((prevSubTasks) =>
      prevSubTasks.map((task) => {
        if (task.id === subTask.id) {
          let nextPhase: subTaskProps['phase'];
          if (task.phase === 'done') nextPhase = 'in progress';
          else if (task.phase === 'in progress') nextPhase = 'to do';
          else nextPhase = 'to do';
          return { ...task, phase: nextPhase };
        }
        return task;
      })
    );
  };

  const handleChangeSubtaskPhase = async (
    subtaskId: number,
    phase: subTaskProps['phase']
  ) => {
    const subtaskData = {
      email: user?.email,
      goalId: selectedGoal.id,
      subgoalId: subtaskId,
      phase: phase,
    };
    const result = await changeSubtaskPhase(subtaskData);
    console.log(result);
    if (result.status === 'success') {
      updateGoal();
    } else {
      console.log(result.status);
      //updateGoal();
    }
  };

  const updateGoal = async () => {
    const goalsData = await getGoals(user);
    console.log(goalsData);
    const goal = goalsData.filter(
      (goal: GoalProps) => goal.id === selectedGoal.id
    );
    if (goal.length > 0) {
      setSelectedGoal(goal[0]);
    }
  };
  const deleteSubTask = async (subTask: subTaskProps) => {
    const subtaskData = {
      email: user?.email,
      goalId: selectedGoal.id,
      subgoalId: subTask.id,
    };

    const result = await removeSubtask(subtaskData);
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
    if (subgoals.length > 0) {
      setSubTasks(subgoals);
    }
    //setSubTasks([...subgoals]);
    console.log(selectedGoal.subgoals);
  }, [subgoals, selectedGoal]);

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
          .filter((subgoals) => subgoals.phase === label)
          .map((subgoal) => (
            <Subtask
              key={subgoal.id}
              subtask={subgoal}
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
