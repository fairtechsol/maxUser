import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { getBannerImage } from "../../../store/actions/user/userAction";
import { useSelector } from "react-redux";

const ImageModal = ({ imageUrl, customClass, show, setShow }) => {
  const dispatch: AppDispatch = useDispatch();
  const { bannerImage } = useSelector((state: RootState) => state.user.profile);
  useEffect(() => {
    dispatch(getBannerImage());
  }, []);
  return (
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
      <div className="p-0 modal-body">
        <img
          src={"data:image/png;base64,"+bannerImage?.value}
          alt="Modal Content"
          className="img-fluid"
        />
      </div>
    </Modal>
  );
};

ImageModal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default ImageModal;
