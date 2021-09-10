import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import DetailPage from "./pages/DetailPost";
import ListSearch from "./pages/ListSearch"

function Posts() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={match.url} component={ListSearch} exact></Route>
      <Route path={`${match.url}/:postId`} component={DetailPage}></Route>
    </Switch>
  );
}

export default Posts;
