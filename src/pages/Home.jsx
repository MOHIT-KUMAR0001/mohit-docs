import { Link } from 'react-router-dom';

export default function Home({ manifest }) {
  // 1. Group by category for stats and display
  const categories = manifest.reduce((acc, doc) => {
    const category = doc.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(doc);
    return acc;
  }, {});

  const categoryCount = Object.keys(categories).length;
  const recentDocs = manifest.slice(0, 6);

  // 2. Empty state
  if (manifest.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 animate-fadeIn">
        <div className="max-w-md text-center">
          <div className="w-28 h-28 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 rounded-3xl flex items-center justify-center text-white text-5xl font-bold mx-auto mb-8 shadow-glow-lg animate-float">
            M
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-slate-50 dark:to-slate-300 bg-clip-text text-transparent mb-6">
            No Documentation Yet
          </h1>
          <p className="text-lg text-gray-600 dark:text-slate-400 mb-8 leading-relaxed">
            Get started by adding your first markdown file to <code className="px-2.5 py-1.5 bg-gray-100 dark:bg-slate-800 rounded-lg text-sm font-mono border border-gray-200 dark:border-slate-700">public/content/</code>
          </p>
          <div className="glass-card rounded-2xl p-8 text-left shadow-elegant">
            <h3 className="font-bold text-gray-900 dark:text-slate-100 mb-4 text-lg">Quick Start:</h3>
            <ol className="space-y-3 text-sm text-gray-600 dark:text-slate-400">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center text-xs font-bold">1</span>
                <span>Run: <code className="px-2 py-1 bg-gray-100 dark:bg-slate-700 rounded font-mono text-xs">npm run new-doc -- "My First Doc"</code></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center text-xs font-bold">2</span>
                <span>Edit the generated file in <code className="px-2 py-1 bg-gray-100 dark:bg-slate-700 rounded font-mono text-xs">public/content/</code></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center text-xs font-bold">3</span>
                <span>Restart the dev server to see your changes</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  // 3. Main content (One single return statement)
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 animate-fadeIn">
      {/* Hero Section */}
      <div className="relative text-center mb-20 py-12">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-500/10 via-purple-500/10 to-brand-500/10 dark:from-brand-500/5 dark:via-purple-500/5 dark:to-brand-500/5 blur-3xl animate-pulse-slow"></div>
        <div className="relative">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold bg-gradient-to-r from-brand-500 via-brand-600 to-purple-600 dark:from-brand-400 dark:via-brand-500 dark:to-purple-500 bg-clip-text text-transparent mb-6">
            Mohit's Documentation
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
            A collection of technical notes, guides, and tutorials on software development
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto mb-20">
        <div className="glass-card rounded-2xl p-8 text-center shadow-lift hover:shadow-glow transition-all duration-300">
          <div className="text-6xl font-extrabold bg-gradient-to-br from-brand-500 to-brand-700 bg-clip-text text-transparent mb-3">
            {manifest.length}
          </div>
          <div className="text-base font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wide">
            Documents
          </div>
        </div>
        <div className="glass-card rounded-2xl p-8 text-center shadow-lift hover:shadow-glow transition-all duration-300">
          <div className="text-6xl font-extrabold bg-gradient-to-br from-purple-500 to-pink-600 bg-clip-text text-transparent mb-3">
            {categoryCount}
          </div>
          <div className="text-base font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wide">
            Categories
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <section className="mb-20">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-slate-50 dark:to-slate-300 bg-clip-text text-transparent mb-10">
          Browse by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(categories)
            .sort(([a], [b]) => {
              if (a === 'General') return -1;
              if (b === 'General') return 1;
              return a.localeCompare(b);
            })
            .map(([category, docs]) => (
              <Link
                key={category}
                to={`/docs/${docs[0].slug}`}
                className="group glass-card rounded-2xl p-8 hover:shadow-dramatic transition-all duration-300 hover-lift border-2 border-transparent hover:border-brand-500 dark:hover:border-brand-400"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {category}
                  </h3>
                </div>
                <p className="text-sm font-semibold text-gray-600 dark:text-slate-400 mb-4">
                  {docs.length} {docs.length === 1 ? 'document' : 'documents'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {docs.slice(0, 3).map((doc) => (
                    <span
                      key={doc.slug}
                      className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 rounded-lg font-medium"
                    >
                      {doc.title.length > 18 ? doc.title.substring(0, 18) + '...' : doc.title}
                    </span>
                  ))}
                  {docs.length > 3 && (
                    <span className="text-xs px-3 py-1.5 text-brand-600 dark:text-brand-400 font-semibold">
                      +{docs.length - 3} more
                    </span>
                  )}
                </div>
              </Link>
            ))}
        </div>
      </section>

      {/* Recent Notes */}
      <section>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-slate-50 dark:to-slate-300 bg-clip-text text-transparent mb-10">
          Recent Notes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentDocs.map((doc) => (
            <Link
              key={doc.slug}
              to={`/docs/${doc.slug}`}
              className="group glass-card rounded-2xl p-8 hover:shadow-dramatic transition-all duration-300 hover-lift"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs px-3 py-1.5 rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 text-white font-bold uppercase tracking-wide shadow-md">
                  {doc.category}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-slate-400 font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {doc.readingTime} min
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-tight">
                {doc.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-slate-400 mb-6 line-clamp-2 leading-relaxed">
                {doc.description}
              </p>
              {doc.tags && doc.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200 dark:border-slate-700">
                  {doc.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-brand-600 dark:text-brand-400 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}