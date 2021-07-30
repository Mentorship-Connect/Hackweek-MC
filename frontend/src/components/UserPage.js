import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'


// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Button, CardActions, Card, CardHeader, CardMedia, CardContent, Avatar, Typography, Grid, Container} from '@material-ui/core'
import { ArrowBack as ArrowBackIcon} from '@material-ui/icons'


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '80%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  bold: {
    fontWeight: 'bold',
    marginRight: '5px'
  },
  }));

const UserPage = () => {
    const classes = useStyles();
    let history = useHistory()
    const {id} = useParams()
    const localUser = JSON.parse(localStorage.getItem('profile'))
    const [selectedUser, setSelectedUser] = useState('')
    const linkedinURL = selectedUser.linkedin
    console.log(linkedinURL)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/v1/api/users/${id}`)
                setSelectedUser(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [id])

    const handleEdit = async (id) => {
      await history.push(`/users/${id}/updateme`)
  }
    return (
      <>
      <IconButton onClick={() => {window.history.back()}}><ArrowBackIcon /></IconButton>
      <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={2}>
          {selectedUser && (
            <Card  key={selectedUser._id} className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                        {selectedUser.profile}
                        </Avatar>
                    }
                    title={selectedUser.name}
                    subheader={selectedUser.title}
                    />
                <CardMedia
                className={classes.media}
                image={selectedUser.avatar ? selectedUser.avatar : ("https://source.unsplash.com/random")}
                title="Profile image"
                />
                <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {selectedUser.program}
                </Typography>
                </CardContent>
                <CardContent>
                    <Typography paragraph><span className={classes.bold}>Bio: </span>{selectedUser.bio}</Typography>
                    <Typography paragraph><span className={classes.bold}>Interest: </span>{selectedUser.interests}</Typography>
                    <Typography paragraph><span className={classes.bold}>Availability: </span>{selectedUser.availability}</Typography>
                    <Typography paragraph><span className={classes.bold}>Role: </span>{selectedUser.role}</Typography>
                    <Typography paragraph><span className={classes.bold}>LinkedIn: </span><a href={selectedUser.linkedin} target="_blank" rel="noreferrer">{selectedUser.linkedin}</a></Typography>
                </CardContent>
                <CardActions>
                  {localUser._id === id && (
                    <Button onClick={() => handleEdit(selectedUser._id)} size="large" color="default" variant="contained">
                      Edit
                    </Button>
                  )}
                </CardActions>
            </Card>
          )}
          </Grid> 
      </Container>
      </>
    )
}

export default UserPage
