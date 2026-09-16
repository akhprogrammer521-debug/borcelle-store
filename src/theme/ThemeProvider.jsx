import { useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';

const storageKey = 'borcelle-theme';

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem(storageKey) === 'dark' ? 'dark' : 'light'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme) ;
    localStorage.setItem(storageKey, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(current => current === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
