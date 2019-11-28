import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import APP from './services/client';

window.app.initialized().then(client => {
  client.events.on("app.activated", () => {
    APP.init(client).then(() => {
      ReactDOM.render(<App />, document.getElementById('root'));
    });
  });
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
