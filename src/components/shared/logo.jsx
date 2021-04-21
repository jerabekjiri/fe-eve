import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

import img from 'assets/logo.png'

const Logo = ({ size }) => {
    const classes = useStyles({ size })
    
    return ( 
        <Link to='/'>
            <img src={img} className={classes.logo} alt='edz logo' />
        </Link>
    )
}
export default Logo

const useStyles = makeStyles(theme => ({
    logo: {
        width: ({ size }) => size ? size : '120px',
        display: 'flex'
    }
}))