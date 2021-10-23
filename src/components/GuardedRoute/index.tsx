import React, { ComponentType, FC, useEffect } from "react";
import { useLocation } from 'react-router-dom'
import { Redirect, Route, RouteProps } from "react-router-dom";
import routesConfiguration from "routers/routesConfig";

type Props = RouteProps & {
  component: ComponentType;
  guarded?: boolean;
  redirect?: string;
};

const GuardedRoute: FC<Props> = ({
  component: Component,
  guarded = true,
  redirect = routesConfiguration.home.path,
  ...rest
}) => {
  // Fake Auth
  let isAuthenticated = false;

  const location = useLocation();
  useEffect(() => {
    const title = location.pathname.replace('-', ' ').replace('/', '').toUpperCase().trim();
    document.title = `Freelance ${title !== '' ? ' | ' + title : ''}`;
    window.scrollTo(0, 0);
  }, [location.pathname])
  
  return (
    <Route
      render={(props) =>
        isAuthenticated === true || guarded === false ? (
          <Component {...props} />
        ) : (
          <Redirect to={redirect} />
        )
      }
      {...rest}
    />
  );
};

export default GuardedRoute;
