import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useParams } from 'react-router-dom'
import useStyles from '../styles';
import FileBase from 'react-file-base64'

// Material UI
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Typography, makeStyles, Container, IconButton } from '@material-ui/core'; 
import { ArrowBack as ArrowBackIcon, AssignmentOutlined as RegisterIcon } from '@material-ui/icons';

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
    },
    {
      value: 'Admin: All Programs',
      label: 'Admin: All Programs',
    },
];

//defining role select options
const roles = [
  {
    value: 'Mentor',
    label: 'Mentor', 
  },
  {
    value: 'Mentee',
    label: 'Mentee',
  },
];

const UpdateUserPage = (props) => {
    console.log('props..', props)
    const classes = useStyles()
    const authContext = useContext(AuthContext)
    const { register, isAuthenticated, editUser } = authContext
    const [user, setUser] = useState({name: "", email : "", password : "", role: "", program: "", interests: "", linkedin: "", bio: "", availability: "", isAdmin: "", isMentor: ""});
    const { name, email, password, role, program, interests, bio, availability, linkedin, isAdmin, isMentor } = user

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
        setUser({name : "", email : "", password : "", role: "", program: "", interests: "", bio: "", availability: ""});
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        if (name === '' || email === '' || password === '') {
          alert('Please enter all fields')
        } else {
          console.log('User within onSubmit:', user);
          await editUser(id, user)
          props.history.push('/admin')
        }
    }

    return(
        <>
        <IconButton onClick={() => {window.history.back()}}><ArrowBackIcon /></IconButton>
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
                  required
                  select
                  fullWidth
                  helperText="Please select your program."
                  name="role"
                  label="Role"
                  type="role"
                  id="role"
                  autoComplete="role"
                  onChange={onChange}
                  value={role}                
                >
                  {roles.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
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
                  required
                  fullWidth
                  name="linkedin"
                  label="LinkedIn"
                  type="linkedin"
                  id="linkedin"
                  autoComplete="linkedin"
                  onChange={onChange}
                  value={linkedin}
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
              <Grid item xs={12}>
              <span style={{ fontSize: '20px', fontWeight: '800'}}>Select profile picture: </span>
                  <FileBase 
                      type="file"
                      multiple={false}
                      onDone={({ base64 }) => {
                        setUser({ ...user, avatar: base64 })
                      }}
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
      </>
    )
}

export default UpdateUserPage
