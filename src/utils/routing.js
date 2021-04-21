import { useEffect, lazy } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { getIsAuth } from 'store/auth';
import { setTitle } from 'utils/title';

export const lazyImport = (component) => lazy(() => import(`pages/${component}`));

export const PrivateRoute = ({component: Component, title, ...rest}) => {
    
    const isAuth = useSelector(getIsAuth);

    useEffect(() => {
        setTitle(title);
    }, []);

    return (
        <Route {...rest} render={props => (
            isAuth ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export const PublicRoute = ({component: Component, restricted, title, ...rest}) => {

    const isAuth = useSelector(getIsAuth);

    useEffect(() => {
        setTitle(title);
    }, []);
    
    return (
        <Route {...rest} render={props => (
            isAuth && restricted ?
                <Redirect to='/profil/zakoupene-znamky' />
            : <Component {...props} />
        )} />
    );
};