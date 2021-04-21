import { useEffect, useState, Fragment} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, TextField, MenuItem, Menu, IconButton, Button, Paper } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { fetchUser } from 'api/user';
import { getUser } from 'store/user';
import { patchUser } from 'api/user'
import LoadingButton from 'components/shared/loading-button'
import Loader from 'components/shared/loader';


const UserInfo = () => {
    
    const classes = useStyles();
    const dispatch = useDispatch();
    const userState = useSelector(getUser);
    
    const [isEditing, setIsEditing] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [localUser, setLocalUser] = useState(null)
    
    const open = Boolean(anchorEl);

    const formLabels = {first_name: 'Jméno', last_name: 'Příjmení', email: 'Email', phone: 'Telefonní číslo'}
    const formTypes = {phone: 'number'};

    const handleChange = (e) => {
        setLocalUser(prevState => ({
            ...prevState, 
            [e.target.name]: e.target.value
        }))
    }

    useEffect(() => {
        dispatch(fetchUser(1))
    }, [dispatch]);
    
    const handleEditing = () => {
        handleClose()
        setIsEditing(!isEditing)
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const saveChanges = () => {
        dispatch(patchUser(localUser))  
        setIsEditing(false)
    }

    const cancelEditing = () => {
        setLocalUser(userState.user)
        setIsEditing(false)
    }

    const handleClose = () => {
        setAnchorEl(null);
    };
      
    useEffect(() => {
        !!userState.user && setLocalUser(userState.user)
    }, [userState])


    if (!localUser || userState.pending) 
        return <Loader className={classes.loader} /> 

    return (
        <Paper className={classes.paper}>
            <Grid container>
                <Grid item xs={11}>
                    <Grid container className={classes.content}>
                        {Object.keys(formLabels).map((key, i) => 
                            <Fragment key={i}>
                        
                                <Grid item xs={3}>
                                    <Typography variant='button' className={classes.label}>  
                                        {formLabels[key]}
                                    </Typography>
                                </Grid>

                                <Grid item xs={9}>
                                    {!isEditing ? (
                                        <Typography variant='body1'>
                                            {localUser[key]}
                                        </Typography>
                                    ) : (
                                        <TextField 
                                            name={key} 
                                            value={localUser[key]} 
                                            onChange={handleChange} 
                                            label={formLabels[key]}
                                            type={formTypes[key]}
                                            className={classes.input} 
                                            variant="outlined" 
                                        />
                                    )}
                                </Grid>
                                
                            </Fragment>
                        )}
                    </Grid>
                </Grid>

                <Grid item xs={1}>
                    {!isEditing && (
                    <>
                        <IconButton aria-label='settings' onClick={handleClick}>  
                            <MoreVertIcon />
                        </IconButton>
                        
                        <Menu
                            anchorEl={anchorEl}
                            keepMounted
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={() => handleEditing()}>Editovat</MenuItem>
                        </Menu>
                    </>
                    )}
                </Grid>
            </Grid>

            {isEditing && (
                <Grid item xs={12}>
                    <Grid container justify='flex-end' className={classes.actionButtons}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            className={classes.actionButton}
                            onClick={cancelEditing}
                        >
                            Zrušit
                        </Button>

                        <LoadingButton
                            variant="outlined"
                            color="primary"
                            className={classes.actionButton}
                            onClick={saveChanges}
                            loading={userState.pending}
                        >
                            Uložit změny    
                        </LoadingButton>
                    </Grid>
                </Grid>
            )}
        </Paper>
    )
}
export default UserInfo;

const useStyles = makeStyles((theme) => ({
    input: { 
        paddingBottom: '25px',
        width: '100%'
    },  
    paper: {
        paddingTop: 0,
        paddingRight: 0,
        paddingLeft: theme.spacing(4),
        paddingBottom: theme.spacing(2),
        width: '100%',
        height: 'auto'
    },
    loader: {
        paddingTop: '15px'
    },
        actionButtons: {
        paddingRight: theme.spacing(2)
    },
        actionButton: {
        marginLeft: theme.spacing(2)
    },
        content: {
        paddingTop: theme.spacing(4)
    },
        label: {
        color: theme.palette.text.secondary
    }
}));