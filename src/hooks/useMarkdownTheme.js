import { useState, useEffect } from 'react';

const MARKDOWN_THEME_KEY = 'markdown-theme';
const HIGHLIGHT_THEME_KEY = 'highlight-theme';

// Available themes
export const MARKDOWN_THEMES = {
  DEFAULT: 'default',
  OCEAN: 'ocean',
  SUNSET: 'sunset',
  FOREST: 'forest',
  MIDNIGHT: 'midnight',
};

export const HIGHLIGHT_THEMES = {
  GITHUB_DARK: 'github-dark',
  MONOKAI: 'monokai',
  NORD: 'nord',
  DRACULA: 'dracula',
  TOKYO_NIGHT: 'tokyo-night',
};

export const MARKDOWN_THEME_LABELS = {
  [MARKDOWN_THEMES.DEFAULT]: 'Default Elegant',
  [MARKDOWN_THEMES.OCEAN]: 'Ocean Blue',
  [MARKDOWN_THEMES.SUNSET]: 'Sunset Warm',
  [MARKDOWN_THEMES.FOREST]: 'Forest Nature',
  [MARKDOWN_THEMES.MIDNIGHT]: 'Midnight Dark',
};

export const HIGHLIGHT_THEME_LABELS = {
  [HIGHLIGHT_THEMES.GITHUB_DARK]: 'GitHub Dark',
  [HIGHLIGHT_THEMES.MONOKAI]: 'Monokai',
  [HIGHLIGHT_THEMES.NORD]: 'Nord',
  [HIGHLIGHT_THEMES.DRACULA]: 'Dracula',
  [HIGHLIGHT_THEMES.TOKYO_NIGHT]: 'Tokyo Night',
};

function getStoredTheme(key, defaultTheme) {
  try {
    return localStorage.getItem(key) || defaultTheme;
  } catch {
    return defaultTheme;
  }
}

function loadThemeCSS(type, theme) {
  const id = `${type}-theme-link`;
  const existingLink = document.getElementById(id);
  
  if (existingLink) {
    existingLink.remove();
  }

  const link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  
  if (type === 'markdown') {
    link.href = `/src/theme/markdowntheme-${theme}.css`;
  } else {
    link.href = `/src/theme/highlightEditor-${theme}.css`;
  }
  
  document.head.appendChild(link);
}

function applyThemeClasses(markdownTheme, highlightTheme) {
  // Remove all existing theme classes
  const proseElements = document.querySelectorAll('.prose');
  proseElements.forEach(el => {
    Object.values(MARKDOWN_THEMES).forEach(theme => {
      el.classList.remove(`prose-theme-${theme}`);
    });
    el.classList.add(`prose-theme-${markdownTheme}`);
  });

  const hlElements = document.querySelectorAll('.hljs');
  hlElements.forEach(el => {
    Object.values(HIGHLIGHT_THEMES).forEach(theme => {
      el.classList.remove(`highlight-theme-${theme}`);
    });
    el.classList.add(`highlight-theme-${highlightTheme}`);
  });
}

export function useMarkdownTheme() {
  const [markdownTheme, setMarkdownThemeState] = useState(() => 
    getStoredTheme(MARKDOWN_THEME_KEY, MARKDOWN_THEMES.DEFAULT)
  );
  const [highlightTheme, setHighlightThemeState] = useState(() => 
    getStoredTheme(HIGHLIGHT_THEME_KEY, HIGHLIGHT_THEMES.GITHUB_DARK)
  );

  useEffect(() => {
    loadThemeCSS('markdown', markdownTheme);
    loadThemeCSS('highlight', highlightTheme);
    
    // Apply classes to existing elements
    applyThemeClasses(markdownTheme, highlightTheme);
  }, [markdownTheme, highlightTheme]);

  // Re-apply classes when content changes (for dynamic content)
  useEffect(() => {
    const observer = new MutationObserver(() => {
      applyThemeClasses(markdownTheme, highlightTheme);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [markdownTheme, highlightTheme]);

  const setMarkdownTheme = (theme) => {
    try {
      localStorage.setItem(MARKDOWN_THEME_KEY, theme);
    } catch {
      // Ignore localStorage errors
    }
    setMarkdownThemeState(theme);
  };

  const setHighlightTheme = (theme) => {
    try {
      localStorage.setItem(HIGHLIGHT_THEME_KEY, theme);
    } catch {
      // Ignore localStorage errors
    }
    setHighlightThemeState(theme);
  };

  return {
    markdownTheme,
    highlightTheme,
    setMarkdownTheme,
    setHighlightTheme,
  };
}
