import React, { useEffect, useState, useContext, Fragment } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

// Material UI
import { Button, Paper, CssBaseline, Typography, Table, TableContainer, TableBody, TableCell, TableHead, TableRow, TableSortLabel, TablePagination, FormControlLabel, Switch, IconButton } from '@material-ui/core'
import { Edit as EditIcon, Delete as DeleteIcon, SignalCellularConnectedNoInternet0Bar, } from '@material-ui/icons'
import useStyles from '../styles'
import MUIDataTable from "mui-datatables";

const MuiTableTest = (props) => {
    const classes = useStyles();
    let history = useHistory()
    const { loadUsers, deleteUser, editUser } = useContext(AuthContext)
    const [users, setUsers] = useState([])
    console.log('users', users);


    useEffect(() => {
        axios.get('/v1/api/users')
        .then(res => {
            setUsers(res.data)
        }).catch(err => console.log(err))
    },[loadUsers])

    console.log('users list', users)

    const handleDelete = async (e, id) => {
        //e.stopPropagation()
        try {
            await deleteUser(id)
        } catch(error){
            console.log(error)
        } 
    }

    const handleEdit = async (e, id) => {
        //e.stopPropagation()
        console.log('e', e);
        console.log('ID within edit user: ', id);
        history.push(`users/${id}/update`)
    }

    const handleUser = (id) => {
        history.push(`/users/${id}`)
    }


    const columns = [
        {
        name: "name",
        label: "Name",
        options: {
        filter: true,
        sort: true,
        }
        },
        {
        name: "email",
        label: "Email",
        options: {
        filter: true,
        sort: true,
        }
        },
        {
        name: "program",
        label: "Program",
        options: {
        filter: true,
        sort: true,
        }
        },
        {
        name: "interests",
        label: "Interests",
        options: {
        filter: true,
        sort: false,
        }
        },
        {
            name: "Edit",
            options: {
              filter: true,
              sort: false,
              empty: true,
              customBodyRender: (value, tableMeta, updateValue) => {
                return (
                    <IconButton 
                        onClick={(e) => {
                            console.log('tableMeta: ', tableMeta.rowData[1]);
                            for (let i = 0; i < users.length; i++) {
                                if (tableMeta.rowData[1] === users[i].email) {
                                    console.log('Users emails match: ', users[i].email);
                                    handleEdit(users[i]._id);
                                }
                            }
                        }}>
                        <EditIcon style={{color: '#FFC300'}}/>
                    </IconButton>
                );
              }
            }
          },
    ];

    const options = {
        filterType: 'checkbox',
        onRowsDelete: (e) => {
            console.log('On Rows Delete', e.data);
            for (let i = 0; i < users.length; i++) {
                console.log('user in onRowsDelete: ', i, e.data[0].index);
                if (e.data[0].index === i) {
                    console.log('Yay! We have a match!', users[i]);
                    handleDelete(e, users[i]._id);
                }
            }
        },
        onRowClick: (e) => {
            console.log('On Rows Click - Clicked', e[1]);
            for (let i = 0; i < users.length; i++) {
                if (e[1] === users[i].email) {
                    console.log('Users emails match: ', users[i].email);
                   handleUser(users[i]._id);
                }
            }
        },
    };

    return (
        <Fragment>
            <MUIDataTable
                title={"Users"}
                data={users}
                columns={columns}
                options={options}
            />
            <Button varient="contained" color="primary" href="/register">Add New</Button>
        </Fragment>
    );

}

export default MuiTableTest