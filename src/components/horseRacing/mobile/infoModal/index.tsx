import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const HorseModal = ({ show, handleClose, horseData }:any) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="horse-detail">
        <span>{horseData.info1}</span>
        <span>{horseData.info2}</span>
      </Modal.Body>
    </Modal>
  );
};

export default HorseModal;
