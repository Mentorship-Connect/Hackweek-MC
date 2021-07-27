import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// Material UI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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
        <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={6} className={classes.image} />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <div className={classes.paper}>
              {selectedUser && (
                <>
                <Typography component="h1" variant="h5" gutterBottom>{selectedUser.avatar}</Typography>
                <Typography component="h1" variant="h5" gutterBottom>{selectedUser.name}</Typography>
                <Typography component="h1" variant="h5" gutterBottom>{selectedUser.email}</Typography>
                <Typography component="h1" variant="h5" gutterBottom>{selectedUser.isMentor ? "Mentor": "Mentee"}</Typography>
                <Typography component="h1" variant="h5" gutterBottom>{selectedUser.title}</Typography>
                <Typography component="h1" variant="h5" gutterBottom>{selectedUser.program}</Typography>
                <Typography component="h1" variant="h5" gutterBottom>{selectedUser.bio}</Typography>
                <Typography component="h1" variant="h5" gutterBottom>{selectedUser.interest}</Typography>
                <Typography component="h1" variant="h5" gutterBottom>{selectedUser.availability}</Typography>
                </>
              )}  
          </div>
        </Grid>
      </Grid>
    )
}

export default UserPage
