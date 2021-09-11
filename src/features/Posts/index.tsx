import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import DetailPost from "./pages/DetailPost";
import ListPosts from "./pages/ListPosts";
function Posts() {
  const match = useRouteMatch();
 
  return (
    <Switch>
      <Route path={match.url} component={ListPosts} exact></Route>
      <Route path={`${match.url}/:postId`} component={DetailPost}></Route>
    </Switch>
  );
}

export default Posts;
