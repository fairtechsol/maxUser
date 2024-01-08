import { useState } from "react";
import { Dropdown, Form, Navbar } from "react-bootstrap";
import { FaHome, FaLandmark } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LogoSection from "../../../../components/commonComponent/logoSection";
import { RootState } from "../../../../store/store";
import dropdownList from "../dropdown.json";
import ExposureModal from "../modalExposure";
import SearchBox from "./searchBox";
import "./style.scss";

const MobileHeader = () => {
  const [show, setShow] = useState<any>({
    balance: true,
    exposure: true,
  });
  const [openExposure, setOpenExposure] = useState(false);

  const handleClickExposureModalOpen = () => {
    setOpenExposure(!openExposure);
  };

  const handleCheckboxChange = (e: any, itemId: any) => {
    setShow({
      ...show,
      [itemId]: e.target.checked,
    });
  };

  const navigate = useNavigate();

  const { getProfile,marqueeNotification } = useSelector(
    (state: RootState) => state.user.profile
  );

  return (
    <>
      <div className="float-start d-flex align-items-center gap-2">
        <FaHome className="text-white title-20" />
        <Link to={"/home"}>
          <Navbar.Brand>
            <LogoSection width="auto" height="20px" />
          </Navbar.Brand>
        </Link>
      </div>
      <div className="d-flex flex-column align-items-center white-text list-unstyled float-end h-100">
        {show?.balance && (
          <div className="d-flex gap-1 align-items-center justify-content-end w-100">
            <FaLandmark className="text-white title-18" />
            <b>{getProfile?.userBal?.currentBalance}</b>
          </div>
        )}
        <div className="d-flex gap-1">
          {show?.exposure && (
            <u onClick={handleClickExposureModalOpen}>Exp:{getProfile?.userBal?.exposure}</u>
          )}
          <ExposureModal
            show={openExposure}
            setShow={handleClickExposureModalOpen}
          />
          <div>
            <Dropdown autoClose="outside">
              <Dropdown.Toggle
                id="dropdown-custom-components"
                className="p-0 text-decoration-underline"
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
                      className="title-14 d-flex justify-content-between"
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
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
      <SearchBox />
      <div className="marquee-container text-white">
        <b className="marquee-content title-10">
        {marqueeNotification?.value}
        </b>
      </div>
    </>
  );
};

export default MobileHeader;
