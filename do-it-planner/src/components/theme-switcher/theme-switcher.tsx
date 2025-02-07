import { ThemeOption } from './theme-option/theme-option';
import { ThemeOptionProps } from './theme-option/theme-option';

import './theme-switcher.scss';

const themeOptions = ['dark', 'light'];

type ThemeSwitcherProps = {
  theme: ThemeOptionProps['theme'];
};

const ThemeSwitcher = () => {
  return (
    <div className='theme-switcher'>
      {themeOptions.map((theme) => (
        <ThemeOption key={theme} theme={theme as ThemeSwitcherProps['theme']} />
      ))}
    </div>
  );
};

export { ThemeSwitcher };
