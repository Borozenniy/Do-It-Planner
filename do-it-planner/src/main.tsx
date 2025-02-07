import React, { StrictMode, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
//import App from './App.tsx';
import { Login } from './auth/login.tsx';
//import Dashboard from './pages/dashboard';
//import GoalsDashboard from './pages/goals-dashboard.tsx';
//import PlannerDashboard from './pages/planner-dashboard.tsx';
//import { Goals } from './components/goals/goals';
//import Root from './pages/layout/root.tsx';
import './index.css';

const domainURL = import.meta.env.VITE_DOMAIN;
const clientID = import.meta.env.VITE_CLIENT_ID;

const Dashboard = React.lazy(() => import('./pages/dashboard'));
const GoalsDashboard = React.lazy(() => import('./pages/goals-dashboard.tsx'));
const PlannerDashboard = React.lazy(
  () => import('./pages/planner-dashboard.tsx')
);
const Root = React.lazy(() => import('./pages/layout/root.tsx'));

const Auth0ProviderLayour = ({ children }: { children: React.ReactNode }) => {
  return (
    <Auth0Provider
      domain={domainURL}
      clientId={clientID}
      authorizationParams={{
        redirect_uri: window.location.origin + '/app',
      }}
    >
      {children}
    </Auth0Provider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/*<Auth0Provider
      domain='dev-761rd8ygardisai0.us.auth0.com'
      clientId='IwpkX4iX42XlPjgfSJjR7VFi9yaiuRHr'
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
        </Routes>
      </BrowserRouter>
    </Auth0Provider>*/}
    <Auth0ProviderLayour>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='*' element={<Login />} />
            <Route path='/' element={<Login />} />
            <Route path='/app' element={<Root />}>
              {/*<Route path='/app' element={<Dashboard />} />*/}
              <Route path='/app/dashboard' element={<Dashboard />} />
              <Route path='/app/goals' element={<GoalsDashboard />} />
              <Route path='/app/planner' element={<PlannerDashboard />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Auth0ProviderLayour>
  </StrictMode>
);
