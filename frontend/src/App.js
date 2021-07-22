import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//importing components
import UserSignUp from './components/UserSignUp';
import HelloWorld from './components/HelloWorld';
import Header from './components/Header';

//importing for userauth
import withContext from './components/Context';

//connects user sign up with context api
const UserSignUpWithContext = withContext(UserSignUp);
const HelloWorldWithContext = withContext(HelloWorld);
const HeaderWithContext = withContext(Header);

//<h1>Mentorship Connect</h1>

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <HeaderWithContext />  
    </div>
    <Switch>
      <Route path="/signup" component={UserSignUpWithContext} />
      <Route path="/hello" component={HelloWorldWithContext} />
    </Switch>

    </BrowserRouter>
  );
}

export default App;
