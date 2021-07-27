import React, { useEffect, useState, useContext, Fragment } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { useHistory } from 'react-router-dom'

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
    let history = useHistory()
    const { loadUser, deleteUser } = useContext(AuthContext)
    const [users, setUsers] = useState([])
    console.log('users', users);

    useEffect(() => {
        axios.get('/v1/api/users')
        .then(res => {
            setUsers(res.data)
        }).catch(err => console.log(err))
    },[loadUser])

    console.log('users', users)

    const handleDelete = async (id) => {
        try {
         const res = await deleteUser(id)
         console.log(res)
         return res
        } catch(error){
            console.log(error)
        } 
        console.log('entered handle delete')
    }

    const handleUser = (id) => {
        history.push(`/users/${id}`)
    }

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
                <TableRow key={user.key}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.interests}</TableCell>
                <TableCell>{user.program}</TableCell>
                <TableCell>{user.title}</TableCell>
                <TableCell><IconButton><EditIcon/></IconButton></TableCell>
                <TableCell><IconButton onClick={() => handleDelete(user._id)}><DeleteForeverIcon /></IconButton></TableCell>
                </TableRow>
            ))}
            </TableBody>
            </Table>
            <Button varient="contained" color="primary" href="/register">Add New</Button>
        </Fragment>
    )
}

export default Home
