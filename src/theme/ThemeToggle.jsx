import { useContext } from 'react';
import { BsMoonStarsFill, BsSunFill } from 'react-icons/bs';
import { ThemeContext } from './ThemeContext';
import { useTranslation } from "react-i18next";

export default function ThemeToggle({ compact = false }) {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const label = t(isDark ? "common.switchToLightMode" : "common.switchToDarkMode");

  return (
    <button
      type="button"
      className={`theme-toggle${compact ? ' theme-toggle-compact' : ''}`}
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      {isDark ? <BsSunFill  size={20} aria-hidden="true" /> : <BsMoonStarsFill size={20} aria-hidden="true" />}
    </button>
  );
}
