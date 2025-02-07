import React, { createContext, useContext } from 'react';
import { useTheme } from '../../services/hooks/use-theme';
import { ThemeContainer } from './theme-container';

let ThemeContext: any;
//const ThemeContext = createContext();
const { Provider } = (ThemeContext = React.createContext<any>(null));

const ThemeProvider = ({ children }: any) => {
  const { theme, setTheme } = useTheme();
  return <Provider value={{ theme, setTheme }}>{children}</Provider>;
};

export { ThemeContext, ThemeProvider };
