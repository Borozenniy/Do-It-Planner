import { useState, useEffect, useRef } from 'react';
import { Button } from '../buttons/button';

import ThreeDotsIconWhite from '../../assets/icons/three-dots-white.svg';
import ThreeDotsIcon from '../../assets/icons/three-dots-black.svg';
import './dropdown.scss';

type DropDownProps = {
  goalId: string;
  taskDone: (taskId: string, taskPhase: string) => void;
  taskDelete: (goalId: string, taskId: string) => void;
  task: taskProps;
};

type taskProps = {
  id: string;
  goalId: string;
  title: string;
  priority: string;
  phase: 'to do' | 'in progress' | 'done';
  createdAt: string;
  updatedAt: string;
};

const Dropdown = ({ goalId, task, taskDone, taskDelete }: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleClickTaskDone = () => {
    taskDone(task.id, task.phase);
    toggleDDropdown();
  };

  const handleClickTaskDelete = () => {
    taskDelete(goalId, task.id);
    toggleDDropdown();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <div ref={dropdownRef} className='dropdown'>
      <Button
        size='small'
        isTransparent={true}
        isRounded={true}
        img={ThreeDotsIconWhite}
        onClick={toggleDDropdown}
      />
      {/*<h6 onClick={toggleDDropdown}>Menu</h6>*/}
      {isOpen && (
        <ul className='dropdown__list'>
          <li className='dropdown__item' onClick={handleClickTaskDone}>
            Done
          </li>
          <li className='dropdown__item' onClick={handleClickTaskDelete}>
            Delete
          </li>
        </ul>
      )}
    </div>
  );
};

export { Dropdown };
