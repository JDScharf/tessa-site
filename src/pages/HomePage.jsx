function HomePage() {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1 className="main-title">Slavery in the Age of Abolition</h1>

          <div className="content-grid">
            {/* Plantation Image */}
            <div>
              <img
                className="home-images"
                src="images/west_india_cutting_canes.jpg"
                alt="Historic plantation scene"
              />
              <a href="https://search.library.yale.edu/catalog/9945152293408651">
                <i>
                  Bridgens, Richard, West India scenery with illustrations of
                  Negro character, the process of making sugar. from sketches
                  taken during a voyage to, and residence of seven years in, the
                  island of Trinidad, 1836?
                </i>
              </a>
            </div>

            {/* Right Column Text */}
            <div className="home-top-text">
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
            <div className="home-bottom-text">
              <p>
                Great Britain acquired the former Spanish colony of Trinidad at
                the 1803 Peace of Amiens, and the former French colony of St.
                Lucia at the 1814 Treaty of Paris. Britain ruled the islands as
                Crown Colonies, meaning the colonies were denied the legislative
                assemblies allowed to British Caribbean colonies established
                earlier, such as Barbados or Jamaica.
              </p>
              <br></br>
              <p>
                {" "}
                This meant that legislation for Trinidad and St. Lucia was made
                through metropolitan Orders in Council, limiting local planter
                influence on the law. As a result, St. Lucia and especially
                Trinidad became sites where colonial laws later applied
                throughout the British West Indies, such as registration and
                later amelioration, was first applied and experimented with.
              </p>{" "}
              <br></br>
              <p>
                {" "}
                Registry books for these Crown colonies are therefore much more
                detailed than those for islands where the local assembly
                dictated the form and content of the registries, giving us
                richer insight on the lives of people enslaved on the expanding
                fringes of the nineteenth century British Empire.
              </p>
            </div>

            {/* Map */}
            <div>
              <img
                className="home-images"
                src="/images/test_map.jpg"
                alt="Map of Carribean"
              />
              <p>
                <i>Map of the British Caribbean.</i>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Second Section */}
      <section className="registry-section">
        <div className="home-title-div">
          <h2>Source Material</h2>
        </div>
        <div className="container">
          <div className="registry-grid">
            <img
              src="images/registry_1.jpg"
              alt="An old book that is closed from the top."
              className="registry-image"
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <img
                src="images/registry_2.jpg"
                alt="An old book that is open from the top."
                className="registry-image"
              />
              <p>
                <i>Three views of [shelf mark].</i>
              </p>
            </div>

            <img
              src="images/registry_3.jpg"
              alt="An old book that is closed from the side."
              max-width="100%"
              className="registry-image"
            />
          </div>

          <div className="left-text">
            <p>
              Handwritten registries, copies of which are now held in the T71
              series of the National Archives of the United Kingdom (TNA), yield
              detailed information about every individual enslaved in Trinidad
              and St. Lucia. Following an 1813 Order in Council, enslavers were
              required to report the first name, last name, “color,” employment,
              age, stature, country of origin, “marks,” or distinguishing
              characteristics, and familial relations of each person enslaved in
              Trinidad; in 1815, they did the same for St. Lucia.
            </p>
            <br></br>
            <p>
              In each island, Registrars and their clerks hand-copied this
              information into one of two large books, each of which runs to as
              many as 800 pages: the Registry of Plantation Slaves (i.e., people
              enslaved on agricultural estates) or the Registry of Personal
              Slaves (i.e., people enslaved in more urban settings). In 1819,
              copies of the Registry Books were sent to England, and in 1851
              they were transferred to the Public Record Office (now TNA). The
              registries can be freely accessed at TNA. All information made
              available on this site is based on human-generated transcriptions
              of photographs of these original archival documents.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
