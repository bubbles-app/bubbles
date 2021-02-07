import Modal from 'react-modal';
import './ModalPlayVideo.css';

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

function ModalPlayVideo({ isOpen, closeModal, contentLabel, queueVideo }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      let url = new URL(document.getElementById("youtube-link-input").value);
      queueVideo(url.searchParams.get('v'));
    } catch (error) {
      console.log(error);
    }
    
    // TODO: publish new video to solace
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={MODAL_STYLES}
      contentLabel={contentLabel}
    >
      <p className="modal-play-header">youtube video url</p>
      <form className="modal-play-form" onSubmit={handleSubmit}>
        <input
          id="youtube-link-input"
          className="modal-play-input"
          type="text"
        />
        <button className="modal-play-submit-button">play</button>
      </form>
    </Modal>
  );
}

export default ModalPlayVideo;
