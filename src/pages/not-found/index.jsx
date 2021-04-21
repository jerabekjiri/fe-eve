import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NotFoundImage from 'assets/not-found.png'

const NotFound = () => {
  const classes = useStyles();
 
  return (
    <div>
        <div className={classes.notFound}>
            <img src={NotFoundImage} className={classes.img} alt='404 not found' />
        </div>
        <Typography variant="h4" className={classes.text}>
            Stránka nenalezena! Přejít na <Link href='/' className={classes.link}>hlavní stránku</Link>
        </Typography>
    </div>
  )
}

export default NotFound;

const useStyles = makeStyles((theme) => ({
  notFound: {
    width: '100%',
    justifyContent: 'center',
    display: 'flex',
  },
  img: {
    width: '400px'
  },
  text: {
    textAlign: 'center'
  },
  link: {
    textTransform: 'uppercase'
  }
}));