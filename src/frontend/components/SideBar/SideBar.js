import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import ModalPlayVideo from '../ModalPlayVideo/ModalPlayVideo';
import SideBarLabel from '../SideBarLabel/SideBarLabel';
import SideBarList from '../SideBarList/SideBarList';
import SideBarChat from '../SideBarChat/SideBarChat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import './SideBar.css';

import solaceConnection from '../../../backend/solace-connection';

function SideBar({ roomcode, username, queueVideo }) {
  const [ isPlayModalOpen, setIsPlayModalOpen ] = useState(false);
  const [ roomMembers, setRoomMembers ] = useState([]);
  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 700px)'
  });

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

    // get video that's already playing
    fetch(`${process.env.REACT_APP_BACKEND_URL}/getcurrentvideo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ roomcode })
    })
      .then((response) => response.json())
      .then((data) => {
        const urlString = data.url;
        const url = new URL(urlString);
        const videoID = url.searchParams.get('v');

        queueVideo(videoID);
      })
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

  // responsive styling
  let sidebarStyle = {};
  if (isTabletOrMobileDevice) {
    sidebarStyle = { width: '100%', margin: '0', marginTop: '10px' };
  }

  let sidebarButtons = (
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
  );

  return (
    <div className="SideBar" style={sidebarStyle}>
      {
        (isTabletOrMobileDevice) ?
        <>
          {sidebarButtons}
          <div className="SideBar-Top">
            <SideBarLabel label={roomcode} className="RoomCodeLabel" />
            <SideBarChat roomcode={roomcode} username={username} />
          </div>
        </>
        :
        <>
          <div className="SideBar-Top">
            <SideBarLabel label={roomcode} className="RoomCodeLabel" />
            <SideBarList list={roomMembers} roomcode={roomcode} />
            <SideBarChat roomcode={roomcode} username={username} />
          </div>
          {sidebarButtons}
        </> 
      }
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
