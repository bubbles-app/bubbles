import { useState } from 'react';
import Modal from 'react-modal';
import './ModalCreateABubble.css';

Modal.setAppElement('#modal-portal');

const MODAL_STYLES = {
  overlay: {
    backgroundColor: 'none'
  },
  content: {
    borderRadius: '10px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '1000',
    color: 'rgba(0, 0, 0, 0.5)'
  }
};

function ModalCreateABubble({ isOpen, closeModal, contentLabel }) {
  const [ nickname, setNickname ] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();

    // TELL SOLACE TO CREATE NEW TOPIC

    // GO TO ROOM SCREEN

    // RESET FORM AND CLOSE MODAL:
    setNickname('');
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={MODAL_STYLES}
      contentLabel={contentLabel}
    >
      <p className="modal-header">nickname</p>
      <form className="modal-form" onSubmit={handleSubmit}>
        <input
          className="modal-name-input"
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          maxLength={15}
        />
        <button className="modal-submit-button">join</button>
      </form>
    </Modal>
  );
}

export default ModalCreateABubble;
