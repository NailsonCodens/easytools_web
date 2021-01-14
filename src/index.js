import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store/index';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register({
  onSuccess: () => console.log('sucess'),
  onUpdate: registration => {
    const sw = registration
		const registrationWaiting = sw.waiting;
    if (registrationWaiting) {
      registrationWaiting.postMessage({ type: 'SKIP_WAITING' });
			console.log('sdsad')
      registrationWaiting.addEventListener('statechange', e => {
				if (e.target.state === 'activated') {
          window.location.reload();
        }
      });
    }
  }
    //store.dispatch({type:"refreshui", payload: registration})
    /*new CustomEvent('swUpdated', { detail: registration })*/
});
