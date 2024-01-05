import { debounce } from "lodash";
import { useMemo, useState } from "react";
import { Col, Collapse, Dropdown, Navbar, Row } from "react-bootstrap";
import { FaSearchPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../../../../components/commonComponent/input";
import LogoSection from "../../../../components/commonComponent/logoSection";
import MarqueeHeader from "../../../../components/commonComponent/marquee";
import { logout } from "../../../../store/actions/authAction";
import { getMatchList } from "../../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../../store/store";
import dropdownList from "../dropdown.json";
import ExposureModal from "../modalExposure";
import SearchResult from "../searchResult";
import CustomDropDown from "./dropdown/customDropdown";
import "./style.scss";
import CustomModal from "../../../../components/commonComponent/modal";
import Drules from "../../../../components/rules/desktop";
import Mobile from "../../../../components/rules/mobile";
import isMobile from "../../../../utils/screenDimension";

const DesktopHeader = () => {
  const [open, setOpen] = useState(false);
  const [openExposure, setOpenExposure] = useState(false);
const [show, setShow] = useState(false);
  const { getProfile } = useSelector((state: RootState) => state.user.profile);
  const { searchedMatchList } = useSelector(
    (state: RootState) => state.match.matchList
  );

  const handleClickOpen = () => {
    setOpen(!open);
  };

  const handleClickExposureModalOpen = () => {
    setOpenExposure(!openExposure);
  };

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const debouncedInputValue = useMemo(() => {
    return debounce((value) => {
      dispatch(
        getMatchList({
          type: "search",
          searchKeyword: value,
        })
      );
    }, 500);
  }, []);

  return (
    <>
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
                <CustomInput
                  placeholder="All Events"
                  onChange={(e: any) => {
                    if (e.target.value?.length > 2) {
                      debouncedInputValue(e.target.value);
                    }
                  }}
                />
                {searchedMatchList && (
                  <SearchResult setOpen={setOpen} data={searchedMatchList} />
                )}
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
          <li onClick={()=>{setShow(true)}}>
            <b> Rules</b>
          </li>
          <li>
            <div className="balance-cont">
              <div>
                Balance:<b>{getProfile?.userBal?.currentBalance}</b>
              </div>
              <div>
                <span
                  onClick={handleClickExposureModalOpen}
                  className="white-text text-decoration-underline cursor-pointer"
                >
                  Exposure:<b>{getProfile?.userBal?.exposure}</b>
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
                {getProfile?.userName}
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
    <CustomModal customClass="modalFull-90 rule-popup"  show={show} setShow={setShow} title={"Rules"}>
    {!isMobile ? <Drules />:
     <Mobile />}
    </CustomModal>
    </>
  );
};

export default DesktopHeader;
