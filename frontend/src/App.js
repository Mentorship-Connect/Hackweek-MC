import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//importing components
import Register from './components/Register';
import HelloWorld from './components/HelloWorld';
import Header from './components/Header';
import { AuthContextProvider } from './context/AuthContext';
import Login from './components/Login';

//<h1>Mentorship Connect</h1>

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path='/' component={HelloWorld} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
          </Switch>
        </div>
      </Router>
    </AuthContextProvider>
  )
}

export default App;
