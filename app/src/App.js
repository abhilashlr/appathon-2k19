import React, {Component} from 'react';
import ListItem from './component/ListItem';
import Microphone from './component/Microphone';
import ChatText from './component/ChatText';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      trsanscriptedValue: ''
    }
  }
  render() {
    window.recognising = false;
    const setTranscript = transcriptedValue => {
      this.setState({
        transcriptedValue
      });
    }
    const {transcriptedValue} = this.state;
    return (
      <div className="chat-widget">
        <div className="chat-widget-top">
          <Microphone transcript={setTranscript} />
        </div>
        <div className="chat-widget-bottom">
          <ListItem />
          <ChatText transcriptedValue={transcriptedValue} />
        </div>
      </div>
    );
  }
}

export default App;
