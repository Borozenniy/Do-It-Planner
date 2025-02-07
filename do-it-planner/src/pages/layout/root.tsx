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
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const createAccount = async () => {
    const userData = {
      name: user?.name,
      email: user?.email,
      id: Date.now(),
    };
    await createUser(userData);
  };

  //const createUser = async () => {
  //  const userData = {
  //    name: user?.name,
  //    email: user?.email,
  //    id: Date.now(),
  //  };
  //  console.log('userData:', userData);
  //  try {
  //    const response = await fetch(
  //      'https://test-vercel-chi-three.vercel.app/users/create-user',
  //      {
  //        method: 'POST',
  //        headers: {
  //          'Content-Type': 'application/json',
  //        },
  //        body: JSON.stringify(userData),
  //      }
  //    );

  //    //if (!response.ok) {
  //    //  throw new Error('Помилка створення користувача');
  //    //}

  //    const data = await response.json();
  //    console.log('Користувач створений:', data);
  //  } catch (error) {
  //    if (error instanceof Error) {
  //      console.error('Помилка:', error.message);
  //    } else {
  //      console.error('Unexpected error:', error);
  //    }
  //  }
  //};

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
