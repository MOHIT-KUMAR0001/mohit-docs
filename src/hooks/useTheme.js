import { useState, useEffect } from 'react';

const THEME_KEY = 'theme';
const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';
const THEME_SYSTEM = 'system';

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? THEME_DARK
    : THEME_LIGHT;
}

function getStoredTheme() {
  try {
    return localStorage.getItem(THEME_KEY) || THEME_SYSTEM;
  } catch {
    return THEME_SYSTEM;
  }
}

function applyTheme(theme) {
  const root = document.documentElement;
  const actualTheme = theme === THEME_SYSTEM ? getSystemTheme() : theme;
  
  if (actualTheme === THEME_DARK) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

export function useTheme() {
  const [theme, setThemeState] = useState(getStoredTheme);

  useEffect(() => {
    // Apply theme on mount
    applyTheme(theme);
  }, []);

  useEffect(() => {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === THEME_SYSTEM) {
        applyTheme(THEME_SYSTEM);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const setTheme = (newTheme) => {
    try {
      localStorage.setItem(THEME_KEY, newTheme);
    } catch {
      // Ignore localStorage errors
    }
    setThemeState(newTheme);
    applyTheme(newTheme);
  };

  const cycleTheme = () => {
    const themes = [THEME_LIGHT, THEME_DARK, THEME_SYSTEM];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return { theme, setTheme, cycleTheme };
}

export { THEME_LIGHT, THEME_DARK, THEME_SYSTEM };
