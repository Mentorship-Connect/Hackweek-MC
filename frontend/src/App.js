import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core'

//importing components
import Register from './components/Register';
import Home from './components/Home';
import Header from './components/Header';
import HelloWorld from './components/HelloWorld';
import { AuthContextProvider } from './context/AuthContext';
import Login from './components/Login';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Container>
          <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path ='/helloworld' component={HelloWorld} />
          </Switch>
        </Container>
      </Router>
    </AuthContextProvider>
  )
}

export default App;
