import { useState } from 'react';
import Modal from 'react-modal';
import './ModalCreateABubble.css';

Modal.setAppElement('#modal-portal');

const MODAL_STYLES = {
  overlay: {
    backgroundColor: 'none'
  },
  content: {
    width: '15%',
    minWidth: '200px',
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
  const [ networkErrorEncountered, setNetworkErrorEncountered ] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nickname !== '') {
      // CREATE ROOM AND THEN JOIN THAT ROOM

      const roomCodeObject = await fetch('http://localhost:9000/createroom', { method: 'POST' }).then((response) =>
        response.json()
      );

      const roomcode = roomCodeObject.message;
      const payload = { roomcode: roomcode, username: nickname };

      const joinRoomResponse = await fetch('http://localhost:9000/joinroom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (joinRoomResponse.status === 200) {
        // TODO:
        // subscribe to topic
        // redirect to room screen
      } else {
        setNetworkErrorEncountered(true);
      }
    }

    // RESET FORM AND CLOSE MODAL:
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
      <p className="modal-header">nickname</p>
      <form className="modal-form" onSubmit={handleSubmit}>
        <input
          className="modal-name-input"
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          maxLength={15}
        />
        <button className="modal-submit-button" disabled={nickname === ''}>
          join
        </button>
      </form>
      <p style={{ marginBottom: 0, color: '#f44', display: networkErrorEncountered ? 'block' : 'none' }}>
        Our servers are having some issues at the moment...
      </p>
    </Modal>
  );
}

export default ModalCreateABubble;
