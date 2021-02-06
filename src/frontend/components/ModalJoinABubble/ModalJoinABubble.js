import { useState } from 'react';
import Modal from 'react-modal';
import './ModalJoinABubble.css';

Modal.setAppElement('#modal-portal');

const MODAL_STYLES = {
  overlay: {
    backgroundColor: 'none'
  },
  content: {
    borderRadius: '10px',
    padding: '30px',
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

function ModalJoinABubble({ isOpen, closeModal, contentLabel }) {
  const [ roomCode, setRoomCode ] = useState('');
  const [ nickname, setNickname ] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();

    // IF ROOM CODE IS VALID (by checking with backend):
    // SUBSCRIBE TO THAT SOLACE TOPIC (room code)
    // GO TO ROOM SCREEN

    // ELSE
    // DISPLAY ERROR MESSAGE

    // RESET FORM:
    setRoomCode('');
    setNickname('');
  };

  return (
    <Modal
      isOpen={isOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={MODAL_STYLES}
      contentLabel={contentLabel}
    >
      <form className="modal-join-form" onSubmit={handleSubmit}>
        <p className="modal-join-header">bubble code</p>
        <input
          className="modal-join-code-input"
          type="text"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
        />
        <p className="modal-join-header">nickname</p>
        <input
          className="modal-join-name-input"
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          maxLength={15}
        />
        <button className="modal-join-submit-button">join</button>
      </form>
    </Modal>
  );
}

export default ModalJoinABubble;
