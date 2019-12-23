import React from 'react';
import Routes from './routes/index';
import { Provider } from 'react-redux';
import store from './store/index';

import 'react-toastify/dist/ReactToastify.css';

import 'bulma/css/bulma.css'
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
