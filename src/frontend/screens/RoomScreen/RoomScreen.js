import { Redirect } from 'react-router-dom';
import Video from '../../components/Video/Video';
import SideBar from '../../components/SideBar/SideBar';

import './RoomScreen.css';

function RoomScreen(props) {
  if (!props.location.state) return <Redirect to="/" />;
  const { roomcode, nickname } = props.location.state;

  let video = new Video({roomcode: roomcode});

  return (
    <div className="RoomScreen">
      <SideBar roomcode={roomcode} queueVideo={video.playNewVideo}/>
      <div className="VideoSection">
        {video.render()}
      </div>
    </div>
  );
}

export default RoomScreen;
