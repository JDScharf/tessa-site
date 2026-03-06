import { useState } from 'react';
import HomePage from './HomePage';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-content">
          {/* Hamburger button — only visible on mobile via CSS */}
          <button
            className="hamburger"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
            <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
            <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
          </button>

          {/* Nav links — collapse on mobile, show when menuOpen */}
          <div className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
            <a href="index.html" className="nav-link" onClick={closeMenu}>Home</a>
            <a href="index.html" className="nav-link" onClick={closeMenu}>St. Lucia</a>
            <a href="index.html" className="nav-link" onClick={closeMenu}>Geography</a>
            <a href="index.html" className="nav-link" onClick={closeMenu}>Plantations</a>
            {/* CTA button is included here so it appears inside the mobile menu too */}
            <button className="cta-button mobile-cta" onClick={closeMenu}>Get in Touch</button>
          </div>

          {/* CTA button — only visible on desktop via CSS */}
          <button className="cta-button desktop-cta">Get in Touch</button>
        </div>
      </nav>

      <HomePage />
    </div>
  );
}

export default App;