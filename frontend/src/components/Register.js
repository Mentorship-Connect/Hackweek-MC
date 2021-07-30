import axios from 'axios';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import useStyles from '../styles';
import FileBase from 'react-file-base64'

// Material UI
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Typography, makeStyles, Container, NoSsr } from '@material-ui/core'; 
import { AssignmentOutlined as RegisterIcon, Check as CheckIcon, Close as CloseIcon } from '@material-ui/icons';

//defining program select options leaving this here for future multi select
const interestsArray = [
  { title: 'Support', }, 
  { title: 'Customer Success', }, 
  { title: 'Engineering', }, 
  { title: 'Accounting', }, 
  { title: 'Sales', }, 
  { title: 'Marketing', }, 
  { title: 'IT', }, 
  { title: 'People', },
  { title: 'Product',}
];

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

const Register = props =>{
    const classes = useStyles()
    const authContext = useContext(AuthContext)
    const { register, isAuthenticated } = authContext
    const [user, setUser] = useState({name: "", email : "", password : "", title: "", program: "", interests: "", bio: "", availability: "", isMentor: false, avatar: ""});
    const { name, email, password, role, title, program, interests, bio, availability, isMentor, avatar } = user

    useEffect(()=>{
        if (isAuthenticated) {
            props.history.push('/')
          }
    }, [isAuthenticated, props.history]);

    const onChange = e =>{
        setUser({...user, [e.target.name]: e.target.value});
        console.log('clicking')
    }

    const resetForm = () => {
        setUser({name : "", email : "", password : "", role: "", title: "", program: "", interests: "", bio: "", availability: "", isMentor: false, avatar: ""});
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        if (name === '' || email === '' || password === '') {
          alert('Please enter all fields')
        } else {
          console.log('User within onSubmit:', user);
          const file = e.target.files
          const formData = new FormData()
          formData.append('image', file)
      
          try {
            const config = {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
            
            const { data } = await axios.post('/v1/api/upload', formData, config)
            console.log('data..from uploadfile handler ', data)
            setUser(data)
          } catch (error) {
            console.log(error)
          }
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
                <div>
                  <FileBase 
                      type="file"
                      multiple={false}
                      onDone={({ base64 }) => {
                        setUser({ ...user, avatar: base64 })
                      }}
                    />
                </div>
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

export default Register;