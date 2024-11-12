import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";

const ImageModal = ({ customClass, show, setShow }) => {
  const { bannerImage } = useSelector((state: RootState) => state.user.profile);

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      className={`modalLogin-root ${customClass}`}
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
