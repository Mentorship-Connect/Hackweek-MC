import React, { useEffect, useState, useContext, Fragment } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

// Material UI
import { Grid, Button, CssBaseline, Typography, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, IconButton } from '@material-ui/core'
import { Edit as EditIcon, DeleteForever as DeleteForeverIcon, FilterList as FilterListIcon} from '@material-ui/icons'
import useStyles from '../styles'

const Admin = (props) => {
    const classes = useStyles();
    let history = useHistory()
    const { loadUsers, deleteUser } = useContext(AuthContext)
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
       
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <Typography variant="h3" align="center" color="textPrimary" gutterBottom>Users</Typography>
            <Table size="small">
            <TableHead>
            <TableRow>
                <TableCell>
                    <TableSortLabel
                    >
                    ID
                    </TableSortLabel>
                </TableCell>
                <TableCell><TableSortLabel>Name</TableSortLabel></TableCell>
                <TableCell><TableSortLabel>Email</TableSortLabel></TableCell>
                <TableCell><TableSortLabel>Interests</TableSortLabel></TableCell>
                <TableCell><TableSortLabel>Program</TableSortLabel></TableCell>
                <TableCell><TableSortLabel>Title</TableSortLabel></TableCell>
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
