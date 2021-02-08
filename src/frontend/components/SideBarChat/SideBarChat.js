import { useState, useEffect, useRef } from 'react';
import './SideBarChat.css';
import Paho from 'paho-mqtt';

import solaceConnection from '../../../backend/solace-connection';

function SideBarChat({ roomcode, username }) {
  const [ message, setMessage ] = useState('');
  const [ messages, setMessages ] = useState([]);
  const anchor = useRef();

  useEffect(() => {
    solaceConnection.register(handleNewTextMessage);
  }, []);

  const handleNewTextMessage = (message) => {
    try {
      const obj = JSON.parse(message.payloadString);
      if (obj.messageType === 'newTextMessage') {
        const newMessage = { username: obj.username, text: obj.text };

        setMessages((messages) => [ ...messages, newMessage ]);
      }
    } catch (error) {
      console.log(error);
    }
    scrollToCurrentMessage();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message === '') return;

    let msg = new Paho.Message(JSON.stringify({ messageType: 'newTextMessage', username: username, text: message }));
    msg.destinationName = roomcode;
    solaceConnection.send(msg);

    // reset form
    setMessage('');
  };

  const scrollToCurrentMessage = () => {
    anchor.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="SideBarChat">
      <div className="SideBarChat-Items">
        {messages.map((message, i) => {
          const user = message.username;
          const text = message.text;
          return (
            <p className="SideBarChat-Item" key={i}>
              {user}: {text}
            </p>
          );
        })}
        <div ref={anchor} className="SideBarChat-anchor" />
      </div>
      <form className="SideBarChat-Form" onSubmit={handleSubmit}>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      </form>
    </div>
  );
}

export default SideBarChat;
