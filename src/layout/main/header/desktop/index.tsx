import { Col, Collapse, Dropdown, Navbar, Row } from "react-bootstrap";
import { FaSearchPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import LogoSection from "../../../../components/commonComponent/logoSection";
import dropdownList from "../dropdown.json";
import CustomDropDown from "./dropdown/customDropdown";

import { useState } from "react";
import CustomInput from "../../../../components/commonComponent/input";
import "./style.scss";

const DesktopHeader = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  return (
    <Row className=" w-100">
      <Col xs={12}>
        <div className="float-start">
          <Link to={"/home"}>
            <Navbar.Brand>
              <LogoSection width="auto" height="65px" />
            </Navbar.Brand>
          </Link>
        </div>
        <ul className="d-flex align-items-center white-text gap-3 list-unstyled mb-0 float-end h-100">
          <li className="d-flex gap-3 align-items-center">
            <Collapse in={open} dimension="width">
              <div id="example-collapse-text">
                <CustomInput placeholder="All Events" />
              </div>
            </Collapse>
            <span>
              <FaSearchPlus
                aria-expanded={open}
                aria-controls="example-collapse-text"
                onClick={handleClickOpen}
                className="title-24"
              />
            </span>
          </li>
          <li>
            <b>Rules</b>
          </li>
          <li>
            <div className="balance-cont">
              <div>
                Balance:<b>0.00</b>
              </div>
              <div>
                <Link to={""} className="white-text ">
                  Exposure:<b>0</b>
                </Link>
              </div>
            </div>
          </li>
          <li>
            <Dropdown>
              <Dropdown.Toggle
                as={CustomDropDown}
                id="dropdown-custom-components"
              >
                Custom toggle
              </Dropdown.Toggle>

              <Dropdown.Menu className="rounded-2 shadow-sm dropdown-menu-nav">
                {dropdownList
                  ?.filter((item) => item?.type !== "mobile")
                  ?.map((item) => {
                    return (
                      <Dropdown.Item
                        className="title-14"
                        href={item?.link}
                        key={item?.id}
                        eventKey={item?.id}
                      >
                        {item?.name}
                      </Dropdown.Item>
                    );
                  })}
                <Dropdown.Divider />
                <Dropdown.Item className="title-14" eventKey={"sign-out"}>
                  Signout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>

        <div className="marquee-container nav-marquee text-white">
          <div className="marquee-content">
            {/* Your scrolling content goes here */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default DesktopHeader;
