import { useState } from "react";
import { Col, Collapse, Dropdown, Navbar, Row } from "react-bootstrap";
import { FaSearchPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../../../../components/commonComponent/input";
import LogoSection from "../../../../components/commonComponent/logoSection";
import { logout } from "../../../../store/actions/authAction";
import { AppDispatch } from "../../../../store/store";
import dropdownList from "../dropdown.json";
import ExposureModal from "../modalExposure";
import SearchResult from "../searchResult";
import CustomDropDown from "./dropdown/customDropdown";
import "./style.scss";

const DesktopHeader = () => {
  const [open, setOpen] = useState(false);
  const [openExposure, setOpenExposure] = useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  const handleClickExposureModalOpen = () => {
    setOpenExposure(!openExposure);
  };

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

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
              <div id="searchCollapse" className="position-relative">
                <CustomInput placeholder="All Events" />
                <SearchResult
                  data={[
                    {
                      name: "Cricket | MAtch odd",
                      date: "11/27/2023 04:15:00 PM",
                      label: "Test",
                    },
                    {
                      name: "Cricket | MAtch odd",
                      date: "11/27/2023 04:15:00 PM",
                      label: "Test",
                    },
                    {
                      name: "Cricket | MAtch odd",
                      date: "11/27/2023 04:15:00 PM",
                      label: "Test",
                    },
                  ]}
                />
              </div>
            </Collapse>
            <span>
              <FaSearchPlus
                aria-expanded={open}
                aria-controls="searchCollapse"
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
                <span
                  onClick={handleClickExposureModalOpen}
                  className="white-text text-decoration-underline cursor-pointer"
                >
                  Exposure:<b>0</b>
                </span>
                <ExposureModal
                  show={openExposure}
                  setShow={handleClickExposureModalOpen}
                />
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
                        className="title-14 px-2 py-1"
                        onClick={() => {
                          navigate(item.link || "");
                        }}
                        key={item?.id}
                        eventKey={item?.id}
                      >
                        {item?.name}
                      </Dropdown.Item>
                    );
                  })}
                <Dropdown.Divider />
                <Dropdown.Item
                  className="title-14"
                  eventKey={"sign-out"}
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  Signout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>

        <div className="marquee-container nav-marquee text-white">
          <div className="marquee-content title-14">
            {/* Your scrolling content goes here */}
            <i>
              {" "}
              Use https://sept23.olddata.info/login for view old account between
              March23 to September23
            </i>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default DesktopHeader;
