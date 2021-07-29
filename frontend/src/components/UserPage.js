import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import PropTypes from 'prop-types'

// Material UI
import { Button, Typography, Grid, Paper, CssBaseline, } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons'
//<Button><EditIcon style={{color: '#FFC300'}}/></Button>


const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
    },
    avatar: {
      margin: theme.spacing(1),
    },
  }));

const UserPage = () => {
    const classes = useStyles();
    const {id} = useParams()
    const [selectedUser, setSelectedUser] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/v1/api/users/${id}`)
                setSelectedUser(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [id])

    return (
      <>
        <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={6} className={classes.image} />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <div className={classes.paper}>
              {selectedUser && (
                <>
                <Typography component="h1" variant="h1" fontWeight="fontWeightBold" gutterBottom>{selectedUser.avatar}</Typography>
                <Typography component="h1" variant="h5" gutterBottom>Full Name: {selectedUser.name}</Typography>
                <Typography component="h1" variant="h5" gutterBottom>Email: {selectedUser.email}</Typography>
                <Typography component="h1" variant="h5" gutterBottom>Role: {selectedUser.isMentor ? "Mentor": "Mentee"}</Typography>
                <Typography component="h1" variant="h5" gutterBottom>Title: {selectedUser.title}</Typography>
                <Typography component="h1" variant="h5" gutterBottom>Program: {selectedUser.program}</Typography>
                <Typography component="h1" variant="h5" gutterBottom>Bio: {selectedUser.bio}</Typography>
                <Typography component="h1" variant="h5" gutterBottom>Interests: {selectedUser.interest}</Typography>
                <Typography component="h1" variant="h5" gutterBottom>Availability: {selectedUser.availability}</Typography>
                </>
              )}  
          </div>
        </Grid>
      </Grid>
      </>
    )
}

export default UserPage
