import React, { useEffect, useState, useContext, Fragment } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'

// Material UI
import { Grid, Button, CssBaseline, Typography } from '@material-ui/core'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


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

    console.log('users', users)

    return (
        <Fragment>
            <CssBaseline />
            <Typography variant="h1" align="center" color="textPrimary" gutterBottom>Mentors & Mentees</Typography>

            <Table size="small">
            <TableHead>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Interests</TableCell>
                <TableCell>Program</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {users?.map((user) => (
                <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.interests}</TableCell>
                <TableCell>{user.program}</TableCell>
                <TableCell>{user.title}</TableCell>
                <TableCell><IconButton><EditIcon/></IconButton></TableCell>
                <TableCell><IconButton><DeleteForeverIcon /></IconButton></TableCell>
                </TableRow>
            ))}
            </TableBody>
            </Table>
            <Button varient="contained" color="primary" href="/register">Add New</Button>
        </Fragment>
    )
}

export default Home
