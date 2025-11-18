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
                src="images/west_india_cutting_canes.jpg"
                alt="Historic plantation scene"
              />
            </div>

            {/* Right Column Text */}
            <div className="left-text">
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
            <div className="left-text">
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
                  src="/images/test_map.jpg"
                  alt="Historic plantation scene"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Second Section */}
      <section className="registry-section">
        <div className="container">
          <h2>Source Material</h2>

          <div className="registry-grid">
              <img
                src="images/registry_1.jpg"
                alt="An old book that is closed from the top."
                className="registry-image"
              />

              <img
                src="images/registry_2.jpg"
                alt="An old book that is open from the top."
                className="registry-image"
              />

              <img
                src="images/registry_3.jpg"
                alt="An old book that is closed from the side."
                max-width="100%"
                className="registry-image"
              />
          </div>

          <div className="left-text">
            <p>
Handwritten registries, copies of which are now held in the T71 series of the National Archives 
of the United Kingdom (TNA), yield detailed information about every individual enslaved in 
Trinidad and St. Lucia. Following an 1813 Order in Council, enslavers were required to report 
the first name, last name, “color,” employment, age, stature, country of origin, “marks,” or 
distinguishing characteristics, and familial relations of each person enslaved in Trinidad; in 1815, 
they did the same for St. Lucia.</p><br></br> 
<p>In each island, Registrars and their clerks hand-copied this 
information into one of two large books, each of which runs to as many as 800 pages: the 
Registry of Plantation Slaves (i.e., people enslaved on agricultural estates) or the Registry of 
Personal Slaves (i.e., people enslaved in more urban settings). In 1819, copies of the Registry 
Books were sent to England, and in 1851 they were transferred to the Public Record Office (now 
TNA). The registries can be freely accessed at TNA. All information made available on this site 
is based on human-generated transcriptions of photographs of these original archival documents.  
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
