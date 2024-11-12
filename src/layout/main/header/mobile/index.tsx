import { useEffect, useState } from "react";
import { Dropdown, Form, Navbar } from "react-bootstrap";
import { FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LogoSection from "../../../../components/commonComponent/logoSection";
import { logout } from "../../../../store/actions/authAction";
import { getMyMarket } from "../../../../store/actions/betPlace/betPlaceActions";
import { AppDispatch, RootState } from "../../../../store/store";
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
  const [openExposure, setOpenExposure] = useState(false);
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

  console.log(show);

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
            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-custom-components"
                className="title-14"
                as={CustomDropDown}
              >
                <span className="title-14">{getProfile?.userName}</span>
              </Dropdown.Toggle>

              <Dropdown.Menu
                variant="light"
                className="shadow-sm dropdown-menu-nav"
              >
                {dropdownList?.map((item) => {
                  return (
                    <Dropdown.Item
                      className="title-16px d-flex justify-content-between"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (item?.link) {
                          navigate(item.link);
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
                          checked={!!show[item.id]}
                          // className="customCheckbox"
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
        <b className="marquee-content title-10">{marqueeNotification?.value}</b>
      </div>
    </>
  );
};

export default MobileHeader;
