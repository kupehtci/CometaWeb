import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useTheme } from '../context/ThemeContext';
import cometaLogo from '../assets/cometa.svg'; 
import { useState, useEffect } from 'react';

interface LayoutProps {
  children: ReactNode;
  files: string[];
}

const Layout = ({ children, files }: LayoutProps) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const isDocs = location.pathname.includes('/docs');

  return (
    <div className={`app-container ${!isDocs ? 'no-sidebar' : ''} ${sidebarOpen ? 'sidebar-open' : ''}`}>
      {isDocs && (
        <>
          <Sidebar files={files} />
          {/* Overlay for mobile */}
          <div 
            className={`sidebar-overlay${sidebarOpen ? ' visible' : ''}`}
            onClick={() => setSidebarOpen(false)}
            style={{ display: sidebarOpen ? 'block' : 'none' }}
          />
        </>
      )}
      <div className="main-content-wrapper">
        <nav className="navbar">
          <div className="nav-links">
            {/* Hamburger for mobile */}
            {isDocs && (
              <button 
                className="sidebar-toggle-btn" 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle sidebar"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect y="4" width="24" height="2" rx="1" fill="currentColor"/>
                  <rect y="11" width="24" height="2" rx="1" fill="currentColor"/>
                  <rect y="18" width="24" height="2" rx="1" fill="currentColor"/>
                </svg>
              </button>
            )}
            <img src={cometaLogo} width={30} alt="Cometa Logo" />
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              Home
            </Link>
            <Link 
              to={`/docs/getting-started`} 
              className={location.pathname.includes('/docs') ? 'active' : ''}
            >
              Docs
            </Link>
            <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
              About
            </Link>
          </div>
          <button className="theme-toggle-nav" onClick={toggleTheme}>
            {theme === 'light' ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
                </svg>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
                </svg>
              </>
            )}
          </button>
        </nav>
        <main className="content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;