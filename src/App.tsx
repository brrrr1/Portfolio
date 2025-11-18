import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import AdminPanel from './pages/AdminPanel';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const ScrollManager = () => {
  const location = useLocation();

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | undefined;
    if (location.pathname === '/' && state?.scrollTo) {
      const timer = setTimeout(() => {
        const element = document.getElementById(state.scrollTo!);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
      window.history.replaceState({}, document.title, location.pathname + location.search);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return null;
};

const LandingPage = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 overflow-x-hidden w-full max-w-full">
    <Navbar />
    <main className="overflow-x-hidden w-full pt-16">
      <Home />
      <About />
      <Projects />
      <Contact />
    </main>
    <Footer />
  </div>
);

const AdminLayout = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 w-full max-w-full">
    <Navbar />
    <main className="pt-16">
      <AdminPanel />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ScrollManager />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminLayout />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
