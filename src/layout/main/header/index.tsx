import { useEffect, useState } from "react";
import { Navbar } from "react-bootstrap";
import DesktopHeader from "./desktop";
import MobileHeader from "./mobile";
import "./style.scss";
const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1199);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1199);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Navbar expand="lg" className="bg-primary h-auto" data-bs-theme="light">
      <div className="w-100">
        {isMobile ? <MobileHeader /> : <DesktopHeader />}
      </div>
    </Navbar>
  );
};

export default Header;
