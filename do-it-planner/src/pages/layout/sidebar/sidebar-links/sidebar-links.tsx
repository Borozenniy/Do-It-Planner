import { NavLink } from 'react-router';
import { User } from '../../../../components/user/user';
import { LogOutButton } from '../../../../components/buttons/logout-button/logout-button';

import './sidebar-links.scss';

const SidebarLinks = () => {
  return (
    <div className='navigation'>
      <User />
      <div className='navigation__container'>
        <NavLink to='/app'>Дешборд</NavLink>
        <NavLink to='/app/goals'>Цілі</NavLink>
        <NavLink to='/goals'>Планер</NavLink>
        <NavLink to='/goals'>Цілі</NavLink>
        <NavLink to='/goals'>Цілі</NavLink>
        <NavLink to='/goals'>Цілі</NavLink>
        <NavLink to='/goals'>Цілі</NavLink>
      </div>
      <LogOutButton />
    </div>
  );
};

export { SidebarLinks };
