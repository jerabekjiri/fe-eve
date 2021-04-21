import { Button, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const LoadingButton = (props) => {

    const classes = useStyles();
  
    return (
      <Button
        variant={props.variant}
        size={props.size}
        color={props.color}
        className={props.className}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.loading && <CircularProgress className={classes.loader} size={25} />}
        {props.children}
      </Button>
    );
}
export default LoadingButton;

const useStyles = makeStyles(theme => ({
    loader: {
      position: 'absolute'
    }
}))
  
  
  