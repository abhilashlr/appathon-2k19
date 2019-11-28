import React, {useState, useEffect} from 'react';
import FilterOperatorTransformer from '../utils/filter-operator-transformer';
import APP from '../services/client';

function ChatText({transcription = '', chatText}) {
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
      
      APP.client.request.post("https://0f2ac3c8.ngrok.io/api/filters", options).then(
        function(data) {
          console.log('----- DEBUGGING: data params -----');
          let response = JSON.parse(data.response);
          console.log(response);

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
              // [TODO]: Error case;
          }
        },
        function(error) {
          console.log('client.request error', error)
        }
      );
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
