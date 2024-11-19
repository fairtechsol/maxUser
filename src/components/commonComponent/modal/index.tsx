import { Modal } from "react-bootstrap";
import "./style.scss";
import { isMobile } from "../../../utils/screenDimension";
import { FaSync } from "react-icons/fa";
import { getMyMarket } from "../../../store/actions/betPlace/betPlaceActions";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch } from "react-redux";
import Loader from "../loader";
import { useSelector } from "react-redux";
import { useState } from "react";

function CustomModal({
  show,
  setShow,
  customClass,
  title,
  children,
  footer,
  size,
  ...props
}: any) {
  const dispatch: AppDispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.bets);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeModal = () => setShow(false);

  return (
    <>
      <Modal
        {...props}
        show={show}
        size={size}
        onHide={() => setShow(false)}
        className={`customModal ${customClass}`}
      >
        {title === "My Market" ? <></> : loading && <Loader />}
        <Modal.Header
          className="bg-primary rounded-0 sticky-top w-100"
          style={{ zIndex: "999" }}
        >
          <Modal.Title
             className={
              title === "My Market"
                ? "f400 text-white"
                : isMobile
                ? "f400 text-white"
                : "title-12 f-600 text-white w-100 d-flex justify-content-between"
            }
          >
            {title}{" "}
            {title === "My Market" && (
              <FaSync
                onClick={() => dispatch(getMyMarket())}
                style={{ cursor: "pointer", textAlign: "left" }}
              />
            )}
            {title === "Rules" && (
              <div className="rules-langualge">
                {" "}
                <div
                  className={`dropdown ${isOpen ? "show" : ""}`}
                  style={{ position: "relative" }}
                >
                  <button
                    type="button"
                    id="lang-dropdown"
                    aria-expanded={isOpen}
                    className={`dropdown-toggle-1 btn-1 ${
                      isOpen ? "show" : ""
                    }`}
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
            )}
          </Modal.Title>
          <button
            type="button"
            className="btn-close btn-close-white"
            aria-label="Close"
            onClick={() => setShow(false)}
          ></button>
        </Modal.Header>
        <Modal.Body className="p-0 mt-2 rounded-0">{children}</Modal.Body>
        {title === "Rules" && (
          <div className="modal-footer-1">
            <button className="btn btn-danger" onClick={closeModal}>
              Close
            </button>
          </div>
        )}
        {footer ? <Modal.Footer>{footer}</Modal.Footer> : ""}
      </Modal>
    </>
  );
}

export default CustomModal;
