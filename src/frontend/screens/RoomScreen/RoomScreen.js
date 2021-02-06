import './RoomScreen.css';
import Video from '../../components/Video/Video';
import SideBar from '../../components/SideBar/SideBar';

function RoomScreen() {
  const videoOptions = {
    autoplay: true,
    controls: true,
    sources: [{
      src: 'https://www.youtube.com/watch?v=0NDv0Qqq6F0',
      type: 'video/youtube'
    }]
  };
  return (
    <div className="RoomScreen">
      <SideBar />
      <div className="VideoSection">
        <Video { ... videoOptions} /> 
      </div>
    </div>
  );
}

export default RoomScreen;
