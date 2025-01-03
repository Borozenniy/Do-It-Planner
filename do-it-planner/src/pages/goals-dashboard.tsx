//import { useEffect, useState } from 'react';
import { Goals } from '../components/goals/goals';
import '../styles/goals-dashboard.scss';

const GoalsDashboard = () => {
  return (
    <div className='goals-dashboard'>
      <div className='goals-dashboard__container'>
        <Goals />
      </div>
    </div>
  );
};

export default GoalsDashboard;
