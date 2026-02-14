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
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-16 animate-fadeIn">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block w-16 h-16 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-slate-400 font-medium">Loading document...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !doc) {
    return (
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-16 animate-fadeIn">
        <div className="text-center min-h-[60vh] flex flex-col items-center justify-center">
          <div className="text-8xl mb-8 animate-float">📄</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-slate-50 dark:to-slate-300 bg-clip-text text-transparent mb-6">
            Document Not Found
          </h1>
          <p className="text-lg text-gray-600 dark:text-slate-400 mb-10 max-w-md">
            The document you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="px-8 py-4 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-glow transition-all duration-300 hover:scale-105"
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
    <div className="relative animate-fadeIn flex">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2.5 text-sm mb-10 glass-card px-4 py-3 rounded-xl w-fit">
          <Link to="/" className="text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors font-medium flex items-center gap-1.5 group">
            <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </Link>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-500 dark:text-slate-500 font-medium">{doc.category}</span>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-900 dark:text-slate-100 font-semibold">{doc.title}</span>
        </nav>

        {/* Document Header */}
       <MarkdownRenderer content={content}/>
      </div>

      {/* Table of Contents */}
      <TableOfContents content={content} />
    </div>
  );
}

