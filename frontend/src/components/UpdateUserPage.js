import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useParams } from 'react-router-dom'
import useStyles from '../styles';

// Material UI
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Typography, makeStyles, Container } from '@material-ui/core'; 
import { AssignmentOutlined as RegisterIcon } from '@material-ui/icons';

//defining program select options
const programs = [
    {
      value: 'StepIntoTech Summer 2021',
      label: 'StepIntoTech Summer 2021', 
    },
    {
      value: 'StepIntoTech Fall 2021',
      label: 'StepIntoTech Fall 2021',
    },
    {
      value: 'Summer Internship 2021',
      label: 'Summer Internship 2021',
    },
    {
      value: 'Apprenticeship Summer 2021',
      label: 'Apprenticeship Summer 2021',
    }
];

const UpdateUserPage = (props) => {
    console.log('props..', props)
    const classes = useStyles()
    const authContext = useContext(AuthContext)
    const { register, isAuthenticated, editUser } = authContext
    const [user, setUser] = useState({name: "", email : "", password : "", title: "", program: "", interests: "", bio: "", availability: ""});
    const { name, email, password, title, program, interests, bio, availability } = user

    const {id} = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/v1/api/users/${id}`)
                setUser(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [id])

    console.log('current user ID', user)
   
    const onChange = e =>{
        setUser({...user, [e.target.name]: e.target.value});
    }

    const resetForm = () => {
        setUser({name : "", email : "", password : "", title: "", program: "", interests: "", bio: "", availability: ""});
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (name === '' || email === '' || password === '') {
          alert('Please enter all fields')
        } else {
          console.log('update User call:', editUser(user));
          console.log('User within onSubmit:', user);
          editUser(id, user)
          props.history.push('/')
        }
    }

    return(
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <RegisterIcon fontSize="large"/>
          </Avatar>
          <form className={classes.form} noValidate onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  onChange={onChange}
                  value={name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={onChange}
                  value={email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="password"
                  onChange={onChange}
                  value={password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="title"
                  label="Title"
                  type="title"
                  id="title"
                  autoComplete="title"
                  onChange={onChange}
                  value={title}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  select
                  fullWidth
                  helperText="Please select your program."
                  name="program"
                  label="Program"
                  type="program"
                  id="program"
                  autoComplete="program"
                  onChange={onChange}
                  value={program}                
                >
                  {programs.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>

              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="interests"
                  label="Interests"
                  type="interests"
                  id="interests"
                  autoComplete="interests"
                  onChange={onChange}
                  value={interests}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  helperText="Tell us about yourself!"
                  name="bio"
                  label="Bio"
                  type="bio"
                  id="bio"
                  autoComplete="bio"
                  multiline
                  onChange={onChange}
                  value={bio}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="availability"
                  label="Availability"
                  type="availability"
                  id="availability"
                  autoComplete="bio"
                  onChange={onChange}
                  value={availability}
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Update
            </Button>
          </form>
        </div>
      </Container>
    )
}

export default UpdateUserPage
