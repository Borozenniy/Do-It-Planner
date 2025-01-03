import { useAuth0 } from '@auth0/auth0-react';
import { Outlet } from 'react-router';
import { LogInButton } from './components/buttons/login-button/login-button';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Navigation } from './components/navigation/navigation';

function App() {
  return (
    <>
      <div>
        <Navigation />
        <Outlet />
      </div>
    </>
  );
}

export default App;
