import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Drawer,
  List,
  ListItem,
  Divider,
  ListItemText
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { menu } from 'components/shared/menu'

import { Link } from "react-router-dom";

import Logo from 'components/shared/logo'
import UserNavigation from './user-navigation';

const MobileBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);

  const classes = useStyles();

  return (
    <>
      <Logo />
      <div className={classes.navigation}>
        <UserNavigation />
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>
          
        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={classes.drawer}>
            <List>
              {menu.map(({ label, href }) => (
                <ListItem 
                  button 
                  key={label} 
                  component={Link}
                  to={href}
                  className={classes.listItem}
                >
                  <ListItemText primary={label} />
                </ListItem>
              ))}
            </List>
            <Divider />
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default MobileBar

const useStyles = makeStyles(() => ({
  drawer: {
    width: '250px'
  },
  listItem: {
    textAlign: 'center'
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  navigation: {
    display: 'flex'
  }
}));