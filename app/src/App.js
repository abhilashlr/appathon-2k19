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
      listViewOpened: false,
      getListItems: []
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

    const pushListItems = listItems => {
      this.setState({
        getListItems: listItems
      })
    }

    const {listenSpeech, openChat, listViewOpened, speechEnded, getListItems} = this.state;
    
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
            pushListItems={pushListItems}
            getListItems={getListItems}
          />
        </div>
      </div>
    );
  }
}

export default App;
