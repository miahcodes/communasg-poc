import { Sidebar } from './Sidebar';
import { Link } from 'react-router';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="app-layout">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="content-area">
        {/* Desktop Header */}
        <header className="desktop-header">
          <div className="desktop-search-container">
            <div className="desktop-search-wrapper">
              <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="search"
                placeholder="Search"
                className="desktop-search-input"
              />
            </div>
          </div>
          <div className="desktop-header-actions">
            <button className="header-action-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="3"/>
                <path d="M5 20a7 7 0 0114 0"/>
              </svg>
            </button>
          </div>
        </header>

        {/* Mobile Header */}
        <header className="mobile-header">
          {/* Row 1: Logo and Profile */}
          <div className="mobile-header-row1">
            <Link to="/" className="mobile-logo">
              <span className="mobile-logo-text">Communa</span>
            </Link>
            <button className="mobile-profile-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="8" r="3"/>
                <path d="M5 20a7 7 0 0114 0"/>
              </svg>
            </button>
          </div>

          {/* Row 2: Search Bar */}
          <div className="mobile-search-container">
            <div className="mobile-search-bar">
              <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="search"
                placeholder="white HipVan sofa in BTO"
                className="mobile-search-input"
              />
            </div>
          </div>

          {/* Row 3: Segmented Tabs */}
          <div className="mobile-tabs-container">
            <div className="mobile-tabs">
              <button className="mobile-tab active">Popular</button>
              <button className="mobile-tab">Following</button>
              <button className="mobile-tab">Recent</button>
              <button className="mobile-tab">ID Experts</button>
            </div>
          </div>

          {/* Row 4: Filter Chips */}
          <div className="mobile-filter-row">
            <button className="filter-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 6h18M7 12h10M10 18h4"/>
              </svg>
            </button>
            <div className="filter-chips">
              <button className="filter-chip active">HDB (BTO)</button>
              <button className="filter-chip">HDB (Resale)</button>
              <button className="filter-chip">Condo</button>
            </div>
            <button className="chevron-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="main-content">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-bottom-nav">
        <Link to="/" className="mobile-nav-item active">
          <span className="mobile-nav-icon">🏠</span>
          <span className="mobile-nav-label">Home</span>
        </Link>
        <Link to="/following" className="mobile-nav-item">
          <span className="mobile-nav-icon">👥</span>
          <span className="mobile-nav-label">Following</span>
        </Link>
        <Link to="/create" className="mobile-nav-item mobile-nav-create">
          <span className="mobile-nav-icon">+</span>
        </Link>
        <Link to="/experts" className="mobile-nav-item">
          <span className="mobile-nav-icon">⭐</span>
          <span className="mobile-nav-label">Experts</span>
        </Link>
        <Link to="/profile" className="mobile-nav-item">
          <span className="mobile-nav-icon">👤</span>
          <span className="mobile-nav-label">Profile</span>
        </Link>
      </nav>
    </div>
  );
}