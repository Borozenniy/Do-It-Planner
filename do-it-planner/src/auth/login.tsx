import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import { LogInButton } from '../components/buttons/login-button/login-button';
import './login.scss';

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/app/dashboard');
    }
  }, [isAuthenticated]);

  return (
    <div className='login'>
      <p> Do It Planner </p>
      <LogInButton />
    </div>
  );
};

export { Login };
