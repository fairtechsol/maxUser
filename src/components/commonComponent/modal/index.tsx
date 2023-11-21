import { Modal } from "react-bootstrap";
import "./style.scss";
function CustomModal({
  show,
  setShow,
  customClass,
  title,
  children,
  footer,
  ...props
}: any) {
  return (
    <>
      <Modal
        {...props}
        show={show}
        onHide={() => setShow(false)}
        className={`customModal ${customClass}`}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        {footer ? <Modal.Footer>{footer}</Modal.Footer> : ""}
      </Modal>
    </>
  );
}

export default CustomModal;
