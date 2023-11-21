import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import LogoSection from "../../../components/commonComponent/logoSection";
import "./style.scss";
const TopBar = () => {
  return (
    <Navbar expand="lg" className="bg-primary h-auto" data-bs-theme="light">
      <Container fluid>
        <Navbar.Brand href="#home">
          <LogoSection width="auto" height="65px" />
        </Navbar.Brand>

        <div className="d-flex align-items-center white-text gap-3">
          <b>Rules</b>
          <div className="balance-cont">
            <div>
              Balance:<b>0.00</b>
            </div>
            <div>
              Exposure:<b>0</b>
            </div>
          </div>
          <Navbar.Collapse id="navbar-dark-example">
            <Nav>
              <NavDropdown id="nav-dropdown-dark-example" title="Dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
};

export default TopBar;
