import React, { ComponentType, FC } from "react";
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
