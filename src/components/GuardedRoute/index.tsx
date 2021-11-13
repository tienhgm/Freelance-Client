import React, { ComponentType, FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import routesConfiguration from 'routers/routesConfig';
import { useAppSelector } from 'app/hooks';
type Props = RouteProps & {
  component: ComponentType;
  guarded?: boolean;
  redirect?: string;
  role?: number | null;
};

const GuardedRoute: FC<Props> = ({
  component: Component,
  guarded = true,
  redirect = routesConfiguration.home.path,
  role,
  ...rest
}) => {
  // Fake Auth
  const userRole = useAppSelector((state) => state.auth.user.role);
  
  let isAuthenticated = false;
  if(userRole){
    isAuthenticated = true;
  }

  const location = useLocation();
  useEffect(() => {
    const title = location.pathname.replace('-', ' ').replace('/', '').toUpperCase().trim();
    document.title = `Freelance ${title !== '' ? ' | ' + title : ''}`;
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Route
      render={(props) =>
        isAuthenticated === true || guarded === false ? <Component {...props} /> : <Redirect to={redirect} />
      }
      {...rest}
    />
  );
};

export default GuardedRoute;
