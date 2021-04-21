import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Paper, Grid, Button } from '@material-ui/core';
import { fetchVignetteTypes } from 'api/vignette-types';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import { vignetteTypes } from 'store/vignettes';
import { Link } from 'react-router-dom';
import { getIsAuth } from 'store/auth';
import profileImg from 'assets/profile.png';

import VignetteTypes from './vignette-types'
import Alert from 'components/shared/alert';
import Loader from 'components/shared/loader'
import Accordion from 'components/shared/accordion'
import LPValidity from './lp-validity';

import articles from 'pages/information/articles'

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const vignetteState = useSelector(vignetteTypes)
  const isAuth = useSelector(getIsAuth)

  useEffect(() => {
    dispatch(fetchVignetteTypes())
  }, [dispatch])

  const { types, pending, error } = vignetteState;
 
  return (
    <div>

      <Grid container spacing={1} className={classes.root}>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}>
              {pending ? (
                <div className={classes.loader}>
                  <Loader />
                </div>
              ) : (
                <>
                  {!error ? <VignetteTypes types={types} /> : <Alert error={error} />}
                </>
              )}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Hidden xsDown>
            {isAuth ? (
              <Paper className={classes.paper}>
                <div className={classes.user}>
                  <Button 
                    variant="contained" 
                    color="primary"
                    to='/profil/zakoupene-znamky'
                    component={Link}
                    size='large'
                  >
                    Moje zakoupené známky
                  </Button>
                </div>
              </Paper>
            ) : (
              <Paper className={classes.paper}>
                <div className={classes.login}>
                  <div className={classes.img}>
                    <img src={profileImg} className={classes.profileImg} alt='login label'/>
                  </div>
                  <Button 
                    variant="contained" 
                    color="primary"
                    to= '/login'
                    component={Link}
                  >
                    Přihlásit se
                  </Button>
                </div>
              </Paper>
            )}
          </Hidden>
        </Grid>
      </Grid>

      <Grid container spacing={1} className={classes.root}>
        <Grid item xs={12} sm={4}>
          <LPValidity />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Accordion data={articles.slice(0, 3)} />
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-end"
            className={classes.readMore}
          >
            <Button 
              size="large" 
              color="primary" 
              component={Link}
              to='/informace'
            >
              Přečíst více zde
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default Home;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100%'
  },
  paper: {
    padding: theme.spacing(1),
    height: '100%'
  },
  login: {
    height: '300px',
    flexDirection: 'column',
    textAlign: 'center'
  },
  user: {
    height: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
   
  },
  img: {
    overflow: 'hidden'
  },
  profileImg: {
    maxWidth: '250px',
    width: '100%',
    height: 'auto'
  },
  loader: {
    height: '300px'
  },
}));