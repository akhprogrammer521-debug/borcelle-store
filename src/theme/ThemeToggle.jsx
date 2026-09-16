import { useContext } from 'react';
import { BsMoonStarsFill, BsSunFill } from 'react-icons/bs';
import { ThemeContext } from './ThemeContext';

export default function ThemeToggle({ compact = false }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const label = `Switch to ${isDark ? 'light' : 'dark'} mode`;

  return (
    <button
      type="button"
      className={`theme-toggle${compact ? ' theme-toggle-compact' : ''}`}
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      {isDark ? <BsSunFill  size={20} aria-hidden="true" /> : <BsMoonStarsFill size={20} aria-hidden="true" />}
      <span className={compact ? 'visually-hidden' : ''}>
        {isDark ? 'Light mode' : 'Dark mode'}
      </span>
    </button>
  );
}
