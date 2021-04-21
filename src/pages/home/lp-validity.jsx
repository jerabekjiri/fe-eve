import { useState, useEffect } from 'react';
import { Paper, Typography, Grid } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import LoadingButton from 'components/shared/loading-button';
import { makeStyles } from '@material-ui/core/styles';
import { fetchVignetteValidate } from 'api/vignettes'
import Vignette from 'components/vignette';
import LicensePlateValidator from 'components/shared/license-plate-validator';

const LPValidity = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [lp, setLP] = useState(null);

  const [validVignette, setValidVignette] = useState(null)
  const [vignetteFree, setVignetteFree] = useState(null)
  
  useEffect(() => {
    //console.log()
  }, [validVignette])

  const handleButtonClick = () => {
    
    setLoading(true);
    setTimeout(() => {
      fetchVignetteValidate(lp)
        .then(res => {
          setVignetteFree(true)
          setLoading(false);
          /*
          setValidVignette(prevState => ({
            ...prevState,
            valid: true,
            vignette: res.data[0]
          }))
          */
        })
        .catch(err => {
          setVignetteFree(false)
          setLoading(false)
          setValidVignette(prevState => ({
            ...prevState,
            valid: false
          }))
        });
    }, 1500);
    
  };

  const validFormat = (lp) => {
    setLP(lp)
  }


  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" className={classes.title}>
        Ověření platnosti
      </Typography>

      <Typography variant="subtitle1" className={classes.infoText}>
        Stačí zadat SPZ vozidla a dozvíte, zda máte pro dnešní den platnou elektronickou dálniční známku
      </Typography>

      <LicensePlateValidator 
        onChange={lp => console.log(lp)}
        validFormat={validFormat} 
        pending={loading} 
        state={vignetteFree} 
      />

      <Grid container justify="center" >
        <LoadingButton 
          variant="contained" 
          size="medium" 
          color="primary" 
          className={classes.btn}
          onClick={handleButtonClick}
          disabled={loading}
          loading={loading}
        >
          Ověřit
        </LoadingButton>
      </Grid>
      
      {!!validVignette && (
        <div className={classes.vignetteValidated}>
          {validVignette.valid ? (
            <Vignette vignette={validVignette.vignette} /> 
          ) : (
            <Alert severity="error"><strong>Známka neplatná</strong></Alert>
          )}
        </div>
      )}
    </Paper>
  );
};
export default LPValidity;

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  title: {
    textAlign: 'center'
  },
  infoText: {
    textAlign: 'justify',
    margin: '15px 0'
  },
  input: {
    width: '100%'
  },
  btn: {
    width: '100px'
  },
  vignetteValidated: {
    marginTop: '15px'
  }
}))


