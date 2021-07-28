import React, { useState, useRef, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import useStyles from '../styles';

// Material UI
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Typography, makeStyles, Container, NoSsr } from '@material-ui/core'; 
import { AssignmentOutlined as RegisterIcon, Check as CheckIcon, Close as CloseIcon } from '@material-ui/icons';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import styled from 'styled-components';

//defining program select options
const interestsArray = [
  { title: 'Support', }, 
  { title: 'Customer Success', }, 
  { title: 'Engineering', }, 
  { title: 'Accounting', }, 
  { title: 'Sales', }, 
  { title: 'Marketing', }, 
  { title: 'IT', }, 
  { title: 'People', },
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

//custom hook for multi select interests field
const Label = styled('label')`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

const InputWrapper = styled('div')`
  width: 300px;
  border: 1px solid #d9d9d9;
  background-color: #fff;
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: #40a9ff;
  }

  &.focused {
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    font-size: 14px;
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`;

const Tag = styled(({ label, onDelete, ...props }) => (
  <div {...props}>
    <span>{label}</span>
    <CloseIcon onClick={onDelete} />
  </div>
))`
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: #fafafa;
  border: 1px solid #e8e8e8;
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: #40a9ff;
    background-color: #e6f7ff;
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`;

const Listbox = styled('ul')`
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: #fff;
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: #fafafa;
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li[data-focus='true'] {
    background-color: #e6f7ff;
    cursor: pointer;

    & svg {
      color: #000;
    }
  }
`;



const Register = props =>{
    //cutstom hook for multi select
    const {
      getRootProps,
      getInputLabelProps,
      getInputProps,
      getTagProps,
      getListboxProps,
      getOptionProps,
      groupedOptions,
      value,
      focused,
      setAnchorEl,
    } = useAutocomplete({
      id: 'customized-hook-demo',
      defaultValue: [interestsArray[0]],
      multiple: true,
      options: interestsArray,
      getOptionLabel: (option) => option.title,
    });

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
                    <NoSsr>
      <div>
        <div {...getRootProps()}>
          <Label {...getInputLabelProps()}><Typography>Select one or more interests.</Typography></Label>
          <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''} value={interests}>
            {value.map((option, index) => (
              <Tag label={option.title} {...getTagProps({ index })} />
            ))}

            <input {...getInputProps()} />
          </InputWrapper>
        </div>
        {groupedOptions.length > 0 ? (
          <Listbox {...getListboxProps()}>
            {groupedOptions.map((option, index) => (
              <li {...getOptionProps({ option, index })}>
                <span>{option.title}</span>
                <CheckIcon fontSize="small" />
              </li>
            ))}
          </Listbox>
        ) : null}
      </div>
    </NoSsr>
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

export default Register;