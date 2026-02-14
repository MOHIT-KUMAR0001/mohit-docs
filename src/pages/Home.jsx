import { Link } from 'react-router-dom';

export default function Home({ manifest }) {
  // Group by category for stats and display
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

  // Empty state
  if (manifest.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl flex items-center justify-center text-white text-4xl font-bold mx-auto mb-6">
            M
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            No Documentation Yet
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Get started by adding your first markdown file to <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">public/content/</code>
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-left">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Quick Start:</h3>
            <ol className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>1. Run: <code className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">npm run new-doc -- "My First Doc"</code></li>
              <li>2. Edit the generated file in <code className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">public/content/</code></li>
              <li>3. Restart the dev server to see your changes</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent mb-4">
          Mohit's Documentation
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A collection of technical notes, guides, and tutorials on software development
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto mb-16">
        <div className="bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-900/30 dark:to-brand-800/30 rounded-xl p-6 text-center border border-brand-200 dark:border-brand-800">
          <div className="text-4xl font-bold text-brand-700 dark:text-brand-400 mb-2">
            {manifest.length}
          </div>
          <div className="text-sm font-medium text-brand-600 dark:text-brand-500">
            Documents
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl p-6 text-center border border-purple-200 dark:border-purple-800">
          <div className="text-4xl font-bold text-purple-700 dark:text-purple-400 mb-2">
            {categoryCount}
          </div>
          <div className="text-sm font-medium text-purple-600 dark:text-purple-500">
            Categories
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Browse by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-brand-500 dark:hover:border-brand-500 hover:shadow-lg transition-all"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {category}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {docs.length} {docs.length === 1 ? 'document' : 'documents'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {docs.slice(0, 3).map((doc) => (
                    <span
                      key={doc.slug}
                      className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                    >
                      {doc.title.length > 20 ? doc.title.substring(0, 20) + '...' : doc.title}
                    </span>
                  ))}
                  {docs.length > 3 && (
                    <span className="text-xs px-2 py-1 text-gray-500 dark:text-gray-400">
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
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Recent Notes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentDocs.map((doc) => (
            <Link
              key={doc.slug}
              to={`/docs/${doc.slug}`}
              className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-brand-500 dark:hover:border-brand-500 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs px-2 py-1 rounded bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 font-medium">
                  {doc.category}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {doc.readingTime} min read
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                {doc.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {doc.description}
              </p>
              {doc.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {doc.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-gray-500 dark:text-gray-400"
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
