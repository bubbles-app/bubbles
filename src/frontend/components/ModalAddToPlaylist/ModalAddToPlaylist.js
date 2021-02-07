import Modal from 'react-modal';
import './ModalAddToPlaylist.css';

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

function ModalAddToPlaylist({ isOpen, closeModal, contentLabel }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Use regex to get video ID and add to playlist
    try {
      let url = new URL(document.getElementById("youtube-link-input").value);
      return url;
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
      <p className="modal-playlist-header">youtube video url</p>
      <form className="modal-playlist-form" onSubmit={handleSubmit}>
        <input
          id="youtube-link-input"
          className="modal-playlist-input"
          type="text"
        />
        <button className="modal-playlist-submit-button">add</button>
      </form>
    </Modal>
  );
}

export default ModalAddToPlaylist;
