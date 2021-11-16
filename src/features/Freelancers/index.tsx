import { Route, Switch, useRouteMatch } from 'react-router';
import FindFreelancer from './pages/FindFreelancer';
import FreelancerProfile from './pages/FreelancerProfile';


function Freelancers() {
    const match = useRouteMatch();
    return (
        <Switch>
            <Route path={match.path} component={FindFreelancer} exact></Route>
            <Route path={`${match.path}/:freelancerId`} component={FreelancerProfile} exact></Route>
        </Switch>
    );
}

export default Freelancers;