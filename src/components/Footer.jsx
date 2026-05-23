export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-text">Made possible with support from</span>
            <div className="logo-images">
              <a
                className="footer-a-tag"
                href="https://www.mellon.org/article/new-directions-fellowships"
              >
                <img
                  className="footer-img"
                  src="../images/MellonFoundationWordmark_White.png"
                  alt=""
                ></img>
              </a>

              <a className="footer-a-tag" href="https://www.maxwell.syr.edu/">
                <img
                  className="footer-img"
                  src="../images/syr_maxwell_small_1c-reverse_rgb.png"
                  alt=""
                ></img>
              </a>
            </div>
          </div>
          <div className="footer-social">
            <span className="footer-text">
              Crafted by{" "}
              <a className="footer-link" href="https://cnydataventures.com/">
                CNY Data Ventures
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
