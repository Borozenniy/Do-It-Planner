import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { ToastProvider } from '../../components/toast/toast-provider';
import { ModalProvider } from '../../components/modal/modal-provider';
import { Outlet, useNavigate } from 'react-router';

import { Sidebar } from './sidebar/sidebar';
import { createUser } from '../../services/api/user';

//import Dashboard from '../dashboard';

const Root = () => {
  const [isSidebarClosed, setIsSidebarClosed] = useState(true);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const createAccount = async () => {
    if (!user) return;

    const token = await getAccessTokenSilently({
      detailedResponse: false,
    });

    const userData = {
      name: user?.name,
      email: user?.email,
      createdDate: Date.now(),
    };

    await createUser(token, userData);
    //try {
    //  // token
    //  const token = await getAccessTokenSilently({
    //    detailedResponse: false,
    //  });

    //  console.log('Token:', token);

    //  const response = await fetch(`http://localhost:3000/user/user`, {
    //    method: 'POST',
    //    headers: {
    //      Authorization: `Bearer ${token}`,
    //    },
    //  });

    //  if (response.status === 404) {
    //    await fetch(`http://localhost:3000/user/user`, {
    //      method: 'POST',
    //      headers: {
    //        'Content-Type': 'application/json',
    //        Authorization: `Bearer ${token}`,
    //      },
    //      body: JSON.stringify({
    //        id: user.sub,
    //        name: user.name,
    //        email: user.email,
    //      }),
    //    });
    //  }
    //} catch (error) {
    //  console.error('Error checking/creating user:', error);
    //}
    //const userData = {
    //  name: user?.name,
    //  email: user?.email,
    //  createdDate: Date.now(),
    //};
  };

  useEffect(() => {
    if (user) createAccount();
  }, [user]);

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated]);

  return (
    <div
      className={`layout ${isSidebarClosed ? 'layout--closed-sidebar' : ''}`}
    >
      <ToastProvider>
        <ModalProvider>
          <Sidebar
            setIsSidebarClosed={setIsSidebarClosed}
            isSidebarClosed={isSidebarClosed}
          />
          <Outlet />
          {/*<Dashboard />*/}
        </ModalProvider>
      </ToastProvider>
    </div>
  );
};

export default Root;
