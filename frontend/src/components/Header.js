import React, { Fragment, useContext, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import { AuthContext } from '../context/AuthContext'
import decode from 'jwt-decode'

const Header = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const { isAuthenticated, logout } = useContext(AuthContext)
    console.log(isAuthenticated)
    const location = useLocation()

    useEffect(() => {
        const token = user?.token
    
        if (token) {
          const decodedToken = decode(token)
          if (decodedToken.exp * 1000 < new Date().getTime()) {
            logout()
          }
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
      }, [location])

    return (
       <AppBar>
           <Toolbar>
               {user ? (
                   <div>
                   <Avatar
                     alt="testing "
                     src="user time testing"
                   >
                     {user?.name.charAt(0)}
                   </Avatar>
                   <Typography variant='h6'>
                     {user?.name}
                   </Typography>
                   <Button
                     variant='contained'
                     className={logout}
                     color='secondary'
                     onClick={logout}
                   >
                     Log Out
                   </Button>
                 </div>
               ) : (
                <Fragment>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/login">Login</Button>
                <Button color="inherit" component={Link} to="/register">Register</Button>
           </Fragment>
               )}
           </Toolbar>
       </AppBar>
    )
}

export default Header
