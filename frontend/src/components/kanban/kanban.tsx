import { useEffect, useState, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { ToastContext } from '../toast/toast-provider';
import { ModalContext } from '../modal/modal-provider';
//import { Subtask } from '../subtask/subtask';
//import { ProgressBarRectangular } from '../progress-bar/progress-bar-rectangular/progress-bar-rectangular';
import { AddSubtask } from '../modals/add-subtask/add-subtask';
import { DeleteSubtask } from '../modals/delete-subtask/delete-subtask';
import { AddToastType } from '../toasts/types';
import { SubtaskPriority } from '../subtask-priority/subtask-priority';
import { Tooltip } from '../tooltip/tooltip';

import { getGoals } from '../../services/api/user';
import {
  changeSubtaskPhase,
  removeSubtask,
  getTasks,
} from '../../services/api/subtask';

import { GoalProps } from '../goals/goal/goal';

import DeleteIcon from '../../assets/icons/recycle-bin.svg';
import ArrowRight from '../../assets/icons/right-arrow.png';
import ArrowLeft from '../../assets/icons/left-arrow.png';
import DoneIcon from '../../assets/icons/done-round.svg';
import AddIcon from '../../assets/icons/add-circle.svg';
//import DragAndDropIcon from '../../assets/icons/drag-and-drop.svg';

import { convertSubtaskPhasetoCSS } from '../../services/utils/text';

import './kanban.scss';
import { Button } from '../buttons/button';

export type subTaskProps = {
  title: string;
  phase: 'to do' | 'in progress' | 'done';
  priority: 'no priority' | 'low' | 'medium' | 'high';
  id: string;
};

const Kanban = ({ selectedGoal, setSelectedGoal, tasks }: any) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [subTasks, setSubTasks] = useState<subTaskProps[]>([]);
  const { openModal, closeModal } = useContext(ModalContext) as any;
  const { addToast } = useContext(ToastContext) as AddToastType;

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

  const raisePhase = (phase: subTaskProps['phase']) => {
    if (phase === 'to do') {
      return 'in progress';
    } else {
      return 'done';
    }
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

  const decreasePhase = (phase: subTaskProps['phase']) => {
    if (phase === 'done') {
      return 'in progress';
    } else {
      return 'to do';
    }
  };

  const fetchTasks = async (id: string) => {
    const token = await getAccessTokenSilently({
      detailedResponse: false,
    });
    const result = await getTasks(token, id);
    if (result.status === 'success') {
      setSubTasks(result.tasks);
    }
  };

  const handleDeleteSubtask = (subTask: subTaskProps) => {
    openModal(
      <DeleteSubtask
        onConfirm={() => deleteSubTask(subTask as subTaskProps)}
        onCancel={closeModal}
      />
    );
  };

  const deleteSubTask = async (subTask: subTaskProps) => {
    const token = await getAccessTokenSilently({
      detailedResponse: false,
    });
    //const subtaskData = {
    //  email: user?.email,
    //  goalId: selectedGoal.id,
    //  subgoalId: subTask.id,
    //};
    const result = await removeSubtask(token, selectedGoal.id, subTask.id);
    if (result.status === 'success') {
      updateGoal();
      removeSubtaskSuccessToast();
      closeModal();
    } else {
      removeSubtaskErrorToast(result.message);
    }
  };

  const updateGoal = async () => {
    const token = await getAccessTokenSilently({
      detailedResponse: false,
    });
    const goalsData = await getGoals(token);
    const goal = goalsData.filter(
      (goal: GoalProps) => goal.id === selectedGoal.id
    );
    if (goal.length > 0) {
      setSelectedGoal(goal[0]);
      fetchTasks(selectedGoal.id);
    }
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
      updateGoal();
    } else {
      //console.log(result);
    }
  };

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    subtaskId: string
  ) => {
    event.dataTransfer.setData('subTaskId', subtaskId.toString());
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    phase: subTaskProps['phase']
  ) => {
    const taskId = event.dataTransfer.getData('subTaskId');
    setSubTasks((prevSubTasks) =>
      prevSubTasks.map((subtask) =>
        subtask.id === taskId ? { ...subtask, phase } : subtask
      )
    );
    handleChangeSubtaskPhase(taskId, phase);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleAddSubTask = () => {
    if (selectedGoal.id) {
      openModal(
        <AddSubtask
          setSelectedGoal={setSelectedGoal}
          goalId={selectedGoal.id}
          mode={'kanban'}
        />
      );
    }
  };

  //useEffect(() => {
  //  if (selectedGoal.id) {
  //    //fetchTasks(selectedGoal.id);
  //    //setSubTasks(tasks)
  //  }
  //}, [selectedGoal]);
  useEffect(() => {
    if (selectedGoal.id) {
      fetchTasks(selectedGoal.id);
    }
  }, [selectedGoal, setSelectedGoal]);

  //useEffect(() => {
  //  setSubTasks(tasks);
  //}, [tasks]);

  return (
    <div className='kanban'>
      <div className='kanban__container'>
        <div className='kanban__board'>
          {['to do', 'in progress', 'done'].map((phase) => (
            <div
              className={`kanban__column ${phase}`}
              key={phase}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, phase as subTaskProps['phase'])}
            >
              <div className='column__header'>
                <span>{phase.toLocaleUpperCase()}</span>
                {phase === 'to do' && (
                  <Button
                    img={AddIcon}
                    label='Add task'
                    imgPosition='left'
                    size='small'
                    onClick={() => handleAddSubTask()}
                    disabled={!selectedGoal}
                  />
                )}
              </div>
              <div className='column__content'>
                {subTasks
                  .filter((subtask) => subtask.phase === phase)
                  .map((subtask) => (
                    //<Subtask key={subtask.id} subtask={subtask} />
                    <div
                      className={`subtask subtask--${convertSubtaskPhasetoCSS(
                        subtask.phase
                      )} ${
                        subtask.priority !== 'no priority'
                          ? `subtask--${subtask.priority}`
                          : ''
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
                        {subtask.priority &&
                          SubtaskPriority({ priority: subtask.priority })}
                        {/*<div>
                          {getDate(subtask.id).day +
                            ' ' +
                            getDate(subtask.id).month}
                        </div>*/}
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Button
                            isTransparent={true}
                            isRounded
                            size='small'
                            img={ArrowLeft}
                            onClick={() => handleDecreasePhase(subtask)}
                            //disabled={subtask.phase === 'to do'}
                          />
                          <Button
                            isTransparent={true}
                            size='small'
                            isRounded
                            img={ArrowRight}
                            onClick={() => handleRaisePhase(subtask)}
                            //disabled={subtask.phase === 'done'}
                          />
                          <Tooltip
                            label='Delete subgoal'
                            position='bottom-center'
                          >
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
                      {subtask.phase === 'done' && (
                        <div className='subtask__done-icon'>
                          <img src={DoneIcon} alt='' />
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { Kanban };
