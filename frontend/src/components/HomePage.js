import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

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
  avatar: {
    backgroundColor: '#f2994b',
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer'
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  bold: {
    fontWeight: '500',
    marginRight: '3px'
  },
}));

const HomePage = (props) => {
    const classes = useStyles();
    let history = useHistory()
    const [users, setUsers] = useState([])
    console.log('users', users);

    useEffect(() => {
        axios.get('/v1/api/users')
        .then(res => {
            setUsers(res.data)
        }).catch(err => console.log(err))
    },[])

    const handleEdit = async (e, id) => {
        e.stopPropagation()
        history.push(`users/${id}/update`)
    }

    const handleUser = (id) => {
        history.push(`/users/${id}`)
    }

    return (
    <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={2}>
            {users?.map((user) => (
                <Grid item xs={12} sm={6} md={4} key={user._id}>
                    <Card  key={user._id} className={classes.card} onClick={() => handleUser(user._id)}>
                        <CardHeader
                            avatar={
                                <Avatar className={classes.avatar}>
                                {user.name.charAt(0)}
                                </Avatar>
                            }
                            title={user.name}
                            subheader={user.role}
                            />
                        <CardMedia
                        className={classes.media}
                        image={user.avatar ? user.avatar : ("https://source.unsplash.com/random")}
                        title="Profile image"
                        />
                        <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {user.program}
                        </Typography>
                        </CardContent>
                        <CardContent>
                        <Typography paragraph variant="body3"><span className={classes.bold}>Interest: </span>{user.interests}</Typography>
                        <Typography paragraph variant="body3"><span className={classes.bold}>Availability: </span>{user.availability}</Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small" color="primary">
                            Learn More
                          </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid> 
    </Container>
    );
}

export default HomePage
