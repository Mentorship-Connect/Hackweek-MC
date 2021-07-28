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

const Admin = (props) => {
    const classes = useStyles();
    let history = useHistory()
    const { loadUsers, deleteUser, editUser } = useContext(AuthContext)
    const [users, setUsers] = useState([])
    console.log('users', users);
    const isAuth = localStorage.getItem('token')
    const currUser = localStorage.getItem('profile') && JSON.parse(localStorage.getItem('profile'))

    useEffect(() => {
        if (isAuth && currUser.isAdmin !== null && currUser.isAdmin) {
            const fetchData = async () => {
                try {
                    const res = await axios.get('/v1/api/users')
                    setUsers(res.data)
                } catch (error) {
                    console.log(error)
                }
            }
            fetchData()
        } else {
            history.push('/')
        }
       
    },[history, isAuth, loadUsers])

    const handleDelete = async (e, id) => {
        e.stopPropagation()

        try {
            await deleteUser(id)
        } catch(error){
            console.log(error)
        } 
    }

    const handleEdit = async (e, id) => {
        e.stopPropagation()
        history.push(`users/${id}/update`)
    }

    const handleUser = (id) => {
        history.push(`/users/${id}`)
    }

    return (
        <Fragment>
            <CssBaseline />
            <Typography variant="h2" align="center" color="textPrimary" gutterBottom>Mentors & Mentees</Typography>

            <Table size="small">
            <TableHead>
            <TableRow>
                <TableCell>ID</TableCell>
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
                <TableRow onClick={() => handleUser(user._id)} key={user._id} className={classes.row}>
                <TableCell>{user._id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.interests}</TableCell>
                <TableCell>{user.program}</TableCell>
                <TableCell>{user.title}</TableCell>
                <TableCell><IconButton onClick={(e) => handleEdit(e, user._id)}><EditIcon /></IconButton></TableCell>
                <TableCell><IconButton onClick={(e) => handleDelete(e, user._id)}><DeleteForeverIcon /></IconButton></TableCell>
                </TableRow>
            ))}
            </TableBody>
            </Table>
            <Button varient="contained" color="primary" href="/register">Add New</Button>
        </Fragment>
    )
}

export default Admin
