
import "../../layout.scss";


const Footer = () => {
  return (
    <section className="footer-login w-100" id="page-footer">
      <div className="footer-top">
        <div className="footer-links">
          <nav className="navbar">
            <ul className="navbar-nav-f">
              <li className="">
                <a className="nav-link" href="/terms-and-conditions" target="_blank">
                  Terms and Conditions
                </a>
              </li>
              <li className="">
                <a className="nav-link" href="/responsible-gaming" target="_blank">
                  Responsible Gaming
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="support-detail mt-3">
          <h2>24X7 Support</h2>
          <p></p>
        </div>
        <div className="social-icons-box"></div>
      </div>
    </section>
  );
};

export default Footer;

