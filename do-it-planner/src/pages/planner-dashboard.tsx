import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getGoals } from '../services/api/user';
import { Kanban } from '../components/kanban/kanban';
import { Button } from '../components/buttons/button';
import { Goal } from '../components/goals/goal/goal';
import { Tooltip } from '../components/tooltip/tooltip';
import { DragAndDropTip } from '../components/tips/drap-and-drop/drag-and-drop-tip';

import KanbanIcon from '../assets/icons/kanban.png';
import MatrixIcon from '../assets/icons/matrix.png';
import CloseIcon from '../assets/icons/close.png';
import './styles/planner-dashboard.scss';

const PlannerDashboard = () => {
  const { user } = useAuth0();
  //const [choosedMode, setChoosedMode] = useState<string>('');
  const [goals, setGoals] = useState<any[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<any>();
  const [mode, setMode] = useState<'kanban' | 'eisenhower' | 'none'>('none');
  const dragAndDropTip = localStorage.getItem('dragAndDropTip');
  //const [selectedGoalId, setSelectedGoal] = useState<any>('');

  const showModButtons = () => {
    switch (mode) {
      case 'kanban':
        return (
          <Button
            label='Kanban'
            size='large'
            onClick={() => setMode('kanban')}
            isActive={mode === 'kanban'}
            img={KanbanIcon}
          />
        );
        break;
      case 'eisenhower':
        return (
          <Tooltip
            titleLabel='Will be added soon'
            label='This functionality is not available yet and i will add it soon'
          >
            <Button
              disabled={true}
              label='Eisenhower matrix'
              size='large'
              onClick={() => setMode('eisenhower')}
              isActive={mode === 'eisenhower'}
              img={MatrixIcon}
            />
          </Tooltip>
        );
        break;
      default:
        return (
          <>
            <Button
              label='Kanban'
              size='large'
              onClick={() => setMode('kanban')}
              img={KanbanIcon}
            />
            <Tooltip
              titleLabel='Will be added soon'
              label='This functionality is not available yet and i will add it soon'
            >
              <Button
                disabled={true}
                label='Eisenhower matrix'
                size='large'
                onClick={() => setMode('eisenhower')}
                img={MatrixIcon}
              />
            </Tooltip>
          </>
        );
    }
  };

  const fetchGoals = async () => {
    const goalsData = await getGoals(user);
    if (goalsData.length > 0) {
      setGoals(goalsData);
    }
  };

  const handleSelectGoal = (id: number) => {
    const goal = goals.filter((goal) => goal.id === id);
    if (goal.length > 0) {
      setSelectedGoal(goal[0]);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchGoals();
    }
  }, [user]);

  useEffect(() => {
    if (selectedGoal) {
      setMode(selectedGoal.mode);
    }
  }, [selectedGoal]);
  return (
    <div className='planner-dashboard'>
      <div className='planner-dashboard__container'>
        <div className='planner-dashboard__header'>
          <div className='planner-dashboard__header-container'>
            {!selectedGoal ? (
              <div
                className={`planner-dashboard__input ${
                  selectedGoal ? '' : 'planner-dashboard__input--glowing'
                }`}
              >
                <label className='planner-dashboard__title' id='goal'>
                  Pick your goal
                </label>
                <select
                  id='goal'
                  onChange={(e) => handleSelectGoal(parseInt(e.target.value))}
                  value={selectedGoal || ''}
                >
                  <option value='' disabled></option>
                  {goals.length > 0 &&
                    goals.map((goal) => (
                      <option value={goal.id} key={goal.id}>
                        {goal.name}
                      </option>
                    ))}
                </select>
              </div>
            ) : (
              <div className='planner-dashboard__goal'>
                <Goal
                  key={selectedGoal.id}
                  goal={selectedGoal}
                  hasProgressBar={selectedGoal.progressbar}
                  highPriority={selectedGoal.highPriority}
                />
                {dragAndDropTip !== 'showed' && mode === 'kanban' && (
                  <DragAndDropTip />
                )}
                <div className='planner-dashboard__close-button'>
                  <Tooltip label='Clear and pick another goal'>
                    <Button
                      img={CloseIcon}
                      size='small'
                      mode='danger'
                      onClick={() => setSelectedGoal('')}
                    />
                  </Tooltip>
                </div>
              </div>
            )}
            {selectedGoal && (
              <div className='planner-dashboard__modifications'>
                <div className='planner-dashboard__title'>
                  {mode === 'none' ? (
                    <span>Pick manage style:</span>
                  ) : (
                    <span>Manage style:</span>
                  )}
                </div>
                <div className='planner-dashboard__buttons'>
                  {showModButtons()}
                </div>
                {mode !== 'none' && (
                  <div className='planner-dashboard__close-button'>
                    <Tooltip label="It's not working yet">
                      <Button
                        img={CloseIcon}
                        size='small'
                        mode='danger'
                        disabled={true}
                        onClick={() => setMode('none')}
                      />
                    </Tooltip>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className='planner-dashboard__board'>
          {mode === 'kanban' && selectedGoal ? (
            <Kanban
              selectedGoal={selectedGoal}
              setSelectedGoal={setSelectedGoal}
            />
          ) : (
            <div className='planner-dashboard__no-goal-picked'></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlannerDashboard;
