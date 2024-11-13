import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { Col, Collapse, Dropdown, Navbar, Row, Modal } from "react-bootstrap";
import { FaSearchPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../../../../components/commonComponent/input";
import LogoSection from "../../../../components/commonComponent/logoSection";
import MarqueeHeader from "../../../../components/commonComponent/marquee";
import { logout } from "../../../../store/actions/authAction";
import { getMatchListSearch } from "../../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../../store/store";
import dropdownList from "../dropdown.json";
import ExposureModal from "../modalExposure";
import SearchResult from "../searchResult";
import CustomDropDown from "./dropdown/customDropdown";
import "./style.scss";
// import SearchInput from "../../../../components/commonComponent/mainSearch";
import { SearchListReset } from "../../../../store/actions/match/matchListAction";
import CustomModal from "../../../../components/commonComponent/modal";
import Drules from "../../../../components/rules/desktop";
import Mobile from "../../../../components/rules/mobile";
// import { isMobile } from "../../../../utils/screenDimension";
import { getMyMarket } from "../../../../store/actions/betPlace/betPlaceActions";
import ButtonValues from "../../../../components/gameDetails/mobile/buttonValues";

const DesktopHeader = () => {
  const dispatch: AppDispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [openExposure, setOpenExposure] = useState(false);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const { getProfile } = useSelector((state: RootState) => state.user.profile);
  const [searchKeyword, setSearchKeyword] = useState("");
  const { searchedMatchList } = useSelector(
    (state: RootState) => state.match.matchList
  );
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
  // const { getMatchListBySearch } = useSelector(
  //   (state: RootState) => state.match.matchList
  // );

  const handleClickOpen = () => {
    if (open === false) {
      dispatch(SearchListReset());
    }
    setSearchKeyword("");
    setOpen(!open);
  };

  const handleClickExposureModalOpen = () => {
    if (parseFloat(getProfile?.userBal?.exposure) === 0) {
      return false;
    }
    if (!openExposure) {
      dispatch(getMyMarket());
    }
    setOpenExposure(!openExposure);
  };

  const handleSearchChange = (e: any) => {
    setSearchKeyword(e.target.value);
    if (e.target.value?.length > 2) {
      debouncedInputValue(e.target.value);
    } else if (e.target.value?.length == 0) {
      setSearchKeyword("");
    }
  };

  const debouncedInputValue = useMemo(() => {
    return debounce((value) => {
      dispatch(
        getMatchListSearch({
          type: "search",
          searchKeyword: value,
        })
      );
    }, 500);
  }, []);
  const handleClick = (e: any, isModal: any,link:any) => {
    if (isModal) {
      e.stopPropagation();
      setShow1(true);
    } else {
      navigate(link || "");
    }
  };
  return (
    <>
      <Row className=" w-100">
        <Col xs={12} className="p-2">
          <div className="float-start">
            <Link to={"/home"}>
              <Navbar.Brand>
                <LogoSection width="auto" />
              </Navbar.Brand>
            </Link>
          </div>
          <ul className="d-flex align-items-center white-text gap-3 list-unstyled mb-0 float-end h-100">
            <li className="d-flex gap-3 align-items-center">
              <div>
                <Collapse in={open} dimension="width">
                  <div id="searchCollapse" className="position-relative">
                    <CustomInput
                      placeholder="All Events"
                      inputClass="headerSearch"
                      value={searchKeyword}
                      onChange={handleSearchChange}
                    />
                    {searchedMatchList && searchKeyword && (
                      <SearchResult
                        setOpen={setOpen}
                        data={searchedMatchList}
                      />
                    )}
                  </div>
                </Collapse>
              </div>
              <span>
                <FaSearchPlus
                  aria-expanded={open}
                  aria-controls="searchCollapse"
                  onClick={handleClickOpen}
                  className="title-24 cursor-pointer"
                />
              </span>
            </li>
            <li
              onClick={() => {
                setShow(true);
              }}
            >
              <b className="cursor-pointer"> Rules</b>
            </li>
            <li>
              <div className="balance-cont">
                <div>
                  Balance:
                  <b>
                    {parseFloat(
                      getProfile?.userBal?.currentBalance || 0
                    ).toFixed(2)}
                  </b>
                </div>
                <div>
                  <span
                    onClick={handleClickExposureModalOpen}
                    className="white-text  cursor-pointer"
                  >
                    Exposure:
                    <b>
                      {parseInt(getProfile?.userBal?.exposure) === 0
                        ? 0
                        : -parseFloat(
                            getProfile?.userBal?.exposure || 0
                          ).toFixed(2)}
                    </b>
                  </span>
                  <ExposureModal
                    show={openExposure}
                    setShow={handleClickExposureModalOpen}
                  />
                </div>
              </div>
            </li>
            <li>
              <Dropdown className="cursor-pointer">
                <Dropdown.Toggle
                  as={CustomDropDown}
                  id="dropdown-custom-components"
                >
                  {getProfile?.userName}
                </Dropdown.Toggle>

                <Dropdown.Menu className="rounded-2 shadow-sm dropdown-menu-nav">
                  {dropdownList
                    ?.filter((item) => item?.type !== "mobile")
                    ?.map((item) => {
                      return (
                        <Dropdown.Item
                          className="title-14 px-2 py-1"
                          onClick={(e) => handleClick(e,item?.isModal,item?.link)
                          }
                          key={item?.id}
                          eventKey={item?.id}
                        >
                          {item?.name}
                        </Dropdown.Item>
                      );
                    })}
                  <Dropdown.Divider />
                  <Dropdown.Item
                    className="title-14 px-2"
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
          <MarqueeHeader />
          {/* <div className="marquee-container nav-marquee text-white">
          <div className="marquee-content title-14">
            <i>
              {" "}
              Use https://sept23.olddata.info/login for view old account between
              March23 to September23
            </i>
          </div>
        </div> */}
        </Col>
      </Row>
      <CustomModal
        customClass="modalFull-90 rule-popup"
        show={show}
        setShow={setShow}
        title={"Rules"}
      >
        {!isMobile ? <Drules /> : <Mobile />}
      </CustomModal>
      <Modal show={show1} onHide={() => setShow1(false)}>
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
            onClick={() => setShow1(false)}
          ></button>
        </Modal.Header>
        <Modal.Body className="p-0 mt-2 mb-2 rounded-0">
          <ButtonValues setShow={setShow1} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DesktopHeader;
