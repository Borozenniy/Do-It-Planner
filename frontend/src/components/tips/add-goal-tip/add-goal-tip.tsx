import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../../buttons/button';

import './add-goal-tip.scss';

const AddGoalTip = () => {
  const [isClosed, setIsClosed] = useState(false);
  const navigate = useNavigate();

  const navigateToGoalsMaker = () => {
    localStorage.setItem('addGoalTip', 'showed');
    setIsClosed(true);
    navigate('/app/goals');
  };

  return (
    <div className={`add-goal-tip ${isClosed ? 'add-goal-tip---closed' : ''}`}>
      <div className='add-goal-tip__container'>
        <div className='add-goal-tip__title'>
          <p>
            You haven't added any goals yet, move on to goals maker or click
            button below
          </p>
        </div>
        <Button label='Create my first goal' onClick={navigateToGoalsMaker} />
      </div>
    </div>
  );
};

export { AddGoalTip };
