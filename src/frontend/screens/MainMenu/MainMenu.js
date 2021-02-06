import { useState } from 'react';
import ModalCreateABubble from '../../components/ModalCreateABubble/ModalCreateABubble';
import ModalJoinABubble from '../../components/ModalJoinABubble/ModalJoinABubble';
import logo from '../../img/logo.svg';
import './MainMenu.css';

function MainMenu() {
  const [ isJoinModalOpen, setIsJoinModalOpen ] = useState(false);
  const [ isCreateModalOpen, setIsCreateModalOpen ] = useState(false);

  return (
    <div className="MainMenu">
      <div style={{ display: isJoinModalOpen || isCreateModalOpen ? 'none' : 'block' }}>
        <div className="logo-section">
          <h1 className="logo-text">bubbles</h1>
          <img className="logo-pic" src={logo} alt="logo" />
        </div>
        <div className="menu-buttons">
          <p className="menu-button" onClick={() => setIsCreateModalOpen(true)}>
            start a bubble
          </p>
          <p className="menu-button" onClick={() => setIsJoinModalOpen(true)}>
            join a bubble
          </p>
        </div>
      </div>
      <ModalCreateABubble
        isOpen={isCreateModalOpen}
        closeModal={() => setIsCreateModalOpen(false)}
        contentLabel="Create A Bubble"
      />
      <ModalJoinABubble
        isOpen={isJoinModalOpen}
        closeModal={() => setIsJoinModalOpen(false)}
        contentLabel="Join A Bubble"
      />
    </div>
  );
}

export default MainMenu;
