import React, {useState, useEffect} from 'react';
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
      
      APP.client.request.post("https://26425e78.ngrok.io/api/filters", options).then(
        function(data) {
          let response = JSON.parse(data);
          console.log('client.request data', data.response);
          //handle "data"
          //"data" is a json string with status, headers, and response.
        },
        function(error) {
          console.log('client.request error', error)
          //handle failure
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

