import React, {useState, useEffect} from 'react';
import FilterOperatorTransformer from '../utils/filter-operator-transformer';
import APP from '../services/client';

function ChatText({transcription = '', chatText, getListItems}) {
  const [value, setValue] = useState(transcription);

  useEffect(() => {
    setValue(transcription);
  }, [transcription]);

  const onKeyPress = e => {
    if (e.which === 13) {
      e.preventDefault();
      let options = { 
        body: JSON.stringify({text: value}),
        headers: {
          'Content-Type': 'application/json',
        }
      }

      let postFilter = new Promise((resolve, reject) => {
        resolve(APP.client.request.post("https://0f2ac3c8.ngrok.io/api/filters", options))
      })

      let setInDB = new Promise((resolve, reject) => {
        resolve(APP.client.db.set(`${APP.currentUser.id}`, { "listItems": [...getListItems, {key: value}] }))
      });

      postFilter.then((data) => {
        console.log('----- DEBUGGING: data params -----');
        let response = JSON.parse(data.response);
        return response;
      }).then((response) => {
        return setInDB.then(() => {
          console.log('APP.postMessage');
          return APP.postMessage(
            {
              actor: "navigateToListView",
              entity: response.result.model,
              queryParams: encodeURI(
                JSON.stringify(
                  FilterOperatorTransformer(
                    Object.assign(
                      {},
                      {
                        entity: response.result.model
                      }, 
                      response.result.filters[0]
                    )
                  )
                )
              )
            }
          );;
        })
      }).catch(e => {
        console.log('client.request error', e);
      });
    }
  }
  return (
    <div className="chat-text-window">
      <textarea 
        className={`chat-text ${chatText ? `chat-pull-right`: ``}`}
        value={value} 
        onKeyPress={onKeyPress} 
        onChange={e => setValue(e.target.value)} 
        ref={input => input && input.focus()}
      />
    </div>
  )
}

export default ChatText;
