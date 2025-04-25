import { isMobile } from "../../../utils/screenDimension";
import "../../layout.scss";

const FooterMain = () => {
  return (
    <section className="footer ">
      <div className="footer-top">
        <div className="footer-links">
          <nav className="navbar">
            <ul className="navbar-nav-f">
              <li className="">
                <a
                  className="nav-link"
                  href="/terms-and-conditions"
                  target="_blank"
                >
                  Terms and Conditions
                </a>
              </li>
              <li className="">
                <a
                  className="nav-link"
                  href="/responsible-gaming"
                  target="_blank"
                >
                  Responsible Gaming
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="support-detail mt-3">
          {isMobile ? <h5>24X7 Support</h5> : <h2>24X7 Support</h2>}

          <p></p>
        </div>
        <div className="social-icons-box" />
      </div>
    </section>
  );
};

export default FooterMain;
