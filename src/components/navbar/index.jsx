import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';
import { useSelector } from 'react-redux'
import Wrapper from 'components/shared/wrapper';
import { getIsAuth} from 'store/auth';
import MobileBar from './mobile-bar'
import DesktopBar from './desktop-bar'

const Navbar = (props) => {

  
  const classes = useStyles()
  const isAuth = useSelector(getIsAuth)
  
  const [isMobile, setMobile] = useState(false)

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 700
      ? setMobile(true)
      : setMobile(false)
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  return (
    <>
      <AppBar className={classes.navbar}>   
        <Toolbar disableGutters className={classes.toolbar}>  
          <Wrapper className={classes.NavbarWrapper}>  
            {isMobile ? <MobileBar /> : <DesktopBar isAuth={isAuth} />}
          </Wrapper>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar;

const useStyles = makeStyles(() => ({
  navbar: {
    "@media (max-width: 700px)": {
      paddingLeft: 0,
      paddingRight: 0
    } 
  },
  toolbar: {
    display: 'flex',
    justifyContent: "space-between"
  },
  NavbarWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '1200px'
  },
  fakeAuth: {
    width: '100%',
    height: '40px',
    position: 'fixed',
    background: 'silver'
  }
}))