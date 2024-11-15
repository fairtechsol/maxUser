import { Modal } from "react-bootstrap";
import "./style.scss";
import {isMobile} from "../../../utils/screenDimension";
import { FaSync } from "react-icons/fa";
import { getMyMarket } from "../../../store/actions/betPlace/betPlaceActions";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch } from "react-redux";
import Loader from "../loader";
import { useSelector } from "react-redux";

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
          className="bg-primary rounded-0"
          style={{ zIndex: "999" }}
        >
          <Modal.Title
            className={
              isMobile ? "f400 text-white" : "title-12 f-600 text-white"
            }
          >
            {title}{" "}
          
            {title === "My Market" && (
              <FaSync
                onClick={() => dispatch(getMyMarket())}
                style={{ cursor: "pointer" }}
              />
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
        {footer ? <Modal.Footer>{footer}</Modal.Footer> : ""}
      </Modal>
    </>
  );
}

export default CustomModal;
