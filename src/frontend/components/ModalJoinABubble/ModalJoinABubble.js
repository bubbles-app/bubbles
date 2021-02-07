import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Modal from 'react-modal';
import './ModalJoinABubble.css';

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
  const [ roomcode, setRoomCode ] = useState('');
  const [ nickname, setNickname ] = useState('');
  const [ networkErrorEncountered, setNetworkErrorEncountered ] = useState(false);
  const [ redirectToRoomScreen, setRedirectToRoomScreen ] = useState(false);

  if (redirectToRoomScreen) {
    console.log('redirecting to', roomcode);
    return (
      <Redirect
        to={{
          pathname: '/room',
          state: { roomcode, nickname }
        }}
      />
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = { roomcode: roomcode, username: nickname };

      const joinRoomResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/joinroom`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (joinRoomResponse.status === 200) {
        // subscribe to topic
        solaceConnection
          .connectWithPromise()
          .then((response) => {
            console.log('Succesfully connected to Solace Cloud.', response);
            solaceConnection.subscribe(roomcode);

            // redirect to room screen
            setRedirectToRoomScreen(true);
          })
          .catch((error) => {
            console.log('Unable to establish connection with Solace Cloud, see above logs for more details.', error);
            resetForm();
          });
      } else {
        setNetworkErrorEncountered(true);
        resetForm();
      }
    } catch (error) {
      console.log(error);
      setNetworkErrorEncountered(true);
      resetForm();
    }
  };

  const resetForm = () => {
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
          value={roomcode}
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
      <p style={{ marginBottom: 0, color: '#f44', display: networkErrorEncountered ? 'block' : 'none' }}>
        Please enter a valid room code.
      </p>
    </Modal>
  );
}

export default ModalJoinABubble;
