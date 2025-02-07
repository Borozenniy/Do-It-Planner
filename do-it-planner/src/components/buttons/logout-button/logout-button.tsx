import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '../button';
import './logout-button.scss';

import ExitIcon from '../../../assets/icons/exit.svg';
import ExitIconWhite from '../../../assets/icons/exit-white.svg';

type LogOutButtonProps = {
  currentTheme: 'dark' | 'light';
  onlyIcon?: boolean;
};

const LogOutButton = ({
  currentTheme = 'dark',
  onlyIcon = false,
}: LogOutButtonProps) => {
  const { isAuthenticated } = useAuth0();
  const { logout } = useAuth0();
  if (isAuthenticated) {
    return (
      <>
        {onlyIcon ? (
          <Button
            size='medium'
            mode='danger'
            isTransparent={true}
            img={currentTheme === 'dark' ? ExitIconWhite : ExitIcon}
            onClick={() => logout()}
          />
        ) : (
          <Button label='Log Out' mode='danger' onClick={() => logout()} />
        )}
      </>
    );
  }
};

export { LogOutButton };
