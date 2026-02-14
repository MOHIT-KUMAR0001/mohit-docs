import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import DocPage from './pages/DocPage';

function App() {
  const [manifest, setManifest] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/content/manifest.json')
      .then((response) => response.json())
      .then((data) => {
        setManifest(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading manifest:', error);
        setManifest([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Layout manifest={manifest}>
        <Routes>
          <Route path="/" element={<Home manifest={manifest} />} />
          <Route path="/docs/:slug" element={<DocPage manifest={manifest} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
