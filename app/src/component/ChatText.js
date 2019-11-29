import React, {useState, useEffect} from 'react';
import FilterOperatorTransformer from '../utils/filter-operator-transformer';
import APP from '../services/client';

function ChatText({transcription = '', chatText, getListItems, fromMic}) {
  const [value, setValue] = useState(transcription);

  useEffect(() => {
    setValue(transcription);
    if(transcription && !fromMic) {
      submitData(transcription);
    }
    
  }, [transcription]);

  const onKeyPress = e => {
    if (e.which === 13) {
      e.preventDefault();
      submitData(value);
    }
  }

  const submitData = text => {
    let options = { 
      body: JSON.stringify({text}),
      headers: {
        'Content-Type': 'application/json',
      }
    }

    let postFilter = new Promise((resolve, reject) => {
      resolve(APP.client.request.post("https://0f2ac3c8.ngrok.io/api/filters", options))
    });

    let setInDB = new Promise((resolve, reject) => {
      resolve(APP.client.db.set(`${APP.currentUser.id}`, { "listItems": [...getListItems || [], {key: value}] }))
    });

    postFilter.then((data) => {
      console.log('----- DEBUGGING: data params -----', data);
      let response = JSON.parse(data.response);
      return response;
    }).then((response) => {
      return setInDB.then(() => {
        switch(response.result.intent) {
          case 'query':
            let transformedQP = FilterOperatorTransformer(
              Object.assign(
                {},
                {
                  entity: response.result.model
                }, 
                response.result.filters[0]
              )
            );
            APP.postMessage(
              {
                actor: "navigateToListView",
                entity: response.result.model,
                queryParams: transformedQP ? encodeURI(
                  JSON.stringify(transformedQP)
                ) : []
              }
            );
            return;
          case 'invoke_modal':
            APP.client.interface.trigger("open", {
              id: response.result.model
            });
            return;
          default:
            console.log('default error switch case');
            // [TODO]: Error case;
        }
      })
    }).catch((error) => {
      console.log('client.request error', error)
    });
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
      <div className="container-arrow">
        <div className="arrow"></div>
      </div>
    </div>
  )
}

export default ChatText;
