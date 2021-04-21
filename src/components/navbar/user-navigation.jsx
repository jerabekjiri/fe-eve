import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { useHistory  } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { getIsAuth } from 'store/auth';
import { tabs } from 'pages/my-profile/user-tabs';
import { logout } from 'store/auth';

const UserNavigation = () => {

    const classes = useStyles();
    const isAuth = useSelector(getIsAuth)
    const dispatch = useDispatch();
    const history = useHistory();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
  
    const handleClose = () => setAnchorEl(null);

    const handleMenuItem = url => {
        history.push(`/profil/${url}`)
        handleClose(null)
    };

    const handleLogout = () => {
        dispatch(logout())
        handleClose();
    }

    return (
        <div className={classes.userNavigation}>
            {isAuth && (
                <IconButton
                    {...{
                        color: 'inherit',
                        onClick: handleClick
                    }}
                >
                    <AccountCircleIcon />
                </IconButton>
            )}
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                
            >
                {tabs.map(({ label, url, isDisabled }) => 
                    !isDisabled && (
                        <MenuItem 
                            key={label}
                            onClick={() => handleMenuItem(url)}
                            className={classes.tabMenu}
                        >
                            {label} 
                        </MenuItem>
                    )
                )}
                
                <MenuItem onClick={handleLogout}>Odhlásit se</MenuItem>
            </Menu>
        </div>
    )
}
export default UserNavigation;


const useStyles = makeStyles(() => ({
    userNavigation: {
        marginLeft: '10px',
        display: 'flex'
    },
    tabMenu: {
        textAlign: 'center'
    }
}));