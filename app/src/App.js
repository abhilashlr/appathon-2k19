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
      getListItems: [],
      recentItem: ''
    }
  }
  render() {
    window.recognising = false;
    const micClick = () => {
      this.setState({
        listenSpeech: true,
        openChat: false,
        listViewOpened: false,
        speechEnded: false,
        recentItem: ''
      })
    }

    const chatClick = () => {
      this.setState({
        openChat: true,
        listenSpeech: false,
        listViewOpened: false,
        speechEnded: false,
        recentItem: ''
      })
    }

    const toggleListView = () => {
      this.setState(prevState => ({
        listViewOpened: !prevState.listViewOpened,
        openChat: false,
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

    const clickedonRecent = recentItem => {
      console.log('recentItem', recentItem);
      this.setState({
        recentItem,
        openChat: true,
        listViewOpened: false
      })
    }

    const {listenSpeech, 
      openChat, 
      listViewOpened, 
      speechEnded, 
      getListItems,
      recentItem
    } = this.state;

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
            clickedonRecent={clickedonRecent}
            recentItem={recentItem}
          />
        </div>
      </div>
    );
  }
}

export default App;
