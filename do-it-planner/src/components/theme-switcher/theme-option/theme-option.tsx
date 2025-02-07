import { Button } from '../../buttons/button';

import MoonIcon from '../../../../assets/icons/moon.png';
import SunIcon from '../../../../assets/icons/sun.png';

import './theme-option.scss';

export type ThemeOptionProps = {
  theme: 'dark' | 'light';
};

const themeIcon = {
  dark: MoonIcon,
  light: SunIcon,
};

const ThemeOption = ({ theme }: ThemeOptionProps) => {
  const setTheme = (newTheme: ThemeOptionProps['theme']) => {
    document.querySelector('body')?.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const currentTheme = localStorage.getItem('theme');

  return (
    <div className='theme-option'>
      <Button
        size='small'
        img={themeIcon[theme]}
        isTransparent={true}
        isRounded={true}
        onClick={() => setTheme(theme)}
        isActive={currentTheme === theme}
      />
    </div>
  );
};

export { ThemeOption };
