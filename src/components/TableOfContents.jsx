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
    <div className="hidden xl:block fixed right-8 top-24 w-64 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-thin">
      <div className="sticky top-0 pb-2 bg-white dark:bg-gray-900">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
          On This Page
        </h3>
      </div>
      <nav className="space-y-2">
        {headings.map(({ level, text, slug }) => (
          <a
            key={slug}
            href={`#${slug}`}
            className={`block text-sm transition-colors ${
              activeId === slug
                ? 'text-brand-600 dark:text-brand-400 font-medium'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
            style={{ paddingLeft: `${(level - 2) * 12}px` }}
          >
            {text}
          </a>
        ))}
      </nav>
    </div>
  );
}
