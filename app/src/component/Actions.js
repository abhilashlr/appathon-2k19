import React from 'react';
import menu from '../svgs/bars-regular.svg';
import microphone from '../svgs/microphone-regular.svg';
import keyboard from '../svgs/keyboard-regular.svg';
import Microphone from './Microphone';
import ChatText from './ChatText';
import ListItem from './ListItem';

export default function Actions({
  micClick, 
  listenSpeech, 
  chatClick,
  openChat,
  toggleListView,
  listViewOpened,
  toggleListenSpeech,
  speechEnded,
  pushListItems,
  getListItems,
  clickedonRecent,
  recentItem
}) {
  const micSelected = !listViewOpened && !openChat;
  return (
    <div className="assistant-icons">
      <div className="assistant-icons-wrap">
        <button type="button" className={`wrapper ${listViewOpened ? `selected` : ``}`} onClick={toggleListView}><img src={menu} /></button>
        <button type="button" className={`wrapper ${micSelected ? `selected` : ``}`} onClick={micClick}><img src={microphone} /></button>{listenSpeech && !speechEnded ? <div class="ripple"></div> : null}
        <button type="button" className={`wrapper ${openChat ? `selected` : ``}`}onClick={chatClick}><img src={keyboard} /></button>
        {listenSpeech || speechEnded ? 
            <Microphone toggleListenSpeech={toggleListenSpeech} /> : null
        }
        {openChat ? 
        <ChatText 
          transcription={recentItem || ''} 
          chatText 
          getListItems={getListItems} /> : null}
      </div>
      <ListItem 
        listViewOpened={listViewOpened}
        pushListItems={pushListItems}
        getListItems={getListItems}
        clickedonRecent={clickedonRecent} />
    </div>
  )
}
