import {Form, Link} from 'react-router';
import { useState } from 'react';
import clsx from 'clsx';

export function MainNav() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="main-nav">
        <div className="nav-container">
          {/* Logo */}
          <Link to="/" className="nav-logo">
            <span className="logo-text">Communa</span>
          </Link>

          {/* Desktop Search */}
          <div className="nav-search-desktop">
            <Form method="get" action="/search" className="search-form">
              <input
                type="search"
                name="q"
                placeholder="white HipVan sofa in BTO"
                className="search-input"
              />
              <button type="submit" className="search-button" aria-label="Search">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </Form>
          </div>

          {/* Nav Actions */}
          <div className="nav-actions">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="nav-action-mobile"
              aria-label="Open search"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* User Account */}
            <Link to="/account" className="nav-action" aria-label="Account">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="mobile-search-overlay">
          <div className="mobile-search-header">
            <button
              onClick={() => setIsSearchOpen(false)}
              className="mobile-search-back"
              aria-label="Close search"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Form method="get" action="/search" className="mobile-search-form">
              <input
                type="search"
                name="q"
                placeholder="white HipVan sofa in BTO"
                className="mobile-search-input"
                autoFocus
              />
            </Form>
          </div>
        </div>
      )}
    </>
  );
}
