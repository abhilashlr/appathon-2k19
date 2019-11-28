import React, {Component} from 'react';
import ChatText from './ChatText';

class Microphone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recognising: true,
      transcription: '',
      logError: '',
      speechEnded: false
    }
  }

  componentDidMount() {
    var recognizer;

    window.SpeechRecognition = window.SpeechRecognition       ||
                                 window.webkitSpeechRecognition ||
                                 null;

    if (window.SpeechRecognition === null) {
      // not supported
    } else {
      recognizer = new window.SpeechRecognition();
      this.setState({
        recognizer
      })
      // Recogniser doesn't stop listening even if the user pauses
      recognizer.continuous = true;
  
      // Start recognising
      recognizer.onresult = event => {
        this.setState({
          transcription: '',
        });
  
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            this.setState({
              transcription: event.results[i][0].transcript,
              speechEnded: true
            });
            
            recognizer.stop();
            
            // + ' (Confidence: ' + event.results[i][0].confidence + ')'
          } else {
            this.setState(prevState => ({
              transcription: prevState.transcription + event.results[i][0].transcript
            }));
          }
        }
      };
  
      // Listen for errors
      recognizer.onerror = event => {
        this.setState(prevState => ({
          logError: 'Recognition error: ' + event.message + '<br />' + prevState.logError
        }));
      };
    }

    recognizer.start();

    // stop it automatically after 5s
    // setTimeout(() => {
    //   this.setState({
    //     recognising: false
    //   }, () => {
        
    //   });
    //   // stopListening should happen only when speechEnded is true
    //   // this.props.stopListening();
    // }, 5000);

  }

  // componentDidUpdate(prevProps, prevState) {
  //   // console.log('this.state', this.state);
  //   // console.log('prevState', prevState);
  //   if(prevState.recognising && !this.state.recognising) {
  //     if (this.state.speechEnded && !prevState.speechEnded) {
  //       // console.log('stop recognising in if loop');
  //       this.props.stopListening()
  //     } 
  //     // else if((!this.state.recognising && prevState.recognising) && !this.state.speechEnded && !prevState.speechEnded) {
  //     //   // not speoken - close the text and shut the mic
  //     //   // console.log('stop recognising in else loop');
  //     //   this.state.recognizer.stop();
  //     //   this.props.stopListening()
  //     // }
  //   }
  // }

  render () {
    const {transcription} = this.state;

    return (
      <ChatText transcription={transcription} />
    )
  }
}

export default Microphone;
