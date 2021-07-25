//using this to practice Material UI
import React, { Fragment, useContext, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AppBar, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Container, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import { AuthContext } from '../context/AuthContext'
import decode from 'jwt-decode'
import { PhotoCamera } from '@material-ui/icons'

const HelloWorld = () => {
    console.log('Hello World!');
    return (
       <Fragment>
           <CssBaseline />
           <main>
               <div>
                   <Container maxWidth="sm">
                        
                        <Typography varient="h2" align="center" color="textPrimary" gutterBottom> 
                        <PhotoCamera /> Hello World Photo Album
                        </Typography>
                        <Typography varient="h5" align="center" color="textSecondary" paragraph>
                            Hello everyone, this is a photo album and I am practicing using Material UI. Seeing what the paragraph looks like on the screen.
                        </Typography>
                   </Container>
               </div>
           </main>
       </Fragment>
    )
}

export default HelloWorld
