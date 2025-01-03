import './goal.scss';

const Goal = ({ goal }: any) => {
  return <div className='goal'>{goal.name}</div>;
};

export { Goal };
