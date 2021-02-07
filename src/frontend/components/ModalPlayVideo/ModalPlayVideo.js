import { useEffect } from 'react';
import Modal from 'react-modal';
import './ModalPlayVideo.css';
import Paho from 'paho-mqtt';

import solaceConnection from '../../../backend/solace-connection';

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

function ModalPlayVideo({ isOpen, closeModal, contentLabel, queueVideo, roomcode }) {
  useEffect(() => {
    solaceConnection.register(handleNewVideoURL);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      let url = new URL(document.getElementById('youtube-link-input').value);
      queueVideo(url.searchParams.get('v'));

      // publish new video to solace
      let msg = new Paho.Message(JSON.stringify({ messageType: 'newVideoURL', url: url }));
      msg.destinationName = roomcode;
      solaceConnection.send(msg);
    } catch (error) {
      console.log(error);
    }

    closeModal();
  };

  const handleNewVideoURL = (message) => {
    console.log('NEW MSG');
    try {
      const obj = JSON.parse(message.payloadString);
      if (obj.messageType === 'newVideoURL') {
        const url = new URL(obj.url);
        queueVideo(url.searchParams.get('v'));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={MODAL_STYLES} contentLabel={contentLabel}>
      <p className="modal-play-header">youtube video url</p>
      <form className="modal-play-form" onSubmit={handleSubmit}>
        <input id="youtube-link-input" className="modal-play-input" type="text" />
        <button className="modal-play-submit-button">play</button>
      </form>
    </Modal>
  );
}

export default ModalPlayVideo;
