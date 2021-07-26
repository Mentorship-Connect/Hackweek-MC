import React, { useEffect, useState, useContext, Fragment } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { Grid, Button, CssBaseline, Typography } from '@material-ui/core'
import useStyles from '../styles'

const Home = (props) => {
    const classes = useStyles();

    const { loadUser } = useContext(AuthContext)
  
    const [users, setUsers] = useState()

    useEffect(() => {
        axios.get('/v1/api/users')
        .then(res => {
            setUsers(res.data)
        }).catch(err => console.log(err))
    },[loadUser])

    let usersList = users ? users.map(user => <h3 key={user._id}>{user.name}</h3>) : <p>Loading....</p>
    return (
        <Fragment>
            <CssBaseline />
            <Typography varient="h1" align="center" color="textPrimary" gutterBottom>Mentors & Mentees</Typography>
            <Grid container spacing={3} className={classes.grid}>
                <Grid item sm={8} xs={12}>
                    {usersList}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Button varient="contained" color="primary">Edit</Button>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default Home
