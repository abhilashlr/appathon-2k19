import React, {useState, useEffect} from 'react';
import FilterOperatorTransformer from '../utils/filter-operator-transformer';
import APP from '../services/client';

function ChatText({transcriptedValue}) {
  const [value, setValue] = useState(transcriptedValue);

  useEffect(() => {
    setValue(transcriptedValue);
  }, [transcriptedValue]);

  const onKeyPress = e => {
    if (e.which === 13) {
      console.log('making network request');
      
      let options = { 
        body: JSON.stringify({text: value}),
        headers: {
          'Content-Type': 'application/json',
        }
      }
      console.log('APP', APP.client);
      
      APP.client.request.post("https://0f2ac3c8.ngrok.io/api/filters", options).then(
        function(data) {
          console.log('----- DEBUGGING: data params -----');
          let response = JSON.parse(data.response);
          console.log(response);
          APP.postMessage(
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
          );
        },
        function(error) {
          console.log('client.request error', error)
        }
      );
    }
  }
  return (
    <textarea 
      className="chat-text"
      value={value} 
      onKeyPress={onKeyPress} 
      onChange={e => setValue(e.target.value)} 
      ref={input => input && input.focus()}
    />
  )
}

export default ChatText;
