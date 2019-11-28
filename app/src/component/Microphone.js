import React, {Component} from 'react';

class Microphone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      micListening: false,
      recognising: false,
      micWaitExceeds: false,
      stopMic: false,
      transcription: '',
      logError: ''
    }
  }
  componentDidUpdate(prevProps, prevState) {
    // Typical usage (don't forget to compare props):
    // recognising
    // micWaitExceeds
    // console.log("this", this.state);
    // console.log("prevState", prevState);
    const {micWaitExceeds, recognising, micListening} = this.state;
    const {prevMicWaitExceeds, prevRecognising, prevMicListening} = prevState;
    const micWaitExists = (prevMicWaitExceeds !== micWaitExceeds) && micWaitExceeds;
    const noRecognising = (recognising !== prevRecognising) && !recognising;
    const micListeningCheck = (prevMicListening !== micListening) && micListening;

    if(micWaitExists && noRecognising && micListeningCheck) {
      this.setState({
        stopMic: true,
        micListening: false
      })
    }
  }
  render () {
    const {transcription, logError, recognising, micWaitExceeds, stopMic, micListening} = this.state;
    const {transcript} = this.props;
    var recognizer;

    window.SpeechRecognition = window.SpeechRecognition       ||
                                 window.webkitSpeechRecognition ||
                                 null;

    if (window.SpeechRecognition === null) {
      // not supported
    } else {
      recognizer = new window.SpeechRecognition();
  
      // Recogniser doesn't stop listening even if the user pauses
      recognizer.continuous = true;
  
      // Start recognising
      recognizer.onresult = event => {
        this.setState({
          recognising: true,
          transcription: '',
        });
  
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            this.setState({
              transcription: event.results[i][0].transcript,
              micWaitExceeds: false
            });
            transcript(event.results[i][0].transcript);
            // console.log('recognizer in isFinal stopped', recognizer);
            // recognizer.stop();
            
            // + ' (Confidence: ' + event.results[i][0].confidence + ')'
            // transcription.textContent = event.results[i][0].transcript + ' (Confidence: ' + event.results[i][0].confidence + ')';
          } else {
            this.setState(prevState => ({
              transcription: prevState.transcription + event.results[i][0].transcript
            }));
            // transcription.textContent += event.results[i][0].transcript;
          }
        }
      };
  
      // Listen for errors
      recognizer.onerror = event => {
        this.setState(prevState => ({
          logError: 'Recognition error: ' + event.message + '<br />' + prevState.logError
        }));
        // log.innerHTML = 'Recognition error: ' + event.message + '<br />' + log.innerHTML;
      };
    }

    const listenForSpeech = () => {
      recognizer.interimResults = false;

      try {
        this.setState({
          micListening: true
        });
        recognizer.start();
        transcript('');
        setTimeout(() => {
          this.setState({
            micWaitExceeds: true
          });
        }, 5000);
        this.setState(prevState => ({
          logError: 'Recognition started' + '<br />' + prevState.logError
        }));
        // log.innerHTML = 'Recognition started' + '<br />' + log.innerHTML;
      } catch(ex) {
        this.setState(prevState => ({
          logError: 'Recognition error: ' + ex.message + '<br />' + prevState.logError
        }));
        // log.innerHTML = 'Recognition error: ' + ex.message + '<br />' + log.innerHTML;
      }
    }
    // console.log('transcription ->', transcription);
    // console.log('logError -> ', logError);
    // console.log('recognising', recognising);

    if(stopMic && !micListening) {
      // check this properly and stop while after speaking - coming multiple times
      // working properly when u don't speak
      // console.log('recognizer in stopmic coz u havent spoke anything', recognizer);
      
      recognizer.stop();
    }

    return (
      <div className="microphone-container">
        <button type="button" className="microphone-icon" onClick={listenForSpeech}>
          <img alt="Microphone" src="https://img.icons8.com/ios-glyphs/30/000000/microphone.png"></img>
        </button>
      </div>
    )
  }
}

export default Microphone;
