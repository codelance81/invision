import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';


const ConfirmationModal = (props) => {
  const {
    isModalShow,
    symbol,
    handleCloseModal,
    handleSaveChanges,
    alreadyExist,
  } = props;

  return (
    <Modal show={isModalShow} onHide={() => handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Invision</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Symbol
        {symbol}
        already exists with price
        {alreadyExist.price}
        , do you want to update?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  isModalShow: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handleSaveChanges: PropTypes.func.isRequired,
  alreadyExist: PropTypes.instanceOf(Object).isRequired,
  symbol: PropTypes.string.isRequired,
};

export default ConfirmationModal;
