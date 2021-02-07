import { useState, useEffect } from 'react';
import ModalPlayVideo from '../ModalPlayVideo/ModalPlayVideo';
import SideBarLabel from '../SideBarLabel/SideBarLabel';
import SideBarList from '../SideBarList/SideBarList';
import './SideBar.css';

function SideBar({ roomcode, queueVideo }) {
  const [ isPlayModalOpen, setIsPlayModalOpen ] = useState(false);
  const [ roomMembers, setRoomMembers ] = useState([]);

  useEffect(() => {
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

  return (
    <div className="SideBar">
      <div className="SideBar-Top">
        <SideBarLabel label={roomcode} className="RoomCodeLabel" />
        <SideBarList list={roomMembers} />
      </div>
      <div className="SideBar-Buttons">
        <button className="play-button" onClick={() => setIsPlayModalOpen(true)}>play</button>
        <button className="exit-button">exit</button>
      </div>
      <ModalPlayVideo
        isOpen={isPlayModalOpen}
        closeModal={() => setIsPlayModalOpen(false)}
        contentLabel="Play Video"
        queueVideo={queueVideo}
      />
    </div>
  );
}

export default SideBar;
