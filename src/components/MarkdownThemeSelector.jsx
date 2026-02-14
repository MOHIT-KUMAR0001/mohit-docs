import { useState, useRef, useEffect } from 'react';
import {
  useMarkdownTheme,
  MARKDOWN_THEMES,
  HIGHLIGHT_THEMES,
  MARKDOWN_THEME_LABELS,
  HIGHLIGHT_THEME_LABELS,
} from '../hooks/useMarkdownTheme';

export default function MarkdownThemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { markdownTheme, highlightTheme, setMarkdownTheme, setHighlightTheme } = useMarkdownTheme();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkdownThemeChange = (theme) => {
    setMarkdownTheme(theme);
  };

  const handleHighlightThemeChange = (theme) => {
    setHighlightTheme(theme);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-105"
        title="Customize themes"
        aria-label="Customize markdown and code themes"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden backdrop-blur-xl bg-opacity-95 dark:bg-opacity-95 animate-fadeIn">
          {/* Markdown Themes Section */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Markdown Theme
            </h3>
            <div className="space-y-2">
              {Object.entries(MARKDOWN_THEMES).map(([key, value]) => (
                <button
                  key={value}
                  onClick={() => handleMarkdownThemeChange(value)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    markdownTheme === value
                      ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg scale-105'
                      : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 hover:scale-102'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{MARKDOWN_THEME_LABELS[value]}</span>
                    {markdownTheme === value && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Code Highlight Themes Section */}
          <div className="p-4">
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Code Highlight Theme
            </h3>
            <div className="space-y-2">
              {Object.entries(HIGHLIGHT_THEMES).map(([key, value]) => (
                <button
                  key={value}
                  onClick={() => handleHighlightThemeChange(value)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    highlightTheme === value
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                      : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 hover:scale-102'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{HIGHLIGHT_THEME_LABELS[value]}</span>
                    {highlightTheme === value && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
