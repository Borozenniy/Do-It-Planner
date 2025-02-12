import { useState, useEffect } from 'react';
import { SidebarLinks } from './sidebar-links/sidebar-links';
import { User } from '../../../components/user/user';
import { Button } from '../../../components/buttons/button';
import { LogOutButton } from '../../../components/buttons/logout-button/logout-button';
import { ThemeSwitcher } from '../../../components/theme-switcher/theme-switcher';

import OpenSidebarIconWhite from '../../../assets/icons/arrow-right-white.svg';
import OpenSidebarIcon from '../../../assets/icons/arrow-right.svg';
import CloseSidebarIconWhite from '../../../assets/icons/arrow-left-white.svg';
import CloseSidebarIcon from '../../../assets/icons/arrow-left.svg';

import './sidebar.scss';

const Sidebar = ({ setIsSidebarClosed, isSidebarClosed }: any) => {
  const [currentTheme, setCurrentTheme] = useState<string>(
    document.body.getAttribute('data-theme') || 'dark'
  );

  useEffect(() => {
    const selectedTheme = localStorage.getItem('theme');
    if (selectedTheme === 'dark' || selectedTheme === 'light') {
      document.querySelector('body')?.setAttribute('data-theme', selectedTheme);
      setCurrentTheme(selectedTheme);
    } else {
      localStorage.removeItem('theme');
      localStorage.setItem('theme', 'dark');
      document.querySelector('body')?.setAttribute('data-theme', 'dark');
      setCurrentTheme('dark');
    }

    const observer = new MutationObserver(() => {
      const theme = document.body.getAttribute('data-theme');
      if (theme) {
        setCurrentTheme(theme);
      }
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className='sidebar'>
      <div className='sidebar__header'>
        {!isSidebarClosed && <User />}
        {isSidebarClosed ? (
          <Button
            img={
              currentTheme === 'light' ? OpenSidebarIcon : OpenSidebarIconWhite
            }
            onClick={() => setIsSidebarClosed(false)}
            isTransparent={true}
          />
        ) : (
          <Button
            img={
              currentTheme === 'light'
                ? CloseSidebarIcon
                : CloseSidebarIconWhite
            }
            onClick={() => setIsSidebarClosed(true)}
            isTransparent={true}
          />
        )}
      </div>
      <SidebarLinks
        currentTheme={currentTheme}
        isSidebarClosed={isSidebarClosed}
      />
      <ThemeSwitcher />
      <div className='sidebar__logout'>
        {isSidebarClosed ? (
          <LogOutButton
            currentTheme={currentTheme as 'dark' | 'light'}
            onlyIcon={true}
          />
        ) : (
          <LogOutButton currentTheme={currentTheme as 'dark' | 'light'} />
        )}
      </div>
    </div>
  );
};

export { Sidebar };
