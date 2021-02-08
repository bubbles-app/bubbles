import { useState } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import BubblesBackground from './screens/BubbleBackground/BubbleBackground';
import MainMenu from './screens/MainMenu/MainMenu';
import RoomScreen from './screens/RoomScreen/RoomScreen';
import ThemeChanger from './components/ThemeChanger/ThemeChanger';
import './styles/App.css';

const DEFAULT_THEME_COLOR = '#413c77';
const DEFAULT_TEHEME_TRANSPARENCY = '77';

function App() {
  const [ themeColor, setThemeColor ] = useState(DEFAULT_THEME_COLOR);
  const [ themeTransparency, setThemeTransparency ] = useState(DEFAULT_TEHEME_TRANSPARENCY);

  return (
    <div className="App">
      <BubblesBackground themeColor={themeColor} themeTransparency={themeTransparency} />
      <ThemeChanger themeColor={themeColor} setThemeColor={setThemeColor} />
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
