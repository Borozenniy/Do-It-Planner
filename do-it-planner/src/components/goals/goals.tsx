import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Goal } from './goal/goal';
import { getGoals, createGoal } from '../../services/utils/user';
import './goals.scss';

type Goal = {
  label: string;
  id: number;
};

const Goals = () => {
  const { user } = useAuth0();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [goalLabel, setGoalLabel] = useState<string>('');
  //const [goal, setGoal] = useState();

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
      },
    };
    await createGoal(goal);
    cleanGoalInput();
    fetchGoals();
  };

  const cleanGoalInput = () => {
    setGoalLabel('');
  };

  const fetchGoals = async () => {
    try {
      const goalsData = await getGoals(user);
      setGoals(goalsData);
    } catch (error) {
      console.error('Помилка:', error.message);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchGoals();
    }
  }, [user]);

  //useEffect(() => {
  //  // Функція-обробник для клавіші Enter
  //  const handleKeyPress = (event) => {
  //    if (event.key === 'Enter') {
  //      //addGoal();
  //      console.log(goalLabel.length);
  //      addGoal();
  //    }
  //  };

  //  // Додаємо обробник події при кожному рендері
  //  window.addEventListener('keydown', handleKeyPress);

  //  // Видаляємо обробник події при розмонтуванні компонента
  //  return () => {
  //    window.removeEventListener('keydown', handleKeyPress);
  //  };
  //}, []);
  return (
    <div className='goals'>
      <div className='goals__container'>
        <div className='goals__board'>
          <div>
            <div className='goals__title'>
              <span>Make your goal</span>
              <input
                type='text'
                //placeholder='Enter your goal'
                value={goalLabel}
                onChange={(e) => setGoalLabel(e.target.value)}
              />
            </div>
            <div>
              <span>Progress Bar</span>
              <input type='checkbox' checked />
            </div>
            <button onClick={() => addGoal()}>Add Goal</button>
          </div>
          <div>
            <p>Current goals:</p>
            {goals && goals.map((goal) => <Goal key={goal.id} goal={goal} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Goals };
