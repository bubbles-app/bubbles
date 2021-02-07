import { useState } from 'react';
import ModalAddToPlaylist from '../ModalAddToPlaylist/ModalAddToPlaylist';
import './SideBar.css';

function SideBar() {
  const [ isPlaylistModalOpen, setIsPlaylistModalOpen ] = useState(false);

  return (
    <div className="SideBar">
      <div className="SideBar-Top">
        <div />
      </div>
      <div className="SideBar-Buttons">
        <button className="playlist-button" onClick={() => setIsPlaylistModalOpen(true)}>playlist</button>
        <button className="exit-button">exit</button>
      </div>
      <ModalAddToPlaylist
        isOpen={isPlaylistModalOpen}
        closeModal={() => setIsPlaylistModalOpen(false)}
        contentLabel="Add to Playlist"
      />
    </div>
  );
}

export default SideBar;
