import './RoomScreen.css';
import Video from '../../components/Video/Video';
import SideBar from '../../components/SideBar/SideBar';

function RoomScreen() {
  return (
    <div className="RoomScreen">
      <SideBar />
      <div className="VideoSection">
        <Video />
      </div>
    </div>
  );
}

export default RoomScreen;
