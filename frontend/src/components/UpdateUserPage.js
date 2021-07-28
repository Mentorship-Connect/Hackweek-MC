import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import usceStyles from '../styles';
import { useParams } from 'react-router-dom'

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

const UpdateUserPage = () => {
    const classes = useStyles()
    const authContext = useContext(AuthContext)
    const { register, isAuthenticated } = authContext
    const [user, setUser] = useState({name: "", email : "", password : "", title: "", program: "", interests: "", bio: "", availability: ""});
    const { name, email, password, title, program, interests, bio, availability } = user

    const {id} = useParams()
    const [selectedUser, setSelectedUser] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.put(`/v1/api/users/${id}`)
                setSelectedUser(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [id])
   
    const onChange = e =>{
        setUser({...user, [e.target.name]: e.target.value});
        console.log('clicking')
    }

    const resetForm = () => {
        setUser({name : "", email : "", password : "", title: "", program: "", interests: "", bio: "", availability: ""});
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (name === '' || email === '' || password === '') {
          alert('Please enter all fields')
        } else {
          console.log('Register User call:', register(user));
          console.log('User within onSubmit:', user);
          register(user)
          resetForm()
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
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    )
}

export default UpdateUserPage
