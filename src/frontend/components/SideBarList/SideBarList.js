import { useState } from 'react';
import './SideBarList.css';
import SideBarLabel from '../SideBarLabel/SideBarLabel';

function SideBarList({ list }) {
  const [ displayList, setDisplayList ] = useState(true);
  return (
    <div className="SideBarList">
      <SideBarLabel className="SideBarList-Toggle" label="members" onClick={() => setDisplayList(!displayList)} />
      <div style={{ display: displayList ? 'block' : 'none' }} className="SideBarList-Items">
        {list.map((item, i) => <p key={i}>{item}</p>)}
      </div>
    </div>
  );
}

export default SideBarList;
