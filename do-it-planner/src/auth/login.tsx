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
      navigate('/app');
    }
  }, [isAuthenticated]);

  return (
    <div>
      <h1> Do It Planner </h1>
      <LogInButton />
    </div>
  );
};

export { Login };
