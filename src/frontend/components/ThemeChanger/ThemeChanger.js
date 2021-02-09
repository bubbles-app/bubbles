import { useState } from 'react';
import { ChromePicker } from 'react-color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette } from '@fortawesome/free-solid-svg-icons';
import './ThemeChanger.css';

function ThemeChanger({ themeColor, setThemeColor }) {
  const [ showColorPicker, setShowColorPicker ] = useState(false);
  const [ colorValue, setColorValue ] = useState(themeColor);

  const handleColorChange = (color) => {
    const hex = color.hex;
    setColorValue(hex);
    setThemeColor(hex);
  };

  return (
    <div className="ThemeChanger">
      <FontAwesomeIcon
        icon={faPalette}
        className="ThemeChanger-Icon"
        onClick={() => setShowColorPicker(!showColorPicker)}
      />
      {showColorPicker ? (
        <div className="ThemeChanger-Popover">
          <div className="ThemeChanger-Cover" onClick={() => setShowColorPicker(false)} />
          <ChromePicker
            className="ThemeChanger-ColorPicker"
            onChange={handleColorChange}
            color={colorValue}
            disableAlpha
          />
        </div>
      ) : null}
    </div>
  );
}

export default ThemeChanger;
