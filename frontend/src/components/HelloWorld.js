//using this to practice Material UI
import React, { Fragment, useContext, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AppBar, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Container, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import { AuthContext } from '../context/AuthContext'
import decode from 'jwt-decode'
import { PhotoCamera } from '@material-ui/icons'

//material ui recommended styles
import { makeStyles } from '@material-ui/core/styles'

//make a hook to use the material ui makestyles
const useStyles = makeStyles((theme) => ({
    //returns an object that contains all the styles for easier user.
    //provide the styles in here
    container: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6)
    }
}));


const HelloWorld = () => {
    console.log('Hello World!');
    const classes = useStyles();
    console.log(useStyles());
    return (
       <Fragment>
           <CssBaseline />
           <main className={classes.container}>
               <div>
                   <Container maxWidth="sm" style={{marginTop: '100px'}}>
                        <Typography varient="h2" align="center" color="textPrimary" gutterBottom> 
                        <PhotoCamera /> Hello World Photo Album
                        </Typography>
                        <Typography varient="h5" align="center" color="textSecondary" paragraph>
                            Hello everyone, this is a photo album and I am practicing using Material UI. Seeing what the paragraph looks like on the screen.
                        </Typography>
                        <div>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button varient="outlined" color="primary">
                                        Edit
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button varient="contained" color="primary">
                                        Add New
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                   </Container>
               </div>
           </main>
       </Fragment>
    )
}

export default HelloWorld
