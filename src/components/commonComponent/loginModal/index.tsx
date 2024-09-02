import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';

const ImageModal = ({ imageUrl, customClass,show,
  setShow, }) => {
  return (
    <div className=''>
    <Modal  show={show}  onHide={() => setShow(false)} className={`customModal ${customClass}`}  >
          <div className="modal-header bg-primary" onClick={() => setShow(false)}>
            <button 
              type="button" 
              className="btn-close text-white " 
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
    </div>
  );
};

ImageModal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImageModal;
