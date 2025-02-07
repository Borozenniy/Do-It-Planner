import { useState, useEffect } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  //useEffect(() => {
  //  document.body.classList.add(theme);

  //  localStorage.setItem('theme', theme);
  //}, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  return {
    theme,
    setTheme,
    toggleTheme,
  };
};

export { useTheme };
