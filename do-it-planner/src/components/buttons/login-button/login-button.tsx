import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '../button';

const LogInButton = () => {
  const { loginWithPopup } = useAuth0();
  return <Button label='Log In' onClick={() => loginWithPopup()} />;
};

export { LogInButton };
