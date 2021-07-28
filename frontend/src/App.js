import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core'
import useStyles from './styles';

//importing components
import Register from './components/Register';
import Admin from './components/Admin';
import HelloWorld from './components/HelloWorld';
import { AuthContextProvider } from './context/AuthContext';
import Login from './components/Login';
import Header from './components/Header';
import UserPage from './components/UserPage';
import UpdateUserPage from './components/UpdateUserPage';
import HomePage from './components/HomePage';

function App() {
  const classes = useStyles();
  return (
    <AuthContextProvider>
      <Router>
      <Header />
        <Container className={classes.container}>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/admin' component={Admin} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path ='/helloworld' component={HelloWorld} />
            <Route exact path ='/users/:id' component={UserPage} />
            <Route exact path ='/users/:id/update' component={UpdateUserPage} />
          </Switch>
        </Container>
      </Router>
    </AuthContextProvider>
  )
}

export default App;
