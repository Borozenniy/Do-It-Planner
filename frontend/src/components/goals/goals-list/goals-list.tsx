import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { GoalProps } from '../goal/goal';
import { Goal } from '../goal/goal';
import { AddGoalTip } from '../../tips/add-goal-tip/add-goal-tip';

import './goals-list.scss';

type GoalsListProps = {
  goals: GoalProps[];
  search: string;
  selectedGoal: GoalProps | undefined;
  setSelectedGoal: (goal: GoalProps) => void;
  removeGoal: (goalId: number) => void;
};

const GoalsList = ({
  goals,
  search,
  selectedGoal,
  setSelectedGoal,
  removeGoal,
}: GoalsListProps) => {
  return (
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
  );
};

export { GoalsList };
