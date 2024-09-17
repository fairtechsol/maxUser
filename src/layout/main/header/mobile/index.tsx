import { useState } from "react";
import { Dropdown, Form, Navbar } from "react-bootstrap";
import { FaHome, FaLandmark } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LogoSection from "../../../../components/commonComponent/logoSection";
import { AppDispatch, RootState } from "../../../../store/store";
import dropdownList from "../dropdown.json";
import ExposureModal from "../modalExposure";
import SearchBox from "./searchBox";
import "./style.scss";
import { getMyMarket } from "../../../../store/actions/betPlace/betPlaceActions";
import { useDispatch } from "react-redux";
import { logout } from "../../../../store/actions/authAction";

const MobileHeader = () => {
  const dispatch: AppDispatch = useDispatch();
  const [show, setShow] = useState<any>({
    balance: true,
    exposure: true,
  });
  const [openExposure, setOpenExposure] = useState(false);
  const handleClickExposureModalOpen = () => {
    if (!openExposure) {
      dispatch(getMyMarket());
    }
    setOpenExposure(!openExposure);
  };

  const handleCheckboxChange = (e: any, itemId: any) => {
    setShow({
      ...show,
      [itemId]: e.target.checked,
    });
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
        {show?.balance && (
          <div className="d-flex gap-1 align-items-center justify-content-end w-100 title-12 mt-1">
          Balance:
            <b>{parseFloat(getProfile?.userBal?.currentBalance).toFixed(2)}</b>
          </div>
        )}
        <div className="d-flex gap-1 title-12">
          {show?.exposure && (
            <span onClick={handleClickExposureModalOpen}>
              Exp:{parseFloat(getProfile?.userBal?.exposure).toFixed(2)}
            </span>
          )}
          <ExposureModal
            show={openExposure}
            setShow={handleClickExposureModalOpen}
          />
          <div>
            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-custom-components"
                className="p-0 title-14 "
              >
                {getProfile?.userName}
              </Dropdown.Toggle>

              <Dropdown.Menu
                variant="light"
                className="shadow-sm dropdown-menu-nav"
              >
                {dropdownList?.map((item) => {
                  return (
                    <Dropdown.Item
                      className="title-16px d-flex justify-content-between"
                      onClick={() => {
                        navigate(item.link || "");
                      }}
                      key={item?.id}
                      eventKey={item?.id}
                    >
                      {item?.name}
                      {item?.isChecked && (
                        <Form.Check
                          id={item?.id}
                          onChange={(e) => handleCheckboxChange(e, item.id)}
                          checked={show[item?.id]}
                        />
                      )}
                    </Dropdown.Item>
                  );
                })}
                <Dropdown.Item
                  className="title-14 d-flex justify-content-between m-logout"
                  eventKey={"Logout"}
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  Logout
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
