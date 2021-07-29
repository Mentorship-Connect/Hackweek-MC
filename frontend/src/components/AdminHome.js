import React, { useEffect, useState, useContext, Fragment } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

// Material UI
import { Button, Paper, CssBaseline, Typography, Table, TableContainer, TableBody, TableCell, TableHead, TableRow, TableSortLabel, TablePagination, FormControlLabel, Switch, IconButton } from '@material-ui/core'
import SearchBar from 'material-ui-search-bar'
import { Edit as EditIcon, Delete as DeleteIcon, } from '@material-ui/icons'
import useStyles from '../styles'

const Admin = (props) => {
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

    //tablesort
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
        const newSelecteds = users.map((n) => n.name);
        setSelected(newSelecteds);
        return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
        );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
          return -1;
        }
        if (b[orderBy] > a[orderBy]) {
          return 1;
        }
        return 0;
      }
      
      function getComparator(order, orderBy) {
        return order === 'desc'
          ? (a, b) => descendingComparator(a, b, orderBy)
          : (a, b) => -descendingComparator(a, b, orderBy);
      }
      
      function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
          const order = comparator(a[0], b[0]);
          if (order !== 0) return order;
          return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
      }
      
      const headCells = [
        { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
        { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
        { id: 'program', numeric: false, disablePadding: false, label: 'Program' },
        { id: 'interests', numeric: false, disablePadding: false, label: 'Interests' },
        { id: 'edit', numeric: false, disablePadding: false, label: 'Edit' },
        { id: 'delete', numeric: false, disablePadding: false, label: 'Delete' },
      ];
      
      function EnhancedTableHead(props) {
        const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
        const createSortHandler = (property) => (event) => {
          onRequestSort(event, property);
        };
      
        return (
                <TableHead>
                <TableRow>
                    {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id)}
                        >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                            <span className={classes.visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </span>
                        ) : null}
                        </TableSortLabel>
                    </TableCell>
                    ))}
                </TableRow>
                </TableHead>
        );
      }

    EnhancedTableHead.propTypes = {
        classes: PropTypes.object.isRequired,
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
        };

    //filtering the table
    //I could capture the input and send it to the backend and create a search route and return it
    //I could do it in the ui and filter the users array

    //capturing the search input

    return (
        <Fragment className={classes.root}>
            <Typography varient="h1">Users</Typography>
        <Paper className={classes.paper}>
        <SearchBar 
        />
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={users.length}
              />
              <TableBody>
                {stableSort(users, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user, index) => {
                    const isItemSelected = isSelected(user.name);
                    const labelId = `enhanced-table-checkbox-${index}`;
  
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, user.name)}
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={user.name}
                        selected={isItemSelected}
                      >
                        <TableCell align="right">{user.name}</TableCell>
                        <TableCell align="right">{user.email}</TableCell>
                        <TableCell align="right">{user.program}</TableCell>
                        <TableCell align="right">{user.interests}</TableCell>
                        <TableCell><IconButton onClick={(e) => handleEdit(e, user._id)}><EditIcon style={{color: '#FFC300'}}/></IconButton></TableCell>
                        <TableCell><IconButton onClick={(e) => handleDelete(e, user._id)}><DeleteIcon color="secondary" /></IconButton></TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Compact View"
        />
        <Button varient="contained" color="primary" href="/register">Add New</Button>
      </Fragment>
    )
}

export default Admin
