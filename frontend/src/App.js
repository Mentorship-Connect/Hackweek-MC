import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//importing components
import UserSignUp from './components/UserSignUp';

//importing for userauth
import withContext from './components/Context';

//connects user sign up with context api
const UserSignUpWithContext = withContext(UserSignUp);

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <h1>Mentorship Connect</h1>
    </div>
    <Switch>
      <Route path="/signup" component={UserSignUpWithContext} />
    </Switch>

    </BrowserRouter>
  );
}

export default App;
