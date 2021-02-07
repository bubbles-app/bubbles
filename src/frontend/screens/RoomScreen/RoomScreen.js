import { Redirect } from 'react-router-dom';
import Video from '../../components/Video/Video';
import SideBar from '../../components/SideBar/SideBar';

import './RoomScreen.css';

function RoomScreen(props) {
  if (!props.location.state) return <Redirect to="/" />;
  const { roomcode, nickname } = props.location.state;

  const videoOptions = {
    autoplay: true,
    controls: true,
    sources: [
      {
        src: 'https://www.youtube.com/watch?v=0NDv0Qqq6F0',
        type: 'video/youtube'
      }
    ]
  };
  return (
    <div className="RoomScreen">
      <SideBar roomcode={roomcode} />
      <div className="VideoSection">
        <Video {...videoOptions} />
      </div>
    </div>
  );
}

export default RoomScreen;
