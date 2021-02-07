import { useState, useEffect } from 'react';
import ModalAddToPlaylist from '../ModalAddToPlaylist/ModalAddToPlaylist';
import SideBarLabel from '../SideBarLabel/SideBarLabel';
import SideBarList from '../SideBarList/SideBarList';
import './SideBar.css';

import solaceConnection from '../../../backend/solace-connection';

function SideBar({ roomcode }) {
  const [ isPlaylistModalOpen, setIsPlaylistModalOpen ] = useState(false);
  const [ roomMembers, setRoomMembers ] = useState([]);

  useEffect(() => {
    // register the publish listener
    solaceConnection.register(handleNewUser);

    // get initial list of people in the room
    fetch('http://localhost:9000/getUsers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ roomcode })
    })
      .then((response) => response.json())
      .then((data) => setRoomMembers(data.users))
      .catch((err) => console.log(err));
  }, []);

  const handleNewUser = (message) => {
    try {
      const obj = JSON.parse(message.payloadString);
      if (obj.messageType === 'userJoined') {
        setRoomMembers([ ...roomMembers, obj.username ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="SideBar">
      <div className="SideBar-Top">
        <SideBarLabel label={roomcode} className="RoomCodeLabel" />
        <SideBarList list={roomMembers} roomcode={roomcode} />
      </div>
      <div className="SideBar-Buttons">
        <button className="playlist-button" onClick={() => setIsPlaylistModalOpen(true)}>
          playlist
        </button>
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
