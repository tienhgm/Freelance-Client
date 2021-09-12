import React, { ComponentType, FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

type Props = RouteProps & {
    component: ComponentType;
    redirect: string;
};

const GuardedRoute: FC<Props> = ({ component: Component, redirect = '/', ...rest }) => {
    // Fake Auth
    let isAuthenticated = false;

    return (
        <Route render={(props) => (isAuthenticated === true ? <Component {...props} /> : <Redirect to={redirect} />)} {...rest} />
    );
};

export default GuardedRoute;