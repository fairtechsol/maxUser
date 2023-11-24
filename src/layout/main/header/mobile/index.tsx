import { useState } from "react";
import { Dropdown, Form, Navbar } from "react-bootstrap";
import { FaHome, FaLandmark } from "react-icons/fa";
import { Link } from "react-router-dom";
import LogoSection from "../../../../components/commonComponent/logoSection";
import dropdownList from "../dropdown.json";
import "./style.scss";

const MobileHeader = () => {
  const [show, setShow] = useState<any>({
    balance: true,
    exposure: true,
  });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  const handleCheckboxChange = (e: any, itemId: any) => {
    setShow({
      ...show,
      [itemId]: e.target.checked,
    });
  };
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
            <b>0.00</b>
          </div>
        )}
        <div className="d-flex gap-1">
          {show?.exposure && <u>Exp:0</u>}
          <div>
            <Dropdown autoClose="outside">
              <Dropdown.Toggle
                id="dropdown-custom-components"
                className="p-0 text-decoration-underline"
              >
                Custom toggle
              </Dropdown.Toggle>

              <Dropdown.Menu
                variant="light"
                className="shadow-sm dropdown-menu-nav"
              >
                {dropdownList?.map((item) => {
                  return (
                    <Dropdown.Item
                      className="title-14 d-flex justify-content-between"
                      href={item?.link}
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

      <div className="marquee-container text-white">
        <b className="marquee-content title-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </b>
      </div>
    </>
  );
};

export default MobileHeader;
