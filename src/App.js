import React from 'react';
import './App.css';

function App() {
  return (
    <div className="chat-widget">
      <div className="chat-widget-top">
        <div className="top-items">Freddy the robot</div>
        <div className="top-items">Kamal the dirty</div>
        <div className="top-items">Monday syed</div>
      </div>
      <div className="chat-widget-bottom">
        <div className="chat-text" contentEditable suppressContentEditableWarning>Hello World</div>
        <div className="microphone-container">
          <div className="microphone">
            <img alt="Microphone" src="https://img.icons8.com/ios-glyphs/30/000000/microphone.png"></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
