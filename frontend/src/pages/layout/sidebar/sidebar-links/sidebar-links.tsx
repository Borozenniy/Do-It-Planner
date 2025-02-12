import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router';
import DashboardIcon from '../../../../assets/icons/dashboard.svg';
import DashboardIconWhite from '../../../../assets/icons/dashboard-white.svg';
import PlannerIcon from '../../../../assets/icons/planner.svg';
import PlannerIconWhite from '../../../../assets/icons/planner-white.svg';
import GoalIconWhite from '../../../../assets/icons/goal-white.svg';
import GoalIcon from '../../../../assets/icons/goal.svg';
import { Tooltip } from '../../../../components/tooltip/tooltip';

import './sidebar-links.scss';

type SidebarLinksProps = {
  isSidebarClosed: boolean;
  currentTheme: string;
};

const SidebarLinks = ({ isSidebarClosed, currentTheme }: SidebarLinksProps) => {
  const [addGoalTip, setAddGoalTip] = useState(false);
  const location = useLocation();

  const showAddGoalTip = localStorage.getItem('addGoalTip') !== 'showed';

  console.log(location.pathname === '/app/goals');

  useEffect(() => {
    if (location.pathname === '/app/dashboard' && showAddGoalTip) {
      setAddGoalTip(true);
    } else {
      setAddGoalTip(false);
    }
  }, [location.pathname]);

  return (
    <div className='navigation'>
      <div className='navigation__container'>
        {isSidebarClosed ? (
          <>
            <NavLink
              to='/app/dashboard'
              className={({ isActive }) =>
                isActive ? 'navigation__navigation-link--active' : ''
              }
            >
              <Tooltip titleLabel='Dashboard' withArrow={true} position='right'>
                <img
                  className={`navigation__logo ${
                    isSidebarClosed ? 'navigation__logo--closed' : ''
                  }`}
                  src={
                    currentTheme === 'dark' ? DashboardIconWhite : DashboardIcon
                  }
                  alt=''
                />
              </Tooltip>
            </NavLink>
            <NavLink
              to='/app/goals'
              className={({ isActive }) =>
                `${isActive ? 'navigation__navigation-link--active' : ''} ${
                  addGoalTip ? 'navigation__navigation-link--glowing' : ''
                }`
              }
            >
              <Tooltip
                titleLabel='Goals maker'
                withArrow={true}
                position='right'
              >
                <img
                  className={`navigation__logo ${
                    isSidebarClosed ? 'navigation__logo--closed' : ''
                  }`}
                  src={currentTheme === 'dark' ? GoalIconWhite : GoalIcon}
                  alt=''
                />
              </Tooltip>
            </NavLink>
            <NavLink
              to='/app/planner'
              className={({ isActive }) =>
                isActive ? 'navigation__navigation-link--active' : ''
              }
            >
              <Tooltip titleLabel='Planner' withArrow={true} position='right'>
                <img
                  className={`navigation__logo ${
                    isSidebarClosed ? 'navigation__logo--closed' : ''
                  }`}
                  src={currentTheme === 'dark' ? PlannerIconWhite : PlannerIcon}
                  alt=''
                />
              </Tooltip>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to='/app/dashboard'
              className={({ isActive }) =>
                isActive ? 'navigation__navigation-link--active' : ''
              }
            >
              <div
                className={`navigation__logo ${
                  isSidebarClosed ? 'navigation__logo--closed' : ''
                }`}
              >
                <img
                  className='navigation__icon'
                  src={
                    currentTheme === 'dark' ? DashboardIconWhite : DashboardIcon
                  }
                  alt=''
                />
                <span>Dashboard </span>
              </div>
            </NavLink>
            <NavLink
              to='/app/goals'
              className={({ isActive }) =>
                isActive ? 'navigation__navigation-link--active' : ''
              }
            >
              <div
                className={`navigation__logo ${
                  isSidebarClosed ? 'navigation__logo--closed' : ''
                }`}
              >
                <img
                  className='navigation__icon'
                  src={currentTheme === 'dark' ? GoalIconWhite : GoalIcon}
                  alt=''
                />
                <span>Goals </span>
              </div>
            </NavLink>
            <NavLink
              to='/app/planner'
              className={({ isActive }) =>
                isActive ? 'navigation__navigation-link--active' : ''
              }
            >
              <div
                className={`navigation__logo ${
                  isSidebarClosed ? 'navigation__logo--closed' : ''
                }`}
              >
                <img
                  className='navigation__icon'
                  src={currentTheme === 'dark' ? PlannerIconWhite : PlannerIcon}
                  alt=''
                />
                <span>Planner</span>
              </div>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export { SidebarLinks };
