import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Bubbles from './screens/BubbleBackground/BubbleBackground';
import MainMenu from './screens/MainMenu/MainMenu';
import RoomScreen from './screens/RoomScreen/RoomScreen';
import './styles/App.css';

function App() {
  // TODO: add react-router for MainMenu / RoomScreen

  return (
    <div className="App">
      <Bubbles />
      <Router basename="/">
        <Switch>
          <Route path="/" exact component={MainMenu} />
          <Route path="/room" exact component={RoomScreen} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
