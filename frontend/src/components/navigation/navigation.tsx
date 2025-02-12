import { NavLink } from 'react-router';
import { User } from '../user/user';
import { LogOutButton } from '../buttons/logout-button/logout-button';
import './navigation.scss';

const Navigation = () => {
  return (
    <div className='navigation'>
      <User />
      <div className='navigation__container'>
        <NavLink to='/app/goals'>Цілі</NavLink>
        <NavLink to='/goals'>Планер</NavLink>
        <NavLink to='/goals'>Цілі</NavLink>
        <NavLink to='/goals'>Цілі</NavLink>
        <NavLink to='/goals'>Цілі</NavLink>
        <NavLink to='/goals'>Цілі</NavLink>
        <NavLink to='/goals'>Цілі</NavLink>
      </div>
      <LogOutButton />
    </div>
  );
};

export { Navigation };
