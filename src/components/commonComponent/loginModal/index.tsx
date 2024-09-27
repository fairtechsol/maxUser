import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

const ImageModal = ({ imageUrl, customClass,show,
  setShow, }) => {
  return (
    <Modal  show={show}  onHide={() => setShow(false)} className={` customModal ${customClass}`}  >
          <div className="modal-header bg-primary rounded-0" onClick={() => setShow(false)}>
            <button 
              type="button" 
              className="btn-close btn-close-white" 
              aria-label="Close" 
              
            ></button>
          </div>
          <div className="p-0 modal-body">
            <img 
              src={imageUrl} 
              alt="Modal Content" 
              className="img-fluid"
            />
          </div>
    </Modal>
  );
};

ImageModal.propTypes = {
  imageUrl: PropTypes.string.isRequired
};

export default ImageModal;
