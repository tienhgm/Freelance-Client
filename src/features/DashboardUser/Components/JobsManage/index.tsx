// import { lazy } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import PostJob from '../PostJob';
import DetailJob from './pages/DetailJob';
// import PostJob from './pages/EditJob';
// import EditJob from './pages/EditJob';

import ListJobs from './pages/ListJobs';
// const ListJobs = lazy(() => import('./pages/ListJobs'));
// const DetailJob = lazy(() => import('./pages/DetailJob'));
// const EditJob = lazy(() => import('./pages/EditJob'));
export default function JobsManage() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={match.path} component={ListJobs} exact></Route>
      <Route path={`${match.path}/:id`} component={DetailJob} exact></Route>
      <Route path={`${match.path}/edit/:id`} component={PostJob} exact></Route>
    </Switch>
  );
}
