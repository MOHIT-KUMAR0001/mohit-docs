import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MarkdownRenderer from '../components/MarkdownRenderer';
import TableOfContents from '../components/TableOfContents';

export default function DocPage({ manifest }) {
  const { slug } = useParams();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const doc = manifest.find((d) => d.slug === slug);

  useEffect(() => {
    if (!doc) {
      setError(true);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(false);

    fetch(`/content/${doc.filePath}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load document');
        }
        return response.text();
      })
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading document:', err);
        setError(true);
        setLoading(false);
      });
  }, [doc, slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading document...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !doc) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center min-h-[60vh] flex flex-col items-center justify-center">
          <div className="text-6xl mb-4">📄</div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Document Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The document you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-lg transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(doc.lastModified).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
          <Link to="/" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-400 dark:text-gray-500">{doc.category}</span>
          <span>/</span>
          <span className="text-gray-900 dark:text-gray-100">{doc.title}</span>
        </nav>

        {/* Document Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-lg bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 text-sm font-medium">
              {doc.category}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {doc.readingTime} min read
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">•</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Updated {formattedDate}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {doc.title}
          </h1>
          {doc.description && (
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {doc.description}
            </p>
          )}
        </header>

        {/* Document Content */}
        <article className="mb-12">
          <MarkdownRenderer content={content} />
        </article>

        {/* Tags */}
        {doc.tags.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mb-8">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {doc.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Back to home link */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>

      {/* Table of Contents */}
      <TableOfContents content={content} />
    </div>
  );
}
