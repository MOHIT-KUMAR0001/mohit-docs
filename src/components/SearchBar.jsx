import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ manifest, isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchQuery = query.toLowerCase();
    const filtered = manifest.filter((doc) => {
      return (
        doc.title.toLowerCase().includes(searchQuery) ||
        doc.description.toLowerCase().includes(searchQuery) ||
        doc.category.toLowerCase().includes(searchQuery) ||
        doc.tags.some((tag) => tag.toLowerCase().includes(searchQuery))
      );
    });

    setResults(filtered.slice(0, 10));
  }, [query, manifest]);

  const handleSelect = (slug) => {
    navigate(`/docs/${slug}`);
    onClose();
    setQuery('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
      setQuery('');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-start justify-center pt-[12vh] animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="glass-card rounded-3xl shadow-dramatic w-full max-w-3xl mx-6 overflow-hidden animate-slideDown"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center border-b border-gray-200 dark:border-slate-700 px-6 py-4">
          <svg
            className="w-6 h-6 text-brand-500 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search documentation..."
            className="flex-1 px-4 py-2 bg-transparent text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 outline-none text-lg font-medium"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 text-xs font-mono text-gray-500 dark:text-slate-400 bg-gray-100 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {results.length > 0 && (
          <div className="max-h-[60vh] overflow-y-auto scrollbar-thin">
            {results.map((doc, index) => (
              <button
                key={doc.slug}
                onClick={() => handleSelect(doc.slug)}
                className="w-full px-6 py-4 text-left hover:bg-gray-50 dark:hover:bg-slate-800/50 border-b border-gray-100 dark:border-slate-700/50 last:border-b-0 transition-all duration-200 group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-gray-900 dark:text-slate-100 truncate group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {doc.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {doc.description}
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      <span className="text-xs px-2.5 py-1 rounded-lg bg-brand-100 dark:bg-brand-900/50 text-brand-700 dark:text-brand-300 font-semibold">
                        {doc.category}
                      </span>
                      {doc.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-gray-500 dark:text-slate-400 font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                      <span className="text-xs text-gray-400 dark:text-slate-500 ml-auto">
                        {doc.readingTime} min read
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {query && results.length === 0 && (
          <div className="px-6 py-12 text-center animate-fadeIn">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-500 dark:text-slate-400 font-medium">
              No results found for "{query}"
            </p>
          </div>
        )}

        {!query && (
          <div className="px-6 py-12 text-center animate-fadeIn">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-gray-500 dark:text-slate-400 text-sm font-medium">
              Start typing to search documentation...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
