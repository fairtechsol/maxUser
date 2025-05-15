import React, { useState } from "react";
import { Dropdown, Modal, Navbar } from "react-bootstrap";
import Marquee from "react-fast-marquee";
import { FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LogoSection from "../../../../components/commonComponent/logoSection";
import ButtonValues from "../../../../components/gameDetails/mobile/buttonValues";
import { logout } from "../../../../store/actions/authAction";
import { getMyMarket } from "../../../../store/actions/betPlace/betPlaceActions";
import { AppDispatch, RootState } from "../../../../store/store";
import { sportsRules } from "../../../../utils/constants";
import CustomDropDown from "../desktop/dropdown/customDropdown";
import dropdownList from "../dropdown.json";
import ExposureModal from "../modalExposure";
import SearchBox from "./searchBox";
import "./style.scss";

const MobileHeader = () => {
  const dispatch: AppDispatch = useDispatch();
  const [show, setShow] = useState<any>({
    balance: true,
    exposure: true,
  });
  const [showValues, setShowButtonValues] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [openExposure, setOpenExposure] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [activeSport, setActiveSport] = useState(sportsRules[0]?.sportName);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelect = (sportName) => {
    setActiveSport(sportName); // Update active tab
  };
  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeModal = () => setShowRules(false);
  const handleClickExposureModalOpen = () => {
    if (parseFloat(getProfile?.userBal?.exposure) === 0) {
      return false;
    }
    if (!openExposure) {
      dispatch(getMyMarket());
    }
    setOpenExposure(!openExposure);
  };

  const navigate = useNavigate();

  const { getProfile, marqueeNotification } = useSelector(
    (state: RootState) => state.user.profile
  );

  return (
    <>
      <div className="float-start d-flex align-items-center gap-2">
        <div className="logodiv">
          <FaHome className="text-white title-22" />
          <Link to={"home"}>
            <Navbar.Brand>
              <LogoSection width="auto" height="27px" />
            </Navbar.Brand>
          </Link>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center white-text list-unstyled float-end h-100">
        <div
          className="d-flex gap-1 align-items-center justify-content-end w-100 title-12 mt-1 "
          style={{ visibility: show?.balance ? "visible" : "hidden" }}
        >
          Balance:
          <b>
            {parseFloat(getProfile?.userBal?.currentBalance || 0).toFixed(2)}
          </b>
        </div>
        <div className="d-flex gap-1 title-12">
          <span
            className="d-flex justify-content-center align-items-center"
            style={{ visibility: show?.exposure ? "visible" : "hidden" }}
            onClick={handleClickExposureModalOpen}
          >
            Exp:{" "}
            <span className="fbold">
              {parseInt(getProfile?.userBal?.exposure) === 0
                ? 0
                : -parseFloat(getProfile?.userBal?.exposure || 0).toFixed(2)}
            </span>
          </span>

          <ExposureModal
            show={openExposure}
            setShow={handleClickExposureModalOpen}
          />
          <div>
            <Dropdown
              show={showDropdown}
              onToggle={() => setShowDropdown(!showDropdown)}
            >
              <Dropdown.Toggle
                id="dropdown-custom-components"
                className="title-14"
                as={CustomDropDown}
              >
                <span className="title-14">
                  {sessionStorage.getItem("isDemo")
                    ? "Demo"
                    : getProfile?.userName}
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu
                variant="light"
                className="shadow-sm dropdown-menu-nav"
              >
                {dropdownList
                  ?.filter((item) => {
                    if (sessionStorage.getItem("isDemo")) {
                      return item?.showDemo === true;
                    } else {
                      return item;
                    }
                  })
                  ?.map((item) => {
                    return (
                      <Dropdown.Item
                        className="title-16px d-flex justify-content-between"
                        onClick={(e) => {
                          setShowDropdown(!showDropdown);
                          e.stopPropagation();
                          if (item?.link) {
                            navigate(item.link);
                          } else if (
                            item?.isModal &&
                            item?.id === "setButtonValues"
                          ) {
                            setShowButtonValues(true);
                          } else if (item?.isModal && item?.id === "rules") {
                            setShowRules(true);
                          }
                        }}
                        key={item?.id}
                        eventKey={item?.id}
                      >
                        {item?.name}
                        {item?.onClick && (
                          <input
                            type="checkbox"
                            id={item.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              setShow((prev: any) => {
                                return {
                                  ...prev,
                                  [item.id]: !prev[item.id],
                                };
                              });
                            }}
                            onChange={() => { }}
                            checked={show[item.id]}
                            style={
                              show[item.id]
                                ? {
                                  backgroundColor: "#FFC742",
                                  borderColor: "#FFC742",
                                }
                                : {}
                            }
                            className="custom-checkbox23"
                          />
                        )}
                      </Dropdown.Item>
                    );
                  })}
                <Dropdown.Divider />
                <Dropdown.Item
                  className="title-16 d-flex justify-content-between"
                  eventKey={"Logout"}
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  Signout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
      <SearchBox />
      <div className="marquee-container text-white p-1">
        {/* <b className="marquee-content title-10">{marqueeNotification?.value}</b> */}
        <Marquee>
          <span style={{ marginLeft: "300px" }}>{marqueeNotification?.value}
          </span>
        </Marquee>
      </div>
      <Modal
        show={showValues}
        onHide={() => setShowButtonValues(false)}
        className="setbtn-modal"
      >
        <Modal.Header
          className="bg-primary rounded-0"
          style={{ zIndex: "999" }}
        >
          <Modal.Title>
            <span
              style={{ color: "#fff", fontSize: "16px", fontWeight: "bold" }}
            >
              Set Button Value
            </span>
          </Modal.Title>
          <button
            type="button"
            className="btn-close btn-close-white"
            aria-label="Close"
            onClick={() => setShowButtonValues(false)}
          />
        </Modal.Header>
        <Modal.Body className="p-0 mt-2 mb-2 rounded-0">
          <ButtonValues setShow={setShowButtonValues} />
        </Modal.Body>
      </Modal>

      <Modal show={showRules} onHide={() => setShow(false)}>
        <Modal.Header
          className="bg-primary rounded-0 sticky-top w-100"
          style={{ zIndex: "999" }}
        >
          <Modal.Title
            className={
              " title-16 f-600 text-white w-100 d-flex justify-content-between"
            }
          >
            Rules
            <div className="rules-langualge">
              <div
                className={`dropdown ${isOpen ? "show" : ""}`}
                style={{ position: "relative" }}
              >
                <button
                  type="button"
                  id="lang-dropdown"
                  aria-expanded={isOpen}
                  className={`dropdown-toggle-1 btn-1 ${isOpen ? "show" : ""}`}
                  onClick={toggleDropdown}
                >
                  <img
                    src="https://versionobj.ecoassetsservice.com/v23/static/front/img/flags/flag_english.png"
                    alt="English"
                    style={{ marginRight: "8px" }}
                  />
                  English
                  <span className="dropdown-arrow">▼</span>
                </button>

                {isOpen && (
                  <div
                    className="dropdown-menu-1 show"
                    aria-labelledby="lang-dropdown"
                  >
                    <a
                      href="#"
                      className="dropdown-item-1"
                      role="button"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleDropdown();
                      }}
                    >
                      <img
                        src="https://versionobj.ecoassetsservice.com/v23/static/front/img/flags/flag_english.png"
                        alt="English"
                        style={{ marginRight: "8px" }}
                      />
                      English
                    </a>
                  </div>
                )}
              </div>
            </div>
          </Modal.Title>
          <button
            type="button"
            className="btn-close btn-close-white"
            aria-label="Close"
            onClick={() => setShowRules(false)}
          />
        </Modal.Header>
        <Modal.Body className="p-0 mt-1 rounded-0">
          <div className="rules-left-sidebar">
            <div className="navvv nav-pill" role="tablist">
              {sportsRules.map((sport, index) => (
                <div
                  className={`nav-itemmm pt-1 px-2 ${activeSport === sport.sportName ? "active" : ""
                    }`}
                  key={index}
                >
                  <a
                    role="tab"
                    id={`rules-tabs-tab-${index}`}
                    aria-controls={`rules-tabs-tabpane-${index}`}
                    aria-selected={activeSport === sport.sportName}
                    className="nav-linkss"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSelect(sport.sportName);
                    }}
                    tabIndex={0}
                    href="#"
                  >
                    {sport.sportName}
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div
            className="tab-content-1 p-2"
            style={{
              minHeight: "500px",
              maxHeight: "900px",
              overflow: "hidden",
            }}
          >
            {sportsRules.map((sport, index) => (
              <div
                key={index}
                role="tabpanel"
                id={`rules-tabs-tabpane-${index}`}
                aria-labelledby={`rules-tabs-tab-${index}`}
                className={`tab-pane ${activeSport === sport.sportName ? "show active" : ""
                  }`}
              >
                {activeSport === sport.sportName && (
                  <div
                    style={{
                      minHeight: "400px",
                      maxHeight: "800px",
                      overflowY: "auto",
                      bottom: 0,
                    }}
                    className="p-1"
                  >
                    <table
                      style={{ width: "100%", borderCollapse: "collapse" }}
                    >
                      <tbody>
                        {sport.rules.map((rule, ruleIndex) => (
                          <React.Fragment key={ruleIndex}>
                            <tr>
                              <td
                                colSpan={100}
                                className="rule-popup-heading bg-secondary p-1 text-white title-18"
                                style={{
                                  fontWeight: "bold",
                                  textAlign: "left",
                                  padding: "10px",
                                  borderBottom: "1px solid #ccc",
                                  marginBottom: "10px",
                                }}
                              >
                                {rule.category}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ height: "8px" }} />
                            </tr>
                            {rule.description.map((description, descIndex) => (
                              <tr
                                className="title-12 gap-2"
                                style={{ backgroundColor: "#f2f2f2" }}
                                key={descIndex}
                              >
                                <td
                                  style={{
                                    padding: "6px 10px",
                                    borderBottom: "1px solid #ddd",
                                    textAlign: "left",
                                    lineHeight: 1.5,
                                    color: description?.color || "black",
                                  }}
                                >
                                  {description?.text}
                                </td>
                              </tr>
                            ))}
                            <tr>
                              <td style={{ height: "8px" }} />
                            </tr>
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Modal.Body>

        <div className="modal-footer-1">
          <button className="btn btn-danger" onClick={closeModal}>
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};

export default MobileHeader;
