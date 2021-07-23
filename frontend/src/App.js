import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//importing components
import Register from './components/Register';
import HelloWorld from './components/HelloWorld';

//importing for userauth
import withContext from './components/Context';

//connects user sign up with context api
const RegisterWithContext = withContext(Register);
const HelloWorldWithContext = withContext(HelloWorld);

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <h1>Mentorship Connect</h1>
    </div>
    <Switch>
      <Route path="/register" component={RegisterWithContext} />
      <Route path="/hello" component={HelloWorldWithContext} />
    </Switch>

    </BrowserRouter>
  );
}

export default App;
