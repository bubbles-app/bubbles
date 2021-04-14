import { Redirect } from 'react-router-dom';
import Video from '../../components/Video/Video';
import SideBar from '../../components/SideBar/SideBar';
import { useMediaQuery } from 'react-responsive';

import './RoomScreen.css';

function RoomScreen(props) {
  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 700px)'
  });

  if (!props.location.state) return <Redirect to="/" />;
  const { roomcode, nickname } = props.location.state;

  // responsive styling
  let roomScreenStyle = {};
  let videoSectionStyle = { margin: '20px' };
  if (isTabletOrMobileDevice) {
    roomScreenStyle = { flexDirection: 'column-reverse', justifyContent: 'flex-end' };
    videoSectionStyle = { margin: '0px', height: '40vh' };
  }

  const video = new Video({ roomcode: roomcode });
  return (
    <div className="RoomScreen" style={roomScreenStyle}>
      <SideBar roomcode={roomcode} queueVideo={video.playNewVideo} username={nickname} />
      <div className="VideoSection" style={videoSectionStyle}>
        {video.render()}
      </div>
    </div>
  );
}

export default RoomScreen;
