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
        <Modal.Header closeButton className="bg-primary">
          <Modal.Title className="title-12 f-600 text-white">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">{children}</Modal.Body>
        {footer ? <Modal.Footer>{footer}</Modal.Footer> : ""}
      </Modal>
    </>
  );
}

export default CustomModal;
