import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '../button';

const LogOutButton = () => {
  const { isAuthenticated } = useAuth0();
  const { logout } = useAuth0();
  if (isAuthenticated) {
    return <Button label='Log Out' onClick={() => logout()} />;
  }
};

export { LogOutButton };
