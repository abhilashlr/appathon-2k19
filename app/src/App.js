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
        listViewOpened: false,
        speechEnded: false
      })
    }

    const chatClick = () => {
      this.setState({
        openChat: true,
        listenSpeech: false,
        listViewOpened: false,
        speechEnded: false
      })
    }

    const toggleListView = () => {
      this.setState(prevState => ({
        listViewOpened: !prevState.listViewOpened,
        speechEnded: false,
        listenSpeech: false,
      }));
    }

    const toggleListenSpeech = () => {
      this.setState({
        speechEnded: true
      });
    }

    const {listenSpeech, openChat, listViewOpened, speechEnded} = this.state;
    
    return (
      <div className="chat-widget">
        <div className="chat-widget-top">
          <div className="message">
            <p className={`welcome ${listenSpeech || openChat ? 'animated fadeOutUp' : null}`}>Good Morning, Abhilash</p>
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
            toggleListenSpeech={toggleListenSpeech}
            speechEnded={speechEnded}
          />
        </div>
      </div>
    );
  }
}

export default App;
