import React, {Component} from 'react';

class Microphone extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render () {
    return (
      <div className="microphone-container">
        <button type="button" className="microphone-icon">
          <img alt="Microphone" src="https://img.icons8.com/ios-glyphs/30/000000/microphone.png"></img>
        </button>
      </div>
    )
  }
}

export default Microphone;
