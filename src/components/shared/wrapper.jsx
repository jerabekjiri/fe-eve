import { makeStyles } from '@material-ui/core/styles';

const Wrapper = (props) => {
    const classes = useStyles();

    return (
        <div className={`${classes.wrapper} ${props.className}`} >
          {props.children}
        </div>
    )
}
export default Wrapper;


const useStyles = makeStyles(() => ({
    wrapper: {
      paddingRight: "103px",
      paddingLeft: "103px",
      maxWidth: '1200px',
      margin: 'auto',
      height: 'auto',
      "@media (max-width: 700px)": {
        paddingLeft: '16px',
        paddingRight: '16px'
      } 
    }
}))