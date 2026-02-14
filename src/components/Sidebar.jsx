import { NavLink } from 'react-router-dom';

export default function Sidebar({ manifest, isOpen, onClose }) {
  // Group documents by category
  const categories = manifest.reduce((acc, doc) => {
    const category = doc.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(doc);
    return acc;
  }, {});

  // Sort categories: General first, then alphabetically
  const sortedCategories = Object.keys(categories).sort((a, b) => {
    if (a === 'General') return -1;
    if (b === 'General') return 1;
    return a.localeCompare(b);
  });

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-fadeIn"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-18 left-0 h-[calc(100vh-4.5rem)] w-72 glass-card overflow-y-auto scrollbar-thin z-40 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <nav className="p-6 space-y-8">
          {sortedCategories.map((category) => (
            <div key={category} className="animate-fadeIn">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200 dark:border-slate-700">
                <svg className="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                <h3 className="text-xs font-bold text-gray-600 dark:text-slate-400 uppercase tracking-wider">
                  {category}
                </h3>
              </div>
              <ul className="space-y-1.5">
                {categories[category].map((doc) => (
                  <li key={doc.slug}>
                    <NavLink
                      to={`/docs/${doc.slug}`}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `group block px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                          isActive
                            ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg font-semibold scale-105'
                            : 'text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:scale-102 hover:pl-5'
                        }`
                      }
                    >
                      <div className="flex items-center gap-2">
                        <svg className={`w-4 h-4 transition-transform duration-200 ${
                          'group-hover:translate-x-0.5'
                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="flex-1">{doc.title}</span>
                      </div>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
