import { useState } from 'react';
import Modal from 'react-modal';
import { Redirect } from 'react-router-dom';
import './ModalCreateABubble.css';

import solaceConnection from '../../../backend/solace-connection';

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
  const [ newRoomCode, setNewRoomCode ] = useState('');
  const [ networkErrorEncountered, setNetworkErrorEncountered ] = useState(false);
  const [ redirectToRoomScreen, setRedirectToRoomScreen ] = useState(false);

  if (redirectToRoomScreen) {
    console.log('redirecting to', newRoomCode);
    return (
      <Redirect
        to={{
          pathname: '/room',
          state: { roomcode: newRoomCode, nickname: nickname }
        }}
      />
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nickname !== '') {
      // CREATE ROOM AND THEN JOIN THAT ROOM

      const roomCodeObject = await fetch('http://localhost:9000/createroom', { method: 'POST' }).then((response) =>
        response.json()
      );

      const roomcode = roomCodeObject.message;
      const payload = { roomcode: roomcode, username: nickname };
      setNewRoomCode(roomcode);

      const joinRoomResponse = await fetch('http://localhost:9000/joinroom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (joinRoomResponse.status === 200) {
        solaceConnection
          .connectWithPromise()
          .then((response) => {
            console.log('Succesfully connected to Solace Cloud.', response);
            // subscribe to topic
            solaceConnection.subscribe(roomcode);
            console.log(solaceConnection);

            // redirect
            setRedirectToRoomScreen(true);
          })
          .catch((error) => {
            console.log('Unable to establish connection with Solace Cloud, see above logs for more details.', error);
          });
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
