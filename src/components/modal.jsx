import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MyModal({ show, handleClose, confirmAction, cancelAction, message }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={cancelAction}>
          No
        </Button>
        <Button variant="primary" onClick={confirmAction}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyModal;
