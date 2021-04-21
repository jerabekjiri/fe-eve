import { Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";

import { menu, noAuthMenuOnly } from 'components/shared/menu'
import Logo from 'components/shared/logo'
import UserNavigation from './user-navigation';

const DesktopBar = ({ isAuth }) => {
  const classes = useStyles();

  return (
    <>
      <Logo />
      <div className={classes.navigation}>
        {menu.map(({ label, href, noAuthOnly }) => (
          <Button
            {...{
              key: label,
              color: "inherit",
              to: href,
              component: Link,
              className: classes.navigation,
            }}
            data-cy={`appbar-menu-${href}`}
          >
            {label}
          </Button>
        ))}

        {!isAuth && noAuthMenuOnly.map(({ label, href, noAuthOnly }) => (
          <Button
            {...{
              key: label,
              color: "inherit",
              to: href,
              component: Link,
              className: classes.navigation,
            }}
            data-cy={`appbar-menu-${href}`}
          >
            {label}
          </Button>
        ))}

        <UserNavigation />
      </div>
    </>
  );
};
export default DesktopBar

const useStyles = makeStyles(() => ({
  navigation: {
    display: 'flex'
  }
}))