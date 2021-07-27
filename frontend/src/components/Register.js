import React, { useState, useRef, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// Material UI
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Typography, makeStyles, Container } from '@material-ui/core'; 
import { AssignmentOutlined as RegisterIcon } from '@material-ui/icons';

//need to refactor into styles.js
const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));

const Register = props =>{
    const classes = useStyles()
    const authContext = useContext(AuthContext)
    const { register, isAuthenticated } = authContext
    const [user, setUser] = useState({name: "", email : "", password : "", title: "", program: "", interests: "", bio: "", availability: ""});
    const { name, email, password, title, program, interests, bio, availability } = user

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
                  required
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