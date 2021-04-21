import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const Loader = (props) => {
  const classes = useStyles();

  const { className, ...other } = props;

  const clss = clsx(classes.root, className)

  return (
    <div className={clss} {...other}>
      <CircularProgress />    
    </div>
  )
}
export default Loader;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
}));