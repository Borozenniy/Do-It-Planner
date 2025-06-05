import { useState, useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { ModalContext } from '../modal/modal-provider';
import { ToastContext } from '../toast/toast-provider';
import { AddSubtask } from '../modals/add-subtask/add-subtask';
import { Dropdown } from '../dropdown/dropdown';
import { Button } from '../buttons/button';

import {
  getTasks,
  changeSubtaskPhase,
  removeSubtask,
} from '../../services/api/subtask';

import { InfoIcon } from '../icon/info-icon/info-icon';
import DoneIcon from '../../assets/icons/done-round.svg';
import AddIcon from '../../assets/icons/add-circle.svg';

import './eisenhower-matrix.scss';

const einsenhowerMatrixBlocks = [
  'urgent-important',
  'urgent-non-important',
  'non-urgent-important',
  'non-urgent-non-important',
];

const showBlockTitle = (block: string) => {
  switch (block) {
    case 'urgent-important':
      return (
        <>
          <span>Urgent / Important</span>
          <InfoIcon
            titleLabel='Do it now'
            label='These tasks have the highest priority and should be done immediately. Сritical cases requiring immediate attention (crises, deadlines).'
          />
        </>
      );
    case 'urgent-non-important':
      return (
        <>
          <span>Urgent / Non important</span>
          <InfoIcon
            titleLabel='Long / medium term. Planning'
            label='Strategically important tasks that should be done in advance to avoid delays and disruptions.'
          />
        </>
      );
    case 'non-urgent-important':
      return (
        <>
          <span>Non urgent / important</span>
          <InfoIcon
            titleLabel='Routine tasks'
            label='Tasks that can be done at any time and do not require immediate attention. They are not time-sensitive or require a specific order.'
          />
        </>
      );
    case 'non-urgent-non-important':
      return (
        <>
          <span>Non urgent / Non important</span>
          <InfoIcon
            titleLabel='Irrelevant or tasks with minimal effect'
            label='Tasks that are not important or have no impact on the project or goals. What can be eliminated or minimized.'
          />
        </>
      );
  }
};

const EisenhowerMatrix = ({ selectedGoal, setSelectedGoal }: any) => {
  const { getAccessTokenSilently } = useAuth0();
  const { openModal } = useContext(ModalContext) as any;
  const { addToast } = useContext(ToastContext) as any;
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const token = await getAccessTokenSilently({
      detailedResponse: false,
    });

    const result = await getTasks(token, selectedGoal.id);
    if (result.status === 'success') setTasks(result.tasks);
  };

  const handleTaskDone = (taskId: string, taskPhase: string) => {
    if (taskPhase !== 'done') {
      changeTaskPhase(taskId, 'done');
    }
  };

  const handleTaskDelete = (goalId: string, taskId: string) => {
    deleteTask(goalId, taskId);
  };

  const deleteTask = async (goalId: string, taskId: string) => {
    const token = await getAccessTokenSilently({
      detailedResponse: false,
    });
    const result = await removeSubtask(token, goalId, taskId);
    console.log(result);
    if (result.status === 'success') {
      fetchTasks();
      deletedTaskSuccessToast();
    } else {
      deletedTaskErrorToast(result.message);
    }
  };
  const changeTaskPhase = async (taskId: string, phase: string) => {
    const token = await getAccessTokenSilently({
      detailedResponse: false,
    });
    const taskData = {
      id: taskId,
      phase: phase,
    };
    const result = await changeSubtaskPhase(token, selectedGoal.id, taskData);
    if (result.status === 'success') {
      fetchTasks();
    }
  };

  const handleAddTask = () => {
    openModal(
      <>
        <AddSubtask
          goalId={selectedGoal.id}
          setSelectedGoal={setSelectedGoal}
          mode={'eisenhower'}
        />
      </>
    );
  };

  const deletedTaskSuccessToast = () => {
    addToast({
      type: 'success',
      message: 'Task successfully deleted',
    });
  };
  const deletedTaskErrorToast = (message: string) => {
    addToast({
      type: 'error',
      message: message,
      autoClose: true,
    });
  };

  useEffect(() => {
    fetchTasks();
  }, [selectedGoal]);

  return (
    <div className='eisenhower-matrix'>
      <div className='eisenhower-matrix__container'>
        <div className='eisenhower-matrix__board'>
          {einsenhowerMatrixBlocks.map((block) => (
            <div
              className={`eisenhower-matrix__block eisenhower-matrix__block--${block}`}
            >
              <div className='eisenhower-matrix__header'>
                {block === 'urgent-important' && (
                  <div
                    style={{ position: 'absolute', top: '3px', left: '3px' }}
                  >
                    <Button
                      img={AddIcon}
                      isRounded={true}
                      size='medium'
                      imgPosition='left'
                      onClick={() => handleAddTask()}
                    />
                  </div>
                )}
                <div className='eisenhower-matrix__title'>
                  {showBlockTitle(block)}
                </div>
              </div>
              <div className={'eisenhower-matrix__content'}>
                {tasks
                  .filter((task) => task.priority === block)
                  .map((task) => (
                    <div className='eisenhower-matrix__task'>
                      <div
                        //onClick={() => handleTaskDone(task.id, task.phase)}
                        className={`eisenhower-matrix__task-title ${
                          task.phase === 'done'
                            ? 'eisenhower-matrix__task-title--line-through'
                            : ''
                        }`}
                      >
                        {task.title}
                      </div>
                      <div
                        style={{
                          position: 'absolute',
                          top: '0px',
                          right: '0px',
                        }}
                      >
                        <Dropdown
                          key={task.id}
                          goalId={selectedGoal.id}
                          task={task}
                          taskDone={handleTaskDone}
                          taskDelete={handleTaskDelete}
                        />
                      </div>
                      {task.phase === 'done' && (
                        <>
                          <div className='eisenhower-matrix__task--done'>
                            <img src={DoneIcon} alt='' />
                          </div>
                        </>
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

export { EisenhowerMatrix };
