import { Container, Navbar } from "react-bootstrap";

import isMobile from "../../../utils/screenDimension";
import DesktopHeader from "./desktop"; 
import MobileHeader from "./mobile";
import "./style.scss";

const Header = () => {
  return (
    <Navbar expand="lg" className="bg-primary h-auto" data-bs-theme="light">
      <Container fluid className="w-100">
        {isMobile ? <MobileHeader /> : <DesktopHeader />}
      </Container>
    </Navbar>
  );
};

export default Header;
