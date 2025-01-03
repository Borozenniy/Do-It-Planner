import './goal.scss';

const Goal = ({ goal }) => {
  return <div className='goal'>{goal.name}</div>;
};

export { Goal };
