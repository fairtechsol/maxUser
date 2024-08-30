import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';

const ImageModal = ({ imageUrl, onClose }) => {
  return (
    <Modal className="modal show d-block mt-5"  >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-primary">
            <button 
              type="button" 
              className="btn-close bg-white" 
              aria-label="Close" 
              onClick={onClose}
            ></button>
          </div>
          <div className="p-0 modal-body">
            <img 
              src={imageUrl} 
              alt="Modal Content" 
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

ImageModal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImageModal;
