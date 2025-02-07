import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { KanbanSidebar } from '../components/kanban/kanban-sidebar/kanban-sidebar';
import { Button } from '../components/buttons/button';
import { Tooltip } from '../components/tooltip/tooltip';
import { Goal } from '../components/goals/goal/goal';
import { AddGoalTip } from '../components/tips/add-goal-tip/add-goal-tip';

import { GoalProps } from '../components/goals/goal/goal';

import { getGoals, changeGoalMode, deleteGoal } from '../services/api/user';

import KanbanIcon from '../assets/icons/kanban.png';
import MatrixIcon from '../assets/icons/matrix.png';
import CloseIcon from '../assets/icons/close.png';
import KanbanMeme from '../assets/image/kanban-meme.png';

import './styles/dashboard.scss';

const Dashboard = () => {
  const { user } = useAuth0();
  const [goals, setGoals] = useState<GoalProps[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<GoalProps>();
  const [mode, setMode] = useState<string>('none');
  const [search, setSearch] = useState<string>('');

  const showedAddGoalTip = localStorage.getItem('addGoalTip') === 'showed';

  const fetchGoals = async () => {
    const goalsData = await getGoals(user);
    setGoals(goalsData);
  };

  const chooseKanbanMode = () => {
    setMode('kanban');
    handleChangeGoalMode('kanban');
  };

  const handleChangeGoalMode = async (manageMode?: string) => {
    console.log(mode);
    const goalData = {
      email: user?.email,
      id: selectedGoal?.id,
      mode: manageMode,
    };
    const result = await changeGoalMode(goalData);
    if (result.status === 'success') {
      fetchGoals();
      setSelectedGoal((prev) =>
        prev
          ? { ...prev, mode: manageMode as 'kanban' | 'eisenhower' | 'none' }
          : undefined
      );
    }
  };

  const removeGoal = async (goalId: number) => {
    if (user?.email && goalId) {
      const goalData = {
        email: user.email,
        id: goalId,
      };
      await deleteGoal(goalData);
      await fetchGoals();
    }
    setSelectedGoal(undefined);
  };

  useEffect(() => {
    if (user?.email) {
      fetchGoals();
    }
  }, [user]);

  useEffect(() => {
    setMode('none');

    if (goals.length > 0 && showedAddGoalTip !== true) {
      localStorage.setItem('addGoalTip', 'showed');
    }
  }, [selectedGoal, goals]);

  return (
    <div className='dashboard'>
      <div className='dashboard__container'>
        <div className='dashboard__header'>
          <div className='dashboard__filters'>
            <div className='dashboard__search-bar'>
              <input
                type='text'
                placeholder='Search'
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <Button
                mode='danger'
                img={CloseIcon}
                onClick={() => setSearch('')}
              />
            </div>
          </div>
          {/*<div className='dashboard__user-information'>
            <div className='dashboard__user-avatar'>
              <img src={`${user?.picture}`} alt='user' />
            </div>
            <div className='dashboard__user-name'>
              <p>{user?.given_name}</p>
            </div>
          </div>*/}
        </div>
        <div className='dashboard__goals'>
          <div className='dashboard__goals-container'>
            <div className='dashboard__goals-content'>
              {goals.length === 0 && <AddGoalTip />}
              {goals &&
                search !== '' &&
                goals
                  .filter((goal) =>
                    goal.name?.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((goal) => (
                    <Goal
                      key={goal.id}
                      goal={goal}
                      removeGoal={removeGoal}
                      progressbar={goal.progressbar}
                      isActive={selectedGoal?.id === goal.id}
                      onClick={() => setSelectedGoal(goal)}
                      highPriority={goal.highPriority}
                    />
                  ))}
              {goals &&
                search === '' &&
                goals.some((goal) => goal.highPriority === true) && (
                  <div className='dashboard__high-priority'>
                    {goals
                      .filter((goal) => goal.highPriority === true)
                      .map((goal) => (
                        <Goal
                          key={goal.id}
                          goal={goal}
                          highPriority={true}
                          progressbar={goal.progressbar}
                          removeGoal={removeGoal}
                          isActive={selectedGoal?.id === goal.id}
                          onClick={() => setSelectedGoal(goal)}
                        />
                      ))}
                  </div>
                )}
              {goals &&
                search === '' &&
                goals
                  .filter((goal) => goal.highPriority === false)
                  .map((goal) => (
                    <Goal
                      key={goal.id}
                      goal={goal}
                      removeGoal={removeGoal}
                      highPriority={goal.highPriority}
                      progressbar={goal.progressbar}
                      isActive={selectedGoal?.id === goal.id}
                      onClick={() => setSelectedGoal(goal)}
                    />
                  ))}
            </div>
          </div>
          {/*</div>*/}
        </div>
        <div className='dashboard__sidebar'>
          <div className='dashboard__sidebar-container'>
            {selectedGoal?.subgoals && selectedGoal.mode === 'kanban' ? (
              <KanbanSidebar
                selectedGoal={selectedGoal}
                setSelectedGoal={setSelectedGoal}
              />
            ) : (
              <>
                {selectedGoal ? (
                  <div className='dashboard__no-mode'>
                    <div className='no-mode__title'>
                      <p>
                        Hey! Your goal without manage mode. Choose one and build
                        your success.
                      </p>
                    </div>
                    <div className='no-mode__image'>
                      <img src={KanbanMeme} alt='' />
                    </div>
                    <div className='no-mode__buttons'>
                      <div className='no-mode__button'>
                        <Button
                          label='Kanban'
                          size='large'
                          isActive={mode === 'kanban'}
                          onClick={() => chooseKanbanMode()}
                          img={KanbanIcon}
                        />
                      </div>
                      <div className='no-mode__button'>
                        <Tooltip
                          titleLabel='Will be added soon'
                          label='This functionality is not available yet'
                        >
                          <Button
                            disabled={true}
                            label='Eisenhower'
                            size='large'
                            onClick={() => console.log('eisenhower')}
                            //isActive={mode === 'eisenhower'}
                            img={MatrixIcon}
                          />
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className='dashboard__no-mode dashboard__no-mode--center'>
                    <div className='no-mode__title'>
                      <h2>Start by picking a goal</h2>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
