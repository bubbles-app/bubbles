import './styles/App.css';
import Bubbles from './screens/BubbleBackground/BubbleBackground';
import MainMenu from './screens/MainMenu/MainMenu';
import RoomScreen from './screens/RoomScreen/RoomScreen';

function App() {
  // TODO: add react-router for MainMenu / RoomScreen

  return (
    <div className="App">
      <Bubbles />
      <MainMenu />
      {/* <RoomScreen /> */}
    </div>
  );
}

export default App;
