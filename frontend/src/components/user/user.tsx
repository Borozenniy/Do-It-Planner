import { useAuth0 } from '@auth0/auth0-react';
import './user.scss';

const User = () => {
  const { user } = useAuth0();
  return (
    <div className='user'>
      <div className='user__name'>{user?.name}</div>
      {/*<div className='user__avatar'>
        <img src={`${user?.picture}`} alt='user' />
      </div>*/}
    </div>
  );
};

export { User };
