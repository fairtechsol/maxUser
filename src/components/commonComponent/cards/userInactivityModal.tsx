import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

interface InactivityModalInterface {
  show: boolean;
  handleClose: () => void;
}

const InactivityModal = ({ show, handleClose }: InactivityModalInterface) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        dialogClassName="activity-modal"
      >
        <Modal.Body className="text-center">
          <h5>Disconnection due to inactivity</h5>
          <p>
            Are you there? You have been disconnected. Please reload the page or
            start playing again.
          </p>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default InactivityModal;
