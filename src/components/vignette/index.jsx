import { useState } from 'react';
import { Card, Grid, Typography, CardContent, CardActions, Collapse, Button, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const Vignette = ({ vignette }) => {
    
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => setExpanded(!expanded);

    const isActive = Boolean(Math.random() < 0.5);
    
    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                >
                    <Typography variant="h5">
                        {vignette.licensePlate}
                    </Typography>
                
                    <Chip 
                        label={isActive ? 'Platná' : 'Neplatná'} 
                        className={isActive ? classes.active : classes.inactive} 
                    />
                </Grid>

                <Typography variant="subtitle1">
                    {vignette.vignetteType.display_name}
                </Typography>
                <Typography variant="h5">
                    Zbývá: 6 dní
                </Typography>
            </CardContent>

            <CardActions>
                <Button
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    color='primary'
                >
                    {'zobrazit '}{!expanded ?  `více` : 'méně'}
                </Button>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Podrobnosti:</Typography>
                    <Typography paragraph>
                        {vignette.validFrom}
                    </Typography>
                </CardContent>
            </Collapse>
      </Card>
    )
}
export default Vignette;

const useStyles = makeStyles((theme) => ({
        expand: {
        marginLeft: 'auto',
        },
        active: {
            background: theme.palette.success.main,
            color: '#FFF',
            marginLeft: 'auto'
        },
        inactive: {
            background: theme.palette.error.main,
            color: '#FFF'
        }
}));
