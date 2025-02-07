import { useEffect, useState, useContext } from 'react';
import { ToastContext } from '../toast/toast-provider';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '../buttons/button';
import { Goal } from './goal/goal';
import { getGoals, createGoal, deleteGoal } from '../../services/api/user';
import { InfoIcon } from '../icon/info-icon/info-icon';

import CloseIcon from '../../assets/icons/close.png';

import './goals.scss';

type Goal = {
  label: string;
  id: number;
  highPriority?: boolean;
};

const Goals = () => {
  const { user } = useAuth0();
  const { addToast } = useContext(ToastContext) as any;
  const [goals, setGoals] = useState<Goal[]>([]);
  const [goalLabel, setGoalLabel] = useState<string>('');
  const [hasProgressBar, setHasProgressBar] = useState<boolean>(false);
  const [highPriority, setHighPriority] = useState<boolean>(false);

  const isEmptyGoal = () => {
    return goalLabel.length === 0;
  };
  const addGoal = () => {
    if (isEmptyGoal()) {
      return;
    } else {
      addNewGoal();
    }
  };

  const addNewGoal = async () => {
    const goal = {
      email: user?.email,
      goalData: {
        name: goalLabel,
        id: Date.now(),
        progressbar: hasProgressBar,
        highPriority: highPriority,
      },
    };
    await createGoal(goal);
    if (goals.length === 0) {
      addedFirstGoalSuccessToast();
    } else {
      addedGoalSuccessToast();
    }
    cleanGoalInput();
    fetchGoals();
  };

  const cleanGoalInput = () => {
    setGoalLabel('');
    setHighPriority(false);
    setHasProgressBar(false);
  };

  const fetchGoals = async () => {
    try {
      const goalsData = await getGoals(user);
      setGoals(goalsData);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Помилка:', error.message);
      } else {
        console.error('Unexpected error:', error);
      }
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
  };

  const addedFirstGoalSuccessToast = () => {
    addToast({
      type: 'completed',
      message: 'Hurray, u added your first goal. Let`s go champion!',
      autoClose: false,
    });
  };

  const addedGoalSuccessToast = () => {
    addToast({
      type: 'success',
      message: 'Goal added',
    });
  };

  useEffect(() => {
    if (user?.email) {
      fetchGoals();
    }
  }, [user]);

  return (
    <div className='goals'>
      <div className='goals__container'>
        <div
          className={`goals__header ${
            goals.length > 0 ? '' : 'goals__header--glowing-animation'
          }`}
        >
          <div className='goals__title'>
            {goals.length > 0 ? (
              <p>Make your goal</p>
            ) : (
              <p>Add your first goal</p>
            )}
          </div>
          <div className='goals__input-bar'>
            <input
              type='text'
              placeholder='Enter your goal'
              onChange={(e) => setGoalLabel(e.target.value)}
              value={goalLabel}
            />
            <Button
              img={CloseIcon}
              mode='danger'
              onClick={() => setGoalLabel('')}
            />
          </div>
          <div className='goals__title'>
            <p>Choose modifications</p>
          </div>
          <div className='goals__modifications'>
            <div className='goals__modification'>
              <label className='container'>
                Progress Bar
                <input
                  type='checkbox'
                  onChange={() => setHasProgressBar(!hasProgressBar)}
                  checked={hasProgressBar}
                />
                <span className='checkmark'></span>
              </label>
              <InfoIcon
                titleLabel='Progress Bar'
                label='Turn on the progress bar to see the general progress of picked goal'
              />
            </div>
            <div className='goals__modification'>
              <label className='container'>
                <span>High priority</span>
                <input
                  type='checkbox'
                  onChange={() => setHighPriority(!highPriority)}
                  checked={highPriority}
                />
                <span className='checkmark'></span>
              </label>
              <InfoIcon
                titleLabel='High priority'
                label='A high priority means that the goal will be displayed differently and will be shown first in the list of goals'
              />
            </div>
          </div>
          <div className='goals__buttons'>
            <Button
              label='Add Goal'
              onClick={() => addGoal()}
              disabled={goalLabel === ''}
            />
          </div>
        </div>
        <div className='goals__templates'>
          <div className='goals__template-info'>
            {/*<p>Templates will be added soon</p>*/}
          </div>
        </div>
        <div className='goals__board'>
          {goals?.length === 0 ? (
            <div className='goals__no-goals'>
              <div className='goals__no-goals-content'></div>
            </div>
          ) : (
            <div className='goals__board-container'>
              {goals
                .filter((goal) => goal.highPriority === true)
                .map((goal) => (
                  <Goal
                    key={goal.id}
                    goal={goal}
                    highPriority
                    removeGoal={removeGoal}
                  />
                ))}
              {goals
                .filter((goal) => goal.highPriority === false)
                .map((goal) => (
                  <Goal key={goal.id} goal={goal} removeGoal={removeGoal} />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { Goals };
