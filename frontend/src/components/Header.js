import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import { AuthContext } from '../context/AuthContext'

const Header = () => {
    const authContext = useContext(AuthContext)
    console.log('authcontext .....', authContext)
    const { isAuthenticated } = authContext
    console.log(isAuthenticated)
    return (
       <AppBar>
           <Toolbar>
               <Fragment>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                    <Button color="inherit" component={Link} to="/register">Register</Button>
               </Fragment>
           </Toolbar>
       </AppBar>
    )
}

export default Header
