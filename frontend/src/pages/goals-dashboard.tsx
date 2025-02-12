//import { useEffect, useState } from 'react';
import { Suspense } from 'react';
import { Goals } from '../components/goals/goals';
import './styles/goals-dashboard.scss';

const GoalsDashboard = () => {
  return (
    <div className='goals-dashboard'>
      {/*<div className='goals-dashboard__container'>*/}
      <Suspense fallback={<div>Loading...</div>}>
        <Goals />
      </Suspense>
      {/*</div>*/}
    </div>
  );
};

export default GoalsDashboard;
