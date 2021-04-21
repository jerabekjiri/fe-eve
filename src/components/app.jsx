import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Navbar from 'components/navbar'
import Router from 'routes'
import Footer from 'components/footer'
import Wrapper from 'components/shared/wrapper'

import { fetchUser } from 'api/user';
import { getIsAuth } from 'store/auth';


const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuth);

  useEffect(() => {
    isAuth && dispatch(fetchUser(1))
  }, [isAuth, dispatch])

  return (
    <div className={classes.app}>
      <Navbar />
      <main className={classes.main}>
        <Wrapper>
          <Router />
        </Wrapper>
      </main>
      <Footer />  
    </div>
  )
}
export default App;

const useStyles = makeStyles(theme => ({
  app: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%'
  },
  main: {
    flexGrow: '1',
    marginTop: '80px',
    marginBottom: '30px',
    background: theme.background
  }
}));
