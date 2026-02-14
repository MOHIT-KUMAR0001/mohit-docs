import { useState, useEffect } from 'react';
import { extractHeadings, stripFrontmatter } from '../lib/markdown';

export default function TableOfContents({ content }) {
  const [activeId, setActiveId] = useState('');
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    const stripped = stripFrontmatter(content);
    const extracted = extractHeadings(stripped);
    setHeadings(extracted);
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -80% 0px',
      }
    );

    headings.forEach(({ slug }) => {
      const element = document.getElementById(slug);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="hidden xl:block sticky right-8 top-32 w-72 max-h-[calc(100vh-10rem)] overflow-y-auto scrollbar-thin animate-fadeIn">
      <div className="glass-card rounded-2xl p-6 shadow-elegant sticky top-0">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200 dark:border-slate-700">
          <svg className="w-5 h-5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          <h3 className="text-sm font-bold text-gray-900 dark:text-slate-100 uppercase tracking-wider">
            On This Page
          </h3>
        </div>
        <nav className="space-y-2.5">
          {headings.map(({ level, text, slug }) => (
            <a
              key={slug}
              href={`#${slug}`}
              className={`block text-sm transition-all duration-200 rounded-lg px-3 py-2 ${
                activeId === slug
                  ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold shadow-md scale-105'
                  : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 hover:scale-102'
              }`}
              style={{ 
                paddingLeft: `${(level - 2) * 12 + 12}px`,
                marginLeft: `${(level - 2) * 4}px`
              }}
            >
              <span className="flex items-center gap-2">
                {activeId === slug && (
                  <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                <span className="flex-1 truncate">{text}</span>
              </span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
