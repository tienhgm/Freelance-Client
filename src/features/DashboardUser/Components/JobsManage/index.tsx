import { Route, Switch, useRouteMatch } from 'react-router';
import DetailJob from './pages/DetailJobs';
import EditJob from './pages/EditJob';
import ListJobs from './pages/ListJobs';

export default function JobsManage() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={match.path} component={ListJobs} exact></Route>
      <Route path={`${match.path}/:id`} component={DetailJob} exact></Route>
      <Route path={`${match.path}/edit/:id`} component={EditJob} exact></Route>
    </Switch>
  );
}
