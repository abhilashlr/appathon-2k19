import React from 'react';
import ListItem from './component/ListItem';
import Microphone from './component/Microphone';
import './App.css';

function App() {
  return (
    <div className="chat-widget">
      <div className="chat-widget-top">
        <Microphone />
      </div>
      <div className="chat-widget-bottom">
        <ListItem />
        <div className="chat-text" contentEditable suppressContentEditableWarning>Hello World</div>
      </div>
    </div>
  );
}

export default App;
