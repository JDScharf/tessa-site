import { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Overview from "./pages/Overview.jsx";
import PlantationPage from "./pages/PlantationPage.jsx";
import Footer from "./components/Footer.jsx";
import "./App.css";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <BrowserRouter>
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
              <span className={`hamburger-line ${menuOpen ? "open" : ""}`} />
              <span className={`hamburger-line ${menuOpen ? "open" : ""}`} />
              <span className={`hamburger-line ${menuOpen ? "open" : ""}`} />
            </button>

            {/* Nav links — collapse on mobile, show when menuOpen */}
            <div className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
              <NavLink to="/" className="nav-link" onClick={closeMenu}>
                Home
              </NavLink>
              <NavLink to="/overview" className="nav-link" onClick={closeMenu}>
                Overview
              </NavLink>
              <NavLink to="/" className="nav-link" onClick={closeMenu}>
                Geography
              </NavLink>
              <NavLink
                to="/plantation"
                className="nav-link"
                onClick={closeMenu}
              >
                Plantations
              </NavLink>
              {/* CTA button is included here so it appears inside the mobile menu too */}
              <button className="cta-button mobile-cta" onClick={closeMenu}>
                Get in Touch
              </button>
            </div>

            {/* CTA button — only visible on desktop via CSS */}
            <button className="cta-button desktop-cta">Get in Touch</button>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/plantation" element={<PlantationPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
