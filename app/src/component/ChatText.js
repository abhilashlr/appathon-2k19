import React, {useState, useEffect} from 'react';

function ChatText({transcriptedValue}) {
  const [value, setValue] = useState(transcriptedValue);

  useEffect(() => {
    setValue(transcriptedValue);
  }, [transcriptedValue]);

  const onKeyPress = e => {
    if (e.which === 13) {
      console.log('making network request');
      
      let fetchData = { 
        method: 'POST', 
        body: {text: value},
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }
      fetch("https://f0a67f8f.ngrok.io", fetchData) // Call the fetch function passing the url of the API as a parameter
      .then((resp) => {
        console.log('response', resp.json());
        // (resp) => resp.json()
          // Your code for handling the data you get from the API
      })
      .catch(function(e) {
        console.log('erroe in fetch', e);
          // This is where you run code if the server returns any errors
      });
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

