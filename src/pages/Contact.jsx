function ContactPage() {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="contact-section">
        <div className="container">
          <h1 className="main-title">Contact Information</h1>

          <div className="contact-header-div">
            <img
              src="images/murphy-crop.jpg"
              alt="Professional headshot of Dr. Tessa Murphy."
              className="headshot-image"
            />
            <div className="contact-text">
              <h2>Dr. Tessa Murphy</h2>
              <h3>
                <a
                  className="contact-links"
                  href="https://www.maxwell.syr.edu/directory/tessa-murphy"
                >
                  Associate Professor of History, Syracuse University
                </a>
              </h3>
              <h3>
                email:{" "}
                <a className="contact-links" href="mailto:temurphy@syr.edu">
                  temurphy@syr.edu
                </a>
              </h3>
            </div>
          </div>

          <div className="citation-text">
            <h2>Related Publications</h2>
            <ul>
              <li>
                Murphy, Tessa. “
                <a href="https://muse.jhu.edu/pub/275/article/925936/pdf">
                  Centering Slavery in the Age of Abolition: Insights from the
                  Saint Lucia Register of Plantation Slaves, 1815.
                </a>
                ”<i> William and Mary Quarterly</i>, 3d ser., 81, no. 2 (April
                2024): 359–94.
              </li>
              <li>
                Murphy, Tessa and Michael Fudge. "
                <a href="https://doi.org/10.25971/r26a-gf45">
                  Slavery in Saint Lucia: Insights from the Saint Lucia Register
                  of Plantation Slaves, 1815.
                </a>
                " <i>Journal of Slavery and Data Preservation 5</i>, no. 2
                (2024): 22-30.
              </li>
              <li>
                Fudge, Michael; Murphy, Tessa, et al. "
                <a href="https://doi.org/10.7910/DVN/HQFZGJ">
                  Saint Lucia Register of Plantation Slaves, 1815 dataset
                </a>
                ", Harvard Dataverse (2024).
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
