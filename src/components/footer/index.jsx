import Wrapper from 'components/shared/wrapper'

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import Link from 'components/shared/link';
import Logo from 'components/shared/logo';
import { menu } from 'components/shared/menu';

const Footer = () => {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            
            <Wrapper className={classes.inner}>
                    <Grid 
                        container
                        spacing={1}
                        alignItems="center"
                    >
                        <Grid item xs={12} sm={6}>
                            <Logo size='200px'/>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            {menu.map(({ label, href}, index) => (
                                <Typography key={index} variant="button" display="block" gutterBottom className={classes.linkTypo}>
                                    <Link className={classes.link} to={href}>{label}</Link>
                                </Typography>
                            ))}
                            <Typography variant="button" display="block" gutterBottom className={classes.linkTypo}>
                                <Link className={classes.link} to='/o-projektu'>O projektu</Link>
                            </Typography>
                        </Grid>
                    </Grid>
            </Wrapper>
            
        </footer>
    )
}

export default Footer;

const useStyles = makeStyles(theme => ({
    footer: {
      background: theme.custom.primary.main,
      height: '200px',
    },
    inner: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', 
    },
    linkTypo: {
        textAlign: 'right',
    },
    link: {
        color: theme.custom.primary.contrastText, 
    }
}))
  

