import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { Grid } from '@material-ui/core'

const Home = (props) => {
    const { loadUser } = useContext(AuthContext)
  
    const [users, setUsers] = useState()

    useEffect(() => {
        axios.get('/v1/api/users')
        .then(res => {
            setUsers(res.data)
        }).catch(err => console.log(err))
    },[loadUser])

    let usersList = users ? users.map(user => <h3>{user.name}</h3>) : <p>Loading....</p>
    return (
        <Grid container spacing={3}>
            <Grid item sm={8} xs={12}>
                {usersList}
            </Grid>
            <Grid item sm={4} xs={12}>
        
            </Grid>
        </Grid>           
    )
}

export default Home
