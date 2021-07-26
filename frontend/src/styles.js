//styles for material UI helper component
//material ui recommended styles
import { makeStyles } from '@material-ui/core/styles'

//make a hook to use the material ui makestyles
const useStyles = makeStyles((theme) => ({
    //returns an object that contains all the styles for easier user.
    //provide the styles in here
    container: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6)
    },
    icon: {
        marginRight: theme.spacing(2),

    },
    buttons: {
        marginTop: '40px',
    },
    grid: {
        marginTop: '20px',
    }
}));

export default useStyles;