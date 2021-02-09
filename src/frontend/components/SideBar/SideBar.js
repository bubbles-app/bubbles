import { useState, useEffect } from 'react';
import ModalPlayVideo from '../ModalPlayVideo/ModalPlayVideo';
import SideBarLabel from '../SideBarLabel/SideBarLabel';
import SideBarList from '../SideBarList/SideBarList';
import SideBarChat from '../SideBarChat/SideBarChat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import './SideBar.css';

import solaceConnection from '../../../backend/solace-connection';

function SideBar({ roomcode, username, queueVideo }) {
  const [ isPlayModalOpen, setIsPlayModalOpen ] = useState(false);
  const [ roomMembers, setRoomMembers ] = useState([]);

  useEffect(() => {
    // register the publish listener
    solaceConnection.register(handleNewUser);

    // get initial list of people in the room
    fetch(`${process.env.REACT_APP_BACKEND_URL}/getUsers`, {
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
        setRoomMembers((roomMembers) => {
          return [ ...roomMembers, obj.username ];
        });
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
        <SideBarChat roomcode={roomcode} username={username} />
      </div>
      <div className="SideBar-Buttons">
        <button className="play-button" onClick={() => setIsPlayModalOpen(true)}>
          <FontAwesomeIcon icon={faPlayCircle} style={{ marginRight: '10px' }} />
          play
        </button>
        {/* <button className="exit-button">
          <FontAwesomeIcon icon={faDoorOpen} style={{ marginRight: '10px' }} />
          exit
        </button> */}
      </div>
      <ModalPlayVideo
        isOpen={isPlayModalOpen}
        closeModal={() => setIsPlayModalOpen(false)}
        contentLabel="Play Video"
        queueVideo={queueVideo}
        roomcode={roomcode}
      />
    </div>
  );
}

export default SideBar;
