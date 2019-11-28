import React, {Component} from 'react';
import Actions from './component/Actions';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      trsanscriptedValue: '',
      listenSpeech: false,
      openChat: false,
      listViewOpened: false
    }
  }
  render() {
    window.recognising = false;
    const micClick = () => {
      this.setState({
        listenSpeech: true,
        openChat: false,
        listViewOpened: false
      })
    }

    const chatClick = () => {
      this.setState({
        openChat: true,
        listenSpeech: false,
        listViewOpened: false
      })
    }

    const toggleListView = () => {
      this.setState(prevState => ({
        listViewOpened: !prevState.listViewOpened,
      }));
    }

    const {listenSpeech, openChat, listViewOpened} = this.state;
    
    return (
      <div className="chat-widget">
        <div className="chat-widget-top">
          <div className="message">
            {listenSpeech || openChat ? null : <p className="welcome">Good Morning, Abhilash</p>}
            <p className="support">What can i help u with?</p>
          </div>
        </div>
        <div className="chat-widget-bottom">
          <Actions 
            micClick={micClick}
            listenSpeech={listenSpeech}
            chatClick={chatClick}
            openChat={openChat}
            toggleListView={toggleListView}
            listViewOpened={listViewOpened}
          />
        </div>
      </div>
    );
  }
}

export default App;
