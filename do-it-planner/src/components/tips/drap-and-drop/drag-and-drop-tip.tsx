import { useState } from 'react';
import { Button } from '../../buttons/button';
import DragAndDropIcon from '../../../assets/icons/drag-and-drop.svg';
import DragAndDropIconWhite from '../../../assets/icons/drag-and-drop-white.svg';

import './drag-and-drop-tip.scss';

const selectedTheme = localStorage.getItem('theme');

const DragAndDropTip = () => {
  const [isClosed, setIsClosed] = useState(false);

  const closeDragAndDropTip = () => {
    setIsClosed(true);

    localStorage.setItem('dragAndDropTip', 'showed');
  };
  return (
    <div
      className={`drag-and-drop-tip ${
        isClosed ? 'drag-and-drop-tip--closed' : 'drag-and-drop-tip--visible'
      }`}
    >
      <div className='drag-and-drop-tip__container'>
        <div className='drag-and-drop-tip__content'>
          <div className='drag-and-drop-tip__title'>
            <p>Use drag and drop to rearrange the subgoals</p>
          </div>
          <div className='drag-and-drop-tip__icon'>
            {selectedTheme === 'dark' ? (
              <img src={DragAndDropIconWhite} alt='' />
            ) : (
              <img src={DragAndDropIcon} alt='' />
            )}
          </div>
        </div>
        <Button size='small' label='Okay' onClick={closeDragAndDropTip} />
      </div>
    </div>
  );
};

export { DragAndDropTip };
