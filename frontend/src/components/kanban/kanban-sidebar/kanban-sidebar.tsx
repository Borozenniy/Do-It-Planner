import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { KanbanSidebarCategory } from '../kanban-sidebar-category/kanban-sidebar-category';
import { Button } from '../../buttons/button';
import { ProgressBar } from '../../progress-bar/progress-bar';
//import { Subtask } from '../../subtask/subtask';
import { subTaskProps } from '../kanban';
import './kanban-sidebar.scss';

type KanbanSidebarProps = {
  selectedTasks: any;
  selectedGoal: any;
  setSelectedGoal: any;
};

const kanbanCategories = ['to do', 'in progress', 'done'];
const KanbanSidebar = ({
  selectedTasks,
  selectedGoal,
  setSelectedGoal,
}: KanbanSidebarProps) => {
  const navigate = useNavigate();
  const doneTasks = selectedTasks.filter(
    (subgoal: subTaskProps) => subgoal.phase === 'done'
  ).length;

  const navigateToPlanner = () => {
    navigate('/app/planner');
  };

  //useEffect(() => {
  //  console.log(selectedGoal.subgoals);
  //}, [selectedGoal]);

  return (
    <div className='kanban-sidebar'>
      <div className='kanban-sidebar__information'>
        <div className='kanban-sidebar__information-content'>
          {/*{selectedGoal.subgoals.length > 0 ? (*/}
          {selectedTasks.length > 0 ? (
            <>
              <div className='kanban-sidebar__subgoals-information'>
                <ProgressBar
                  maxValue={selectedTasks.length}
                  value={doneTasks || 0}
                />
                <div></div>
              </div>
            </>
          ) : (
            <div className='kanban-sidebar__no-subgoals'>
              <p>Now add a few sub-goals below or along with the planner</p>
              <Button label='Go to planner' onClick={navigateToPlanner} />
            </div>
          )}
        </div>
      </div>
      <div className='kanban-sidebar__kanban'>
        {kanbanCategories.map((category) => (
          <KanbanSidebarCategory
            selectedGoal={selectedGoal}
            setSelectedGoal={setSelectedGoal}
            key={category}
            label={category}
            tasks={selectedTasks.filter(
              (subgoal: subTaskProps) => subgoal.phase === category
            )}
          />
        ))}
      </div>
    </div>
  );
};

export { KanbanSidebar };
