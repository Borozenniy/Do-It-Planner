import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Outlet } from 'react-router';
import { Sidebar } from './sidebar/sidebar';
//import Dashboard from '../dashboard';

const Root = () => {
  const { user } = useAuth0();
  console.log(user);
  const createUser = async () => {
    const userData = {
      name: user?.name,
      email: user?.email,
      id: Date.now(),
    };
    console.log('userData:', userData);
    try {
      const response = await fetch('http://localhost:3000/users/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      //if (!response.ok) {
      //  throw new Error('Помилка створення користувача');
      //}

      const data = await response.json();
      console.log('Користувач створений:', data);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Помилка:', error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };
  //const createUser = async () => {
  //  const user = {
  //    name: 'John Doe',
  //    email: 'johndoe@gmail.com',
  //  };
  //  //try {
  //  //  const response = await fetch('http://localhost:3000/api/users', {
  //  //    method: 'POST',
  //  //    headers: {
  //  //      'Content-Type': 'application/json',
  //  //    },
  //  //    body: JSON.stringify(user),
  //  //  });
  //  //  console.log(response);
  //  //} catch (error) {
  //  //  console.log(error);
  //  //}
  //  const response = await fetch('http://localhost:3000/users/', {
  //    method: 'POST',
  //    headers: {
  //      'Content-Type': 'application/json',
  //    },
  //    body: JSON.stringify(user),
  //  });
  //  if (!response.ok) {
  //    console.log('Problem with creating user');
  //  }
  //  console.log('Try to create user');
  //};

  useEffect(() => {
    if (user) createUser();
  }, [user]);

  return (
    <div className='layout'>
      <Sidebar />
      <Outlet />
      {/*<Dashboard />*/}
    </div>
  );
};

export default Root;
