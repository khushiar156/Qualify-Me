import React, { useState } from 'react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'eligibility', label: 'Find Schemes' },
  { id: 'schemes', label: 'Explore' },
  { id: 'saved', label: 'Saved' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'faq', label: 'FAQ' },
  { id: 'about', label: 'About' },
];

export default function Navbar({ currentPage, onNavigate, savedCount }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (pageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <div className="navbar__logo" onClick={() => handleLinkClick('home')} role="button" tabIndex={0}>
          <span className="navbar__logo-mark">&#9673;</span> QUALIFY ME
        </div>

        <button
          className="navbar__toggle"
          aria-label="Open menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`navbar__links ${mobileMenuOpen ? 'navbar__links--open' : ''}`}>
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={`nav-link ${isActive ? 'nav-link--active' : ''}`}
                  onClick={() => handleLinkClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                  {item.id === 'saved' && savedCount > 0 && (
                    <span className="navbar__badge">{savedCount}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
