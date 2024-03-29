import React, { useState } from 'react';
import Routes from './routes/index';
import { Provider } from 'react-redux';
import store from './store/index';

import 'react-toastify/dist/ReactToastify.css';
import 'bulma/css/bulma.css'
import 'bulma-checkradio/dist/css/bulma-checkradio.min.css'
import 'bulma-accordion/dist/css/bulma-accordion.min.css'
import './App.css';
function App() {
  return (
    <Provider store={store}>
      <div className="container-fluid">
        <Routes/>
      </div>
    </Provider>
  );
}

export default App;
