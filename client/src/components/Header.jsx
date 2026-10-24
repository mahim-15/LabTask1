import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand" aria-label="Playloop home">
          <span className="brand-mark">▶</span>
          <span>play<span>loop</span></span>
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '×' : '☰'}
        </button>
        <nav className={`main-nav${menuOpen ? ' main-nav--open' : ''}`}>
          <NavLink to="/games" onClick={() => setMenuOpen(false)}>Explore</NavLink>
          <Link to="/#categories" onClick={() => setMenuOpen(false)}>Categories</Link>
          <Link to="/#popular" onClick={() => setMenuOpen(false)}>Popular</Link>
          <NavLink to="/premium" className="nav-premium" onClick={() => setMenuOpen(false)}>✦ Go Premium</NavLink>
        </nav>
        <Link to="/#play-now" className="button button--dark header-cta">Play games <span>↗</span></Link>
      </div>
    </header>
  );
}

export default Header;
