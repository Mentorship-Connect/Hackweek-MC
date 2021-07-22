import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from './components/Context';

//need to wrap provider around app to allow context to work in the rest of the app
ReactDOM.render(
  <Provider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
