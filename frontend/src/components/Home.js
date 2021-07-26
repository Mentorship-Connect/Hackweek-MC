import React, { useEffect, useState, useContext, Fragment } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { Grid, Button, CssBaseline, Typography } from '@material-ui/core'
import { DataGrid, GridsRowProp, GridColDef } from '@material-ui/data-grid'
import useStyles from '../styles'

const Home = (props) => {
    const classes = useStyles();
    let userTable;
    let userRows;
    const { loadUser } = useContext(AuthContext)
  
    const [users, setUsers] = useState()
    console.log('users', users);

    useEffect(() => {
        axios.get('/v1/api/users')
        .then(res => {
            setUsers(res.data)
        }).catch(err => console.log(err))
    },[loadUser])
    

    //let usersList = users ? users.map(user => <h3 key={user._id}>{user.name}</h3>) : <p>Loading....</p>
    if (users) {
        userTable = users.map( user => {
            console.log(user);
            return (
                <>
                    <Grid item sm={4} xs={12} key={user.id}>
                        <Typography varient="h3">{user.name}</Typography> 
                        <Grid item sm={4} xs>{user.email}</Grid>
                    </Grid>
                </>
            );
    });
    } else {
        <Typography varient="h1">Loading...</Typography>
    }


    //trying to use DataGrid
    //creating the headers/columns to use
     const columns = [
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            editable: true,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 150,
            editable: true,
        },
    ];

/*     userRows = users.map(user => {
        let rows = {};
        rows[user.key] = {name: user.name, email: user.email}
        return rows
    }); */
    
    return (
        <Fragment>
            <CssBaseline />
            <Typography varient="h1" align="center" color="textPrimary" gutterBottom>Mentors & Mentees</Typography>
            <Grid container spacing={3} className={classes.grid}>
                    {userTable}
            </Grid>
        </Fragment>
    )
}

export default Home
