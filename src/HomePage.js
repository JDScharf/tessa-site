import React from "react";

export default function SlaveryAbolitionPage() {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1 className="main-title">Slavery in the Age of Abolition</h1>

          <div className="content-grid">
            {/* Plantation Image */}
            <div className="image-card">
              <img
                src="images/west_india_cutting_canes.png"
                alt="Historic plantation scene"
              />
            </div>

            {/* Right Column Text */}
            <div>
              <p>
                Slavery in the age of abolition highlights the realities of
                slavery in some of the last Caribbean islands to be acquired by
                Great Britain: the Crown colonies of Trinidad and St. Lucia.
              </p>
              <br></br>
              <p>
                After Great Britain ended its participation in the transatlantic
                slave trade in 1807, Crown authorities sought to create a
                detailed account of every individual who was enslaved in the
                empire. They first undertook this unprecedented exercise in
                imperial record-keeping in Trinidad in 1813, and then extended
                it to St. Lucia in 1815. As a result of their bureaucratic
                endeavor, today we can access biographical and genealogical
                information about tens of thousands of people who were otherwise
                denied an opportunity to leave a written record of their lives,
                including about their year and place of birth, their race, the
                kind of labor they were forced to perform, their height and
                other physical characteristics, and most importantly, their
                familial relations.
              </p>
              <br></br>
              <p>
                While these records do not allow enslaved people to tell us
                about their experiences in their own words, they offer us a
                glimpse of their daily lives, the journeys that many were forced
                to take to the islands, and the families they forged once there.
                By making this information available, we hope to put enslaved
                people, rather than planters or abolitionists, at the center of
                the story of slavery in the British Caribbean.
              </p>
            </div>
          </div>

          <div className="content-grid">
            {/* Left Column Text */}
            <div>
              <p>
                Great Britain acquired the former Spanish colony of Trinidad at
                the 1803 Peace of Amiens, and the former French colony of St.
                Lucia at the 1814 Treaty of Paris. Britain ruled the islands as
                Crown Colonies, meaning the colonies were denied the legislative
                assemblies allowed to British Caribbean colonies established
                earlier, such as Barbados or Jamaica.</p><br></br>
                <p> This meant that
                legislation for Trinidad and St. Lucia was made through
                metropolitan Orders in Council, limiting local planter influence
                on the law. As a result, St. Lucia and especially Trinidad
                became sites where colonial laws later applied throughout the
                British West Indies, such as registration and later
                amelioration, was first applied and experimented with.</p> <br></br>
                
                <p> Registry
                books for these Crown colonies are therefore much more detailed
                than those for islands where the local assembly dictated the
                form and content of the registries, giving us richer insight on
                the lives of people enslaved on the expanding fringes of the
                nineteenth century British Empire.
              </p>
            </div>

            {/* Map */}
            <div className="image-card">
              <div className="map-container">
                <img
                  src="/images/test_map.png"
                  alt="Historic plantation scene"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Second Section */}
      <section className="documents-section">
        <div className="container">
          <h2 className="section-title">Lorem ipsum dolor sit amet</h2>

          <div className="documents-grid">
            {/* Old Book Cover */}
            <div className="image-card">
              <img
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80"
                alt="Aged book cover"
                className="document-image"
              />
            </div>

            {/* Handwritten Document */}
            <div className="image-card">
              <img
                src="https://images.unsplash.com/photo-1568459522947-eb1bfea95668?w=800&q=80"
                alt="Historical handwritten document"
                className="document-image"
              />
            </div>

            {/* Old Books Stack */}
            <div className="image-card">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                alt="Stack of old books"
                className="document-image"
              />
            </div>
          </div>

          <div className="centered-text">
            <p className="text-content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a
              est pellentesque, cursus eros vel, euismod nulla. Nunc vitae felis
              nec velit pellentesque tempus. Etiam fermentum scelerisque orci,
              vitae molestie erat laoreet vel. In hac habitasse platea dictumst.
              Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Vestibulum ante ipsum primis in
              faucibus orci luctus et ultrices posuere cubilia curae; in vel
              luctus lectus. Proin vitae felis facilisis, egestas felis
              vulputate, tempus turpis. Nulla eleifend augue sapien, sit amet
              ultrices turpis lacinia ac. Vestibulum in malesuada mi, at
              scelerisque ligula.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <span className="footer-text">Brought To You By</span>
              <div className="logo-circle">
                <svg viewBox="0 0 50 50" className="logo-svg">
                  <circle
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    stroke="#333"
                    strokeWidth="2"
                    strokeDasharray="3,2"
                  />
                  <text
                    x="25"
                    y="30"
                    textAnchor="middle"
                    fontSize="10"
                    fill="#333"
                    fontWeight="bold"
                  >
                    UWI
                  </text>
                </svg>
              </div>
            </div>
            <div className="footer-social">
              <span className="footer-text">Follow Our Work</span>
              <a href="index.html" className="social-icon">
                <svg viewBox="0 0 24 24" fill="#333">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
