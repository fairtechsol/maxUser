import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { isMobile } from "../../../utils/screenDimension";

const ImageModal = ({ customClass, show, setShow }) => {
  const { bannerImage } = useSelector((state: RootState) => state.user.profile);

  return isMobile ? (
    show && (
      <div
        className={`customModal-overlay ${
          isMobile ? "fullscreen-modal" : customClass
        }`}
      >
        <div
          className="w-100 d-flex  justify-content-end bg-primary rounded-0 "
          onClick={() => setShow(false)}
        >
          <button
            type="button"
            className="btn-close btn-close-white"
            aria-label="Close"
          ></button>
        </div>
        <div
          className="p-0 modal-body overflow-auto"
          style={{ maxHeight: "90vh", width: "100%" }}
        >
          <img
            src={"data:image/png;base64," + bannerImage?.value}
            alt="Modal Content"
            className="img-fluid"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
    )
  ) : (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      className={` customModal ${customClass}`}
    >
      <div
        className="modal-header bg-primary rounded-0"
        onClick={() => setShow(false)}
      >
        <button
          type="button"
          className="btn-close btn-close-white"
          aria-label="Close"
        ></button>
      </div>
      <div
        className="p-0 modal-body overflow-auto"
        style={{ maxHeight: "90vh" }}
      >
        <img
          src={"data:image/png;base64," + bannerImage?.value}
          alt="Modal Content"
          className="img-fluid"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </Modal>
  );
};

ImageModal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default ImageModal;
