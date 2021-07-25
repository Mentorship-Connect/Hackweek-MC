import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//need to wrap provider around app to allow context to work in the rest of the app
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
