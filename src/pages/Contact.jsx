function ContactPage() {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1 className="main-title">Contact Information</h1>
        </div>
      </section>

      {/* Second Section */}
      <section className="contact-section">
        <div className="contact-header-div">
          <img
            src="images/murphy-crop.jpg"
            alt="Professional headshot of Dr. Tessa Murphy."
            className="headshot-image"
          />
          <div className="contact-text">
            <h2>Dr. Tessa Murphy</h2>
            <h3>
              {" "}
              <a
                className="contact-links"
                href="https://www.maxwell.syr.edu/directory/tessa-murphy"
              >
                Maxwell faculty page Link{" "}
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
        <div className="container"></div>
      </section>
    </div>
  );
}

export default ContactPage;
