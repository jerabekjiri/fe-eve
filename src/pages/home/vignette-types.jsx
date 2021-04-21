import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography, Button, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom'

const VignetteTypes = ({ types }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={1} className={classes.root}>
      {types.map(type => (
        <Grid item xs={12} sm={4} key={type.price}>
          <Paper variant="outlined" className={classes.vignetteType}>
            <div className={classes.title}>
              <Typography variant="h5" component="h5">
                <strong>{type.display_name}</strong>
              </Typography>

              <Typography variant="subtitle1" className={classes.subtitle}>
                Varianta
              </Typography>
            </div>

            <div className={classes.price}>
              <Typography variant="h5">
                <strong>{type.price} Kč</strong>
              </Typography>

              <Typography variant="subtitle1" className={classes.subtitle}>
                Cena
              </Typography>
            </div>

            <Divider />
            <Button 
              component={Link} 
              to={`/objednavka/${type.id}`}
              size='large' 
              color='primary'
              data-cy={`vignettetype-buy`}
            >
              Koupit
            </Button>
          </Paper> 
        </Grid>
      ))}
    </Grid>
  )
    
}
export default VignetteTypes; 

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center'
  },
  vignetteType: {
    height: '300px',
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingTop: '30px',
    paddingBottom: '30px',
    textAlign: 'center'
  },
  subtitle: {
    textTransform: 'uppercase'
  }
}));
  
  