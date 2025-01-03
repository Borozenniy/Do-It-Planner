import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Goal } from '../components/goals/goal/goal';
import { getGoals } from '../services/utils/user';
import '../styles/dashboard.scss';

type Goal = [];

const Dashboard = () => {
  const { user } = useAuth0();
  const [goals, setGoals] = useState<Goal[]>([]);

  const fetchGoals = async () => {
    const goalsData = await getGoals(user);
    setGoals(goalsData);
  };

  useEffect(() => {
    if (user?.email) {
      fetchGoals();
    }
  }, [user]);
  return (
    <div className='dashboard'>
      <div>DashBoard</div>
      {goals && goals.map((goal) => <Goal key={goal.id} goal={goal} />)}
    </div>
  );
};

export default Dashboard;
