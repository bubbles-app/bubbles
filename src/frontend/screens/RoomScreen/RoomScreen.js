import './RoomScreen.css';
import Video from '../../components/Video/Video';
import SideBar from '../../components/SideBar/SideBar';
import { Redirect } from 'react-router-dom';

function RoomScreen(props) {
  if (!props.location.state) return <Redirect to="/" />;
  const { roomcode, nickname } = props.location.state;

  let video = new Video();

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
