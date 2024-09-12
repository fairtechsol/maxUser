import { Container, Navbar } from "react-bootstrap";

// import {isMobile} from "../../../utils/screenDimension";
import DesktopHeader from "./desktop";
import MobileHeader from "./mobile";
import "./style.scss";
import { useEffect, useState } from "react";
const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1199);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1199);
    };

    // Add event listener to update isMobile on window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Navbar expand="lg" className="bg-primary h-auto" data-bs-theme="light">
      <div  className="w-100">
        {isMobile ? <MobileHeader /> : <DesktopHeader />}
      </div>
    </Navbar>
  );
};

export default Header;
